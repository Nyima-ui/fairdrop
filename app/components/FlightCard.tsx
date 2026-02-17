import Image from "next/image";
import Link from "next/link";
import { FlightCardProps } from "@/types/component";
import { formatPrice } from "@/utils/formatter";

const FlightCard = ({ origin, destination, flight }: FlightCardProps) => {
  return (
    <li className="mb-5">
      <div className="bg-input-background flex px-8 py-3 justify-between items-center font-light rounded-sm max-lg:hidden">
        <div className="flex flex-col gap-0.5">
          <Image
            height={45}
            width={45}
            alt={`${flight.name} logo`}
            src={
              flight.airline_logo ??
              "https://images.kiwi.com/airlines/64x64/airlines.png"
            }
            className="rounded-sm"
          />
          <p>{flight.name}</p>
        </div>

        <div>
          <p>
            <span className="sr-only">Duration:</span>
            {flight.duration}
          </p>
        </div>

        <div>
          <p>
            <span className="sr-only">Flight type:</span>
            {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop`}
          </p>
        </div>

        <div className="flex w-67.25 justify-between items-center gap-4.25">
          <div>
            <p>
              <time dateTime={flight.departure.split(" on ")[0]}>
                {flight.departure.split(" on ")[0]}
              </time>
            </p>
            <p className="text-right">
              <abbr title={origin} style={{ textDecoration: "none" }}>
                {origin}
              </abbr>
            </p>
          </div>
          <div
            className="bg-foreground h-[1.5px] flex-1"
            aria-hidden="true"
          ></div>
          <div>
            <p>
              <time dateTime={flight.arrival.split(" on ")[0]}>
                {flight.arrival.split(" on ")[0]}
              </time>
            </p>
            <p>
              <abbr title={destination} style={{ textDecoration: "none" }}>
                {destination}
              </abbr>
            </p>
          </div>
        </div>

        <div>
          <p>
            <span className="sr-only">Price:</span>
            <span aria-label={formatPrice(flight.price)}>
              {formatPrice(flight.price)}
            </span>
          </p>
          <Link
            href="https://www.google.com/travel/flights?gl=IN&hl=en"
            target="_blank"
            className="flex gap-1.25"
          >
            <span>View in Google flights</span>
            <Image
              height={15}
              width={15}
              src="/icons/call_made.svg"
              alt="View in google flights"
            />
          </Link>
        </div>
      </div>

      <div className="bg-input-background hidden max-lg:flex justify-between flex-col py-2 px-5 max-sm:px-2 rounded-sm gap-4 max-sm:gap-1.5">
        <div className="flex justify-between gap-5">
          <Image
            height={30}
            width={30}
            alt={`${flight.name} logo`}
            src={
              flight.airline_logo ??
              "https://images.kiwi.com/airlines/64x64/airlines.png"
            }
            className="rounded-sm self-center"
          />

          <div className="flex w-63.75 items-center gap-3">
            <div>
              <p>
                <time dateTime={flight.departure.split(" on ")[0]}>
                  {flight.departure.split(" on ")[0]}
                </time>
              </p>
              <p className="text-right">
                <abbr title={origin} className="no-underline">
                  {origin}
                </abbr>
              </p>
            </div>
            <div
              className="bg-foreground h-[1.5px] flex-1"
              aria-hidden="true"
            ></div>
            <div>
              <p>
                <time dateTime={flight.arrival.split(" on ")[0]}>
                  {flight.arrival.split(" on ")[0]}
                </time>
              </p>
              <p>
                <abbr title={destination} className="no-underline">
                  {destination}
                </abbr>
              </p>
            </div>
          </div>

          <p className="self-center">
            <span className="sr-only">Price:</span>
            <span
              aria-label={formatPrice(flight.price)}
              className="text-nowrap"
            >
              {formatPrice(flight.price)}
            </span>
          </p>
        </div>

        <dl className="text-base max-sm:text-[14px] text-foreground/70 flex justify-between items-baseline">
          <div>
            <dt className="sr-only">Airline:</dt>
            <dd>{flight.name}</dd>
          </div>
          <div>
            <dt className="sr-only">Duration:</dt>
            <dd>{flight.duration}</dd>
          </div>
          <div>
            <dt className="sr-only">Flight type:</dt>
            <dd>{flight.stops === 0 ? "Nonstop" : `${flight.stops} stop`}</dd>
          </div>
          <div>
            <Link
              href="https://www.google.com/travel/flights?gl=IN&hl=en"
              target="_blank"
            >
              Google flights <span className="sr-only">(opens in new tab)</span>
            </Link>
          </div>
        </dl>
      </div>
    </li>
  );
};

export default FlightCard;
