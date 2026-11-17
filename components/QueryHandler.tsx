"use client";
import { useState } from "react";
import Link from "next/link";
import { Textarea } from "@mui/joy";
import { Button, FormHelperText, TextField } from "@mui/material";
import { UrlProps } from "@/types";

import createNewUrl from "@/lib/createNewUrl";

const urlBase = "mp-5.vercel.app/";

const buttonDefault = "Shorten my URL!";
const buttonFetching = "Creating your URL...";

const textClass = "text-gray-500";

export default function QueryHandler() {

    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [buttonText, setButtonText] = useState(buttonDefault);
    const [displayUrl, setDisplayUrl] = useState<UrlProps | null>(null);

    return(
        <form
            className="flex flex-col bg-indigo-100 mb-8 p-8 rounded-sm border-2 border-solid border-gray-600"
            onSubmit={async (event) => {
                event.preventDefault();
                setButtonText(buttonFetching);
                createNewUrl(url, alias)
                    .then((newUrl) => {
                        setButtonText(buttonDefault);
                        setDisplayUrl(newUrl);
                    })
                    .catch((err) => console.error(err));
            }}
        >
            <p className="text-xl font-bold text-gray-900">Shorten Your URL</p>
            <p className="text-gray-500 mb-4">Enter a long URL and a custom alias to generate a shorter link</p>
            <TextField
                variant="filled"
                size="small"
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    mb: 3
                }}
                placeholder="https://example.com/your/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <div className="flex mb-8">
                <p className="text-gray-500 pb-1 mt-auto mr-2">{urlBase}</p>
                <TextField
                    variant="filled"
                    size="small"
                    sx={{
                        backgroundColor: "white",
                        width: "auto",
                    }}
                    placeholder="your-custom-alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />
            </div>
            <div className="w-full flex justify-center">
                <Button
                    sx={{ width: "80%", textTransform: "none" }}
                    variant="contained"
                    type="submit"
                    disabled={ url === "" || alias === "" }
                >
                    {buttonText}
                </Button>
            </div>
            {displayUrl && (
                <div className="bg-white border-2 border-gray-500 rounded-sm p-4 mt-8">
                    {displayUrl.status >= 0 ? (
                        <>
                            <p className={textClass}>
                                {displayUrl.status === 0
                                    ? "Your shortened URL was created successfully!"
                                    : displayUrl.status === 1
                                        ? "Your shortened URL already exists."
                                        : "Unknown status returned. "
                                }
                            </p>
                            <div className="flex">
                                <p className={textClass}>
                                    Shortened URL:
                                </p>
                                <Link
                                    className={"text-gray-700 font-bold mx-1"}
                                    href={"/" + displayUrl.alias}
                                    target="_blank"
                                >
                                    {urlBase + displayUrl.alias}
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-red-600">
                                {displayUrl.status === -1
                                    ? "This alias is already in use. Please try a different one."
                                    : displayUrl.status === -2
                                        ? "This URL is invalid."
                                        : displayUrl.status === -3
                                            ? "Could not connect to MongoDB."
                                            : "Unknown error occurred."
                                }
                            </p>
                        </>
                    )}
                </div>
            )}
        </form>
    )
}