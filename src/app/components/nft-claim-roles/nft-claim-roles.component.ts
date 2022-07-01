import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ButtonLayoutDisplay, ButtonMaker, DialogInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { PairingComponent } from '../pairing/pairing.component';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { Project } from '../../models/Project';

import { HashconnectService } from '../../services/hashconnect.service';
import { SigningService } from '../../services/signing.service';

@Component({
  selector: 'app-nft-claim-roles',
  templateUrl: './nft-claim-roles.component.html',
  styleUrls: ['./nft-claim-roles.component.scss']
})

export class NftClaimRolesComponent implements OnInit {
  webAppData:Project
  background = {}

  constructor(
    private activatedRoute:ActivatedRoute,
    public HashConnectService: HashconnectService,
    private SigningService: SigningService,
    private project: ProjectManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      const project_id = param.get('nft');
      if(project_id){

        let docs = this.project.getProject(project_id);
        if(docs !== undefined) {

          docs?.forEach(doc => {
            this.webAppData = doc.payload.data().webAppData;
            this.background = {
              backgroundImage: `url("${this.webAppData.banner}")`,
              backgroundPosition: this.webAppData.bannerPosition
            }
            console.log(this.webAppData)
          })

          this.project.getVerify(param.get('vcode'));
          this.SigningService.init();
          this.HashConnectService.initHashconnect();

        }else{
          this.router.navigate(['/invalid-url']);
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

}
