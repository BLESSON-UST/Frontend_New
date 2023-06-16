import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { login } from '../login';
import { AuthenticateServiceService } from '../services/authenticate-service.service';
import { RouterServiceService } from '../services/router-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: login = new login();

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  submitted = false;


  submitMessage: string;
  flag: boolean = false;

  constructor(private routerService: RouterServiceService, private authservice: AuthenticateServiceService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    if (sessionStorage.getItem('key') != null) {
      this.routerService.tohome();
      // this.routerService.tologin();
      // sessionStorage.removeItem('key');
    }
    else {
      this.loginForm = new FormGroup({
        email: new FormControl(),
        password: new FormControl()
      });
    }


  }

 

  loginSubmit() {
    console.log("hi from loginsubmit");
    this.login.email = this.loginForm.value.email;
    this.login.password = this.loginForm.value.password;

    this.submitMessage = this.loginForm.value.email;

    console.log("Login Submit: " + this.loginForm.value);

    this.authservice.getusers(this.login).subscribe((data) => {
      this.authservice.setBearerToken(data['token']);
      console.log(data);

      if (data != null) {
        sessionStorage.setItem("key", this.submitMessage);
        this.flag = true;
        // this.internalService.setFlag(false);
        this.routerService.tohome();
      }
      this.authservice.login();
    }
      ,
      error => {
        console.log("error")
        alert('You have entered incorrect email or Password!')
      });

  }

}
