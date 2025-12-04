export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    USER = "USER",
    AGENT = "AGENT",
  }
  export interface IAuthProvider {
    provider: "phone" | "credentials";
    providerId: string;
  }
export interface IUser {
  _id?:string,
  name?: string;
  email?: string | null;
  password?: string | null;
  phone?: string | null;
  bio?: string | null;
  profilePicture?: string | null;
  location?: string | null;
  role?:Role
  auths: IAuthProvider[];
}


