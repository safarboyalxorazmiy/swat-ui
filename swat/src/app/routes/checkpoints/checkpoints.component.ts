import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ICheckpoint } from 'src/app/models/checkpoint.model';
import { ProductionapiService } from 'src/app/services/productionapi.service';

@Component({
  selector: 'app-checkpoints',
  templateUrl: './checkpoints.component.html',
  styleUrls: ['./checkpoints.component.css']
})
export class CheckpointsComponent implements OnInit {

  checkpoints: ICheckpoint[];
  checkpoint: ICheckpoint;
  
  selectedCheckpoint: ICheckpoint

  submitted: boolean;
  productDialog: boolean;

  statuses: any;
  loading: boolean = true;
  token = {
    token: ""
  }

  constructor(public api: ProductionapiService, private confirmationService: ConfirmationService) { }

  async ngOnInit(): Promise<void> {
    this.token.token = localStorage.getItem("token") || ""
    this.checkpoints = await this.api.getCheckPoints(this.token);
    console.log('checkpoints: ', this.checkpoints)

    this.loading = false;
    
  }

  openNew() {
    this.checkpoint = {};
    this.submitted = false;
    this.productDialog = true;
}


editProduct(checkpoint: ICheckpoint) {
    console.log(checkpoint)
    this.checkpoint = {...checkpoint};
    this.productDialog = true;
    // this.selectedCheckpoint.id = checkpoint.id
    // this.selectedCheckpoint.name = checkpoint.name
    

}

async deleteProduct(checkpoint: ICheckpoint) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + checkpoint.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
            console.log(checkpoint)
            let data = {
                checkpoint_id: checkpoint.id,
                token: this.token.token
            }
            let result = await this.api.deleteCheckpoint(data)
            // if (result.result == 'error'){
            //     alert('ERROR')
            // }
            console.log(result)
            if(result.result != 'ok')
            alert('ERROR')
            // location.reload();
            this.loading = true
            this.checkpoints = await this.api.getCheckPoints(data);
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

    console.log(this.checkpoint)
    let data = {
        token: this.token.token,
        name: this.checkpoint.name,
        photo: this.checkpoint.photo
    }
    let result =  await this.api.sendCheckpointData(data)
    if (result.result != 'ok')
    alert('ERROR')
    console.log('result', result)
    this.productDialog = false;
    // location.reload();
    this.loading = true
    this.checkpoints = await this.api.getCheckPoints(data);
    this.loading = false

    
}

findIndexById(id: string): string {
    let index = -1;
    for (let i = 0; i < this.checkpoints.length; i++) {
        if (Number(this.checkpoints[i].id) === Number(id)) {
            index = i;
            break;
        }
    }

    return String(index);
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
}
