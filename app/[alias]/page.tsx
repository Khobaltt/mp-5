import { redirect, notFound } from "next/navigation";
import getURL from "@/lib/getUrl";

export const instant= false;
export default async function AliasPage({
    params,
}: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;
    const data = await getURL(alias);

    if (!data) {
        notFound();
    }

    redirect(data.url);
}