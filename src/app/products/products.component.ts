import { Component, OnInit } from '@angular/core';
import {ApidataService} from '../services/apidata.service';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  rootPath:any="";
  loader:any=true;
  prodList:any;
  constructor(private router: Router, private apiServices:ApidataService) {  }

  ngOnInit(): void
  {
    this.rootPath = this.apiServices.rootPath();
    this.loader = true;


    let rqData={"command":"getQuery", "targate":"products"}
    let head = new HttpHeaders();
    head.append("Content-Type","application/json");

    this.apiServices.callApi('webpage_qu', rqData, head,false ).subscribe(res =>{this.productList(res)},err =>{this.errorFn(err)});


  }



  productList(data)
  {
    
    this.loader = false;
    this.prodList = data.result;
  }





  errorFn(err)
  {
      alert("Something is wrong...")
  }



  addtocart(item)
  {
   
    let rqData={"command":"setQuery", "targate":"cart","product":item}
    let head = new HttpHeaders();
    head.append("Content-Type","application/json");

    this.apiServices.callApi('webpage_qu', rqData, head,false ).subscribe(res =>{this.msgFn('Product addded')},err =>{this.errorFn(err)});
  }


  msgFn(v)
  {
    this.apiServices.setAlertMsg(v);
  }


}
