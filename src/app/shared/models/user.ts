import {Role} from "./role";

export interface User {
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String
  avatar?: File | null,
  dateRegistr: String,
  roles: Role
}
