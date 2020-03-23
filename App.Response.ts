export interface UserResponse {
  d: UserData;
}

interface UserData {
  ClientPeoplePickerSearchUser: UserInfo[];
}

export interface UserInfo {
  Key: string;
  Description: string;
  DisplayText: string;
  EntityType: string;
  ProviderDisplayName: string;
  ProviderName: string;
  IsResolved: boolean;
  EntityData: UserEntity;
  MultipleMatches: any[];
}

export interface UserEntity {
  IsAltSecIdPresent: string;
  Title: string;
  Email: string;
  MobilePhone: string;
  ObjectId: string;
  Department: string;
}

export interface FormDigest {
  'odata.metadata': string;
  FormDigestTimeoutSeconds: number;
  FormDigestValue: string;
  LibraryVersion: string;
  SiteFullUrl: string;
  SupportedSchemaVersions: string[];
  WebFullUrl: string;
}