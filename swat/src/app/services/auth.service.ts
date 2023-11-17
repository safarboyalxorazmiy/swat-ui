import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any
  

  constructor(public config: ConfigService, public http: HttpClient) { }

  public async Auth (body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName+'/users/login', body
      ).subscribe(e=>{
          resolve(e);
        })
      })
  }

}
