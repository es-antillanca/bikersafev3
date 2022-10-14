import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';



import { HomePageRoutingModule } from './home-routing.module';
import { MapboxService } from '../servicios/mapbox.service';
import { PlacesService } from '../servicios/places.service';
import { MapaVistaComponent } from '../componentes/mapa-vista/mapa-vista.component';
import { CargandoMapaComponent } from '../componentes/cargando-mapa/cargando-mapa.component';
import { MiUbicacionComponent } from '../componentes/mi-ubicacion/mi-ubicacion.component';
import { ResultadoBusquedaComponent } from '../componentes/resultado-busqueda/resultado-busqueda.component';
import { BuscadorComponent } from '../componentes/buscador/buscador.component';
import { CerrarSesionComponent } from '../componentes/cerrar-sesion/cerrar-sesion.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
  ],
  declarations: [HomePage, MapaVistaComponent, CargandoMapaComponent, MiUbicacionComponent, ResultadoBusquedaComponent, BuscadorComponent, CerrarSesionComponent],
  providers: [MapboxService, PlacesService],
})
export class HomePageModule { }