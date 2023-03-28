import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="mb-5 flex flex-wrap items-center border border-r-0 border-t-0 border-l-0 border-b-slate-400 py-3 text-inherit">
      <Link href="/" className="mr-6 flex flex-shrink-0 items-center">
        <Image
          src="/logo.png"
          width={70}
          height={70}
          alt="astronaut"
          className="mr-3 rounded-full"
        />
        <span className="text-xl font-semibold tracking-tight">IconGPT</span>
      </Link>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
          <Link href="/create" className="nav-link">
            Create
          </Link>
          {session && (
            <Link href="/icons" className="nav-link">
              Your Icons
            </Link>
          )}
        </div>
        {session ? (
          <Image
            src={session.user.image as string}
            width={45}
            height={45}
            alt={session.user.name as string}
            className="rounded-full"
          />
        ) : (
          <button
            className="btn btn-primary bg-gradient-to-br from-purple-600 to-blue-500 transition ease-out hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => void signIn("google")}
          >
            <svg
              className="mr-2 -ml-1 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
}
