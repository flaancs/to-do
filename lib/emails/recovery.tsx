import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { CheckSquareIcon } from "lucide-react";

interface RecoveryEmailProps {
    name: string;
    url: string;
}

export const RecoveryEmail = ({ name, url }: RecoveryEmailProps) => (
    <Html>
        <Head />
        <Preview>You&apos;ve requested to reset your password</Preview>
        <Body style={main}>
            <Container style={container}>
                <div style={logo}>
                    <CheckSquareIcon size={24} />
                    <h1 className="text-2xl font-bold">
                        <span
                            style={{
                                color: "#ff0000",
                            }}
                        >
                            to
                        </span>
                        do
                    </h1>
                </div>
                <Text style={paragraph}>Hi {name},</Text>
                <Text style={paragraph}>
                    You&apos;ve requested to reset your password. Click the
                    button below to reset your password.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={url}>
                        Reset Password
                    </Button>
                </Section>
            </Container>
        </Body>
    </Html>
);

RecoveryEmail.PreviewProps = {
    name: "Alan",
    url: "http://localhost:3000/auth/recovery?token=123456",
} as RecoveryEmailProps;

export default RecoveryEmail;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const logo = {
    display: "flex",
    alignItems: "center",
    gap: 10,
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#010101",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
};
