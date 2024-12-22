'use client'

import { Box, Stack, Typography } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
import ConfGrid from '../component/ConfGrid';
import ConfYear from '../component/ConfYear';
import TeamSchedule from '../component/TeamSchedule';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { NO_TEAM } from '../store/currentScheduleSlice';
import Rankings from '../component/Rankings';
import useWindowSize from '../hook/useWindowSize';
import { useEffect } from 'react';
import TeamService from '../api/teamService';
import { setTeamList } from '../store/teamListSlice';
import { Team } from '../type/team';
import { FIRST_YEAR, desktopHeight, desktopWidth } from '../const/const';

import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

interface MyProps {
    year: string;
}

// Main page containing all elements
const SchedulePageNew: React.FC<MyProps> = ({ year }) => {    
    const windowSize = useWindowSize();
    const isDesktopWidth = windowSize.width >= desktopWidth;
    const isDesktopHeight = windowSize.height >= desktopHeight;

    const teamId = useAppSelector(state => state.schedule.teamId);
    const router = useRouter();
 
    const currentYear: number = parseInt(year,10);
    const isValidYear = currentYear >= FIRST_YEAR && currentYear < 2023;
    function setCurrentYear(year: number) {
        router.push(`/year/${year}`);
    }
    function incrementYear() {
        setCurrentYear(currentYear + 1);
    }
    function decrementYear() {
        setCurrentYear(currentYear - 1);
    }
    const isTeam: boolean = teamId !== NO_TEAM;

    const dispatch = useAppDispatch();
    // Call once when initialized
    // TeamService.getAllTeamsInYear(currentYear).then(response => {
    //     dispatch(setTeamList(response as Team[]));
    // });
    useEffect(() => {
        // Update years once current year is changed
        if (isValidYear) {
            TeamService.getAllTeamsInYear(currentYear).then(response => {
                dispatch(setTeamList(response as Team[]));
            });
        }
    },[currentYear, dispatch, isValidYear]);
    return (
        isValidYear ?
            <Stack direction="column" alignItems="center" spacing={1} paddingTop={1}
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(211, 211, 211, 0.5), rgba(211, 211, 211, 0.5)),
                    url('https://cfbh-logos.s3.us-east-2.amazonaws.com/pennstate.jpg')
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat-y",
                    backgroundAttachment: "fixed",
                    width: "100%",
                    minHeight: "100vh",
                }}
            >
                {(!isDesktopWidth || !isDesktopHeight) && 
                    <Typography>Tap a team to view its schedule.</Typography>
                }
                <ConfYear 
                    defaultYear={currentYear}
                    onChange={setCurrentYear}
                    incrementYear={incrementYear}
                    decrementYear={decrementYear}
                />
                <Stack direction="row" justifyContent="center" paddingLeft={8} paddingRight={8} spacing={8}>
                    {isDesktopWidth && isDesktopHeight &&
                    (isTeam ? 
                        <TeamSchedule 
                            teamId={teamId}
                            year={currentYear}
                        />
                        :                        
                        <Stack justifyContent="space-between">
                            <Stack justifyContent="center" position="sticky" top="0">  
                                <Box
                                    style={{ height: '55px', width: '200px', backgroundColor: 'white' }}
                                >
                                    <Typography style={{ margin: 2, fontSize: 16 }}>
                                        Hover over or tap a team to see their schedule.
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    )
                    }
                    <ConfGrid year={currentYear}/>
                    {isDesktopWidth && 
                        <Rankings
                            year={currentYear}
                            height={50}
                            width={120}
                            logoHeight={40}
                        />
                    }
                </Stack>
            </Stack>
            :
            <>
                <h1>Invalid Year</h1>
            </>            
    );
};

export default SchedulePageNew;