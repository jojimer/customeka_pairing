import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ButtonLayoutDisplay, ButtonMaker, DialogInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { PairingComponent } from '../pairing/pairing.component';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { Project } from '../../models/Project';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roles } from 'src/app/models/Roles';

import { HashconnectService } from '../../services/hashconnect.service';

@Component({
  selector: 'app-nft-claim-roles',
  templateUrl: './nft-claim-roles.component.html',
  styleUrls: ['./nft-claim-roles.component.scss']
})

export class NftClaimRolesComponent implements OnInit {
  webAppData:Project
  claiming:Roles
  roleText:string = "Role";
  background = {}

  constructor(
    private activatedRoute:ActivatedRoute,
    public HashConnectService: HashconnectService,
    private project: ProjectManagerService,
    private router: Router,
    private _snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      const project_id = param.get('nft');
      if(project_id){

        let docs = this.project.getProject(project_id);
        if(docs !== undefined) {

          docs?.forEach(doc => {
            if(!doc.payload.exists) this.router.navigate(['/invalid-link']);
            this.webAppData = doc.payload.get('webAppData');
            this.background = {
              backgroundImage: `url("${this.webAppData.banner}")`,
              backgroundPosition: this.webAppData.bannerPosition
            }

            let verification = this.project.getVerify(param.get('vcode'),doc.payload.id);
            verification?.forEach(v => {
              // Check if verification key exist
              if(!v.payload.exists){
                this.openSnackBar('Link is invalid! try again.');
                this.router.navigate(['/p/'+project_id]);
              }

              // Check if verification key expired
              if(this.project.checkExpiration(v.payload.get('time')).expired){
                this.openSnackBar('Verification Key Expired! try again.');
                this.router.navigate(['/p/'+project_id]);
              }

              this.claiming = v.payload.data();
              this.claiming.wallet_id = this.project.hideWalletDigits(this.claiming.wallet_id);
              if(this.claiming.roles.length > 1) this.roleText += "s";


              // Proceed to Hashconnect Services
              this.HashConnectService.initHashconnect();
            })
          })
        }else{
          this.router.navigate(['/invalid-link']);
        }

      }
    })
  }

  pair() {
      const dialogPopup = new DialogInitializer(PairingComponent);

      dialogPopup.setConfig({
          Width: '500px',
          LayoutType: DialogLayoutDisplay.NONE
      });

      dialogPopup.setButtons([
          new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.DANGER)
      ]);

      dialogPopup.openDialog$().subscribe(resp => { });
  }

  openSnackBar(msg:string) {
    this._snackBar.open(msg,'Dismiss',{
      duration: 5 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
