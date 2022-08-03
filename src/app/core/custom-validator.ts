export class CustomValidator{

    static dateValidator(dob: any): any{
        const maxDate = new Date().getFullYear() - 18 + '-' + new Date().toISOString().slice(5, 10);  
        if(dob.value > maxDate){
            return {
                invalidDate: true
            }
        }
        else{
            return null
        }
    }
}