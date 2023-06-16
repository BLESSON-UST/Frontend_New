import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { AuthenticateServiceService } from '../services/authenticate-service.service';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  username:String;
  posts: any;
  favBooks: Book[];
  book: Book;
  
  constructor(private bookServ: BooksService,private authServ: AuthenticateServiceService) {
    this.favBooks = [];
    this.username=this.authServ.getCurUser();
    
    
   }

  ngOnInit(): void {
    this.bookServ.getFavBooks(this.username)
      .subscribe((response) => {
        this.posts = response;
        for (let i = 0; i < this.posts.length; i++) {
          this.book = new Book();
          this.book['bookid']=this.posts[i]['bookid'];
          this.book['title'] = this.posts[i]['title'];
          this.book['author'] = this.posts[i]['author'];
          this.book['date'] = this.posts[i]['date'];
          this.book['category'] = this.posts[i]['category'];
          this.book['image'] = this.posts[i]['image'];
          this.book['username']= this.authServ.getCurUser();
          console.log(this.book);
          
          this.favBooks.push(this.book)

        }
    });
  
  }

  delFav(id){
    console.log(this.username);
    this.bookServ.delFromFav(id,this.username).subscribe(data => console.log(data));
    alert("Successfully Deleted!");
    // window.location.reload();
  }
}
