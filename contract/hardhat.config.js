require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

module.exports = {
  solidity: "0.8.20",
  namedAccounts: {
    deployer: {
      default: 0, // First account as the deployer
    },
  },
};