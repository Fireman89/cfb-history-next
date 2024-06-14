'use client'

/* eslint-disable react/prop-types */
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from 'react';
import RecordService from '../api/recordService';
import { Conference } from '../type/conference';
import ConfStandings from './ConfStandings';

interface MyProps {
    year: number
}

const ConfGrid: React.FC<MyProps> = ({ year }) => {
    const [conferences, setConferences] = useState<Conference[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        setLoading(true);
        RecordService.getAllConferenceStandings(year).then(response => {
            const confResponse = response as Conference[];
            confResponse.sort((a,b) => {
                return a.name.localeCompare(b.name);
            });
            setConferences(confResponse);
            setLoading(false);
        });
    }, [year]);

    return (
        <div>
            <Grid container direction="row" spacing={3} mb={5} justifyContent="center">
                {conferences.map(conf => (
                    <Grid key={conf.name}>
                        <ConfStandings conference={conf} loading={loading}/>
                    </Grid>
                ))}            
            </Grid>
        </div>
    );
};

export default ConfGrid;