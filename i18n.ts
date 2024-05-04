import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";

export const importLocale = async (locale: string) => {
    return (await import(`./locales/${locale}.json`)).default;
};

export const importDefaultLocale = async () => {
    return (await import(`./locales/en.json`)).default;
};

export const getMessagesForLocale = async (locale: string) => {
    const localeMessages = await importLocale(locale);
    if (locale === "en") return localeMessages;
    const defaultLocaleMessages = await importDefaultLocale();
    return deepmerge(defaultLocaleMessages, localeMessages);
};

export default getRequestConfig(async ({ locale }) => ({
    messages: await getMessagesForLocale(locale),
}));
