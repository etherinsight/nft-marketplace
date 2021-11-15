import * as fs from "fs";

const privateKey =
  fs.readFileSync(".secret").toString().trim() || "01234567890123456789";

export default {
  RINKEBY_RPC_URL: process.env.RINKEBY_RPC_URL ?? "",
  PRIVATE_KEY: privateKey,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY || "Your Etherscan API Key",
};
