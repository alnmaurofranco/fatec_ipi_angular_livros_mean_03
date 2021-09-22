import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IBook } from '../interface/IBook';
import { NgForm } from '@angular/forms';
import { LivroService } from '../service/livro.service';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: './livro-inserir.component.html',
  styleUrls: ['./livro-inserir.component.css'],
})
export class LivroInserirComponent implements OnInit {
  constructor(private livroService: LivroService) {}

  ngOnInit(): void {}

  onAddBook(form: NgForm) {
    const { invalid, value } = form;

    if (invalid) return;

    const book: IBook = {
      title: value.title,
      author: value.author,
      numberOfPages: value.numberOfPages,
    } as IBook;

    this.livroService.createBook(book);

    form.resetForm();
  }
}
