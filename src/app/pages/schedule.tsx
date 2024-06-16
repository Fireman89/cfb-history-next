'use client'

import { Box, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ConfGrid from '../../component/ConfGrid';
import ConfYear from '../../component/ConfYear';
import TeamSchedule from '../../component/TeamSchedule';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { NO_TEAM } from '../../store/currentScheduleSlice';
import Rankings from '../../component/Rankings';
import useWindowSize from '../../hook/useWindowSize';
import { useEffect } from 'react';
import TeamService from '../../api/teamService';
import { setTeamList } from '../../store/teamListSlice';
import { Team } from '../../type/team';
import { FIRST_YEAR, desktopHeight, desktopWidth } from '../../const/const';

import { useRouter } from 'next/navigation'

type MyParams = {
    year: string;
}

const SchedulePage: React.FC = () => {    
    const windowSize = useWindowSize();
    const isDesktopWidth = windowSize.width >= desktopWidth;
    const isDesktopHeight = windowSize.height >= desktopHeight;

    const teamId = useAppSelector(state => state.schedule.teamId);
    const { year } = useParams<MyParams>();
    // const navigate = useNavigate();
    const router = useRouter();
    // TODO error check/exception redirect if it's not a parsable int
    const currentYear: number = parseInt(year as string);
    const isValidYear = currentYear >= FIRST_YEAR && currentYear < 2023;
    function setCurrentYear(year: number){
        // navigate('../year/'+(year).toString());
        router.push('../year/'+(year).toString());
    }
    function incrementYear() {
        // navigate('../year/'+(currentYear+1).toString());
        router.push('../year/'+(currentYear+1).toString());
    }
    function decrementYear() {
        // navigate('../year/'+(currentYear-1).toString());
        router.push('../year/'+(currentYear-1).toString());
    }
    const isTeam: boolean = teamId !== NO_TEAM;

    const dispatch = useAppDispatch();
    // Call once when initialized
    TeamService.getAllTeamsInYear(currentYear).then((response: any) => {
        dispatch(setTeamList(response as Team[]));
    });
    useEffect(() => {
        // Update years once current year is changed
        TeamService.getAllTeamsInYear(currentYear).then((response: any) => {
            dispatch(setTeamList(response as Team[]));
        });
    },[currentYear, dispatch]);
    return (
        isValidYear ?
            <Stack direction="column" alignItems="center" spacing={1} paddingTop={1}>
                {(!isDesktopWidth || !isDesktopHeight) && 
                    <Typography>Tap a team to view its schedule.</Typography>
                }
                <ConfYear 
                    defaultYear={currentYear}
                    onChange={setCurrentYear}
                    incrementYear={incrementYear}
                    decrementYear={decrementYear}
                />
                <Stack direction="row" justifyContent="center" paddingLeft={5} paddingRight={5} spacing={2}>
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
                            height={95}
                            width={160}
                            logoHeight={80}
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

export default SchedulePage;