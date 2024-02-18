export enum UserType {
  User = 1,
  StoreManager = 2,
  Admin = 3,
}

export enum OperationType {
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE',
}

export enum userLoginType {
  CanLogin = 0,
  CantLogin = 1,
}

export enum TokenOperationType {
  welcomeAfterRegistration = 'welcome',
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

export enum GenreType {
  Fiction = 0,
  NonFiction = 1,
  Mystery = 2,
  Romance = 3,
  ScienceFiction = 4,
  Biography = 5,
  History = 6,
  Poetry = 7,
  Fantasy = 8,
  Other = 9,
}
