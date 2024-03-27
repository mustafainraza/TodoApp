import { Task } from "./Task.model";

export interface TaskDTO{
    task: Task;
    subTasks: Task[];
}