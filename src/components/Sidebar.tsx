import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarSection {
  title: string;
  items: { label: string; path: string }[];
}

export default function Sidebar() {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(['快速开始', 'API 参考']);

  const sections: SidebarSection[] = [
    {
      title: '快速开始',
      items: [
        { label: '介绍', path: '/' },
        { label: '安装配置', path: '/getting-started/installation' },
        { label: '快速上手', path: '/getting-started/quickstart' },
        { label: '核心概念', path: '/getting-started/concepts' },
      ],
    },
    {
      title: 'API 参考',
      items: [
        { label: 'API 概览', path: '/api/overview' },
        { label: '认证', path: '/api/authentication' },
        { label: 'Chat API', path: '/api/chat' },
        { label: 'Devices API', path: '/api/devices' },
        { label: 'Automation API', path: '/api/automation' },
        { label: '错误处理', path: '/api/errors' },
      ],
    },
    {
      title: '架构文档',
      items: [
        { label: '系统架构', path: '/architecture/system' },
        { label: '数据模型', path: '/architecture/data-model' },
        { label: '安全架构', path: '/architecture/security' },
      ],
    },
    {
      title: 'SDK 指南',
      items: [
        { label: 'TypeScript', path: '/sdk/typescript' },
        { label: 'Rust', path: '/sdk/rust' },
        { label: 'Python', path: '/sdk/python' },
      ],
    },
  ];

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <nav className="p-4 space-y-6">
        {sections.map((section) => (
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
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
