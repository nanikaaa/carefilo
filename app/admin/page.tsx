import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header flex items-center space-x-4">
        <Link href="/" className="flex cursor-pointer items-center space-x-2">
          <Image
            src="/assets/icons/logo-icon.svg"
            height={32}
            width={32}
            alt="logo"
            className="h-8"
          />
          <span className="text-xl font-semibold text-stone-800">CareFilo</span>
        </Link>

        <p className="sub-header text-stone-800">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="flex w-full items-center justify-between space-y-4">
          <div className="flex items-center space-x-0">
            <div className="">
              <h1 className="header text-3xl font-bold text-stone-800">
                Welcome, Admin!
              </h1>
              <p className="text-stone-500">
                Start the day with managing new appointments
              </p>
            </div>
            <Image
              src="/assets/images/admin-img.png"
              alt="doctor illustration"
              width={150}
              height={150}
              className="my-0 object-contain py-0 "
            />
          </div>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount || 0}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount || 0}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount || 0}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable<Appointment>
          columns={columns}
          data={(appointments?.documents || []) as Appointment[]}
        />
      </main>
    </div>
  );
};

export default AdminPage;
