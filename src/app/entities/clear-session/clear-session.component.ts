import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ClearSessionService } from './clear-session.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ClearSession } from './clear-session.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-clear-session',
  templateUrl: './clear-session.component.html',
  styleUrls: ['./clear-session.component.css']
})
export class ClearSessionComponent implements OnInit {

    clearSession: ClearSession;

    constructor(private ngxService: NgxUiLoaderService,
                private clearSessionService: ClearSessionService) { }

    ngOnInit() {
        this.clearSession = new ClearSession;
        this.loadAll();
    }

    loadAll() {
        this.ngxService.start(); // start loader
        this.clearSessionService.getLastUpdated()
            .subscribe(
                (res: HttpResponse<ClearSession>) => this.onSuccess(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.ngxService.stop();

    }

    onSuccess(clearSession) {
        this.ngxService.stop();
        console.log(clearSession.contents);
        this.clearSession = clearSession.contents;
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..');
    }

    clearSessionApp() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to clear ottomart session?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Clear   !'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.clearSessionService.clear().subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Clear session ottomart success", 'success').then(
                            () => this.loadAll()
                            // () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            // () => this.loadAll()
                        );

                    }
                });
            } else {
                // this.loadAll();
            }
        });
    }


}
