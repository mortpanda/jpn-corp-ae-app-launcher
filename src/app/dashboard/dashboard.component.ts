import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaConfigService } from "app/shared/okta/okta-config.service";
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { GetTimeService } from 'app/shared/world-clock/get-time.service';

import {OtherWebsites, OtherWebsite} from 'app/websites/other-websites';
import {AdminDashboard, AdminSites} from 'app/websites/admin-dashboard';
import {EuDashboard, UserSites} from 'app/websites/eu-dashboard';
import {MyProjects, ProjectSites} from 'app/websites/my-projects';
import {OktaWebsites, oktaWebsite} from 'app/websites/okta-websites';
import  {DevInfoSites, DevInfo} from 'app/websites/dev-info-sites';
import {KlabProjects,KlabSites } from 'app/websites/klab-projects';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  AdminSites = AdminSites;
  OtherWebsite = OtherWebsite;
  UserSites = UserSites;
  ProjectSites = ProjectSites;
  oktaWebsite = oktaWebsite;
  DevInfo = DevInfo;
  KlabSites = KlabSites;



  strThisSession;
  strUserSession: Boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  durationInSeconds = 5;

  constructor(public OktaGetTokenService: OktaGetTokenService,
    public OktaSDKAuthService: OktaSDKAuthService,
    public _snackBar: MatSnackBar,
    public GetTimeService: GetTimeService,  
  ) { }

  // NotAuthed() {
  //   this._snackBar.openFromComponent(AuthNoticeComponent,
  //     {
  //       duration: this.durationInSeconds * 1000,
  //       horizontalPosition: 'center',

  //     });
  // }


  async ngOnInit() {

    this.authService.token.getUserInfo()
      .then(function (user) {
        //console.log(user)
      })
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          return exists
        } else {
          // not logged in
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
        //alert(this.oktaSDKAuth.config.redirectUri)
        // alert('ログインしてください')
        //await this.NotAuthed();
        await window.location.replace('/');
      case true:
        this.OktaGetTokenService.GetAccessToken();
        await this.GetTimeService.GetWorldTime();
        break;

    }

  }

}
