import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/SnippetEditForm";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string;
  };
}

export default async function EditSnippet({ params }: Props) {
  const id = parseInt(params.id);
  const snippet = await db.snippet.findFirst({
    where: { id },
  });
  if (!snippet) return notFound();
  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
