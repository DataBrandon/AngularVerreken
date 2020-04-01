import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { CalcService } from '../services/calc.service';




@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logForm: FormGroup;
  constructor(private http: HttpClient,private calcserv:CalcService) { }

  ngOnInit(): void {




    this.logForm = new FormGroup({
      'code':new FormControl(null,[Validators.required,this.validName.bind(this)]),
      });
  }
  onSubmit() {
// kwestie van call gaan maken om op basis van ID een collection terug te halen

    // 
  //   const name: string = this.logForm.value['name'];
  //   const amount: number = parseFloat(this.logForm.value['amount']);

  //   const user:User = new User(name,amount);
  //   this.users.push(user);
  //   console.log(this.users);


  //   this.collectionservice


    
    
  }



  validName(control: FormControl): {[s: string]: boolean} {
    const username = control.value;
    const regexp = new RegExp('^[0-9]{6,6}$');
    const test = regexp.test(username);
    if (regexp.test(username) !== true) {
      return {username: false};
    } else {
      return null;
    }
  }


  // validAmount(control: FormControl): {[s: string]: boolean} {
  //   const password = control.value;
  //   const regexp = new RegExp('^(0|(([1-9]{1}|[1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{2}){1}(\[0-9]{3}){0,}))[\.](([0-9]{2}))$');
  //   const test = regexp.test(password);
  //   if (regexp.test(password) !== true) {
  //     return {username: false};
  //   } else {
  //     return null;
  //   }
  // }

}

// search(){
//   const obj = JSON.stringify(this.users);
//   this.calcserv.addcalc(JSON.parse(obj)).subscribe(trans => this.transfers.push(trans));
//   console.log("subscribed");
// }
