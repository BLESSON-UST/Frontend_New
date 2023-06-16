import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthenticateServiceService } from '../services/authenticate-service.service';
import { RouterServiceService } from '../services/router-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public disabled=true;
  constructor(private routerService: RouterServiceService, private authServ:AuthenticateServiceService) { }
  

  ngOnInit(): void {
    
  }

  changeDisabled(){
  this.disabled=false;

  }

logout(){
  // alert("You have successfully logout.");
  // this.authServ.logout();
  this.routerService.tologin();
  sessionStorage.clear()
  localStorage.clear();
  
  // window.location.reload();
}
}


