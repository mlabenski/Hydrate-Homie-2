import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';
import { Order } from '../models/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { File } from '@ionic-native/file/ngx';
import { Blob } from 'blob';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.page.html',
  styleUrls: ['./order-form.page.scss'],
})


export class OrderFormPage implements OnInit {
  roomnumber: string = "";
  email: string = "";
  date: string = "";
  time: string = "";
  currentdorm: string = "";
  currentOrder: any;
  data: String;
  apiURL: string = 'https://localhost:5000/aws/uploadFile';
  jsonBlob: any;


  constructor(public storage: Storage, private http: HttpClient, private file: File) { 
    this.data = '';
  }


  ngOnInit() {
  }
  dorms = [{ "name" : "Northside", "src": "../../assets/photos/dorms/York-College-Northside.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Country Club", "src": "../../assets/photos/dorms/York-College-CountryClub.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Spring Garden", "src": "../../assets/photos/dorms/York-College-SpringGarden.jpg", "doorsidedelivery":"true", "maketransparent": "null"}, 
  { "name" : "Susquehanna", "src": "../../assets/photos/dorms/York-College-Susquehanna.jpg", "doorsidedelivery":"true", "maketransparent": "null"},
  { "name" : "Tyler Run", "src": "../../assets/photos/dorms/York-College-TylerRun.jpg", "doorsidedelivery":"true", "maketransparent": "null"},

];
  public getColor(doorsidedelivery: string): string{
    return doorsidedelivery == "true" ? "green" : "red";
  }
  styleObject(transparent): Object {
    if (transparent == "null") {
      return {}
    }
    if (transparent != "false"){
        return {opacity: 0.3,filter: 'alpha(opacity=50)'};
    }
    return {}
}


  public goToDetails(dorm) {
      for(let key in this.dorms){
        if (dorm.name === this.dorms[key].name) {
          console.log('this one matches ' + dorm.name)
          this.dorms[key].maketransparent = "false";
          console.log(this.dorms[key]);
        }
        else 
          this.dorms[key].maketransparent = "true";
      }
    }
  public currentSelectedDorm(): string {
    for(let key in this.dorms) {
      if(this.dorms[key].maketransparent === "false") {
        this.currentdorm = this.dorms[key].name;
        return this.currentdorm;
      }
    }
  }

    public onSubmit() {
      this.currentOrder= new Order();
      this.currentOrder.dorm = this.currentSelectedDorm();
      this.currentOrder.date = this.date;
      this.currentOrder.time = this.time;
      this.currentOrder.email = this.email;
      this.currentOrder.roomnumber = this.roomnumber;
      this.currentOrder.venmodescription = String(this.currentSelectedDorm() + this.roomnumber+ uuid());
      this.storage.set("orderStored", JSON.stringify(this.currentOrder));
      this.saveText( JSON.stringify(this.currentOrder), "filename.json");
      //this.addOrder(this.currentOrder);
      //now I need to move this all into an "order" object and from there send it thru an api to AWS!
      // this function should also navigate to a confirmation page displaying details and also providing them with a venmo transaction ID 
    }
    get(){
      this.storage.get('orderStored').then(status=>{
        var orderInfo = JSON.parse(status);
        alert("info is-->"+orderInfo.venmodescription)
      });
    
  }

  saveText(text, filename){
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
  }


  public addOrder(orderInfo: Order){
    return this.http.put(`https://hydrate-homie.s3.us-east-2.amazonaws.com/myfile.jpg?Content-Type=jpg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA33U6CM5UQ7BFB3O3%2F20191120%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20191120T034559Z&X-Amz-Expires=60&X-Amz-Signature=3ace6bcae7eb8b034071d41f021244e732691e2de83223ca2c5925438dc4bee7&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=private`, orderInfo);
  }

}
