export type ChallengeType = "translate_blocks" | "listen_type" | "speak" | "multiple_choice" | "interview_qa";

export interface Challenge {
  id: string;
  type: ChallengeType;
  prompt: string; 
  answer: string; 
  blocks?: string[]; 
  options?: string[]; 
  audioText?: string; 
}

export interface Level {
  id: number;
  chapter: number;
  chapterTitle: string;
  title: string;
  description: string;
  challenges: Challenge[];
}

export const gameData: { levels: Level[] } = {
  levels: [
    // ================= CHAPTER 1: 14-DAY INTERVIEW PREP =================
    {
      id: 1,
      chapter: 1,
      chapterTitle: "CHAPTER 1: THE 14-DAY INTERVIEW TRIAL",
      title: "Level 1: 核心词汇矩阵 (Core Vocab)",
      description: "面试高频词汇：Aspire, Combine, FastAPI, LangGraph 等",
      challenges: [
        { id: "1-1", type: "multiple_choice", prompt: "听音选词：Aspire", audioText: "Aspire", answer: "渴望 / 立志做某事", options: ["启发", "渴望 / 立志做某事", "过期", "结合"] },
        { id: "1-2", type: "speak", prompt: "朗读训练：结合", answer: "Combine", audioText: "Combine" },
        { id: "1-3", type: "listen_type", prompt: "听写训练：(提示：后端框架)", audioText: "FastAPI", answer: "FastAPI" },
        { id: "1-4", type: "multiple_choice", prompt: "听音选词：Healthcare", audioText: "Healthcare", answer: "医疗保健", options: ["健康保险", "可靠性", "医疗保健", "健康检查"] },
        { id: "1-5", type: "speak", prompt: "朗读训练：编排", answer: "Orchestration", audioText: "Orchestration" },
        { id: "1-6", type: "listen_type", prompt: "听写训练：(提示：状态管理库)", audioText: "Zustand", answer: "Zustand" },
        { id: "1-7", type: "multiple_choice", prompt: "听音选词：Compression", audioText: "Compression", answer: "压缩 (常用于上下文)", options: ["流式响应", "可靠性", "压缩 (常用于上下文)", "可扩展性"] }
      ]
    },
    {
      id: 2,
      chapter: 1,
      chapterTitle: "CHAPTER 1: THE 14-DAY INTERVIEW TRIAL",
      title: "Level 2: 九年磨一剑 (Self Intro)",
      description: "彻底掌握你的专属9年全栈与AI开发自我介绍",
      challenges: [
        { id: "2-1", type: "translate_blocks", prompt: "你好，我叫Rich。我有大约9年的软件工程经验。", answer: "Hi, my name is Rich. I have around nine years of software engineering experience.", blocks: ["Hi,", "my name is Rich.", "I have", "around nine years", "of software", "engineering experience."] },
        { id: "2-2", type: "listen_type", prompt: "听写前半句：(早期经历)", audioText: "I started my career as a frontend engineer.", answer: "I started my career as a frontend engineer." },
        { id: "2-3", type: "translate_blocks", prompt: "主要使用 React, Vue, Next.js, Node.js 等。", answer: "Mainly working with React, Vue, Next.js, Node.js, and more.", blocks: ["Mainly", "working with", "React, Vue,", "Next.js, Node.js,", "and more."] },
        { id: "2-4", type: "speak", prompt: "大声朗读你的转型焦点：", answer: "In recent years, I have been focusing on full-stack engineering and AI agent engineering.", audioText: "In recent years, I have been focusing on full-stack engineering and AI agent engineering." },
        { id: "2-5", type: "listen_type", prompt: "听写核心方向：", audioText: "Currently, I am a full-stack engineer. I build AI applications.", answer: "Currently, I am a full-stack engineer. I build AI applications." },
        { id: "2-6", type: "translate_blocks", prompt: "包括前端、后端服务与BFF、Python及FastAPI后端设计。", answer: "Including frontend, backend services and BFF, Python and FastAPI backend design.", blocks: ["Including frontend,", "backend services and BFF,", "Python and", "FastAPI backend design."] },
        { id: "2-7", type: "speak", prompt: "朗读你的技术栈：", answer: "My stack includes React, Vue, Node.js, Python, and Go.", audioText: "My stack includes React, Vue, Node.js, Python, and Go." },
        { id: "2-8", type: "listen_type", prompt: "听写你的热爱(高光点)：", audioText: "I really like coding, because it feels like playing games, and it makes me happy.", answer: "I really like coding, because it feels like playing games, and it makes me happy." },
        { id: "2-9", type: "translate_blocks", prompt: "我非常对Aeris Health感兴趣，因为这个角色结合了AI与医疗。", answer: "I'm very interested in Aeris Health because this role combines AI with healthcare.", blocks: ["I'm very interested", "in Aeris Health", "because this role", "combines AI", "with healthcare."] },
        { id: "2-10", type: "speak", prompt: "大声朗读最终愿景：", answer: "I aspire to build scalable and reliable systems at Aeris Health.", audioText: "I aspire to build scalable and reliable systems at Aeris Health." }
      ]
    },
    {
      id: 3,
      chapter: 1,
      chapterTitle: "CHAPTER 1: THE 14-DAY INTERVIEW TRIAL",
      title: "Level 3: 三层架构推演 (Architecture)",
      description: "流利解析 Frontend -> BFF -> Agent 链路",
      challenges: [
        { id: "3-1", type: "translate_blocks", prompt: "前端使用Next.js进行UI和流式渲染。", answer: "The frontend uses Next.js for UI and streaming.", blocks: ["The frontend", "uses Next.js", "for UI", "and streaming."] },
        { id: "3-2", type: "speak", prompt: "朗读 BFF 层的职责：", answer: "The BFF layer uses NestJS for separating business logic.", audioText: "The BFF layer uses NestJS for separating business logic." },
        { id: "3-3", type: "translate_blocks", prompt: "AI层使用LangGraph来管理agent工作流。", answer: "The AI layer uses LangGraph to manage agent workflows.", blocks: ["The AI layer", "uses LangGraph", "to manage", "agent workflows."] }
      ]
    },
    {
      id: 4,
      chapter: 1,
      chapterTitle: "CHAPTER 1: THE 14-DAY INTERVIEW TRIAL",
      title: "Level 4: 技术难点拆解 (Challenges)",
      description: "Zustand状态同步与Token压缩的深度解析",
      challenges: [
        { id: "4-1", type: "translate_blocks", prompt: "最困难的部分是在AI对话期间管理复杂状态。", answer: "The most difficult part was managing complex states during AI conversations.", blocks: ["The most", "difficult part", "was managing", "complex states", "during AI conversations."] },
        { id: "4-2", type: "speak", prompt: "讲出你的解决方案：", answer: "We solved this by building a robust state center using Zustand.", audioText: "We solved this by building a robust state center using Zustand." },
        { id: "4-3", type: "listen_type", prompt: "听音听写：(如何减少Token)", audioText: "To reduce token usage, we implemented context compression.", answer: "To reduce token usage, we implemented context compression." }
      ]
    },
    {
      id: 5,
      chapter: 1,
      chapterTitle: "CHAPTER 1: THE 14-DAY INTERVIEW TRIAL",
      title: "Level 5: AI视角降维打击 (AI Focus)",
      description: "清晰表达你对应用落地的侧重",
      challenges: [
        { id: "5-1", type: "speak", prompt: "朗读：我对Agent的理解", answer: "An agent combines LLM reasoning, tools, memory and workflows.", audioText: "An agent combines LLM reasoning, tools, memory and workflows." },
        { id: "5-2", type: "translate_blocks", prompt: "我的重点不是训练基础模型，而是构建可靠的应用。", answer: "My focus is not training foundation models, but building reliable applications.", blocks: ["My focus", "is not training", "foundation models,", "but building", "reliable applications."] }
      ]
    },
    {
      id: 6,
      chapter: 1,
      chapterTitle: "CHAPTER 1: THE 14-DAY INTERVIEW TRIAL",
      title: "Level 6: 临场闪避连招 (HR & Flexibility)",
      description: "遇到听不懂或需缓冲时的绝佳话术",
      challenges: [
        { id: "6-1", type: "listen_type", prompt: "听写：听不懂时的求助语", audioText: "Sorry, could you rephrase the question?", answer: "Sorry, could you rephrase the question?" },
        { id: "6-2", type: "speak", prompt: "朗读：缓冲争取时间的话术", answer: "That is a good question. Let me think about my project for a second.", audioText: "That is a good question. Let me think about my project for a second." },
        { id: "6-3", type: "translate_blocks", prompt: "我在这方面经验不多，但在我的项目中我用Zustand解决了类似问题。", answer: "I don't have much experience in that, but in my project, I solved a similar problem using Zustand.", blocks: ["I don't have", "much experience in that,", "but in my project,", "I solved a similar problem", "using Zustand."] }
      ]
    },
    {
      id: 7,
      chapter: 1,
      chapterTitle: "CHAPTER 1: THE 14-DAY INTERVIEW TRIAL",
      title: "Level 7: 第一章最终 Boss 战 (Interview)",
      description: "全英文口语作答，融合前6关所有核心问题！",
      challenges: [
        { id: "7-1", type: "interview_qa", prompt: "Could you tell me a little bit about yourself?", audioText: "Could you tell me a little bit about yourself?", answer: "nine full-stack ai" },
        { id: "7-2", type: "interview_qa", prompt: "Why do you enjoy coding so much?", audioText: "Why do you enjoy coding so much?", answer: "games happy" },
        { id: "7-3", type: "interview_qa", prompt: "What does your current AI stack look like?", audioText: "What does your current AI stack look like?", answer: "python fastapi llm" },
        { id: "7-4", type: "interview_qa", prompt: "What was the biggest challenge in your project?", audioText: "What was the biggest challenge in your project?", answer: "state zustand" },
        { id: "7-5", type: "interview_qa", prompt: "Why are you interested in Aeris Health specifically?", audioText: "Why are you interested in Aeris Health specifically?", answer: "healthcare combine reliable" }
      ]
    },

    // ================= CHAPTER 2: EXTENDED MASTERY (FUTURE) =================
    {
      id: 8,
      chapter: 2,
      chapterTitle: "CHAPTER 2: THE MASTER'S PATH (EXTENDED LEARNING)",
      title: "Level 8: 进阶前端魔法 (Advanced Frontend)",
      description: "掌握深层前端工程化与渲染原理的英文表达",
      challenges: [
        { id: "8-1", type: "multiple_choice", prompt: "词意选择：Hydration 是什么意思？", audioText: "Hydration", answer: "注水 (将静态HTML转换为可交互的React树)", options: ["服务器端渲染", "注水 (将静态HTML转换为可交互的React树)", "状态管理", "内存泄漏"] },
        { id: "8-2", type: "speak", prompt: "朗读：服务器端渲染提高了SEO和初始加载时间。", answer: "Server-side rendering improves SEO and initial load time.", audioText: "Server-side rendering improves SEO and initial load time." },
        { id: "8-3", type: "listen_type", prompt: "听写：我们用记忆化来防止不必要的重渲染。", audioText: "We use memoization to prevent unnecessary re-renders.", answer: "We use memoization to prevent unnecessary re-renders." },
        { id: "8-4", type: "translate_blocks", prompt: "这是客户端渲染与服务端渲染之间的权衡。", answer: "It is a trade-off between client-side rendering and server-side rendering.", blocks: ["It is a trade-off", "between", "client-side rendering", "and", "server-side rendering."] }
      ]
    },
    {
      id: 9,
      chapter: 2,
      chapterTitle: "CHAPTER 2: THE MASTER'S PATH (EXTENDED LEARNING)",
      title: "Level 9: 后端高并发架构 (Backend Scale)",
      description: "讨论微服务、高并发、吞吐量与数据库分片",
      challenges: [
        { id: "9-1", type: "multiple_choice", prompt: "词意选择：Concurrency", audioText: "Concurrency", answer: "并发", options: ["一致性", "并发", "部署", "延迟"] },
        { id: "9-2", type: "listen_type", prompt: "听写：我们实现了数据库分片来处理高吞吐量。", audioText: "We implemented database sharding to handle high throughput.", answer: "We implemented database sharding to handle high throughput." },
        { id: "9-3", type: "speak", prompt: "朗读：保证API的幂等性至关重要。", answer: "Ensuring the idempotency of the API is crucial.", audioText: "Ensuring the idempotency of the API is crucial." },
        { id: "9-4", type: "translate_blocks", prompt: "微服务架构帮助我们独立扩展不同的模块。", answer: "Microservices architecture helps us scale different modules independently.", blocks: ["Microservices", "architecture helps us", "scale different modules", "independently."] }
      ]
    },
    {
      id: 10,
      chapter: 2,
      chapterTitle: "CHAPTER 2: THE MASTER'S PATH (EXTENDED LEARNING)",
      title: "Level 10: DevOps与云原生 (Cloud Native)",
      description: "CI/CD流水线、Docker、K8s与零停机部署",
      challenges: [
        { id: "10-1", type: "speak", prompt: "朗读：容器化", answer: "Containerization", audioText: "Containerization" },
        { id: "10-2", type: "listen_type", prompt: "听写：强大的CI/CD流水线确保了零停机部署。", audioText: "A robust CI/CD pipeline ensures zero-downtime deployments.", answer: "A robust CI/CD pipeline ensures zero-downtime deployments." },
        { id: "10-3", type: "translate_blocks", prompt: "我们通过自动化测试来捕捉回归错误。", answer: "We catch regressions through automated testing.", blocks: ["We catch regressions", "through", "automated testing."] },
        { id: "10-4", type: "multiple_choice", prompt: "词意选择：Telemetry", audioText: "Telemetry", answer: "遥测 (监控/日志数据收集)", options: ["遥测 (监控/日志数据收集)", "容器编排", "环境配置", "回滚"] }
      ]
    },
    {
      id: 11,
      chapter: 2,
      chapterTitle: "CHAPTER 2: THE MASTER'S PATH (EXTENDED LEARNING)",
      title: "Level 11: 深入大模型与AI基建 (Deep AI)",
      description: "微调、向量数据库、语义搜索与幻觉探讨",
      challenges: [
        { id: "11-1", type: "multiple_choice", prompt: "词意选择：Hallucination", audioText: "Hallucination", answer: "幻觉 (大模型胡说八道)", options: ["提示工程", "嵌入层", "幻觉 (大模型胡说八道)", "参数微调"] },
        { id: "11-2", type: "listen_type", prompt: "听写：向量数据库对于语义搜索至关重要。", audioText: "Vector databases are essential for semantic search.", answer: "Vector databases are essential for semantic search." },
        { id: "11-3", type: "translate_blocks", prompt: "为了减少大模型的幻觉，我们在Prompt中注入了外部上下文。", answer: "To reduce LLM hallucinations, we inject external context into the prompt.", blocks: ["To reduce", "LLM hallucinations,", "we inject external context", "into the prompt."] },
        { id: "11-4", type: "speak", prompt: "朗读：微调开源模型成本太高。", answer: "Fine-tuning open-source models is too expensive.", audioText: "Fine-tuning open-source models is too expensive." }
      ]
    },
    {
      id: 12,
      chapter: 2,
      chapterTitle: "CHAPTER 2: THE MASTER'S PATH (EXTENDED LEARNING)",
      title: "Level 12: 敏捷团队与纯正黑话 (Tech Slang)",
      description: "Daily Standup, LGTM, Yak Shaving 等地道表达",
      challenges: [
        { id: "12-1", type: "multiple_choice", prompt: "地道俚语：什么是 'Yak Shaving' (剃牦牛)？", audioText: "Yak Shaving", answer: "为了解决一个问题，陷入了无穷无尽的前置任务中", options: ["后端性能优化", "为了解决一个问题，陷入了无穷无尽的前置任务中", "编写样板代码", "敏捷冲刺复盘"] },
        { id: "12-2", type: "speak", prompt: "朗读口语：看起来不错，我来合并代码。(LGTM)", answer: "Looks good to me, merging now.", audioText: "Looks good to me, merging now." },
        { id: "12-3", type: "listen_type", prompt: "听写站会常用语：我们站会后碰一下吧。", audioText: "Let's touch base after the daily standup.", answer: "Let's touch base after the daily standup." },
        { id: "12-4", type: "translate_blocks", prompt: "我们需要在发布下一个主要功能前减少技术债。", answer: "We need to minimize technical debt before shipping the next major feature.", blocks: ["We need to", "minimize technical debt", "before shipping", "the next major feature."] }
      ]
    },
    {
      id: 13,
      chapter: 2,
      chapterTitle: "CHAPTER 2: THE MASTER'S PATH (EXTENDED LEARNING)",
      title: "Level 13: 技术决策与争论 (Trade-offs)",
      description: "在会议中如何用地道英文辩论与探讨权衡",
      challenges: [
        { id: "13-1", type: "translate_blocks", prompt: "另一方面，这可能会成为系统的瓶颈。", answer: "On the flip side, this might become a bottleneck in the system.", blocks: ["On the flip side,", "this might become", "a bottleneck", "in the system."] },
        { id: "13-2", type: "listen_type", prompt: "听写：这虽然是个变通方法，但不够优雅。", audioText: "It is a workaround, but it is not elegant enough.", answer: "It is a workaround, but it is not elegant enough." },
        { id: "13-3", type: "speak", prompt: "朗读：我们需要权衡一致性与可用性。", answer: "We have to trade off between consistency and availability.", audioText: "We have to trade off between consistency and availability." },
        { id: "13-4", type: "multiple_choice", prompt: "词意选择：Deprecated", audioText: "Deprecated", answer: "已废弃 / 不推荐使用", options: ["重构", "已废弃 / 不推荐使用", "部署", "黑客马拉松"] }
      ]
    },
    {
      id: 14,
      chapter: 2,
      chapterTitle: "CHAPTER 2: THE MASTER'S PATH (EXTENDED LEARNING)",
      title: "Level 14: 领导力与大局观 (Leadership)",
      description: "展现高 P 的架构视野、团队辅导与技术愿景",
      challenges: [
        { id: "14-1", type: "translate_blocks", prompt: "作为技术负责人，我辅导初级开发人员以确保代码质量。", answer: "As a tech lead, I mentor junior developers to ensure code quality.", blocks: ["As a tech lead,", "I mentor", "junior developers", "to ensure code quality."] },
        { id: "14-2", type: "speak", prompt: "大声朗读你的原则：", answer: "I strongly believe in writing clean, testable, and self-documenting code.", audioText: "I strongly believe in writing clean, testable, and self-documenting code." },
        { id: "14-3", type: "listen_type", prompt: "听写跨部门协作：", audioText: "I collaborate closely with product managers and designers to align technical solutions with business goals.", answer: "I collaborate closely with product managers and designers to align technical solutions with business goals." },
        { id: "14-4", type: "translate_blocks", prompt: "我的长期目标是成长为一名全能的软件架构师。", answer: "My long-term goal is to grow into a well-rounded software architect.", blocks: ["My long-term goal", "is to grow into", "a well-rounded", "software architect."] }
      ]
    },
    {
      id: 15,
      chapter: 2,
      chapterTitle: "CHAPTER 2: THE MASTER'S PATH (EXTENDED LEARNING)",
      title: "Level 15: 进阶隐藏 Boss 战 (Advanced Interview)",
      description: "更高难度的系统设计与软技能全真拷问",
      challenges: [
        { id: "15-1", type: "interview_qa", prompt: "Can you explain the trade-offs between Client-Side Rendering and Server-Side Rendering?", audioText: "Can you explain the trade-offs between Client-Side Rendering and Server-Side Rendering?", answer: "seo initial load" },
        { id: "15-2", type: "interview_qa", prompt: "How do you handle technical debt while still delivering features on time?", audioText: "How do you handle technical debt while still delivering features on time?", answer: "minimize shipping major" },
        { id: "15-3", type: "interview_qa", prompt: "What is your approach to mitigating LLM hallucinations in a RAG system?", audioText: "What is your approach to mitigating LLM hallucinations in a RAG system?", answer: "context prompt vector" },
        { id: "15-4", type: "interview_qa", prompt: "As a leader, how do you ensure your team maintains high code quality?", audioText: "As a leader, how do you ensure your team maintains high code quality?", answer: "mentor junior review" }
      ]
    }
  ]
};