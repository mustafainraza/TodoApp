import { Component, OnInit } from '@angular/core';
import { Tag } from '../../model/Tag';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, UrlSegment } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TagService } from '../../service/tag.service';

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
            next: ({ tag }) => {
              this.currTag = tag;
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
    this.tagService.saveTask(this.currTag);
    console.log(this.currTag);
    this.goBack()
  }
}
