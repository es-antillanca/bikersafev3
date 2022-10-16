import { Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/servicios/places.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent {

  private debounceTimer?: NodeJS.Timeout;

  constructor(private PlaceService: PlacesService) { }

  onQueryChanged(query: string = '') {

    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.PlaceService.getPlacesByQuery(query)
    }, 350);



  }
}
