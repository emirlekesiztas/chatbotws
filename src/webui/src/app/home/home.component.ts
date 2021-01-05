import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myForm!: FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthenticationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }
login(){
  this.authService.login(this.myForm!.get('username')!.value,this.myForm.get('password')!.value).toPromise().then((res:any)=>{
    this.router.navigate(['/main/chat']);
  }).catch(err =>{
    alert(err);
  })
}


}
