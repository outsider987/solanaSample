#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
use owner::cpi::accounts::SetOwnerStatus;
use owner::program::Owner;
use owner::{self, PowerStatus};

declare_id!("6zv3mCftMCeXkxhsyFEFXYWEiW5rqrBjJ8CChrZ9rY6w");

#[program]
mod contract_creator {
    use super::*;
    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn owner_agree(ctx: Context<OwnerStruct>, is_agreed: bool) -> anchor_lang::Result<()> {
        // Hitting the switch_power method on the lever program
        //
        owner::cpi::agree_contract(
            CpiContext::new(
                ctx.accounts.owner.to_account_info(),
                // Using the accounts context struct from the lever program
                //
                SetOwnerStatus {
                    agree: ctx.accounts.agree.to_account_info(),
                },
            ),
            is_agreed,
        )
    }
}

#[derive(Accounts)]
pub struct OwnerStruct<'info> {
    #[account(mut)]
    pub agree: Account<'info, PowerStatus>,
    pub owner: Program<'info, Owner>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    pub thrid_party: Signer<'info>,
}
