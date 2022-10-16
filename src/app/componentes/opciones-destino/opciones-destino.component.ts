import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-opciones-destino',
  templateUrl: './opciones-destino.component.html',
  styleUrls: ['./opciones-destino.component.scss'],
})
export class OpcionesDestinoComponent implements OnInit {

  @Input() distance!: number;
  @Input() time!: number;

  constructor() { }

  ngOnInit() {
    console.log(this.distance)
  }

}
