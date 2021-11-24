import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { ImageManagement } from '../image-management/image-management.model';
import { ImageManagementService } from '../image-management/image-management.service';

@Component({
  selector: 'op-banner-image-modal',
  templateUrl: './banner-image.modal.component.html',
  styleUrls: ['./banner-image.modal.component.css']
})
export class BannerImageModalComponent implements OnInit {

  searchTerm = {
    id: 0,
    name: '',
    url: '',
    notes: '',
    images: '',
    page: 1,
    limit: 9,
  }

  imageManagementList: ImageManagement[];
  image: ImageManagement;

  currPage = 1;
  totalRecord = 9;
  totalData = 0;

  isFormDirty: Boolean = false;

  constructor(private modalService: NgbActiveModal,
    // private ngxService: NgxUiLoaderService,
    private imageService:  ImageManagementService
    ) {
  }

  ngOnInit() {
    this.loadAll(this.currPage);
  }

  loadAll(page) {
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecord

    this.imageService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<ImageManagement[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  private onSuccess(data, headers) {
    if (data.contents.length < 0) {
      return;
    }
    this.imageManagementList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    console.log('error..', error);
  }

  clickImage(image): void {
    this.modalService.close(image);
  }

  loadPage() {
    this.loadAll(this.currPage);
  }


}
