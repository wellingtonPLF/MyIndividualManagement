import { Usuario } from "../../model/usuario";
import { ObjStructure } from "../../types/general";

export function UserAction (value?: Usuario){
    return {
        type: 'user',
        payload: value
    }
}

export function ActivityAction (value?: ObjStructure) {
    return {
        type:'activity',
        payload: value
    }
}
    
export function WindowAction (value?: any) {
    return {
        type:'window',
        payload: value
    }
}    
export function SubareaAction (value?: ObjStructure) {
    return {
        type:'subarea',
        payload: value
    }
}
    
export function OcupationAction (value?: ObjStructure) {
    return {
        type:'ocupation',
        payload: value
    }
}
    
export function ClassAction (value?: ObjStructure) {
    return {
        type:'class',
        payload: value
    }
}
    
