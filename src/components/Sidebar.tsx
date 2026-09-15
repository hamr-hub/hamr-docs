import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { sidebarSections } from '../nav';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(['快速开始', 'API 参考']);

  // 路由变化时自动关闭移动端抽屉，避免挡住新页面
  useEffect(() => {
    if (isOpen) onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const navContent = (
    <nav className="p-4 space-y-6">
      {sidebarSections.map((section) => (
        <div key={section.title}>
          <button
            onClick={() => toggleSection(section.title)}
            className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 mb-2 hover:text-primary-600"
          >
            {section.title}
            {openSections.includes(section.title) ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openSections.includes(section.title) && (
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-link ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  onClick={() => onClose?.()}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* 桌面端（≥768px）：常驻 sticky 侧边栏 */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto flex-shrink-0">
        {navContent}
      </aside>

      {/* 移动端（<768px）：抽屉式 overlay + 黑色遮罩 */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-900">文档导航</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-primary-600"
            aria-label="关闭导航"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="h-[calc(100%-3.25rem)] overflow-y-auto">{navContent}</div>
      </aside>
    </>
  );
}