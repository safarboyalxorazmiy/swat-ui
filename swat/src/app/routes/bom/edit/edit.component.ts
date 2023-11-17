import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductionapiService } from 'src/app/services/productionapi.service';

import { ConfirmationService, FilterService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { IComponent } from '../../../models/component.model';
import { IBom } from '../../../models/bom.model'
import { EditComponentModel } from '../../../models/component.edit';
import { InputNumberModule } from 'primeng/inputnumber';

import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editComponent: EditComponentModel

  id: any
  modelInfo: any

  allComponents: IComponent[]
  selectedComponent: IComponent

  quantity: number | null
  comment: string

  components: IBom[];
  component: IBom;
  
  selectedComponents: IComponent[]

  submitted: boolean;
  productDialog: boolean;

  statuses: any;
  loading: boolean = true;

  cols: any[];
  token = {
    token: ""
  };

  isEditing = false

  exportColumns: any[];

  errorMessage: any;

  constructor(
    private route: ActivatedRoute, 
    public api: ProductionapiService, 
    private confirmationService: ConfirmationService
    ) { }

  async ngOnInit(): Promise<void> {

    this.token.token = localStorage.getItem("token") || ""
    this.id = this.route.snapshot.paramMap.get('id');
    let data  = {
        token: this.token.token,
        id: Number(this.id)
    }
    console.log(data)
    this.components = await this.api.getModelBomComponents(data)
    console.log("getModelBomComponents: ", this.components)
    this.modelInfo = await this.api.getModelInfo(data)
    console.log("this.modelInfo: ", this.modelInfo)
    this.allComponents = await this.api.getComponentsAll(data)
    console.log(this.components)


    // console.log(this.components)
    this.loading = false
  }

  async add(){
    console.log('selectedComponent: ', this.selectedComponent)
    console.log('quantity: ', this.quantity)
    let sendData = {
      model_id: Number(this.id),
      id: Number(this.selectedComponent.id),
      quantity: Number(this.quantity),
      comment: this.comment,
      token: this.token.token
    }

    let result = await this.api.addModelBomComponents(sendData)
    // console.log(result)
    if(result.result == 'error')
    alert('ERROR: ' + result.error)
    let data  = {
        token: this.token.token,
        id: Number(this.id)
    }
    console.log(data)
    this.components = await this.api.getModelBomComponents(data)
    this.selectedComponent = {}
    this.quantity = null
    this.comment = ''
  }
  
  deleteProduct(component: IComponent) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + component.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: async () => {
            console.log(component)
            let data = {
                component_id: component.component_id,
                model_id: Number(this.id),
                token: this.token.token,
                id: Number(this.id)
            }
              let result = await this.api.deleteModelBomComponents(data)
              console.log(result)
              if(result.result != 'ok'){
                alert('ERROR: ' + result.error)
              }
              
              // location.reload();
              this.loading = true
              this.components = await this.api.getModelBomComponents(data)
              this.loading = false
          }
      });
  }
  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
      
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
  
  cancelEdit() {
    this.isEditing = false;
  }

  async acceptEdit() {
    // console.log(this.editComponent)
    // console.log(this.modelInfo.id)
    let data = {
      component_id: this.editComponent.id,
      model_id: Number(this.id),
      quantity: this.editComponent.quantity,
      token: this.token.token
    }

    console.log("data: ", data)


    let result = await this.api.bomComponentUpdate(data)
    if (result.result == "ok"){
      let data  = {
        token: this.token.token,
        id: Number(this.id)
    }
      this.components = await this.api.getModelBomComponents(data)
      this.modelInfo = await this.api.getModelInfo(data)
      this.isEditing = false;
    } else {
      this.errorMessage = result.error;
    }
  }

  showModal(component: any) {
    this.isEditing = true

    this.editComponent = {
      id: component.id,
      quantity: component.quantity
    }
  }
}