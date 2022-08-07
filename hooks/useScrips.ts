import { useEffect, useState, useRef } from "react";

// we need a function that accepts the script src and couple of other parameters

const useScript = (params: any) => {
  const { url, issueTerm, repo, ref } = params;

  const [status, setStatus] = useState(url ? "loading" : "idle");
  const booleanRef = useRef(false);

  // run the useEffect when the url of the script changes
  useEffect(() => {
    if (!url) {
      setStatus("idle");
      return;
    }
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    let script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("theme", systemDark ? "github-dark" : "github-light");
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("repo", repo);
    if (!booleanRef.current) {
      ref.current.appendChild(script);
      booleanRef.current = true;
    }
    const setAttributeStatus = (event: Event) => {
      setStatus(event.type === "load" ? "ready" : "error");
    };

    script.addEventListener("load", setAttributeStatus);
    script.addEventListener("error", setAttributeStatus);

    return () => {
      // useEffect clean up
      if (script) {
        script.removeEventListener("load", setAttributeStatus);
        script.removeEventListener("error", setAttributeStatus);
      }
    };
  }, [url]);
  return status;
};

export default useScript;
