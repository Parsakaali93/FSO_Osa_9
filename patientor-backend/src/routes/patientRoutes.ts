import patientService from "../services/patientService";
import express from 'express';
import toNewPatient from '../utils';
import { toNewEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSSN());
});

// Route to get info for one patient
router.get('/:id', (req, res) => {
    const patient = patientService.getOnePatient(req.params.id);

    if(patient)
    {
        res.send(patient);
    }

    else
    {
        res.status(404).send('Patient not found');
    }
});

// Route for posting a new patient
router.post('/', (req, res) => {
    console.log(req.body);
    const newPatient = toNewPatient(req.body);
    const added = patientService.addPatient(newPatient);
    res.json(added);
});

// Route for posting a new entry for the patient
router.post('/:id/entries', (req, res) => {
    const patient = patientService.getOnePatient(req.params.id);
    
    if(!patient)
        res.status(404).send("Patient not found");

    console.log(req.body);
    const newEntry = toNewEntry(req.body);
    const added = patientService.addEntry(newEntry, patient);
    res.json(added);
});

export default router;