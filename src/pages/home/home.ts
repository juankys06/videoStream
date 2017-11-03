import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayvideoPage } from '../playvideo/playvideo';
import { RecordvideoPage } from '../recordvideo/recordvideo';
import { PreviewvideoPage } from '../previewvideo/previewvideo';
import { UsermediaPage } from '../usermedia/usermedia';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  error: any;
  constructor(public navCtrl: NavController) {

  }

  changeToPlayVideo() {
    this.navCtrl.push(PlayvideoPage);
  }

  changeToRecordVideo() {
    this.navCtrl.push(RecordvideoPage);
  }

  changeToPreviewVideo() {
    this.navCtrl.push(PreviewvideoPage);
  }

  changeToUserMedia(){ 
    this.navCtrl.push(UsermediaPage);
  }

  changeToCamera(){
    this.navCtrl.push(CameraPage);
  }

}
