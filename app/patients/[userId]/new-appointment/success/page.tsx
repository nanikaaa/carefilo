import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = (await getAppointment(appointmentId)) as Appointment;

  const doctor = Doctors.find(
    (doctor) => doctor.name === (appointment?.primaryPhysician || "")
  );

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/" className="mb-6 flex items-center space-x-2">
          <Image
            src="/assets/icons/logo-icon.svg"
            height={32}
            width={32}
            alt="logo"
            className="h-10 w-fit"
          />
          <span className="text-2xl font-semibold text-stone-800">
            CareFilo
          </span>
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            unoptimized
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-teal-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          {doctor ? (
            <div className="flex items-center gap-3">
              <Image
                src={doctor.image}
                alt="doctor"
                width={100}
                height={100}
                className="size-6"
              />
              <p className="whitespace-nowrap">Dr. {doctor.name}</p>
            </div>
          ) : (
            <p>Doctor information is not available.</p>
          )}
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>
              {appointment
                ? formatDateTime(appointment.schedule).dateTime
                : "Appointment date not available"}
            </p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 CareFilo</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
