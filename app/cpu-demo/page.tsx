"use client";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-3xl rounded-xl border bg-accent/20 p-6">
        <CpuArchitecture
          className="h-[400px] w-full"
          text="AI CPU"
        />
      </div>
    </div>
  );
}
