"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { createClient } from "@/utils/supabase/browser";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
type uploadDoc = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
  project_description?: string | undefined;
  resume?: any;
};

const FormSchema = z.object({
  firstName: z.string().min(1, {
    message: "first name not entered",
  }),
  lastName: z.string().min(1, {
    message: "last name not entered",
  }),
  email: z.string().min(1).email(),
  phone: z.string().min(10, {
    message: "Invalid Phone No",
  }),
  role: z.string().min(1, { message: "choose atleast one role" }),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
  projectDescription: z.string().max(160).optional(),
  resume: z.any().refine((file) => file?.length == 1, "File is required."),
});
function DetailsForm() {
  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
    },
  });

  const handleToast = () => {
    toast({
      title: "Uploading",
      description: "Your details are being uploaded, please wait!",
      //   action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    // console.log(values);
    let doc: uploadDoc = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      role: values.role,
      project_description: values.projectDescription,
      resume: values.resume,
      bio: values.bio,
    };
    delete doc.resume;

    handleToast();
    // const { data, error } = await supabase.from("hirvolve").insert(doc);
    const { data, error } = await supabase
      .from("hirvolve")
      .insert(doc)
      .select();
    var id;
    if (data) {
      console.log(data);
      id = data[0]?.id;
    } else if (error) {
      console.log(error);
    }

    if (id) {
      let file = values.resume[0];

      const { data, error } = await supabase.storage
        .from("hirvolve")
        .upload("public/" + id + "/resume.pdf", file as File, {
          upsert: true,
          contentType: "application/pdf",
        });

      if (data) {
        console.log(data);
        router.push("/user/" + id);
      } else if (error) {
        console.log(error);
      }
    }
  };
  const fileRef = form.register("resume");
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col space-y-6 bg-slate-100 p-4"
      >
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No (+91)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role that suits you" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FrontEnd Developer">
                      FrontEnd Developer
                    </SelectItem>
                    <SelectItem value="ML Engineer">ML Engineer</SelectItem>
                    <SelectItem value="Digital Marketing Ex">
                      Digital Marketing Ex
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself and your work experience"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Projects</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about any Project you have done in your domain"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Upload Your Resume</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="shadcn" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default DetailsForm;
