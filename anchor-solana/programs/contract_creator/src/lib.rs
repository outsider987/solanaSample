#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
use owner::cpi::accounts::SetPowerStatus;
use owner::program::Owner;
use owner::{self, PowerStatus};

declare_id!("EJfTLXDCJTVwBgGpz9X2Me4CWHbvg8F8zsM7fiVJLLeR");

#[program]
mod contract_creator {
    use super::*;
    pub fn pull_lever(ctx: Context<PullLever>, name: String) -> anchor_lang::Result<()> {
        // Hitting the switch_power method on the lever program
        //
        owner::cpi::switch_power(
            CpiContext::new(
                ctx.accounts.owner.to_account_info(),
                // Using the accounts context struct from the lever program
                //
                SetPowerStatus {
                    agree: ctx.accounts.power.to_account_info(),
                },
            ),
            true,
        )
    }
}

#[derive(Accounts)]
pub struct PullLever<'info> {
    #[account(mut)]
    pub power: Account<'info, PowerStatus>,
    pub owner: Program<'info, Owner>,
}
