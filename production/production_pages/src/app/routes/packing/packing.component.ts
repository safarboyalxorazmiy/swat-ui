import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ProductionService } from '../../services/production.service'
import { IProduction } from '../../models/production'
import { IPacking } from '../../models/packing'

import * as FileSaver from 'file-saver';

// import * as faker from 'faker'; 
declare var jsPDF: any;

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.css']
})
export class PackingComponent implements OnInit {
  currentTime = new Date();
  currentYear = this.currentTime.getFullYear();
  currentMonth = this.currentTime.getMonth() + 1;
  currentDay = this.currentTime.getDate();



  retry: boolean = false
  sendSerial: String
  sendPacking: String
  lastProduct: IProduction[]
  count: any
  byModel: any
  packingToday: IPacking[]
  image_name: String
  
  time = new Date();
  intervalId: any;
  line: number = 13
  serial: String = ''
  accAss: String = ""

  someError: boolean = false
  errorText: string = '';

  constructor(public api: ProductionService, public renderer: Renderer2) { }

  added: boolean = false
  addedText: string = "Kiritildi"

  rest: any

  @ViewChild('packingInput') firstInput: ElementRef;
  @ViewChild('serialInput') secondInput: ElementRef;


  ngAfterViewInit() {
    this.addKeyListener();
  }

  addKeyListener() {
    this.firstInput.nativeElement.addEventListener('keydown', (event:any) => {
      if (event.key === 'Tab' || event.key === 'Enter' || event.key === 'Alt') {
        event.preventDefault(); 

        this.renderer.selectRootElement('#serial').focus()
  
        this.secondInput.nativeElement.focus();
      }
    });

    this.secondInput.nativeElement.addEventListener('keydown', (event:any) => {
      if (event.key === 'Tab' || event.key === 'Enter' || event.key === 'Alt') {
        event.preventDefault(); 

        this.change()
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    let line = {
      line: this.line
    }
    this.lastProduct = await this.api.getPackingLast(line)
    this.count = await this.api.getPackingToday(line)
    this.byModel = await this.api.getPackingTodayByModels(line)
    this.rest = await this.api.getSectorBalance(line)
    // console.log(this.rest)
  }
  async submit(){
    let data = {
      serial: this.sendSerial,
      packing: this.sendPacking,
      retry: this.retry
    }
    this.retry = false
    // console.log(this.sendPacking, " --- ", this.sendSerial)
    if (this.sendSerial == '' || this.sendPacking == ''){
      this.someError = true
      this.errorText = `Serial toliq kiritilmadi11`
      this.clear()
      return
    }
    if (this.sendPacking == this.sendSerial) {
      this.someError = true
      this.errorText = `Bir xil serial kiritildi`
      this.accAss = ''
      this.renderer.selectRootElement('#packing').focus()
      return
    }

    console.log(data)
    let result = await this.api.sendSerialPacking(data)

    if(result.result != 'ok'){
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
      this.clear()
      this.renderer.selectRootElement('#packing').focus()
      this.image_name = this.sendSerial + ".jpg"
      
      return
    } else {
      this.someError = false
      this.errorText = ''
    }

      let line = {
        line: this.line
      }
      this.lastProduct = await this.api.getPackingLast(line)
      this.count = await this.api.getPackingToday(line)
      this.byModel = await this.api.getPackingTodayByModels(line)
      this.rest = await this.api.getSectorBalance(line)
      this.clear()
      this.image_name = this.sendSerial + ".jpg"
      this.renderer.selectRootElement('#packing').focus()
      this.added = true
      setTimeout(()=>{
        this.added = false
      }, 3000)
      
  }

  clear(){
    this.serial = ''
    this.accAss = ''
    this.renderer.selectRootElement('#packing').focus()
  }

  async change(){
    if(this.serial.includes('clear')){
      this.clear()
    }
    if(this.serial.includes('refresh')){
      location.reload()
    }
    this.sendPacking = this.accAss
    if(this.serial.length >= 15){
      this.sendSerial = this.serial
      this.serial = ''
      this.accAss = ''
      await this.submit()
    }

    // this.renderer.selectRootElement('#packing').focus()

  }
  async changeAcc(){
    if(this.accAss.includes('clear')){
      this.clear()
    }
    if(this.accAss.includes('refresh')){
      location.reload()
    }

    if(this.accAss.length >= 12){
      this.sendPacking = this.accAss
      this.renderer.selectRootElement('#serial').focus()
    }
  }

  async exportExcel() {
    this.packingToday = await this.api.getPackingTodaySerial()
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.packingToday);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "packing");
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      let day = new Date().getDay()
      let hour = new Date().getHours()
      let minut = new Date().getMinutes()
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      FileSaver.saveAs(data, fileName + '_export_' + `${year}_${month}_${day}-${hour}_${minut}` + EXCEL_EXTENSION);
  }

  getImage(image_name:any): string {
    return "/media/" + new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + image_name;
  }
}
