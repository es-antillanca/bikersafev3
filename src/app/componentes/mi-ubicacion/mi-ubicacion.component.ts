import { Component, OnInit } from '@angular/core';
import { MapboxService } from 'src/app/servicios/mapbox.service';
import { PlacesService } from 'src/app/servicios/places.service';
@Component({
  selector: 'app-mi-ubicacion',
  templateUrl: './mi-ubicacion.component.html',
  styleUrls: ['./mi-ubicacion.component.scss'],
})
export class MiUbicacionComponent {

  constructor(
    private mapService: MapboxService,
    private placesService: PlacesService
  ) { }

  miUbicacion() {
    console.log('Mi ubicacion')

    if (!this.placesService.isUserLocationReady) throw Error('No hay ubicación');
    if (!this.mapService.isMapReady) throw Error('No hay mapa inicializado');
    this.mapService.flyTo(this.placesService.userLocation)

  }

}
