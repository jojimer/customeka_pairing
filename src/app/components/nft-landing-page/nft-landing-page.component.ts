import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectManagerService } from 'src/app/services/project-manager.service';

@Component({
  selector: 'app-nft-landing-page',
  templateUrl: './nft-landing-page.component.html',
  styleUrls: ['./nft-landing-page.component.scss']
})
export class NftLandingPageComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private project:ProjectManagerService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      if(param.get('nft')) this.project.getProject(param.get('nft'));
    })
  }

}
