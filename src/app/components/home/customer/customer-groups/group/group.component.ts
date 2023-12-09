import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from 'src/app/model/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements AfterViewInit {

  @Input() group!:Group;

  @Output() clicked = new EventEmitter();

  ngAfterViewInit(): void {
      console.log(this.group);
  }

  onClicked(){
    this.clicked.emit(this.group);
  }
}
