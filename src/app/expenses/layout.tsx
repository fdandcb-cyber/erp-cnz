import AppLayout from "../app-layout";
export default function ExpensesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
