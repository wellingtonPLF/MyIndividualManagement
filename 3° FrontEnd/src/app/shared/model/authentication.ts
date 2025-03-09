import { Auth } from "./auth";
import { Role } from "./role";
import { Usuario } from "./usuario";

export class Authentication{

    private _auth?: Auth;
    private _user?: Usuario;

    constructor(id: number, email: string, username: string, password: string);
    constructor() {}

    static refract(authentication: Authentication | undefined) {
        const result = {
            auth: Auth.refract(authentication!.auth),
            user: authentication!.user
        }
        return result;
    }

    get auth(): Auth | undefined {
        return this._auth;
    }

    set auth(auth: Auth | undefined) {
        this._auth = auth;
    }

    get user(): Usuario | undefined {
        return this._user;
    }

    set user(user: Usuario | undefined) {
        this._user = user;
    }
}