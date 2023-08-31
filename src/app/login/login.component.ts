import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  val = {
    email: 'charl@gmail.com',
    password: '123456'
  };

  constructor() {


  }

  ngOnInit() {

  }

  Login (LoginForm: NgForm, submit) {
    console.log(LoginForm.value, LoginForm.valid, submit);

    console.log('value {0}' , this.val);
  }

}
