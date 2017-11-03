import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { HomePage } from '../home/home';

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  startCamera(){
    console.log("startCamera");
    let options: CameraOptions = {
      //sourceType : this.camera.PictureSourceType.CAMERA,
      //mediaType : this.camera.MediaType.VIDEO,
      cameraDirection : this.camera.Direction.BACK
    };
    this.camera.getPicture(options).then(
      (ImageData) => {
        console.log("success: "+ImageData);
      }, (err) => {
        console.log("error: "+JSON.stringify(err));
      });
  }

  backHome(){
    this.navCtrl.push(HomePage);
  }

}
