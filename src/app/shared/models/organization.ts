import {User} from "./user";
import {Course} from "./course";

export interface Organization {
  id: number;
  name: string;
  description: string;
  status: string;
  avatar?: File | null,
  users?: Array<User>
  courses?: Array<Course> | null
  dateCreated?: string
  creatorId?: number
  isChecked?: boolean
}

