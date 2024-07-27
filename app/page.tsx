import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[70%]">
          <Image
            width={1000}
            height={1000}
            alt="logo-image"
            className="mb-12 h-10 w-fit"
            src="/assets/icons/logo-full.svg"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePlus
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        width={1000}
        height={1000}
        alt="patient"
        className="side-img max-w-[50%]"
        src="/assets/images/onboarding-img.png"
      />
    </div>
  );
}
