import { YouTubeAPIService } from './../services/youtube.service';
import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { DomSanitizer} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';


@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    console.log("PIPEEEEEEEEEEEEEEEEE");
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 


@Component({
  selector: 'youtube-modal', 
  templateUrl: './youtube-modal.component.html',
  styleUrls: ['./productos.component.scss']
})

export class YoutubeModalComponent {
  
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  public videosURL;
  public nombreProducto;
  public buscadorVideos;

  @ViewChild('YoutubeModal') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide 
  constructor(public youtubeService:YouTubeAPIService){}

  public showChildModal(nombreProducto):void {
    this.videosURL=null;
    this.nombreProducto=nombreProducto;
    console.log(nombreProducto);
    this.getVideos(nombreProducto);
    this.childModal.show();
  }
 

  public getVideos(query){
      this.youtubeService.search(query).subscribe(
        res =>{
          console.log("YOUTUUUUUUUUUUUUUUUUUUUUBE");
          console.log(res);
          this.videosURL=res;
          //this.videosURL="https://www.youtube.com/embed/"+res.id.videoId;
          //console.log(this.videosURL);
        },
        err=>{ //Error de conexion con el servidor
          console.log(err);
        },
    );
  }

  public hideChildModal():void {
    this.childModal.hide();
  } 
 
  public seleccionar(video:string){
    console.log("El id del video es "+video);
    this.change.emit(video);
    this.childModal.hide();
  }
 



 
 
}
