"use client";
import { db } from "@/db";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

export default function CreateSnippetPage() {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });

  return (
    <form className="" action={action}>
      <h3 className="font-bold m-3 text-center">Create Snippet</h3>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input id="title" name="title" className="border rounded-lg p-1" />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea id="code" name="code" className="border rounded-lg p-1" />
        </div>
        {formState.message && (
          <div className="bg-red-200 border border-red-500 text-red-500 p-2 m-2">
            {formState.message}
          </div>
        )}
        <button className="btn self-center">Create</button>
      </div>
    </form>
  );
}
