import { ValidatorField } from "./model";

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

}

