import { redirect } from "next/navigation";

import { getAuthUser } from "@/lib/auth/session";
import { OfficeShell } from "@/features/office/components/office-shell";

export default async function OfficePage() {
  const user = await getAuthUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <OfficeShell
      currentUserId={user.id}
      currentUserName={user.name}
      currentUserRole={user.role}
    />
  );
}
