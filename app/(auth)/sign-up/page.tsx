import Link from "next/link";
import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary">
            <Sprout className="size-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Sprout</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Start small. One habit at a time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder form — replaced by Clerk in auth feature */}
            <form className="flex flex-col gap-4">
              <FormField label="Name" htmlFor="name">
                <Input id="name" type="text" placeholder="Your name" autoComplete="name" />
              </FormField>

              <FormField label="Email" htmlFor="email" required>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </FormField>

              <FormField label="Password" htmlFor="password" required>
                <Input
                  id="password"
                  type="password"
                  placeholder="Choose a password"
                  autoComplete="new-password"
                />
              </FormField>

              <Button type="submit" size="lg" className="w-full mt-2">
                Create account
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
