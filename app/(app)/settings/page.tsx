import { Settings, User, Bell, Moon, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/form-field';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="size-5 text-primary" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>Your account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Avatar placeholder */}
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-3xl bg-secondary text-2xl font-bold text-primary">
              J
            </div>
            <div>
              <p className="font-medium text-foreground">Jane Doe</p>
              <p className="text-sm text-muted-foreground">jane@example.com</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Display name" htmlFor="display-name">
              <Input id="display-name" defaultValue="Jane Doe" />
            </FormField>
            <FormField label="Email" htmlFor="settings-email">
              <Input id="settings-email" type="email" defaultValue="jane@example.com" />
            </FormField>
          </div>
          <div className="flex justify-end">
            <Button size="md">Save profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Moon className="size-5 text-primary" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>Choose your preferred theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <ThemeOption label="Light" active />
            <ThemeOption label="Dark" />
            <ThemeOption label="System" />
          </div>
        </CardContent>
      </Card>

      {/* Notifications placeholder */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-primary" />
            <CardTitle>
              Notifications
              <Badge variant="muted" className="ml-2 text-xs">
                Coming soon
              </Badge>
            </CardTitle>
          </div>
          <CardDescription>
            Reminder notifications will be available in a future update.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Irreversible actions. Proceed with care.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" size="md">
            <LogOut className="size-4" />
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ThemeOption({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active
          ? 'border-primary text-primary'
          : 'border-border text-muted-foreground hover:border-accent'
      }`}
    >
      <div className={`size-10 rounded-xl ${active ? 'bg-secondary' : 'bg-muted'}`} />
      {label}
    </button>
  );
}
