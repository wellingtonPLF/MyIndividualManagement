import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from "../../shared/model/usuario";
import {UsuarioService} from "../../shared/service/usuario.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  selectedFile!: any;
  url!: any;
  @Input() usuario!: Usuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {}

  ngOnChanges(): void{
    if(this.usuario != undefined){
      this.url = this.usuario.img;
    }
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    try {
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (_event) => {
        this.url = reader.result;
        this.usuario.img = this.url;
        this.usuarioService.pesquisarPorId(this.usuario.idusuario!).subscribe(
          {
            next: result => {
              const match = this.url.match(/data:image\/([^;]+)/);
              const imgData = `${result.idusuario}.${match[1]};${this.url}`;
              result.img = imgData
              this.usuarioService.atualizar(result).subscribe(
                _ => {}
              )
            },
            error: _ => {}
          }
        )
      }
    }
    catch (e){
    }
  }
}
