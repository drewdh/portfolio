import { useEffect } from 'react';

const defaultTitle = 'Drew Hanberry';

/** Updates document title */
export default function useTitle(title: string) {
  useEffect(function updateTitle() {
    const titleParts = [];
    if (title) {
      titleParts.push(title);
    }
    titleParts.push(defaultTitle);
    document.title = titleParts.join(' - ');
  }, [title]);
}
