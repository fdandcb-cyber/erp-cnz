import { Sidebar, MobileNav, BottomNav } from "@/components/layout/navigation";
import { SearchCommand } from "@/components/shared/search-command";
import Link from "next/link";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {" "}
      <MobileNav /> <Sidebar />{" "}
      <main className="lg:ml-60 pb-16 lg:pb-0">
        {" "}
        <div className="flex items-center justify-between h-14 px-4 border-b lg:px-6">
          {" "}
          <h1 className="text-lg font-semibold hidden lg:block">
            Personal Business
          </h1>{" "}
          <div className="flex items-center gap-3 ml-auto">
            {" "}
            <Link href="/store" className="hidden sm:inline-flex">
              {" "}
              <Button variant="outline" size="sm" className="gap-2">
                {" "}
                <Store className="w-4 h-4" /> Open Store{" "}
              </Button>{" "}
            </Link>{" "}
            <SearchCommand />{" "}
          </div>{" "}
        </div>{" "}
        <div className="p-4 lg:p-6 max-w-7xl mx-auto"> {children} </div>{" "}
      </main>{" "}
      <BottomNav />{" "}
    </div>
  );
}
