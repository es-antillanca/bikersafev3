import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-opciones-destino',
  templateUrl: './opciones-destino.component.html',
  styleUrls: ['./opciones-destino.component.scss'],
})
export class OpcionesDestinoComponent implements OnInit {

  @Input() distance!: number;
  @Input() time!: number;

  segment1: boolean = true;
  segment2: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log(this.distance)
  }

  segmentChanged(event) {
    var segment = event.target.value;
    if (segment == "segment1") {
      this.segment1 = true;
      this.segment2 = false;
      console.log(segment);
    }
    if (segment == "segment2") {
      this.segment1 = false;
      this.segment2 = true;
    }
  }

}
