import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Feature } from 'src/app/modelo/lugares';
import { MapboxService } from 'src/app/servicios/mapbox.service';
import { PlacesService } from 'src/app/servicios/places.service';


@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.scss'],
})
export class ResultadoBusquedaComponent {

  constructor(
    private placesService: PlacesService,
    private mapService: MapboxService
  ) { }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
    this.placesService.deletePlaces();
  }

  getDirections(place: Feature) {
    if (!this.placesService.userLocation) throw Error('No hay geolocalización');
    const start = this.placesService.userLocation;
    const end = place.center as [number, number];
    this.mapService.getRouteBetweenPoints(start, end);

  }

}
