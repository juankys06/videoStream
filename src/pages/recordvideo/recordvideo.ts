import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';

import { HomePage } from '../home/home';

/**
 * Generated class for the RecordvideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recordvideo',
  templateUrl: 'recordvideo.html',
})
export class RecordvideoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private mediaCapture : MediaCapture) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordvideoPage');
  }

  recordVideo(){
    console.log("recordVideo");
    let options: CaptureVideoOptions = {};
    this.mediaCapture.captureVideo(options).then(
      (data: MediaFile[]) => console.log("dataVideo: "+JSON.stringify(data)),
      (err: CaptureError) => console.log("error: "+JSON.stringify(err))
    );
  }

  backHome(){
    this.navCtrl.push(HomePage);
  }

}
