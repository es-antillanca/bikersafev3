import { Injectable } from '@angular/core';
import { Map, LngLatLike, Marker, Popup, LngLatBounds, AnySourceData } from 'mapbox-gl'
import { direccionesApi } from '../api/direccionesApi';
import { Direcciones, Route } from '../modelo/direcciones';
import { Feature } from '../modelo/lugares';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  private map?: Map;
  private markers: Marker[] = [];
  public distance: number;

  public time: number;

  get isMapReady() {
    return !!this.map;
  }

  constructor(private direcciones: direccionesApi) {
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.direcciones.get<Direcciones>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => this.drawRute(resp.routes[0]))
  }

  private drawRute(route: Route) {

    console.log({ distancia: route.distance / 1000, duration: route.duration / 60 });
    this.distance = route.distance / 1000;
    this.time = route.duration / 60;
    //console.log(this.distance);


    if (!this.map) throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => {

      bounds.extend([lng, lat]);
    })

    this.map?.fitBounds(bounds);

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);

    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#8EBBFF',
        'line-width': 5
      }

    });

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

  createMarkersFromPlaces(places: Feature[]) {
    if (!this.map) throw Error('Mapa no inicializado');


    this.markers.forEach(marker => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(
        `
        <h6>${place.text}</h6>
        <span>${place.place_name}</span>
        `
      );
      const newMarker = new Marker({ color: "#8EBBFF" }).setLngLat([lng, lat]).setPopup(popup).addTo(this.map);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if (places.length === 0) return;

    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));


    this.map?.fitBounds(bounds, {
      padding: 150
    });

  }
}
