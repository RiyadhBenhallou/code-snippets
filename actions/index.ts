"use server";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  console.log("deleted successfully");
  revalidatePath("/");
  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData,
) {
  try {
    console.log(formState);
    // create server action
    // "use server";
    // retreive data
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    // validation
    if (!title || !code) {
      return { message: "the fields must be filled" };
    }
    // save to data base
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log(snippet);
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "Internal Server Error" };
    }
  } finally {
    revalidatePath("/");
    redirect("/");
  }

  //redirect user to homepage
}
