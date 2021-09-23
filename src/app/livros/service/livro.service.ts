import { Injectable } from '@angular/core';
import { IBook } from '../interface/IBook';
import { Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';

interface ListAllBookResponse {
  books: IBook[];
}

@Injectable({
  providedIn: 'root',
})
class LivroService {
  private books: IBook[] = [];
  private listBooksUpdated = new Subject<IBook[]>();
  public baseURL = 'http://localhost:3333/api';

  constructor(private httpClient: HttpClient) {}

  getListAllBooks() {
    this.httpClient
      .get<ListAllBookResponse>(`${this.baseURL}/books`)
      .subscribe((data) => {
        this.books = data.books;
        this.listBooksUpdated.next([...this.books]);
      });
  }

  createBook({ title, author, numberOfPages }: IBook) {
    const book: IBook = {
      title,
      author,
      numberOfPages,
    };

    this.httpClient.post(`${this.baseURL}/books`, book).subscribe((data) => {
      this.books.push(book);
      this.listBooksUpdated.next([...this.books]);
    });
  }

  getListBookUpdatedObservable() {
    return this.listBooksUpdated.asObservable();
  }
}

export { LivroService };
