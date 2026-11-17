"use server";
import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/types"
import getUrl from "@/lib/getUrl";

export default async function createNewUrl(
    url: string,
    alias: string,
): Promise<UrlProps> {
    console.log("Creating new URL...");

    // validate URL
    url = url.trim();
    try {
        const parsedUrl = new URL(url);
        if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
        ) {
            return { url, alias, status: -2 };
        }

        const response = await fetch(parsedUrl.href, {
            method: "GET",
            cache: "no-store",
            redirect: "follow",
            signal: AbortSignal.timeout(5000),
        });

        await response.body?.cancel();
        if (!response.ok) {
            return { url, alias, status: -2};
        }

    } catch {
        return { url, alias, status: -2 };
    }

    // check if alias is already in use
    const data = await getUrl(alias);
    if (data) {
        return {
            url: data.url,
            alias: data.alias,
            status: url === data.url ? 1 : -1,
        };
    }

    const p = {
        url: url,
        alias: alias,
        status: 0,
    }

    // insert in DB
    const urlCollection = await getCollection(URL_COLLECTION);
    const res = await urlCollection.insertOne({...p});

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    // get id from DB
    return p;
}