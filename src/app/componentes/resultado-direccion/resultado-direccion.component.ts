import { Component, OnInit, Input } from '@angular/core';
import { direccionesApi } from 'src/app/api/direccionesApi';
import { Route } from 'src/app/modelo/direcciones';
import { MapboxService } from 'src/app/servicios/mapbox.service';

@Component({
  selector: 'app-resultado-direccion',
  templateUrl: './resultado-direccion.component.html',
  styleUrls: ['./resultado-direccion.component.scss'],
})
export class ResultadoDireccionComponent {





  constructor(
    private mapbox: MapboxService
  ) { }

  //public rutas: Route;









}
