import { Component } from '@angular/core';
import { TableOption } from 'src/app/models/components.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  tableOptions: TableOption = {
    isCheckbox: true,
  };
}
