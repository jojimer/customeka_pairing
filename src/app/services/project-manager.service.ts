import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
const projects = require('../../assets/nft_projects.json');

// interface DocumentSnapshot {
//   exists: boolean;
//   ref: DocumentReference;
//   id: string;
//   metadata: SnapshotMetadata;
//   data(): DocumentData;
//   get(fieldPath: string): any;
// }

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  private itemDoc: AngularFirestoreDocument<DocumentData>;
  items:Observable<DocumentData>;

  constructor(public afs:AngularFirestore) { }

  getProject(nftProject:string|null){
    const project = Object.keys(projects).map(p => {
      if(p == nftProject) return projects[p].directory;
    });

    if(project[0] === undefined && nftProject !== null) return; // project don't exist

    this.itemDoc = this.afs.doc<DocumentData>('NFT_PROJECTS/'+project);
    this.items = this.itemDoc.snapshotChanges().pipe(actions => actions);

    return this.items;
  }

  getVerify(vCode:string|null){
    console.log(vCode);
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
  /*
   * End hideDigits
   *
   */

  /*
   * Start expiredInavalid
   * Show Dialoge Link invalitidy and redirect after
   */
  // expiredInvalid(redirect:string,invalidity:string,seconds:number){
  //   const dialog = Dialog.create({
  //     title: "Alert",
  //     message: `Link is ${invalidity}, will redirect in ${seconds} seconds.`,
  //     ok: "redirect",
  //   }).onOk(() => {
  //     location.replace(redirect);
  //   });

  //   const timer = setInterval(() => {
  //     seconds--;

  //     if (seconds > 0) {
  //       dialog.update({
  //         message: `Link is ${invalidity}, will redirect in ${seconds} second${
  //           seconds > 1 ? "s" : ""
  //         }.`,
  //       });
  //     } else {
  //       clearInterval(timer);
  //       location.replace(redirect);
  //     }
  //   }, 1000);
  // };
}
