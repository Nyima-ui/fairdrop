export interface FlightProps {
  arrival: string;
  departure: string;
  duration: string;
  name: string;
  price: string;
  stops: number | string;
  airline_logo: string;
}

export interface FlightCardProps {
  destination: string;
  origin: string;
  flight: FlightProps;
}

export interface FormDataProps {
  userId: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  maxPrice: string;
}
