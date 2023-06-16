import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterServiceService {

  constructor(private router:Router) { }
  // toauthor()
  // {
  //   this.router.navigate(['author'])
  // }

  // todashboard(){
  //   this.router.navigate(['dashboard'])
  // }

  // toedit(){
  //   this.router.navigate(['edit'])
  // }

  tofavourites(){
    this.router.navigate(['Favourites'])
  }

  tohome(){
    this.router.navigate(['Home'])
  }
    
  tologin()
  {
    this.router.navigate(['Login'])
  }
  toregister()
  {
    this.router.navigate(['Register'])
  }
  // toview()
  // {
  //   this.router.navigate(['view'])
  // }
  // tosearch()
  // {
  //   this.router.navigate(['search']);
  // }

  // tomyrecommendation(){
  //   this.router.navigate(['myrecommendation'])
  // }

  torecommendations(){
    this.router.navigate(['Recommend'])
  }

  // tobookDetails()

  // {
  // this.router.navigate(['bookDetails'])
  // }
}
