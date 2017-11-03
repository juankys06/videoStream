import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { HomePage } from '../home/home';

/**
 * Generated class for the PlayvideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playvideo',
  templateUrl: 'playvideo.html',
})
export class PlayvideoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private streamingMedia: StreamingMedia) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayvideoPage');
  }

  playVideo() {
    console.log("playVideo");
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'portrait'
    };
    this.streamingMedia.playVideo('http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4',options);
  }

  backHome() {
    this.navCtrl.push(HomePage);
  }

}
