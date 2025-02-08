'use client'
/* eslint-disable react/prop-types */
import { Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Conference } from '../type/conference';
import TeamRecord from './TeamRecord';
import useWindowSize from '../hook/useWindowSize';
import { useState } from 'react';
import { zoomWidth } from '../const/const';

interface MyProps {
    conference: Conference;
    loading: boolean;
}

// Rectangular standings of every team in conference
const ConfStandings: React.FC<MyProps> = ({ conference, loading }) => {
    const windowSize = useWindowSize();
    const [display, setDisplay] = useState(true);
    const isZoomWidth = windowSize.width >= zoomWidth;

    const height = isZoomWidth? 120 : 70;
    const width  = isZoomWidth? 120 : 70;
    const logoHeight = isZoomWidth? 70 : 40;
    const fontSize = isZoomWidth? 18 : 14;

    return (
        <Stack direction="column" spacing={1} alignItems="flex-start">
      {/* Header with conference name */}
      <Paper
        component={Stack}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        elevation={5}
        sx={{
          cursor: 'pointer',
          padding: '5px 15px',
          background: 'lightgray',
        }}
      >
        <b>{conference.name}</b>
      </Paper>

      {/* Row/grid of TeamRecords */}
      {display && (
        <Grid container spacing={3}>
        {conference.divisions.map((div) => (
          <Grid container spacing={2} key={div.name} alignItems="center"
            direction={isZoomWidth? "column" : "row"}>
            {div.name && (
              <Grid 
                sx={{
                  width: isZoomWidth? "50px" : "100%",
                  height: isZoomWidth? "100%": "30px",
                  padding: "4px",
                }}
              >
                <Paper
                  elevation={5}
                  sx={{
                    width: "80%",
                    height: "100%", // Makes the Paper extend fully in the parent Grid
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Typography
                    sx={{                      
                      ...(isZoomWidth ? {transform: "rotate(-90deg)"} : { }),
                      transformOrigin: "center",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {div.name}                    
                  </Typography>
                </Paper>
              </Grid>
            )}
      
          <Grid container spacing={1} xs>
            {/* Teams in the Division, sorted by name */}
            {div.teams
              .slice() // Copy the array to avoid mutation
              .sort((a, b) => {
                // Calculate conference win percentage for both teams
                const aConfWinPercentage =
                  a.totalConfWins / (a.totalConfWins + a.totalConfLosses) || 0;
                const bConfWinPercentage =
                  b.totalConfWins / (b.totalConfWins + b.totalConfLosses) || 0;

                // If conference win percentages are the same, compare total win percentages
                if (aConfWinPercentage === bConfWinPercentage) {
                  const aOverallWinPercentage =
                    a.totalWins / (a.totalWins + a.totalLosses) || 0;
                  const bOverallWinPercentage =
                    b.totalWins / (b.totalWins + b.totalLosses) || 0;
                  return bOverallWinPercentage - aOverallWinPercentage; // Sort by overall win percentage if needed
                }

                // Otherwise, sort by conference win percentage
                return bConfWinPercentage - aConfWinPercentage; // Sort in descending order
              })
              .map((team) => (
                <Grid key={team.id}>
                  <TeamRecord
                    record={team}
                    loading={loading}
                    width={width}
                    height={height}
                    logoHeight={logoHeight}
                    fontSize={fontSize}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      )}
    </Stack>
    );
};

export default ConfStandings;