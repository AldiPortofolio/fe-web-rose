import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkuisisiSfaComponent } from './akuisisi-sfa.component';

describe('AkuisisiSfaComponent', () => {
  let component: AkuisisiSfaComponent;
  let fixture: ComponentFixture<AkuisisiSfaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkuisisiSfaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkuisisiSfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
