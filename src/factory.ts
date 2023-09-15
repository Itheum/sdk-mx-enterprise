import {
  AbiRegistry,
  Address,
  AddressValue,
  BigUIntType,
  BigUIntValue,
  BooleanValue,
  ContractCallPayloadBuilder,
  ContractFunction,
  IAddress,
  ResultsParser,
  SmartContract,
  StringValue,
  Transaction
} from '@multiversx/sdk-core/out';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers/out';
import {
  EnvironmentsEnum,
  factoryContractAddress,
  networkConfiguration
} from './config';

import factoryAbi from './abis/core-mx-minter-factory-sc.abi.json';
import { DeployedContract } from './interfaces';
import { checkVersionFormat } from './utils';

export class Factory {
  readonly contract: SmartContract;
  readonly chainID: string;
  readonly networkProvider: ApiNetworkProvider;
  readonly env: string;

  /**
   * Creates a new instance of the `Factory` class, which can be used to interact with factory
   * @param env 'devnet' | 'mainnet' | 'testnet'
   * @param timeout Timeout for the network provider (DEFAULT = 10000ms)
   */
  constructor(env: string, timeout = 10000) {
    this.env = env;
    const networkConfig = networkConfiguration[env as EnvironmentsEnum];
    this.chainID = networkConfig.chainID;
    this.networkProvider = new ApiNetworkProvider(
      networkConfig.networkProvider,
      {
        timeout: timeout
      }
    );
    const contractAddress = factoryContractAddress[env as EnvironmentsEnum];
    this.contract = new SmartContract({
      address: new Address(contractAddress),
      abi: AbiRegistry.create(factoryAbi)
    });
  }

  /**
   * Retrives the address of the minter smart contract based on the environment
   */
  getContractAddress(): IAddress {
    return this.contract.getAddress();
  }

  /**
   * Retrieves a boolean value indicating wheter the address is whitelisted or not
   * @param address The address to check
   */
  async viewAddressIsWhitelisted(address: IAddress): Promise<boolean> {
    const interaction = this.contract.methodsExplicit.getIsWhitelisted([
      new AddressValue(address)
    ]);
    const query = interaction.buildQuery();
    const queryResponse = await this.networkProvider.queryContract(query);
    const endpointDefinition = interaction.getEndpoint();
    const { firstValue, returnCode } = new ResultsParser().parseQueryResponse(
      queryResponse,
      endpointDefinition
    );
    if (returnCode.isSuccess()) {
      const returnValue = firstValue?.valueOf();
      return new BooleanValue(returnValue).valueOf();
    } else {
      throw new Error('Error while retrieving the contract pause state');
      // throw new ErrContractQuery(
      //   'Error while retrieving the contract pause state'
      // );
    }
  }

  /**
   * Retrives address contracts
   * @param address The address to check
   */
  async viewAddressContracts(address: IAddress): Promise<DeployedContract[]> {
    const interaction = this.contract.methodsExplicit.getAddressContracts([
      new AddressValue(address)
    ]);
    const query = interaction.buildQuery();
    const queryResponse = await this.networkProvider.queryContract(query);
    const endpointDefinition = interaction.getEndpoint();
    const { firstValue, returnCode } = new ResultsParser().parseQueryResponse(
      queryResponse,
      endpointDefinition
    );
    if (returnCode.isSuccess()) {
      const returnValue = firstValue?.valueOf();
      const results = returnValue?.map((contract: any) => {
        return {
          owner: contract.owner,
          address: contract.address,
          version: contract.version
        };
      });
      return results;
    } else {
      throw new Error('Error while retrieving the contract pause state');
      // throw new ErrContractQuery(
      //   'Error while retrieving the contract pause state'
      // );
    }
  }

