export enum Country {
  POLAND = 'Poland',
  GERMANY = 'Germany',
  ROMANIA = 'Romania',
  AUSTRIA = 'Austria',
  LITHUANIA = 'Lithuania',
  LATVIA = 'Latvia',
  CZECH_REPUBLIC = 'Czech Republic',
  HUNGARY = 'Hungary',
  SLOVAKIA = 'Slovakia',
  ITALY = 'Italy',
  NETHERLANDS = 'Netherlands',
  BELGIUM = 'Belgium',
  FINLAND = 'Finland',
  FRANCE = 'France'
}

export interface Region {
  id: string;
  name: string;
  subRegions: string[];
}

export interface Company {
  name: string;
  address: string;
  phone: string;
  website: string;
  rating?: number;
  reviewCount?: number;
}

export interface SearchState {
  query: string;
  country: Country;
  selectedRegions: Record<string, string[]>; // Map of region ID to list of sub-regions
}