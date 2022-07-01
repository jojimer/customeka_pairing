import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roles } from '../models/Roles';
const projects = require('../../assets/nft_projects.json');

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  private itemDoc: AngularFirestoreDocument<DocumentData>;
  private memberDoc: AngularFirestoreDocument<DocumentData>;
  items:Observable<DocumentData>;
  projectData:Roles
  documentID:string

  constructor(
    public afs:AngularFirestore,
    private _snackBar:MatSnackBar
  ) { }

  private searchProject(nftProject:string|null){
    return Object.keys(projects).map(p => {
      if(p == nftProject) return projects[p].directory;
    });
  }

  getProject(nftProject:string|null){
    const document_id = this.searchProject(nftProject);
    if(document_id[0] === undefined && nftProject !== null) return; // project don't exist

    this.itemDoc = this.afs.doc<DocumentData>('NFT_PROJECTS/'+document_id);
    this.items = this.itemDoc.snapshotChanges();

    return this.items;
  }

  getVerify(vCode:string|null,document_id:string){
    this.itemDoc = this.afs.doc<DocumentData>('NFT_PROJECTS/'+document_id+'/verification_key/'+vCode);
    this.items = this.itemDoc.snapshotChanges();
    this.documentID = document_id

    return this.items;
  }

  claimRoles(discord_id:string,pairingData:object){
    this.itemDoc.update({complete:true});
    this.memberDoc = this.afs.doc<DocumentData>('NFT_PROJECTS/'+this.documentID+'/members/'+discord_id);
    return this.memberDoc.update({verified: "claiming", pairing_data: pairingData});
  }

  setItems(data:Roles){
    this.projectData = data;
  }

  hideWalletDigits(wallet_id:string){
    let hidden = "";
    let c = wallet_id.length;
    while (c--) {
      let w = wallet_id[c];
      hidden += c < wallet_id.length - 3 ? w.replace(/\b\d{0,9}\b/, "X") : w;
    }
    return [...hidden].reverse().join("");
  };

  checkExpiration(expiration:any){
    const timeLeft = expiration.seconds - new Date().getTime() / 1000;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let expired = minutes < 0 && seconds < 30 ? true : false;
    return { min: minutes, sec: seconds, expired: expired };
  }

  openSnackBar(msg:string,ms:number,url:string|null = null) {
    let snackBarRef = this._snackBar.open(msg,'Dismiss',{
      duration: ms * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });

    if(url !== null) snackBarRef.afterDismissed().subscribe(() => {
      window.location.replace(url);
    });
  }
}
