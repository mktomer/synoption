import { Component, OnInit } from '@angular/core';
import {ApidataService} from '../services/apidata.service';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

declare var $: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  rootPath:any="";
  loader:any=true;
  cartList:any;
  totalPrice:any;
  alertMsg:any;
  constructor(private router: Router, private apiServices:ApidataService) {  }

  ngOnInit(): void {
    this.rootPath = this.apiServices.rootPath();
    this.loader = true;


    let rqData={"command":"getQuery", "targate":"cart"}
    let head = new HttpHeaders();
    head.append("Content-Type","application/json");

    this.apiServices.callApi('webpage_qu', rqData, head,false ).subscribe(res =>{this.cartProdList(res)},err =>{this.errorFn(err)});
  }


  cartProdList(data)
  {
    console.log(data);
    this.loader = false;
    this.cartList = data.result;

    this.totalPrice=this.getTotal( this.cartList);
  }

  getTotal(list)
  {
    let sum=0;
    for( var p in list ) 
    {
      
      sum+= (parseFloat(list[p].price) *  parseFloat(list[p].quantity));
      
      
    }
    return sum;
  }



  errorFn(err)
  {
    
		
		
  }


  quantityFn(item,vr)
  {
    if(vr && item.quantity<10)
    {
      item.quantity++;
    }
    else if(!vr && item.quantity>1)
    {
      item.quantity--;
    }

    this.totalPrice=this.getTotal( this.cartList);
  }

  quantityCh(item)
  {
    if(item.quantity>10)
    {
      item.quantity=10;
    }
    else if(item.quantity<1)
    {
      item.quantity=1;
    }

    this.totalPrice=this.getTotal( this.cartList);

  }


  removitem(item)
  {
   
    this.apiServices.setAlertMsg("One Item Deleting...");
    let rqData={"command":"updateQuery", "targate":"cart","id":item}
    let head = new HttpHeaders();
    head.append("Content-Type","application/json");

    this.apiServices.callApi('webpage_qu', rqData, head,false ).subscribe(res =>{this.cartProdList(res)},err =>{this.errorFn(err)});

    
  }


  

  orderFn()
  {
    let rqData={"command":"updateQuery", "targate":"cart","id":"all"}
    let head = new HttpHeaders();
    head.append("Content-Type","application/json");

    this.apiServices.callApi('webpage_qu', rqData, head,false ).subscribe(res =>{this.cartProdList(res)},err =>{this.errorFn(err)});
    
    this.router.navigate(['thanks'])
  }

}
