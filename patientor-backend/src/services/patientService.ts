import patients from '../../data/patients';
import { /*Patient,*/ NonSensitivePatient } from '../types';

const getPatientsWithoutSSN = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

export default {
    getPatientsWithoutSSN
};