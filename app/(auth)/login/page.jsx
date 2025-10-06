"use client";
// import Link from "next/link";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { fetchSignInMethodsForEmail } from "firebase/auth";



export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const provider2 = new GithubAuthProvider();

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, provider2);
      router.push("/home"); // login ke baad home pe bhej do
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = error.credential;
        const email = error.customData.email;

        // email ke saath connected providers find karo
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods.includes("google.com")) {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          await result.user.linkWithCredential(pendingCred);
          router.push("/home"); // login ke baad home pe bhej do
        }
        else if (methods.includes("password")) {
          setError("Please login using your email and password.");
        }
      } else {
        console.error("GitHub login failed:", error);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/home"); // login ke baad home pe bhej do
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful ✅");
      router.push("/"); // Login ke baad home page pe bhej do (ya apna dashboard)
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-blacks300">
      <img src="../../../auth-bg.png" className="w-full h-full object-cover" />
      <div className="absolute w-96 h-screen flex flex-col items-center justify-center gap-6">
        <img src="../../../lettermark.svg" alt="logo" />
        <div className="w-96 h-[540px] flex flex-col justify-center items-center bg-white/0 rounded-3xl outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-[30px] overflow-hidden">
          <h1 className="text-2xl font-extralight">Welcome Back</h1>
          <div className="text-[var(--whites100)] *:[a]:hover:text-[var(--primary400)] text-center text-sm text-balance *:[a]:underline mb-3 *:[a]:underline-offset-1">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
          <form onSubmit={handleLogin} className="flex w-5/6 flex-col gap-4">
            <div className="text-[var(--whites100)] font-light text-[16px] w-full h-fit">
              Email
            </div>
            <input
              type="email"
              placeholder="me@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 px-3 bg-white/0 rounded-lg outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-[30px] text-[16px] text-white focus:outline-[var(--primary400)]"
            />
            <div className="text-[var(--whites100)] font-light text-[16px] flex justify-between w-full h-fit">
              Password{" "}
              <span>
                <a href="/forgot-pass">forgot password?</a>
              </span>{" "}
            </div>
            <div className="h-11 bg-white/0 rounded-lg outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-[30px] text-[16px] text-white focus:outline-[var(--primary400)]">
              <input
                placeholder="########"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                autoComplete="current-password"
                style={{ paddingRight: "2.5rem" }} // Extra padding for the button
                type={showPassword ? "text" : "password"} // Toggle type based on state
                required
                className="h-full w-full px-3 bg-white/0 rounded-lg outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-[30px] text-[16px] text-white focus:outline-[var(--primary400)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
              >
                {showPassword ? (
                  // 👁 Eye Open (Hide Password button)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  // 👁‍🗨 Eye Off (Show Password button)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.042-3.362M6.223 6.223A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-2.042 3.362M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3l18 18"
                    />
                  </svg>
                )}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--primary400)] h-11 hover:bg-[var(--primary500)] transition text-white font-medium rounded-lg"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            <div className="text-[var(--whites100)] font-light text-[16px] flex justify-between items-center w-full h-fit">
              <span className="bg-[var(--whites200)] rounded-full relative z-10 w-1/4 h-[1px] "></span>{" "}
              or continue with
              <span className="bg-[var(--whites200)] rounded-full relative z-10 w-1/4 h-[1px] "></span>
            </div>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="h-11 hover:bg-white/5 w-5/6 my-4 bg-white/0 rounded-lg outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-[30px] text-[16px] text-white gap-2 focus:outline-[var(--primary400)] flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
            </svg>
            Login with Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="h-11 w-5/6 bg-white/0 hover:bg-white/5  gap-2 rounded-lg outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-[30px] text-[16px] text-white focus:outline-[var(--primary400)] flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" />
            </svg>
            Login with GitHub
          </button>
        </div>
        <div className="text-[var(--whites100)] *:[a]:hover:text-[var(--primary400)] text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-1">
          By clicking continue, you agree to our{" "}
          <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
