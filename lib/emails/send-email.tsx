import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { createElement } from "react";
import Recovery from "./recovery";

const TEMPLATES: Record<
    string,
    {
        component: React.ComponentType<any>;
        subject: string;
        context: string[];
    }
> = {
    recovery: {
        component: Recovery,
        subject: "Reset your password",
        context: ["name", "url"],
    },
};

export interface sendEmailProps {
    template: string;
    to: string;
    variables: Record<string, any>;
}

export const sendEmail = async ({
    template,
    to,
    variables,
}: sendEmailProps): Promise<boolean> => {
    try {
        const plunk = new Plunk(process.env.PLUNK_SECRET_API_KEY!);

        const { component, subject, context } = TEMPLATES[template];

        if (!component) {
            throw new Error(`Template not found: ${template}`);
        }

        const missing = context.filter((key) => !variables[key]);
        if (missing.length) {
            throw new Error(`Missing variables: ${missing.join(", ")}`);
        }

        const body = render(createElement(component, variables));

        const response = await plunk.emails.send({
            to,
            subject,
            body,
        });

        return response.success;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};
