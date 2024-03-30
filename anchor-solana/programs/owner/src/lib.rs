#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("CABVoybzrbAJSv7QhQd6GXNGKxDMRjw9niqFzizhk6uk");

#[program]
pub mod owner {
    use super::*;
    pub fn initialize(_ctx: Context<InitializeLever>) -> Result<()> {
        Ok(())
    }

    pub fn switch_power(ctx: Context<SetPowerStatus>, isAgreed: bool) -> Result<()> {
        let agree = &mut ctx.accounts.agree;
        agree.is_on = !agree.is_on;

        msg!("{} is pulling the agree switch!", &isAgreed);

        match agree.is_on {
            true => msg!("The agree is now on."),
            false => msg!("The agree is now off!"),
        };

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
pub struct SetPowerStatus<'info> {
    #[account(mut)]
    pub agree: Account<'info, PowerStatus>,
}

#[account]
pub struct PowerStatus {
    pub is_on: bool,
}