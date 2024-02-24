import { Gender, NewPatient, Entry } from './types';

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

// Function to check if an entry is of one of the specified types
const isEntryOfType = (entry: Entry): boolean => {
  console.log(entry);
  return (
    entry.type === "HealthCheck" || entry.type === "OccupationalHealthcare" || entry.type === "Hospital"
  );
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error('Entries must be an array.');
  }

  if (!entries.every(isEntryOfType)) {
    throw new Error('Incorrect entries value: ' + JSON.stringify(entries));
  }

  return entries as Entry[];
};

const toNewPatient = (object: unknown): NewPatient => {

    /* the first type guard checks that the parameter object exists and it has the type object */
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }

    /* the second type guard uses the in operator to ensure that the object has all the desired fields: */
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object)  {
        const newEntry: NewPatient = {
          name: parseString(object.name),
          dateOfBirth: parseString(object.name),
          ssn: parseString(object.ssn),
          gender: parseGender(object.gender),
          occupation: parseString(object.occupation),
          entries: parseEntries(object.entries)
        };
      
        return newEntry;
      }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;