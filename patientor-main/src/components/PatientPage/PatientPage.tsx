import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import { useState, useEffect } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';

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

    const getNameFromCode = (code: string): string | undefined => {
        const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
        return diagnosis ? diagnosis.name : undefined;
      };

    return (
        <div>
        {patient && (
            <div>
                <h2>{patient.name}{patient.gender === 'male' && <MaleIcon />}
                        {patient.gender === 'female' && <FemaleIcon />}
                        {patient.gender === 'other' && <QuestionMarkSharpIcon />}</h2>
                <p style={{margin:0}}>{patient.ssn}</p>
                <p style={{margin:0}}>{patient.occupation}</p>
                <div>
                    {patient.entries.map((entry) => 
                    <div>
                        <p>{entry.date}</p>
                        <p>{entry.description}</p>
                        <ul>{entry.diagnosisCodes && entry.diagnosisCodes.map((d) => <li>{d + " "}{getNameFromCode(d)}</li>)}</ul>
                    </div>)
                    }</div>
            </div>
        )}
        </div>
    );
};

export default PatientPage;