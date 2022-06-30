import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Hashconnect Dependency Module
import { DialogConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
import { FormsModule } from '@angular/forms';

// Material Component
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Firestore
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

// Custom Services
import { ListService } from "./services/list.service";
import { ProjectManagerService } from './services/project-manager.service';

// Custom Components
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { NftLandingPageComponent } from './components/nft-landing-page/nft-landing-page.component';
import { NftClaimRolesComponent } from './components/nft-claim-roles/nft-claim-roles.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ResultModalComponent } from './components/result-modal/result-modal.component';
import { PairingComponent } from './components/pairing/pairing.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    ComingSoonComponent,
    NftLandingPageComponent,
    NftClaimRolesComponent,
    PageNotFoundComponent,
    ResultModalComponent,
    PairingComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxAwesomePopupModule.forRoot(),
    DialogConfigModule.forRoot(),
    MatProgressSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    ListService,
    ProjectManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
