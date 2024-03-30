#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("CABVoybzrbAJSv7QhQd6GXNGKxDMRjw9niqFzizhk6uk");

#[program]
pub mod owner_program {
    use super::*;
    pub fn initialize(_ctx: Context<InitializeLever>) -> Result<()> {
        Ok(())
    }

    pub fn agree_contract(ctx: Context<SetOwnerStatus>, is_agreed: bool) -> Result<()> {
        if ctx.accounts.agree.is_on == is_agreed {
            return Err(ErrorCode::AlreadyAgreed.into());
        }

        let agree = &mut ctx.accounts.agree;
        agree.is_on = !agree.is_on;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeLever<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub agree: Account<'info, PowerStatus>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetOwnerStatus<'info> {
    #[account(mut)]
    pub agree: Account<'info, PowerStatus>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Already agreed!")]
    AlreadyAgreed,
}

#[account]
pub struct PowerStatus {
    pub is_on: bool,
}
