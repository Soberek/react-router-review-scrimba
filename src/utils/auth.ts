import { redirect } from "react-router-dom";
export function requireAuth(url: string) {
  const is_logged = localStorage.getItem("login");
  const pathname = new URL(url).pathname;

  if (!is_logged) {
    throw redirect(
      `/login${
        pathname ? `?message=Please login first&redirectTo=${pathname}` : ""
      }`
    );
  }

  return pathname;
}
