import { Suspense } from "react";
import { PostEditor } from "@/components/admin/post-editor";

export default function EditPostPage() {
  return (
    <Suspense>
      <PostEditor />
    </Suspense>
  );
}
