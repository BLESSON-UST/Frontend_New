import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { AuthenticateServiceService } from '../services/authenticate-service.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  username:string;
  posts: any;
  booksArr: Book[];
  book: Book;
  status:boolean;
  // checkFav:Book[];
  // flag:number;
  constructor(private bookServ: BooksService, private Authserv:AuthenticateServiceService) {
    this.booksArr = [];
    this.username=this.Authserv.getCurUser();
  }

  ngOnInit() {
    this.bookServ.getPosts()

      .subscribe((response) => {

        this.posts = response;
        for (let i = 0; i < this.posts['items'].length; i++) {
          this.book = new Book();
          this.book['bookid']=this.posts['items'][i]['id'];
          this.book['title'] = this.posts['items'][i]['volumeInfo']['title'];
          this.book['author'] = this.posts['items'][i]['volumeInfo']['authors'];
          this.book['date'] = this.posts['items'][i]['volumeInfo']['publishedDate'];
          this.book['category'] = this.posts['items'][i]['volumeInfo']['categories'];
          this.book['image'] = this.posts['items'][i]['volumeInfo']['imageLinks']['thumbnail'];

          this.booksArr.push(this.book)

        }


      });
      this.status= this.Authserv.ifAuth();


  }
  toFav(b:Book){

     
    // this.flag=0;
    this.book.title = b.title;
    this.book.author = b.author;
    this.book.date = b.date;
    this.book.category = b.category;
    this.book.image = b.image;
    this.book.username= this.username;

    this.bookServ.addToFav(this.book).subscribe(
      data => 
      {
        alert("Added");
        console.log(data)
      },
      err => alert("Already present!")
      );

    
    
  }



}
