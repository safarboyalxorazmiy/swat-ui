import { Component, OnInit } from '@angular/core';
import { ProductionapiService } from 'src/app/services/productionapi.service';


interface Months {
  name: String
  code: String
}

interface Plan {
  id: number,
  date: string,
  plan: string,
  bajarildi: string
}

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  month: Months[]
  selectedMonth: Months
  token: String

  plan: Plan[]
  clonedPlan: { [s: string]: Plan; } = {};

  loaded: boolean = false

  someError: boolean = false
  errorText: string = ""
  updated: boolean = false
  updatedText: string = ""

  constructor(public api: ProductionapiService) { }

  ngOnInit(): void {

    this.token = localStorage.getItem("token") || ""

    this.month = [
      {
        name: "Yanvar",
        code: "01"
      },
      {
        name: "Fevral",
        code: "02"
      },
      {
        name: "Mart",
        code: "03"
      },
      {
        name: "Aprel",
        code: "04"
      },
      {
        name: "May",
        code: "05"
      },
      {
        name: "Iyun",
        code: "06"
      },
      {
        name: "Iyul",
        code: "07"
      },
      {
        name: "Avgust",
        code: "08"
      },
      {
        name: "Sentyabr",
        code: "09"
      },
      {
        name: "Oktyabr",
        code: "10"
      },
      {
        name: "Noyabr",
        code: "11"
      },
      {
        name: "Dekabr",
        code: "12"
      }
    ]
  }

  async submit(){

    if (this.selectedMonth == undefined){
      this.errorText = "Oyni tanlang"
      this.someError = true
      return
    }

    let result = await this.api.GetPlanByMonth({
      token: this.token,
      date1: this.selectedMonth.code
    })
    console.log(result)
    if (result.result == 'ok'){
      this.someError = false
      this.plan = result.data
      this.loaded = true
    }else{
      this.someError = true
      this.errorText = result.error
    }

  }

  onRowEditInit(product: Plan) {
    this.clonedPlan[product.id] = {...product};
}

async onRowEditSave(product: Plan, index: number) {
  console.log(product)
  let result = await this.api.PlanUpdate({
    token: this.token,
    id: product.id,
    quantity: product.plan
  })

  if (result.result == "ok"){
    this.updatedText = "Yangilandi"
    this.updated = true
    this.someError = false
    setTimeout(()=>{
      this.updated = false
    }, 3000)
  }else{
    this.errorText = result.error
    this.someError = true
    this.plan[index] = this.clonedPlan[product.id];
    delete this.clonedPlan[product.id];
  }
}

onRowEditCancel(product: Plan, index: number) {
    this.plan[index] = this.clonedPlan[product.id];
    delete this.clonedPlan[product.id];
}

}
