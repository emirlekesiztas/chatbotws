import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication-service';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {first,map} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthenticationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
  register() {
    if (this.registerForm.invalid) {
      return alert("Kayıt Formunu Doldurunuz!");
    }

    this.authService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          alert(error);
        });
  }

}
