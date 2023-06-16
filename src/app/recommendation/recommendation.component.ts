import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  posts: any;
  booksArr: Book[];
  book: Book;

  constructor(private bookServ: BooksService) { 
    this.booksArr = [];
  }
  ngOnInit() {
    this.bookServ.getRecBooks()

      .subscribe((response) => {

        this.posts = response;
        for (let i = 0; i < this.posts.length; i++) {
          this.book = new Book();
          this.book['title'] = this.posts[i]['booktitle'];
          this.book['author'] = this.posts[i]['bookauthors'];
          this.book['date'] = this.posts[i]['bookdate'];
          this.book['category'] = this.posts[i]['bookcategory'];
          this.book['image'] = this.posts[i]['bookimage'];

          this.booksArr.push(this.book)

        }

      })
  }

  
}
