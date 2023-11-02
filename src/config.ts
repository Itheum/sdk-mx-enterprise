export enum EnvironmentsEnum {
  devnet = 'devnet',
  testnet = 'testnet',
  mainnet = 'mainnet'
}

export interface Config {
  chainID: string;
  networkProvider: string;
}

const devnetNetworkConfig: Config = {
  chainID: 'D',
  networkProvider: 'https://devnet-api.multiversx.com'
};

const mainnetNetworkConfig: Config = {
  chainID: '1',
  networkProvider: 'https://api.multiversx.com'
};

const testnetNetworkConfig: Config = {
  chainID: 'T',
  networkProvider: 'https://testnet-api.multiversx.com'
};

export const itheumTokenIdentifier: { [key in EnvironmentsEnum]: string } = {
  devnet: 'ITHEUM-fce905',
  mainnet: 'ITHEUM-df6f26',
  testnet: ''
};

export const factoryContractAddress: { [key in EnvironmentsEnum]: string } = {
  devnet: 'erd1qqqqqqqqqqqqqpgqwcjfrnk2sucvu5mnvuucsyyqgd9rn3ps8ypsde9tr9',
  mainnet: '',
  testnet: ''
};

export const apiConfiguration: { [key in EnvironmentsEnum]: string } = {
  devnet: 'https://devnet-api.multiversx.com',
  mainnet: 'https://api.multiversx.com',
  testnet: 'https://testnet-api.multiversx.com'
};

export const networkConfiguration: { [key in EnvironmentsEnum]: Config } = {
  devnet: devnetNetworkConfig,
  mainnet: mainnetNetworkConfig,
  testnet: testnetNetworkConfig
};
