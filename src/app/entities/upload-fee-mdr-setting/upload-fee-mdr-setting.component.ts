import { Component, OnInit } from '@angular/core';
import { UploadFeeMdrSetting } from './upload-fee-mdr-setting.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UploadFeeMdrSettingService } from './upload-fee-mdr-setting.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-upload-fee-mdr-setting',
  templateUrl: './upload-fee-mdr-setting.component.html',
  styleUrls: ['./upload-fee-mdr-setting.component.css']
})
export class UploadFeeMdrSettingComponent implements OnInit {


    uploadList: UploadFeeMdrSetting[];
    uploadRes: UploadFeeMdrSetting;

    curPage = 1;
    totalData = 0;
    totalRecord = 10;
    dateStartMdl: NgbDateStruct;
    dateEndMdl: NgbDateStruct;
    searchTerm = {
        startDate: '',
        endDate: '',
    };

    fileToUpload: File = null;

    uploadForm: FormGroup;

    dateFStartCtrl: FormControl;
    dateTStartCtrl: FormControl;


    constructor(
        private ngxService: NgxUiLoaderService,
        private uploadService: UploadFeeMdrSettingService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
            file: ['']
        });

        this.loadAll(this.curPage);
    }

    loadAll(page) {
        // this.ngxService.start();
        console.log('Start load all with filter', this.searchTerm);

        this.uploadService.filter({
            startDate: this.searchTerm.startDate,
            endDate: this.searchTerm.endDate,
            page: page,
            limit: this.totalRecord,
        })
            .subscribe(
                (res: HttpResponse<UploadFeeMdrSetting[]>) => this.onSuccessGetData(res.body),
                (res: HttpErrorResponse) => this.onError(res.message),
                () => { console.log('finally'); }
            );
    }

    onRefresh() {
        // this.dateStartMdl == <any>null
        // this.dateEndMdl == <any>null
        this.searchTerm.startDate = ''
        this.searchTerm.endDate = ''

        this.loadAll(this.curPage);
    }

    onFilter() {

        this.loadAll(this.curPage);

    }

    handleFileInput(files: FileList) {
        // this.fileToUpload = files.item(0);
        this.uploadForm.get('file').setValue(files.item(0));
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

        this.uploadService.uploadFile(formData)
            .subscribe(
                (res: HttpResponse<UploadFeeMdrSetting>) => this.onSuccess(res),
                (res: HttpErrorResponse) => this.onError(res.message),
            )
    }

    private onSuccessGetData(data) {
        this.uploadList = data.contents;
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

        this.uploadService.downloadFile({
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

    downloadResultFile(filePath) {
        console.log('File Path:', filePath);

        this.uploadService.downloadResultFile({
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

    downloadTemplate(filePath) {
        console.log('File Path:', filePath);

        this.uploadService.downloadTemplateFile({
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
}
