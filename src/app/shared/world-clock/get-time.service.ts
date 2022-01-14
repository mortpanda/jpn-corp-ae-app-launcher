import { Injectable, OnDestroy } from '@angular/core';
import { TimezoneDataService } from 'app/shared/world-clock/timezone-data.service';
import { DatePipe } from '@angular/common';

import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTimeService {

  strSydneyDate;
  strSydneyTime;
  strSingaporeDate;
  strSingaporeTime;
  strNYDate;
  strNYTime;
  strUTCDate;
  strUTCTime;
  strTokyoDate;
  strTokyoTime;
  strSanFranDate;
  strSanFranTime;
  strLondonDate;
  strLondonTime;
  arrTimeData;
  public strApiURL = 'https://worldtimeapi.org/api/timezone/';

  constructor(
    public TimezoneDataService: TimezoneDataService,
    public datePipe: DatePipe,
  ) { }



  async GetTime(strTimeZone) {

    const FetchTime = fetch(this.strApiURL + strTimeZone, {
      method: 'GET'
    })
      .then(response => response.json())
      .catch(error => console.log('error', error));
    this.arrTimeData = await FetchTime;
    //console.log(this.arrTimeData);

    switch (strTimeZone) {
      case 'Asia/Tokyo': {
        this.strTokyoDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strTokyoTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'America/Los_Angeles': {
        this.strSanFranDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strSanFranTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'Europe/London': {
        this.strLondonDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strLondonTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'Australia/Sydney': {
        this.strSydneyDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strSydneyTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'Asia/Singapore': {
        this.strSingaporeDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strSingaporeTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'America/New_York': {
        this.strNYDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strNYTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'Etc/UTC': {
        this.strUTCDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strUTCTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
    }

  }



  async GetWorldTime() {
    interval(1000 * 10).subscribe(x => {
      this.GetTime(this.TimezoneDataService.TimeZoneTokyo);
      this.GetTime(this.TimezoneDataService.TimeZoneSanFran);
      this.GetTime(this.TimezoneDataService.TimeZoneLondon);
      this.GetTime(this.TimezoneDataService.TimeZoneSingapore);
      this.GetTime(this.TimezoneDataService.TimeZoneSydney);
      this.GetTime(this.TimezoneDataService.TimeZoneNY);
      this.GetTime(this.TimezoneDataService.TimeZoneUTC);
    })
    
  }



}
