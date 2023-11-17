import { Component, OnInit } from '@angular/core';
import { ProductionapiService } from 'src/app/services/productionapi.service';

@Component({
  selector: 'app-lots',
  templateUrl: './lots.component.html',
  styleUrls: ['./lots.component.css']
})
export class LotsComponent implements OnInit {
  token: string = ""
  lots: any
  loaded: boolean = false
  new_lot: string = ""
  new_comment: string = ""
  someError: boolean = false
  added: boolean = false
  errorText: string = ""
  addedText: string = ""

  clonedProducts: { [s: string]: any; } = {};

  constructor(public api: ProductionapiService) { }

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem("token") || ""
    let data = await this.api.GetAllLots({
      token: this.token
    })
    if (data.result == "ok") {
      this.loaded = true
      this.lots = data.data
    }

  }

  async submitted() {
    if (this.new_lot == "") {
      this.someError = true
      this.added = false
      this.errorText = "Lot nomi yozilmadi"
      return
    }
    console.log("new_lot: ", this.new_lot)
    console.log("new_comment: ", this.new_comment)
    let data = {
      token: this.token,
      name: this.new_lot,
      comment: this.new_comment
    }

    let result = await this.api.AddLot(data)
    this.new_comment = ""
    this.new_lot = ""
    await this.chechFunc(result);


  }

  async block(id: number) {
    let result = await this.api.BlockLot({
      token: this.token,
      lot_id: id
    })
    await this.chechFunc(result);
  }

  async unblock(id: number) {
    let result = await this.api.UnBlockLot({
      token: this.token,
      lot_id: id
    })
    console.log(result)
    await this.chechFunc(result);
  }

  async activate(id: number) {
    let result = await this.api.ActivateLot({
      token: this.token,
      lot_id: id
    })
    await this.chechFunc(result);
  }

  async deactivate(id: number) {
    let result = await this.api.DeActivateLot({
      token: this.token,
      lot_id: id
    })
    await this.chechFunc(result);
  }


  onRowEditInit(product: any) {
    this.clonedProducts[product.lot_id] = { ...product };
    console.log(this.clonedProducts)
  }

  async onRowEditSave(product: any) {
    let result = await this.api.UpdateLot({
      token: this.token,
      lot_id: Number(product.lot_id),
      name: product.name,
      comment: product.comment
    })

    await this.chechFunc(result);
  }


  onRowEditCancel(product: any, index: number) {
    // this.lots[index] = this.clonedProducts[product.lot_id];
    // delete this.lots[product.lot_id];
  }

  async chechFunc(result: any) {
    if (result.result == "ok") {
      let data = await this.api.GetAllLots({
        token: this.token
      })
      if (data.result == "ok") {
        this.loaded = true
        this.lots = data.data
      } else {
        this.someError = true
        this.added = false
        this.errorText = result.error
        return
      }

    } else {
      this.someError = true
      this.added = false
      this.errorText = result.error
      return
    }
  }
}
