import AppLayout from "../app-layout";
export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
