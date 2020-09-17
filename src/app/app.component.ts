import { Component } from '@angular/core';
import {ApidataService} from 'src/app/services/apidata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'synoption';
  alertMsg=false;

  constructor(public apiServices:ApidataService) { }

  ngOnInit()
  {
   
   this.apiServices.forAlertMsgSbj.subscribe(res=>{this.alertMsg = res});
   
   
 }

}
