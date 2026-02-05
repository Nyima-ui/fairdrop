"use client";
import { useState } from "react";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <form action="">
      <h1 className="text-3xl">{isSignIn ? "Log in" : "Create an account"}</h1>
      <fieldset>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border-foreground border"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-foreground border"
          />
        </div>
        {!isSignIn && (
          <div>
            <label htmlFor="phone-number">
              Phone <span className="text-sm">Optional</span>
            </label>
            <input
              type="tel"
              id="phone-number"
              name="phone-number"
              className="border-foreground border"
            />
          </div>
        )}
      </fieldset>
      <p className="inline">
        {isSignIn ? "Create an account?" : "Already have an account?"}
      </p>
      <span
        className="cursor-pointer underline"
        onClick={() => setIsSignIn((prev) => !prev)}
      >
        {isSignIn ? "Sign up" : "Sign in"}
      </span>
    </form>
  );
};

export default AuthPage;
