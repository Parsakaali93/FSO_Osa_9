import { Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseString = (s: unknown): string => {
    if(!isString(s))
        throw new Error('Not a string');

    return s;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
  };

const parseGender = (gender: unknown): Gender => {
if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender value: ' + gender);
}
return gender;
};

const toNewPatient = (object: unknown): NewPatient => {

    /* the first type guard checks that the parameter object exists and it has the type object */
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }

    /* the second type guard uses the in operator to ensure that the object has all the desired fields: */
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {

        const newEntry: NewPatient = {
          name: parseString(object.name),
          dateOfBirth: parseString(object.name),
          ssn: parseString(object.ssn),
          gender: parseGender(object.gender),
          occupation: parseString(object.occupation)
        };
      
        return newEntry;
      }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;