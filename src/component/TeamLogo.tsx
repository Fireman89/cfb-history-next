'use client'
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';

import Image from 'next/image'

const USE_COMPRESS: boolean = true;
const S3_LINK: string = 'https://cfbh-logos.s3.us-east-2.amazonaws.com/' + (USE_COMPRESS ? 'compress/' : '');

interface MyProps {
    teamId: number;
    maxHeight: number;
    maxWidth?: number;
    xy?: boolean;
    isSchedule?: boolean;
    fontSize?: number;
}

// Set this to true or false if we want to display copyrighted logos or not
const FETCH_IMAGE = true;

const TeamLogo: React.FC<MyProps> = ({ teamId, maxHeight, maxWidth, xy, isSchedule, fontSize }) => {
    const useCurrentLogo = useAppSelector(state => state.currentLogo.useCurrentLogo);
    const teams = useAppSelector(state => state.teamList.teamList);

    const [image, setImage] = useState<string>('');
    const [noImage, setNoImage] = useState<boolean>(false);
    const [school, setSchool] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    if (xy) {
        maxWidth = maxHeight;
    }

    useEffect(() => {
        setLoading(true);
        const team = teams.find(t => t.id === teamId);
        let logo = '';
        if (team !== undefined) {
            if (useCurrentLogo) {
                if (team.currentLogo !== null && team.currentLogo !== undefined)
                    logo = team.currentLogo as string;
                else
                    logo = '';
            } else {
                if (team.logo !== null && team.logo !== undefined)
                    logo = team.logo as string;
                else
                    logo = '';
            }
            if (FETCH_IMAGE && logo !== '') {
                logo = S3_LINK + logo;
                setImage(logo);
                setNoImage(false);
            } else {
                setNoImage(true);
            }
            setSchool(team.school);
            setLoading(false);
        }
    },[teamId, teams, useCurrentLogo]);
    
    return loading ? (
        <div>
            <CircularProgress/>
        </div>    
    ) : (noImage === false ? (
        <div>
            <img src={image} style={{ maxHeight: maxHeight, maxWidth: maxWidth, zIndex: -1, display: 'flex' }} alt="logo" height="auto" width="auto" title={school}/>
        </div>
    ) : (
        <div>
            {isSchedule ? (
                fontSize? (
                    <b style={{ fontSize: fontSize, display: 'flex' }}>{school}</b>
                ) : <b style={{ display: 'flex' }}>{school}</b>
            ) : ''}
        </div>
    )
    );
};

export default TeamLogo;