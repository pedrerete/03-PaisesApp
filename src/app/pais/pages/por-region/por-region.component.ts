import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActual: string = "";
  termino: string = "";
  paises: Country[] = [];
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }
  activarRegion(region: string) {
    if (region === this.regionActual) {
      return;
    }
    this.paises = [];
    this.regionActual = region;
    this.termino = region;
    this.paisService.buscarPais(this.termino, 'region').subscribe((data: any) => {
      data.forEach((pais: Country) => {
        if (!pais.hasOwnProperty('capital')) {
          pais.capital = ["No capital"]
        }
      });
      this.paises = data
    }, (error) => {
      this.paises = [];
    });

  }
}
