import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  let fallbackHint = "";
  try {
    const body = await req.json();
    const { hint, currentBlock, scheduleContext } = body;
    fallbackHint = hint || "";

    if (!hint) {
      return Response.json({ normalizedHint: "" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const scheduleText = (scheduleContext || [])
      .map((b, i) => `${i + 1}. ${b.time} · ${b.title}`)
      .join("\n");

    const prompt = `你帮一个约会排程器理解用户想怎么改一个 schedule block。

【用户当前要换的 block】
${currentBlock?.time || ""} · ${currentBlock?.title || ""} — ${currentBlock?.note || ""}

【整段 schedule 的上下文】
${scheduleText}

【用户说】
"${hint}"

【你的任务】
规则引擎目前只能匹配关键词：喝一杯、安静、走、展、唱歌、按摩、牛排、站、续摊、书店、咖啡、夜景、深入、慢、热闹。
把用户自然语言意图翻译成一串包含这些关键词的短语，让规则引擎能匹配。比如：
- "今天走了一天累死了" → "安静 不要走太多"
- "上次去过日料了想换口味" → "不要日料 换口味"
- "想去个能坐着聊的地方" → "安静 坐着"
- "他说想感受上海夜晚" → "夜景 走"
- "感觉要 upgrade 一下" → "有记忆点 有氛围"

严格返回 JSON：
{
  "normalizedHint": "翻译后的短语，用空格分隔，只包含可匹配的关键词"
}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 200,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content?.trim() || "";

    try {
      const parsed = JSON.parse(text);
      return Response.json({
        normalizedHint: parsed.normalizedHint || hint,
      });
    } catch (parseErr) {
      return Response.json({ normalizedHint: hint });
    }
  } catch (err) {
    console.error("interpret-hint error:", err);
    return Response.json({ normalizedHint: fallbackHint });
  }
}