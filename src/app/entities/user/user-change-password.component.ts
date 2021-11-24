import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'

@Component({
  selector: 'op-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

    userName = '';
    credential = {
        oldPass: '',
        confirmNewPass: '',
        newPass: ''
    };
    errMsg = '';

    confirmStatus = false;
    route = ''
    user: User;

    inputType = "password";
    inputType1 = "password";
    inputType2 = "password"; 
    showHideIcon = "eye-slash" ; 
    showHideIcon1 = "eye-slash" ; 
    showHideIcon2 = "eye-slash" ; 

    constructor(private userService: UserService,
                private modalService: NgbModal,
                private router: Router,) { }

    ngOnInit() {
        this.route = this.router.url
        console.log(this.route)
        if (this.route == '/main') {
            this.userService.getCurrentUser()
                .subscribe(
                    (res: HttpResponse<User>) => this.userName = res.body.name,
                    (res: HttpErrorResponse) => console.log('error', res.message)
                );
        }

    }

    onKey() {
        console.log(this.credential.confirmNewPass);
        if (this.credential.confirmNewPass !== this.credential.newPass) {
            this.errMsg = 'Password not match';
            this.confirmStatus = false;
        } else if (this.credential.newPass === '') {
            this.errMsg = 'Password cannot be null';
            this.confirmStatus = false;
        } else {
            this.errMsg = '';
            this.confirmStatus = true;

        }
    }

    save(): void {
        console.log('dsadas');

        const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');
        // re.
        if (!re.test(this.credential.confirmNewPass)) {
            console.log('gagal');
            this.errMsg = 'Minimum eight characters, at least one ' +
            'uppercase letter, one lowercase letter, one number and one special character';
        } else {
            console.log('berhasil');
            this.savePassword();
        }

        // this.userService.changePassword(this.userName, this.credential)
        //     .subscribe(
        //         result => {
        //             if (result.body.errCode === '00') {
        //                 Swal.fire('Success', 'Success change password', 'success');
        //                 this.closeForm('tutup save');
        //                 this.modalService.dismissAll('tutup save');
        //             } else {
        //                 Swal.fire('Failed', result.body.errDesc, 'error');
        //             }
        //         });
    }

    update(): void {
        console.log('dsadas');

        const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');
        // re.
        if (!re.test(this.credential.confirmNewPass)) {
            console.log('gagal');
            this.errMsg = 'Minimum eight characters, at least one ' +
                'uppercase letter, one lowercase letter, one number and one special character';
        } else {
            console.log('berhasil');
            this.updatePassword();
        }

    }

    savePassword(): void {
        this.userService.changePassword(this.userName, this.credential)
                    .subscribe(
                        result => {
                            if (result.body.errCode === '00') {
                                Swal.fire('Success', 'Success change password', 'success');
                                this.closeForm('tutup save');
                                this.modalService.dismissAll('tutup save');
                            } else {
                                Swal.fire('Failed', result.body.errDesc, 'error');
                            }
                        });
    }

    updatePassword(): void {
        this.userService.updatePassword(this.userName, this.credential)
            .subscribe(
                result => {
                    if (result.body.errCode === '00') {
                        Swal.fire('Success', 'Success change password', 'success');
                        this.closeForm('tutup save');
                        this.modalService.dismissAll('tutup save');
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error');
                    }
                });
    }

    closeForm(reason): void {
        this.modalService.dismissAll(reason);
    }

    showPassword() {
        if(this.credential.oldPass !== ""){
				if(this.inputType !="password"){
					this.inputType = "password";
					this.showHideIcon = "eye-slash";
				}else{
					this.inputType = "text";
					this.showHideIcon = "eye";
				}
			}
    }

    showPassword1() {
        if(this.credential.newPass !== ""){
				if(this.inputType1 !="password"){
					this.inputType1 = "password";
					this.showHideIcon1 = "eye-slash";
				}else{
					this.inputType1 = "text";
					this.showHideIcon1 = "eye";
				}
			}
    }

    showPassword2() {
        if(this.credential.confirmNewPass !== ""){
				if(this.inputType2 !="password"){
					this.inputType2 = "password";
					this.showHideIcon2 = "eye-slash";
				}else{
					this.inputType2 = "text";
					this.showHideIcon2 = "eye";
				}
			}
    }
    

}

