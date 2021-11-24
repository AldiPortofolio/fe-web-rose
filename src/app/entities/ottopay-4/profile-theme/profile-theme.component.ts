import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProfileTheme } from './profile-theme.model';
import { ProfileThemeService } from './profile-theme.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProfileThemeModalComponent } from './profile-theme.modal.component';

@Component({
  selector: 'op-profile-theme',
  templateUrl: './profile-theme.component.html',
  styleUrls: ['./profile-theme.component.css']
})
export class ProfileThemeComponent implements OnInit {

  searchTerm = {
    id: 0,
    userCategoryId: 0,
    userCategoryName: '',
    levelMerchantId: 0,
    levelMerchantName: '',
    dashboardTopBackground: '',
    themeColor: '',
    dashboardLogo: '',
    dashboardText: '',
    profileBackgroundImage: '',
    status: '',
    page: 1,
    limit: 10,
  }

  profileThemeList: ProfileTheme[];
  profileTheme: ProfileTheme;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  constructor(
    private ProfileThemeService: ProfileThemeService,
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

    this.ProfileThemeService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<ProfileTheme[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  resetFilter() {
    this.searchTerm = {
      id: 0,
      userCategoryId: 0,
      userCategoryName: '',
      levelMerchantId: 0,
      levelMerchantName: '',
      dashboardTopBackground: '',
      themeColor: '',
      dashboardLogo: '',
      dashboardText: '',
      profileBackgroundImage: '',
      status: '',
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
    this.profileThemeList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(ProfileThemeModalComponent, { size: 'lg' });
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
