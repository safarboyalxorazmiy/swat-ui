import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ProductionapiService } from 'src/app/services/productionapi.service';
import { IModels } from '../../models/ref.model'



@Component({
  selector: 'app-bom',
  templateUrl: './bom.component.html',
  styleUrls: ['./bom.component.css']
})
export class BomComponent implements OnInit {

  newModel: IModels
  submitted: boolean = false
  models: IModels[]
  model: IModels

  token = {
    token: ""
  }

  productDialog: boolean = false
  loading: boolean;


  constructor(public api: ProductionapiService, private confirmationService: ConfirmationService) { }

  async ngOnInit(): Promise<void> {
    this.token.token = localStorage.getItem("token") || ""
    this.models = await this.api.getModels(this.token)
    

    this.newModel = {
      name: "",
      code: "",
      comment: "",
      assembly: ""
    }

  }

  createModel(){
    this.productDialog = true

  }

  deleteModel(model: IModels){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + model.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
          let result = await this.api.deleteModels(model.id)
          // if (result.result == 'error'){
          //     alert('ERROR')
          // }
          console.log(result)
          if(result.result == 'error')
          alert('ERROR: ' + result.error.code)
          // location.reload();
          console.log('delete', result)
          this.loading = true
          this.models = await this.api.getModels(this.token);
          this.loading = false

      }

    })

  

  }

  editModel(model: IModels){
    console.log('EDIT', model)
    this.newModel = {...model};
    this.productDialog = true
  }

  cancelDlg(){
    this.productDialog = false
  }

  async acceptDlg(newModel: IModels){
    let data = {
      id: newModel.id,
      code: newModel.code,
      comment: newModel.comment,
      name: newModel.name,
      specs: newModel.assembly,
      token: this.token.token
    }
    let result = await this.api.sendNewModel(data)
    console.log(result)
    if(result.result == 'error')
    alert('ERROR: ' + result.error.code)
    this.productDialog = false
    this.models = await this.api.getModels(this.token)
  }

}
