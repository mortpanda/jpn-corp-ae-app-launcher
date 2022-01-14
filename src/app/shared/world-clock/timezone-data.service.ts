import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimezoneDataService {
  TimeZoneSydney = 'Australia/Sydney';
  TimeZoneSingapore = 'Asia/Singapore';
  TimeZoneTokyo = 'Asia/Tokyo';
  TimeZoneSanFran = 'America/Los_Angeles';
  TimeZoneNY = 'America/New_York';
  TimeZoneLondon = 'Europe/London';
  TimeZoneUTC = 'Etc/UTC';

  constructor() { }
  
}
