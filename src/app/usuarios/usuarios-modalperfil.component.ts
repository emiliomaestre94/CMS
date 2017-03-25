import { Component, Input,Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'modal-perfil',
  templateUrl: './usuarios-modalperfil.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosModalPerfilComponent {
    @Input() usuario: Object={  //datos que recibimos del componente padre
        Nombre_usuario: '',
        Sexo_usuario:  '',
        Email_usuario:  '',
        Telefono_usuario:  '',
        CP_usuario: '',
        Localidad_usuario:  '',
        Foto_usuario:  ''
    };

    //output que devuelve un evento al padre. El padre lo llamara (onSelect)
    //se le devolverá un booleano
    @Output() onSelect = new EventEmitter();

    
    constructor() { }

    public clickCLose(){
        this.onSelect.emit(); //lanzamos el evento
    }


}