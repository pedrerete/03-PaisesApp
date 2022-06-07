import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {
  pais!: Country[]
  constructor(private activatedRoute: ActivatedRoute, private paisService: PaisService) { }
  
  

  async ngOnInit(): Promise<void> {
    await this.delay(3000);


    //es lo mismo que el siguiente codigo
    /* this.activatedRoute.params.subscribe(({ id }) => {
      this.paisService.getPaisPorcodigo(id).
      subscribe((pais: any) => {
        this.pais = pais;
      });
    });
 */
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.paisService.getPaisPorcodigo(id)),
      tap(console.log)).
      subscribe((pais: any) => {
        this.pais = pais;
      });

  }
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  
}
