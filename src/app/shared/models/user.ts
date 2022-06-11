import {Role} from "./role";
import {Organization} from "./organization";
import {Course} from "./course";

export interface User {
  id: number,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String
  avatar?: File | null,
  dateRegistr: String,
  roles?: Role,
  orgs?: Array<Organization>,
  courses?: Array<Course>
}
