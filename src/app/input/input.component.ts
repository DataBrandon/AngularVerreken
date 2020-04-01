import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Collection } from '../model/Collection';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { CalcService } from '../services/calc.service';
import { Logic } from '../logic/Logic';



@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  
  deelnemerForm: FormGroup;
  users:User[] = [];
  // new User("andries",4.04),new User("Diederich",6),new User("Job",5.11),new User("tim",7.20),new User("juditch",17.30),new User("brigi",7.10),new User("casper",19.19),new User("piet",29.04),new User("hassan",0.37)
  collect:Collection;

  gotData:Boolean = false;
 
  constructor(private http: HttpClient,private calcserv:CalcService) { }

  ngOnInit(): void {
    this.deelnemerForm = new FormGroup({
      'name':new FormControl(null,[Validators.required,this.validName.bind(this)]),
      'amount': new FormControl(null, [Validators.required, this.validAmount.bind(this)])
    });
  }
  onSubmit() {
    const name: string = this.deelnemerForm.value['name'];
    const amount: number = parseFloat(this.deelnemerForm.value['amount']);
    const user:User = new User(name,amount);
    var usermade = false;
    var index =-1;
    this.users.forEach(function (value,i){
      if(value.name == name){
        usermade = true;
        index = i;
      }
    });
    if(usermade){
      this.users[index].amount = this.users[index].amount + amount;
    }
    else{
      this.users.push(user);  
    }
    //console.log(this.users);
    
  }


  onClearUsers() {
    window.location.reload();
  }

  validName(control: FormControl): {[s: string]: boolean} {
    const username = control.value;
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
    const test = regexp.test(username);
    if (regexp.test(username) !== true) {
      return {username: false};
    } else {
      return null;
    }
  }


  validAmount(control: FormControl): {[s: string]: boolean} {
    const password = control.value;
    const regexp = new RegExp('^[0-9]+(\.[0-9]{1,2})?$');
    const test = regexp.test(password);
    if (regexp.test(password) !== true) {
      return {password: false};
    } else {
      return null;
    }
  }

  
  public onCalculate(){
    this.collect = new Logic().calculate(this.users);
    this.gotData = true;

  }
  public sendToServer(){
    const id = this.getRandomInt(99999);
    //this.calcserv.addCol(this.collect);
  }

  public getRandomInt(max):number {
    return Math.floor(Math.random() * Math.floor(max));
  }













}
