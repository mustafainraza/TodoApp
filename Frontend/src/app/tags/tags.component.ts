import { Component, OnInit } from '@angular/core';
import { Tag } from '../model/Tag';
import { TagService } from '../service/tag.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Tag[] = [];
  private tasksSubscription!: Subscription;

  constructor(private tagService: TagService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tags = this.tagService.tags;
    this.tasksSubscription = this.tagService.tagSubject.subscribe(tags => this.tags = tags);
  }

  deleteTag(id: number) {
    this.tagService.deleteTag(+id);
  }

  EditTag(id: number) {    
    this.router.navigate(['/tags/edit', id], { relativeTo: this.route });
  }    

  ngDestroy() {
    this.tasksSubscription.unsubscribe();
  } 

}
