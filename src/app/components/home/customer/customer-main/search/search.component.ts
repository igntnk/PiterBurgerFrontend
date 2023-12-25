import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(
    private sharedService: SharedService
  ){}

  filterChanged(){
    const element = document.getElementById("filterInput") as HTMLInputElement;
    this.sharedService.emitFilterChanging(element.value);
  }

}
