export class ProofOfPayment {
    id : number = 0;
    notes : string = '';
    file_id : string = '';
    file_name : string = '';
    file_extention : string = '';
    file_type : string = '';
    file_size : number = 0;
    file_location : string = '';
    image : string = '';
    created_at : Date = new Date();
    updated_at : Date = new Date();
}
