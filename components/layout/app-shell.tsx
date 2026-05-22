import { Nav, MobileNav } from '@/components/layout/nav';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex w-60 flex-col border-r border-border bg-card">
        <Nav />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[960px] px-4 py-8 md:px-8">{children}</div>
        </main>

        {/* Bottom nav — mobile */}
        <div className="md:hidden sticky bottom-0 z-40">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
