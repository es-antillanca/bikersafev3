import { Injectable } from '@angular/core';
import { Map, LngLatLike } from 'mapbox-gl'

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  private map?: Map;

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('Mapa no inicializado');
    this.map?.flyTo({
      zoom: 16,
      center: coords,
    })

  }

  constructor() {

  }
}