  /**
   * Retrives deployed contracts of factory
   */
  async viewContracts(): Promise<DeployedContract[]> {
    const interaction = this.contract.methodsExplicit.getChildContracts();
    const query = interaction.buildQuery();
    const queryResponse = await this.networkProvider.queryContract(query);
    const endpointDefinition = interaction.getEndpoint();
    const { firstValue, returnCode } = new ResultsParser().parseQueryResponse(
      queryResponse,
      endpointDefinition
    );
    if (returnCode.isSuccess()) {
      const returnValue = firstValue?.valueOf();
      const results = returnValue?.map((contract: any) => {
        return {
          owner: contract.owner,
          address: contract.address,
          version: contract.version
        };
      });
      return results;
    } else {
      throw new Error('Error while retrieving the contract pause state');
      // throw new ErrContractQuery(
      //   'Error while retrieving the contract pause state'
      // );
    }
  }

  /**
   * Retrives versions available
   */
  async viewVersions(): Promise<string[]> {
    const interaction = this.contract.methodsExplicit.getVersions();
    const query = interaction.buildQuery();
    const queryResponse = await this.networkProvider.queryContract(query);
    const endpointDefinition = interaction.getEndpoint();
    const { firstValue, returnCode } = new ResultsParser().parseQueryResponse(
      queryResponse,
      endpointDefinition
    );
    if (returnCode.isSuccess()) {
      const returnValue = firstValue?.valueOf();
      const results = returnValue?.map((version: any) => {
        return version.toString();
      });
      return results;
    } else {
      throw new Error('Error while retrieving the contract pause state');
      // throw new ErrContractQuery(
      //   'Error while retrieving the contract pause state'
      // );
    }
  }

  /**
   * Retrieves the smart contract pause state
   */
  async viewContractPauseState(): Promise<boolean> {
    const interaction = this.contract.methodsExplicit.getPauseState();
    const query = interaction.buildQuery();
    const queryResponse = await this.networkProvider.queryContract(query);
    const endpointDefinition = interaction.getEndpoint();
    const { firstValue, returnCode } = new ResultsParser().parseQueryResponse(
      queryResponse,
      endpointDefinition
    );
    if (returnCode.isSuccess()) {
      const returnValue = firstValue?.valueOf();
      return new BooleanValue(returnValue).valueOf();
    } else {
      throw new Error('Error while retrieving the contract pause state');
      // throw new ErrContractQuery(
      //   'Error while retrieving the contract pause state'
      // );
    }
  }

  /**
   * Retrieves the code of minter smart contract based on version
   * @param version The version of the minter smart contract
   */
  async viewContractCode(version: string): Promise<string> {
    checkVersionFormat(version);
    const interaction = this.contract.methodsExplicit.getContractCode([
      new StringValue(version)
    ]);
    const query = interaction.buildQuery();
    const queryResponse = await this.networkProvider.queryContract(query);
    const endpointDefinition = interaction.getEndpoint();
    const { firstValue, returnCode } = new ResultsParser().parseQueryResponse(
      queryResponse,
      endpointDefinition
    );
    if (returnCode.isSuccess()) {
      const returnValue = firstValue?.valueOf().toString();
      return returnValue;
    } else {
      throw new Error('Error while retrieving the contract pause state');
      // throw new ErrContractQuery(
      //   'Error while retrieving the contract pause state'
      // );
    }
  }

