
import { Diagnosis, Entry } from "../../types";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalEntry from "./OccupationalEntry";

interface EntryBoxProps {
    entry: Entry;
    diagnoses: Diagnosis[];
  }
    
const EntryBox: React.FC<EntryBoxProps> = ({entry, diagnoses}) => {
    // const getNameFromCode = (code: string): string | undefined => {

    //     const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    //     return diagnosis ? diagnosis.name : undefined;
    //   };

    //   console.log(entry);
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch(entry.type)
    {
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses}/>;
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} diagnoses={diagnoses}/>;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses}/>;
        default:
            return assertNever(entry);
    }
};

export default EntryBox;