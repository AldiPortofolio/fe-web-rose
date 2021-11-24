import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { UploadMerchantNonActivated } from './upload-merchant-non-activated.model';
import { UploadMerchantNonActivatedService } from './upload-merchant-non-activated.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'op-upload-merchant-non-activated',
  templateUrl: './upload-merchant-non-activated.component.html',
  styleUrls: ['./upload-merchant-non-activated.component.css']
})
export class UploadMerchantNonActivatedComponent implements OnInit {

  uploadList: UploadMerchantNonActivated[];
  uploadNmidRes: UploadMerchantNonActivated;

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
    private uploadService: UploadMerchantNonActivatedService,
    private formBuilder: FormBuilder) {
    // this.dateFStartCtrl = new FormControl();
    // this.dateTStartCtrl = new FormControl();
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
        (res: HttpResponse<UploadMerchantNonActivated[]>) => this.onSuccessGetData(res.body),
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

    // if (this.dateStartMdl == null && this.dateEndMdl == null) {
    //   this.searchTerm.startDate = ''
    //   this.searchTerm.endDate = ''
    // } else if (this.dateEndMdl == null) {
    //   this.searchTerm.startDate = this.dateStartMdl.year + '-' +
    //     ('0' + this.dateStartMdl.month).slice(-2) + '-' +
    //     ('0' + this.dateStartMdl.day).slice(-2);

    //   if (!this.searchTerm.startDate) {
    //     return;
    //   }
    // } else if (this.dateStartMdl == null) {
    //   this.searchTerm.endDate = this.dateEndMdl.year + '-' +
    //     ('0' + this.dateEndMdl.month).slice(-2) + '-' +
    //     ('0' + this.dateEndMdl.day).slice(-2);

    //   if (!this.searchTerm.endDate) {
    //     return;
    //   }
    // } else {
    //   this.searchTerm.startDate = this.dateStartMdl.year + '-' +
    //     ('0' + this.dateStartMdl.month).slice(-2) + '-' +
    //     ('0' + this.dateStartMdl.day).slice(-2);
    //   this.searchTerm.endDate = this.dateEndMdl.year + '-' +
    //     ('0' + this.dateEndMdl.month).slice(-2) + '-' +
    //     ('0' + this.dateEndMdl.day).slice(-2);

    //   if (!this.searchTerm.startDate || !this.searchTerm.endDate) {
    //     return;
    //   }
    // }

    this.loadAll(this.curPage);

  }

  // dateFormatter(params: NgbDateStruct): string {
  //   console.log(params);
  //   if (!params) {
  //     this.ngxService.stop();
  //     Swal.fire('Failed', 'silahkan pilih tanggal', 'error');
  //     return;
  //   }
  //   const year = params.year;
  //   const mth = params.month;
  //   const day = params.day;
  //   // return dt.toLocaleString(['id']);
  //   // return year + '-' + mth + '-' + day;
  //   return year + '-' + (mth < 10 ? '0' + mth : mth) + '-' + (day < 10 ? '0' + day : day);
  // }

  uploadNmid(files: FileList) {
    console.log(files);
    let file: File = files.item(0);
    console.log(file.name);
    console.log(file.size);
    console.log(file.type);
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
        (res: HttpResponse<UploadMerchantNonActivated>) => this.onSuccess(res),
        (res: HttpErrorResponse) => this.onError(res.message),
        // result => {
        //     console.log('Result==>' + result);
        //     console.log('Result==>' + result.body);
        //     if (result.body.errCode === '00') {
        //         console.log('Toast success');
        //         Swal.fire('Success', 'Success upload file NMID, data ==> on proggress', 'success');
        //     } else {
        //         Swal.fire('Failed', result.body.errDesc, 'error');
        //         // console.log('Toast err', result.body.errDesc);
        //     }
        // }
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
