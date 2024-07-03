import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as actions from "@/actions/index";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string;
  };
}

export default async function SnippetShowPage({ params: { id } }: Props) {
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="">
      <div className="flex justify-between items-center px-4">
        <h1 className="font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <button className="btn">
            <Link href={`/snippets/${snippet.id}/edit`}>Edit</Link>
          </button>
          <form action={deleteSnippetAction}>
            <button className="btn">Delete</button>
          </form>
        </div>
      </div>
      <pre className="border-2 border-gray-200 bg-gray-200 rounded m-4 p-1">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
