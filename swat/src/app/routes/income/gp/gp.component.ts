import { Component, OnInit } from '@angular/core';
import { ProductionapiService } from 'src/app/services/productionapi.service';
import {IGp} from 'src//app/models/gp'
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';
declare var jsPDF: any;


@Component({
  selector: 'app-gp',
  templateUrl: './gp.component.html',
  styleUrls: ['./gp.component.css']
})
export class GpComponent implements OnInit {

  gp5: IGp []
  gpAll: IGp[]
  quantity: number
  date: Date

  someError: boolean = false
  total: boolean = false
  errorText: string;

  serial: string;

  constructor(public api: ProductionapiService, private datePipe: DatePipe) { }

  async ngOnInit(): Promise<void> {

    this.gp5 = await this.api.getGp5()
    console.log(this.gp5)
    // console.log("result: ", this.gpAll.length)
    this.serial = ''

  }

  transformDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }


  async report() {
    console.log(this.date)
    let transformDate = this.transformDate(this.date)
    let date = {
      date: transformDate
    }
    this.gpAll = await this.api.getGpByDate(date)
    this.quantity = this.gpAll.length
    this.total = true

  }

  async submit(){
    let data = {
      serial: this.serial
    }

    let result = await this.api.sendGP(data)
    console.log("result: ", result)
    if(result.result != 'ok'){
      this.someError = true
      this.errorText = `${result.result}, ${result?.error?.code}, ${result?.error?.detail}`
    }
    this.serial = ''
    this.gp5 = await this.api.getGp5()

  }

  change(){
    if(this.serial.includes('clear'))
    this.serial = ''
    if(this.serial.length == 13)
    this.submit()
  }

  exportPdf() {
    let year = new Date().getFullYear()
    let month = new Date().getMonth()
    let day = new Date().getDay()
    let hour = new Date().getHours()
    let minut = new Date().getMinutes()
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default('portrait', 'mm');
            //@ts-ignore
            doc.autoTable(this.exportColumns, this.gpAll);
            doc.save(`report_income_${year}_${month}_${day}-${hour}_${minut}.pdf`);
        })
    })
}

exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.gpAll);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "report");
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
    FileSaver.saveAs(data, fileName + '_income_' + `${year}_${month}_${day}-${hour}_${minut}` + EXCEL_EXTENSION);
}
}
