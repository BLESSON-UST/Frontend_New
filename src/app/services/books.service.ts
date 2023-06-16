import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  private url = 'https://www.googleapis.com/books/v1/volumes?q=search&maxResults=40';
  constructor(private httpClient: HttpClient) { }

  getPosts(){
    return this.httpClient.get(this.url);
  }
  
  getFavBooks(username):Observable<Array<Book>>{
    return this.httpClient.get<Array<Book>>(`http://localhost:8081/favourites/viewFav/${username}`);
  }
  getRecBooks():Observable<Array<Book>>{
    return this.httpClient.get<Array<Book>>(`http://localhost:8082/recommends/view`);
  }
  addToFav(Book):Observable<Book>{
    return this.httpClient.post<Book>(`http://localhost:8081/favourites/addFav`,Book)
  }

  delFromFav(Id,username):Observable<Book>{
    return this.httpClient.delete<Book>(`http://localhost:8081/favourites/delete/${Id}/${username}`)
  }

}


