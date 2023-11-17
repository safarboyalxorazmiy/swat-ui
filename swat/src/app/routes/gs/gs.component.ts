import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IModels } from 'src/app/models/ref.model';
import { ProductionapiService } from 'src/app/services/productionapi.service';
import { Keys } from 'src/app/models/types.model';

@Component({
  selector: 'app-gs',
  templateUrl: './gs.component.html',
  styleUrls: ['./gs.component.css']
})
export class GsComponent implements OnInit {

  keys: Keys[]
  result: any

  fileName = ''
  outcomeData: any
  outcomeStatus: boolean
  outcomeError:boolean = false
  OutcomeSubmit: boolean = false

  token = {
    token: ""
  }

  models: IModels[]
  model: IModels

  constructor(private http: HttpClient, public api: ProductionapiService) { }

  async ngOnInit(): Promise<void> {
    this.token.token = localStorage.getItem("token") || ""
    this.models = await this.api.getModels(this.token)
    this.keys = await this.api.getKeys(this.token)
    console.log("keys: ", this.keys)

  }

  async onFileSelected(event:any) {

    const file:File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
  };

    if (file) {
        this.fileName = file.name;

        const formData = new FormData();

        formData.append("gscode", file);


        // const formData2 = new ForxmData();
        let data = {
          model: this.model,
          token: this.token.token
        }
        const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json'
    });
    formData.append("data", blob);


        const upload$ = await this.http.post("http://192.168.5.250:7777/ware/gscode/file", formData);

        upload$.subscribe((body) => {
          console.log(body)
          this.result = body
          this.outcomeData = body
          this.outcomeStatus = true
          if (this.result.result == "ok") {
            this.result.text = "Kiritldi"
          }
        })

    }



   

    // window.location.reload()
  }

  getModifiedLabel(model: any): string {
    return model.comment + ' ' + model.name;
  }

}
