// use solana_program::{
//     account_info::AccountInfo,
//     entrypoint,
//     entrypoint::ProgramResult,
//     pubkey::Pubkey,
//     msg,
// };
// // pub unsafe extern "C" fn entrypoint(input: *mut u8) -> u64{
    
// // }

// entrypoint!(process_instruction);

// // program entrypoint's implementation
// pub fn process_instruction(
//     program_id: &Pubkey,
//     accounts: &[AccountInfo],
//     instruction_data: &[u8]
// ) -> ProgramResult {
//     // log a message to the blockchain
//     msg!("Hello, world!");

//     // gracefully exit the program
//     Ok(())
// }


// pub fn add(left: usize, right: usize) -> usize {
//     left + right
// }

// #[cfg(test)]
// mod tests {
//     use super::*;

//     #[test]
//     fn it_works() {
//         let result = add(2, 2);
//         assert_eq!(result, 4);
//     }
// }


use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    program_pack::{Pack, IsInitialized},
    system_instruction::transfer,
    sysvar::{rent::Rent, Sysvar},
};

#[derive(Debug, Default, PartialEq)]
struct MortgageContract {
    owner: Pubkey,
    third_party_platform: Pubkey,
    leader: Pubkey,
    owner_usdt_amount: u64,
    leader_usdt_amount: u64,
    contract_initiated: bool,
    owner_agreed: bool,
    leader_signed: bool,
    collateral_transferred: bool,
    requirement: String,
    expiration_time: u64,
}

impl MortgageContract {
    fn new(owner: Pubkey, third_party_platform: Pubkey, requirement: String, expiration_time: u64) -> Self {
        Self {
            owner,
            third_party_platform,
            requirement,
            expiration_time,
            ..Default::default()
        }
    }

    fn initiate_contract(&mut self, owner: Pubkey, requirement: String, owner_usdt_amount: u64, expiration_time: u64) -> ProgramResult {
        if self.contract_initiated {
            return Err(ProgramError::InvalidInstructionData);
        }

        self.requirement = requirement;
        self.owner_usdt_amount = owner_usdt_amount;
        self.expiration_time = expiration_time;
        self.owner = owner;

        self.contract_initiated = true;

        Ok(())
    }

    fn transfer_collateral_to_third_party_platform(&mut self, is_owner_agreed: bool, amount: u64) -> ProgramResult {
        if !self.contract_initiated || !is_owner_agreed {
            return Err(ProgramError::InvalidInstructionData);
        }

        let mut accounts_iter = accounts.iter();
        let third_party_platform_account = next_account_info(&mut accounts_iter)?;
        let owner_account = next_account_info(&mut accounts_iter)?;

        let transfer_instruction = transfer(owner_account.key, third_party_platform_account.key, amount);
        msg!("Transferring collateral to third party platform...");
        invoke(&transfer_instruction, &[owner_account, third_party_platform_account])?;

        self.collateral_transferred = true;

        Ok(())
    }

    fn request_leader_signature(&mut self, is_leader_agreed: bool, leader: Pubkey) -> ProgramResult {
        if !self.owner_agreed || self.leader_signed || !is_leader_agreed {
            return Err(ProgramError::InvalidInstructionData);
        }

        self.leader = leader;
        self.leader_signed = true;
        self.leader_usdt_amount = self.owner_usdt_amount / 2;

        let mut accounts_iter = accounts.iter();
        let third_party_platform_account = next_account_info(&mut accounts_iter)?;
        let leader_account = next_account_info(&mut accounts_iter)?;

        let transfer_instruction = transfer(leader_account.key, third_party_platform_account.key, self.leader_usdt_amount);
        msg!("Transferring leader's fee to third party platform...");
        invoke(&transfer_instruction, &[leader_account, third_party_platform_account])?;

        Ok(())
    }
}

#[entrypoint]
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let account = next_account_info(account_info_iter)?;

    if !account.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    match instruction_data[0] {
        0 => {
            // Initiate Contract
            let owner = next_account_info(account_info_iter)?;
            let third_party_platform = next_account_info(account_info_iter)?;
            let requirement_len = instruction_data[1] as usize;
            let requirement = String::from_utf8(instruction_data[2..2+requirement_len].to_vec()).unwrap();
            let owner_usdt_amount = u64::from_le_bytes(*array_ref!(instruction_data, 2+requirement_len, 8));
            let expiration_time = u64::from_le_bytes(*array_ref!(instruction_data, 10+requirement_len, 8));

            let mut mortgage_contract = MortgageContract::new(*owner.key, *third_party_platform.key, requirement, expiration_time);
            mortgage_contract.initiate_contract(*owner.key, requirement, owner_usdt_amount, expiration_time)?;
        }
        1 => {
            // Transfer Collateral to Third Party Platform
            let is_owner_agreed = instruction_data[1] != 0;
            let amount = u64::from_le_bytes(*array_ref!(instruction_data, 2, 8));

            let mut mortgage_contract = MortgageContract::default();
            mortgage_contract.transfer_collateral_to_third_party_platform(is_owner_agreed, amount)?;
        }
        2 => {
            // Request Leader Signature
            let is_leader_agreed = instruction_data[1] != 0;
            let leader = next_account_info(account_info_iter)?;

            let mut mortgage_contract = MortgageContract::default();
            mortgage_contract.request_leader_signature(is_leader_agreed, *leader.key)?;
        }
        _ => return Err(ProgramError::InvalidInstructionData),
    }

    Ok(())
}
