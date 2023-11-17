import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductionService } from 'src/app/services/production.service';
import { IProduction } from 'src/app/models/production';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  
  lastProduct: IProduction[]
  models: any
  count: any
  byModel: any
  time = new Date();
  intervalId: any;
  line: number = 9
  serial: String = ''
  sendSerial: String

  rest: any

  added: boolean = false
  addedText: string = "Kiritildi"

  someError: boolean = false
  errorText: string = '';

  id: any;
  selectedModel: any;
  selectedType: any;
  

  constructor(private route: ActivatedRoute, public api: ProductionService, public renderer: Renderer2) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('model_id');
    console.log(this)
    this.models = await this.api.getModels()
    for(let i of this.models){
      if(i.id == this.id) {
        this.selectedModel = i.name + " " + i.comment
      }
    }
    console.log()

    let line = {
      line: this.line
    }

    this.lastProduct = await this.api.getLast(line)
    // console.log(this.lastProduct)
    this.count = await this.api.getToday(line)
    // console.log(this.count)
    this.byModel = await this.api.getTodayByModels(line)
    // console.log("bymodel: ",this.byModel)
    this.rest = await this.api.getSectorBalance(line)
  }
  
  async requestSerial() {
    let data = {
      id: Number(this.id)
    }
    let result = await this.api.MetallSerial(data)
    console.log(result)
    if(result.result != 'ok'){
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
    }else{
      this.someError = false
      this.errorText = ''
    }
    let line = {
      line: this.line
    }

    this.lastProduct = await this.api.getLast(line)
    // console.log(this.lastProduct)
    this.count = await this.api.getToday(line)
    // console.log(this.count)
    this.byModel = await this.api.getTodayByModels(line)
    // console.log("bymodel: ",this.byModel)
    this.rest = await this.api.getSectorBalance(line)
    // console.log("rest: ", this.rest)

    // this.renderer.selectRootElement('#serial').focus()
  }

  change(){
    if(this.serial.includes('clear'))
    this.serial = ''
    if(this.serial.includes('refresh')){
      location.reload()
    }
    if(this.serial.length === 15){
      this.sendSerial = this.serial
      this.serial = ''
      this.submit()
    }
  }


  async submit(){
    let data = {
      serial: this.sendSerial,
      line: this.line
    }

    let result = await this.api.serialInput(data)
    this.serial = ''
    console.log("result: ", result)
    if(result.result != 'ok'){
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
      return
    }else{
      this.someError = false
      this.errorText = ''
    }
      let line = {
        line: this.line
      }
      this.lastProduct = await this.api.getLast(line)
      this.count = await this.api.getToday(line)
      this.byModel = await this.api.getTodayByModels(line)
      this.rest = await this.api.getSectorBalance(line)
      // this.renderer.selectRootElement('#serial').focus()
      this.added = true
      setTimeout(()=>{
        this.added = false
      }, 3000)

  }


}
