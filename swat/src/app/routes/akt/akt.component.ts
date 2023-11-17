import { Component, OnInit } from '@angular/core';
import { ProductionapiService } from '../../services/productionapi.service';
import { ICheckpoint } from '../../models/checkpoint.model'
import { IComponent } from '../../models/component.model'
import { Observable, ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-akt',
  templateUrl: './akt.component.html',
  styleUrls: ['./akt.component.css']
})
export class AktComponent implements OnInit {
  lines: ICheckpoint[]
  line: ICheckpoint

  typeSelected: boolean = false

  components: IComponent[]
  component: IComponent

  componentsWare: IComponent[]
  componentWare: IComponent

  quantity: number
  quantity2: number
  
  token: string

  comment: string
  comment2: string

  someError: boolean = false
  added: boolean = false
  errorText:string = ""
  addedText: string = ""

  someError2: boolean = false
  added2: boolean = false
  errorText2:string = ""
  addedText2: string = ""

  typeID: number = 0

  uploadedFiles: any[] = [];
  base64Output : any

  uploadedFiles2: any[] = [];
  base64Output2 : any

  enableCell: boolean = false
  enableInput: boolean = false
  enableSubmit: boolean = false

  cells: any
  selectedCell: any

  constructor(public api: ProductionapiService) { }
  
  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem("token") || ""
    this.lines = await this.api.getCheckPoints({token: this.token})
    // console.log(this.component)
    this.componentsWare = await this.api.getComponentsAllOutcome({token: this.token})
    console.log(this.componentsWare)


  }

  async changed(){
   
    this.components = await this.api.getSectorBalance({
      line: this.line.id,
      token: this.token
    }
    )
    console.log(this.components)
  }

  async submitted(){
    console.log("component: ", this.component)
    console.log("quantity: ", this.quantity)
    console.log("comment: ", this.comment)

    if (this.component == undefined){
      this.someError = true
      this.added = false
      this.errorText = "Komponent yoki liniya tanlanmadi"
      return
    }
    if (this.quantity == undefined || this.quantity == 0){
      this.someError = true
      this.added = false
      this.errorText = "Komponent soni kiritilmadi"
      return
    }
    if (this.comment == "" || this.comment == undefined){
      this.someError = true
      this.added = false
      this.errorText = "Comment yozilmadi"
      return
    }
    if (this.base64Output == "" || this.base64Output == undefined){
      this.someError = true
      this.added = false
      this.errorText = "Fayl yuklanmadi"
      return
    }
    let data = {
      token: this.token,
      component_id: this.component.component_id,
      comment: this.comment,
      quantity: this.quantity,
      checkpoint_id: this.line.id,
      photo: this.base64Output,
      type_id: this.typeID
    }
    let result = await this.api.postAkt(data)

    if (result.result != "ok"){
      this.someError = true
      this.added = false
      this.errorText = result.error
      return
    }
    this.someError = false
    this.added = true
    this.addedText = "Yangilandi"
    this.component = {}
    this.line = {}
    this.quantity = 0
    this.comment = ""
    // this.uploadedFiles = null
    setTimeout(()=>{
      this.added = false

    }, 5000)

    console.log(result)

  }
  async onBasicUpload(event: any) {
    this.base64Output = this.onFileSelected(event)
    // console.log("someData: ", someData)
    // const file = event.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //     console.log(reader.result);
    //     this.base64Output = reader.result.toString()
    // };
    // this.base64Output = this.handleUpload(event)
    
  }

  async onBasicUpload2(event: any) {
    this.base64Output2 = this.onFileSelected2(event)
    // console.log("someData: ", someData)
    // const file = event.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //     console.log(reader.result);
    //     this.base64Output = reader.result.toString()
    // };
    // this.base64Output = this.handleUpload(event)
    
  }

  async submitted2(){
    console.log("component: ", this.componentWare)
    console.log("quantity: ", this.quantity2)
    console.log("comment: ", this.comment2)
    console.log("cell_id: ", this.selectedCell.cell_id)

    if (this.componentWare == undefined){
      this.someError2 = true
      this.added2 = false
      this.errorText2 = "Komponent yoki liniya tanlanmadi"
      return
    }
    if (this.quantity2 == undefined || this.quantity2 == 0){
      this.someError2 = true
      this.added2 = false
      this.errorText2 = "Komponent soni kiritilmadi"
      return
    }
    if (this.comment2 == "" || this.comment2 == undefined){
      this.someError2 = true
      this.added2 = false
      this.errorText2 = "Comment yozilmadi"
      return
    }
    if (this.base64Output2 == "" || this.base64Output2 == undefined){
      this.someError2 = true
      this.added2 = false
      this.errorText2 = "Fayl yuklanmadi"
      return
    }
    let data = {
      token: this.token,
      component_id: this.componentWare.id,
      comment: this.comment2,
      quantity: this.quantity2,
      checkpoint_id: 24,
      cell_id: this.selectedCell.cell_id,
      photo: this.base64Output2,
      type_id: this.typeID,
      lot_id: Number(this.selectedCell.lot_id)
    }
    let result = await this.api.postAktWare(data)
    console.log(result)

    if (result.result != "ok"){
      this.someError2 = true
      this.added2 = false
      this.errorText2 = result.error
      return
    }
    this.someError2 = false
    this.added2 = true
    this.addedText2 = "Yangilandi"
    this.componentWare = {}
    this.quantity2 = 0
    this.comment2 = ""
    this.selectedCell = {}
    this.enableCell = false
    this.enableInput = false
    this.enableSubmit = false
    
    setTimeout(()=>{
      this.added = false

    }, 5000)


  }
  
  onFileSelected(event:any) {
    // let someData
    this.convertFile(event.files[0]).subscribe(base64 => {
      this.base64Output = base64;
      // someData = base64
      // console.log(someData)
    });
    // return someData
  }

  onFileSelected2(event:any) {
    // let someData
    this.convertFile(event.files[0]).subscribe(base64 => {
      this.base64Output2 = base64;
      // someData = base64
      // console.log(someData)
    });
    // return someData
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  handleUpload(event:any) {
    const file = event.files[0];
    const reader = new FileReader();
    let data;
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        data = reader.result.toString()
        // return reader.result.toString()
    };
    return data
}
typSelect(id: number){
  this.typeID = id
  this.typeSelected = true
  console.log(this.typeSelected)
}

async componentChange(){
  console.log(this.componentWare)
  let result = await this.api.CellGetByComponentAll({
    token: this.token,
    component_id: this.componentWare.id
  })
  console.log(result)
  if (result.result == "ok"){
    this.cells = result.data
    this.enableCell = true
  }else{
    console.log("error: ", result.error)
  }
  console.log(this.cells)

}

cellChange() {
  this.enableInput = true
  }

  inputChanged() {
    this.enableSubmit = true
  }
}
