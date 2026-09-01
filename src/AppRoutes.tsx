import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Installation from './pages/Installation';
import QuickStart from './pages/QuickStart';
import APIOverview from './pages/APIOverview';
import Authentication from './pages/Authentication';
import Errors from './pages/Errors';
import SystemArchitecture from './pages/SystemArchitecture';
import SecurityArchitecture from './pages/SecurityArchitecture';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';

/**
 * 路由表组件 —— 仅包含路由声明，方便测试用 MemoryRouter 注入 initialEntries。
 * 9 个 Round-3 死链对应的占位路由 + 通配 404 兜底全部在此注册。
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getting-started/installation" element={<Installation />} />
      <Route path="/getting-started/quickstart" element={<QuickStart />} />
      <Route path="/api/overview" element={<APIOverview />} />
      <Route path="/api/authentication" element={<Authentication />} />
      <Route path="/api/errors" element={<Errors />} />
      <Route path="/architecture/system" element={<SystemArchitecture />} />
      <Route path="/architecture/security" element={<SecurityArchitecture />} />

      {/* Round-3 占位路由 —— 8 个原 Sidebar 死链的 Coming Soon 页面 */}
      <Route
        path="/concepts"
        element={
          <ComingSoon
            title="核心概念"
            description="HamR「人时事物境」五维数据模型与家庭智能助理的核心理念整理中。"
          />
        }
      />
      <Route
        path="/chat"
        element={
          <ComingSoon
            title="Chat API"
            description="与 HamR 智能助理对话的完整接口规范、消息格式与上下文约定正在编写。"
          />
        }
      />
      <Route
        path="/devices"
        element={
          <ComingSoon
            title="Devices API"
            description="智能设备接入、控制指令、状态查询等端点文档正在编写。"
          />
        }
      />
      <Route
        path="/automation"
        element={
          <ComingSoon
            title="Automation API"
            description="家庭自动化规则引擎、触发器与执行链路的完整 API 正在编写。"
          />
        }
      />
      <Route
        path="/data-model"
        element={
          <ComingSoon
            title="数据模型"
            description="HamR 五维数据模型（人 / 时 / 事 / 物 / 境）的字段、关系与索引策略正在编写。"
          />
        }
      />
      <Route
        path="/sdks/typescript"
        element={
          <ComingSoon
            title="TypeScript SDK"
            description="@hamr/core TypeScript SDK 的安装、初始化、类型定义与示例代码正在编写。"
          />
        }
      />
      <Route
        path="/sdks/rust"
        element={
          <ComingSoon
            title="Rust SDK"
            description="hamr-sdk Rust crate 的依赖、异步客户端与错误处理范式正在编写。"
          />
        }
      />
      <Route
        path="/sdks/python"
        element={
          <ComingSoon
            title="Python SDK"
            description="hamr Python 包的安装、httpx 异步客户端与类型注解正在编写。"
          />
        }
      />

      {/* 兜底 404 —— 任何未匹配路由都会落到这里 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}