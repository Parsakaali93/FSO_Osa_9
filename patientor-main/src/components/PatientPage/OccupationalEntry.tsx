import { Diagnosis, Entry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface EntryProps {
    entry: Entry;
    diagnoses: Diagnosis[];
  }

interface SickLeave {
    startDate: string;
    endDate: string; 
}

const OccupationalEntry: React.FC<EntryProps> = ({entry, diagnoses}) => {
    if(entry.type != 'OccupationalHealthcare')
        return null;

    const getNameFromCode = (code: string): string | undefined => {

        const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
        return diagnosis ? diagnosis.name : undefined;
      };

      console.log(entry);

      const sickLeave = entry.sickLeave as SickLeave | undefined;

    return (
        <div style={{border:"1px solid black", padding: 10, borderRadius: 15, margin: 15, marginLeft: 0}}>
            <div style={{display:"flex"}}><p>{entry.date}</p><WorkIcon /></div>
            <i>{entry.description}</i>
            <div>
                <ul>{entry.diagnosisCodes && entry.diagnosisCodes.map((d) => <li>{d + " "}{getNameFromCode(d)}</li>)}</ul>
            </div>
            {'sickLeave' in entry && sickLeave && <div><p>Sick Leave Start: {sickLeave.startDate}</p><p>Sick Leave End: {sickLeave.endDate}</p></div>} 
        </div>
    );
};

export default OccupationalEntry;