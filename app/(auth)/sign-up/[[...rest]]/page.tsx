import { SignUp } from "@clerk/nextjs";
import { Sprout } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary">
            <Sprout className="size-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Sprout</span>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
