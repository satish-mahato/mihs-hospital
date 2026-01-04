export type TeamMember = {
  id?: string | number;
  name?: string;
  position?: string;
  bio?: string;
  email?: string;
  imageUrl?: string;
  imageurl?: string;
  order?: number;
  [key: string]: any;
};

export type TeamResponse = {
  success?: boolean;
  teamMembers?: TeamMember[] | { teamMembers?: TeamMember[] };
  [key: string]: any;
};

export default TeamMember;
