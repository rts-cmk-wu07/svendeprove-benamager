import { useEffect } from "react";

export default function useDocumentTitle({ title }) {

  useEffect(() => {
    document.title = `Landrup Dans | ${title}`;
  }, [title])

  return useDocumentTitle;
}