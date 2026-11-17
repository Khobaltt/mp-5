import type { HeaderComponentProps } from "@/types"

export default function HeaderComponent(
    { title, subtitle }: HeaderComponentProps
) {
    return (
        <div className="flex flex-col justify-center  p-8">
            <h1 className="text-center text-5xl font-bold text-black m-2">
                {title}
            </h1>
            <p className="text-center text-xl font-medium text-gray-800">
                {subtitle}
            </p>
        </div>
    )
}