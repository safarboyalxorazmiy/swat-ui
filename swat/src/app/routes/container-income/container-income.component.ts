import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductionapiService } from 'src/app/services/productionapi.service';

import * as FileSaver from 'file-saver';

// interface exportExcel{
//   code: string,
//   unit: string,
//   quantity: number,
//   r_quantity: number,
//   comment: string,
//   income


// }

@Component({
  selector: 'app-container-income',
  templateUrl: './container-income.component.html',
  styleUrls: ['./container-income.component.css']
})
export class ContainerIncomeComponent implements OnInit {

  @ViewChild('table1') table: any

  base64Output : string;

  components: any
  list_component:any
  selected_list_component:any

  batch_id: any
  lot_id: any
  container_id: any
  token: string
  someError: boolean = false
  added: boolean = false
  errorText: string = ""
  addedText: string = ""

  new_component: any
  new_quantity: any
  new_comment: any

  clonedProducts: { [s: string]: any; } = {};

  enableQuantity: boolean = false
  enableSubmit: boolean = false

  // table = document.getElementById("table1")


  constructor(public api: ProductionapiService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem("token") || ""
    this.lot_id = this.route.snapshot.paramMap.get('lot_id');
    this.batch_id = this.route.snapshot.paramMap.get('batch_id');
    this.container_id = this.route.snapshot.paramMap.get('container_id');
    this.list_component = await this.api.getComponentsAll({token: this.token})

   let result = await this.api.GetContainerComponents({
      token: this.token,
      container_id: Number(this.container_id)
    })
    if (result.result == "ok"){
      this.someError = false
      this.components = result.data
    }else{
      this.someError = true
      this.errorText = result.error
    }

  }

  async onFileSelected(event: any) {
    this.convertFile(event.target.files[0]).subscribe(async base64 => {
      this.base64Output = base64;
      let result = await this.api.SendFileIncomeContainer({
        token: this.token,
        lot_id: Number(this.lot_id),
        batch_id: Number(this.batch_id),
        container_id: Number(this.container_id),
        file64: String(this.base64Output)
      })
      this.checkResult(result)
      let updateList = await this.api.GetContainerComponents({
        token: this.token,
        container_id: Number(this.container_id)
      })
      console.log("updateList: ", updateList)
      if (updateList.result == "ok"){
        // this.someError = false
        this.components = updateList.data
      }

    })   
  }

  convertFile(file : File) : Observable<string> {
    console.log("converting")
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  async deleteComponent(component: any){
      let result = await this.api.DeleteContainerComponents({
        token: this.token,
        component_id: Number(component.id)
      })
      this.checkResult(result)

  }

  async checkResult(result: any){
    console.log(result)
    if (result.result == "ok"){
      this.someError = false
      let result = await this.api.GetContainerComponents({
        token: this.token,
        container_id: Number(this.container_id)
      })
      if (result.result == "ok"){
        this.someError = false
        this.components = result.data
      }else{
        this.someError = true
        this.errorText = result.error
      }
    }else{
      this.someError = true
      this.errorText = result.error
    }
  }

  onRowEditInit(product: any) {
    console.log(product)
    this.clonedProducts[product.batch_id] = { ...product };
  }

  async onRowEditSave(product: any) {
    console.log("product: ", product)

    let result = await this.api.UpdateContainerComponents({
      token: this.token,
      component_id: Number(product.id),
      comment: product.comment,
      r_quantity: Number(product.r_quantity)
    })
    this.checkResult(result)
    // this.getContainer(result)

  }

  onRowEditCancel(product: any, index: number) {
    this.components[index] = this.clonedProducts[product.batch_id];
    delete this.components[product.batch_id];
  }

  async sumbitted(){
    console.log(this.selected_list_component)
    let result = await this.api.RegisterContainerComponents({
      token: this.token,
      lot_id: Number(this.lot_id),
      batch_id: Number(this.batch_id),
      container_id: Number(this.container_id),
      quantity: Number(this.new_quantity),
      comment: this.new_comment,
      component_id: Number(this.selected_list_component.id),
      unit: this.selected_list_component.unit
    })
    console.log(result)
    this.checkResult(result)
    this.clearAll()
  }

  // @ViewChild('body') table: ElementRef;


  // exportAsExcel()
  //   {
  //     console.log(this.table.elementRef.nativeElement
  //       )
  //     const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.elementRef.nativeElement);//converts a DOM TABLE element to a worksheet
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //     /* save to file */
  //     XLSX.writeFile(wb, 'components.xlsx');

  //   }
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.components);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "container_id_" + this.container_id);
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

  inputChanged() {
    this.enableSubmit = true
  }
  componentChanged() {
    this.enableQuantity = true
  }

  clearAll(){
    this.enableQuantity = false
    this.new_quantity = null
    this.enableSubmit = false
    this.new_comment = null
    this.selected_list_component = null
  }

}
