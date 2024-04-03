import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tag } from '../model/Tag.model';
import { TagService } from '../service/tag.service';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiResponse } from '../model/ApiResponse.model';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error/error.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ErrorComponent],
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {

  tags: Tag[] = [];
  isError: boolean = false;
  error: any;
  private subscriptions: Subscription[] = [];

  constructor(private tagService: TagService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAllTags();
  }

  getAllTags(){
    this.subscriptions.push(
      this.tagService.sendGetAllTagsRequest().pipe(map((tags: ApiResponse)=>tags.response)).subscribe({
        next: (tags: Tag[])=>{
          this.isError = false;
          this.tags=tags;
        },
        error: error=>{
          this.isError = true;
          this.error = error;
        }
      })
    );
  }

  deleteTag(id: number) {
    this.subscriptions.push(
      this.tagService.sendDeleteTagRequest(id).subscribe({
        next: (status: ApiResponse)=>{
          console.log(status)
          if(!status.response){
            this.isError = true;
            this.error = status;
          } else {
            this.isError = false;
            this.getAllTags();
          }
        },
        error: error=>{
          console.log(error);
          this.isError = true;
          this.error = error;
        }
      })
    );
  }

  EditTag(id: number) {
    this.router.navigate(['/tags/edit', id], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

}
