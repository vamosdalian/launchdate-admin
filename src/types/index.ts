export interface Rocket {
  id: string;
  name: string;
  description: string;
  height: number;
  diameter: number;
  mass: number;
  company: string;
  imageUrl: string;
  active: boolean;
}

export interface Launch {
  id: string;
  name: string;
  date: string;
  rocket: string;
  launchBase: string;
  status: 'scheduled' | 'successful' | 'failed' | 'cancelled';
  description: string;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  url: string;
  imageUrl: string;
}

export interface LaunchBase {
  id: string;
  name: string;
  location: string;
  country: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  founded: number;
  founder: string;
  headquarters: string;
  employees: number;
  website: string;
  imageUrl: string;
}
