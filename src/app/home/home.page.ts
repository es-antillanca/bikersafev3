import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { PlacesService } from 'src/app/servicios/places.service';
import { MapboxService } from '../servicios/mapbox.service';
import { throws } from 'assert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  constructor(
    private authService: AuthService,
    private router: Router,
    private map: MapboxService,
    private placesService: PlacesService,

  ) { }

  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
