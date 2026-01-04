export type SocialType = {
  id?: string | number;
  platform: string;
  url: string;
  iconUrl?: string;
  iconUrllink?: string;
  [key: string]: any;
};

export default SocialType;
