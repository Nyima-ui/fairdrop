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
  email: string;
}

export interface AlertProps {
  alert_id: string;
  created_id: string;
  destination: string;
  end_date: string;
  is_active: boolean;
  max_price: number;
  origin: string;
  start_date: string;
  user_id: string;
  email: string;
}

export interface ComparePricesProps {
  matchPrice: number;
  flights: FlightProps[];
}

export interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}