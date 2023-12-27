import { AfterViewInit, Component } from '@angular/core';
import { Page } from 'src/app/model/page';
import { SharedService } from 'src/app/services/local/shared.service';

@Component({
  selector: 'app-paginator-controll',
  templateUrl: './paginator-controll.component.html',
  styleUrls: ['./paginator-controll.component.css']
})
export class PaginatorControllComponent implements AfterViewInit{

  pageInfo: Page;
  totalPages: number;

  constructor(
    private sharedService: SharedService
  ){
    sharedService.onPaginatorChanging.subscribe((data:Page)=>{
      this.pageInfo = data;
      this.totalPages = Math.ceil(this.pageInfo.total/this.pageInfo.size);
    })
  }

  ngAfterViewInit(): void {
    setTimeout(()=>document.documentElement.style.setProperty('--paginatorOpacity',"100%"),600);
  }

  onBackPressed(){
    if(this.pageInfo.page != 0){
      this.sharedService.emitChangingByPaginator(new Page(
        this.pageInfo.page-1,
        this.pageInfo.size,
        this.pageInfo.total));
      this.pageInfo.page-=1;
    }
  }

  onForwardPressed(){
    if(this.pageInfo.page+1 != this.totalPages){
      this.sharedService.emitChangingByPaginator(new Page(
        this.pageInfo.page+1,
        this.pageInfo.size,
        this.pageInfo.total));
      this.pageInfo.page+=1;
    }
  }

}
