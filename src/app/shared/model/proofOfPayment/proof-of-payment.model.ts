export class ProofOfPayment {
    id : number = 0;
    notes : string = '';
    file_id : string = '';
    file_name : string = '';
    file_extention : string = '';
    file_type : string = '';
    file_size : number = 0;
    file_location : string = '';
    image : string  = ''
    created_at : Date = new Date();
    updated_at : Date = new Date();
    termID : number = 0;
    amount : any = null;
    termNumber : string = '';
    user_id : number = 0;
    task_action_logs : string = '';
    task_action_from : string = '';
    task_notes : string = '';
    system_status : string = 'default';
    device_operation_system : string = 'default';
    device_name : string = 'default';
    system_link_key : string = '';
    system_link_id : string = '';
    adminAction : AdminAction = new AdminAction();
}

export class AdminAction
{
    is_action: boolean = false;
    is_approve : boolean = false;
    is_reject : boolean = false;
}
