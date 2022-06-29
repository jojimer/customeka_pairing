import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nft-landing-page',
  templateUrl: './nft-landing-page.component.html',
  styleUrls: ['./nft-landing-page.component.scss']
})
export class NftLandingPageComponent implements OnInit {
  nftProject:string|null = '';

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      if(param.get('nft')) this.nftProject = param.get('nft');
    })
  }

}
