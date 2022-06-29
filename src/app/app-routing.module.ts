import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { NftClaimRolesComponent } from './components/nft-claim-roles/nft-claim-roles.component';
import { NftLandingPageComponent } from './components/nft-landing-page/nft-landing-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {path : '' , component: ComingSoonComponent },
  {path : ':nft' , component: NftLandingPageComponent},
  {path: ':nft/:vcode', component: NftClaimRolesComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
