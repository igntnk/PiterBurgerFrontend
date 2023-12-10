import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from 'src/app/model/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent{

  @Input() group!:Group;

  @Output() groupSelected = new EventEmitter();

  onGroupSelected(){
    this.groupSelected.emit(this.group);
  }
}
