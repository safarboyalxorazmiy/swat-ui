import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-composite',
  templateUrl: './composite.component.html',
  styleUrls: [
    './css/tailwind.output.css', 
    './css/chart.min.css',
    './css/composite.component.css'
  ]
})

export class CompositeComponent implements OnInit {
  intervalId: any;
  openedId: any;
  composites: any;

  constructor(public api: ProductionService, private titleService: Title) { }

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('Detallar');
    document.getElementById('serialInput')?.focus();

    /*this.intervalId = setInterval(() => {
      this.getWarehouseInfo();

      console.log(this.warehouseInfo)
    }, 1000);*/

    this.openedId = 0;

    this.composites = await this.api.getComposites();
    console.log(this.composites)
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

}