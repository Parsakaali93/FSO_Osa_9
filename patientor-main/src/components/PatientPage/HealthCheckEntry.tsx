import { Diagnosis, Entry } from "../../types";
import ThermostatIcon from '@mui/icons-material/Thermostat';

interface EntryProps {
    entry: Entry;
    diagnoses: Diagnosis[];
  }
    
const HealthCheckEntry: React.FC<EntryProps> = ({entry, diagnoses}) => {
    if(entry.type != 'HealthCheck')
        return null;

    const getNameFromCode = (code: string): string | undefined => {

        const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
        return diagnosis ? diagnosis.name : undefined;
      };

      console.log(entry);

    return (
        <div style={{border:"1px solid black", padding: 10, borderRadius: 15, margin: 15, marginLeft: 0}}>
            <div  style={{display:"flex"}}><p>{entry.date}</p><ThermostatIcon /></div>
            <i>{entry.description}</i>
            <div>
                <ul>{entry.diagnosisCodes && entry.diagnosisCodes.map((d) => <li>{d + " "}{getNameFromCode(d)}</li>)}</ul>
            </div>
            {'healthCheckRating' in entry && <div><p>Health Check Rating: {entry.healthCheckRating}</p></div>}
        </div>
    );
};

export default HealthCheckEntry;