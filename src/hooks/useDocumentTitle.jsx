import { useEffect } from "react";

export default function useDocumentTitle({ title }) {

  useEffect(() => {
    if (title) {
      document.title = `Landrup Dans | ${title}`;
    } else {
      document.title = `Landrup Dans`;
    }
  }, [title])

  return useDocumentTitle;
}