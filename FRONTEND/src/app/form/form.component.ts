import {Component, Injectable, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "./client";
import { ClientService } from './client.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

@Injectable()
export class FormComponent implements OnInit {
  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
  }

  submitted: boolean = false;
  hideForm: boolean = false;
  apiReturned: Observable<any> | undefined;
  loginReturned: Observable<any> | undefined;
  protectedReturned:  Observable<any> | undefined;

  clientForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    sex: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    confirmation: new FormControl('', [Validators.required, this.checkPassword()]),
    login: new FormControl('', [Validators.required]),
  });

  connectionForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.submitted = true;
    if(this.clientForm.valid) {
      this.hideForm = true;
    }

    console.log("API called");
    this.apiReturned = this.register();
  }

  // Custom validator that checks both password and confirmation are the same
  checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.clientForm == null) {
        return null;
      }

      const match: boolean = this.clientForm.controls['password'].value == this.clientForm.controls['confirmation'].value
      return !match ? {nomatch: {value: control.value}} : null; // If fail, return the confirmation that failed
    };
  }

  public register() : Observable<any> {
    let user = this.clientForm.controls['login'].value;
    let password = this.clientForm.controls['password'].value;
    let lastname = this.clientForm.controls['lastName'].value;
    let firstname = this.clientForm.controls['firstName'].value;
    console.log("registering " + user + " " + password + " " + lastname + " " + firstname);
    return this.clientService.newClientApi(new Client(firstname, lastname, user, password));
  }

  onConnect() {
    let user = this.connectionForm.controls['login'].value;
    let password = this.connectionForm.controls['password'].value;

    console.log(this.clientService.logToApi(user, password));
  }

  /*accessProtected() {
    console.log("Accessing protected");
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    this.protectedReturned =  this.httpClient.get<any>("http://localhost/api/authenticated",httpOptions);
  }*/
}
