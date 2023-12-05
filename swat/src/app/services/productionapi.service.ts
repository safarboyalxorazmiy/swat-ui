import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service'
import { HttpClient } from '@angular/common/http';

import { ICheckpoint } from '../models/checkpoint.model'
import { IComponent } from '../models/component.model'
import { ITypes, Keys } from '../models/types.model'
import { IModels } from '../models/ref.model';
import { IBom } from '../models/bom.model';
import { IGp } from '../models/gp';



@Injectable({
  providedIn: 'root'
})
export class ProductionapiService {


  constructor(public config: ConfigService, public http: HttpClient) { }
  public async PlanUpdate(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/plan/update', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GetPlanByMonth(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/plan/getbymonth', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async CellGetByComponentAll(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/cell/getbycomponent/all', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async CellGetByComponent(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/cell/getbycomponent', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async CellGetAll(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/cell/getall', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async CellAddComponent(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/cell/addcomponent', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async CellGetEmpty(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/cell/getempty', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async UpdateContainerComponents(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/container/components/update', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async RegisterContainerComponents(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/register/component', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GetContainerComponents(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/container/components', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async DeleteContainerComponents(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/container/components/delete', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async SendFileIncomeContainer(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/income/file', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async AddContainer(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/container/add', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async UpdateContainer(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/container/update', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GetContainerByBatch(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/container/getbybatch', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async UpdateLot(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/lot/update', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async AddBatch(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/batch/add', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async UpdateBatch(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/batch/update', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async DeleteBatch(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/batch/delete', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GetBatchesByLot(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/batch/getbylot', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async DeActivateLot(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/lot/deactivate', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async ActivateLot(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/lot/activate', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async UnBlockLot(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/lot/unblock', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async BlockLot(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/lot/block', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async AddLot(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/lot/add', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GetAllLots(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/lot/getall', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async GetAllLotsActive(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/import/lot/getallactive', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async SectorBalanceUpdate(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/production/sector/balance/update', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getSectorBalance(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/production/sector/balance', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async outcomeCompCheck(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/outcome/component/check', body).subscribe(e => {
        resolve(e);
      })
    })
  }


  public async outcomeModelSubmit(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/outcome/model/submit', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  
  public async outcomeComponentSubmit(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenNameV2 + '/logist/component/submit', body, {headers: {"Content-Type": "application/json"}}).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async outcomeModelCheck(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/outcome/model/check', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getGpByDate(body: any) {
    return new Promise<IGp[]>((resolve) => {
      this.http.post<IGp[]>(this.config.serverDomenName + '/ware/income/gp/report', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getGp5() {
    return new Promise<IGp[]>((resolve) => {
      this.http.get<IGp[]>(this.config.serverDomenName + '/ware/income/gp/report').subscribe(e => {
        resolve(e);
      })
    })
  }

  public async sendGP(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/income/gp', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async IncomeReport(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/income/report', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async AktReport(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/akt/report', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async OutcomeReport(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/outcome/report', body).subscribe(e => {
        resolve(e);
      })
    })
  }


  public async addComponentWarehouse(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/income', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async addModelBomComponents(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/bom/component/add', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async deleteModelBomComponents(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/bom/component/delete/', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async getModelBomComponents(body: any) {
    return new Promise<IBom[]>((resolve) => {
      this.http.post<IBom[]>(this.config.serverDomenName + '/ware/bom/component', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async bomComponentUpdate(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/bom/component/update', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async deleteModels(body: any) {
    return new Promise<any>((resolve) => {
      console.log('delete: ', body)
      this.http.delete<any>(this.config.serverDomenName + '/ware/models/' + body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getModelInfo(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/model', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getModels(body: any) {
    return new Promise<IModels[]>((resolve) => {
      this.http.post<IModels[]>(this.config.serverDomenName + '/ware/models', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getKeys(body: any) {
    return new Promise<Keys[]>((resolve) => {
      this.http.post<Keys[]>(this.config.serverDomenName + '/ware/gscode/get', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getGPComponents(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/components/gp', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GPComponentsAdd(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/components/gp/add', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GPComponentsRemove(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/components/gp/remove', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GPComponentsAdded(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/components/gp/added', body).subscribe(e => {
        resolve(e);
      })
    })
  }
  public async sendNewModel(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/model/update', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async sendComponentData(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/component/add', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async sendCheckpointData(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/checkpoint/add', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async deleteCheckpoint(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/checkpoint/delete', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async deleteComponent(body: any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + '/ware/component/delete', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getCheckPoints(body: any) {
    return new Promise<ICheckpoint[]>((resolve) => {
      this.http.post<ICheckpoint[]>(this.config.serverDomenName + '/ware/checkpoints', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getTypes(body: any) {
    return new Promise<ITypes[]>((resolve) => {
      this.http.post<ITypes[]>(this.config.serverDomenName + '/ware/types', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getComponentsAll(body: any) {
    return new Promise<IComponent[]>((resolve) => {
      this.http.post<IComponent[]>(this.config.serverDomenName + '/ware/components', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getComponentsAllOutcome(body: any) {
    return new Promise<IComponent[]>((resolve) => {
      this.http.post<IComponent[]>(this.config.serverDomenName + '/ware/components/outcome/byquantity', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async getComponent(id: number) {
    let data = {
      id
    }
    return new Promise<IComponent[]>((resolve) => {
      this.http.post<IComponent[]>(this.config.serverDomenName + `/ware/component`, data).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async postAkt(body: any) {

    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + `/ware/akt/input`, body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async postAktWare(body: any) {

    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenName + `/ware/akt/input/ware`, body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GetLogists(body: any) {
    return new Promise<any>((resolve) => {
      this.http.get<any>(this.config.serverDomenNameV2 + '/logist/get/info', body).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async GetComponents() {
    return new Promise<any>((resolve) => {
      this.http.get<any>(
        this.config.serverDomenNameV2 + '/api/v1/components/get/all'
      ).subscribe(e => {
        resolve(e);
      })
    })
  }

  public async CreateComposite(data:any) {
    return new Promise<any>((resolve) => {
      this.http.post<any>(this.config.serverDomenNameV2 + `/api/v1/composite/create`, data)
      .subscribe(e => {
        resolve(e);
      })
    })
  }
}
