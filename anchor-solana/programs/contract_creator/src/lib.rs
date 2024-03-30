#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
use owner::cpi::accounts::SetOwnerStatus;
use owner::program::OwnerProgram;
use owner::{self, PowerStatus};

declare_id!("EJfTLXDCJTVwBgGpz9X2Me4CWHbvg8F8zsM7fiVJLLeR");

#[program]
mod contract_creator_program {
    use super::*;
    pub fn owner_agree(ctx: Context<Owner>, is_agreed: bool) -> anchor_lang::Result<()> {
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
pub struct Owner<'info> {
    #[account(mut)]
    pub agree: Account<'info, PowerStatus>,
    pub owner: Program<'info, OwnerProgram>,
}
