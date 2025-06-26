import TeamGame, { GameResponse } from "./teamGame";

type Schedule = {
  teamId: number;
  games: TeamGame[];
};

export type ScheduleResponse = {
  teamId: number;
  games: GameResponse[];
};

export default Schedule;
