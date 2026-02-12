export interface SearchDetails {
  origin: string;
  destination: string;
  departure: string;
}

export interface Airport {
  name: string;
  id: string;
  city: string;
  city_id: string;
  distance?: string;
}

export interface Location {
  position: number;
  name: string;
  type?: string;
  id: string;
  airports?: Airport[];
  description?: string;
}

export interface HandleSelectProps {
  locationName: string;
  iata: string;
}
