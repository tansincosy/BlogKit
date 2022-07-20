import useScript from "@/hooks/useScrips";
import { useRef } from "react";
import { comment } from "@/config";
export const Comment = () => {
  const commentBoxRef = useRef<HTMLDivElement>(null);
  useScript({
    url: "https://utteranc.es/client.js",
    issueTerm: "url",
    repo: comment.repo,
    ref: commentBoxRef,
  });

  return (
    <div>
      <div ref={commentBoxRef} className="w-full" id="comments"></div>
    </div>
  );
};

export default Comment;
