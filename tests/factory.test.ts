import { Address, Transaction } from '@multiversx/sdk-core/out';
import { DeployedContract, Factory } from '../src';

describe('Factory test', () => {
  test('#get factory contract address', () => {
    const factory = new Factory('devnet');
    const address = factory.getContractAddress();
    expect(address).toBeInstanceOf(Address);
  });

  test('#check factory tax percentage', async () => {
    const factory = new Factory('devnet');
    const taxPercentage = await factory.viewTaxPercentage();
    expect(typeof taxPercentage === 'number').toBe(true);
  });

  test('#check treasury address', async () => {
    const factory = new Factory('devnet');
    const treasuryAddress = await factory.viewTreasuryAddress();
    expect(treasuryAddress).toBeInstanceOf(Address);
  });

  test('#check claims contract address', async () => {
    const factory = new Factory('devnet');
    const claimsAddress = await factory.viewClaimsContractAddress();
    expect(claimsAddress).toBeInstanceOf(Address);
  });

  test('#check claims token identifier', async () => {
    const factory = new Factory('devnet');
    const claimsTokenIdentifier = await factory.viewClaimsTokenIdentifier();
    expect(typeof claimsTokenIdentifier === 'string').toBe(true);
  });

  test('#check if address is whitelisted', async () => {
    const factory = new Factory('devnet');
    const isWhitelisted = await factory.viewAddressIsWhitelisted(
      new Address(
        'erd1qqqqqqqqqqqqqpgqpd9qxrq5a03jrneafmlmckmlj5zgdj55fsxsqa7jsm'
      )
    );
    expect(isWhitelisted).toBe(false);
  });

  test('#check whitelist state on factory contract', async () => {
    const factory = new Factory('devnet');
    const whitelistState = await factory.viewWhitelistState();
    expect(whitelistState).toBe(false);
  });

  test('#check pause state of factory contract', async () => {
    const factory = new Factory('devnet');
    const pauseState = await factory.viewContractPauseState();
    expect(pauseState).toBe(false);
  });

  test('#view contract code of minter contract by version', async () => {
    const factory = new Factory('devnet');
    const code = await factory.viewContractCode('0.0.1');
    expect(typeof code === 'string' && code.length > 0).toBe(true);
  });

  test('#upgrade child contract to new version', async () => {
    const factory = new Factory('devnet');
    const addressOfDeployer = new Address(
      'erd1w6ffeexmumd5qzme78grrvp33qngcgqk2prjyuuyawpc955gvcxqqrsrtw'
    );
    const deployedMinterContract = new Address(
      'erd1qqqqqqqqqqqqqpgqpd9qxrq5a03jrneafmlmckmlj5zgdj55fsxsqa7jsm'
    );
    const tx = factory.upgradeChildContract(
      addressOfDeployer, // or owner of factory contract
      deployedMinterContract,
      '0.0.1'
    );

    expect(tx).toBeInstanceOf(Transaction);
  });

  test('#check address deployed contracts', async () => {
    const factory = new Factory('devnet');
    const contracts = await factory.viewAddressContracts(
      new Address(
        'erd1qqqqqqqqqqqqqpgqpd9qxrq5a03jrneafmlmckmlj5zgdj55fsxsqa7jsm'
      )
    );
    expect(contracts).toEqual([]); // has no contracts deployeds
  });

  test('#check contracts deployed by factory', async () => {
    const factory = new Factory('devnet');
    const contracts = await factory.viewContracts(0, 1); //from = 0 , to = 1
    contracts.forEach((contract) => {
      expect(contract).toBeInstanceOf(Object as unknown as DeployedContract);
    });
  });

  test('#check versions available in factory of minter contract', async () => {
    const factory = new Factory('devnet');
    const versions = await factory.viewVersions();
    expect(versions).toEqual(['0.0.1', '0.0.2']);
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
