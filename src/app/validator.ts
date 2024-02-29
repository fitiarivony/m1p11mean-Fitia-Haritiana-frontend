import { ValidatorField, ValidatorOperatorField } from "./model";

export class DevDuetValidator{

  static validateData(data: any, validator: ValidatorField[]): string[] {
    const errors: string[] = [];
    validator.forEach(field => {
      if (data[field.champ] === field.valeur) {
        errors.push(field.errorMessage);
      }
    });
    return errors;
  }
  static validateAdvanceData(data: any, validator: ValidatorOperatorField[]): string[] {
    const errors: string[] = [];
    validator.forEach(field => {
      if (this.checkValidation(field,data)) {
        errors.push(field.errorMessage);
      }

    });
    return errors;
  }
  static checkValidation(field: ValidatorOperatorField,data:any){
    if (field.operator===">") {
        return data[field.champ]<=field.valeur
    }
    else if(field.operator==="array"){
      return data[field.champ].length<=0
    }else if(field.operator==="<"){
      return data[field.champ]>=field.valeur
    }else if(field.operator===">="){
      return data[field.champ]<field.valeur
    }
    return data[field.champ] === field.valeur
  }

}

