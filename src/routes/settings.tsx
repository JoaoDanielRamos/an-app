import SettingsDialog from "@/components/dialogs/SettingsDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignOutButton } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

// --- Schemas ---

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required." }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const themeSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
});

// --- Components ---

function EmailForm({ defaultEmail }: { defaultEmail: string }) {
  const form = useForm<z.infer<typeof emailSchema>>({
    // @ts-expect-error - Zod version mismatch workaround
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  function onSubmit(data: z.infer<typeof emailSchema>) {
    toast.success("Email updated", {
      description: `Your email has been changed to ${data.email}`,
    });
    // TODO: Implement actual update logic
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter new email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Email</Button>
      </form>
    </Form>
  );
}

function PasswordForm() {
  const form = useForm<z.infer<typeof passwordSchema>>({
    // @ts-expect-error - Zod version mismatch workaround
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(_data: z.infer<typeof passwordSchema>) {
    toast.success("Password updated", {
      description: "Your password has been changed successfully.",
    });
    form.reset();
    // TODO: Implement actual update logic
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                <ul>
                  <li>Must be at least 8 characters long.</li>
                  <li>Contains at least one uppercase letter.</li>
                  <li>Contains at least one number.</li>
                  <li>Contains at least one special character.</li>
                </ul>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Password</Button>
      </form>
    </Form>
  );
}

function ThemeForm() {
  const { theme, setTheme } = useTheme();
  const form = useForm<z.infer<typeof themeSchema>>({
    // @ts-expect-error - Zod version mismatch workaround
    resolver: zodResolver(themeSchema),
    defaultValues: {
      theme: (theme as "light" | "dark" | "system") || "system",
    },
  });

  function onSubmit(data: z.infer<typeof themeSchema>) {
    setTheme(data.theme);
    toast.success("Theme updated", {
      description: `Theme set to ${data.theme}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Theme</Button>
      </form>
    </Form>
  );
}

function DeleteDataForm() {
  const handleDelete = () => {
    toast.error("Data deleted", {
      description: "All your data has been permanently deleted.",
    });
    // TODO: Implement actual delete logic
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md bg-destructive/15 p-4 text-destructive text-sm">
        Warning: This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </div>
      <Button variant="destructive" onClick={handleDelete} className="w-full">
        Confirm Delete Data
      </Button>
    </div>
  );
}

interface SettingsItemProps {
  title: string;
  description: ReactNode;
  dialogTrigger: ReactNode;
  dialogTitle: string;
  dialogDescription: string;
  children: ReactNode;
}

function SettingsItem({
  title,
  description,
  dialogTrigger,
  dialogTitle,
  dialogDescription,
  children,
}: SettingsItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <div className="text-muted-foreground text-sm">{description}</div>
      </div>
      <SettingsDialog
        title={dialogTitle}
        description={dialogDescription}
        trigger={dialogTrigger}
      >
        <div className="pt-4">{children}</div>
      </SettingsDialog>
    </div>
  );
}

function RouteComponent() {
  const { theme } = useTheme();
  // Mock data - replace with actual user data
  const userEmail = "jdmor95@gmail.com";

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="mb-6 font-bold text-2xl">Settings</h1>

      <div className="divide-y">
        <SettingsItem
          title="E-mail"
          description={userEmail}
          dialogTrigger={<Button variant="outline">Change E-mail</Button>}
          dialogTitle="Change E-mail"
          dialogDescription="Enter your new email address below."
        >
          <EmailForm defaultEmail={userEmail} />
        </SettingsItem>

        <SettingsItem
          title="Password"
          description="********"
          dialogTrigger={<Button variant="outline">Change Password</Button>}
          dialogTitle="Change Password"
          dialogDescription="Enter your current password and a new password."
        >
          <PasswordForm />
        </SettingsItem>

        <SettingsItem
          title="Theme"
          description={
            theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "System"
          }
          dialogTrigger={<Button variant="outline">Change Theme</Button>}
          dialogTitle="Change Theme"
          dialogDescription="Select your preferred theme."
        >
          <ThemeForm />
        </SettingsItem>

        <SettingsItem
          title="Data"
          description="Delete all your data"
          dialogTrigger={<Button variant="destructive">Delete All Data</Button>}
          dialogTitle="Delete All Data"
          dialogDescription="Are you sure you want to delete all data?"
        >
          <DeleteDataForm />
        </SettingsItem>

        <div className="py-3">
          <Button className="mx-auto block w-fit">
            <SignOutButton />
          </Button>
        </div>
      </div>
    </div>
  );
}
