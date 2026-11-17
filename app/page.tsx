import HeaderComponent from "@/components/HeaderComponent"
import QueryHandler from "@/components/QueryHandler"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-indigo-200 p-4 pt-16">
      <HeaderComponent
        title="URL Shortener"
        subtitle="Shorten long URLs into compact, sharable links"
      />
      <QueryHandler/>
    </div>
  );
}
