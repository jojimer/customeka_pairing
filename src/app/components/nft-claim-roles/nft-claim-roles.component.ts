import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ButtonLayoutDisplay, ButtonMaker, DialogInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { PairingComponent } from '../pairing/pairing.component';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { Project } from '../../models/Project';
import { Roles } from 'src/app/models/Roles';
import { HashConnectTypes } from 'hashconnect';

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
  projectInit:boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    public HashConnectService: HashconnectService,
    private project: ProjectManagerService,
    private router: Router
  ) {
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
                this.project.openSnackBar('Link is invalid! try again.',5);
                this.router.navigate(['/p/'+project_id]);
              }

              this.claiming = v.payload.data();

              // Check if verification key expired
              if(this.project.checkExpiration(this.claiming.time).expired){
                this.project.openSnackBar('Verification Key Expired! try again.',12);
                this.router.navigate(['/p/'+project_id]);
              }

              // Check if roles already claimed
              if(this.claiming.complete && !this.projectInit){
                this.project.openSnackBar('Roles already claimed for this verification key.',12);
                this.router.navigate(['/p/'+project_id]);
              }

              this.project.setItems(v.payload.data());
              this.claiming.wallet_id = this.project.hideWalletDigits(this.claiming.wallet_id);
              if(this.claiming.roles.length > 1) this.roleText += "s";

              // Proceed to Hashconnect Services
              this.HashConnectService.setAppMetaData({
                name: this.webAppData.project_title,
                icon: this.webAppData.logo,
                description: this.webAppData.description
              });
              this.HashConnectService.initHashconnect();
              this.projectInit = true;
            })
          })
        }else{
          this.router.navigate(['/invalid-link']);
        }

      }
    })
  }

  ngOnInit(): void {}

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

}
