import { Component, OnInit } from '@angular/core';
import { IComponent } from '../../models/component.model';
import { ICheckpoint } from '../../models/checkpoint.model'
import { IModels } from 'src/app/models/ref.model';
import { IOutcome } from 'src/app/models/outcome.model'

import { ProductionapiService } from '../../services/productionapi.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.css']
})
export class OutcomeComponent implements OnInit {

  constructor(public api: ProductionapiService, private http: HttpClient) { }

  fileName = ''

  outcome: IOutcome[]

  tasdiqlash: boolean = false

  component: IComponent[]
  checkpoint: ICheckpoint[]
  models: IModels[]
  model: IModels
  val: Number
  valComp: Number
  outComps: IComponent[]
  outComp: IComponent

  modelAccept: boolean = false
  modelAcceptText: string = 'test'

  componentAccept: boolean = false
  alert:boolean = false
  componentAcceptText: string = ''

  result: any

  showOutcome: boolean = false
  showOutComp: boolean = false

  available: boolean = false

  outcomeData: any
  outcomeStatus: boolean
  outcomeError:boolean = false
  OutcomeSubmit: boolean = false
  
  token = {
    token: ""
  }

  data: {
    email: any
    token: any
    role: any
}


  async ngOnInit(): Promise<void> {
    this.outcomeStatus = false
    this.token.token = localStorage.getItem("token") || ""
    this.models = await this.api.getModels(this.token)
    console.log(this.models);
    this.outComps = await this.api.getComponentsAllOutcome(this.token)
    
  }

  async submitModel(){
    let data = {
      model_id: this.model.id,
      quantity: this.val,
      token: this.token.token
    }
    let res = await this.api.outcomeModelSubmit(data)
    console.log(res)

    if (res.result === 'ok'){
      this.modelAccept = true
      this.alert = false
      this.modelAcceptText = 'Liniyaga chiqim qilindi'
      this.showOutcome = false
      for (var member in this.outcome) delete this.outcome[member];

      // this.outcome 
    }else{
      this.modelAccept = true
      this.alert = true
      this.modelAcceptText = "Komponentlar yetarli emas"
    }
    setTimeout(()=>{
      this.componentAccept = false
      location.reload()
    }, 3000)
    
  }
  async submitComp(){
    let data = {
        component_id: this.outComp.id,
        checkpoint_id: this.outComp.checkpoint_id,
        quantity: this.valComp,
        token: this.token.token
    }
    console.log(this.outComp, this.valComp)
    let res = await this.api.outcomeComponentSubmit(data)
    console.log("result: ",res)
    if (res.result === 'ok'){
      this.componentAccept = true
      this.alert = false
      this.componentAcceptText = 'Liniyaga chiqim qilindi'
      this.outComp = {}
      this.valComp = 0
      this.showOutComp = false
    }else{
      this.componentAccept = true
      this.componentAcceptText = res.result.error
      this.alert = true
      this.showOutComp = false
      this.outComp = {}
      this.valComp = 0
    }
    setTimeout(()=>{
      this.componentAccept = false
      location.reload()
    }, 3000)
  }

  async check (){
    let data = {
      id: this.model.id,
      quantity: this.val,
      token: this.token.token
    }
    this.outcome = await this.api.outcomeModelCheck(data)
    this.showOutcome = true
}

  async checkComp (){
    let data = {
      id: this.outComp.id,
      quantity: this.valComp,
      token: this.token.token

    }

    this.result = await this.api.outcomeCompCheck(data)
    console.log(this.result)
    this.showOutComp = true 
  }

  async onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("excel", file);


        const upload$ = this.http.post("http://192.168.5.250:7777/ware/outcome/file", formData);

        upload$.subscribe((body) => {
          console.log(body)
          this.outcomeData = body
          this.outcomeStatus = true
        })
    }
  }
}
