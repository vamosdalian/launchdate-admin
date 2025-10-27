export interface Rocket {
  id: number;
  external_id?: number;
  name: string;
  description: string;
  height: number;
  diameter: number;
  mass: number;
  company_id?: number;
  company?: string;
  imageUrl: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface RocketLaunchProvider {
  id: number;
  name: string;
  slug: string;
}

export interface RocketLaunchVehicle {
  id: number;
  name: string;
  company_id?: number;
  slug: string;
}

export interface RocketLaunchPadLocation {
  id: number;
  name: string;
  state: string;
  statename: string;
  country: string;
  slug: string;
}

export interface RocketLaunchPad {
  id: number;
  name: string;
  location?: RocketLaunchPadLocation;
}

export interface RocketLaunchMission {
  id: number;
  external_id?: number;
  name: string;
  description: string;
}

export interface RocketLaunchTag {
  id: number;
  text: string;
}

export interface Launch {
  id: number;
  external_id?: number;
  cospar_id: string;
  sort_date: string;
  name: string;
  launch_date: string;
  description?: string;
  provider?: RocketLaunchProvider;
  provider_id?: number;
  vehicle?: RocketLaunchVehicle;
  rocket_id?: number;
  pad?: RocketLaunchPad;
  launch_base_id?: number;
  missions?: RocketLaunchMission[];
  mission_description: string;
  launch_description: string;
  win_open?: string;
  t0?: string;
  win_close?: string;
  date_str: string;
  tags?: RocketLaunchTag[];
  slug: string;
  weather_summary: string;
  weather_temp?: number;
  weather_condition: string;
  weather_wind_mph?: number;
  weather_icon: string;
  weather_updated?: string;
  quicktext: string;
  suborbital: boolean;
  modified?: string;
  status: 'scheduled' | 'successful' | 'failed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface News {
  id: number;
  title: string;
  summary: string;
  content?: string;
  date: string;
  url: string;
  imageUrl: string;
  created_at?: string;
  updated_at?: string;
}

export interface LaunchBase {
  id: number;
  external_id?: number;
  name: string;
  location: string;
  country: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  updated_at?: string;
}

export interface Company {
  id: number;
  external_id?: number;
  name: string;
  description: string;
  founded: number;
  founder: string;
  headquarters: string;
  employees: number;
  website: string;
  imageUrl: string;
  created_at?: string;
  updated_at?: string;
}
