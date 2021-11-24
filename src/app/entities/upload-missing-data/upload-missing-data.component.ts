import { Component, OnInit } from '@angular/core';
import { UploadMissingData } from './upload-missing-data.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UploadMerchantBankLoanService } from '../upload-merchant-bank-loan/upload-merchant-bank-loan.service';
import { UploadMissingDataService } from './upload-missing-data.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-upload-missing-data',
  templateUrl: './upload-missing-data.component.html',
  styleUrls: ['./upload-missing-data.component.css']
})
export class UploadMissingDataComponent implements OnInit {

    reportList: UploadMissingData[];
    curPage = 1;
    totalData = 0;
    totalRecord = 10;
    searchTerm = {
        page: 1,
        limit: 10,
    }

    fileToUpload: File = null;

    uploadForm: FormGroup;
    uploadNmidRes: UploadMissingData;

    constructor(
        private ngxService: NgxUiLoaderService,
        private uploadMissingDataService: UploadMissingDataService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            file: ['']
        });

        this.loadAll(this.curPage);
    }

    loadAll(page) {
        this.ngxService.start();
        console.log('Start load all with filter', this.searchTerm);
        this.searchTerm.page = page
        this.searchTerm.limit = this.totalRecord

        this.uploadMissingDataService.filter({
            filter: this.searchTerm,
        })
            .subscribe(
                (res: HttpResponse<UploadMissingData[]>) => this.onSuccessGetData(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    private onSuccessGetData(data) {
        this.reportList = data.contents;
        this.totalData = data.totalData;
        this.ngxService.stop();
    }

    private onError(error) {
        this.ngxService.stop();
        console.log('error..', error);
    }

    loadPage(event) {
        this.loadAll(this.curPage);
        console.log(this.curPage);
    }

    downloadFile(filePath) {
        console.log('File Path:', filePath);

        this.uploadMissingDataService.downloadFile({
            filePath: filePath
        }).then(
            (resp) => {
                console.log('res-->', resp);

                const url = window.URL.createObjectURL(resp.body);
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.setAttribute('style', 'display: none');
                link.href = url;
                link.download = filePath;
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            },
            (err) => {

                // console.log("TEST: ", err)
                if (err.status == 500) {
                    Swal.fire('Error', 'File not found!', 'error');
                }
            }
        );
    }

    submitUpload() {
        if (!this.uploadForm.get('file').value || this.uploadForm.get('file').value == '') {
            Swal.fire('Failed', 'Silahkan masukan file terlebih dahulu', 'error');

        }
        this.ngxService.start();
        const formData = new FormData();
        formData.append('file', this.uploadForm.get('file').value);
        console.log('formData', formData)
        console.log('formData', this.uploadForm.get('file').value)

        this.uploadMissingDataService.uploadFile(formData)
            .subscribe(
                (res: HttpResponse<UploadMissingData>) => this.onSuccess(res),
                (res: HttpErrorResponse) => this.onError(res.message),
            )
    }

    handleFileInput(files: FileList) {
        // this.fileToUpload = files.item(0);
        this.uploadForm.get('file').setValue(files.item(0));
    }

    onRefresh() {

        this.loadAll(this.curPage);
    }

    private onSuccess(data) {
        console.log(data);
        this.ngxService.stop();
        if (data.errCode == '00') {
            console.log('success')
            Swal.fire('Success', 'Success upload File', 'success');
        } else {
            Swal.fire('Failed', data.errDesc, 'error');
            console.log('gagal', data.errCode)
        }

    }

    downloadResultFile(filePath) {
        console.log('File Path:', filePath);

        this.uploadMissingDataService.downloadResultFile({
            filePath: filePath
        }).then(
            (resp) => {
                console.log('res-->', resp);

                const url = window.URL.createObjectURL(resp.body);
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.setAttribute('style', 'display: none');
                link.href = url;
                link.download = filePath;
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            },
            (err) => {

                // console.log("TEST: ", err)
                if (err.status == 500) {
                    Swal.fire('Error', 'File not found!', 'error');
                }
            }
        );
    }

    downloadExample() {

        this.uploadMissingDataService.downloadExample().then(
            (resp) => {
                console.log('res-->', resp);

                const url = window.URL.createObjectURL(resp.body);
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.setAttribute('style', 'display: none');
                link.href = url;
                link.download = 'example.xlsx';
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            },
            (err) => {

                // console.log("TEST: ", err)
                if (err.status == 500) {
                    Swal.fire('Error', 'File not found!', 'error');
                }
            }
        );
    }

}
