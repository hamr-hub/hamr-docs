import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { search, type SearchResult } from '../data/searchIndex';

interface SearchModalProps {
  onClose: () => void;
}

/**
 * Cmd/Ctrl+K powered search modal.
 *
 * Self-contained: ships its own keyboard handling, focus management, and a
 * static search index. No external search engine dependency.
 *
 * The parent should remount this component each time it opens (use a `key`
 * or `{open && <SearchModal …/>}`) so internal state resets cleanly.
 */
export default function SearchModal({ onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const results = useMemo<SearchResult[]>(() => search(query), [query]);

  // Derived clamp: if results shrink (e.g. user types more), the cursor
  // gracefully slides back to 0 without a separate render.
  const safeIndex = results.length === 0 ? 0 : Math.min(activeIndex, results.length - 1);

  // Focus the input on mount; restore focus to the trigger on unmount.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => {
      previouslyFocused.current?.focus();
      previouslyFocused.current = null;
    };
  }, []);

  // Scroll the active row into view when navigating with the keyboard.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.children[safeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [safeIndex]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const handleSelect = (result: SearchResult) => {
    onClose();
    navigate(result.path);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[safeIndex];
      if (target) handleSelect(target);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(results.length - 1);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="搜索文档"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        <div className="flex items-center border-b border-gray-200 px-4">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="搜索文档 (API、认证、错误码…)"
            className="flex-1 px-3 py-4 text-base outline-none bg-transparent placeholder:text-gray-400"
            aria-label="搜索输入"
            aria-controls="search-results"
            aria-activedescendant={
              results.length > 0 ? `search-result-${safeIndex}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:inline-block px-2 py-1 text-xs bg-gray-100 border border-gray-300 rounded mr-2">
            Esc
          </kbd>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
            aria-label="关闭搜索"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500 text-sm">
              {query.trim() === ''
                ? '开始输入以搜索文档…'
                : `未找到与 "${query}" 相关的内容`}
            </div>
          ) : (
            <ul
              ref={listRef}
              id="search-results"
              role="listbox"
              aria-label="搜索结果"
              className="py-2"
            >
              {results.map((result, idx) => (
                <li
                  key={result.path}
                  id={`search-result-${idx}`}
                  role="option"
                  aria-selected={idx === safeIndex}
                  className={`mx-2 px-4 py-3 rounded-lg cursor-pointer flex items-start space-x-3 ${
                    idx === safeIndex
                      ? 'bg-primary-50 text-primary-900'
                      : 'hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => handleSelect(result)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {result.section}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mt-0.5 truncate">
                      {result.title}
                    </div>
                    {result.snippet && (
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {result.snippet}
                      </div>
                    )}
                  </div>
                  <kbd
                    className={`hidden sm:inline-block px-2 py-1 text-xs rounded shrink-0 ${
                      idx === safeIndex
                        ? 'bg-white border border-primary-200 text-primary-600'
                        : 'bg-gray-100 border border-gray-200 text-gray-500'
                    }`}
                  >
                    ↵
                  </kbd>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded">↓</kbd>
              <span>导航</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded">↵</kbd>
              <span>选择</span>
            </span>
          </div>
          <span>{results.length > 0 ? `${results.length} 个结果` : 'hamr-docs'}</span>
        </div>
      </div>
    </div>
  );
}