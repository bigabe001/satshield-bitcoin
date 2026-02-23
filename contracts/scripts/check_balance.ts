import { ethers } from "hardhat";
async function main() {
  const address = "0x6D9ef3F64a51B1292cad7d24CC9bcB23D0090820";
  const balance = await ethers.provider.getBalance(address);
  console.log("💰 Balance for " + address + ": " + ethers.formatEther(balance) + " BTC");
}
main().catch(console.error);
