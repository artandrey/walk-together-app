export interface ISetUserProfile {
  nickname: string;
  profilePicturePath?: string;
}

export interface IRetrieveUserProfile {
  nickname: string;
  code: number;
  profilePicturePath: string;
}
