import useScript from "@/hooks/useScrips";
import { useRef } from "react";

export const Comment = () => {
  const commentBoxRef = useRef<HTMLDivElement>(null);
  useScript({
    url: "https://utteranc.es/client.js",
    issueTerm: "url",
    repo: "tansincosy/Blog-Comment",
    ref: commentBoxRef,
  });

  return (
    <div>
      <div ref={commentBoxRef} className="w-full" id="comments"></div>
    </div>
  );
};

export default Comment;
