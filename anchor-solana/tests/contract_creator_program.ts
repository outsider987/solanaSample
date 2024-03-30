import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ContractCreator } from "../target/types/contract_creator";

describe("create Contract", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
    // Generate new keypair to use as data account
  const dataAccount = anchor.web3.Keypair.generate();
  const wallet = provider.wallet;
  const connection = provider.connection;

  const program = anchor.workspace.HelloWorld as Program<ContractCreator>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().signers([dataAccount]).rpc();
    console.log("Your transaction signature", tx);
  });
    
  it('ownerAgree', async () => {
    const tx = await program.methods
      .ownerAgree(true)
      .accounts({ agree: dataAccount.publicKey })
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
