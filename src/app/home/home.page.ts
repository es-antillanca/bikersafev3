import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { PlacesService } from 'src/app/servicios/places.service';
import { MapboxService } from 'src/app/servicios/mapbox.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private placesService: PlacesService,
    private mapService: MapboxService

  ) { }

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  get distance() {
    return this.mapService.distance;
  }

  get time() {
    return this.mapService.time;
  }
}
