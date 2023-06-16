import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { register } from '../register';
import { AuthenticateServiceService } from '../services/authenticate-service.service';
import { RouterServiceService } from '../services/router-service.service';
import { SpaceValidator } from '../space.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 

  constructor(private routerService: RouterServiceService, private authenticateService: AuthenticateServiceService,public formBuilder: FormBuilder) {
  }
  
  register: register = new register();
  registerArray: Array<register> = [];

  registerform: FormGroup
  lastname: FormControl;
  password: FormControl;
  email:FormControl;
  firstname: FormControl;

  ngOnInit() {

    if (sessionStorage.getItem('key') != null) {
      this.routerService.tohome();
    }
    else {
     
      
      this.registerform = new FormGroup({

        firstname: new FormControl('', [Validators.required,SpaceValidator.cannotContainSpace]),
        email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),SpaceValidator.cannotContainSpace]),
        lastname: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required,Validators.minLength(6)])

        
      });
      
    }
  }
  get f() { return this.registerform.controls; }

  

  registerSubmit() {
    console.log("Hi");

    this.register.password = this.registerform.value.password;
    console.log("password== " + this.registerform.value.password)
    this.register.firstname = this.registerform.value.firstname;
    console.log("firstname== " + this.registerform.value.firstname)
    this.register.email = this.registerform.value.email;
    console.log("email== " + this.registerform.value.email)
    this.register.lastname = this.registerform.value.lastname;
    console.log("lastname== " + this.registerform.value.lastname)

    this.registerArray.push(this.register);

    this.authenticateService.addUser(this.register).subscribe((data) => {
      // console.log("inside regsiter angular")
      console.log(data)
      this.routerService.tologin();
      alert("Yeah! Register Succesfull");

    },
      (error: any) => {
        console.log(error);
        alert("Oops!");
      });


  }

  // login() {
  //   this.routerService.tologin();
  // }

}
