import { Gender, NewPatient, Entry, NewEntry, EntryType, HealthCheckRating, Diagnosis } from './types';

interface Discharge {
  date: string;
  criteria: string;
}

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


const parseDiagnosisCodes = (object: unknown): Diagnosis[] =>  {
  if (!object) {
    return [] as Diagnosis[];
  }

  return object as Diagnosis[];
};

const parseType = (entryType: unknown): EntryType => {
    if(!isString(entryType))
      throw new Error('Not a string');

    if(entryType === "Hospital")
      return entryType;

    if(entryType === "HealthCheck")
      return entryType;

    if(entryType === "OccupationalHealthcare")
      return entryType;

    throw new Error("Invalid type");
    
};

const parseDate = (param: unknown): string => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if(!isString(param))
    throw new Error(`Date not a string`);
  if(regex.test(param))
    return param;
  else
    throw new Error(`Malformatted date`);  
};

const isDischarge = (param: object): param is Discharge => {
  return (
    typeof param === 'object' &&
    'date' in param && 
    typeof (param as Discharge).date === 'string' &&
    'criteria' in param &&
    typeof (param as Discharge).criteria === 'string'
  );
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge) || !discharge.date || !discharge.criteria) {
    throw new Error(`Incorrect discharge: `);
  }

  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect employer name: ${employerName}`);
  }
  return employerName;
};

// Type guard to check if a value is a member of the HealthCheckRating enum
const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// Function to parse and validate health check rating
const parseHealthCheckRating = (hcr: unknown): HealthCheckRating => {
  if (typeof hcr !== 'number' || !isHealthCheckRating(hcr)) {
    throw new Error('Incorrect health check rating: ' + hcr);
  }
  return hcr;
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

export const toNewEntry = (object: unknown): NewEntry => {
  /* the first type guard checks that the parameter object exists and it has the type object */
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  let entryObj = {};

  /* the second type guard uses the in operator to ensure that the object has all the desired fields: */
  if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object)  {
    const type : EntryType = parseType(object.type);

    if ('type' in object) {
      switch (type) {
        case "HealthCheck": {
          if ('healthCheckRating' in object) {
            entryObj = {
              healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
              ...entryObj
            };
          }
          break;
        }

        case "OccupationalHealthcare": {
          if ('employerName' in object) {
            entryObj = {
              ...entryObj,
              employerName: parseEmployerName(object.employerName)
            };
          }
          break;
        }
        case "Hospital": {
          if ('discharge' in object) {
            entryObj = {
              ...entryObj,
              discharge: parseDischarge(object.discharge)
            };
          }
          break;
        }
        default: {
          throw new Error(("Error"));
        }
      }
    }

    if('diagnosisCodes' in object)
    {
      entryObj = {...entryObj, diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)};
    }

  return {
    ...entryObj,
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    type: parseType(object.type),
    
  } as NewEntry;
}

throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;