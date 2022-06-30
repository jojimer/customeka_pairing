import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ButtonLayoutDisplay, ButtonMaker, DialogInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { PairingComponent } from '../pairing/pairing.component';
import { ProjectManagerService } from 'src/app/services/project-manager.service';

import { HashconnectService } from '../../services/hashconnect.service';
import { SigningService } from '../../services/signing.service';

@Component({
  selector: 'app-nft-claim-roles',
  templateUrl: './nft-claim-roles.component.html',
  styleUrls: ['./nft-claim-roles.component.scss']
})

export class NftClaimRolesComponent implements OnInit {
  bgColor = {
    backgroundColor: "#830505"
  };

  constructor(
    private activatedRoute:ActivatedRoute,
    public HashConnectService: HashconnectService,
    private SigningService: SigningService,
    private project: ProjectManagerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      if(param.get('nft')){
        this.project.getVerify(param.get('vcode'));
        this.SigningService.init();
        this.HashConnectService.initHashconnect();
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
