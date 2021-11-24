import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserChangePasswordComponent } from 'src/app/entities/user/user-change-password.component';
// declare var grecaptcha: any;

@Component({
  selector: 'op-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showAlert = false;
  msgAlert = '';
  captchaError = false;

  credential = {
    username: '',
    password: ''
  };

  inputType = "password"; 
  showHideIcon = "eye-slash"; 

  constructor(private router: Router,
              private localStorage: LocalStorageService,
              private loginService: LoginService,
              private modalService: NgbModal
     ) { }

  ngOnInit() {
    if (this.localStorage.retrieve('token')) {
      this.router.navigate(['main']);
    }
  }

  closeAlert() {
    console.log('close alert');
  }

  login() {
    this.connectToServer();
    // const cb = callback || function() {};
    // const data = {
    //   username: credentials.username,
    //   password: credentials.password
    // };

    // const response = grecaptcha.getResponse();
    // if (response.length === 0) {
    //   // this.captchaError = true;
    //   // this.showAlert = true;
    //   // this.msgAlert = 'Recaptcha not verified ! ';
    //   Swal.fire('Failed', 'Recaptcha not verified ! ', 'error');
    //   return;
    // }
    // this.loginService.verifyCaptcha(response).subscribe(
    //   data => {
    //     if (data.status = 200 ) {
    //       this.connectToServer();
    //     } else {
    //       Swal.fire('Failed', 'Recaptcha not verified ! ', 'error');
    //     }
    //   }
    // );
  }

  showPassword() {
      if(this.credential.password !== ""){
      if(this.inputType !="password"){
        this.inputType = "password";
        this.showHideIcon = "eye-slash";
      }else{
        this.inputType = "text";
        this.showHideIcon = "eye";
      }
    }
  }

  connectToServer() {
    return new Promise((resolve, reject) => {
      this.loginService.login(this.credential).subscribe((data) => {
          console.log('hasil login isi resolve data ', data);
          resolve(data);
          if (data !== '') {
            // grecaptcha.reset();
            this.router.navigate(['main']);
            return null;
          } else {
            console.log('isi data --> ', data);
            this.showAlert = true;
            const err_login = this.localStorage.retrieve('err_login');
            this.msgAlert = 'Invalid login !';
            if (err_login === "password expired") {
              Swal.fire('Failed', err_login + ", please change password", 'error').then (() => {
                this.modalService.open(UserChangePasswordComponent, { size: 'lg' });
              });
            } else {
              Swal.fire('Failed', err_login, 'error')
            }
            console.log('err login-->',err_login)
            // grecaptcha.reset();
            // console.log('user not valid');
          }
          // return cb();
      }, (err) => {
        this.showAlert = true;
        this.msgAlert = 'Failed to connect to server ! ';
          console.log('hasil login gagal ');
          // grecaptcha.reset();
          Swal.fire('Failed', this.msgAlert, 'error');
          // this.logout();
          // reject();
          // return cb(err);
      });
  });

    // this.localStorage.store('token', '123');
    // this.router.navigate(['main']);
  }

}

