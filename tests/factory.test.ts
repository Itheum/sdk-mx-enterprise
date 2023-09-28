import { Address, Transaction } from '@multiversx/sdk-core/out';
import { DeployedContract, Factory } from '../src';

describe('Factory test', () => {
  test('#check if address is whitelisted', async () => {
    const factory = new Factory('devnet');
    const isWhitelisted = await factory.viewAddressIsWhitelisted(
      new Address(
        'erd1qqqqqqqqqqqqqpgqpd9qxrq5a03jrneafmlmckmlj5zgdj55fsxsqa7jsm'
      )
    );
    expect(isWhitelisted).toBe(false);
  });

  test('#check address contracts', async () => {
    const factory = new Factory('devnet');
    const contracts = await factory.viewAddressContracts(
      new Address(
        'erd1qqqqqqqqqqqqqpgqpd9qxrq5a03jrneafmlmckmlj5zgdj55fsxsqa7jsm'
      )
    );
    expect(contracts).toEqual([]);
  });

  test('#check all contracts', async () => {
    const factory = new Factory('devnet');
    const contracts = await factory.viewContracts(0, 1);
    contracts.forEach((contract) => {
      expect(contract).toBeInstanceOf(Object as unknown as DeployedContract);
    });
  });

  test('#check versions', async () => {
    const factory = new Factory('devnet');
    const versions = await factory.viewVersions();
    expect(versions).toEqual(['0.0.1']);
  });

  test('#deploy minter contract', async () => {
    const factory = new Factory('devnet');
    const addressOfDeployer = new Address(
      'erd1w6ffeexmumd5qzme78grrvp33qngcgqk2prjyuuyawpc955gvcxqqrsrtw'
    );
    const tx = factory.deployContract(addressOfDeployer, '0.0.1');
    expect(tx).toBeInstanceOf(Transaction);
  });

  test('#test bad environment', () => {
    expect(() => new Factory('devnet3')).toThrowError(
      `Invalid environment: devnet3, Expected: 'devnet' | 'devnet2' | 'mainnet' | 'testnet'`
    );
  });
});
