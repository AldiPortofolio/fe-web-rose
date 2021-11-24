import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AkuisisiSfaComponent } from './akuisisi-sfa.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AkuisisiSfaService } from './akuisisi-sfa.service';

@NgModule({
  declarations: [
    AkuisisiSfaComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
  ],
  entryComponents: [
    AkuisisiSfaComponent,
  ],
  providers: [
    AkuisisiSfaService,
  ]
})
export class AkuisisiSfaModule { }
