import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera } from '@ionic-native/camera';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
import { Socket } from 'ng-socket-io';


import { HomePage } from '../home/home';
/**
 * Generated class for the UsermediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usermedia',
  templateUrl: 'usermedia.html',
})
export class UsermediaPage {
  errorMessage: any;
  logMessage: any;
  streamRecorder: any;
  webcamstream: any;
  widthVideo: any = window.screen.width / 2;
  heightVideo: any = window.screen.height / 2;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socket: Socket) {
    navigator.getUserMedia = navigator.getUserMedia
      //|| navigator.webkitGetUserMedia 
      //|| navigator.mozGetUserMedia
      || navigator.mediaDevices.getUserMedia;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsermediaPage');
  }

  startVideo() {
    console.log("Start Video");
    this.logMessage = "Start Video 1";
    if (navigator.getUserMedia) {
      //video controller
      navigator.getUserMedia({ audio: false, video: true }, (stream) => {

        this.errorMessage = "success user media";
        var video = document.querySelector('video');
        video.src = window.URL.createObjectURL(stream);
        //manipulacion del video
        this.webcamstream = stream;
        this.streamRecorder = this.webcamstream;
        document.getElementById('stopVideo').addEventListener('click', function () {
          UsermediaPage.prototype.stopStream(stream);
        });
        document.getElementById('backHome').addEventListener('click', function () {
          UsermediaPage.prototype.stopStream(stream);
        });
        //fin manipulacion del video
        video.onloadedmetadata = function (e) {
          // Do something with the video here.
          //const fileTransfer: FileTransferObject = this.create();
          video.play();
          console.log("onloadedmetadata: " + JSON.stringify(e));
        };

        /*
        prueba de socket.io
        */
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        this.socket.connect();
        this.socket.on('connect', function () {
          console.log("connected");
          this.errorMessage = "connected";
        });
        this.socket.on('disconnect', function () {
          console.log("disconnect");
          this.errorMessage = "disconnect";
        });
        function emit(message) {
          this.socket.emit('data', message);
        }
        /* END SOCKET.IO */
        function sendFrame(video, context) {
          context.drawImage(video, 0, 0, context.width, context.height);
          emit(canvas.toDataURL('image/webp'));
        }
        setInterval(function () { sendFrame(video, context); }, 1000);
        /*
        fin prueba socket
        */

      }, (error) => {
        console.log("error: " + JSON.stringify(error.message));
        this.errorMessage = error.message;
      });

      //audio controller
      navigator.getUserMedia({ audio: true, video: false }, (stream) => {

        this.errorMessage = "success user media";
        var audio = document.querySelector('audio');
        audio.src = window.URL.createObjectURL(stream);
        //manipulacion del audio
        this.webcamstream = stream;
        this.streamRecorder = this.webcamstream;
        document.getElementById('stopVideo').addEventListener('click', function () {
          UsermediaPage.prototype.stopStream(stream);
        });
        document.getElementById('backHome').addEventListener('click', function () {
          UsermediaPage.prototype.stopStream(stream);
        });
        //fin manipulacion del audio
        audio.onloadedmetadata = function (e) {
          // Do something with the audio here.
          //const fileTransfer: FileTransferObject = this.create();
          audio.play();
          console.log("onloadedmetadata: " + JSON.stringify(e));
        };
      }, (error) => {
        console.log("error: " + JSON.stringify(error.message));
        this.errorMessage = error.message;
      });



    } else {
      console.log("getUserMedia not supported");
      this.errorMessage = "getUserMedia not supported";
    }
  }

  stopStream(stream) {
    console.log('stop called');
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    stream.getAudioTracks()[0].stop();
    stream.getVideoTracks()[0].stop();
    var video = document.querySelector('video');
    video.src = "";
    //video.remove();
  }

  stopRecording() {
    console.log("Stop recording!!!");
    this.logMessage = "Stop recording!!!";
    this.streamRecorder.getRecordedData(postVideoToServer);
    function postVideoToServer(videoblob) {
      console.log("postVideoToServer: " + videoblob);
      /*var data = {};
      data.video = videoblob;
      data.metadata = 'test metadata';
      data.action = "upload_video";
      jQuery.post("http://www.foundthru.co.uk/uploadvideo.php", data, onUploadSuccess);*/

    }
    /*function onUploadSuccess() {
      alert('video uploaded');
    }*/
  }

  backHome() {
    var video = document.querySelector('video');
    video.src = "";
    //video.remove();
    this.navCtrl.push(HomePage);
  }

  startVideo2() {
    console.log("Start Video 2");
    this.logMessage = "Start Video 2";
    var errorElement = document.querySelector('#errorMsg');
    //var constrains = { audio: false, video: true };
    var constrains = {
      audio:
      { echoCancellation: false },
      video: true
    };
    var video = document.querySelector('video');

    if (navigator.mediaDevices.getUserMedia) {
      var cam = navigator.mediaDevices.getUserMedia(constrains)
        .then(
        (imageData) => {
          this.errorMessage = "success user media 2";

          //var videoTracks = imageData.getVideoTracks();
          //video.src = window.URL.createObjectURL(imageData);
          video.srcObject = imageData;
          //manipulacion del video
          this.webcamstream = imageData;
          this.streamRecorder = this.webcamstream;
          document.getElementById('stopVideo').addEventListener('click', function () {
            UsermediaPage.prototype.stopStream(imageData);
          });
          //fin manipulacion del video
          video.onloadedmetadata = function (e) {
            // Do something with the video here.
            //const fileTransfer: FileTransferObject = this.create();
            console.log("onloadedmetadata: " + JSON.stringify(e));
          };
        }, (err) => {
          console.log("error: " + JSON.stringify(err.message));
          this.errorMessage = err.message;

          if (err.name === 'ConstraintNotSatisfiedError') {
            errorElement.innerHTML += '<p>' + 'The resolution is not supported by your device.' + '</p>';
            if (typeof err !== 'undefined') {
              console.error(err);
            }
          } else if (err.name === 'PermissionDeniedError') {
            errorElement.innerHTML += '<p>' + 'Permissions have not been granted to use your camera and ' +
              'microphone, you need to allow the page access to your devices in ' +
              'order for the demo to work.';
            if (typeof err !== 'undefined') {
              console.error(err);
            }
          }
          errorElement.innerHTML += '<p>' + 'getUserMedia error: ' + err.name;
          if (typeof err !== 'undefined') {
            console.error(err);
          }

        });
    } else {
      console.log("getUserMedia not supported");
      this.errorMessage = "getUserMedia not supported";
    }
  }

  startVideo3() {

  }

}
