import Image from "next/image";
import Link from "next/link";

const FlightCard = () => {
  return (
    <li>
      <div className="bg-input-background flex px-8 py-3 justify-between items-center font-light rounded-sm max-lg:hidden">
        <div className="flex flex-col items-center gap-0.5">
          <Image
            height={45}
            width={45}
            //change this later
            alt="SpiceJet Airline logo"
            src="/spicejet.png"
            className="rounded-sm"
          />
          <p>Spice Jet</p>
        </div>

        <div>
          <p>
            <span className="sr-only">Duration:</span>1 hr 20 min
          </p>
        </div>

        <div>
          <p>
            <span className="sr-only">Flight type:</span>Nonstop
          </p>
        </div>

        <div className="flex w-67.25 justify-between items-center gap-4.25">
          <div>
            <p>
              {/* change this later */}
              <time dateTime="08:55">8:55 AM</time>
            </p>
            <p className="text-right">
              {/* change this later */}
              <abbr title="Delhi" style={{ textDecoration: "none" }}>
                DEL
              </abbr>
            </p>
          </div>
          <div
            className="bg-foreground h-[1.5px] flex-1"
            aria-hidden="true"
          ></div>
          <div>
            <p>
              {/* change this later  */}
              <time dateTime="14:20">2:20 PM</time>
            </p>
            {/* change this later  */}
            <p>
              <abbr title="Leh" style={{ textDecoration: "none" }}>
                IXL
              </abbr>
            </p>
          </div>
        </div>

        <div>
          <p>
            <span className="sr-only">Price:</span>
            {/* change this later */}
            <span aria-label="12,023 rupees">₹ 12,023</span>
          </p>
          <Link href="#" className="flex gap-1.25">
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
            // change this later
            alt="SpiceJet Airline logo"
            src="/spicejet.png"
            className="rounded-sm self-center"
          />

          <div className="flex w-63.75 items-center gap-3">
            <div>
              <p>
                {/* change this later */}
                <time dateTime="08:55">8:55 AM</time>
              </p>
              <p className="text-right">
                {/* change this later */}
                <abbr title="Delhi" className="no-underline">
                  DEL
                </abbr>
              </p>
            </div>
            <div
              className="bg-foreground h-[1.5px] flex-1"
              aria-hidden="true"
            ></div>
            <div>
              <p>
                {/* change this later  */}
                <time dateTime="14:20">2:20 PM</time>
              </p>
              {/* change this later  */}
              <p>
                <abbr title="Leh" className="no-underline">
                  IXL
                </abbr>
              </p>
            </div>
          </div>

          <p className="self-center">
            <span className="sr-only">Price:</span>
            {/* change this later */}
            <span aria-label="12,023 rupees" className="text-nowrap">
              ₹ 12,023
            </span>
          </p>
        </div>

        <dl className="text-base max-sm:text-[14px] text-foreground/70 flex justify-between items-baseline">
          <div>
            <dt className="sr-only">Airline:</dt>
            <dd>Air India</dd>
          </div>
          <div>
            <dt className="sr-only">Duration:</dt>
            <dd>1 hr 20 min</dd>
          </div>
          <div>
            <dt className="sr-only">Flight type:</dt>
            <dd>Nonstop</dd>
          </div>
          <div>
            <Link href="#">
              Google flights <span className="sr-only">(opens in new tab)</span>
            </Link>
          </div>
        </dl>


      </div>
    </li>
  );
};

export default FlightCard;
