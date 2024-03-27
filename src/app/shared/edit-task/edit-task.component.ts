import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { TaskDTO } from '../../model/TaskDTO';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../model/Task.model';
import { CommonModule } from '@angular/common';
import { TodoListService } from '../../service/todo-list.service';

@Component({
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule],
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  currTask!: TaskDTO;
  taskForm!: FormGroup;
  subTasksForm!: FormArray;
  submitButtonText: string = "";
  formDisabled: boolean = true;
  showSubTasks: string = "Hide";
  constructor(
    private _route: ActivatedRoute, 
    private fb: FormBuilder, 
    private service: TodoListService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.url.subscribe({
      next: (url: UrlSegment[])=>{
        const urlParts: string[] = url.map((segment: UrlSegment)=>segment.path);
        if(urlParts.includes('edit')){ 
          this.submitButtonText = "Edit";
          this.formDisabled = false;
          this._route.data.subscribe({
            next: ({task})=>{
              this.currTask = task;
            }
          });
        }
        else if(urlParts.includes('create')) {
          this.submitButtonText = "Create";
          this.formDisabled = false;
          this.currTask = {task: new Task("", "", [], -1, -1), subTasks: []}
        } else {
          this.formDisabled = true;
          this._route.data.subscribe({
            next: ({task})=>{
              this.currTask = task;
            }
          });
        }
      }
    })
    this.initForm();
  }
  onAddSubTask(){
    this.subTasksForm.push(this.fb.group({
      id: [78],
      title: ["", Validators.required],
      description: ["", Validators.required]
    }));
    this.showSubTasks = "Hide";
  }
  onRemoveSubTask(index: number){
    this.subTasksForm.removeAt(index)
  }
  onChangeSubTaskVisibility(){
    this.showSubTasks = this.showSubTasks==="Show" ? "Hide": "Show";
  }
  goBack(){
    this._router.navigate(["/"]);
  }
  onSubmit(){
    this.currTask.task.title = this.taskForm.get('title')?.value;
    this.currTask.task.description = this.taskForm.get('description')?.value;
    this.subTasksForm.controls.forEach((subTaskControl)=>{
      const subTaskControlEntryId: number = +subTaskControl.get("id")?.value
      const currSubTask: Task = this.currTask.subTasks.filter(subTask=>subTask.id===subTaskControlEntryId)[0];
      currSubTask.title = subTaskControl.get('title')?.value;
      currSubTask.description = subTaskControl.get('description')?.value
    })
    this.service.saveTask(this.currTask);
    console.log(this.currTask);
    this.goBack()
  }

  private initForm(){
    this.subTasksForm = this.fb.array(this.currTask.subTasks.map((task: Task)=> this.createTaskFormGroup(task)));
    this.taskForm = this.fb.group({
      id:[this.currTask.task.id],
      title: [this.currTask.task.title, Validators.required],
      description: [this.currTask.task.description, Validators.required],
      subTasks: this.subTasksForm
    });
  }
  private createTaskFormGroup(task: Task){
    return this.fb.group({
      id: [task.id],
      title: [task.title, Validators.required],
      description: [task.description, Validators.required]
    });
  }

}
