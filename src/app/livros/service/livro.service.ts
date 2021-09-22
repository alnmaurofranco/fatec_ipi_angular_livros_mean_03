import { Injectable } from '@angular/core';
import { IBook } from '../interface/IBook';
import { Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
class LivroService {
  private books: IBook[] = [];
  private listBooksUpdated = new Subject<IBook[]>();

  // constructor(private httpClient: HttpClient) { }

  getListAllBooks() {
    this.listBooksUpdated.next([...this.books]);
    return [...this.books];
  }

  createBook({ title, author, numberOfPages }: IBook) {
    const book: IBook = {
      id: uuid(),
      title,
      author,
      numberOfPages,
    };

    this.books.push(book);
    this.listBooksUpdated.next([...this.books]);
  }

  getListBookUpdatedObservable() {
    return this.listBooksUpdated.asObservable();
  }
}

export { LivroService };
