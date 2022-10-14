import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapboxService } from 'src/app/servicios/mapbox.service';
import { PlacesService } from 'src/app/servicios/places.service';
import * as mapboxgl from 'mapbox-gl';
import { Popup, Marker } from 'mapbox-gl'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapa-vista',
  templateUrl: './mapa-vista.component.html',
  styleUrls: ['./mapa-vista.component.scss'],
})
export class MapaVistaComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  public mapa: mapboxgl.Map;

  public style = 'mapbox://styles/mapbox/light-v10';

  constructor(
    private mapBoxService: MapboxService,
    private placesService: PlacesService
  ) {
    mapboxgl.accessToken = environment.MAPBOX_KEY;
  }

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map(
      {
        container: this.mapDivElement.nativeElement,
        style: this.style,
        zoom: 16,
        center: this.placesService.userLocation//lng,lat
      }
    );

    const popup = new Popup().setHTML(
      `
      <h6>Mi ubicación</h6>
      <span>Aquí estoy</span>
      `
    );
    new Marker({ color: "#24293E" })
      .setPopup(popup)
      .setLngLat(this.placesService.userLocation)
      .addTo(map);

    this.mapBoxService.setMap(map);

  }

}


