import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CategoryLevelFeature } from './category-level-feature.model';
import { CategoryLevelFeatureService } from './category-level-feature.service';
import Swal from 'sweetalert2';
import { UserCategoryService } from '../user-category/user-category.service';
import { UserCategory } from '../user-category/user-category.model';
import { FeatureService } from '../feature/feature.service';
import { LevelMerchantService } from '../../level-merchant/level-merchant.service';
import { Feature } from '../feature/feature.model';
import { LevelMerchant } from '../../level-merchant/level-merchant.model';

@Component({
  selector: 'op-category-level-feature-modal',
  templateUrl: './category-level-feature.modal.component.html',
  styleUrls: ['./category-level-feature.modal.component.css']
})
export class CategoryLevelFeatureModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: CategoryLevelFeature;
  @Input() viewMsg;

  categoryLevelFeature: CategoryLevelFeature;
  listUserCategory: UserCategory[] = [];
  listLevelMerchant: LevelMerchant[] = [];
  listFeatureProduct: Feature[] = [];

  isFormDirty: Boolean = false;
  closeResult: string;
  toggle: boolean = false;

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

  // searchTerm = {
  //   id: 0,
  //   userCategoryId: 0,
  //   userCategoryName: '',
  //   levelMerchantId: 0,
  //   levelMerchantName: '',
  //   fiturProductId: 0,
  //   fiturProductName: '',
  //   status: '',
  //   page: 1,
  //   limit: 10,
  // }

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private categoryLevelFeatureService:  CategoryLevelFeatureService,
    private userCategoryService: UserCategoryService,
    private featureProductService: FeatureService,
    private levelMerchantService: LevelMerchantService
    ) {
  }

  ngOnInit() {
    this.loadListUserCategory()
    this.loadListLevelMerchant()
    this.loadListFeatureProduct()

    if (this.statusRec === 'addnew') {
      this.categoryLevelFeature = {};
      this.categoryLevelFeature.id = 0;
      this.categoryLevelFeature.userCategoryId = 0;
      this.categoryLevelFeature.levelMerchantId = 99;
      this.categoryLevelFeature.fiturProductId = 0;
      this.categoryLevelFeature.userCategoryName = '';
      this.categoryLevelFeature.levelMerchantName = '';
      this.categoryLevelFeature.fiturProductName = '';
      this.categoryLevelFeature.status = '';
    } else {
      this.categoryLevelFeature = this.objEdit;
    }
  }

  private loadListUserCategory() {
    this.userCategoryService.filter({
      filter: this.searchTermUC,
    })
      .subscribe(
        (res: HttpResponse<UserCategory[]>) => this.onSuccess(res.body, res.headers, 0),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List User Category')
      );
  }

  private loadListLevelMerchant() {
    this.levelMerchantService.getAllLevelMerchant(100)
      .subscribe(
        (res: HttpResponse<LevelMerchant[]>) => this.onSuccess(res.body, res.headers, 1),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List Level Merchant')
      );
  }

  private loadListFeatureProduct() {
    this.featureProductService.filter({
      filter: this.searchTermF,
    })
      .subscribe(
        (res: HttpResponse<Feature[]>) => this.onSuccess(res.body, res.headers, 2),
        (res: HttpErrorResponse) => this.onError(res.message, 'Get List Feature Product')
      );
  }

  private onSuccess(data, headers, code) {
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

  private onError(error, listName) {
    this.ngxService.stop();
    console.log('error..', error, listName);
  }

  save(): void {
    this.ngxService.start();

    this.categoryLevelFeature.userCategoryId = +this.categoryLevelFeature.userCategoryId;
    this.categoryLevelFeature.levelMerchantId = +this.categoryLevelFeature.levelMerchantId;
    this.categoryLevelFeature.fiturProductId = +this.categoryLevelFeature.fiturProductId;

    this.categoryLevelFeatureService.save(this.categoryLevelFeature).subscribe(result => {
      this.isFormDirty = true;
      if (result.body.errCode === '00') {
        this.closeForm();
      } else {
        console.log('error');
        Swal.fire('Failed', result.body.errDesc, 'error').then(
        );
      }
      this.ngxService.stop();
    });
  }

  closeForm(): void {
    if (this.isFormDirty === true) {
      this.modalService.dismissAll('refresh');
    } else {
      this.modalService.dismissAll('close');
    }
  }
  

}
