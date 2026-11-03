import { redirect } from "next/navigation";

export const metadata = {
  title: "Panel Admin",
  description: "Panel admin platform CFTInd",
};

export default function AdminPage() {
  redirect("/admin/dashboard");
}
