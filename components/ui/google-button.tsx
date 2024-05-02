import { SVGProps } from "react";
import { Button } from "./button";
import Link from "next/link";

export interface GoogleButtonProps {
  action: string;
}

export function GoogleButton({ action }: GoogleButtonProps) {
  return (
    <Button asChild className="w-full" variant="outline">
      <Link href="/api/oauth/google">
        <ChromeIcon className="mr-2 h-5 w-5" />
        {action} with Google
      </Link>
    </Button>
  );
}

function ChromeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
