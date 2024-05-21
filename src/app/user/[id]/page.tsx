"use client";

import { createClient } from "@/utils/supabase/browser";
import { Payment } from "@/app/recruiter/columns";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const [user, setUser] = useState<Payment>();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("hirvolve")
        .select()
        .eq("id", params.id);

      if (error) {
        console.log(error);
      } else {
        setUser(data[0]);
        console.log(data[0]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-10 p-4 w-full h-screen">
      <div className="text-center mx-auto">
        <h1 className="upper text-2xl font-bold">Thank You</h1>
        <h1>Here's what we received</h1>
      </div>

      <div className="max-w-3xl mt-10 bg-slate-50 border border-gray-300 rounded-xl p-6">
        <h1 className="text-lg font-bold">Personal Details</h1>

        <div className="grid grid-cols-1 gap-6 md:gap-0 md:grid-cols-2 mt-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-gray-400 font-bold">First Name</h1>
              <h3 className="font-bold text-black/80">{user?.first_name} </h3>
            </div>
            <div>
              <h1 className="text-gray-400 font-bold">Email Address</h1>
              <h3 className="font-bold text-black/80">{user?.email} </h3>
            </div>
            <div>
              <h1 className="text-gray-400 font-bold">Bio</h1>
              <p className="font-bold text-black/80">{user?.bio} </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-gray-400 font-bold">Last Name</h1>
              <h3 className="font-bold text-black/80">{user?.last_name} </h3>
            </div>
            <div>
              <h1 className="text-gray-400 font-bold">Phone</h1>
              <h3 className="font-bold text-black/80">+91 {user?.phone} </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl bg-slate-50 h-auto mt-10 border border-gray-300 rounded-xl p-6">
        <h1 className="text-lg font-bold">Additional Information</h1>

        <div className="grid grid-cols-2 mt-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-gray-400 font-bold">Project Details</h1>
              <p className="font-bold text-black/80">
                {user?.project_description}{" "}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-gray-400 font-bold">Role interested</h1>
              <h3 className="font-bold text-black/80">{user?.role} </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link href="/">
            <Button>
                Go to home
            </Button>
        </Link>
      </div>
    </div>
  );
}
