# 汇纳肉业网站技术规格文档

## 1. 组件清单

### shadcn/ui 组件
| 组件 | 用途 | 自定义需求 |
|------|------|-----------|
| Button | 行动按钮、导航按钮 | 红色主题、悬停动效 |
| Card | 产品卡片、新闻卡片、资质卡片 | 3D悬停效果 |
| Dialog | 证书灯箱、图片放大 | 模糊背景 |
| Badge | 产品标签、日期标签 | 红色主题 |
| Separator | 区域分隔 | 动画绘制效果 |
| ScrollArea | 内容滚动区域 | 自定义滚动条 |

### 自定义组件
| 组件 | 用途 | 复杂度 |
|------|------|--------|
| AnimatedCounter | 统计数字动画 | 中 |
| ParallaxImage | 视差图片组件 | 中 |
| FlipCard | 3D翻转卡片（资质） | 高 |
| RevealOnScroll | 滚动展示包装器 | 中 |
| ParticleBackground | 粒子背景效果 | 高 |
| GradientText | 渐变文字效果 | 低 |
| AnimatedNav | 滚动变形导航 | 高 |

## 2. 动画实现规划

| 动画 | 库 | 实现方式 | 复杂度 |
|------|-----|---------|--------|
| 页面入场动画 | GSAP | ScrollTrigger + Timeline | 高 |
| 导航滚动变形 | GSAP + CSS | ScrollTrigger 监听滚动 | 高 |
| 视差滚动效果 | GSAP | ScrollTrigger scrub | 中 |
| 数字计数动画 | GSAP | Tween 动画 | 低 |
| 3D卡片翻转 | CSS | transform-style: preserve-3d | 中 |
| 卡片悬停效果 | CSS + Framer Motion | hover transforms | 低 |
| 粒子背景 | Canvas/CSS | 自定义粒子系统 | 高 |
| 文字拆分动画 | GSAP | SplitText 效果 | 中 |
| 图片Ken Burns | CSS | scale + translate 动画 | 低 |
| 渐变背景动画 | CSS | background-position 动画 | 低 |

## 3. 项目文件结构

```
app/
├── public/
│   └── images/           # 静态图片资源
├── src/
│   ├── components/       # 可复用组件
│   │   ├── ui/          # shadcn/ui 组件
│   │   ├── AnimatedCounter.tsx
│   │   ├── ParallaxImage.tsx
│   │   ├── FlipCard.tsx
│   │   ├── RevealOnScroll.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── AnimatedNav.tsx
│   ├── sections/        # 页面区域组件
│   │   ├── TopBar.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── Production.tsx
│   │   ├── Certificates.tsx
│   │   ├── News.tsx
│   │   ├── Franchise.tsx
│   │   └── Footer.tsx
│   ├── hooks/           # 自定义 Hooks
│   │   ├── useScrollProgress.ts
│   │   ├── useInView.ts
│   │   └── useMediaQuery.ts
│   ├── lib/             # 工具函数
│   │   └── utils.ts
│   ├── styles/          # 样式文件
│   │   └── globals.css
│   ├── App.tsx          # 主应用组件
│   └── main.tsx         # 入口文件
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 4. 依赖清单

### 核心依赖
```json
{
  "gsap": "^3.12.5",
  "framer-motion": "^11.0.0",
  "lucide-react": "^0.400.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0"
}
```

### 开发依赖
- TypeScript
- Vite
- Tailwind CSS
- PostCSS
- Autoprefixer

## 5. 性能优化策略

### 动画性能
- 仅使用 `transform` 和 `opacity` 属性
- 动画前添加 `will-change`，动画后移除
- 使用 CSS `contain` 属性
- 滚动事件节流处理

### 图片优化
- 使用 WebP 格式
- 实现懒加载
- 提供响应式图片

### 代码分割
- 按区域懒加载组件
- 动态导入 GSAP 插件

## 6. 响应式断点

| 断点 | 宽度 | 动画调整 |
|------|------|---------|
| sm | 640px | 简化粒子效果 |
| md | 768px | 减少视差强度 |
| lg | 1024px | 完整动画效果 |
| xl | 1280px | 完整动画效果 |

## 7. 可访问性

- 支持 `prefers-reduced-motion`
- 键盘导航支持
- ARIA 标签
- 足够的颜色对比度
