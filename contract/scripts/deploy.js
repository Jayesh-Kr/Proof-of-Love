const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contracts with account: ${deployer.address}`);

  // Deploy Contract A
  const ContractA = await hre.ethers.getContractFactory("LoveStory");
  const contractA = await ContractA.deploy();
  await contractA.waitForDeployment();
  console.log(`LoveStory deployed at: ${await contractA.getAddress()}`);

  // Deploy Contract B
  const ContractB = await hre.ethers.getContractFactory("PolNFT");
  const contractB = await ContractB.deploy();
  await contractB.waitForDeployment();
  console.log(`PolNFT deployed at: ${await contractB.getAddress()}`);

  // Deploy Contract C
  const ContractC = await hre.ethers.getContractFactory("SendGift");
  const contractC = await ContractC.deploy();
  await contractC.waitForDeployment();
  console.log(`SendGift deployed at: ${await contractC.getAddress()}`);

  // Deploy Contract D (Requires A, B, C addresses)
  const ContractD = await hre.ethers.getContractFactory("Stake");
  const addressContractA = await contractA.getAddress();
  const addressContractB = await contractB.getAddress();
  const addressContractC = await contractC.getAddress();
  const contractD = await ContractD.deploy(addressContractB,addressContractC,addressContractA);
  await contractD.waitForDeployment();
  console.log(`Stake deployed at: ${await contractD.getAddress()}`);
}

// Execute script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });