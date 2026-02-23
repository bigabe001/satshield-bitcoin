import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    // Standard Localhost config
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // We'll keep this but make it safe so it doesn't crash the loader
    midl_regtest: {
      url: "https://rpc.regtest.midl.xyz",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 777,
    },
  },
};

export default config;