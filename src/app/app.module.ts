import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MediaCapture } from '@ionic-native/media-capture';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { CameraPreview } from '@ionic-native/camera-preview';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlayvideoPage } from '../pages/playvideo/playvideo';
import { RecordvideoPage } from '../pages/recordvideo/recordvideo';
import { PreviewvideoPage } from '../pages/previewvideo/previewvideo';
import { UsermediaPage } from '../pages/usermedia/usermedia';
import { CameraPage } from '../pages/camera/camera';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://192.168.99.149:5000', options: {} };

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    PlayvideoPage, 
    RecordvideoPage,
    PreviewvideoPage,
    UsermediaPage,
    CameraPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    PlayvideoPage, 
    RecordvideoPage,
    PreviewvideoPage,
    UsermediaPage,
    CameraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    MediaCapture,
    StreamingMedia,
    CameraPreview,
    Camera,
    FileTransfer,
    File
  ]
})
export class AppModule {}
