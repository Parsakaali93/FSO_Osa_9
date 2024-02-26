import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import {createEntry} from "../../services/patients";
import { HealthCheckRating, NewEntry, Diagnosis } from '../../types';

function NewEntryForm() {
    const { id } = useParams();

    const [selectedForm, setSelectedForm] = useState('');

    const [formData, setFormData] = useState({
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: '',
        DiagnosisCodes: '',
        employerName: '',
        sickLeaveStart: '',
        sickLeaveEnd: '',
        dischargeDate: '',
        dischargeCriteria: ''
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Submitting entry");
    e.preventDefault();

    const getHealthCheckRating = (key: string): HealthCheckRating => {
        switch(key)
        {
        case("Healthy"):
            return HealthCheckRating.Healthy;
            break;

        case("Low Risk"):
            return HealthCheckRating.LowRisk;
            break;
            
        case("High Risk"):
            return HealthCheckRating.HighRisk;
            break;
            
        case("Critical Risk"):
            return HealthCheckRating.CriticalRisk;
            break;

        default:
            throw new Error('Invalid healthCheckRating');
        }
      };

      function parseDiagnosisString(diagnosisString: string): Diagnosis['code'][] {
        // Split the string by comma and trim whitespace from each part
        const codes = diagnosisString.split(',').map(code => code.trim());
        return codes;
      }

    let newEntry={
        description: formData.description,
        specialist: formData.specialist,
        diagnosisCodes: parseDiagnosisString(formData.DiagnosisCodes),
        date: formData.date,
    } as NewEntry;

    switch(selectedForm){
        case "occupational":
        {
            // create occupational entry
            newEntry = {
                ...newEntry,
                type: "OccupationalHealthcare",
                employerName: formData.employerName,
                sickLeave: {
                    startDate: formData.sickLeaveStart,
                    endDate: formData.sickLeaveEnd
                }
            };
            break;
        }

        case "hospital":
        {
            // create hospital entry
            newEntry = {
                ...newEntry,
                type: "Hospital",
                discharge: {
                    date: formData.dischargeDate,
                    criteria: formData.dischargeCriteria
                }  
            };
            break;
        }

        case "healthcheck":
        {
            newEntry = {
                ...newEntry,
                type: "HealthCheck",
                healthCheckRating: getHealthCheckRating(formData.healthCheckRating)
            };
            break;
        }
    }

    createEntry(id as string, newEntry)

    .then(response => {
      console.log('Entry created successfully:', response);
    })
    .catch(error => {
      console.error("Error when creating entry: ", error);
    });

    console.log('Form data submitted:', formData);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedForm(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{border: "2px dotted black", borderRadius: 30, padding: 30, margin: 20, marginLeft: 0}}>
    <h2>New Entry</h2>
      <div className="newEntryInput">

        <div style={{marginTop: 40, marginBottom:20}}>
            <h4 style={{marginBottom: 6}}>Select entry type:</h4>
            <select style={{marginBottom: 20}} value={selectedForm} onChange={handleSelectChange}>
                <option value="healthcheck">Health Check</option>
                <option value="occupational">Occupational Healthcare</option>
                <option value="hospital">Hospital</option>
            </select>
        </div>

        <label htmlFor="Description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="newEntryInput">
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="newEntryInput">
        <label htmlFor="specialist">Specialist:</label>
        <input
          type="text"
          id="specialist"
          name="specialist"
          value={formData.specialist}
          onChange={handleChange}
        />
      </div>
      <div className="newEntryInput">
        <label htmlFor="DiagnosisCodes">Diagnosis Codes:</label>
        <input
          type="text"
          id="DiagnosisCodes"
          name="DiagnosisCodes"
          value={formData.DiagnosisCodes}
          onChange={handleChange}
        />
      </div>

      {selectedForm === "healthcheck" && <div className="newEntryInput">
        <label htmlFor="healthCheckRating">Health Check Rating:</label>
        <input
          type="text"
          id="healthCheckRating"
          name="healthCheckRating"
          value={formData.healthCheckRating}
          onChange={handleChange}
        />
      </div>}

      {selectedForm === "occupational" &&
        <div> 
            <div className="newEntryInput">
            <label htmlFor="employerName">Employer Name:</label>
            <input
            type="text"
            id="employerName"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
            />
        </div>
        
        <div className="newEntryInput">
            <label htmlFor="sickLeaveStart">Sick Leave Start:</label>
            <input
            type="text"
            id="sickLeaveStart"
            name="sickLeaveStart"
            value={formData.sickLeaveStart}
            onChange={handleChange}
            />
        </div>

            <div className="newEntryInput">
            <label htmlFor="sickLeaveEnd">Sick Leave End:</label>
            <input
            type="text"
            id="sickLeaveEnd"
            name="sickLeaveEnd"
            value={formData.sickLeaveEnd}
            onChange={handleChange}
            />
            </div>
        </div>
      }

        {selectedForm === "hospital" &&
        <div>   
        <div className="newEntryInput">
            <label htmlFor="dischargeDate">Discharge Date:</label>
            <input
            type="text"
            id="dischargeDate"
            name="dischargeDate"
            value={formData.dischargeDate}
            onChange={handleChange}
            />
        </div>

            <div className="newEntryInput">
            <label htmlFor="dischargeCriteria">Discharge Criteria:</label>
            <input
            type="text"
            id="dischargeCriteria"
            name="dischargeCriteria"
            value={formData.dischargeCriteria}
            onChange={handleChange}
            />
            </div>
        </div>
      }
      <button type="submit" style={{marginTop: 20}}>Submit</button>
    </form>
  );
}

export default NewEntryForm;
