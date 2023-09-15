import {
  AbiRegistry,
  Address,
  AddressValue,
  BooleanValue,
  IAddress,
  ResultsParser,
  SmartContract,
  StringValue
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
}
