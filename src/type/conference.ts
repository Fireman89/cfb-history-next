import { SeasonRecord } from "./record";

export type Conference = {
  name: string;
  divisions: ConfDivision[];
  logo: string | null; // TODO add fetching conference logo
};
export type ConfDivision = {
  name: string; // Empty string if no divisions (i.e. only one team group)
  teams: SeasonRecord[]; // Expect these to be sorted by confwin% desc
};
