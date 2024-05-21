"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/browser";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export type Payment = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  bio: string;
  project_description: string;
  phone: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const router = useRouter();

      const handleClick = async () => {
        const supabase = createClient();

        const { data } = supabase.storage
          .from("hirvolve")
          .getPublicUrl("public/" + payment.id + "/resume.pdf");

        if (data && data.publicUrl) {
          router.push(data.publicUrl);
        }

        console.log(data);
      };
      return <Button onClick={handleClick}>View Resume</Button>;
    },
  },
];
