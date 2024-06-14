import { Team } from './team';

export type SeasonRecord = {
    id: number;
    team: Team;   // | null;
    year: number;
    division: string;   // No division name means empty string
    conference: string;
    totalWins: number;
    totalLosses: number;
    totalTies: number;
    totalConfWins: number;
    totalConfLosses: number;
    totalConfTies: number;
};

// Potential TODO: rename teams to team
export type RecordResponse = {
    id: number;
    teams: {
        id: number,
        name_full: string,
        name_school: string,
        mascot: string
    };
    team_id: number;
    year: number;
    division: string;   // Optional
    conference: string;
    win_total: number;
    loss_total: number;
    tie_total: number;
    win_conf: number;
    loss_conf: number;
    tie_conf: number;
}