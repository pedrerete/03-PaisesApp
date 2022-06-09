import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeholder: string = "Buscar...";

  debounce: Subject<string> = new Subject<string>();
  termino: string = "";
  constructor() { }

  ngOnInit(): void {
    this.debounce
    .pipe(
      debounceTime(200)
    )
    .subscribe(termino => {
      this.onDebounce.emit(termino);
    });
  }
  buscarNombre(){
    
    this.onEnter.emit(this.termino);
  }
  teclaPresionada(){
    this.debounce.next(this.termino);
  }
}
