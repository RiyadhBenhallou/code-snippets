import { db } from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <div>
      <div className="flex items-center justify-between m-2">
        <h2>Snippets:</h2>
        <button className="btn w-auto">
          <Link href="/snippets/new">New</Link>
        </button>
      </div>

      {snippets.map((snippet) => {
        return (
          <div
            key={snippet.id}
            className="p-2 flex justify-between border rounded-lg m-2"
          >
            <h2>{snippet.title}</h2>
            <Link href={`/snippets/${snippet.id}`}>
              <p>View</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
