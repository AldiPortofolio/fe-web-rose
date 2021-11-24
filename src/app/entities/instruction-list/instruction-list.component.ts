import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { InstructionListModalComponent } from './instruction-list.modal.component';
import { InstructionList } from './instruction-list.model';
import { InstructionListService } from './instruction-list.service';

@Component({
  selector: 'op-instruction-list',
  templateUrl: './instruction-list.component.html',
  styleUrls: ['./instruction-list.component.css']
})
export class InstructionListComponent implements OnInit {

  searchTerm = {
    title: '',
    page: 1,
    limit: 10,
  }

  instructionList: InstructionList[];
  instruction: InstructionList;
  closeResult: string;
  currPage = 1;
  totalRecord = 10;
  totalData = 0;

  constructor(
    private instructionListService: InstructionListService,
    private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    ) {
  }

  ngOnInit() {
    this.loadAll(this.currPage);
    
  }

  loadAll(page) {
    this.ngxService.start(); // start loader
    this.searchTerm.page = page
    this.searchTerm.limit = this.totalRecord
    // this.searchTerm.userCategoryId.toFixed()

    console.log('this.searchTerm', this.searchTerm)
    this.instructionListService.filter({
      filter: this.searchTerm,
    })
      .subscribe(
        (res: HttpResponse<InstructionList[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }

  onFilter() {
    this.loadAll(this.currPage);
  }

  private onSuccess(data, headers) {
    this.ngxService.stop();
    if (data.contents.length < 0) {
      return;
    }
    console.log(data);
    this.instructionList = data.contents;
    this.totalData = data.totalData;
  }

  private onError(error) {
    this.ngxService.stop();
    console.log('error..', error);
  }

  open(status, message) {
    const modalRef = this.modalService.open(InstructionListModalComponent, { size: 'lg' });
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

  remove(instructionList: InstructionList) {
    console.log(instructionList)
    this.instructionListService.delete(instructionList.id).subscribe(result => {
        console.log('Result==>' + result.body);
        if (result.body.errCode === '00') {
            console.log('Toast success');
            Swal.fire('Success', 'Success delete banner', 'success');
            this.currPage = 1;
            this.loadAll(this.currPage);
        } else {
            Swal.fire('Failed', result.body.errDesc, 'error');
        }
    });

  }

}
