import { Component, Inject, OnInit } from '@angular/core';
import { HashconnectService } from 'src/app/services/hashconnect.service';
import { AwesomeQR } from 'awesome-qr';
import { DialogBelonging } from '@costlydeveloper/ngx-awesome-popup';
import { Subscription } from 'rxjs';
import { HashConnectTypes } from 'hashconnect';
import { ProjectManagerService } from 'src/app/services/project-manager.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-pairing',
    templateUrl: './pairing.component.html',
    styleUrls: ['./pairing.component.scss']
})
export class PairingComponent implements OnInit {

    constructor(
        @Inject('dialogBelonging') private dialogBelonging: DialogBelonging,
        public HashconnectService: HashconnectService,
        private project:ProjectManagerService
    ) { }

    subscriptions: Subscription = new Subscription();
    qr_url: string = "";

    ngOnInit(): void {
        this.subscriptions.add(
            this.dialogBelonging.EventsController.onButtonClick$.subscribe((_Button) => {
                if (_Button.ID === 'cancel') {
                    this.dialogBelonging.EventsController.close();
                }
            })
        );

        this.HashconnectService.hashconnect.pairingEvent.on((data) => {
            // console.log("Pairing event callback ");
            // Void pairing if two wallet_id are paired & wallet ID used not much
            const projectData = this.project.projectData;
            if(data.accountIds.length === 1 && data.accountIds[0] === projectData.wallet_id){
              this.project.claimRoles(projectData.discord_id,data);
              this.project.openSnackBar('Paired successful, you claimed all the roles.',7,projectData.redirect);
            }else{
              this.project.openSnackBar('Failed to claim roles! Paired only the wallet ID you sent to discord Bot',10);
              this.HashconnectService.clearPairings();
            }
            this.dialogBelonging.EventsController.close();
        })

        new AwesomeQR({
            text: this.HashconnectService.saveData.pairingString,
            size: 400,
            margin: 16,
            maskPattern: 110,
            colorLight: "#fff",
            // colorDark: "#1F1D2B"
        }).draw().then((dataURL) => {
            if (dataURL)
                this.qr_url = dataURL.toString();
        });
    }


    pairWithExtension() {
        this.HashconnectService.connectToExtension();
    }

}
