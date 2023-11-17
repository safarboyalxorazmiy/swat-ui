import { Component, OnInit } from '@angular/core';
import { ProductionapiService } from 'src/app/services/productionapi.service';
import { DatePipe } from '@angular/common';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [DatePipe]
})
export class ReportComponent implements OnInit {
  token = {
    token: ""
  }
  date1: Date
  date2: Date

  report: boolean = false

  result: any
  
  constructor(public api: ProductionapiService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.token.token = localStorage.getItem("token") || ""
  }

  async getInfo(){
    let data = {
      date1: this.transformDate(this.date1),
      date2: this.transformDate(this.date2),
      token: this.token.token
    }
    this.result = await this.api.IncomeReport(data)
    console.log(this.result)

    this.report = true
  }

  transformDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.result);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "income_report");
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

}
