import { Component, OnInit } from '@angular/core';
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';
import { ViewEncapsulation } from '@angular/core';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaConfigService } from "app/shared/okta/okta-config.service";
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {
  strThisSession;
  strUserSession: Boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  durationInSeconds = 5;

  constructor(public OktaGetTokenService: OktaGetTokenService,
    public OktaSDKAuthService: OktaSDKAuthService,
    public _snackBar: MatSnackBar,
    public OktaWidgetService: OktaWidgetService,
  ) { }

  async ngOnInit()  {
    this.OktaWidgetService.CloseWidget();
    
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          console.log('Session to Okta : ' + exists);
          return exists
        } else {
          // not logged in
          console.log('Session to Okta : ' + exists);
          return exists
        }
      });
    switch (this.strUserSession) {
      case false:
        this.OktaWidgetService.login();
        break;

      case true:
        window.location.replace(this.OktaSDKAuthService.config.redirectUri);
        break;

    }
  }
  


}
