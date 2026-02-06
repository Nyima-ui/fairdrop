"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);

      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        formRef.current?.reset();
        router.push("/");
      } else {
        const phone = formData.get("phone-num") as string;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            ...(phone && { data: { phone } }),
          },
        });
        if (error) throw error;
        formRef.current?.reset();
        router.push("/");
      }
    } catch (error) {
      setError((error as Error).message);
      console.error("Authentication error:", (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-between gap-7.5">
      <div className="pl-21.25 max-md:pl-0 pt-8 max-sm:pt-10 w-1/2 max-lg:w-full pb-10">
        <Link href="/">
          <Image
            height={45}
            width={137}
            src="logo.svg"
            alt="Logo - Return to home"
          />
        </Link>
        <form className="mt-8" onSubmit={handleSubmit} ref={formRef}>
          <div className="leading-[0.82]">
            <h1 className="font-semibold text-[23px]">
              {isSignIn ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-sm text-foreground/70 mt-5">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="underline cursor-pointer hover:text-primary ml-2"
                onClick={() => setIsSignIn((prev) => !prev)}
              >
                {isSignIn ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-110 mt-8.25">
            <label htmlFor="email" className="text-sm leading-[0.82]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              placeholder="ntenzin492@gmail.com"
              className="p-2.5 outline-none border-2 border-input-border rounded-sm w-full focus:border-primary focus:shadow-xs shadow-primary"
            />
          </div>

          <div className="flex flex-col gap-3 max-w-110 mt-8.25">
            <label htmlFor="password" className="text-sm leading-[0.82]">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              required
              placeholder="***********"
              className="p-2.5 outline-none border-2 border-input-border rounded-sm w-full focus:border-primary focus:shadow-xs shadow-primary"
            />
          </div>

          {!isSignIn && (
            <div className="flex flex-col gap-3 max-w-110 mt-8.25">
              <label htmlFor="phone-num" className="text-sm">
                Phone number (optional) for SMS notifications
              </label>
              <input
                type="tel"
                name="phone-num"
                id="phone-num"
                autoComplete="tel"
                placeholder="8899234654"
                className="p-2.5 outline-none border-2 border-input-border rounded-sm w-full focus:border-primary focus:shadow-xs shadow-primary"
              />
            </div>
          )}

          {error && <p className="text-sm mt-3 text-red-400">{error}</p>}

          <div className="flex flex-col gap-6.25 mt-8.25">
            <button
              type="submit"
              className={`max-w-110 py-3 font-medium px-5 rounded-sm transition-all duration-150 ease-in flex items-center justify-center gap-5 ${loading ? "cursor-not-allowed bg-btn-loading" : "bg-primary hover:bg-btn-hover cursor-pointer"}`}
              disabled={loading}
            >
              <span>{isSignIn ? "Continue" : "Create account"}</span>
              {loading && (
                <span className="size-6 border-3 border-white border-b-transparent rounded-full inline-block animate-spin"></span>
              )}
            </button>

            <div
              role="separator"
              className="flex items-center gap-2.5 max-w-110"
            >
              <span
                aria-hidden="true"
                className="flex-1 h-px bg-input-border"
              ></span>
              <span className="text-sm text-foreground/70">
                Or {isSignIn ? "log in" : "register"} with
              </span>
              <span
                aria-hidden="true"
                className="flex-1 h-px bg-input-border"
              ></span>
            </div>

            <button
              type="button"
              aria-label="Sign up with Google"
              className="max-w-110 py-3  font-medium px-5 rounded-sm cursor-pointer transition-all duration-150 ease-in flex items-center justify-center gap-3 border-input-border border hover:bg-[#161819] hover:border-transparent"
            >
              <Image
                height={27}
                width={27}
                src="/icons/google.svg"
                alt=""
                aria-hidden="true"
              />
              <span>Google</span>
            </button>
          </div>
        </form>
      </div>
      <div className="w-147.5 max-lg:hidden" aria-hidden="true">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          src="/images/airplane-flying-towards-you.png"
          alt=""
          aria-hidden="true"
          className="border"
        />
      </div>
    </main>
  );
};

export default AuthPage;
