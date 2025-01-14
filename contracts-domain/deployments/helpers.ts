import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Address } from "../utils/types";
import { ethers } from "hardhat";

export function getDeployedContractAddress(network: string, contractName: string): string {
  return require(`./${network}/${contractName}.json`).address;
}

export async function setNewOwner(
  hre: HardhatRuntimeEnvironment,
  contractAddress: Address,
  newOwner: Address
): Promise<void> {
  const contract = await ethers.getContractAt("Ownable", contractAddress);
  const currentOwner = await contract.owner();

  if (currentOwner != newOwner) {
    const data = contract.interface.encodeFunctionData("transferOwnership", [newOwner]);

    await hre.deployments.rawTx({
      from: currentOwner,
      to: contract.address,
      data
    });
  }
}

export async function addWritePermission(
  hre: HardhatRuntimeEnvironment,
  contract: any,
  newPermission: Address
): Promise<void> {
  const currentOwner = await contract.owner();
  if (!(await contract.isWriter(newPermission))) {
    if ((await hre.getUnnamedAccounts()).includes(currentOwner)) {
      const data = contract.interface.encodeFunctionData("addWritePermission", [newPermission]);

      await hre.deployments.rawTx({
        from: currentOwner,
        to: contract.address,
        data
      });
    } else {
      console.log(
        `Contract owner is not in the list of accounts, must be manually added with the following calldata:
        ${contract.interface.encodeFunctionData("addWritePermission", [newPermission])}
        `
      );
    }
  }
}


export async function addWitness(
  hre: HardhatRuntimeEnvironment,
  contract: any,
  newWitness: Address
): Promise<void> {
  const currentOwner = await contract.owner();
  if (!(await contract.isWitness(newWitness))) {
    if ((await hre.getUnnamedAccounts()).includes(currentOwner)) {
      const data = contract.interface.encodeFunctionData("addWitness", [newWitness]);

      await hre.deployments.rawTx({
        from: currentOwner,
        to: contract.address,
        data
      });
    } else {
      console.log(
        `Contract owner is not in the list of accounts, must be manually added with the following calldata:
        ${contract.interface.encodeFunctionData("addWitness", [newWitness])}
        `
      );
    }
  }
}

export async function addProviderHash(
  hre: HardhatRuntimeEnvironment,
  contract: any,
  newProviderHash: string
): Promise<void> {
  const currentOwner = await contract.owner();
  if (!(await contract.isProviderHash(newProviderHash))) {
    if ((await hre.getUnnamedAccounts()).includes(currentOwner)) {
      const data = contract.interface.encodeFunctionData("addProviderHash", [newProviderHash]);

      await hre.deployments.rawTx({
        from: currentOwner,
        to: contract.address,
        data
      });
    } else {
      console.log(
        `Contract owner is not in the list of accounts, must be manually added with the following calldata:
        ${contract.interface.encodeFunctionData("addProviderHash", [newProviderHash])}
        `
      );
    }
  }
}
