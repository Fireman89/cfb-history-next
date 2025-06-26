export type Team = {
  id: number;
  fullName: string;
  school: string;
  mascot: string;
  logo: string | null;
  currentLogo?: string | null;
};

export type TeamResponse = {
  id: number;
  full_name: string;
  school: string;
  mascot: string;
  logo: string | null;
  current_logo?: string | null;
};
