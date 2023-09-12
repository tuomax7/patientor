import { Box, Typography, List, ListItem } from '@mui/material';
import { Diagnosis, Entry } from "../types";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthRatingBar from './HealthRatingBar';


interface EntryProps {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryComponent = ({entry, diagnoses}: EntryProps) => {


	if(diagnoses){


		switch(entry.type){
			case "Hospital":

				return (
					<Box sx={{ m: 1, p: 2, border: 1, borderRadius: '16px' }}>
						<LocalHospitalIcon />
						<BaseEntry entry={entry} diagnoses={diagnoses} />
						
					</Box>
				)

				

			case "OccupationalHealthcare":

				return (
					<Box sx={{ m: 1, p: 2, border: 1, borderRadius: '16px' }}>
						<WorkIcon />
						{entry.employerName}
						<BaseEntry entry={entry} diagnoses={diagnoses} />
						
					</Box>
				)

			case "HealthCheck":

				return (
					<Box sx={{ m: 1, p: 2, border: 1, borderRadius: '16px' }}>
						<FavoriteIcon />
						<BaseEntry entry={entry} diagnoses={diagnoses} />

						<HealthRatingBar rating={entry.healthCheckRating} showText={false} />
						
					</Box>
				)

			default:
				return assertNever(entry);
		}
	}
	return (<Box><Typography>Cannot load entry data!</Typography></Box>)
};



const BaseEntry = ({entry, diagnoses}: EntryProps) => {

	const getDiagnoseName = (code: string) => {
		const diagnosis = diagnoses.find(d => d.code === code)
		if(diagnosis) return diagnosis.name
		return "Unknown"
	}

	return(
		<Box>
			<Typography>{entry.date}</Typography>
			<Typography sx={{fontStyle: 'italic'}}>{entry.description}</Typography>

			{entry.diagnosisCodes ? 

			<List>
				{entry.diagnosisCodes.map(code => <ListItem key={code}>{code}: {getDiagnoseName(code)}</ListItem>)}
			</List> 
			
			: <Typography>No diagnosis codes.</Typography>
			}
			<Typography>Diagnosed by: {entry.specialist}</Typography>

		</Box>
	)
}

export default EntryComponent;
