import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {
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
    this.paisService.buscarPais(this.termino, 'name').subscribe((data: any) => {
      data.forEach((pais: Country) => {
        if (!pais.hasOwnProperty('capital')) {
          pais.capital = ["No capital"]
        }
      });
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
    this.paisService.buscarPais(this.termino, "name").subscribe((paises: Country[]) => {
      this.paisesSugeridos = paises
    }, (error) => {
      this.paisesSugeridos = [];
      this.hayError = true;
    });

    /* if (termino.length === 0) {
      this.paises = [];
    } else {
      this.buscarNombre(termino);
    }
  } */
  }
}
