import { cookies } from "next/headers";

export const SESSION_COOKIE = "sy_admin_session";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "Qwater123!@#";
}

export function isAuthed() {
  const store = cookies();
  return store.get(SESSION_COOKIE)?.value === "authenticated";
}
