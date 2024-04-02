import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { TaskDTO } from '../../model/TaskDTO';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoListService } from '../../service/todo-list.service';
import { Tag } from '../../model/Tag.model';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ElementarySubTaskDTO } from '../../model/ElementarySubTaskDTO.model';
import { TagService } from '../../service/tag.service';
import { ApiResponse } from '../../model/ApiResponse.model';
import { map, Subscription } from 'rxjs';
@Component({
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule, NgMultiSelectDropDownModule],
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy {
  currTask!: TaskDTO;
  taskForm!: FormGroup;
  subTasksForm!: FormArray;
  submitButtonText: string = "";
  formDisabled: boolean = true;
  showSubTasks: string = "Hide";
  selectedList: Tag[] = [];
  dropDownList: Tag[] = [];
  dropdownSettings: IDropdownSettings = {};
  isError: boolean = false;
  error: ApiResponse = {code: 0, message: "", response: null};
  subscriptions: Subscription[] = [];
  newSubTaskIds: number = -1;
  constructor(
    private _route: ActivatedRoute, 
    private fb: FormBuilder, 
    private service: TodoListService,
    private _router: Router,
    private tagService: TagService
  ) { }
  

  ngOnInit() {
    this.subscriptions.push(this.tagService.sendGetAllTagsRequest()
      .pipe(map((apiResponse: ApiResponse)=>apiResponse.response))
      .subscribe({
        next: (tags: Tag[])=>{
          this.dropDownList = tags;
          this.isError = false;
        },
        error: (errorApiResponse)=>{
          this.isError = true;
          this.error = errorApiResponse;
        }
      })
    );
    this._route.url.subscribe({
      next: (url: UrlSegment[])=>{
        const urlParts: string[] = url.map((segment: UrlSegment)=>segment.path);
        if(urlParts.includes('edit')){ 
          this.submitButtonText = "Edit";
          this.formDisabled = false;
          this.resolveData()
        }
        else if(urlParts.includes('create')) {
          this.submitButtonText = "Create";
          this.formDisabled = false;
          this.currTask = {task: {id: -1, title: "", description: "", tags: []}, subTasks: []};
        } else {
          this.formDisabled = true;
          this.resolveData();
        }
      }
    });

    this.dropdownSettings = {
      idField: "id",
      textField: "name",
      singleSelection: false,
      selectAllText: 'Select All Tags',
      itemsShowLimit: 4,
      allowSearchFilter: true
    }
    this.initForm();
  }
  resolveData(){
    this._route.data.subscribe({
      next: ({taskApiResponse})=>{
        if(taskApiResponse.error){
          this.isError = true;
          this.error = taskApiResponse.error;
        } else{
          this.isError = false;
          this.currTask = taskApiResponse.response;
          console.log(this.currTask);
          this.selectedList = this.currTask.task.tags;
        }
      }
    });
  }
  onAddSubTask(){
    this.subTasksForm.push(this.fb.group({
      id: [this.newSubTaskIds],
      title: ["", Validators.required],
      description: ["", Validators.required]
    }));
    this.showSubTasks = "Hide";
    this.newSubTaskIds--;
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
  onDropDownItemSelect(item: any){
    const incomingTag: Tag = {id: item.id, name: item.name};
    this.currTask.task.tags.push(incomingTag);
  }
  onDropDownItemDeSelect(item: any){
    const incomingTag: Tag = {id: item.id, name: item.name};
    this.currTask.task.tags = this.currTask.task.tags.filter(tag=>tag.id !== incomingTag.id);
  }
  onSelectAll(items: any){
    const incomingList: Tag[] = items.map((item: any)=>({id: item.id, name: item.name}));
    this.currTask.task.tags = incomingList;
  }
  onSubmit(){  
    this.currTask.task.title = this.taskForm.get('title')?.value;
    this.currTask.task.description = this.taskForm.get('description')?.value;
    this.currTask.subTasks = [];
    this.subTasksForm.controls.forEach((subTaskControl)=>{
      this.currTask.subTasks.push({
        id: subTaskControl.get("id")?.value,
        title: subTaskControl.get("title")?.value,
        description: subTaskControl.get("description")?.value
      })
    })
    console.log(this.currTask.subTasks);
    this.service.saveTask(this.currTask).subscribe({
      next: (taskApiResponse: ApiResponse)=>{
        this.isError = false;
        this.goBack();
      },
      error: (errorApiResponse)=>{
        this.isError = true;
        this.error = errorApiResponse;
      }
    })
  }

  private initForm(){
    this.subTasksForm = this.fb.array(this.currTask.subTasks.map((task: ElementarySubTaskDTO)=> this.createTaskFormGroup(task)));
    this.taskForm = this.fb.group({
      id:[this.currTask.task.id],
      title: [this.currTask.task.title, Validators.required],
      description: [this.currTask.task.description, Validators.required],
      tags: [{value: this.selectedList, disabled: this.formDisabled}],
      subTasks: this.subTasksForm
    });
  }
  private createTaskFormGroup(task: ElementarySubTaskDTO){
    return this.fb.group({
      id: [task.id],
      title: [task.title, Validators.required],
      description: [task.description, Validators.required]
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }
}
