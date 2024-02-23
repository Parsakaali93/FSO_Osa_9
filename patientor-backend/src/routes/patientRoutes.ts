import patientService from "../services/patientService";
import express from 'express';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatientsWithoutSSN());
});

// Route to get info for one patient
router.get('/:id', (req, res) => {
    const patient = res.send(patientService.getOnePatient(req.params.id));

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

    // res.send(
    //     patientService.addPatient(
    //         // {
    //         //     id: uuid(),
    //         //     name: "test name",
    //         //     dateOfBirth: "12-09-1991",
    //         //     ssn: "9438AB",
    //         //     gender: "Male",
    //         //     occupation: "Plumber"   
    //         // }

    //         toNewPatient(req.body)
    //     )
    // );
    

});

export default router;