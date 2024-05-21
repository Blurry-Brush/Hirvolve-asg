"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div className="py-4 px-4 sm:px-8 flex justify-between w-full items-center gap-2">
      <div>
        <h1 className="text-xl sm:text-3xl font-semibold">HirVolve</h1>
      </div>

      <div>
        {pathName === "/recruiter" ? (
          <Link href={"/"}>
            <Button variant={"outline"}>Candidate panel</Button>
          </Link>
        ) : (
          <Link href={"/recruiter"}>
            <Button variant={"outline"}>Recruiter panel</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
