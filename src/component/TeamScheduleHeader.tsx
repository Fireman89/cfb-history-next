'use client'
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAppSelector } from '../store/hooks';

interface MyProps {
    teamId: number;
    year: number;
}

// Appears above team's schedule on left of page
const TeamScheduleHeader: React.FC<MyProps> = ({ teamId, year }) => {
    const [school, setSchool] = useState<string>('');
    const teams = useAppSelector(state => state.teamList.teamList);

    useEffect(() => {
        const team = teams.find(t => t.id === teamId);
        if (team !== undefined)
            setSchool(team.school);
    },[teams, teamId, year]);
    return school !== '' ? (
        <>
            <Typography>{school}</Typography>
            <Typography>Schedule</Typography>
        </>
    ) : <></>;
};

export default TeamScheduleHeader;