import { Component, OnInit } from '@angular/core';
import {ICheckpoint} from '../../models/checkpoint.model'
import {IGPComponent} from '../../models/component.model'
import { ProductionapiService } from 'src/app/services/productionapi.service';

@Component({
  selector: 'app-gp',
  templateUrl: './gp.component.html',
  styleUrls: ['./gp.component.css'],
  
})
export class GpComponent implements OnInit {

  lines: ICheckpoint[]
  line: ICheckpoint

  components: IGPComponent[] = []
  component: IGPComponent = {}

  token: string
  
  constructor(public api: ProductionapiService) { }

  async ngOnInit(): Promise<void> {
    this.token = localStorage.getItem("token") || ""
    // this.checkpoints = await this.api.getCheckPoints({token: this.token});
    // this.components = await this.api.getGPComponents({token: this.token})
  }

}
