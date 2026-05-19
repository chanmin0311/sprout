import Link from "next/link";
import { Sprout, CheckCircle2, Flame, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-300 flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-primary">
              <Sprout className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">Sprout</span>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="md">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild size="md">
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <Badge variant="default" className="px-4 py-1.5 text-sm">
          <Sprout className="size-3.5" />
          Calm habit tracking
        </Badge>

        <div className="max-w-2xl space-y-5">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
            Build habits that{" "}
            <span className="text-primary">actually stick.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Sprout helps you stay consistent without the pressure. Simple daily check-ins, gentle
            progress tracking, and calm streak visualization.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <Link href="/sign-up">
              Start for free
              <ArrowRight className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-240 w-full px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            icon={<CheckCircle2 className="size-6 text-primary" />}
            title="5-second check-ins"
            description="Tap once to record today's progress. No friction, no fuss."
          />
          <FeatureCard
            icon={<Flame className="size-6 text-warning" />}
            title="Calm streak tracking"
            description="Watch your consistency grow. Gentle reminders, not guilt."
          />
          <FeatureCard
            icon={<Calendar className="size-6 text-primary" />}
            title="Monthly overview"
            description="See your patterns at a glance with a clear, low-noise calendar."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border py-8">
        <div className="mx-auto max-w-240 px-6 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sprout className="size-4 text-primary" />
            <span>Sprout</span>
          </div>
          <span>© {new Date().getFullYear()} — Build consistency, calmly.</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
          {icon}
        </div>
        <div className="space-y-1.5">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
