import { Injectable } from '@angular/core';
export interface ILangItem{
  label:string;
  icon:string;
}
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // public serverDomenName:string = ''

  public serverDomenName:string = 'http://192.168.5.250:7777' //test
  public serverDomenNameV2:string = "http://192.168.5.250:1212"
  
  constructor() {
  }
}