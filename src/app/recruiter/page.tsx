"use client";
import { createClient } from "@/utils/supabase/browser";
import React, { useState } from "react";
import { Payment, columns } from "./columns";
import { useEffect } from "react";
import { DataTable } from "./data-table";
const test = () => {
  const supabase = createClient();
  const [data, setData] = useState<Payment[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("hirvolve").select();

      if (error) {
        console.log(error);
      } else {
        setData(data);
        console.log(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-20">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default test;
