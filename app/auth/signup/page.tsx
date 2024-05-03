import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/shared/google-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your information to create an account
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="email@example.com"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" required type="password" />
        </div>
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
        <div className="mt-2">
          <Link
            href="/auth/login"
            className="text-sm underline-offset-2 hover:underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="space-y-4">
        <GoogleButton action="Sign up" />
      </div>
    </div>
  );
}
