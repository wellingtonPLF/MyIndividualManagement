export type Activity_Type = {
    idatividade: number,
    ordem: number,
    nome: string,
    objectType: string,
    janelas: Array<any>
}

export type UserResponse = {
    idusuario?: number,
    email?: string
    nickName?: string,
    nome?: string,
    bornDate?: Date   
    img?: string,
    objectType?: string
    atividades: Array<any>
};