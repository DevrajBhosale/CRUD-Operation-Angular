import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { empDetail } from './Models/empdetail';
import { ApiConnectionsService } from './Services/api-connections.service';
import { NgForm } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud_operations_angular';

  @ViewChild('closeoffcanvas', { static: false }) closeoffcanvas!: ElementRef;

  constructor(
    private api: ApiConnectionsService, private renderer: Renderer2, private el: ElementRef
  ) { }

  data = new empDetail();
  spinStart: boolean = false;
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  mobPattern = /^[6-9]\d{9}$/;

  arrayOfObject: any = [];

  ngOnInit() {
    this.getAllEmployeeDetails();
  }

  getAllEmployeeDetails() {
    this.isSpinning1 = true;
    this.api.getAllEmpDetails().subscribe(data => {
      this.arrayOfObject = data;
      this.isSpinning1 = false;
    }, err => {
      this.isSpinning1 = false;
    });
  }

  drawerTitle = '';
  actionButton = '';
  add(): void {
    this.drawerTitle = "Add New Employee";
    this.actionButton = "Save"
    this.data = new empDetail();
  }

  edit(data: empDetail): void {    
    this.drawerTitle = "Update Employee";
    this.actionButton = "Update"
    this.data = Object.assign({}, data);
  }

  senddatatomodal:any;
  delete(data: empDetail): void {
    this.senddatatomodal = new empDetail();
    this.senddatatomodal = Object.assign({}, data);
  }

  omit(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  alphaOnly(event: any) {
    event = event ? event : window.event;
    var charCode = event.which ? event.which : event.keyCode;
    if (
      charCode > 32 &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)
    ) {
      return false;
    }
    return true;
  }

  DrawerClose() {

  }

  isOk = true;
  isSpinning = false;
  isSpinning1 = false;
  saveButton(addNew: boolean, EmpPage: NgForm,ifchecked:boolean= false) {
    this.isOk = true;
    if (
      this.data.NAME == '' &&
      this.data.EMAIL_ID == '' &&
      this.data.MOBILE_NUMBER == '' &&
      this.data.ADDRESS == '' &&
      this.data.DEPARTMENT == ''
    ) {
      this.isOk = false;
      alert('Please fill required fields.');
    }
    else if (this.data.NAME == null || this.data.NAME == '') {
      this.isOk = false
      alert('Please Enter Person Name')
    }
    else if (this.data.EMAIL_ID == null || this.data.EMAIL_ID.trim() == '') {
      this.isOk = false
      alert('Please Enter E-Mail ID')
    } else if (!this.emailPattern.test(this.data.EMAIL_ID)) {
      this.isOk = false
      alert('Please Enter proper E-Mail ID')
    }
    else if (this.data.MOBILE_NUMBER == undefined || this.data.MOBILE_NUMBER.length < 10) {
      this.isOk = false
      alert('Please Enter 10 Digit Contact Number')
    }
    else if (!this.mobPattern.test(this.data.MOBILE_NUMBER.toString())) {
      this.isOk = false
      alert('Please Enter Contact Number Properly')
    }
    else if (this.data.ADDRESS == null || this.data.ADDRESS == '') {
      this.isOk = false
      alert('Please Enter Address')
    }
    else if (this.data.DEPARTMENT == null || this.data.DEPARTMENT == '') {
      this.isOk = false
      alert('Please Enter Department')
    }
    else if (this.data.CITY == null || this.data.CITY == '') {
      this.isOk = false
      alert('Please Enter City')
    }
    else if (this.data.GENDER == null || this.data.GENDER == '') {
      this.isOk = false
      alert('Please Choose Gender')
    }
    else if (this.isOk) {
      this.isSpinning = true;
      if (this.data.ID) {
        this.api.updateEmployee(this.data)
          .subscribe(successCode => {
            alert("Employee Updated Successfully...");
            this.getAllEmployeeDetails();
            this.isSpinning = false;
    
          },(error)=>{
            alert("Employee Updation Failed...");
            this.isSpinning = false;
          });
      }
      else {
        this.api.createEmployee(this.data)
          .subscribe(successCode => {
            alert("Employee Created Successfully...");
            this.data = new empDetail();
            this.getAllEmployeeDetails();
            this.isSpinning = false;
          },
          (error)=>{
          alert("Employee Creation Failed...");
          this.isSpinning = false;
        });
      }
    }
  }


  closeButton() {
    this.data = new empDetail();
  }

  confirmDelete() { 
    this.api.deleteEmployee(this.senddatatomodal)
    .subscribe(successCode => {
      alert("Employee deleted Successfully...");
      this.getAllEmployeeDetails();
      this.isSpinning1 = false;
    },
    (error)=>{
    alert("Failed to delete Employee.");
    this.isSpinning1 = false;
  });
  }


}
