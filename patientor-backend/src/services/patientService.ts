import patients from '../../data/patients';
import { /*Patient,*/ NewPatient, NonSensitivePatient, Patient, NewEntry, Entry } from '../types';
import { v4 as uuid } from 'uuid';

const getPatientsWithoutSSN = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({id, name, dateOfBirth, gender, occupation, entries}));
};

const getOnePatient = (id: string): Patient => {
    const patient = patients.find(patient => patient.id === id);

    if(patient)
        return patient;

    throw new Error("Patient not found");
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (entry: NewEntry, patient: Patient): Entry => {    
    const newEntry = {
        id: uuid(),
        ...entry
    };

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatientsWithoutSSN,
    addPatient,
    getOnePatient,
    addEntry
};