import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftClaimRolesComponent } from './nft-claim-roles.component';

describe('NftClaimRolesComponent', () => {
  let component: NftClaimRolesComponent;
  let fixture: ComponentFixture<NftClaimRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftClaimRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftClaimRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
