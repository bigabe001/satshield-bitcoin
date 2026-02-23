import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying SatShield locally with account:", deployer.address);

  const SatShield = await ethers.getContractFactory("SatShield");
  
  // No overrides needed for localhost - let Hardhat calculate it
  const satShield = await SatShield.deploy();

  await satShield.waitForDeployment();

  console.log("✅ SatShield LIVE at:", await satShield.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});