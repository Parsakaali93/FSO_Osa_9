import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { useState, useEffect } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkSharpIcon from '@mui/icons-material/QuestionMarkSharp';

const PatientPage = () => {
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
            </div>
        )}
        </div>
    );
};

export default PatientPage;