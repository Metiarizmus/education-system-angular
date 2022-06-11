import {TaskProgress} from "./TaskProgress";

export interface Task {
  id?: number,
  name: string,
  text: string,
  description: string,
  dateCreated?: string,
  dateStart?: string,
  dateFinish?:string,
  expirationCountHours: number
  progressTasks?:TaskProgress
}
