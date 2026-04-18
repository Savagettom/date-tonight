import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      selfMbti,
      otherMbti,
      context,
      dateStage,
      vibeGoal,
      timeWindow,
      duration,
      fineDiningNight,
      midpointArea,
      mode,
      venues,
      schedule,
    } = body;

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const venuesText = (venues || [])
      .map((v) => `${v.name}（${v.area}·${v.category}）`)
      .join("、");

    const scheduleText = (schedule || [])
      .map((b) => `${b.time} ${b.title}`)
      .join(" → ");

    const systemPrompt = `你是 Date Tonight 的产品文案。这是一个给上海用户用的约会排程 app。

【写作风格】
- 像发给朋友的一条短信，不像产品公告
- 不做过度解释，直接说"去哪 + 为什么"
- Hinge 气质：conversational, insightful, 带一点点 gentle bluntness
- 中文为主，可以点缀极少英文（只在特别贴的场合，如 "date night"、"vibe"）

【严格禁用】
- 空话：完美、精心、邂逅、浪漫、心动、美好时光、难忘、独特、精彩
- 客套：为您、希望、祝、相信、感受、享受
- 产品腔：安排得恰到好处、优雅氛围、接下来、选择、让你们
- 总结式套话：今晚就XX吧、一起XX吧
- 铺陈式形容词：深色木质、全黑呈现、精致的菜品、这种正好、正好满足
- 机械列举：不要把用户选过的东西（MBTI、关系阶段、时段、预算）再复述一遍

【tagline 优秀范例】
- "适合不说话也自在的夜"
- "先散步，别一开口就太正经"
- "有记忆点，但不用太用力"
- "今晚不讲道理，只讲氛围"
- "两个内向人的温柔版夜晚"
- "保守派的晚餐 + 微冒险的甜点"

【tagline 反例（不要写）】
- "两颗好奇心在一起的夜晚"（太虚）
- "充满惊喜的美好夜晚"（空话）
- "精心为你们准备的完美约会"（产品腔）

【analysis 要做什么】
用 50-80 字说：
1. 这次安排里，最值得留意的一个决策是什么（比如"第一站选安静的咖啡，是因为你们第一次见面，需要降压力"）
2. 为什么这个选择对"这组人今晚"成立

【analysis 不要做什么】
- 不要复述 schedule（schedule 卡片已经在下面了，用户看得见）
- 不要列举用户选过的标签
- 不要说"适合你们的关系阶段"这种没信息量的话
- 不要结尾问"需要调整吗"

【输出格式】
严格 JSON：
{
  "tagline": "10-14 字的中文短标题",
  "analysis": "50-80 字的解释"
}`;

    const userPrompt = `【今晚的输入】
关系：${dateStage}｜氛围：${vibeGoal}｜时段：${timeWindow}｜时长：${duration}
Fine dining night：${fineDiningNight ? "开启（主场是正式晚餐）" : "关闭"}
折中见面点：${midpointArea || "无"}
MBTI：${selfMbti || "?"} × ${otherMbti || "?"}
模式：${mode === "safer" ? "保守" : mode === "memorable" ? "要有记忆点" : "平衡"}
用户的一句话背景：${context ? `"${context}"` : "（空）"}

【规则引擎选的场所】${venuesText}
【规则引擎排的时间线】${scheduleText}

写 tagline 和 analysis。${context ? `背景里用户说 "${context}"，一定要在 analysis 里针对它说话。` : ""}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 400,
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const text = response.choices[0]?.message?.content?.trim() || "";

    try {
      const parsed = JSON.parse(text);
      return Response.json({
        tagline: parsed.tagline,
        analysis: parsed.analysis,
      });
    } catch (parseErr) {
      console.error("Failed to parse AI response:", text);
      return Response.json(
        { error: "AI response was not valid JSON", raw: text },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("generate-plan error:", err);
    return Response.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}