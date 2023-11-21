import { Injectable } from '@angular/core';
import { IModels, IProduction } from '../models/production'
import { IPacking } from '../models/packing'
import {ConfigService} from '../config/config'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(public http: HttpClient, public server: ConfigService) { }

  public async TodayStatistics(body: any){

  return new Promise<any>((resolve) => {
    this.http.post<any>(this.server.ServerName+'/production/today/statistics', body).subscribe(e=>{
        resolve(e);
      })
    })
  }

  public async CheckRemont(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/check_remont', body).subscribe(e=>{
          resolve(e);
      })
    })
  }

  public async Logistics(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/logistics', body).subscribe(e=>{
          resolve(e);
      })
    })
  }

  public async VakumSerial(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/vakum/serial', body).subscribe(e=>{
          resolve(e);
        })
    })
  }

  public async MetallSerial(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/metall/serial', body).subscribe(e=>{
          resolve(e);
        })
      })
    }
  
  public async getModels(){
    return new Promise<IModels[]>((resolve) => {
      this.http.post<IModels[]>(this.server.ServerName+'/production/models', "none").subscribe(e=>{
          resolve(e);
        })
      })
    }
  
  public async addDefectsTypes(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/defects/types/add', body).subscribe(e=>{
          resolve(e);
        })
      })
    }
  public async deleteDefectsTypes(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/defects/types/delete', body).subscribe(e=>{
          resolve(e);
        })
      })
    }
  public async getLines(){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/lines', "null").subscribe(e=>{
          resolve(e);
        })
      })
    }
  
  public async getDefectsTypes(){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/defects/types', "null").subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async getSectorBalanceGP(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/sector/balance/gp', body).subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async getSectorBalance(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/sector/balance', body).subscribe(e=>{
          resolve(e);
        })
      })
    }


  public async getPackingTodaySerial(){
    return new Promise<IPacking[]>((resolve) => {
      this.http.post<IPacking[]>(this.server.ServerName+'/production/packing/today/serial', "packing").subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async getPackingToday(body: any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/packing/today', body).subscribe(e=>{
          resolve(e);
        })
      })
    }
  public async getPackingTodayByModels(body: any){
      return new Promise<any[]>((resolve) => {
        this.http.post<any[]>(this.server.ServerName+'/production/packing/today/models', body).subscribe(e=>{
            resolve(e);
          })
        })
      }

  public async getPackingLast(body: any){
    return new Promise<IProduction[]>((resolve) => {
      this.http.post<IProduction[]>(this.server.ServerName+'/production/packing/last', body).subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async sendSerialPacking(body:any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/packing/serial/input', body).subscribe(e=>{
          resolve(e);
        })
      })
    }

  public async serialInput(body:any){
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.server.ServerName+'/production/serial/input', body).subscribe(e=>{
          resolve(e);
        })
      })
    }

    public async getToday(body: any){
      return new Promise<Number>((resolve) => {
        this.http.post<Number>(this.server.ServerName+'/production/today', body).subscribe(e=>{
            resolve(e);
          })
        })
      }
    public async getTodayByModels(body: any){
        return new Promise<any[]>((resolve) => {
          this.http.post<any[]>(this.server.ServerName+'/production/today/models', body).subscribe(e=>{
              resolve(e);
            })
          })
        }

    public async getLast(body: any){
      return new Promise<IProduction[]>((resolve) => {
        this.http.post<IProduction[]>(this.server.ServerName+'/production/last', body).subscribe(e=>{
            resolve(e);
          })
        })
      }

    public async LogistLogin(body: any){
      return new Promise<any>((resolve) => {
        this.http.post<any>(this.server.ServerNameV2 + '/api/v1/auth/authenticate', body).subscribe(e=>{
            resolve(e);
        })
      })
    }

      public async getNotVerifiedComponents(token: any){
        return new Promise<IProduction[]>((resolve) => {
          this.http.get<IProduction[]>(this.server.ServerNameV2 + '/logist/component/not/verified', {headers: {"Authorization": "Bearer " + token}}).subscribe(e=>{
            resolve(e);
          })
        })
      }

      public async getNotVerifiedComponentsMaster(token: any){
        return new Promise<IProduction[]>((resolve) => {
          this.http.get<IProduction[]>(this.server.ServerNameV2 + '/master/component/not/verified', {headers: {"Authorization": "Bearer " + token}}).subscribe(e=>{
              resolve(e);
            })
          })
        }

      public async getVerifiedComponents(token: any){
        return new Promise<IProduction[]>((resolve) => {
          this.http.get<IProduction[]>(this.server.ServerNameV2 + '/logist/component/info', {headers: {"Authorization": "Bearer " + token}}).subscribe(e=>{
            resolve(e);
          })
        })
      }

      public async searchVerifiedComponents(token: any, searchQuery: any){
        return new Promise<IProduction[]>((resolve) => {
          this.http.get<IProduction[]>(this.server.ServerNameV2 + '/logist/component/search?search=' + searchQuery, {headers: {"Authorization": "Bearer " + token}}).subscribe(e=>{
            resolve(e);
          })
        })
      }

      public async searchVerifiedMasterComponents(token: any, searchQuery: any){
        return new Promise<IProduction[]>((resolve) => {
          this.http.get<IProduction[]>(this.server.ServerNameV2 + '/master/component/search?search=' + searchQuery, {headers: {"Authorization": "Bearer " + token}}).subscribe(e=>{
            resolve(e);
          })
        })
      }

      public async getVerifiedComponentsMaster(token: any){
        return new Promise<IProduction[]>((resolve) => {
          this.http.get<IProduction[]>(this.server.ServerNameV2 + '/master/component/info', {headers: {"Authorization": "Bearer " + token}}).subscribe(e=>{
            resolve(e);
          })
        })
      }

      public async getLineCompositesMaster(token: any){
        return new Promise<IProduction[]>((resolve) => {
          this.http.get<IProduction[]>(this.server.ServerNameV2 + '/master/composite/info', {headers: {"Authorization": "Bearer " + token}}).subscribe(e=>{
            resolve(e);
          })
        })
      }

      public async getMasters(){
        return new Promise<IProduction[]>((resolve) => {
          this.http.get<IProduction[]>(this.server.ServerNameV2 + '/master/get/info')
          .subscribe(e=>{
            resolve(e);
          })
        })
      }

      public async verifyRequest(token: any, requestId: number){
        return new Promise<IProduction[]>((resolve) => {
          this.http.put<IProduction[]>(this.server.ServerNameV2 + '/logist/component/verify?requestId=' + requestId, {headers: {"Authorization": "Bearer " + token}}).subscribe(e => {
            resolve(e);
          })
        })
      }

      public async cancelRequest(token: any, requestId: number){
        return new Promise<IProduction[]>((resolve) => {
          this.http.put<IProduction[]>(this.server.ServerNameV2 + '/logist/component/cancel?requestId=' + requestId, {headers: {"Authorization": "Bearer " + token}}).subscribe(e => {
            resolve(e);
          })
        })
      }

      public async verifyRequestMaster(token: any, requestId: number){
        return new Promise<IProduction[]>((resolve) => {
          this.http.put<IProduction[]>(this.server.ServerNameV2 + '/master/component/verify?requestId=' + requestId, {headers: {"Authorization": "Bearer " + token}}).subscribe(e => {
            resolve(e);
          })
        })
      }

      public async cancelRequestMaster(token: any, requestId: number){
        return new Promise<IProduction[]>((resolve) => {
          this.http.put<IProduction[]>(this.server.ServerNameV2 + '/master/component/cancel?requestId=' + requestId, {headers: {"Authorization": "Bearer " + token}}).subscribe(e => {
            resolve(e);
          })
        })
      }

      public async submitComponent(token: any, body: any): Promise<IProduction[]> {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
    
        return new Promise<IProduction[]>((resolve, reject) => {
          this.http.post<IProduction[]>(this.server.ServerNameV2 + '/master/component/submit', body, { headers })
            .subscribe(
              (response: IProduction[]) => {
                resolve(response);
              },
              (error) => {
                reject(error);
              }
            );
        });
      }

      public async submitComponentFromMaster(token: any, body: any): Promise<IProduction[]> {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
    
        return new Promise<IProduction[]>((resolve, reject) => {
          this.http.post<IProduction[]>(this.server.ServerNameV2 + '/master/component/submit/from/master', body, { headers })
            .subscribe(
              (response: IProduction[]) => {
                resolve(response);
              },
              (error) => {
                reject(error);
              }
            );
        });
      }
    

      
      public async getAllLines(){
        return new Promise<IProduction[]>((resolve) => {
          this.http.get<IProduction[]>(this.server.ServerNameV2 + '/master/line/get/all')
          .subscribe(e=>{
            resolve(e);
          })
        })
      }

  public async getMasterLine(token: any){
    return new Promise<IProduction[]>((resolve) => {
      this.http.get<IProduction[]>(this.server.ServerNameV2 + '/master/line/get', {headers: {"Authorization": "Bearer " + token}}).subscribe(e=>{
        resolve(e);
      })
    })
  }

  public async setMasterLine(token: any, lineId: any){
    return new Promise((resolve) => {
      this.http.get(this.server.ServerNameV2 + '/master/line/put?lineId=' + lineId, {headers: {"Authorization": "Bearer " + token}})
      .subscribe(e=>{
        resolve(e);
      })
    })
  }
}