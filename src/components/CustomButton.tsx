"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/browser";
import { useState } from "react";

import Link from "next/link";
function CustomButton({ id }: any) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const supabase = createClient();

    // const router = useRouter();
    const { data } = supabase.storage
      .from("hirvolve")
      .getPublicUrl("public/" + id + "/resume.pdf");

    if (data) {
      setUrl(data.publicUrl);
    }
  }, []);

  return (
    <div>
      
      <Link href={url}>
        <Button>View Resume</Button>
      </Link>
    </div>
  );
}

export default CustomButton;
