'use client'
/* eslint-disable react/prop-types */
import { Box, CircularProgress, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import GameService from '../api/gameService';
import GameStatus from '../type/gameStatus';
import TeamGame from '../type/teamGame';
import TeamLogo from './TeamLogo';
import TeamScheduleHeader from './TeamScheduleHeader';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTeamSchedules } from '../store/scheduleListSlice';
import Schedule from '../type/schedule';
import useWindowSize from '../hook/useWindowSize';

interface MyProps {
    teamId: number;
    year: number;
}

// const height = 65;
const width = 180;

const TeamSchedule: React.FC<MyProps> = ({ teamId, year }) => {    
    const windowSize = useWindowSize();
    const windowHeight = windowSize.height;

    const [games, setGames] = useState<TeamGame[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const schedules = useAppSelector(state => state.scheduleList.yearSchedules);
    const DEFAULT = 50;
    let logoHeight = DEFAULT;    // Default value
    if (games.length > 0)
        logoHeight = (windowHeight - 80) / games.length;
    if (logoHeight > DEFAULT)
        logoHeight = DEFAULT;
    // // let fontSize = logoHeight / 5 + 4;
    // if (fontSize > 16)
    //     fontSize = 16;    
    let fontSize = 17;

    // Update schedule list whenever year changes
    // TODO find way to have only one call on page load
    useEffect(() => {
        setLoading(true);
        GameService.getAllTeamSchedules(year).then(response => {
            dispatch(setTeamSchedules(response as Schedule[]));
            setLoading(false);
        });
    }, [dispatch, year]);

    useEffect(() => {
        const schedule = schedules.find(s => s.teamId === teamId);
        // TODO test this undefined check
        if (schedule !== undefined)
            setGames(schedule.games);
    }, [schedules, teamId]);

    const getGameStatusColor = (gameStatus: GameStatus) => {
        switch(gameStatus) {
        case 'W':
            return 'green';
        case 'L':
            return 'red';
        default:
            return 'black';
        }
    };

    return (
        <Stack justifyContent="space-between" position="sticky" top="0">
            <Stack justifyContent="center" textAlign="center" position="sticky" top="0">
            <Paper elevation={5}>
                <Box
                    height={50}
                    width={width}
                >
                    <TeamScheduleHeader teamId={teamId} year={year}/>
                </Box>
                {loading ?
                    <Paper
                        style={{backgroundColor: 'white', height: logoHeight, width: width}}                        
                    >
                        <CircularProgress/>
                    </Paper>            
                    : games.map(game => (
                        <Stack
                            key={game.id}		
                            style={{height: logoHeight + 2, width: width}}>
                            <Grid container padding={1} alignItems="center" direction="row" alignContent="center" width="100%" height="100%">
                                <Grid container xs={6} justifyContent="center">
                                    <TeamLogo teamId={game.opponentTeamId} maxHeight={logoHeight-3} xy isSchedule fontSize={fontSize - 3}/>
                                </Grid>
                                <Grid xs={1} fontSize={{fontSize}} alignItems="center">
                                    <b style={{color: getGameStatusColor(game.gameStatus)}}>
                                        {game.gameStatus}
                                    </b>
                                </Grid>
                                <Grid xs={5} fontSize={{fontSize}}>
                                    {' ' + game.teamPoints + ' - ' + game.opponentTeamPoints}
                                </Grid>
                            </Grid>
                        </Stack>
                    ))}
            </Paper>
            </Stack>
        </Stack>
    );
};

export default TeamSchedule;