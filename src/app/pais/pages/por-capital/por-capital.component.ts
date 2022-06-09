import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent implements OnInit {
  hayError: boolean = false;
  termino: string = "";
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  fraseError: string = "";
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }
  buscarNombre(termino: string) {
    this.paisesSugeridos = []

    this.termino = termino;
    this.hayError = false;
    this.paisService.buscarPais(this.termino, 'capital').subscribe((data: any) => {
      this.paises = data
    }, (error) => {
      this.paises = [];
      this.hayError = true;
      this.fraseError = this.termino;
    });

  }
  sugerencias(termino: string) {
    this.hayError = false;
    this.mostrarSugerencias = true;
    this.termino = termino
    this.paisService.buscarPais(this.termino, "capital").subscribe((paises: Country[]) => {
      this.paisesSugeridos = paises
    }, (error) => {
      this.paisesSugeridos = [];
      this.hayError = true;
    });
  }}