  /**
   *
   * @param senderAddress The address of the sender, must be the owner of the contract
   * @param treasuryAddress The address of the treasury
   */
  initializeContract(
    senderAddress: IAddress,
    treasuryAddress: IAddress
  ): Transaction {
    const initializeContractTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('initializeContract'))
        .addArg(new AddressValue(treasuryAddress))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return initializeContractTx;
  }

  /**
   * @param senderAddress The address of the sender, must be the owner of the contract
   * @param  code The code of the minter contract
   * @param version The version of the minter contract
   */
  uploadCode(
    senderAddress: IAddress,
    code: string,
    version: string
  ): Transaction {
    checkVersionFormat(version);
    const uploadCodeTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('uploadCode'))
        .addArg(new StringValue(code))
        .addArg(new StringValue(version))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return uploadCodeTx;
  }

  /**
   *  @param senderAddress The address of the sender, must be the owner of the contract
   *  @param version The version of the minter contract
   */
  removeCode(senderAddress: IAddress, version: string): Transaction {
    checkVersionFormat(version);
    const removeCodeTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('removeCode'))
        .addArg(new StringValue(version))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return removeCodeTx;
  }

  /**
   *
   * @param senderAddress The address of the sender, must be the owner of the contract
   * @param address The address to whitelist
   */
  whitelist(senderAddress: IAddress, address: IAddress): Transaction {
    const whitelistTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('whitelist'))
        .addArg(new AddressValue(address))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return whitelistTx;
  }

  /**
   *
   * @param senderAddress The address of the sender, must be the owner of the contract
   * @param address The address to delist
   */
  delist(senderAddress: IAddress, address: IAddress): Transaction {
    const delistTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('delist'))
        .addArg(new AddressValue(address))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return delistTx;
  }

  /**
   *
   * @param senderAddress The address of the deployer of the minter contract
   * @param version The version of the minter contract code
   */
  deployContract(senderAddress: IAddress, version: string): Transaction {
    checkVersionFormat(version);
    const deployContractTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('deployChildContract'))
        .addArg(new StringValue(version))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return deployContractTx;
  }

  /**
   *
   * @param senderAddress The address of the sender, must be the owner of the contract
   * @param childContractAddress The address of the child contract
   * @param upgradeVersion The version of the minter contract code to upgrade
   */
  upgradeChildContract(
    senderAddress: IAddress,
    childContractAddress: IAddress,
    upgradeVersion: string
  ): Transaction {
    checkVersionFormat(upgradeVersion);
    const upgradeChildContractTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('upgradeChildContract'))
        .addArg(new AddressValue(childContractAddress))
        .addArg(new StringValue(upgradeVersion))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return upgradeChildContractTx;
  }

  /**
   *
   * @param senderAddress The address of the deployer of the minter contract
   * @param childContractAddress The address of the child contract
   */
  upgradeLastVersion(
    senderAddress: IAddress,
    childContractAddress: IAddress
  ): Transaction {
    const upgradeChildContractTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('upgradeLastVersion'))
        .addArg(new AddressValue(childContractAddress))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return upgradeChildContractTx;
  }

  /**
   *
   * @param senderAddress The address of the sender, must be the owner of the contract
   * Note: It change the ownership of the minter contract to the deployer of minter contract
   */
  changeOwnership(senderAddress: IAddress): Transaction {
    const changeOwnershipTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('changeOwnership'))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return changeOwnershipTx;
  }

  /**
   *
   * @param senderAddress The address of the sender, must be the owner of the contract
   * @param childContractAddress The address of the child contract
   * @param taxPercentage The tax percentage to set (e.g. 100% = 10000)
   */
  setTaxForChildContract(
    senderAddress: IAddress,
    childContractAddress: IAddress,
    taxPercentage: number
  ): Transaction {
    const setTaxForChildContractTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('setTaxForChildContract'))
        .addArg(new AddressValue(childContractAddress))
        .addArg(new BigUIntValue(taxPercentage))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return setTaxForChildContractTx;
  }

  /**
   * Pause contract transaction
   */
  pause(): Transaction {
    const pauseTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('pause'))
        .build(),
      sender: this.getContractAddress(),
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return pauseTx;
  }

  /**
   * Unpause contract transaction
   */
  unpause(): Transaction {
    const unpauseTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('unpause'))
        .build(),
      sender: this.getContractAddress(),
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return unpauseTx;
  }

  /**
   *
   * @param senderAddress The address of the sender, must be the owner of the contract
   * @param treasuryAddress The address of the treasury
   */
  setTreasuryAddress(
    senderAddress: IAddress,
    treasuryAddress: IAddress
  ): Transaction {
    const setTreasuryAddressTx = new Transaction({
      value: 0,
      data: new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('setTreasuryAddress'))
        .addArg(new AddressValue(treasuryAddress))
        .build(),
      sender: senderAddress,
      gasLimit: 1000000,
      receiver: this.getContractAddress(),
      chainID: this.chainID
    });
    return setTreasuryAddressTx;
  }
}
