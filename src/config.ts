export enum EnvironmentsEnum {
  devnet = 'devnet',
  testnet = 'testnet',
  mainnet = 'mainnet',
  devnet2 = 'devnet2'
}

export interface Config {
  chainID: string;
  networkProvider: string;
}

const devnetNetworkConfig: Config = {
  chainID: 'D',
  networkProvider: 'https://devnet-api.multiversx.com'
};

const devnet2NetworkConfig: Config = {
  chainID: 'D',
  networkProvider: 'https://devnet2-api.multiversx.com'
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
  devnet: 'ITHEUM-a61317',
  devnet2: '',
  mainnet: 'ITHEUM-df6f26',
  testnet: ''
};

export const factoryContractAddress: { [key in EnvironmentsEnum]: string } = {
  devnet: 'erd1qqqqqqqqqqqqqpgqrfxfdtgv42sh7dmh3yqncrcjta7vnz55w3wq6tfgd8',
  devnet2: '',
  mainnet: '',
  testnet: ''
};

export const apiConfiguration: { [key in EnvironmentsEnum]: string } = {
  devnet: 'https://devnet-api.multiversx.com',
  devnet2: 'https://devnet2-api.multiversx.com',
  mainnet: 'https://api.multiversx.com',
  testnet: 'https://testnet-api.multiversx.com'
};

export const networkConfiguration: { [key in EnvironmentsEnum]: Config } = {
  devnet: devnetNetworkConfig,
  devnet2: devnet2NetworkConfig,
  mainnet: mainnetNetworkConfig,
  testnet: testnetNetworkConfig
};
