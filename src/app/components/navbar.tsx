"use client";

import { useRouter } from "next/navigation";

type AddButtonProps = {
  onClick?: () => void;
};

export default function Navbar({ onClick }: AddButtonProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex m-[2rem]">
        {/*Main*/}
        <div
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-400 border-1 border-black p-4 m-3 w-[10rem] text-center text-white cursor-pointer rounded-[.35rem] "
        >
          Main
        </div>
        {/*Analytics*/}
        <div
          onClick={() => router.push("/analytics")}
          className="bg-orange-400 hover:bg-amber-500 border-1 border-black p-4 m-3 w-[10rem] text-center text-white cursor-pointer rounded-[.35rem] "
        >
          Analytics
        </div>
        {/*Add Icon*/}
        <div
          onClick={onClick}
          className="m-3 w-[4rem] h-auto flex items-center justify-center rounded-[.35rem] cursor-pointer"
        >
          <svg
            className="w-[46px] h-[46px] text-black "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {/*Hr line*/}
      <hr className="border-t border-black w-full" />
    </div>
  );
}
