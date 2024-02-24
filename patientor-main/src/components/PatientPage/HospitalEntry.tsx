import { Diagnosis, Entry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface EntryProps {
    entry: Entry;
    diagnoses: Diagnosis[];
  }
    
const HospitalEntry: React.FC<EntryProps> = ({entry, diagnoses}) => {
    const getNameFromCode = (code: string): string | undefined => {

        const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
        return diagnosis ? diagnosis.name : undefined;
      };

      console.log(entry);

    return (
        <div style={{border:"1px solid black", padding: 10, borderRadius: 15, margin: 15, marginLeft: 0}}>
            <div  style={{display:"flex"}}><p>{entry.date}</p><LocalHospitalIcon /></div>
            <i>{entry.description}</i>
            <div>
                <ul>{entry.diagnosisCodes && entry.diagnosisCodes.map((d) => <li>{d + " "}{getNameFromCode(d)}</li>)}</ul>
            </div>
        </div>
    );
};

export default HospitalEntry;