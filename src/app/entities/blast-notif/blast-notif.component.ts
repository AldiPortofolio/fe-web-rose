import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlastNotifService } from './blast-notif.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-blast-notif',
  templateUrl: './blast-notif.component.html',
  styleUrls: ['./blast-notif.component.css']
})
export class BlastNotifComponent implements OnInit {

  searchTerm = {
    title: '',
    desc: '',
  }

  constructor(
    private ngxService: NgxUiLoaderService,
    private blastNotifService: BlastNotifService
  ) { }

  ngOnInit() {
  }

  send(){
    this.ngxService.start();
    this.blastNotifService.sendAll({
      filter: this.searchTerm,
    })
    .subscribe(
      (res: HttpResponse<any>) => this.onSuccess(res.body, res.headers),
      (res: HttpErrorResponse) => this.onError(res.message, 'Get List Bank')
    )
  }

  resetFilter(){
    this.searchTerm = {
      title: '',
      desc: '',
    }

  }

  private onSuccess(data, headers) {
    this.ngxService.stop(); // start loader
    if (data.errCode === '00') {
      console.log('Toast success');
      Swal.fire('Success', 'Success send blast notification', 'success');
      this.resetFilter();
    } else {
      Swal.fire('Failed', data.errDesc, 'error');
      // console.log('Toast err', result.body.errDesc);
    }
    
  }

  private onError(error, listName) {
    this.ngxService.stop();
    console.log('error..', error, listName);
  }



}
