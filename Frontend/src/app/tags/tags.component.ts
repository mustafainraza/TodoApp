import { Component, OnInit } from '@angular/core';
import { Tag } from '../model/Tag';
import { TagService } from '../service/tag.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Tag[] = [];
  private tasksSubscription!: Subscription;
  
  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tags = this.tagService.tags;
    this.tagService.tagSubject.subscribe(tags => this.tags = tags);    
  }

  deleteTag(id: number) {
    this.tagService.deleteTag(+id);
  }


}
