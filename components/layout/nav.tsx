"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, LayoutDashboard, Calendar, Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Nav() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col h-full">
            <div className="flex items-center gap-2.5 px-4 py-6">
                <div className="flex size-8 items-center justify-center rounded-xl bg-primary">
                    <Sprout className="size-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-foreground">
                    <Link href="/">Sprout</Link>
                </span>
            </div>

            <div className="flex-1 px-3 space-y-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const active =
                        pathname === href || pathname.startsWith(href + "/");
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                active
                                    ? "bg-secondary text-secondary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="size-5 shrink-0" />
                            {label}
                        </Link>
                    );
                })}
            </div>

            <div className="px-4 py-4 border-t border-border">
                <UserButton />
            </div>
        </nav>
    );
}

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-around border-t border-border bg-card px-2 py-3">
            {navItems.map(({ href, label, icon: Icon }) => {
                const active =
                    pathname === href || pathname.startsWith(href + "/");
                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            active
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon
                            className={cn(
                                "size-5",
                                active
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        />
                        {label}
                    </Link>
                );
            })}
            <div className="flex flex-col items-center gap-1 px-3 py-1.5">
                <UserButton />
            </div>
        </nav>
    );
}
