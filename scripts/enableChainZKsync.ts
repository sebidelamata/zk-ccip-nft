// scripts/enableChain.ts

import { network } from "hardhat";
import { ethers, Wallet } from "ethers";
import { XNFT, XNFT__factory } from "../typechain-types";

async function main() {
  if (network.name !== `zkSyncSepoliaTestnet`) {
    console.error(`Must be called from zkSync Sepolia`);
    return 1;
  }

  const privateKey = process.env.PRIVATE_KEY!;
  const rpcProviderUrl = process.env.ZKSYNC_RPC_URL;

  const provider = new ethers.JsonRpcProvider(rpcProviderUrl);
  const wallet = new Wallet(privateKey);
  const signer = wallet.connect(provider);

  const xNftAddressZKsync = `0x89feCF285Ca8B7D74e4AC56763f8aEDA97c973a4`;
  const xNftAddressSepolia = `0x1283aA72dD586b8cbe5ced154857cA1e35501162`;
  const chainSelectorSepolia = `16015286601757825753`;
  const ccipExtraArgs = `0x97a657c90000000000000000000000000000000000000000000000000000000000030d40`;

  const xNft: XNFT = XNFT__factory.connect(xNftAddressZKsync, signer);

  const tx = await xNft.enableChain(
      chainSelectorSepolia,
      xNftAddressSepolia,
      ccipExtraArgs
  );

  console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});