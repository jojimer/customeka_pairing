import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftLandingPageComponent } from './nft-landing-page.component';

describe('NftLandingPageComponent', () => {
  let component: NftLandingPageComponent;
  let fixture: ComponentFixture<NftLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
