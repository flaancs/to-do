"use client";
import { Asterisk } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label as PrimitiveLabel } from "../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export interface LabelProps {
    title: string;
    htmlFor: string;
    required?: boolean;
    requiredText?: string;
}

export function Label({ title, htmlFor, required, requiredText }: LabelProps) {
    const t = useTranslations();

    return (
        <PrimitiveLabel htmlFor={htmlFor} className="flex items-center gap-1">
            <span>{title}</span>
            {required && (
                <>
                    <Tooltip>
                        <TooltipContent>{requiredText}</TooltipContent>
                        <TooltipTrigger asChild className="hidden lg:block">
                            <Asterisk className="h-4 w-4 text-red-600" />
                        </TooltipTrigger>
                    </Tooltip>
                    <span className="text-xs text-red-600 lg:hidden">
                        {t("common.required")}
                    </span>
                </>
            )}
        </PrimitiveLabel>
    );
}
