import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'article-modal',
  templateUrl: './article.modal.component.html',
  styleUrls: ['./article.modal.component.css']
})
export class ArticleModalComponent implements OnInit {

  @Input() statusRec;
  @Input() objEdit;
  @Input() viewMsg;
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;

  isFormDirty: Boolean = false;

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    ) {
    this.mycontent = `<p>My html content</p>`;
  }

  ngOnInit() {

    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };

    // if (this.statusRec === 'addnew') {
    //   this.limitTransaction = {};
    //   this.limitTransaction.id = 0;
    //   this.limitTransaction.userCategoryId = '';
    //   this.limitTransaction.levelMerchant = '';
    //   this.limitTransaction.limitQrAmount = 0
    //   this.limitTransaction.limitQrFreq = 0
    //   this.limitTransaction.limitPpobAmount = 0
    //   this.limitTransaction.limitPpobFreq = 0;
    //   this.limitTransaction.category = '';
    // } else {
    //   this.limitTransaction = this.objEdit;
    // }
  }

  // onChange($event: any): void {
  //   console.log("onChange");
  //   //this.log += new Date() + "<br />";
  // }

  // onPaste($event: any): void {
  //   console.log("onPaste");
  //   //this.log += new Date() + "<br />";
  // }

  save(): void {
    console.log(">>>>>", this.mycontent)
    // this.ngxService.start();

    // this.limitTransactionService.save(this.limitTransaction).subscribe(result => {
    //   this.isFormDirty = true;
    //   if (result.body.errCode === '00') {
    //     this.closeForm();
    //   } else {
    //     console.log('error');
    //     Swal.fire('Failed', result.body.errDesc, 'error').then(
    //     );
    //   }
    //   this.ngxService.stop();
    // });
  }

  closeForm(): void {
    if (this.isFormDirty === true) {
      this.modalService.dismissAll('refresh');
    } else {
      this.modalService.dismissAll('close');
    }
  }

}
