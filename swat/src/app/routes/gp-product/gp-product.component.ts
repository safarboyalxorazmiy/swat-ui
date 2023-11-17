import { Component, OnInit } from '@angular/core';
import {ICheckpoint} from '../../models/checkpoint.model'
import {IGPComponent} from '../../models/component.model'
import {IModels} from '../..//models/ref.model'
import { ProductionapiService } from 'src/app/services/productionapi.service';

@Component({
  selector: 'app-gp-product',
  templateUrl: './gp-product.component.html',
  styleUrls: ['./gp-product.component.css']
})
export class GpProductComponent implements OnInit {
  lines: ICheckpoint[]
  line: ICheckpoint

  models: IModels[]
  model: IModels

  components: IGPComponent[]
  component: IGPComponent

  token: string

  submit:boolean = false
  submitText: string = ""

  someError: boolean = false
  errorText: string = ""

  loaded: boolean = false

  addedComponents: any
  
  constructor(public api: ProductionapiService) { }

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem("token") || ""
    this.addedComponents = await this.api.GPComponentsAdded({token: this.token})
    if (this.addedComponents.result == "ok"){
      this.loaded = true
    }
    this.lines = await this.api.getCheckPoints({token: this.token});
    this.components = await this.api.getGPComponents({token: this.token})
    this.models = await this.api.getModels({token: this.token})

    console.log(this.addedComponents)
  }

  async submitted(){
    console.log("line", this.line)
    console.log("component", this.component)
    console.log("model", this.model)

    if (this.line == undefined || this.component == undefined || this.model == undefined){
      this.someError = true
      this.errorText = "malumotlar toliq kiritilmadi"
      return
    }
    this.someError = false
    let data = {
      token: this.token,
      checkpoint_id: this.line.id,
      component_id: this.component.id,
      model_id: this.model.id
    }

    let result = await this.api.GPComponentsAdd(data)
    console.log(result)

    if (result.result == "ok"){
      this.submitText = "Kiritildi"
      this.submit = true
    }else{
      this.someError = false
      this.errorText = result.error
      return
    }

    setTimeout(()=>{
      this.submit = false
      location.reload()
    }, 2000)
  }

  async deleteComponent(id: number){
    console.log(id)
    let result = await this.api.GPComponentsRemove({
      token: this.token,
      id
    })
    console.log(result)
    if (result.result != "ok"){
      this.someError = false
      this.errorText = result.error
      return
    }
    this.someError = false
    this.submit = true
    this.submitText = "O'chirildi"
    setTimeout(()=>{
      this.submit = false
      location.reload()
    }, 2000)
  }


}
