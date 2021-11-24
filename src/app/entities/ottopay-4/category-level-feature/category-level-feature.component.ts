import { Component, OnInit } from '@angular/core';
import { CategoryLevelFeature } from './category-level-feature.model';
import { CategoryLevelFeatureService } from './category-level-feature.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryLevelFeatureModalComponent } from './category-level-feature.modal.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UserCategoryService } from '../user-category/user-category.service';
import { UserCategory } from '../user-category/user-category.model';
import { FeatureService } from '../feature/feature.service';
import { LevelMerchantService } from '../../level-merchant/level-merchant.service';
import { Feature } from '../feature/feature.model';
import { LevelMerchant } from '../../level-merchant/level-merchant.model';

@Component({
  selector: 'op-category-level-feature',
  templateUrl: './category-level-feature.component.html',
  styleUrls: ['./category-level-feature.component.css']
})
export class CategoryLevelFeatureComponent implements OnInit {

  searchTerm = {
    id: 0,
    userCategoryId: 0,
    userCategoryName: '',
    levelMerchantId: 0,
    levelMerchantName: '',
    fiturProductId: 0,
    fiturProductName: '',
    status: '',
    page: 1,
    limit: 10,
  }

  searchTermUC = {
    id: 0,
    code: '',
    name: '',
    notes: '',
    seq: 0,
    page: 1,
    limit: 100,
  }

  searchTermF = {
    id: 0,
    productId: 0,
    productName: '',
    code: '',
    name: '',
    icon: '',
    notes: '',
    seq: 0,
    page: 1,
    limit: 100,
  }

  categoryLevelFeatureList: CategoryLevelFeature[];
  categoryLevelFeature: CategoryLevelFeature;
  listUserCategory: UserCategory[] = [];
  listLevelMerchant: LevelMerchant[] = [];
  listFeatureProduct: Feature[] = [];

  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  constructor(
    private categoryLevelFeatureService: CategoryLevelFeatureService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private userCategoryService: UserCategoryService,
    private featureProductService: FeatureService,
    private levelMerchantService: LevelMerchantService
    ) {
  }

  ngOnInit() {
    this.loadAll(this.currPage);
    this.loadListUserCategory()
    this.loadListLevelMerchant()
    this.loadListFeatureProduct()
  }

  private loadListUserCategory() {
    this.userCategoryService.filter({
      filter: this.searchTermUC,
    })
      .subscribe(
        (res: HttpResponse<UserCategory[]>) => this.onSuccessList(res.body, res.headers, 0),
        (res: HttpErrorResponse) => this.onErrorList(res.message, 'Get List User Category')
      );
  }

  private loadListLevelMerchant() {
    this.levelMerchantService.getAllLevelMerchant(100)
      .subscribe(
        (res: HttpResponse<LevelMerchant[]>) => this.onSuccessList(res.body, res.headers, 1),
        (res: HttpErrorResponse) => this.onErrorList(res.message, 'Get List Level Merchant')
      );
  }

  private loadListFeatureProduct() {
    this.featureProductService.filter({
      filter: this.searchTermF,
    })
      .subscribe(
        (res: HttpResponse<Feature[]>) => this.onSuccessList(res.body, res.headers, 2),
        (res: HttpErrorResponse) => this.onErrorList(res.message, 'Get List Feature Product')
      );
  }

  private onSuccessList(data, headers, code) {
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);

    if (code == 0) {
      this.listUserCategory = data.contents;
    } else if (code == 1) {
      this.listLevelMerchant = data.contents;
    } else {
      this.listFeatureProduct = data.contents;
    }
  }

  private onErrorList(error, listName) {
    this.ngxService.stop();
    console.log('error..', error, listName);
  }

  loadAll(page) {
    this.ngxService.start(); // start loader
    this.searchTerm.page = page;
    this.searchTerm.limit = this.totalRecord;
    this.searchTerm.userCategoryId = +this.searchTerm.userCategoryId;
    this.searchTerm.levelMerchantId = +this.searchTerm.levelMerchantId;
    this.searchTerm.fiturProductId = +this.searchTerm.fiturProductId;

    this.categoryLevelFeatureService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<CategoryLevelFeature[]>) => this.onSuccess(res.body, res.headers),
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
      fiturProductId: 0,
      fiturProductName: '',
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
    this.categoryLevelFeatureList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(CategoryLevelFeatureModalComponent, { size: 'lg' });
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
