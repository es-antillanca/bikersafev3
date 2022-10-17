import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api/places.service';
import { Places, Feature } from '../modelo/lugares';
import { MapboxService } from './mapbox.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {



  public userLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapboxService
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
          console.log(this.userLocation);
        },
        (err) => {
          alert('Geolocalización no conseguida')
          console.log(err);
        }
      );
    });
  }

  getPlacesByQuery(query: string) {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if (!this.userLocation) throw Error('No hay userLocation');

    this.isLoadingPlaces = true;

    this.placesApi.get<Places>(`/${query}.json`,
      {
        params: {
          proximity: this.userLocation.join(',')
        }
      })
      .subscribe(
        resp => {
          this.isLoadingPlaces = false;
          this.places = resp.features;
          this.mapService.createMarkersFromPlaces(this.places);
        }
      )
  }

  deletePlaces() {
    this.places = []
  }
}
