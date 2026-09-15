import { useCallback, useState } from 'react';

export interface UseDisclosureResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (next: boolean) => void;
}

/**
 * 轻量级 disclosure hook —— 用于侧边栏抽屉、模态框、菜单等开关场景。
 * 不依赖外部 UI 库，避免增加包体积。
 */
export function useDisclosure(initial = false): UseDisclosureResult {
  const [isOpen, setIsOpen] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const setOpen = useCallback((next: boolean) => setIsOpen(next), []);

  return { isOpen, open, close, toggle, setOpen };
}