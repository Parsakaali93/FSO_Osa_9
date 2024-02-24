import { useState, useEffect } from "react";
// import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

// import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnoses";

import PatientListPage from "./components/PatientListPage";
import PatientPage from "./components/PatientPage/PatientPage";

const App = () => {
  /*  the function setPatients has type React.Dispatch<React.SetStateAction<Patient[]>>.
  We can see the type in the editor when we hover over the function: */
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
      const fetchPatientList = async () => {
        const patients = await patientService.getAll();
        setPatients(patients);
      };

      void fetchPatientList();
    }, []);

    useEffect(() => {
      const fetchDiagnoses = async () => {
        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
      };
      
      void fetchDiagnoses();
    }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            {/* Component App passes the function setPatients as a prop to the component PatientListPage: */}
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientPage diagnoses={diagnoses}/>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
