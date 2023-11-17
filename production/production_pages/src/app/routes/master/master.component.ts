import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ProductionService } from '../../services/production.service'

@Component({
  selector: 'app-packing',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  
  time = new Date();
  intervalId: any;
  accAss: String = ""

  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  notVerifiedComponents: any = [];
  verifiedComponents: any = [];
  masterToken: any = "";
  isCreated:any = false;
  menuOpened:boolean = false;
  lineMenu:boolean = false;
  linesInfo:any = [];
  line: any = {};
  masterName:any = "";

  constructor(public api: ProductionService, public renderer: Renderer2) { }

  ngAfterViewInit() {
    if (localStorage.getItem("master_token") != null) {
      this.isLoggedIn = true;
      this.masterToken = localStorage.getItem("master_token");
      this.masterName = localStorage.getItem("master_name");
    }
  }

  async ngOnInit(): Promise<void> {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    
    this.linesInfo = await this.api.getAllLines();

    setInterval(() => {
      if (localStorage.getItem("master_token") != null) {
        this.getNotVerifiedComponents();
        this.getVerifiedComponents();
        this.getMasterLine();
      }
    }, 1000)
  }

  async getMasterLine() {
    this.line = await this.api.getMasterLine(this.masterToken);
  }

  async getNotVerifiedComponents() {
    this.notVerifiedComponents = await this.api.getNotVerifiedComponentsMaster(this.masterToken);
  }

  async getVerifiedComponents() {
    this.verifiedComponents = await this.api.getVerifiedComponentsMaster(this.masterToken);
  }

  async acceptRequest(requestId: number) {
    await this.api.verifyRequestMaster(this.accAss, requestId)
    this.isCreated = true;

    setTimeout(() => {
      this.isCreated = false;
    }, 2000);
  }

  async cancelRequest(requestId: number) {
    await this.api.cancelRequestMaster(this.accAss, requestId);
  }
  
  async submit() {
    let data = {
      email: this.email,
      password: this.password
    }

    let result = await this.api.LogistLogin(data);

    if (result != null) {

      if (result.role == 'MASTER') {
        localStorage.setItem("master_token", result.access_token);
        localStorage.setItem("master_name", result.firstName + " " + result.lastName);
        window.location.reload();
      }
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
  
  toggleMenu() {
    if (this.menuOpened == true) {
      this.menuOpened = false;
    } else {
      this.menuOpened = true;
    }
  }

  toggleLineMenu() {
    if (this.lineMenu == true) {
      this.lineMenu = false;
    } else {
      this.lineMenu = true;
    }
  }


  closeMenu() {
    if (this.menuOpened == true) {
      this.menuOpened = false;
    }
    
    if (this.lineMenu == true) {
      this.lineMenu = false;
    }
  }

  async setLine(line:any) {
    this.line = line;
    
    await this.api.setMasterLine(localStorage.getItem("master_token"),  line.id);
  }
}
