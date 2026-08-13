import AppLayout from "../app-layout";
export default function ParcelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
