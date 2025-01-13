"use client";

import { useEffect } from "react";

export default function ScriptLoader({ url }: { url: string }) {
  useEffect(() => {
    if (url) {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [url]);

  return null;
}
