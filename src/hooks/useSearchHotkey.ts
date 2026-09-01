import { useEffect } from 'react';

/**
 * Listens for Cmd/Ctrl+K (and "/" while not typing) and invokes the handler.
 * Used to open the global search modal from anywhere in the app.
 */
export function useSearchHotkey(onOpen: () => void): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isSlash = e.key === '/' && !isTyping;

      if (isCmdK || isSlash) {
        e.preventDefault();
        onOpen();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onOpen]);
}