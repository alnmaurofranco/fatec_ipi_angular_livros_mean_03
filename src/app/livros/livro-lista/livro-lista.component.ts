import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBook } from '../interface/IBook';
import { Subscription } from 'rxjs';
import { LivroService } from '../service/livro.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css'],
})
export class LivroListaComponent implements OnInit, OnDestroy {
  books: IBook[] = [];

  private bookSubscription: Subscription;

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.livroService.getListAllBooks();

    this.bookSubscription = this.livroService
      .getListBookUpdatedObservable()
      .subscribe((books: IBook[]) => {
        this.books = books;
      });
  }

  ngOnDestroy(): void {
    return this.bookSubscription.unsubscribe();
  }
}
