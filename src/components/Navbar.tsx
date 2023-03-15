import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="mb-5 flex flex-wrap items-center border border-r-0 border-t-0 border-l-0 border-b-slate-400 py-8 text-inherit">
      <Link href="/" className="mr-6 flex flex-shrink-0 items-center">
        <svg
          className="text-color-white mr-4 h-8 w-8 stroke-white text-3xl"
          viewBox="0 0 20 20"
        >
          <polygon
            fill="none"
            points="18.198,7.95 3.168,7.95 3.168,8.634 9.317,9.727 9.317,19.564 12.05,19.564 12.05,9.727 18.198,8.634 "
          ></polygon>
          <path
            fill="none"
            d="M2.485,10.057v-3.41H2.473l0.012-4.845h1.366c0.378,0,0.683-0.306,0.683-0.683c0-0.378-0.306-0.683-0.683-0.683H1.119c-0.378,0-0.683,0.306-0.683,0.683c0,0.378,0.306,0.683,0.683,0.683h0.683v4.845C1.406,6.788,1.119,7.163,1.119,7.609v2.733c0,0.566,0.459,1.025,1.025,1.025c0.053,0,0.105-0.008,0.157-0.016l-0.499,5.481l5.9,2.733h0.931C8.634,13.266,5.234,10.458,2.485,10.057z"
          ></path>
          <path
            fill="none"
            d="M18.169,6.584c-0.303-3.896-3.202-6.149-7.486-6.149c-4.282,0-7.183,2.252-7.484,6.149H18.169z M15.463,3.187c0.024,0.351-0.103,0.709-0.394,0.977c-0.535,0.495-1.405,0.495-1.94,0c-0.29-0.268-0.418-0.626-0.394-0.977C13.513,3.827,14.683,3.827,15.463,3.187z"
          ></path>
          <path
            fill="none"
            d="M18.887,10.056c-2.749,0.398-6.154,3.206-6.154,9.508h0.933l5.899-2.733L18.887,10.056z"
          ></path>
        </svg>
        <span className="text-xl font-semibold tracking-tight">iconGPT</span>
      </Link>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
          <Link href="/create" className="nav-link">
            Create
          </Link>
          <Link href="/community" className="nav-link">
            Community
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
