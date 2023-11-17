import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComponent } from 'src/app/models/component.model';
import { ProductionapiService } from 'src/app/services/productionapi.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any
  components: IComponent[];
  token: string

  constructor(private route: ActivatedRoute, public api: ProductionapiService) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem("token") || ""
    console.log(Number(this.id), " TOKEN: ", this.token)
    this.components = await this.api.getSectorBalance({
      line: Number(this.id),
      token: this.token
    })

    console.log(this.components)
  }

  onRowEditInit(product: IComponent) {

}

  async onRowEditSave(product: IComponent) {

    console.log(this.id, 
      product)

  let result = await this.api.SectorBalanceUpdate({
    token: this.token,
    line: Number(this.id),
    component_id: Number(product.component_id),
    quantity: Number(product.quantity)
  })

  this.components = await this.api.getSectorBalance({
    line: Number(this.id),
    token: this.token
  })

  console.log(result)
  

    
}

onRowEditCancel(product: Component) {
   
}
}
