import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { IComponent } from '../../models/component.model';
import { ICheckpoint } from '../../models/checkpoint.model'
import { ITypes } from 'src/app/models/types.model';

import { ProductionapiService } from '../../services/productionapi.service';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css'],
  providers: []
})


export class ComponentsComponent implements OnInit {
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

  componentsForComposite: IComponent[];
  selectedComponent: any;
  componentError: string;

  quantity: Number;
  quantityError: String;

  componentGroup: any[] = [];

  constructor(
    public api: ProductionapiService, 
    private confirmationService: ConfirmationService
 ) {}

  async ngOnInit(): Promise<void> {
    this.token.token = localStorage.getItem("token") || ""
    this.checkpoints = await this.api.getCheckPoints(this.token);

    this.components = await this.api.getComponentsAll(this.token)
    this.selectedCheckpoint = {};
    this.loading = false;
    
    await this.getComponents();
  }

  addComponentGroup() {
    let transactionFailed = false;

    if (this.selectedComponent == undefined) {
      this.componentError = "Detall tanlanmadi.";

      transactionFailed = true;
    } else {
      this.componentError = "";
    }

    if (this.quantity == undefined) {
      this.quantityError = "Qiymat kiritilmadi."

      transactionFailed = true;
    } else {
      this.quantityError = ""
    }

    if (transactionFailed) {
      return;
    }

    let componentGroup = {
      component: this.selectedComponent,
      quantity: this.quantity
    };

    const index = this.componentGroup.findIndex(group => group.component.id === componentGroup.component.id);

    if (index !== -1) {
      componentGroup.quantity = 
        componentGroup.quantity + this.componentGroup[index].quantity
      
      this.componentGroup[index] = componentGroup;
      console.log("Component group updated:", componentGroup);
    } else {
      this.componentGroup.push(componentGroup);
      console.log("Component group added:", componentGroup);
    }

    console.log(this.componentGroup);
  }

  deleteComponentGroup(component: any) {
    console.log("Deleting component group for:", component);
    console.log("Current componentGroup:", this.componentGroup);

    const index = this.componentGroup.findIndex(group => group.component.id === component.component.id);

    console.log("Index found:", index);

    if (index !== -1) {
        this.componentGroup.splice(index, 1);
        console.log("Component group deleted:", component);
    } else {
        console.log("Component group not found:", component);
    }

    console.log("Updated componentGroup:", this.componentGroup);
}


  async getComponents() {
    this.componentsForComposite = await this.api.GetComponents();
    console.log(this.componentsForComposite)
  }

  openNew() {
    this.component = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(component: IComponent) {
    this.component = {...component};
    this.productDialog = true;
    this.selectedCheckpoint.id = this.component.checkpoint_id
    this.selectedCheckpoint.name = this.component.checkpoint
    console.log(this.component)
  }

  deleteProduct(component: IComponent) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + component.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            let data = {
                id: component.id,
                token: this.token.token
            }
            console.log("data: ", data)
            let result = await this.api.deleteComponent(data)
            console.log(result)
            if(result.result != 'ok')
            alert('ERROR')
            // location.reload();
            this.loading = true
            this.components = await this.api.getComponentsAll(this.token)
            this.loading = false
        }
    });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  async saveProduct() {
    this.submitted = true;
    if (!this.selectedCheckpoint.id || !this.component.type_id){
        alert(`Kerakli xamma ma'lumotlar kiritilmadi`)
        return
    }

    let data = {
        id: this.component.id,
        code: this.component.code,
        name: this.component.name,
        checkpoint_id: this.selectedCheckpoint.id,
        unit: this.component.unit,
        photo: this.component.photo,
        specs: this.component.specs,
        type_id: Number(this.component.type_id),
        weight: Number(this.component.weight),
        inner_code: this.component.inner_code,
        token: this.token.token
    }
    this.component.checkpoint_id = this.selectedCheckpoint.id
    this.component.checkpoint = this.selectedCheckpoint.name
    
    let result = await this.api.sendComponentData(data)
    if (result.result != 'ok')
    alert('ERROR')
    this.productDialog = false
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

    FileSaver.saveAs(data, fileName + '_export_' + `${year}_${month}_${day}-${hour}_${minut}` + EXCEL_EXTENSION);
  }
}