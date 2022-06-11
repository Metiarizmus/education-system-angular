import {Organization} from "./organization";
import {User} from "./user";
import {Task} from "./task";

export interface Course {
  id?: number
  name: string
  description: string
  dateCreat?: string
  plan: string
  creatorId?: number
  org?: Organization
  tasks?: Task[]
  users?: Array<User>
  managerName?: string
  statusCourseEnum?: string
}
