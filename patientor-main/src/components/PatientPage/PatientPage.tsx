import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import { useState, useEffect } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';
import EntryBox from "./EntryBox";
import NewEntryForm from "./NewEntryForm";

interface PatientPageProps {
    diagnoses: Diagnosis[]
  }

const PatientPage: React.FC<PatientPageProps> = ({diagnoses}) => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const p = await patientService.getOne(id as string);
                setPatient(p);
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };

        console.log(diagnoses);
        fetchPatient();
    }, [id]);

    return (
        <div>
        {patient && (
            <div>
                <h2>{patient.name}{patient.gender === 'male' && <MaleIcon />}
                        {patient.gender === 'female' && <FemaleIcon />}
                        {patient.gender === 'other' && <QuestionMarkSharpIcon />}</h2>
                <p style={{margin:0}}>{patient.ssn}</p>
                <p style={{margin:0}}>{patient.occupation}</p>

                <NewEntryForm />

                <div>
                    {patient.entries.map((entry) => 
                    <EntryBox entry={entry} diagnoses={diagnoses} />)
                    }</div>
            </div>
        )}
        </div>
    );
};

export default PatientPage;

/* {patient.entries.map((entry) => 
                    <div>
                        <p>{entry.date}</p>
                        <p>{entry.description}</p>
                        <ul>{entry.diagnosisCodes && entry.diagnosisCodes.map((d) => <li>{d + " "}{getNameFromCode(d)}</li>)}</ul>
                    </div>)
                    } */