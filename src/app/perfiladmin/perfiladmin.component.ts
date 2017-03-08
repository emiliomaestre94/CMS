import { Component, OnInit } from '@angular/core';


/*import {FileUploaderComponent} from './file-uploader.component';*/

@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.component.html',
  styleUrls: ['./perfiladmin.component.scss']
})
export class PerfiladminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


imageSrc;
  handleInputChange(foto) {
    var files = foto.target.files;
    if (files[0]) {
      let reader = new FileReader();
      reader.onload = (e : any) => {
        this.imageSrc = e.target.result;
    }
    reader.readAsDataURL(foto.target.files[0]);

    }
  }
  

}
