"use client";
import { useState } from "react";
import type { Snippet } from "@prisma/client";
import * as actions from "@/actions/index";

interface Props {
  snippet: Snippet;
}

export default function SnipperEditForm({ snippet }: Props) {
  const [code, setCode] = useState<string>(snippet.code);

  function handleSnippetChange(e: any) {
    setCode(e.target.value);
  }

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <>
      <form action={editSnippetAction}>
        <textarea value={code} onChange={handleSnippetChange} />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
