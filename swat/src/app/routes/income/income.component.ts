import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { IComponent } from '../../models/component.model';
import { ICheckpoint } from '../../models/checkpoint.model'
import { ITypes } from 'src/app/models/types.model';

import { ProductionapiService } from '../../services/productionapi.service';

import * as FileSaver from 'file-saver';

declare var jsPDF: any;
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})


export class IncomeComponent implements OnInit {

  adding: number

  disabled: boolean = true;

  checkpoints: ICheckpoint[];
  checkpoint: ICheckpoint;

  components: IComponent[];
  component: IComponent;
  
  selectedComponents: IComponent[]
  selectedCheckpoint: ICheckpoint

  types: ITypes[];
  selectedType: ITypes

  submitted: boolean;
  productDialog: boolean;

  statuses: any;
  loading: boolean = true;
  
  cols: any[];

  exportColumns: any[];

  token = {
    token: ""
  }




constructor(public api: ProductionapiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

async ngOnInit(): Promise<void> {
  this.token.token = localStorage.getItem("token") || ""
  this.checkpoints = await this.api.getCheckPoints(this.token);
  this.types = await this.api.getTypes(this.token)
  this.components = await this.api.getComponentsAllOutcome(this.token)

  this.selectedCheckpoint = {}
  this.loading = false;
  
}

addProduct(component: IComponent) {
  this.component = {...component};
  this.productDialog = true;
  this.selectedCheckpoint.id = this.component.checkpoint_id
  this.selectedCheckpoint.name = this.component.checkpoint
}

hideDialog() {
  this.productDialog = false;
  this.submitted = false;
  
}
async sendProduct() {
  this.submitted = true;
  this.component.checkpoint_id = this.selectedCheckpoint.id
  this.component.checkpoint = this.selectedCheckpoint.name

  const sendData = {
    id: this.component.id,
    quantity: this.adding,
    token: this.token.token
  }
  this.confirmationService.confirm({
    message: 'Are you sure you want to income ' + this.component.name + ' ' + this.adding + ' ' + this.component.unit + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      let result = await this.api.addComponentWarehouse(sendData)
      console.log(result)
        if(result.result != 'ok'){
          alert('SERVER ERROR')
          console.log(result)
        }
        this.productDialog = false
        this.loading = true
        this.components = await this.api.getComponentsAllOutcome(this.token)
        this.loading = false
  
    }
    

});

}

findIndexById(id: string): string {
  let index = -1;
  for (let i = 0; i < this.components.length; i++) {
      if (Number(this.components[i].id) === Number(id)) {
          index = i;
          break;
      }
  }

  return String(index);
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
          doc.autoTable(this.exportColumns, this.components);
          doc.save(`components_export_${year}_${month}_${day}-${hour}_${minut}.pdf`);
      })
  })
}

exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.components);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "components");
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


