import { Component, OnInit } from '@angular/core';
import { ProductionapiService } from 'src/app/services/productionapi.service';

@Component({
  selector: 'app-cell-income',
  templateUrl: './cell-income.component.html',
  styleUrls: ['./cell-income.component.css']
})
export class CellIncomeComponent implements OnInit {
  token: string
  someError: boolean = false
  errorText: string = ""

  loading: boolean = true;

  lots: any
  selectedLot: any
  lotSelected: boolean = false

  components: any
  selectedComponent: any
  componentSelected: boolean = false

  cells: any
  selectedCell: any

  cellOpen: boolean = false

  inputQuantity: boolean = false

  allSelected: boolean = false

  quantity: number

  allCells: any

  constructor(public api: ProductionapiService) { }

  async ngOnInit(): Promise<void> {
    this.lotSelected = false
    this.token = localStorage.getItem("token") || ""
    this.getAllData()
  }

  lotChanged(){
    console.log(this.selectedLot)
    this.lotSelected = true
  }
  componentChanged(){
    console.log(this.selectedComponent)
    this.componentSelected = true
    this.getEmptyCells()
    this.cellOpen = true
  }
  cellChanged(){
    console.log(this.selectedCell)
    this.inputQuantity = true
  }
  inputChanged(){
      this.allSelected = true
  }

  async submitted(){
    console.log(this.selectedComponent.component_income, this.quantity)
    if (this.selectedComponent.component_income < this.quantity){
      this.someError = true
      this.errorText = "Miqdor noto'g'ri"
      return
    }

    let data = {
      token: this.token,
      lot_id: this.selectedLot.lot_id,
      component_id: this.selectedComponent.id,
      cell_id: this.selectedCell.id,
      quantity: this.quantity
    }
    console.log(data)

    let result = await this.api.CellAddComponent(data)
    console.log(result)
    if (result.result == "ok"){
      this.someError = false
      this.quantity = 0
      this.allSelected = false
      this.getAllData()
    }else{
      this.someError = true
      this.errorText = result.error
    }
    
  }

  async getEmptyCells(){
    let data = await this.api.CellGetEmpty({
      token: this.token,
      lot_id: this.selectedLot.lot_id,
      component_id: this.selectedComponent.id
    })
    console.log(data)

    if (data.result == "ok"){
      this.someError = false
      this.cells = data.data
    }else{
      this.someError = true
      this.errorText = data.error
      return
    }
  }

  async getAllData(){

    this.loading = true

    let getLots = await this.api.GetAllLotsActive({
      token: this.token
    })
    if (getLots.result == "ok"){
      this.someError = false
      this.lots = getLots.data
    }else{
      this.someError = true
      this.errorText = getLots.error
      return
    }

    let getAllCells = await this.api.CellGetAll({
      token: this.token
    })
    if (getAllCells.result == "ok"){
      this.allCells = getAllCells.data
    }else{
      this.someError = true
      this.errorText = getAllCells.error
      return
    }
    console.log(this.allCells)
    this.components = await this.api.getComponentsAllOutcome({
      token: this.token
    })
    this.loading = false
  }
}
