import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  constructor() { }

  getProject(nftProject:string|null){
    console.log(nftProject);
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
