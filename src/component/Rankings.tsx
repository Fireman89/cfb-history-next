'use client'
/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from '@mui/material';
import TeamLogo from './TeamLogo';
import RankingService from '../api/rankingService';
import Ranking from '../type/ranking';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppDispatch } from '../store/hooks';
import { setScheduleTeamId } from '../store/currentScheduleSlice';

interface MyProps {
  year: number;
  height: number;
  width: number;
  logoHeight: number;
}

// AP Rankings displayed right of ConfGrid
const Rankings: React.FC<MyProps> = ({ year, height, width, logoHeight }) => {
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        RankingService.getFinalAPRankingsByYear(year).then((response) => {
            setRankings(response as Ranking[]);
        });
    }, [year]);

    // const rankingNumbers = Array.from({length: rankingCount}, (_, index) => index + 1);
    // Assumes rankings are already sorted from 1-25 on backend call
    return (
        <Stack justifyContent="space-between">
            {rankings.length > 0 ? (
                <Grid container justifyContent="center" direction="column">
                    <Grid style={{ width: width }}>
                        <Box
                            style={{ backgroundColor: 'white', height: '25px', width: width }}
                        >
                            <Typography>AP Ranking</Typography>
                        </Box>
                    </Grid>
                    {rankings.map((r) => (
                        <Grid key={r.id}>
                            <Stack
                                justifyContent="center"
                                direction="row"
                                sx={{ backgroundColor: 'white', height: height, width: width }}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    padding={1}
                                    width={width}
                                    onMouseEnter={() => dispatch(setScheduleTeamId(r.teamId))}
                                >
                                    <Grid xs={3}>
                                        <Typography>#{r.ranking}</Typography>
                                    </Grid>
                                    <Grid xs={9}>
                                        <Stack
                                            alignItems="center"
                                            alignContent="center"
                                            justifyContent="center"
                                        >
                                            <TeamLogo
                                                teamId={r.teamId}
                                                xy
                                                maxHeight={logoHeight}
                                                isSchedule
                                                fontSize={14}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                ''
            )}
        </Stack>
    );
};

export default Rankings;
