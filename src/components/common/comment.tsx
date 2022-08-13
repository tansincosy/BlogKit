import useScript from "@/hooks/useScrips";
import { useRef } from "react";
export const Comment = () => {
  const commentBoxRef = useRef<HTMLDivElement>(null);
  useScript({
    url: "https://utteranc.es/client.js",
    issueTerm: "url",
    repo: process.env.COMMENT_REPO_NAME || "",
    ref: commentBoxRef,
  });

  return (
    <div>
      <div ref={commentBoxRef} className="w-full" id="comments"></div>
    </div>
  );
};

export default Comment;
