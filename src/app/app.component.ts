import { Component } from '@angular/core';
import { IBook } from './livros/interface/IBook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  books: IBook[] = [];

  onBookAdded(books: IBook) {
    this.books = [...this.books, books];
  }
}
