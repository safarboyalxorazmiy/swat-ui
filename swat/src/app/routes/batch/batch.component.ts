import { Component, OnInit } from '@angular/core';
import { ProductionapiService } from 'src/app/services/productionapi.service';
import { Product } from './product';
import { ActivatedRoute } from '@angular/router';


interface SelectItem<T = any> {
  label?: string;
  value: T;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css'],
  styles: [`
      :host ::ng-deep .p-cell-editing {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
      }
  `]
})


export class BatchComponent implements OnInit {
  id: any
  token: string
  someError: boolean = false
  added: boolean = false
  errorText: string = ""
  addedText: string = ""
  new_batch: string
  new_comment: string

  products1: Product[];

  products2: Product[];

  clonedProducts: { [s: string]: Product; } = {};

  constructor(public api: ProductionapiService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem("token") || ""
    let result = await this.api.GetBatchesByLot({
      token: this.token,
      lot_id: Number(this.id)
    })
    console.log(result)
    if (result.result == "ok") {
      this.products2 = result.data
      this.someError = false
    } else {
      this.someError = true
      this.errorText = result.error
    }
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.batch_id] = { ...product };
  }

  async onRowEditSave(product: Product) {
    let result = await this.api.UpdateBatch({
      token: this.token,
      batch_id: product.batch_id,
      name: product.batch_name,
      comment: product.comment
    })

    await this.checkResult(result)

  }

  onRowEditCancel(product: Product, index: number) {
    this.products2[index] = this.clonedProducts[product.batch_id];
    delete this.products2[product.batch_id];
  }

  async submitted(){
    let result = await this.api.AddBatch({
      token: this.token,
      name: this.new_batch,
      lot_id: Number(this.id),
      comment: this.new_comment
    })

    await this.checkResult(result)

  }


  async checkResult(result: any){
    if (result.result == "ok"){
      let result = await this.api.GetBatchesByLot({
        token: this.token,
        lot_id: Number(this.id)
      })
      console.log(result)
      if (result.result == "ok") {
        this.products2 = result.data
        this.someError = false
      } else {
        this.someError = true
        this.errorText = result.error
      }
    }else{
      this.errorText = result.error
      this.someError = true
    }
    this.new_batch = ""
    this.new_comment = ""
  }
}
