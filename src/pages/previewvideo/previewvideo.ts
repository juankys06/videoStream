import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview } from '@ionic-native/camera-preview';

import { HomePage } from '../home/home';

/**
 * Generated class for the PreviewvideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-previewvideo',
  templateUrl: 'previewvideo.html',
})
export class PreviewvideoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private cameraPreview: CameraPreview) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewvideoPage');
  }

  previewCameraVideo() {
    console.log("previewCameraVideo");
    let options = {
      x: 0,
      y: 0,
      width: window.screen.width/2,
      height: window.screen.height/2,
      camera: 'front',
      toBack: false,
      tapPhoto: true,
      tapFocus: false,
      previewDrag: false
    };

    this.cameraPreview.startCamera(options).then(
      (res) => {
        this.cameraPreview.show().then(
          (res2) => {
            console.log("respuesta Show: "+res2);
            console.log("respuesta Show (JSON): "+JSON.stringify(res2));
          },
          (err2) => {
            console.log(err2);
          }
        );
        console.log("respuesta Preview: "+res);
        console.log("respuesta Preview (JSON): "+JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      });

  }

  backHome() {
    if (this.cameraPreview!=undefined) {
      this.cameraPreview.stopCamera();
    }
    this.navCtrl.push(HomePage);
  }

}
