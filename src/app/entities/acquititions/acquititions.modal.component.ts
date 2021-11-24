import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Acquisition } from './acquititions.model';
import { AcquititionsService } from './acquititions.service';
import { MerchantGroupService } from '../merchant-group/merchant-group.service';
import { LookupService } from '../lookup/lookup.service';
import { UserCategoryService } from '../ottopay-4/user-category/user-category.service';
import { LookupDto } from '../lookup/lookup-dto.model';
import { MerchantGroup } from '../merchant-group/merchant-group.model';
import { UserCategory } from '../ottopay-4/user-category/user-category.model';
import { Lookup } from '../lookup/lookup.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BUCKET_NAME, PHOTO_KTP, SERVER_LOAD_IMAGE } from 'src/app/shared/constants/base-constant';
import { UploadImageService } from 'src/app/shared/upload-image.service';

@Component({
  selector: 'acquititions-modal',
  templateUrl: './acquititions.modal.component.html',
  styleUrls: ['./acquititions.modal.component.css']
})
export class AcquititionsModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit: Acquisition;
  @Input() viewMsg;
  @Input() listJenisUsaha
  @Input() listMerchantGroup
  @Input() listMerchantCategory
  @Input() listTipeMerchant
  @Input() listSrId

  acquitition: Acquisition;
  
  isFormDirty: Boolean = false;

  lookupTipeMerchant: LookupDto[] = [];
  lookupJenisUsaha: LookupDto[] = [];
  lookupSrId: LookupDto[] = [];
  lookupMerchantGroup: MerchantGroup[] = [];
  userCategoryList: UserCategory[];

  merchantGroupSelected: number = null;
  sequence: number = null
  registerUsingId: number = 0;
  selectedSrId = [];
  selectedJenisUsaha = [];
  dropdownSettingsSrId:IDropdownSettings
  dropdownSettingsJenisUsaha:IDropdownSettings

  searchTermLookup = {
    name: '',
    code:'',
    lookupGroup:'',
    page: 1,
    limit: 9999,
  };

  pendaftaranViaId = [
    { code : 1 , name : "Yes" },
    { code : 0 , name : "No" }
  ];

  tampilanAplikasi = [
    { code : "Active" , name : "Active" },
    { code : "Inactive" , name : "Inactive" }
  ];

  imgUrlLogoAcquitition;
  imageLogoAcquitition: Boolean = false


  constructor(
    private acquititionsService: AcquititionsService,
    private merchantGroupService: MerchantGroupService,
    private lookupService: LookupService,
    private userCategoryService: UserCategoryService,
    private modalService: NgbModal,
    private uploadImageService: UploadImageService,
    private ngxService: NgxUiLoaderService,
    ) {
  }

  ngOnInit() {

      this.lookupTipeMerchant = this.listTipeMerchant
      this.lookupJenisUsaha = this.listJenisUsaha
      this.lookupSrId = this.listSrId
      this.lookupMerchantGroup = this.listMerchantGroup
      this.userCategoryList = this.listMerchantCategory

      this.dropdownSettingsSrId = {
        singleSelection: false,
        idField: 'code',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 10,
        allowSearchFilter: false
      };

      this.dropdownSettingsJenisUsaha = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 10,
        allowSearchFilter: false
      };

      if (this.statusRec === 'addnew') {
        this.acquitition = {};
        this.acquitition.id = 0;
        this.acquitition.name = '';
        this.acquitition.merchantType = null;
        this.acquitition.merchantGroupId = 0;
        this.acquitition.merchantCategory = null;
        this.acquitition.businessType = '';
        this.acquitition.salesRetails = '';
        this.acquitition.sequence = 0;
        this.acquitition.showInApp = 'Inactive';
        this.acquitition.logoUrl = '';
        this.acquitition.registerUsingId = false;
      } else {
        this.acquitition = this.objEdit;
        this.merchantGroupSelected = this.acquitition.merchantGroupId;
        this.imgUrlLogoAcquitition = this.acquitition.logoUrl
        this.sequence = this.acquitition.sequence;
        if (this.acquitition.registerUsingId === true) {
          this.registerUsingId = 1
        } else {
          this.registerUsingId = 0
        }
        let jenisUsaha = this.acquitition.businessType.split(',');
        console.log("ini jenis usaha split : ", jenisUsaha )
        if ( jenisUsaha.length > 0 ) {
          for ( let i = 0 ; i < jenisUsaha.length ; i++ ) {
            for ( let j = 0 ; j < this.lookupJenisUsaha.length ; j++ ) {
              if (jenisUsaha[i] == this.lookupJenisUsaha[j].name ) {
                this.selectedJenisUsaha.push({
                  id: this.lookupJenisUsaha[j].id,
                  name: this.lookupJenisUsaha[j].name
                })
              }
            }
          }
        }
        console.log("on init selected jenis usaha : ",this.selectedJenisUsaha)
       
        let srId = this.acquitition.salesRetails.split(',')
        console.log("ini sr id split : ", srId )
        if ( srId.length > 0 ) {
          for ( let i = 0 ; i < srId.length ; i++ ) {
            for ( let j = 0 ; j < this.lookupSrId.length ; j++ ) {
              if (srId[i] == this.lookupSrId[j].code ) {
                this.selectedSrId.push({
                  code: this.lookupSrId[j].code,
                  name: this.lookupSrId[j].name
                })
              }
            }
          }
        }
        console.log("on init selected Sales retail : ",this.selectedSrId)
      }
  }

  save(): void {
    this.ngxService.start();

    if ( this.selectedJenisUsaha.length > 0 ) {
      this.acquitition.businessType = ''
      // let uniqJenisUsaha = this.selectedJenisUsaha.filter((el, i, a) => i === a.indexOf(el))
      let cek = ''
      for ( let i = 0 ; i < this.selectedJenisUsaha.length ; i++ ) {
        if ( i === 0 && cek !== this.selectedJenisUsaha[i].name ) {
          this.acquitition.businessType = this.acquitition.businessType + this.selectedJenisUsaha[i].name  
          cek = this.selectedJenisUsaha[i].name
        } else if ( cek !== this.selectedJenisUsaha[i].name ) {
          this.acquitition.businessType = this.acquitition.businessType + "," + this.selectedJenisUsaha[i].name 
          cek = this.selectedJenisUsaha[i].name
        }
      }
    } else if ( this.selectedJenisUsaha.length === 0 ) {
      this.acquitition.businessType = ''
    }

    console.log( "selected jenis usaha :",this.selectedJenisUsaha )
    console.log("convert jenis usaha to comma : " ,this.acquitition.businessType)
    if ( this.selectedSrId.length > 0 ) {
      // let uniqsr = this.selectedSrId.filter((el, i, a) => i === a.indexOf(el))
      this.acquitition.salesRetails = ''
      let cek = ''
      for ( let i = 0 ; i < this.selectedSrId.length ; i++ ) {
        if ( i === 0 && cek !== this.selectedSrId[i].code ) {
          this.acquitition.salesRetails = this.acquitition.salesRetails + this.selectedSrId[i].code  
          cek = this.selectedSrId[i].code
        } else if ( cek !== this.selectedSrId[i].code ) {
          this.acquitition.salesRetails = this.acquitition.salesRetails + "," + this.selectedSrId[i].code 
          cek = this.selectedSrId[i].code
        }
      }
    } else if ( this.selectedSrId.length === 0 ) {
      this.acquitition.salesRetails = ''
    }

    if ( this.registerUsingId == 1 ) {
      this.acquitition.registerUsingId = true
    } else {
      this.acquitition.registerUsingId = false
    }
    console.log( "selected sr :",this.selectedSrId )
    console.log("convert sr to comma : " ,this.acquitition.salesRetails)
    this.acquitition.merchantGroupId =  +this.merchantGroupSelected
    this.acquitition.sequence = this.sequence
    console.log("------------>",this.acquitition.registerUsingId, typeof(this.acquitition.registerUsingId))
    this.uploadImageService.uploadImage(this.imgUrlLogoAcquitition, "image_logo_acquitition", this.acquitition.name);
    
    console.log(this.acquitition)
    this.acquititionsService.save(this.acquitition).subscribe(result => {
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

  loadLookupMerchantGroup() {
      this.ngxService.start();
      this.merchantGroupService.query({
          page: 1,
          count: 1000,
      }).subscribe(
              (res: HttpResponse<MerchantGroup[]>) => this.onSuccessMG(res.body, res.headers),
              (res: HttpErrorResponse ) => this.onErrorMG(res.message),
              () => { this.ngxService.stop(); console.log('Finally MG'); }
      );
  }

  private onErrorMG(error) {
      console.log('Error load MG ', error);
  }

  private onSuccessMG(data, headers) {
      this.lookupMerchantGroup = data.content;
  }

  private lookup (lookupGroup : string) {
    this.searchTermLookup.lookupGroup = lookupGroup
    this.lookupService.filter({
      filter: this.searchTermLookup,
    })
    .subscribe(
            (res: HttpResponse<Lookup[]>) => this.onSuccessLookup(res.body, res.headers, lookupGroup),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => {}
    );
  }

  private onSuccessLookup(data, headers, lookupGroup: string) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    if ( lookupGroup == "JENIS_USAHA" ) {
      this.lookupJenisUsaha = data.contents
    } else if (lookupGroup == "SR_ID" ) {
      this.lookupSrId = data.contents
    } else if (lookupGroup == "TIPE_MERCHANT" ) {
      this.lookupTipeMerchant = data.contents
    }

  }

  loadDropdownUserCategory() {
  this.ngxService.start(); // start loader

  this.userCategoryService.dropdown()
    .subscribe(
      (res: HttpResponse<UserCategory[]>) => this.onSuccessDropdown(res.body, res.headers),
      (res: HttpErrorResponse) => this.onError(res.message)
    );

  }

  private onSuccessDropdown(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }

    this.userCategoryList = data.contents;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  onSrSelect(item: any) {
    console.log(item);
    // this.selectedSrId.push(item)
    // this.selectedSrId.pop
    console.log(this.selectedSrId)
  }

  onSrDeSelect(item: any) {
    console.log(item);
    for ( let i = 0 ; i < this.selectedSrId.length ; i++ ) {
      if (this.selectedSrId[i].code == item.code ) {
        this.selectedSrId.splice(i, 1);
      }
    }
    console.log(this.selectedSrId)
  }
  onSrSelectAll(items: any) {
    console.log(items);
    this.selectedSrId = []
    for ( let i = 0 ; i < items.length ; i++ ) {
      this.selectedSrId.push(items[i])
    }
    console.log(this.selectedSrId)
  }

  onSrDeSelectAll(items: any) {
    console.log(items);
    this.selectedSrId = []
    console.log(this.selectedSrId)
  }

  onJenisUsahaSelect(item: any) {
    console.log(item);
    // this.selectedJenisUsaha.push(item)
    console.log(this.selectedJenisUsaha)
  }

  onJenisUsahaDeSelect(item: any) {
    console.log(item);
    for ( let i = 0 ; i < this.selectedJenisUsaha.length ; i++ ) {
      if (this.selectedJenisUsaha[i].name == item.name ) {
        this.selectedJenisUsaha.splice(i, 1);
      }
    }
    console.log(this.selectedJenisUsaha)
  }

  onJenisUsahaSelectAll(items: any) {
    console.log(items);
    this.selectedJenisUsaha = []
    for ( let i = 0 ; i < items.length ; i++ ) {
      this.selectedJenisUsaha.push(items[i])
    }
    console.log(this.selectedJenisUsaha)
  }

  onJenisUsahaDeSelectAll(items: any) {
    console.log(items);
    this.selectedJenisUsaha = []
    console.log(this.selectedJenisUsaha)
  }

  processFileLogo(imageInput: any) {
        console.log(imageInput);
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        /* CHECK IMAGE SIZE */
        if (!this.checkSizeImage(file)) {
            return;
        }

        console.log('file.size', (file.size / 1024 / 1024).toFixed(4));

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
            console.log(reader.result);
            this.imgUrlLogoAcquitition = reader.result;
            this.imageLogoAcquitition = true;
            this.acquitition.logoUrl = this.generateUrlImage("image_logo_acquitition");
        };
    }

    checkSizeImage(file: File) {
        if (file.size > (1.5 * 1025 * 1024)) {
            Swal.fire('Error', 'Ukuran gambar maksimum 1.5 MB');
            return false;
        }
        return true;
    }

    generateUrlImage (tipe: string) {
        return SERVER_LOAD_IMAGE+ '/' + BUCKET_NAME + '/' + this.acquitition.name + '_' + tipe + '.jpeg';
    }

}
