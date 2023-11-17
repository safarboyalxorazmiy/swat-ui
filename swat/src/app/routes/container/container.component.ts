import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductionapiService } from 'src/app/services/productionapi.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  batch_id: any
  lot_id: any
  token: string
  someError: boolean = false
  added: boolean = false
  errorText: string = ""
  addedText: string = ""

  containers: any

  new_container: any
  new_comment: any

  clonedProducts: { [s: string]: any; } = {};

  constructor(public api: ProductionapiService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.batch_id = this.route.snapshot.paramMap.get('batch_id');
    this.lot_id = this.route.snapshot.paramMap.get('lot_id');
    this.token = localStorage.getItem("token") || ""
    let result = await this.api.GetContainerByBatch({
      token: this.token,
      batch_id: Number(this.batch_id)
    })
    if (result.result == "ok"){
      this.someError = false
      this.containers = result.data
    }else{
      this.someError = true
      this.errorText = result.error
    }
  }

  onRowEditInit(product: any) {
    this.clonedProducts[product.batch_id] = { ...product };
  }

  async onRowEditSave(product: any) {
    console.log(product)

    let result = await this.api.UpdateContainer({
      token: this.token,
      container_id: product.container_id,
      name: product.container_name,
      comment: product.comment
    })

    this.getContainer(result)

  }

  onRowEditCancel(product: any, index: number) {
    this.containers[index] = this.clonedProducts[product.batch_id];
    delete this.containers[product.batch_id];
  }

  async submitted(){
    let result = await this.api.AddContainer({
      token: this.token,
      lot_id: Number(this.lot_id),
      batch_id: Number(this.batch_id),
      name: this.new_container,
      comment: this.new_comment
    })
    this.getContainer(result)
    this.new_container = ""
    this.new_comment = ""
  }

  async getContainer(result: any){
    if (result.result == "ok"){
      this.someError = false
      let result = await this.api.GetContainerByBatch({
        token: this.token,
        batch_id: Number(this.batch_id)
      })
      if (result.result == "ok"){
        this.someError = false
        this.containers = result.data
      }else{
        this.someError = true
        this.errorText = result.error
      }
    }else{
      this.someError = true
      this.errorText = result.error
    }
    
  }


}
