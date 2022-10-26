import { ethers } from "hardhat";

async function main() {
 const contractFactory = await ethers.getContractFactory('Library');
 const contract = await contractFactory.deploy();
 await contract.deployed();
 console.log('Contract deployed to: ', contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x6600e9cE77545da09688FeEbE8De556Ba78879Bc