import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="lg:flex">
      <AdminSidebar />
      <div className="flex-1 p-5 lg:p-10 max-w-6xl">{children}</div>
    </div>
  );
}
