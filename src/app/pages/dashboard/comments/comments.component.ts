import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  headerOptions: {
    checkBox: boolean;
    cols: string[];
    actions: string[];
    search: boolean;
    title: string;
  } = {
    cols: ['title', 'date', 'time'],
    checkBox: true,
    actions: [''],
    search: false,
    title: 'تعليقات القراء',
  };
}
