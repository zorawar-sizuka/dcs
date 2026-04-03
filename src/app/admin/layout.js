export const metadata = {
  title: "DCS Admin",
  description: "DCS Strata Admin Dashboard",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {children}
    </div>
  );
}
