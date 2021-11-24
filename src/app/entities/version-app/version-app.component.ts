import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { VersionAppService } from './version-app.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { VersionApp } from './version-app.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-version-app',
  templateUrl: './version-app.component.html',
  styleUrls: ['./version-app.component.css']
})
export class VersionAppComponent implements OnInit {

    ottomart = "";
    sfa = "";
    nfc = "";
    indomarco = "";

    constructor(private ngxService: NgxUiLoaderService,
                private versionAppService: VersionAppService) { }

    ngOnInit() {
        this.loadAll();
    }

    loadAll(){
        this.ngxService.start(); // start loader
        this.versionAppService.getVersion()
            .subscribe(
                (res: HttpResponse<VersionApp>) => this.onSuccess(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.ngxService.stop();

    }

    updateOttomart() {
        console.log(this.ottomart);
        this.updateVersion('ottomart', this.ottomart)
    }

    updateSFA(){
        console.log(this.sfa);
        this.updateVersion('sfa', this.sfa)
    }

    updateIndomarco() {
        console.log(this.indomarco);
        this.updateVersion('indomarco', this.indomarco)
    }

    updateNFC() {
        console.log(this.nfc);
        this.updateVersion('nfc', this.nfc)
    }

    updateVersion(appName, version) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to update '+ appName +' version to ' + version + '?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Update!'
        }).then((result) => {
            console.log("result ->", result);
            if (result.value) {
                this.ngxService.start();
                this.versionAppService.udpate(appName, version).subscribe((result) => {
                    const code = result.body.errCode.toString()
                    this.ngxService.stop();
                    if (code == '00') {
                        Swal.fire('Success', "Update version success", 'success').then(
                            // () => this.modalService.dismissAll('tutup save')
                        );
                    } else {
                        Swal.fire('Failed', result.body.errDesc, 'error').then(
                            ()=>this.loadAll()
                        );

                    }
                });
            } else {
                this.loadAll();
            }
        });
    }

    onSuccess(versionApp) {
        this.ngxService.stop();
        console.log(versionApp.contents);
        this.sfa = versionApp.contents.sfa;
        this.nfc = versionApp.contents.nfc;
        this.ottomart = versionApp.contents.ottomart;
        this.indomarco = versionApp.contents.indomarco;
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..');
    }

}
