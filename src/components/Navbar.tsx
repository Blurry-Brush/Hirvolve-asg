"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <div className="py-4 px-8 flex justify-between w-full">
      <div>
        <h1 className="text-3xl font-semibold">HirVolve</h1>
      </div>

      <div>
        {pathName === "/recruiter" ? (
          <Link href={"/"}>
            <Button variant={"outline"}>Switch to Candidate panel</Button>
          </Link>
        ) : (
          <Link href={"/recruiter"}>
            <Button variant={"outline"}>Switch to Recruiter panel</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
