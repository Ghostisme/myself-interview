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
  title: string;
  description: string;
  challenges: Challenge[];
}

export const gameData: { levels: Level[] } = {
  levels: [
    {
      id: 1,
      title: "第一关：全能装备库 (词汇矩阵)",
      description: "面试高频技术词汇，涵盖听写、发音、英译中",
      challenges: [
        { id: "1-1", type: "multiple_choice", prompt: "听音选词：Aspire", audioText: "Aspire", answer: "渴望 / 立志做某事", options: ["启发", "渴望 / 立志做某事", "过期", "结合"] },
        { id: "1-2", type: "speak", prompt: "朗读训练：编排", answer: "Orchestration", audioText: "Orchestration" },
        { id: "1-3", type: "listen_type", prompt: "听写训练：(提示：状态管理库)", audioText: "Zustand", answer: "Zustand" },
        { id: "1-4", type: "multiple_choice", prompt: "听音选词：Healthcare", audioText: "Healthcare", answer: "医疗保健", options: ["健康保险", "可靠性", "医疗保健", "健康检查"] },
        { id: "1-5", type: "speak", prompt: "朗读训练：后端框架", answer: "FastAPI", audioText: "FastAPI" },
        { id: "1-6", type: "listen_type", prompt: "听写训练：(提示：AI工作流)", audioText: "LangGraph", answer: "LangGraph" },
        { id: "1-7", type: "multiple_choice", prompt: "听音选词：Compression", audioText: "Compression", answer: "压缩 (常用于上下文)", options: ["流式响应", "可靠性", "压缩 (常用于上下文)", "可扩展性"] },
        { id: "1-8", type: "speak", prompt: "朗读训练：系统架构", answer: "Architecture", audioText: "Architecture" },
        { id: "1-9", type: "listen_type", prompt: "听写训练：(提示：流式响应)", audioText: "Streaming", answer: "Streaming" },
        { id: "1-10", type: "multiple_choice", prompt: "听音选词：Reliability", audioText: "Reliability", answer: "可靠性", options: ["可扩展性", "可靠性", "整合", "部署"] },
        { id: "1-11", type: "listen_type", prompt: "听写训练：(提示：可扩展性)", audioText: "Scalability", answer: "Scalability" },
        { id: "1-12", type: "multiple_choice", prompt: "听音选词：Authentication", audioText: "Authentication", answer: "身份验证", options: ["权限控制", "部署", "身份验证", "集成"] },
        { id: "1-13", type: "speak", prompt: "朗读训练：权限与授权", answer: "Permission", audioText: "Permission" },
        { id: "1-14", type: "listen_type", prompt: "听写训练：(提示：全栈工程师)", audioText: "Full-stack engineer", answer: "Full-stack engineer" },
        { id: "1-15", type: "speak", prompt: "朗读训练：集成与整合", answer: "Integration", audioText: "Integration" }
      ]
    },
    {
      id: 2,
      title: "第二关：九年磨一剑 (自我介绍肌肉记忆)",
      description: "彻底掌握你的专属高阶个人介绍，形成条件反射",
      challenges: [
        { id: "2-1", type: "translate_blocks", prompt: "你好，我叫Rich。我有大约9年的软件工程经验。", answer: "Hi, my name is Rich. I have around nine years of software engineering experience.", blocks: ["Hi,", "my name is Rich.", "I have", "around nine years", "of software", "engineering experience."] },
        { id: "2-2", type: "listen_type", prompt: "听写前半句：我有大约9年的软件工程经验。", audioText: "I have around nine years of software engineering experience.", answer: "I have around nine years of software engineering experience." },
        { id: "2-3", type: "speak", prompt: "大声朗读：", answer: "I started my career as a frontend engineer.", audioText: "I started my career as a frontend engineer." },
        { id: "2-4", type: "translate_blocks", prompt: "主要使用 React, Vue, Next.js, Node.js 等。", answer: "Mainly working with React, Vue, Next.js, Node.js, and more.", blocks: ["Mainly", "working with", "React, Vue,", "Next.js, Node.js,", "and more."] },
        { id: "2-5", type: "listen_type", prompt: "听写重点转型：", audioText: "In recent years, I have been focusing on full-stack engineering and AI agent engineering.", answer: "In recent years, I have been focusing on full-stack engineering and AI agent engineering." },
        { id: "2-6", type: "speak", prompt: "大声朗读技术范围：", answer: "Mainly working on Next.js, Node.js, and Python.", audioText: "Mainly working on Next.js, Node.js, and Python." },
        { id: "2-7", type: "translate_blocks", prompt: "目前，我是一名前栈工程师，构建AI应用。", answer: "Currently, I am a full-stack engineer. I build AI applications.", blocks: ["Currently,", "I am a", "full-stack engineer.", "I build", "AI applications."] },
        { id: "2-8", type: "speak", prompt: "大声朗读你的综合能力：", answer: "Including frontend, backend services and BFF, Python and FastAPI backend design.", audioText: "Including frontend, backend services and BFF, Python and FastAPI backend design." },
        { id: "2-9", type: "translate_blocks", prompt: "我的技术栈包括 React, Vue, Node.js, Python, 和 Go。", answer: "My stack includes React, Vue, Node.js, Python, and Go.", blocks: ["My stack", "includes", "React, Vue,", "Node.js,", "Python, and Go."] },
        { id: "2-10", type: "listen_type", prompt: "听写你的热爱(加分项)：", audioText: "I really like coding, because it feels like playing games, and it makes me happy.", answer: "I really like coding, because it feels like playing games, and it makes me happy." },
        { id: "2-11", type: "translate_blocks", prompt: "我对 Aeris Health 很感兴趣，因为这个角色结合了AI与医疗。", answer: "I'm very interested in Aeris Health because this role combines AI with healthcare.", blocks: ["I'm very interested", "in Aeris Health", "because this role", "combines AI", "with healthcare."] },
        { id: "2-12", type: "speak", prompt: "大声朗读你的最终期望：", answer: "I aspire to build scalable and reliable systems at Aeris Health.", audioText: "I aspire to build scalable and reliable systems at Aeris Health." }
      ]
    },
    {
      id: 3,
      title: "第三关：三层架构推演 (系统设计)",
      description: "流利解析你的 Frontend -> BFF -> Agent 数据链路",
      challenges: [
        { id: "3-1", type: "translate_blocks", prompt: "我们的系统架构主要分为三层。", answer: "Our system architecture has three main layers.", blocks: ["Our system", "architecture", "has three", "main layers."] },
        { id: "3-2", type: "speak", prompt: "朗读前端职责：", answer: "The frontend layer uses Next.js and React. It provides the dynamic UI and streaming rendering.", audioText: "The frontend layer uses Next.js and React. It provides the dynamic UI and streaming rendering." },
        { id: "3-3", type: "listen_type", prompt: "听写：BFF层的技术", audioText: "The BFF layer uses Node.js and NestJS.", answer: "The BFF layer uses Node.js and NestJS." },
        { id: "3-4", type: "translate_blocks", prompt: "BFF层分离了业务逻辑，处理用户身份验证。", answer: "The BFF layer separates business logic and handles user authentication.", blocks: ["The BFF layer", "separates", "business logic", "and handles", "user authentication."] },
        { id: "3-5", type: "speak", prompt: "大声朗读AI层：", answer: "The AI layer uses Python and LangGraph.", audioText: "The AI layer uses Python and LangGraph." },
        { id: "3-6", type: "listen_type", prompt: "听写：Agent做了什么？", audioText: "It connects to LLMs and orchestrates agent workflows.", answer: "It connects to LLMs and orchestrates agent workflows." },
        { id: "3-7", type: "translate_blocks", prompt: "对于数据流转，用户从前端发送消息。", answer: "For the data flow, the user sends a message from the frontend.", blocks: ["For the", "data flow,", "the user sends", "a message", "from the frontend."] },
        { id: "3-8", type: "speak", prompt: "朗读链路校验：", answer: "The BFF validates the permission and calls the Python Agent.", audioText: "The BFF validates the permission and calls the Python Agent." },
        { id: "3-9", type: "listen_type", prompt: "听写链路终点：", audioText: "Finally, the Agent executes the task and streams the response back.", answer: "Finally, the Agent executes the task and streams the response back." },
        { id: "3-10", type: "translate_blocks", prompt: "为什么需要BFF层？主要原因是关注点分离。", answer: "Why do we need a BFF layer? The main reason is separation of concerns.", blocks: ["Why do we need", "a BFF layer?", "The main reason is", "separation of concerns."] }
      ]
    },
    {
      id: 4,
      title: "第四关：硬核难点拆解 (PRAR逻辑训练)",
      description: "Zustand状态同步、Token压缩与0.8s时延优化",
      challenges: [
        { id: "4-1", type: "translate_blocks", prompt: "最困难的部分是在AI对话期间管理复杂状态。", answer: "The most difficult part was managing complex states during AI conversations.", blocks: ["The most", "difficult part", "was managing", "complex states", "during AI conversations."] },
        { id: "4-2", type: "speak", prompt: "朗读：为什么难？", answer: "We had to handle streaming responses, tool calling status, and feedback at the same time.", audioText: "We had to handle streaming responses, tool calling status, and feedback at the same time." },
        { id: "4-3", type: "listen_type", prompt: "听写：你的破局点", audioText: "We solved this by building a robust state center using Zustand.", answer: "We solved this by building a robust state center using Zustand." },
        { id: "4-4", type: "translate_blocks", prompt: "长对话消耗了太多 Token 并且会导致模型错误。", answer: "Long conversations consume too many tokens and can cause model errors.", blocks: ["Long conversations", "consume", "too many tokens", "and can cause", "model errors."] },
        { id: "4-5", type: "speak", prompt: "大声朗读优化手段：", answer: "We implemented dialogue summary and context compression.", audioText: "We implemented dialogue summary and context compression." },
        { id: "4-6", type: "listen_type", prompt: "听写：压缩的结果", audioText: "This action reduced token usage by around 60% and improved stability.", answer: "This action reduced token usage by around 60% and improved stability." },
        { id: "4-7", type: "translate_blocks", prompt: "我们如何优化前端性能？初始交互有点慢。", answer: "How did we optimize frontend performance? The initial interaction was a bit slow.", blocks: ["How did we", "optimize", "frontend performance?", "The initial interaction", "was a bit slow."] },
        { id: "4-8", type: "speak", prompt: "大声朗读渲染优化：", answer: "We optimized the streaming rendering and the frontend data flow.", audioText: "We optimized the streaming rendering and the frontend data flow." },
        { id: "4-9", type: "listen_type", prompt: "听写：性能的结果", audioText: "As a result, we reduced the first-screen interaction latency to under 0.8 seconds.", answer: "As a result, we reduced the first-screen interaction latency to under 0.8 seconds." },
        { id: "4-10", type: "translate_blocks", prompt: "如果工具失败，Python Agent 捕获错误并返回失败状态。", answer: "If a tool fails, the Python Agent catches the error and returns a failure status.", blocks: ["If a tool fails,", "the Python Agent", "catches the error", "and returns", "a failure status."] }
      ]
    },
    {
      id: 5,
      title: "第五关：AI视角降维打击 (业务认知)",
      description: "体现出你不盲目追捧大模型，注重应用工程落地",
      challenges: [
        { id: "5-1", type: "translate_blocks", prompt: "我的经验主要在AI应用工程。", answer: "My experience is mainly in AI application engineering.", blocks: ["My experience", "is mainly in", "AI application", "engineering."] },
        { id: "5-2", type: "listen_type", prompt: "听写：你对Agent的定义", audioText: "An agent combines LLM reasoning, tools, memory and workflows to complete tasks.", answer: "An agent combines LLM reasoning, tools, memory and workflows to complete tasks." },
        { id: "5-3", type: "speak", prompt: "朗读：为什么不用普通LLM调用？", answer: "Simple LLM calls cannot handle multi-step tasks well.", audioText: "Simple LLM calls cannot handle multi-step tasks well." },
        { id: "5-4", type: "translate_blocks", prompt: "LangGraph非常适合管理状态化的Agent工作流。", answer: "LangGraph is great for managing stateful agent workflows.", blocks: ["LangGraph is great", "for managing", "stateful", "agent workflows."] },
        { id: "5-5", type: "listen_type", prompt: "听写：你对RAG的定义", audioText: "For a RAG system, it retrieves relevant information from a knowledge base.", answer: "For a RAG system, it retrieves relevant information from a knowledge base." },
        { id: "5-6", type: "speak", prompt: "朗读：RAG的后续处理", answer: "And provides it to the LLM as context.", audioText: "And provides it to the LLM as context." },
        { id: "5-7", type: "translate_blocks", prompt: "我的重点不是训练基础大模型。", answer: "My focus is not training foundation models.", blocks: ["My focus", "is not", "training", "foundation models."] },
        { id: "5-8", type: "speak", prompt: "朗读：你的核心侧重点", answer: "My focus is building reliable applications around LLM capabilities.", audioText: "My focus is building reliable applications around LLM capabilities." },
        { id: "5-9", type: "listen_type", prompt: "听写：你的工程目标", answer: "The goal was to build a reliable and scalable AI product.", audioText: "The goal was to build a reliable and scalable AI product." }
      ]
    },
    {
      id: 6,
      title: "第六关：HR对决与临场闪避 (沟通技巧)",
      description: "回答求职动机，并在没听懂时争取时间",
      challenges: [
        { id: "6-1", type: "translate_blocks", prompt: "我希望在一个更国际化的环境中工作。", answer: "I want to work in a more international environment.", blocks: ["I want", "to work in", "a more", "international environment."] },
        { id: "6-2", type: "speak", prompt: "朗读：寻找结合点", answer: "I am looking for a role where I can combine my software engineering experience with AI.", audioText: "I am looking for a role where I can combine my software engineering experience with AI." },
        { id: "6-3", type: "listen_type", prompt: "听写：为什么看好医疗行业", audioText: "I think healthcare is a very meaningful industry.", answer: "I think healthcare is a very meaningful industry." },
        { id: "6-4", type: "translate_blocks", prompt: "我相信AI能改善医疗产品和运营效率。", answer: "I believe AI can improve healthcare products and operational efficiency.", blocks: ["I believe", "AI can improve", "healthcare products", "and operational", "efficiency."] },
        { id: "6-5", type: "speak", prompt: "朗读：最终愿景", answer: "I aspire to build scalable and reliable systems at Aeris Health.", audioText: "I aspire to build scalable and reliable systems at Aeris Health." },
        { id: "6-6", type: "listen_type", prompt: "听写闪避话术1：请求重复", audioText: "Sorry, could you rephrase the question?", answer: "Sorry, could you rephrase the question?" },
        { id: "6-7", type: "translate_blocks", prompt: "那是好问题。让我想想我的项目...", answer: "That is a good question. Let me think about my project...", blocks: ["That is", "a good question.", "Let me think", "about my project..."] },
        { id: "6-8", type: "speak", prompt: "朗读转移话题话术：", answer: "I don't have much experience in that, but in my project, I solved a similar problem using Zustand.", audioText: "I don't have much experience in that, but in my project, I solved a similar problem using Zustand." },
        { id: "6-9", type: "listen_type", prompt: "听写：当你被问到除了工作外为什么写代码", audioText: "It feels like playing games, and it makes me happy.", answer: "It feels like playing games, and it makes me happy." }
      ]
    },
    {
      id: 7,
      title: "第七关：终极大考 (全英文语音面霸版)",
      description: "抛开字幕和提示，直接用英文语音回击面试官！",
      challenges: [
        { id: "7-1", type: "interview_qa", prompt: "Hi Rich, could you tell me a little bit about yourself and your background?", audioText: "Hi Rich, could you tell me a little bit about yourself and your background?", answer: "nine stack ai applications" },
        { id: "7-2", type: "interview_qa", prompt: "What drives you to be a software engineer? Why do you like coding?", audioText: "What drives you to be a software engineer? Why do you like coding?", answer: "games happy" },
        { id: "7-3", type: "interview_qa", prompt: "Can you explain the system architecture of your recent AI project?", audioText: "Can you explain the system architecture of your recent AI project?", answer: "next.js nestjs langgraph" },
        { id: "7-4", type: "interview_qa", prompt: "What was the most difficult technical challenge you faced, and how did you solve it?", audioText: "What was the most difficult technical challenge you faced, and how did you solve it?", answer: "state zustand" },
        { id: "7-5", type: "interview_qa", prompt: "LLMs can be expensive and slow. How do you handle token limits in long conversations?", audioText: "LLMs can be expensive and slow. How do you handle token limits in long conversations?", answer: "context compression" },
        { id: "7-6", type: "interview_qa", prompt: "How did you optimize the frontend performance for your AI application?", audioText: "How did you optimize the frontend performance for your AI application?", answer: "latency seconds" },
        { id: "7-7", type: "interview_qa", prompt: "What is your understanding of an AI Agent compared to a simple LLM call?", audioText: "What is your understanding of an AI Agent compared to a simple LLM call?", answer: "reasoning tools workflow" },
        { id: "7-8", type: "interview_qa", prompt: "Why do you want to join Aeris Health specifically?", audioText: "Why do you want to join Aeris Health specifically?", answer: "healthcare combine reliable" },
        { id: "7-9", type: "interview_qa", prompt: "Do you have any experience training large foundation models?", audioText: "Do you have any experience training large foundation models?", answer: "application engineering reliable" },
        { id: "7-10", type: "interview_qa", prompt: "One last question: How do you handle a situation where a tool call fails in your AI workflow?", audioText: "One last question: How do you handle a situation where a tool call fails in your AI workflow?", answer: "catches error status" }
      ]
    }
  ]
};