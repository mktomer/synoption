import { Injectable } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs';
import * as $ from 'jquery';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ApidataService {


  currentURL = "";

  constructor(private http:HttpClient, private router:Router) { }

  private alertMsgSbj = new Subject<any>();
  forAlertMsgSbj = this.alertMsgSbj.asObservable();

  public rootPath ()
    {

      this.currentURL = window.location.href; 

      if(this.currentURL.indexOf("local")!= -1)
      {
      return "http://codetest.local/webapi/";
      }
      else
      {
      return "http://www.synoption.mktomer.com/webapi/";
      }
        

      
    }

  public callApi (url,request,head,cnd)
  {
    url= this.rootPath()+url;
    return this.http.post(url, request, head);
  }



  public setAlertMsg(v)
  {
    var self = this;
    this.alertMsgSbj.next(v);
    setTimeout(function() {
      self.alertMsgSbj.next(false);
  }, 2000);
  }

}
