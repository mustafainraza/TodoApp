import { ElementarySubTaskDTO } from "./ElementarySubTaskDTO.model";
import { ElementaryTaskDTO } from "./ElementaryTaskDTO.model";
import { Task } from "./Task.model";

export interface TaskDTO{
    task: ElementaryTaskDTO;
    subTasks: ElementarySubTaskDTO[];
}