"use client";

import { FormAdmin } from "@/app/components/FormAdmin";
// import { AsideAwmin } from "@/app/components/AsideAdmin";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen">
      <div className="relative z-10 flex min-h-screen">

        {/* Main */}
        <section className="min-w-0 flex-1 bg-gradient-to-br from-violet-950 to-violet-800">
            <FormAdmin />
        </section>
      </div>
    </main>
  );
}
