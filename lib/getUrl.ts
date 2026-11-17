import getCollection, { URL_COLLECTION } from "@/db";
import { UrlProps } from "@/types";

export default async function getURL(alias: string): Promise<UrlProps | null> {
    const urlCollection = await getCollection(URL_COLLECTION);
    const data = await urlCollection.findOne<UrlProps>({ alias: alias });
    return data;
}