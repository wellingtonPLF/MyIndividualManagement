import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ObjStructure } from '../types/general';

@Injectable({
  providedIn: 'root'
})
export class RegistryStore {
    userReducer$: Observable<any>;
    activityReducer$: Observable<any>;
    windowReducer$: Observable<any>;
    subareaReducer$: Observable<any>;
    ocupationReducer$: Observable<any>;
    classReducer$: Observable<any>;
  
    constructor(private store: Store<any>) {
      this.userReducer$ = this.store.select('userReducer');
      this.activityReducer$ = this.store.select('activityReducer');
      this.windowReducer$ = this.store.select('windowReducer');
      this.subareaReducer$ = this.store.select('subareaReducer');
      this.ocupationReducer$ = this.store.select('ocupationReducer');
      this.classReducer$ = this.store.select('classReducer');
    }

    async dispatcher(type: string, payload: Array<any>): Promise<void> { 
      const { list, position: activityPosition }: ObjStructure = await this.getInfo(this.activityReducer$);
      const { position: windowPosition }: ObjStructure = await this.getInfo(this.windowReducer$);
      const { position: subareaPosition }: ObjStructure = await this.getInfo(this.subareaReducer$);
      const { position: ocupationPosition }: ObjStructure = await this.getInfo(this.ocupationReducer$);

      let activityList;
      if (type == "activity") {
        activityList = JSON.parse(JSON.stringify(payload));
      }
      else {        
        activityList = JSON.parse(JSON.stringify(list));
        const window = activityList[activityPosition!].janelas[windowPosition!];

        if (type == "window") {
          activityList[activityPosition!].janelas = payload
        }
        else if (type == "subarea") {
          window.subareas = payload
        }
        else if (type == "ocupation") {
          window.subareas[subareaPosition!].ocupacoes = payload
        }
        else if (type == "class") {
          window.subareas[subareaPosition!].ocupacoes[ocupationPosition!].classes = payload
        }
      }
      this.store.dispatch({type: 'activity', payload: { position: activityPosition, list: activityList } })
    }

    async getInfo(reducer: Observable<any>): Promise<any> {
      return new Promise((resolve, _) => {
        reducer.subscribe(
          it => {
            resolve(it);
          }
        );
      });
    }

    safeStringify (obj: any) {
      const seen = new Set();
      return JSON.stringify(obj, (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      }, 2);
    };
    
}
