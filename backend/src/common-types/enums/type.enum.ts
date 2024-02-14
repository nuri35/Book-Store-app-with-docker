export enum UserType {
  User = 0,
  StoreManager = 1,
  Admin = 2,
}

export enum OperationType {
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE',
}

export enum TokenOperationType {
  verifyAfterRegistration = 'verify',
  loginAfterValidRegistration = 'login',
  refreshToken = 'rfToken',
}

export enum SessionType {
  Active = 0,
  Passive = 1,
}

export enum TokenUsabilityType {
  UnUsed = 0,
  Used = 1,
}
