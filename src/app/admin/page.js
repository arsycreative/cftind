import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin — CFTInd",
  description: "Panel admin CFTInd",
};

export default function AdminPage() {
  redirect("/admin/dashboard");
}
