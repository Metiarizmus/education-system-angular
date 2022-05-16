import {Role} from "../../shared/models/role";

export interface LoginResponse {
  token: string
  refreshToken: string
  username: string
  email: string
  roles: Role[],
  expiresAt: Date
}
