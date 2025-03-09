import {Atividade} from "./atividade";
import { Auth } from "./auth";
import {UsuarioTemplate} from "./usuarioTemplate";

export class Usuario {
    private _idusuario?: number;
    private _nome?: string;
    private _email?: string;

    private _img!: string;
    private _objectType!: string;
    private _atividades: Array<Atividade> = new Array<Atividade>();
    private _usuarioTemplates?: Array<UsuarioTemplate> = new Array<UsuarioTemplate>();

    constructor(id:number, nome: string, email: string);
    constructor(nome: string, email: string);
    constructor();
    constructor(...myarray: any[]){
        if (myarray.length === 2) {
            this._nome = myarray[0]
            this._email = myarray[1]
            return;
        }
        if (myarray.length === 3) {
            this._idusuario = myarray[0]
            this._nome = myarray[1]
            this._email = myarray[2]
            return;
        }
    }

    static refract(user: Usuario) {
        const result = { 
          idusuario: user.idusuario,  
          nome: user.nome, 
          email: user.email,
          img: user.img,
          objectType: user.objectType,
          atividades: user.atividades,
          usuarioTemplates: []
        }
        return result;
    }

    get idusuario(): number | undefined{
        return this._idusuario;
    }

    set idusuario(id: number | undefined){
        this._idusuario = id;
    }

    get nome(): string | undefined{
        return this._nome;
    }

    set nome(nome: string | undefined){
        this._nome = nome;
    }

    get img(): string {
      return this._img;
    }

    set img(img: string){
        this._img = img;
    }

    get objectType(): string {
        return this._objectType;
    }

    set objectType(objectType: string) {
        this._objectType = objectType;
    }

    get atividades(): Array<Atividade> {
      return this._atividades;
    }

    set atividades(atividades: Array<Atividade>) {
        this._atividades = atividades;
    }

    get usuarioTemplates(): Array<UsuarioTemplate> | undefined {
      return this._usuarioTemplates;
    }

    set usuarioTemplates(usuarioTemplates: Array<UsuarioTemplate> | undefined) {
        this._usuarioTemplates = usuarioTemplates;
    }

    get email(): string | undefined{
        return this._email;
    }

    set email(email: string | undefined){
        this._email = email;
    }
}