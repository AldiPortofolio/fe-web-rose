import { Component, OnInit } from '@angular/core';
import { ImageManagement } from './image-management.model'
import { ImageManagementService } from './image-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ImageManagementModalComponent } from './image-management.modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-image-management',
  templateUrl: './image-management.component.html',
  styleUrls: ['./image-management.component.css']
})
export class ImageManagementComponent implements OnInit {

  searchTerm = {
    id: 0,
    name: '',
    url: '',
    notes: '',
    images: '',
    page: 1,
    limit: 10,
  }

  imageManagementList: ImageManagement[];
  imageManagement: ImageManagement;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  constructor(
    private ImageManagementService: ImageManagementService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
    this.loadAll(this.currPage);
  }

  loadAll(page) {
    this.ngxService.start(); // start loader
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecord

    this.ImageManagementService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<ImageManagement[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  resetFilter() {
    this.searchTerm = {
      id: 0,
      name: '',
      url: '',
      notes: '',
      images: '',
      page: 1,
      limit: 10,
    };
    this.loadAll(1);
  }


  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.imageManagementList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  // downloadFile(filePath) {

  //   fetch(filePath)
  //     .then(res => res.blob()) // Gets the response and returns it as a blob
  //     .then(blob => {
  //       let url2 = window.URL.createObjectURL(blob)
  //       let a = document.createElement('a');
  //       a.href = url2;
  //       a.download = filePath.slice(30,100) + '.jpeg'
  //       a.click();
  //     });
  // }

  open(status, message) {
    const modalRef = this.modalService.open(ImageManagementModalComponent, { size: 'lg' });
    modalRef.componentInstance.statusRec = status;
    modalRef.componentInstance.objEdit = message;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      this.currPage = 1;
      this.loadAll(this.currPage);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.currPage = 1;
      this.loadAll(this.currPage);
    });
  }

  private getDismissReason(reason: any): string {
    console.log(reason);
    return reason;
  }

  loadPage() {
    this.loadAll(this.currPage);
  }

}
