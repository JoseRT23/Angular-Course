import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface IMarkerAndColor {
  color: string;
  marker: mapboxgl.Marker;
}

interface IPlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public defaultZoom: number = 13;
  public map?: mapboxgl.Map;
  public currentLngLat: mapboxgl.LngLat = new mapboxgl.LngLat(-72.86705288081106, 4.87846069883669);
  public markers: IMarkerAndColor[] = [];

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'No se ha cargado correctamente el mapa';

    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.defaultZoom, // starting zoom
    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Soy un marcador';
    // const marker = new mapboxgl.Marker({
    //   element: markerHtml
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);
  }

  ngOnDestroy(): void {
    if (!this.map) return;
    this.map?.remove();
  }

  createMarker() {

    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map!.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: mapboxgl.LngLat, color: string) {
    if (!this.map) return;

    const marker = new mapboxgl.Marker({
      color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo(this.map);

    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: mapboxgl.Marker) {
    if (!this.map) return;
    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const plainMarkers: IPlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plain-markers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkerString = localStorage.getItem('plain-markers') ?? '[]';
    const plainMarkers: IPlainMarker[] = JSON.parse(plainMarkerString);
    
    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new mapboxgl.LngLat(lng, lat);
      
      this.addMarker(coords, color);
    })
  }
}
