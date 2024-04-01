import { Component, OnInit } from '@angular/core';
import { Tag } from '../../model/Tag.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, UrlSegment } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TagService } from '../../service/tag.service';
import { ApiResponse } from '../../model/ApiResponse.model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  currTag: Tag = { id: -1, name: '' };
  taskForm!: FormGroup;
  isShowError: boolean = false;
  error: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private tagService: TagService
  ) { }

  ngOnInit() {

    this._route.url.subscribe({
      next: (url: UrlSegment[]) => {
        const urlParts: string[] = url.map((segment: UrlSegment) => segment.path);
        if (urlParts.includes('edit')) {
          this._route.data.subscribe({
            next: ({tagApiResponse})=>{
              if(tagApiResponse.error){
                this.isShowError = true;
                this.error = tagApiResponse.error;
              } else{
                this.isShowError = false;
                this.currTag = tagApiResponse.response;
              }
            }
          });
        }
      },
    })
    this.initForm();
  }

  goBack() {
    this._router.navigate(["/tags"]);
  }

  initForm() {
    this.taskForm = this.fb.group({
      id: [this.currTag.id],
      name: [this.currTag.name, Validators.required],
    });
  }

  onSubmit() {
    this.currTag.name = this.taskForm.get('name')?.value;
    this.tagService.sendSaveTagRequest(this.currTag).subscribe({
      next: (tag: ApiResponse)=> {
        this.isShowError = false;
        console.log(tag);
        this.goBack();
      },
      error: error=>{
        this.isShowError = true;
        this.error = error;
        this.goBack();
      }
    })
  }
}
