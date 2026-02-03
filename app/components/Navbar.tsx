"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

//chat gpt write the alt text for me
const Navbar = () => {
  const [isSignedIn, setisSignedIn] = useState(false);
  return (
    <header>
      <nav
        aria-label="Main navigation"
        className="flex justify-between text-sm gap-5 items-center sm:text-[17px]"
      >
        <Link href="/" aria-label="Home">
          <Image height={45} width={137} src="/logo.svg" alt="" />
        </Link>
        <ul className="flex gap-3.75 sm:gap-11.25 items-center shrink-0">
          <li>
            <Link href={""} className="flex gap-1.75 items-center">
              <Image
                height={25}
                width={25}
                src="/icons/track-icon.svg"
                alt=""
              />
              <span>Track</span>
            </Link>
          </li>
          <li>
            <Link href={""} className="flex gap-1.75 items-center">
              <Image height={28} width={28} src="/icons/airplane.svg" alt="" />
              <span>Search</span>
            </Link>
          </li>
          <li>
            {isSignedIn ? (
              <Link
                href={""}
                className="flex gap-1.75 items-center"
                aria-label="Account menu"
              >
                <Image
                  height={40}
                  width={40}
                  src="/Avatar3.png"
                  alt=""
                  className="rounded-full"
                />
              </Link>
            ) : (
              <Link href={""} className="flex gap-1.75 items-center">
                <Image
                  height={23}
                  width={23}
                  src="/icons/avatar-icon.svg"
                  alt=""
                />
                <span>Log in</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
