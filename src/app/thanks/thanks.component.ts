import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
