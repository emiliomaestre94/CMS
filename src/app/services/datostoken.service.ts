import { Injectable } from '@angular/core';

@Injectable()

export class DatosTokenService {

  public foto_usuario: string;
  public nombre_usuario: string;
  public id_usuario: string;
  public id_tienda: string;
  public logo_tienda: string;
  public nombre_tienda: string;

    constructor() {
        
    }

    almacenardatostoken(usuario: any){
        this.foto_usuario=usuario.data.Foto_usuario;
        this.id_tienda=usuario.data.Id_tienda;
        this.id_usuario=usuario.data.Id_usuario;
        this.nombre_tienda=usuario.data.Nombre_tienda;
        this.nombre_usuario=usuario.data.Nombre_usuario;
        this.logo_tienda=usuario.data.Logo_tienda;
    }



}