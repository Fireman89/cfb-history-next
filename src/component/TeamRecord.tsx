'use client'
/* eslint-disable react/prop-types */
import { Box, CircularProgress, Grid, Modal, Paper, Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import { useAppDispatch }  from '../store/hooks';
import { setScheduleTeamId } from '../store/currentScheduleSlice';
import { SeasonRecord } from '../type/record';
import TeamLogo from './TeamLogo';
import useWindowSize from '../hook/useWindowSize';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TeamSchedule from './TeamSchedule';
import { desktopHeight, desktopWidth, zoomWidth } from '../const/const';

interface MyProps {
    record: SeasonRecord;
    height: number;
    width: number;
    loading: boolean;
    logoHeight: number
    fontSize: number;
}

// Box in ConfStandings per team containing logo & record
const TeamRecord: React.FC<MyProps> = ({ record, height, width, loading, logoHeight, fontSize }) => {   
    const [hover, setHover] = useState(false);
    const [showModal, setShowModal] = useState(false);
    function closeModal() {
        setShowModal(false);
    }
    const windowSize = useWindowSize();
    const isDesktopWidth = windowSize.width >= desktopWidth;
    const isZoomWidth = windowSize.width >= zoomWidth;
    const isDesktopHeight = windowSize.height >= desktopHeight;
    
    const dispatch = useAppDispatch();
    const team = record.team;
    // let shrinkFont: boolean = false;
    // if (isZoomWidth) {
    //     if (team.school.length > 20)
    //         shrinkFont = true;
    // } else {
    //     if (team.school.length >= 16)
    //         shrinkFont = true;
    // }

    return loading ? (
        <Stack
            width={width}
            height={height}
            alignItems="center"
            justifyContent="center"
            fontSize={fontSize}
            // zIndex={0}
            style={{ background: 'white' }}
        >
            <CircularProgress />
        </Stack>
        ) : (
        <>
            {/* If on mobile, allow user to tap team to pull up their schedule */}
            {(!isDesktopWidth || !isDesktopHeight) &&
                <Modal open={showModal} onClose={() => closeModal()} sx={{overflowY: 'scroll'}}>
                    <Box alignItems="center" sx={{ top: 0, left: 0, width: '100%', background: 'white'}}>
                        <CloseIcon
                            fontSize="large"
                            onClick={() => closeModal()}
                            sx={{ position: 'sticky' }}
                        />
                        <Stack direction="row" justifyContent="center" paddingLeft={5} paddingRight={5} spacing={2}>
                            <TeamSchedule teamId={team.id} year={record.year}/>
                        </Stack>
                    </Box>
                </Modal>
            }
            {/* Entry */}
            <Paper
                elevation={5}
            >
            <Stack
                direction="column"
                alignItems="center"
                alignContent="center"
                justifyContent="center"
                spacing={1}
                width={width}
                height={height}
                // zIndex={0}
                fontSize={fontSize}
                style={{
                    // background: hover ? '#f0f0f0' : 'white',
                    background: 'white',
                    borderRadius: 4,
                }}
                onMouseEnter={() => {
                    setHover(true);
                    dispatch(setScheduleTeamId(record.team.id));
                }}
                onMouseLeave={() => setHover(false)}
                onClick={() => setShowModal(true)}
            >
                <Grid container
                    direction="column"
                    alignItems="center"
                    alignContent="center"
                    height={height}
                    // zIndex={0}
                    wrap='nowrap'
                >
                <Grid item xs={8} alignContent="center">
                {/* Team logo */}
                <TeamLogo teamId={record.team.id} xy maxHeight={logoHeight} />
                </Grid>
                <Grid item xs={4} alignContent="center">
                {/* Team record */}
                <Box fontSize={fontSize}>
                    {record.totalWins + '-' + record.totalLosses}
                    {record.totalTies > 0 ? record.totalTies : ''}
                    {' (' + record.totalConfWins + '-' + record.totalConfLosses}
                    {record.totalConfTies > 0 ? record.totalConfTies + ')' : ')'}
                </Box>
                </Grid>
                </Grid>
            </Stack>
            </Paper>
        </>
        );
};

export default TeamRecord;