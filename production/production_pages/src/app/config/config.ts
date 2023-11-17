import { Injectable } from '@angular/core';
export interface ILangItem{
  label:string;
  icon:string;
}
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // public ServerName:string = ''
  public ServerName:string = 'http://localhost:8080' //test
  public ServerNameV2:string = 'http://localhost:8080' //test

  constructor() {
  }
}