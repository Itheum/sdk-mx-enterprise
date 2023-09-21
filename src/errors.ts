export class ErrNetworkConfig extends Error {
  public constructor(message?: string) {
    super(
      message ||
        'Network configuration is not set. Call setNetworkConfig static method before calling any method that requires network configuration.'
    );
  }
}

export class ErrInvalidArgument extends Error {
  public constructor(message: string) {
    super(`Invalid argument: ${message}`);
  }
}

export class ErrBadType extends Error {
  public constructor(name: string, type: any, value?: any, context?: string) {
    super(
      `Bad type of "${name}": ${value}. Expected type: ${type}. Context: ${context}`
    );
  }
}

export class ErrContractQuery extends Error {
  public constructor(method: string, message?: string) {
    super(`Failed to query contract with method: ${method} : ${message}`);
  }
}
