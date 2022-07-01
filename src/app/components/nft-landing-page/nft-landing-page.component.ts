import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-nft-landing-page',
  templateUrl: './nft-landing-page.component.html',
  styleUrls: ['./nft-landing-page.component.scss']
})
export class NftLandingPageComponent implements OnInit {
  webAppData:Project
  background = {}


  constructor(
    private activatedRoute:ActivatedRoute,
    private project:ProjectManagerService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      if(param.get('nft')){
        let docs = this.project.getProject(param.get('nft'));
        if(docs === undefined) this.router.navigate(['/invalid-url']);

        docs?.forEach(doc => {
          this.webAppData = doc.payload.data().webAppData;
          this.background = {
            backgroundImage: `url("${this.webAppData.banner}")`,
            backgroundPosition: this.webAppData.bannerPosition
          }
        })

      }
    })
  }

}
