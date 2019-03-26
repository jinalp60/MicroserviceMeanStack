import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  callAPI(){
    this.http.get("/api/firstms/ms1listUsers").subscribe(data=>{
      console.log("data:",data);
    },err=>{
      console.log("error fetching data");
    });
  }
}
