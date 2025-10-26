import { Injectable } from '@angular/core';
import { SystemLogs } from '../../model/systemLogs/system-logs.model';

@Injectable({
  providedIn: 'root'
})
export class SystemLogsService {

  model : SystemLogs = new SystemLogs();
  constructor() { }

  createLogs(
     actionLogs: any,
     actionFrom : any, 
     taskNotes: any, 
     linkKey : any,
    linkId : any)
  {
    this.model.user_id = Number(localStorage.getItem("UserId"));
    this.model.task_action_logs = actionLogs;
    this.model.task_action_from = actionFrom;
    this.model.task_notes = taskNotes;
    this.model.system_link_key = linkKey;
    this.model.system_link_key = linkKey;
    this.model.system_link_id = linkId;
    return this.model;
  }
}
