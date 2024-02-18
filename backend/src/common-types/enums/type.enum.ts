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
  Fiction = 'Fiction',
  NonFiction = 'Non-Fiction',
  Mystery = 'Mystery',
  Romance = 'Romance',
  ScienceFiction = 'Science Fiction',
  Biography = 'Biography',
  History = 'History',
  Poetry = 'Poetry',
  Fantasy = 'Fantasy',
  Other = 'Other',
}
