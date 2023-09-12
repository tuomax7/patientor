import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import { Diagnosis, Patient } from "../types";
import patientService from "../services/patients";
import diagnoseService from "../services/diagnoses";

import EntryComponent from './EntryComponent';


const PatientPage = () => {
	const { id } = useParams()

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
		const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAllDiagnoses();
      setDiagnoses(diagnoses);
    };
    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);




	if(patient && diagnoses){

		return (
			<Box>
					<Typography variant="h2">{patient.name} ({patient.gender})</Typography>
					<Typography>SSN: {patient.ssn}</Typography>
					<Typography>Occupation: {patient.occupation}</Typography>
					<Box>
						<Typography variant="h3">Entries</Typography>
						{patient.entries.map(entry => <EntryComponent key={entry.id} entry={entry} diagnoses={diagnoses}/>)}
					</Box>
			</Box>
		);
	}
	return (<Box><Typography>Patient not found!</Typography></Box>)



  
};

export default PatientPage;
