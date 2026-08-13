import AppLayout from "../app-layout";
export default function ReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
