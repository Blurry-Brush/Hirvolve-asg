import DetailsForm from "@/components/form/DetailsForm";

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col items-center gap-12 p-10 sm:p-24">
      <h1 className="text-2xl font-semibold text-center">Please fill out your details</h1>
      <DetailsForm />
    </div>
  );
}
