"use client";
import * as React from "react";

import { cn } from "@lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const t = useTranslations();
        const [passwordVisible, setPasswordVisible] = React.useState(false);

        return (
            <div className="relative w-full">
                <input
                    type={
                        type === "password"
                            ? passwordVisible
                                ? "text"
                                : "password"
                            : type
                    }
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {type === "password" && (
                    <Tooltip>
                        <TooltipContent>
                            {passwordVisible
                                ? t("fields.password.hidePassword")
                                : t("fields.password.showPassword")}
                        </TooltipContent>
                        <TooltipTrigger asChild>
                            <button
                                data-testid="toggle-password-visibility"
                                type="button"
                                className="absolute top-2.5 right-2.5"
                                onClick={() =>
                                    setPasswordVisible((prev) => !prev)
                                }
                            >
                                {passwordVisible ? (
                                    <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                    <EyeIcon className="h-4 w-4" />
                                )}
                            </button>
                        </TooltipTrigger>
                    </Tooltip>
                )}
            </div>
        );
    },
);
Input.displayName = "Input";

export { Input };
