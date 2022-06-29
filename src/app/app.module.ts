import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { NftLandingPageComponent } from './components/nft-landing-page/nft-landing-page.component';
import { NftClaimRolesComponent } from './components/nft-claim-roles/nft-claim-roles.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ResultModalComponent } from './components/result-modal/result-modal.component';
import { PairingComponent } from './components/pairing/pairing.component';
import { DialogConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    NftLandingPageComponent,
    NftClaimRolesComponent,
    PageNotFoundComponent,
    ResultModalComponent,
    PairingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxAwesomePopupModule.forRoot(),
    DialogConfigModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
