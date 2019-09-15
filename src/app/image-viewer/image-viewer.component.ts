import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
  imgTitle
  imgSource
  imgDescription

  slideOpts = {
    centeredSlides: 'true',
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private modalController: ModalController) {}


  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
}
