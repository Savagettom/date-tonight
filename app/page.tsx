"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Compass,
  HeartHandshake,
  MapPin,
  Route,
  Search,
  Sparkles,
  UserRound,
  ChevronRight,
  ChevronDown,
  Clock3,
  Martini,
  Coffee,
  GalleryVerticalEnd,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// iOS-style toggle (Hinge feel)
function IOSToggle({ on, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[30px] w-[52px] shrink-0 rounded-full transition-colors"
      style={{
        background: on ? "#1A1A1A" : "#FFFFFD",
        border: on ? "1px solid #1A1A1A" : "1.5px solid #C9C3B8",
      }}
      aria-pressed={on}
    >
      <span
        className="absolute top-1/2 -translate-y-1/2 rounded-full transition-all"
        style={{
          left: on ? 24 : 3,
          height: 22,
          width: 22,
          background: on ? "#FFFFFD" : "#8A8278",
          boxShadow: on ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
        }}
      />
    </button>
  );
}

const venues = [
  {
    id: "arabica-wukang",
    name: "% Arabica 武康路",
    area: "武康路",
    district: "徐汇",
    category: "咖啡",
    price: "¥¥",
    vibe: "明亮",
    tags: ["第一次见面", "可撤退", "边走边聊"],
    desc: "武康大楼对面的高确定性选项。适合 15 到 40 分钟的轻量开场，聊得顺就直接往街区里走。",
    mentions: 47,
  },
  {
    id: "duozhaoyu",
    name: "多抓鱼循环商店",
    area: "安福路",
    district: "徐汇",
    category: "书店",
    price: "¥",
    vibe: "安静",
    tags: ["慢热", "可撤退", "安静"],
    desc: "对内向型组合特别友好。可以分头逛十分钟，再聊彼此拿了什么，天然降低对话压力。",
    mentions: 28,
  },
  {
    id: "harmay",
    name: "Harmay 话梅 安福路",
    area: "安福路",
    district: "徐汇",
    category: "站着喝一杯",
    price: "¥¥",
    vibe: "暧昧",
    tags: ["续摊", "边走边聊", "不冷场"],
    desc: "适合从白天滑到傍晚的转场，不需要正式坐下，节奏更松。",
    mentions: 41,
  },
  {
    id: "zhangyuan",
    name: "张园",
    area: "南京西路",
    district: "静安",
    category: "街区",
    price: "¥¥",
    vibe: "有氛围",
    tags: ["citywalk", "边走边聊", "有氛围"],
    desc: "密度高、转场顺、能快进也能慢走。最适合还不确定聊不聊得来的早期见面。",
    mentions: 38,
  },
  {
    id: "sinan",
    name: "思南公馆",
    area: "淮海路",
    district: "黄浦",
    category: "街区",
    price: "¥¥",
    vibe: "优雅",
    tags: ["第一次见面", "citywalk", "有氛围"],
    desc: "建筑自带话题，不需要你一直输出。适合中性、稳妥、容错率高的开局。",
    mentions: 33,
  },
  {
    id: "psa",
    name: "上海当代艺术博物馆",
    area: "黄浦江边",
    district: "黄浦",
    category: "博物馆",
    price: "¥",
    vibe: "深入",
    tags: ["慢热", "深入", "有记忆点"],
    desc: "不是破冰局，而是已经想认真聊、想制造共同记忆的组合。",
    mentions: 19,
  },
  {
    id: "westbund",
    name: "西岸美术馆",
    area: "徐汇滨江",
    district: "徐汇",
    category: "展馆",
    price: "¥¥",
    vibe: "开阔",
    tags: ["有氛围", "边走边聊", "深入"],
    desc: "看完展还能沿滨江继续走，适合把见面做成半天的轻旅程。",
    mentions: 29,
  },
  {
    id: "xintiandi",
    name: "新天地",
    area: "淮海路",
    district: "黄浦",
    category: "综合",
    price: "¥¥¥",
    vibe: "热闹",
    tags: ["第一次见面", "可续摊", "不冷场"],
    desc: "最标准的安全答案。不会出错，但惊喜感相对弱。",
    mentions: 44,
  },
  {
    id: "imperial-treasure-rockbund",
    name: "御宝轩 Imperial Treasure (Rockbund)",
    area: "外滩源",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "正式",
    tags: ["fine dining", "商务感", "正式约会"],
    desc: "外滩源的高端粤菜选项，偏正式、桌面感强，适合需要确定性和排面的 dinner block。后续往外滩或酒吧转场也顺。",
    mentions: 0,
  },
  {
    id: "nabi-shanghai",
    name: "NABI",
    area: "武夷路",
    district: "长宁",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "精致",
    tags: ["韩料", "有记忆点", "预约制"],
    desc: "武夷路的当代韩餐，空间全黑、呈现感强，适合想把晚餐本身做成主内容的 date night。更偏记忆点而不是 casual 吃饭。",
    mentions: 0,
  },
  {
    id: "meatopia-stone-sal",
    name: "Meatopia by Stone Sal",
    area: "陆家嘴",
    district: "浦东",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "厚重",
    tags: ["牛排", "正式晚餐", "男性向"],
    desc: "陆家嘴的高端牛排馆，深色木质和 dry-aged 气质很重，适合 fine dining night 或想把 steak dinner 放到主时段的组合。",
    mentions: 0,
  },
  {
    id: "ruths-chris-shanghai",
    name: "Ruth's Chris Steak House",
    area: "外滩",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "经典",
    tags: ["牛排", "外滩", "正式约会"],
    desc: "5 on the Bund 里的经典美式牛排路线，确定性高，适合想要标准正式晚餐体验的场景。配外滩夜景，后续接酒吧很自然。",
    mentions: 0,
  },
  {
    id: "1515-west-chophouse",
    name: "The 1515 West Chophouse & Bar",
    area: "南京西路",
    district: "静安",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "奢华",
    tags: ["牛排", "fine dining", "仪式感"],
    desc: "静安香格里拉里的高端牛排馆，整体更像一顿有制作感的晚餐，适合把仪式感拉满的 special night。",
    mentions: 0,
  },
  {
    id: "canton-table",
    name: "Canton Table",
    area: "外滩",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "景观位",
    tags: ["粤菜", "外滩景观", "正式约会"],
    desc: "Three on the Bund 里的粤菜和点心选择，优势是景观和稳定感兼具，适合需要 view + dinner 的成熟路线。",
    mentions: 0,
  },
  {
    id: "chun-k-sml-center",
    name: "Chun K",
    area: "日月光 / 复兴公园",
    district: "黄浦",
    category: "KTV",
    price: "¥¥",
    vibe: "热闹",
    tags: ["二场", "不冷场", "朋友局也适用"],
    desc: "日月光这家是上海比较热门的 KTV 之一，适合饭后直接接二场。房型多、气氛强，对长期情侣或双人庆祝局都好用。",
    mentions: 0,
  },
  {
    id: "cashbox-partyworld-fuxing-park",
    name: "Cashbox Partyworld (Fuxing Park)",
    area: "复兴公园",
    district: "黄浦",
    category: "KTV",
    price: "¥¥",
    vibe: "经典",
    tags: ["二场", "经典路线", "组局友好"],
    desc: "复兴公园边的经典 KTV 选项，位置强、接夜生活顺，适合把吃饭后的 plan 自然拉长。",
    mentions: 0,
  },
  {
    id: "qing-blind-massage",
    name: "Qing Blind Massage",
    area: "静安寺",
    district: "静安",
    category: "足浴",
    price: "¥",
    vibe: "放松",
    tags: ["夜间恢复", "低脑力", "雨天友好"],
    desc: "静安寺附近的盲人按摩店，适合雨天、很累或想走低脑力恢复型约会的组合。不是传统 romantic 场景，但很适合长期关系。",
    mentions: 0,
  },
  {
    id: "shanghai-library",
    name: "上海图书馆",
    area: "淮海中路",
    district: "徐汇",
    category: "图书馆",
    price: "¥",
    vibe: "安静",
    tags: ["白天约会", "慢热", "低压力"],
    desc: "上图本馆适合白天、低压力、慢热型约会。先在馆里待一段，再往淮海中路或衡复转场，能把节奏放得很舒服。",
    mentions: 0,
  },
  {
    id: "speak-low",
    name: "Speak Low",
    area: "复兴中路",
    district: "黄浦",
    category: "日式酒吧",
    price: "¥¥¥",
    vibe: "神秘",
    tags: ["酒吧", "有记忆点", "二场"],
    desc: "藏在酒具店后的经典 speakeasy，层次感强，适合把晚饭后的第二段直接拉到一个更有戏剧性的夜晚场景。",
    mentions: 0,
    searchAliases: ["cocktail", "speakeasy", "hidden bar", "日本风", "清吧"],
  },
  {
    id: "sober-company-ins",
    name: "Sober Company (INS)",
    area: "雁荡路 / 复兴公园",
    district: "黄浦",
    category: "日式酒吧",
    price: "¥¥¥",
    vibe: "层次感",
    tags: ["酒吧", "日式酒场", "可续摊"],
    desc: "一套多空间结构的日式 cocktail destination，适合已经吃完饭、想把后续做成完整夜间路线的组合。",
    mentions: 0,
    searchAliases: ["sakaba", "izakaya", "kissa", "tipsy", "cocktail", "speakeasy"],
  },
  {
    id: "union-trading-company",
    name: "Union Trading Company",
    area: "衡山路",
    district: "徐汇",
    category: "酒吧",
    price: "¥¥",
    vibe: "经典鸡尾酒",
    tags: ["酒吧", "清吧", "约会二场"],
    desc: "衡山路上的标志性鸡尾酒吧，适合想把酒精浓度、聊天质量和 neighborhood bar 气质一起做稳的约会后半段。",
    mentions: 0,
    searchAliases: ["cocktail bar", "utc", "清吧", "鸡尾酒"],
  },
  {
    id: "oji-shanghai",
    name: "OJI",
    area: "茂名北路",
    district: "静安",
    category: "日式酒吧",
    price: "¥¥¥",
    vibe: "克制",
    tags: ["日式酒吧", "安静", "仪式感"],
    desc: "很克制的日式 speakeasy，适合不想太吵、但又希望夜晚有一点质感和场景切换的组合。",
    mentions: 0,
    searchAliases: ["japanese speakeasy", "cocktail", "quiet bar", "日威"],
  },
  {
    id: "lab-shanghai",
    name: "Lab Shanghai",
    area: "静安",
    district: "静安",
    category: "威士忌吧",
    price: "¥¥",
    vibe: "专业",
    tags: ["威士忌", "夜晚", "室内优先"],
    desc: "偏 whisky-forward 的 cocktail bar，适合今晚目标明确就是想喝点好的、又不想进太闹环境的约会。",
    mentions: 0,
    searchAliases: ["whisky", "single malt", "scotch", "威士忌", "whiskey"],
  },
  {
    id: "ume-maru",
    name: "Ume Maru",
    area: "静安",
    district: "静安",
    category: "日式酒吧",
    price: "¥¥",
    vibe: "日式居酒屋",
    tags: ["日式酒吧", "居酒屋", "晚间约会"],
    desc: "白天像日式 diner，晚上切成 izakaya-speakeasy，适合 dinner 之后不想直接散、但也不想进入过于正式酒吧的组合。",
    mentions: 0,
    searchAliases: ["izakaya", "sake", "japanese whisky", "居酒屋", "日式"],
  },
  {
    id: "grand-yard",
    name: "Grand Yard",
    area: "静安",
    district: "静安",
    category: "台球",
    price: "¥¥",
    vibe: "松弛",
    tags: ["台球", "朋友感", "二场"],
    desc: "偏 neighborhood bar 气质，能打 pool 也能喝酒，适合不想太正式、但又想让约会保持互动感的二场。",
    mentions: 0,
    searchAliases: ["pool", "billiards", "darts", "sports bar", "台球室"],
  },
  {
    id: "hey8-billiards",
    name: "Hey 8 Billiards Club",
    area: "浦东",
    district: "浦东",
    category: "台球",
    price: "¥",
    vibe: "直接",
    tags: ["台球", "低脑力", "夜间可用"],
    desc: "偏功能型的 billiards room，适合已经很熟、想找一个低脑力互动场景的长期关系组合。",
    mentions: 0,
    searchAliases: ["pool hall", "billiards", "台球室", "桌球"],
  },
  // ========== 以下为 2026-04 扩充的 32 家餐厅（基于 Tom 的大众点评收藏）==========
  {
    id: "chartres-dingxiang",
    name: "夏朵餐厅（丁香店）",
    area: "复兴西路",
    district: "徐汇",
    category: "餐厅",
    price: "¥¥",
    vibe: "温柔",
    tags: ["法国菜", "老洋房", "第一次见面", "有包厢"],
    desc: "复兴西路丁香花园里的老上海法餐，老洋房氛围、人均不贵、徐汇区法国菜热门榜常年前列。是那种不会出错、也不会太贵、聊天很容易接住的第一次见面选择。",
    mentions: 0,
    searchAliases: ["chartres", "Chartres", "夏朵", "法餐"],
  },
  {
    id: "fu1039",
    name: "福1039",
    area: "愚园路",
    district: "长宁",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "本帮老宅",
    tags: ["本帮菜", "米其林", "老洋房", "有仪式感", "预约制"],
    desc: "愚园路小洋房里的本帮菜，连续多年米其林推荐。老式花园洋房氛围很 Shanghai，适合想用一顿饭讲出地方感、又不想去标准 fine dining 的场合。预约要提前。",
    mentions: 0,
    searchAliases: ["福一零三九", "fu 1039", "本帮"],
  },
  {
    id: "jstone-fine-bistro",
    name: "Jstone 大爵小意馆 Fine Bistro",
    area: "虹桥古北",
    district: "长宁",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "意式小馆",
    tags: ["意大利菜", "有仪式感", "古北", "约会友好"],
    desc: "古北的意式小 bistro，环境得奖，稳定出品、不至于太贵。适合在古北一带约会、又想跳出连锁感的组合。",
    mentions: 0,
    searchAliases: ["jstone", "fine bistro", "意菜", "意大利"],
  },
  {
    id: "marudo-yakiniku",
    name: "丸道烤肉（中国首店）",
    area: "虹桥古北",
    district: "长宁",
    category: "餐厅",
    price: "¥¥",
    vibe: "日式铁板",
    tags: ["日式烧烤", "和牛", "烤肉", "不冷场", "有大桌"],
    desc: "虹桥古北的日式烤肉，上海烤肉回头客榜第一。上菜有节奏、两个人坐一排吃烤肉，聊天压力天然就低。适合稳定交往已经不用太讲究仪式的关系。",
    mentions: 0,
    searchAliases: ["marudo", "yakiniku", "日式烤肉", "和牛"],
  },
  {
    id: "gen-gen",
    name: "GēN·根",
    area: "南京西路",
    district: "静安",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "设计感",
    tags: ["特色菜", "南京西路", "环境榜", "可带宠物"],
    desc: "南京西路商圈特色菜环境榜前五，空间感强、氛围偏低饱和度的 Asian-fusion。适合在南京西路一带碰面、想换一种不那么'吃饭'感的晚餐。",
    mentions: 0,
    searchAliases: ["gen", "gēn", "根", "fusion"],
  },
  {
    id: "hanok-korean",
    name: "hanok 韩食酒屋·发福",
    area: "淮海路",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "韩式酒屋",
    tags: ["韩料", "喝酒", "有包厢", "有大桌", "夜间可用"],
    desc: "淮海路的韩食酒屋，黄浦区韩式料理环境榜第一。不像传统烤肉店那种热闹，是偏酒屋 dimly-lit 的氛围，适合想吃韩料又想能聊天喝酒的组合。",
    mentions: 0,
    searchAliases: ["hanok", "韩食", "韩餐", "韩式"],
  },
  {
    id: "mianyi-ramen",
    name: "麺益市拉面",
    area: "古北仙霞",
    district: "长宁",
    category: "餐厅",
    price: "¥",
    vibe: "日常",
    tags: ["拉面", "面馆", "轻量", "日常", "单人或两人"],
    desc: "古北仙霞的日式拉面，热门榜第一、人均 77。不是约会主场，但适合白天短时见面、或晚饭前垫一口的 warmup。",
    mentions: 0,
    searchAliases: ["拉面", "ramen", "日式面"],
  },
  {
    id: "iekoi-izakaya",
    name: "家康居酒屋（兴义路店）",
    area: "虹桥古北",
    district: "长宁",
    category: "餐厅",
    price: "¥¥",
    vibe: "居酒屋",
    tags: ["日料", "居酒屋", "喝酒", "吃饭喝一杯", "有大桌"],
    desc: "古北兴义路的居酒屋，必吃榜 2025 上榜。炭火烤物 + 清酒搭配，气氛属于朋友聚的那种，适合已经很熟的关系、想喝酒也想吃点什么的晚上。",
    mentions: 0,
    searchAliases: ["家康", "izakaya", "居酒屋"],
  },
  {
    id: "chartres-garden",
    name: "夏朵花园（复兴西路店）",
    area: "复兴西路",
    district: "徐汇",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "花园洋房",
    tags: ["意大利菜", "必吃榜", "老洋房", "花园位", "有仪式感"],
    desc: "复兴西路丁香花园的意式餐厅，必吃榜 2025。花园座位是亮点，夏天晚上特别出片。适合稳定关系想庆祝一下、或任何需要环境加分的场合。",
    mentions: 0,
    searchAliases: ["chartres garden", "夏朵"],
  },
  {
    id: "dim-dim-sum",
    name: "点都德（七宝领展广场店）",
    area: "七宝",
    district: "闵行",
    category: "餐厅",
    price: "¥¥",
    vibe: "港式茶楼",
    tags: ["粤菜", "港式茶点", "白天约会", "早午茶"],
    desc: "广州点都德的上海七宝店，粤菜销量榜第一。主要是早午茶、饮茶场景，上海市区的朋友需要专程过去。适合周末白天的 daytime date、或家人朋友混合场合。",
    mentions: 0,
    searchAliases: ["点都德", "dim dim sum", "茶楼", "粤点"],
  },
  {
    id: "chez-bulizo",
    name: "Chez BULIZO 鱎象餐桌",
    area: "虹桥路",
    district: "长宁",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "fusion omakase",
    tags: ["日料", "omakase", "fusion", "有仪式感", "有包厢", "可预订"],
    desc: "虹桥路的 fusion omakase，虹桥路美食口味榜第二。人均千元的板前，适合想制造'今晚是特别的一天'的 occasion，比如周年纪念或关系推进节点。",
    mentions: 0,
    searchAliases: ["bulizo", "鱎象", "fusion omakase", "板前"],
  },
  {
    id: "wei-jing-ge",
    name: "蔚景阁·外滩华尔道夫酒店",
    area: "外滩",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "酒店粤菜",
    tags: ["粤菜", "外滩", "酒店餐厅", "有仪式感", "有包厢", "有大桌"],
    desc: "外滩华尔道夫顶楼粤菜，窗外就是外滩夜景。不是网红路线，是那种真 grown-up 的场合——谈事情、认真庆祝、或带爸妈见对象。",
    mentions: 0,
    searchAliases: ["华尔道夫", "waldorf", "蔚景"],
  },
  {
    id: "sushi-qi",
    name: "鮨齐（古北店）",
    area: "虹桥古北",
    district: "长宁",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "板前寿司",
    tags: ["寿司", "omakase", "日料", "有仪式感", "板前"],
    desc: "古北鮨齐，长宁区寿司服务榜前三、人均 800+。师傅板前操作、慢节奏、几乎全程看着吃。不是 casual 晚餐，是'我想认真请你吃一顿'的选择。",
    mentions: 0,
    searchAliases: ["sushi qi", "鮨", "板前"],
  },
  {
    id: "watanabe-ohmi",
    name: "渡边 近江亭",
    area: "北外滩",
    district: "虹口",
    category: "餐厅",
    price: "¥¥",
    vibe: "日式精致",
    tags: ["日料", "外滩夜景", "白渡桥", "有仪式感"],
    desc: "北外滩白渡桥边的日料，江景位是核心卖点。人均控制在 300 以内，属于'景贵但菜不贵'的少见组合。适合想要外滩氛围但不想花到华尔道夫那档的场合。",
    mentions: 0,
    searchAliases: ["watanabe", "近江亭", "日料"],
  },
  {
    id: "ministry-of-crab",
    name: "Ministry Of Crab",
    area: "人民广场",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "热带海鲜",
    tags: ["东南亚菜", "螃蟹", "有记忆点", "有包厢"],
    desc: "斯里兰卡国宝级海鲜餐厅的上海店，亚洲 50 佳出身。主打硕大泥蟹，吃起来需要戴围兜、上手。适合关系够熟、愿意被看到不修边幅一面的约会。",
    mentions: 0,
    searchAliases: ["ministry of crab", "螃蟹", "斯里兰卡"],
  },
  {
    id: "atelier-izakaya",
    name: "ATELIER IZAKAYA 2.0（外滩店）",
    area: "外滩",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "外滩居酒屋",
    tags: ["日料", "居酒屋", "外滩", "喝酒", "有包厢"],
    desc: "外滩商圈日式料理热门榜第一，居酒屋升级版。比普通居酒屋更精致，但又不像 omakase 那么拘谨。适合想'外滩 + 日料 + 喝酒'三件事一次到位的场合。",
    mentions: 0,
    searchAliases: ["atelier", "izakaya", "居酒屋"],
  },
  {
    id: "linjiang-pujun",
    name: "临江葡郡（陆家嘴店）",
    area: "陆家嘴",
    district: "浦东",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "川菜江景",
    tags: ["川菜", "陆家嘴", "江景", "有包厢", "有大桌"],
    desc: "陆家嘴商圈川菜热门榜第二，江景 + 川菜的少见搭配。辣度偏友好、人均 280 不算贵。适合浦东一带工作、懒得过江的稳定关系晚餐。",
    mentions: 0,
    searchAliases: ["临江", "川菜", "陆家嘴川菜"],
  },
  {
    id: "jinlong-hotpot",
    name: "金龙·打边炉（南京西路店）",
    area: "南京西路",
    district: "静安",
    category: "餐厅",
    price: "¥¥",
    vibe: "港式火锅",
    tags: ["港式火锅", "打边炉", "南京西路", "冬季友好", "雨天友好"],
    desc: "静安区打边炉人气榜第二，1991 年起家的老字号。港式清汤打边炉，不辣不刺激、慢慢涮慢慢聊。适合冬天或雨天、想吃点暖的又不想太重口的场合。",
    mentions: 0,
    searchAliases: ["打边炉", "港式火锅", "金龙"],
  },
  {
    id: "nanyuan-omakase",
    name: "南苑·东城会板前 omakase",
    area: "虹桥古北",
    district: "长宁",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "高端板前",
    tags: ["日料", "omakase", "有仪式感", "板前", "有大桌", "免费停车"],
    desc: "古北虹桥区日本料理口味榜第二，人均 743。板前 omakase，几乎是这家以上价位才有的体验密度。适合周年、正式庆祝、或跟对象讲'今晚认真点'的场合。",
    mentions: 0,
    searchAliases: ["南苑", "东城会", "omakase", "板前"],
  },
  {
    id: "mr-mrs-bund",
    name: "Mr & Mrs Bund by Paul Pairet",
    area: "外滩",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "现代法餐",
    tags: ["法国菜", "外滩", "黑珍珠", "fine dining", "有仪式感", "有大桌", "深夜可用"],
    desc: "外滩 18 号 Paul Pairet 主厨（Ultraviolet 同一位）的现代法餐，黑珍珠一钻。分享式上菜、服务随性、窗外是外滩夜景。晚 11 点到凌晨 2 点还有 night menu，是上海少数能跑到深夜的 fine dining。",
    mentions: 0,
    searchAliases: ["mr mrs bund", "paul pairet", "外滩18号"],
  },
  {
    id: "motoya-bettei",
    name: "MOTOYA 别邸·寿喜锅·活蟹",
    area: "虹梅路",
    district: "闵行",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "日式别院",
    tags: ["日料", "寿喜锅", "有包厢", "冬季友好", "有仪式感"],
    desc: "虹梅路商圈美食环境榜前列的日式寿喜锅，主打活蟹 + 寿喜锅。是偏安静、节奏慢的那种日餐，适合已经很熟、愿意坐下来慢慢吃一顿的关系。",
    mentions: 0,
    searchAliases: ["motoya", "别邸", "寿喜锅", "活蟹"],
  },
  {
    id: "xiji-cantonese",
    name: "细记港九早茶包房夜宵（东湖路店）",
    area: "东湖路",
    district: "徐汇",
    category: "餐厅",
    price: "¥¥",
    vibe: "港式茶餐",
    tags: ["粤菜", "港式茶点", "夜宵", "深夜可用", "包房"],
    desc: "东湖路粤菜热门榜第一，早茶 + 夜宵都开。人均 130 的港式，上海市区凌晨还开的粤菜并不多。适合饿到不想讲究又想吃点像样的的深夜二场。",
    mentions: 0,
    searchAliases: ["细记", "港九", "早茶", "夜宵"],
  },
  {
    id: "chaimen-hui",
    name: "柴门荟（前滩太古里店）",
    area: "前滩",
    district: "浦东",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "新派川菜",
    tags: ["川菜", "前滩", "太古里", "有仪式感", "有包厢", "有大桌"],
    desc: "前滩太古里川菜热门榜第一，柴门系列的新派川菜。前滩一带的约会密度在变高，这家是浦东最近两年比较 signature 的一家。辣度可控、出品稳定。",
    mentions: 0,
    searchAliases: ["柴门", "川菜", "前滩川菜"],
  },
  {
    id: "minghao-qiantan",
    name: "上海名豪（前滩店）",
    area: "前滩",
    district: "浦东",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "粤式正餐",
    tags: ["粤菜", "前滩", "环境榜", "有包厢", "有大桌"],
    desc: "前滩粤菜环境榜第四。比太古里商场店更有正餐感，适合浦东工作、想吃顿体面粤菜又不想过江的稳定关系组合。",
    mentions: 0,
    searchAliases: ["上海名豪", "名豪", "粤菜"],
  },
  {
    id: "unagi-king",
    name: "鳗鱼王（协泰中心店）",
    area: "虹桥古北",
    district: "长宁",
    category: "餐厅",
    price: "¥¥",
    vibe: "单品日料",
    tags: ["日料", "鳗鱼", "单品", "有包厢", "可预订"],
    desc: "古北鳗鱼专门店，就做鳗鱼饭和鳗鱼烤物。人均 200、吃起来不贵但体验专业。适合想吃日料但不想整 omakase 仪式感的日常关系。",
    mentions: 0,
    searchAliases: ["鳗鱼王", "unagi", "鳗鱼饭"],
  },
  {
    id: "lei-garden-iapm",
    name: "利苑（环贸 iapm 店）",
    area: "音乐学院",
    district: "徐汇",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "商场粤菜",
    tags: ["粤菜", "环贸", "商场", "稳定出品", "第一次见面"],
    desc: "香港利苑在环贸 iapm 的店，音乐学院区粤菜环境榜前三。老牌连锁的稳，不会出错、也不会超预期。适合第一次见面、关系还没稳定、吃个饭不想冒风险的场合。",
    mentions: 0,
    searchAliases: ["利苑", "lei garden", "环贸"],
  },
  {
    id: "xiaoye-coffee",
    name: "小夜咖啡店（威宁路店）",
    area: "天山",
    district: "长宁",
    category: "咖啡馆",
    price: "¥",
    vibe: "深夜咖啡",
    tags: ["咖啡", "深夜可用", "第一次见面", "安静", "有大桌"],
    desc: "天山威宁路的深夜咖啡店，天山咖啡人气榜第二。上海少见的开到很晚的独立咖啡馆。适合晚饭后接一杯、或周末下午找个安静地方聊天。",
    mentions: 0,
    searchAliases: ["小夜咖啡", "xiaoye", "深夜咖啡", "coffee"],
  },
  {
    id: "sushi-shang",
    name: "鮨赏（虹桥店）",
    area: "虹桥枢纽",
    district: "闵行",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "板前海鲜",
    tags: ["日料", "寿司", "海鲜", "有包厢", "有仪式感"],
    desc: "闵行区鱼鲜海鲜口味榜第一，人均 298 的板前日料。比人均 800 的鮨齐更 accessible、但仪式感依然在。适合想尝试板前又不想花太多的组合。",
    mentions: 0,
    searchAliases: ["鮨赏", "sushi shang", "板前"],
  },
  {
    id: "hideout-hookah",
    name: "Hideout Hookah Lounge·隐觅地",
    area: "同乐坊",
    district: "静安",
    category: "酒吧",
    price: "¥¥",
    vibe: "水烟酒吧",
    tags: ["特调酒吧", "水烟", "红酒", "夜间可用", "二场", "有记忆点"],
    desc: "同乐坊江宁路酒吧热门榜第二，水烟 + 特调 + 红酒的组合。偏小众、氛围 hideout 感强。适合想跳出老牌 cocktail bar、但又要有氛围的二场选择。",
    mentions: 0,
    searchAliases: ["hideout", "hookah", "水烟", "隐觅地"],
  },
  {
    id: "stone-sal-steak",
    name: "Stone Sal 言盐西餐厅（东湖路店）",
    area: "东湖路",
    district: "徐汇",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "熟成牛排",
    tags: ["牛排", "西餐", "黑珍珠", "干式熟成", "fine dining", "有包厢", "有仪式感"],
    desc: "东湖路 Stone Sal，黑珍珠 2026 一钻。干式熟成牛排是 signature，店内氛围 dimly-lit、节奏慢。上海现在最能打的独立牛排馆之一，适合明确点名要吃牛排的场合。",
    mentions: 0,
    searchAliases: ["stone sal", "言盐", "steak", "牛排", "干式熟成"],
  },
  {
    id: "longfeng-hui",
    name: "龙凤荟·传统粤菜点心",
    area: "新天地",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "新天地粤菜",
    tags: ["粤菜", "新天地", "粤式点心", "有大桌", "有包厢"],
    desc: "新天地马当路粤菜销量榜第三。比太古汇的粤菜连锁更有地方感、环境也偏精致。适合新天地一带的约会，饭后就是新天地街区可以顺便逛。",
    mentions: 0,
    searchAliases: ["龙凤荟", "longfeng", "新天地粤菜"],
  },
  // ========== 2026-04 第二批扩充（27 家，来自 Tom 的大众点评收藏）==========
  {
    id: "belloco-qiantan",
    name: "BELLOCO 倍乐（前滩店）",
    area: "前滩",
    district: "浦东",
    category: "餐厅",
    price: "¥¥",
    vibe: "现代韩餐",
    tags: ["韩料", "前滩", "浦东", "热门榜", "付费停车"],
    desc: "前滩浦东新区韩式料理热门榜第二，¥139 的价位在 BELLOCO 线里偏亲民。适合前滩工作圈的非正式约会，也能处理第一次见面。",
    mentions: 0,
    searchAliases: ["belloco", "倍乐", "韩餐"],
  },
  {
    id: "cj-arte",
    name: "CJ ARTE 天际艺术餐酒廊",
    area: "淮海路",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥",
    vibe: "高空城景",
    tags: ["意大利菜", "高空城景", "夜景", "淮海路", "环境榜", "有氛围"],
    desc: "淮海路西餐环境榜第四，卖点是高空城景位。人均 152 买一个俯瞰视角不贵。适合想要仪式感但不想付 fine dining 价的场合。",
    mentions: 0,
    searchAliases: ["cj arte", "天际", "艺术餐酒廊"],
  },
  {
    id: "siam-memory",
    name: "泰珍荟 Siam Memory",
    area: "外滩",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "南洋花园",
    tags: ["泰国菜", "外滩", "东南亚菜", "热门榜", "有包厢", "有氛围"],
    desc: "外滩商圈黄浦区东南亚菜热门榜第一，南洋风庭院。辣度友好、出品稳定。对不想吃太中式、又想避开日料的人是个新鲜选择。",
    mentions: 0,
    searchAliases: ["siam memory", "泰珍荟", "泰国菜"],
  },
  {
    id: "chaimen-fan-lujiazui",
    name: "柴门饭儿（陆家嘴中心店）",
    area: "陆家嘴",
    district: "浦东",
    category: "餐厅",
    price: "¥¥",
    vibe: "家常川菜",
    tags: ["川菜", "陆家嘴", "家常", "有包厢"],
    desc: "陆家嘴川菜热门榜第三，柴门系列里更日常的版本（比前滩柴门荟便宜一半）。适合浦东工作、想吃顿川菜但不想走柴门荟正餐路线的场合。",
    mentions: 0,
    searchAliases: ["柴门饭儿", "川菜", "陆家嘴川菜"],
  },
  {
    id: "gmt-music-park",
    name: "gmt music park 日咖夜酒",
    area: "音乐学院",
    district: "徐汇",
    category: "酒吧",
    price: "¥",
    vibe: "日咖夜酒",
    tags: ["特调酒吧", "鸡尾酒", "咖啡馆", "日咖夜酒", "年轻向"],
    desc: "襄阳南路小众 day-bar，白天咖啡、晚上转酒吧。人均 97，气氛偏年轻松弛。适合不想正经吃饭、想在下午找个地方坐着喝一杯的组合。",
    mentions: 0,
    searchAliases: ["gmt", "music park", "日咖夜酒"],
  },
  {
    id: "castle-shisha-bar",
    name: "CASTLE 古堡 Shisha·Live·Bar（外滩店）",
    area: "外滩",
    district: "黄浦",
    category: "酒吧",
    price: "¥¥",
    vibe: "水烟 live",
    tags: ["特调酒吧", "水烟", "live", "精酿啤酒", "红酒", "夜间可用", "二场"],
    desc: "外滩商圈酒吧好评榜第五，水烟 + live + 精酿。比 cocktail bar 更热闹、比 club 更能聊。适合想有气氛又不想太吵的二场。",
    mentions: 0,
    searchAliases: ["castle", "shisha", "古堡", "水烟"],
  },
  {
    id: "solo-hengshan",
    name: "Solo（衡山路店）",
    area: "衡山路",
    district: "徐汇",
    category: "餐厅",
    price: "¥¥",
    vibe: "老牌意餐",
    tags: ["意大利菜", "衡山路", "必吃榜", "复兴西路", "稳定出品"],
    desc: "衡山路复兴西路美食热门榜第一，营业 20 年的老牌意餐。上海意餐里算经典正宗的那一档。适合想让意大利菜做得稳、又不想去 fine dining 的场合。",
    mentions: 0,
    searchAliases: ["solo", "衡山路意餐"],
  },
  {
    id: "jiujiu-xiangcai",
    name: "久久滴水洞湘菜馆（茂名南路店）",
    area: "淮海路",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥",
    vibe: "经典湘菜",
    tags: ["湘菜", "淮海路", "回头客", "重口味", "有包厢"],
    desc: "黄浦区湘菜回头客榜第一，开了 21 年。上海老派湘菜代表。辣度真实、人均 114。适合想吃辣、关系已经够熟不用装了的组合。",
    mentions: 0,
    searchAliases: ["久久滴水洞", "湘菜", "滴水洞"],
  },
  {
    id: "mr-willis",
    name: "mr willis（安福路店）",
    area: "安福路",
    district: "徐汇",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "地中海西餐",
    tags: ["西餐", "安福路", "复兴西路", "回头客", "老牌", "有氛围"],
    desc: "复兴西路丁香花园西餐回头客榜第三，上海住了 16 年的地中海餐厅。熟客多、氛围随意精致。适合想去安福路一带但想跳出咖啡馆模式的午餐或晚餐。",
    mentions: 0,
    searchAliases: ["mr willis", "willis", "安福路西餐"],
  },
  {
    id: "sushi-higashigumo",
    name: "鮨东云（虹口店）",
    area: "北外滩",
    district: "虹口",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "板前寿司",
    tags: ["日料", "寿司", "omakase", "北外滩", "外白渡桥", "热门榜第一", "有仪式感"],
    desc: "北外滩外白渡桥日式料理热门榜第一，人均 398 的板前日料。比同价位的鮨店更有性价比。外白渡桥位置加分，适合饭后散步到外滩。",
    mentions: 0,
    searchAliases: ["鮨东云", "higashigumo", "板前", "寿司"],
  },
  {
    id: "yun-shang-hui-spa",
    name: "云上汇·Mist Massage",
    area: "新天地",
    district: "黄浦",
    category: "足浴",
    price: "¥¥",
    vibe: "休闲 spa",
    tags: ["按摩", "足浴", "spa", "新天地", "雨天友好", "恢复"],
    desc: "新天地马当路按摩足浴，休娱一体。走了一天脚酸、或者天气不好懒得走路，作为结尾 block 很稳。一次 193，价格不飘。",
    mentions: 0,
    searchAliases: ["云上汇", "mist massage", "按摩"],
  },
  {
    id: "qianshen-spa",
    name: "浅深（世茂滨江精品店）",
    area: "世纪大道",
    district: "浦东",
    category: "足浴",
    price: "¥¥¥",
    vibe: "精油 spa",
    tags: ["精油 SPA", "按摩", "世茂滨江", "浦东", "有仪式感"],
    desc: "浦东新区洗浴好评榜第三，人均 659 的精油 SPA + 自助餐。关系够熟时的 luxury 选择，特别适合给双方一天放松 + 晚餐省事的组合。",
    mentions: 0,
    searchAliases: ["浅深", "世茂滨江", "spa", "精油"],
  },
  {
    id: "daiou-yakitori",
    name: "大鸟 YAKITORI 烧鸟·深夜食堂（陕西）",
    area: "南京西路",
    district: "静安",
    category: "餐厅",
    price: "¥¥",
    vibe: "日式烧鸟",
    tags: ["日式烧烤", "烤肉", "南京西路", "深夜可用", "有包厢", "销量榜"],
    desc: "南京西路商圈烤肉销量榜第三。深夜食堂风，烤鸡肉串 + 清酒。比正式居酒屋更轻、比拉面店更有约会感。人均 187。",
    mentions: 0,
    searchAliases: ["大鸟", "yakitori", "烧鸟", "深夜食堂"],
  },
  {
    id: "hungrybird-izakaya",
    name: "HungryBird Izakaya 小鸟居酒屋",
    area: "南京西路",
    district: "静安",
    category: "餐厅",
    price: "¥¥",
    vibe: "禅意居酒屋",
    tags: ["日料", "居酒屋", "南京西路", "禅意", "可带宠物", "节目表演"],
    desc: "南京西路商圈的居酒屋，氛围偏 zen。有节目表演、可带宠物。适合稳定交往想玩点不一样的形式、但又不想太正式的晚餐。",
    mentions: 0,
    searchAliases: ["hungrybird", "izakaya", "小鸟居酒屋"],
  },
  {
    id: "yongfu-jiayan",
    name: "甬府家宴（虹桥店）",
    area: "国家会展中心",
    district: "青浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "精致浙菜",
    tags: ["浙菜", "虹桥", "国家会展", "有包厢", "有大桌", "可预订", "口味榜第一"],
    desc: "青浦区浙菜口味榜第一，甬府体系的家宴版。偏商务但不死板。适合虹桥商务圈 + 稳定关系 + 需要带爸妈见人的综合场合。",
    mentions: 0,
    searchAliases: ["甬府", "甬府家宴", "浙菜"],
  },
  {
    id: "canton-jinmao",
    name: "金茂君悦·粤珍轩 Canton",
    area: "陆家嘴",
    district: "浦东",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "酒店粤菜",
    tags: ["粤菜", "陆家嘴", "酒店餐厅", "口味榜", "有包厢"],
    desc: "金茂君悦酒店的粤菜，陆家嘴商圈粤菜口味榜第七。酒店粤菜的标杆之一，老派稳定。适合需要陆家嘴 + 粤菜 + 酒店格调三件事同时满足的具体场合。",
    mentions: 0,
    searchAliases: ["金茂君悦", "粤珍轩", "canton", "金茂粤菜"],
  },
  {
    id: "bingcheng-laoyu",
    name: "冰城老于家（杨浦关山路店）",
    area: "五角场",
    district: "杨浦",
    category: "餐厅",
    price: "¥",
    vibe: "东北馆子",
    tags: ["东北菜", "五角场", "大学路", "热门榜第一", "有包厢", "有大桌"],
    desc: "杨浦区东北菜热门榜第一，人均 74。东北菜 + 五角场 + 大学路，适合杨浦/复旦/同济一带的学生情侣或毕业不久的稳定关系。",
    mentions: 0,
    searchAliases: ["冰城老于家", "东北菜", "五角场东北菜"],
  },
  {
    id: "mugi-omakase",
    name: "麦 MUGI·寿司 omakase",
    area: "古北",
    district: "长宁",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "板前 omakase",
    tags: ["日料", "omakase", "寿司", "板前", "古北", "打卡人气榜", "有包厢"],
    desc: "古北仙霞新村日式料理打卡人气榜第二，人均 350 的板前 omakase。在古北几家 omakase 里属于性价比档。适合想尝 omakase 形式但不想花到千元档的组合。",
    mentions: 0,
    searchAliases: ["麦", "mugi", "omakase"],
  },
  {
    id: "fuguiye-thai",
    name: "富贵椰 Thai Bistro & Eatery",
    area: "南京西路",
    district: "静安",
    category: "餐厅",
    price: "¥¥",
    vibe: "南洋 bistro",
    tags: ["泰国菜", "东南亚菜", "南京西路", "热门榜第一", "有包厢"],
    desc: "上海东南亚菜热门榜第一。泰国菜偏精致版、不重油。位于南京西路，饭前饭后可以顺势逛张园、兴业太古汇。",
    mentions: 0,
    searchAliases: ["富贵椰", "thai bistro", "泰餐"],
  },
  {
    id: "h-acca-vanke",
    name: "h-acca（万科广场北楼店）",
    area: "虹桥古北",
    district: "长宁",
    category: "餐厅",
    price: "¥¥",
    vibe: "意式日常",
    tags: ["意大利菜", "古北", "万科广场", "口味榜", "有大桌"],
    desc: "虹桥古北西餐口味榜第二，开了 12 年的意餐老店。人均 144 的价位在意餐里算可靠。古北一带家庭客多，适合日常。",
    mentions: 0,
    searchAliases: ["h-acca", "acca", "古北意餐"],
  },
  {
    id: "yayas-pasta",
    name: "Yaya's 意面（铜仁路店）",
    area: "南京西路",
    district: "静安",
    category: "餐厅",
    price: "¥¥",
    vibe: "精品意面",
    tags: ["意大利菜", "意面", "南京西路", "小众热门"],
    desc: "南京西路商圈意大利菜热门榜第二。专做意面、空间小、年轻向。¥196 的价位适合午餐或早晚间轻量约会。",
    mentions: 0,
    searchAliases: ["yaya", "yayas", "意面"],
  },
  {
    id: "bella-napoli",
    name: "Bella Napoli（长乐路店）",
    area: "静安寺",
    district: "静安",
    category: "餐厅",
    price: "¥¥",
    vibe: "那不勒斯披萨",
    tags: ["意大利菜", "披萨", "静安寺", "热门榜", "老牌", "有包厢"],
    desc: "静安区意大利菜热门榜第三，开了 16 年。正宗那不勒斯披萨路线，适合想吃披萨、不想去网红店的关系。",
    mentions: 0,
    searchAliases: ["bella napoli", "披萨", "那不勒斯"],
  },
  {
    id: "scarpetta-trattoria",
    name: "Scarpetta Trattoria 食光",
    area: "新天地",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥",
    vibe: "精致意餐",
    tags: ["意大利菜", "新天地", "热门榜", "有大桌", "有仪式感"],
    desc: "黄浦区意大利菜热门榜第五。新天地意餐里偏精致但不至于 Mercato 那么贵。适合新天地一带的 date night。",
    mentions: 0,
    searchAliases: ["scarpetta", "trattoria", "食光"],
  },
  {
    id: "efes-turkish",
    name: "Efes Turkish & Mediterranean",
    area: "陆家嘴",
    district: "浦东",
    category: "餐厅",
    price: "¥¥",
    vibe: "土耳其地中海",
    tags: ["西餐", "土耳其菜", "地中海菜", "陆家嘴", "必吃榜"],
    desc: "陆家嘴商圈必吃榜 2025，上海少见的土耳其地中海菜。人均 235、香料味浓、出品稳定。适合想吃不常见菜系、又不想走高端路线的组合。",
    mentions: 0,
    searchAliases: ["efes", "土耳其", "turkish"],
  },
  {
    id: "yanhua-sanyue",
    name: "嫣花叁玥·淮扬川（国金中心）",
    area: "陆家嘴",
    district: "浦东",
    category: "餐厅",
    price: "¥¥",
    vibe: "淮扬 fusion",
    tags: ["淮扬菜", "川菜", "陆家嘴", "国金中心", "回头客榜第一", "有包厢"],
    desc: "浦东新区江浙菜回头客榜第一。淮扬 + 川的 fusion，咸鲜辣香平衡。国金中心商场里，饭后可以顺便逛。",
    mentions: 0,
    searchAliases: ["嫣花叁玥", "淮扬川", "淮扬菜"],
  },
  {
    id: "mercato-shanghai",
    name: "Mercato by Jean-Georges",
    area: "外滩",
    district: "黄浦",
    category: "餐厅",
    price: "¥¥¥¥",
    vibe: "Jean-Georges 外滩",
    tags: ["意大利菜", "外滩", "黑珍珠", "fine dining", "热门榜第一", "有包厢", "有仪式感"],
    desc: "Jean-Georges 主厨在外滩三号的意餐线，外滩商圈意大利菜热门榜第一。和 Canton Table 是同栋楼的邻居。人均 600 的 fine dining 但比同档日料松弛得多。",
    mentions: 0,
    searchAliases: ["mercato", "jean-georges", "jean georges"],
  },
  {
    id: "oeat-nanjing-west",
    name: "O'eat（上海首店）",
    area: "南京西路",
    district: "静安",
    category: "餐厅",
    price: "¥¥",
    vibe: "全天候西餐",
    tags: ["西餐", "南京西路", "热门榜第一", "付费停车", "有宝宝椅"],
    desc: "南京西路商圈美食热门榜第一。相对休闲的 all-day 西餐路线，人均 128。早午餐、brunch、晚餐都能打，适合日常约会。",
    mentions: 0,
    searchAliases: ["oeat", "o'eat", "西餐"],
  },
];

const routes = [
  {
    id: "wukang-fuxing",
    title: "武康路 → 复兴中路",
    tagline: "第一次见面友好度很高",
    desc: "先拿一杯，再慢慢走进梧桐区。每隔几分钟就有下一个停留点，撤退和续摊都很自然。",
    stops: ["% Arabica", "武康路梧桐段", "复兴西路", "复兴中路"],
    fit: ["第一次见面", "边走边聊", "可撤退"],
  },
  {
    id: "anfu-yongkang",
    title: "安福路 → 永康路",
    tagline: "从下午咖啡滑到傍晚小酒",
    desc: "先逛书店或集合店，再到站着喝一杯的场所，语气会自然松下来。",
    stops: ["多抓鱼", "Harmay", "安福路街区", "永康路小酒馆"],
    fit: ["续摊", "不冷场", "轻松"],
  },
  {
    id: "sinan-xintiandi",
    title: "思南公馆 → 新天地",
    tagline: "稳，不冒险，但执行效率高",
    desc: "老洋房开场，现代商业收尾。适合对方风格还不清楚、但希望整体不尴尬的局。",
    stops: ["思南公馆", "思南书局", "一大会址附近", "新天地"],
    fit: ["第一次见面", "有氛围", "可续摊"],
  },
  {
    id: "westbund-river",
    title: "西岸美术馆 → 徐汇滨江",
    tagline: "更适合第二次或第三次见面",
    desc: "有内容，有空间，也有沉默的余地。适合想把聊天往深处带一点。",
    stops: ["西岸美术馆", "滨江步道", "江边长椅", "晚餐点"],
    fit: ["深入", "有记忆点", "慢热"],
  },
  {
    id: "yuyuan-jingan",
    title: "愚园路 → 静安寺",
    tagline: "梧桐区之外的上海腔",
    desc: "比武康路更安静、比新天地更生活的长宁路段。张爱玲住过的片区，咖啡馆 + 艺术空间 + 老洋房的密度很高。",
    stops: ["愚园路电台", "愚园百货公司", "创邑 SPACE", "马勒别墅", "静安寺"],
    fit: ["有氛围", "边走边聊", "出片"],
  },
  {
    id: "bund-pudong-ferry",
    title: "外滩 → 轮渡 → 陆家嘴",
    tagline: "¥2 的跨江夜景路线",
    desc: "邮政博物馆拍建筑、外白渡桥过河、外滩万国建筑看华灯、金陵东路渡口 2 元轮渡跨江看三件套。比出租打卡浪漫 10 倍、便宜 50 倍。",
    stops: ["上海邮政博物馆", "外白渡桥", "和平饭店", "外滩万国建筑群", "金陵东路渡口", "陆家嘴"],
    fit: ["出片", "夜景", "有记忆点", "第一次见面", "暧昧期"],
  },
  {
    id: "hengfu-xujiahui",
    title: "衡山路 → 徐家汇",
    tagline: "法国梧桐 + 异域建筑的老徐汇路线",
    desc: "秋冬落叶最美的片区。衡山路梧桐、东平路老洋房、汾阳路异国风情、汇到徐家汇天主教堂做终点。很适合走走停停。",
    stops: ["徐家汇公园", "衡山路", "东平路", "汾阳路", "徐家汇天主教堂"],
    fit: ["有氛围", "慢热", "秋冬友好", "适合下午"],
  },
  {
    id: "beibund-duolun",
    title: "北外滩 → 多伦路",
    tagline: "上海老市井的文艺一面",
    desc: "不是梧桐区网红那一套，是虹口老上海的肌理。甜爱路别名恋爱街，多伦路是名人故居密集区。冷门一点、但拍照氛围足。",
    stops: ["北外滩航海公园", "甜爱路", "多伦路文化名人街", "1933 老场坊"],
    fit: ["慢热", "有氛围", "冷门", "出片"],
  },
];

// Scenario presets: zero-input shortcuts to a full plan.
// Clicking one fills all form fields with sensible defaults, generates the plan, and jumps to result.
const scenarioPresets = [
  {
    id: "weeknight-quick",
    kicker: "Weeknight · 1-2h",
    title: "下班后的快速 date",
    subtitle: "咖啡 → 轻晚餐 → 散步回家",
    meta: "1-2小时 · 轻松 · 稳定交往",
    config: {
      dateStage: "稳定交往",
      timeWindow: "晚上",
      duration: "1-2小时",
      vibeGoal: "轻松",
      scenePreference: "都可以",
      selectedActivities: ["吃饭", "散步"],
      preferredArea: "不限",
      budget: "¥¥",
      context: "工作日晚上，下班只有 2 小时，不想跑太远",
      fineDiningNight: false,
      weatherDemo: "自动演示",
    },
  },
  {
    id: "weekend-slow",
    kicker: "Weekend · 半天",
    title: "一个没事情做的周末",
    subtitle: "展览 → 滨江散步 → 晚餐",
    meta: "半天 · 都可以 · 稳定交往",
    config: {
      dateStage: "稳定交往",
      timeWindow: "周末半天",
      duration: "半天",
      vibeGoal: "都可以",
      scenePreference: "都可以",
      selectedActivities: ["展", "吃饭", "散步"],
      preferredArea: "不限",
      budget: "¥¥",
      context: "周末有大半天时间，想慢一点，不赶节奏",
      fineDiningNight: false,
      weatherDemo: "自动演示",
    },
  },
  {
    id: "rainy-indoor",
    kicker: "Rainy · 不动脑",
    title: "雨天全室内 plan",
    subtitle: "咖啡馆 → 商场 → 火锅或居酒屋",
    meta: "2-4小时 · 室内优先 · 稳定交往",
    config: {
      dateStage: "稳定交往",
      timeWindow: "晚上",
      duration: "2-4小时",
      vibeGoal: "轻松",
      scenePreference: "室内优先",
      selectedActivities: ["吃饭", "喝酒"],
      preferredArea: "不限",
      budget: "¥¥",
      context: "今天下雨，全程想在室内，不想淋到",
      fineDiningNight: false,
      weatherDemo: "雨天",
    },
  },
];

const mbtiOptions = [
  "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"
];

const dateStageOptions = ["第一次见面", "暧昧期", "稳定交往", "长期伴侣"];
const budgetOptions = ["不限", "¥", "¥¥", "¥¥¥", "¥¥¥¥"];
const areaOptions = ["不限", "武康路", "安福路", "淮海路", "南京西路", "新天地", "外滩", "陆家嘴", "前滩", "徐汇滨江", "黄浦江边", "虹桥古北", "音乐学院", "复兴西路"];
const timeWindowOptions = ["白天", "晚上", "周末半天"];
const scenePreferenceOptions = ["室内优先", "户外优先", "都可以"];
const vibeGoalOptions = ["轻松", "有仪式感", "都可以"];
const durationOptions = ["1-2小时", "2-4小时", "半天"];
const activityOptions = ["吃饭", "喝酒", "展", "散步"];
const weatherDemoOptions = ["自动演示", "晴天", "雨天", "阴天"];
const venueBrowseChips = ["全部", "餐厅", "酒吧", "咖啡馆", "威士忌", "日式酒吧", "omakase", "KTV", "台球", "足浴", "图书馆", "fine dining", "米其林", "黑珍珠", "雨天友好", "白天约会", "二场", "深夜可用", "牛排", "粤菜", "韩料", "日料", "川菜", "意大利菜", "法国菜", "本帮菜", "火锅", "江景", "外滩", "前滩", "新天地", "安静", "有仪式感", "不冷场"];

const navItems = [
  { key: "home", label: "首页", icon: Compass },
  { key: "venues", label: "选店", icon: Search },
  { key: "routes", label: "路线", icon: Route },
  { key: "mbti", label: "计划", icon: UserRound },
];

function cn(...arr) {
  return arr.filter(Boolean).join(" ");
}

function iconForCategory(category) {
  if (category === "咖啡") return Coffee;
  if (["站着喝一杯", "酒吧", "威士忌吧", "日式酒吧"].includes(category)) return Martini;
  if (category === "餐厅") return Coffee;
  if (category === "台球") return MapPin;
  if (category === "展馆" || category === "博物馆") return GalleryVerticalEnd;
  if (category === "书店" || category === "图书馆") return BookOpen;
  return MapPin;
}

function getEnergy(mbti = "") {
  return mbti.startsWith("E") ? "extrovert" : "introvert";
}

function detectAreaGroup(text = "") {
  const normalized = text.toLowerCase();
  if (!normalized.trim()) return "";
  if (/武康|xuhui|徐汇|衡山|wukang/.test(normalized)) return "武康路";
  if (/安福|永康|anfu|yongkang/.test(normalized)) return "安福路";
  if (/淮海|新天地|黄浦|xintiandi|huaihai|复兴公园|riyueguang|sml/.test(normalized)) return "淮海路";
  if (/静安|南京西|jingan|nanjing west|静安寺/.test(normalized)) return "南京西路";
  if (/滨江|west bund|西岸|long museum/.test(normalized)) return "徐汇滨江";
  if (/浦东|陆家嘴|lujiazui|river|外滩|bund|外滩源|rockbund/.test(normalized)) return "黄浦江边";
  if (/武夷|长宁|wuyi|changning/.test(normalized)) return "安福路";
  return "";
}

function getVenueAreaBucket(venue) {
  return detectAreaGroup(`${venue?.area || ""} ${venue?.district || ""}`) || venue?.area || "";
}

function getVenueSearchText(venue) {
  const categoryAliases = {
    "咖啡": ["coffee", "cafe", "下午", "白天"],
    "书店": ["bookstore", "books", "看书", "安静"],
    "图书馆": ["library", "看书", "自习", "白天约会"],
    "展馆": ["museum", "gallery", "艺术", "展览"],
    "博物馆": ["museum", "gallery", "艺术", "展览"],
    "街区": ["citywalk", "散步", "走走", "户外"],
    "餐厅": ["dinner", "lunch", "eat", "吃饭", "餐酒", "fine dining"],
    "酒吧": ["bar", "cocktail", "清吧", "喝一杯", "夜晚"],
    "威士忌吧": ["whisky", "whiskey", "single malt", "bar", "威士忌"],
    "日式酒吧": ["japanese bar", "izakaya", "sakaba", "speakeasy", "居酒屋", "日式"],
    "KTV": ["唱歌", "karaoke", "ktv", "二场"],
    "台球": ["pool", "billiards", "台球", "桌球"],
    "足浴": ["massage", "spa", "足浴", "按摩", "放松"],
    "综合": ["mall", "everything", "续摊", "吃喝玩"],
    "站着喝一杯": ["wine", "bar", "站着喝", "小酒"],
  };

  return [
    venue.name,
    venue.area,
    venue.district,
    venue.category,
    venue.vibe,
    venue.desc,
    ...(venue.tags || []),
    ...(venue.searchAliases || []),
    getVenueAreaBucket(venue),
    ...(categoryAliases[venue.category] || []),
  ]
    .join(" ")
    .toLowerCase();
}

function inferMidpointArea(myStart = "", partnerStart = "") {
  const a = detectAreaGroup(myStart);
  const b = detectAreaGroup(partnerStart);
  if (!a && !b) return "";
  if (a && !b) return a;
  if (!a && b) return b;
  if (a === b) return a;

  const pair = [a, b].sort().join("|");
  const pairMap = {
    "南京西路|武康路": "淮海路",
    "南京西路|安福路": "淮海路",
    "南京西路|淮海路": "南京西路",
    "南京西路|黄浦江边": "南京西路",
    "南京西路|徐汇滨江": "淮海路",
    "安福路|武康路": "安福路",
    "安福路|淮海路": "安福路",
    "安福路|黄浦江边": "淮海路",
    "安福路|徐汇滨江": "武康路",
    "武康路|淮海路": "淮海路",
    "武康路|黄浦江边": "淮海路",
    "武康路|徐汇滨江": "武康路",
    "淮海路|黄浦江边": "淮海路",
    "淮海路|徐汇滨江": "淮海路",
    "徐汇滨江|黄浦江边": "黄浦江边",
  };

  return pairMap[pair] || "淮海路";
}

function getWeatherInsight(weatherDemo, effectiveArea, timeWindow, scenePreference) {
  const now = new Date();
  const timeLabel = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const areaLabel = effectiveArea && effectiveArea !== "不限" ? effectiveArea : "你们当前片区";
  const resolvedWeather = weatherDemo === "自动演示" ? "晴天" : weatherDemo;

  if (resolvedWeather === "雨天") {
    return `现在是 ${timeLabel}，${areaLabel}看起来是雨天。建议把计划往室内和少走路的 block 倾斜；如果你们想保留一点氛围，短距离雨中散步也会很浪漫。`;
  }
  if (resolvedWeather === "阴天") {
    return `现在是 ${timeLabel}，${areaLabel}偏阴天。适合保留一段轻量步行，但最好让主场落在室内或可随时转入室内的场所。`;
  }
  return `现在是 ${timeLabel}，${areaLabel}天气不错。${scenePreference === "户外优先" || timeWindow !== "晚上" ? "可以把 citywalk、滨江或街区转场放进今天的动线。" : "可以保留一段轻量户外转场，再把主时段落在室内。"}`;
}

function getStyleScore(self, other, context, dateStage, rerollMode, fineDiningNight) {
  const combo = `${self || ""}${other || ""}${context || ""}${dateStage || ""}${rerollMode || ""}`;
  let score = 0;
  if (/第一次|first/i.test(combo)) score += 2;
  if (/暧昧期|稳定交往|长期伴侣|深入|认真聊|慢一点/i.test(combo)) score -= 2;
  if (/内向|安静|不想太满|轻松/i.test(combo)) score -= 1;
  if (/喝酒|夜晚|热闹|放松|周末/i.test(combo)) score += 1;
  if (getEnergy(self) === "extrovert") score += 1;
  if (other && getEnergy(other) === "introvert") score -= 1;
  if (rerollMode === "safer") score += 1;
  if (rerollMode === "memorable") score -= 2;
  if (fineDiningNight) score += 1;
  return score;
}

function generateRecommendation(
  self,
  other,
  context,
  dateStage = "稳定交往",
  budget = "不限",
  preferredArea = "不限",
  rerollMode = "balanced",
  timeWindow = "晚上",
  scenePreference = "都可以",
  vibeGoal = "都可以",
  duration = "2-4小时",
  selectedActivities = ["吃饭", "散步"],
  weatherDemo = "自动演示",
  fineDiningNight = false,
  midpointArea = "",
  effectiveArea = "不限"
) {
  const score = getStyleScore(self, other, context, dateStage, rerollMode, fineDiningNight);
  const bothIntro = getEnergy(self) === "introvert" && (!other || getEnergy(other) === "introvert");
  const deepMode = /深入|认真聊|有记忆点|长期伴侣|稳定交往/i.test(`${context || ""}${dateStage}`) || score <= -2;
  const activitySet = new Set(selectedActivities || []);

  let picks = [];
  let route = routes[0];
  let tagline = "给这次二人约会排一条更顺的动线";
  let analysis = "这次不一定要追求大惊喜，先把开场、转场和收尾排顺，体验就会比临场想地点稳定很多。";
  let tags = ["二人约会", "边走边聊", "可执行"];

  if (bothIntro || score <= -1) {
    picks = ["duozhaoyu", "arabica-wukang", "sinan", "psa", "shanghai-library"];
    route = routes[0];
    tagline = "先低压开场，再决定今晚要不要拉长";
    analysis = "这组更吃环境给的缓冲，不适合一上来就把节奏拉太满。先选安静、可移动、容错率高的场，再根据状态决定是否继续，会比硬凹安排更顺。";
    tags = ["慢热", "安静", "可撤退"];
  }

  if (score >= 2) {
    picks = ["xintiandi", "harmay", "zhangyuan", "sinan", "chun-k-sml-center", "cashbox-partyworld-fuxing-park"];
    route = routes[1];
    tagline = "今晚可以更活一点，不用太保守";
    analysis = "你们这组不需要过度控场。更适合有密度、有转场、能把气氛往上带一点的动线，重点不是稳，而是让这次见面更有推进感。";
    tags = ["不冷场", "续摊", "轻松"];
  }

  if (deepMode) {
    picks = ["westbund", "psa", "sinan", "duozhaoyu", "nabi-shanghai", "shanghai-library"];
    route = routes[3];
    tagline = "更适合做出一点共同记忆";
    analysis = "如果这次约会目标不是简单打发时间，而是想把关系往前推进或给长期关系一点新鲜感，那就别把动线做得太碎。选能停留、能观察、也允许沉默的场，会更有效。";
    tags = ["深入", "有记忆点", "慢热"];
  }

  if (dateStage === "第一次见面") {
    route = routes[0];
    tagline = rerollMode === "memorable" ? "第一次见面，但别太平" : "第一次见面，先把容错率拉高";
    analysis = rerollMode === "memorable"
      ? "这是第一次见面，但你又不想太标准答案。所以推荐会保留安全边界，同时给一点轻微记忆点，不会一下子压得太满。"
      : "第一次见面优先看撤退空间和对话压力，不要追求一把把关系做深。先顺，再谈惊喜。";
    tags = rerollMode === "memorable" ? ["第一次见面", "有氛围", "边走边聊"] : ["第一次见面", "可撤退", "边走边聊"];
    if (rerollMode === "memorable") picks = ["sinan", "zhangyuan", "arabica-wukang", "xintiandi", "nabi-shanghai"];
  }

  if (dateStage === "稳定交往") {
    tagline = rerollMode === "memorable" ? "别再重复吃饭电影了，今晚换一种推进方式" : "适合稳定关系的一整晚轻量计划";
    analysis = rerollMode === "memorable"
      ? "稳定关系里更需要的是新鲜感，不是安全答案。安排里要有一段体验型内容，再配一段自然转场，才更像一次真正的 date night。"
      : "对稳定关系来说，关键不是避免尴尬，而是降低决策疲劳。把今晚排成一条顺手路线，比临场想去哪更省力。";
    if (!picks.length) picks = ["zhangyuan", "harmay", "westbund", "sinan", "nabi-shanghai", "chun-k-sml-center", "qing-blind-massage"];
    if (rerollMode === "balanced") route = routes[1];
  }

  if (dateStage === "长期伴侣") {
    tagline = rerollMode === "memorable" ? "给熟悉关系一点新鲜感和记忆点" : "适合周末直接照着走的一整段双人计划";
    analysis = rerollMode === "memorable"
      ? "长期关系的问题通常不是聊不开，而是不知道去哪、做什么。今晚更适合直接生成一条完整路线，把‘想不到’外包给系统。"
      : "长期伴侣更需要的是低脑力、可执行、能自然延展的计划。与其反复讨论，不如直接摇出一套能落地的 date plan。";
    tags = rerollMode === "memorable" ? ["长期伴侣", "有记忆点", "完整路线"] : ["长期伴侣", "低脑力决策", "完整路线"];
    if (!picks.length) picks = ["westbund", "zhangyuan", "harmay", "xintiandi", "qing-blind-massage", "cashbox-partyworld-fuxing-park", "shanghai-library"];
    route = rerollMode === "memorable" ? routes[3] : routes[1];
  }

  if (fineDiningNight) {
    tagline = "今晚按 fine dining night 排一套标准但不无聊的流程";
    analysis = "这类晚上不需要过度发散，关键是先稳定碰面，再落一顿正式晚餐，最后给酒吧或轻量收尾留窗口。重点不是创意，而是标准流程下的精准命中。";
    tags = ["Fine dining night", "标准流程", "更精准推送"];
    picks = [
      "imperial-treasure-rockbund",
      "1515-west-chophouse",
      "canton-table",
      "ruths-chris-shanghai",
      "nabi-shanghai",
      "meatopia-stone-sal",
      "harmay",
      "chun-k-sml-center",
      "cashbox-partyworld-fuxing-park",
      ...picks,
    ].filter((id, index, arr) => arr.indexOf(id) === index);
    route = effectiveArea === "南京西路" ? routes[2] : effectiveArea === "安福路" ? routes[1] : routes[2];
  }

  function preferenceBoost(venue) {
    const venueAreaBucket = getVenueAreaBucket(venue);
    let boost = 0;
    if (budget !== "不限" && venue.price === budget) boost += 5;
    if (effectiveArea !== "不限" && venueAreaBucket === effectiveArea) boost += 7;
    if (timeWindow === "白天" && ["咖啡", "书店", "街区", "展馆", "博物馆", "图书馆"].includes(venue.category)) boost += 2;
    if (timeWindow === "晚上" && ["站着喝一杯", "综合", "街区", "餐厅", "KTV", "足浴"].includes(venue.category)) boost += 3;
    if (timeWindow === "周末半天" && ["街区", "展馆", "博物馆", "图书馆", "餐厅"].includes(venue.category)) boost += 3;
    if (scenePreference === "室内优先" && ["咖啡", "书店", "展馆", "博物馆", "综合", "餐厅", "KTV", "足浴", "图书馆"].includes(venue.category)) boost += 3;
    if (scenePreference === "户外优先" && ["街区"].includes(venue.category)) boost += 3;
    if (vibeGoal === "有仪式感" && ["westbund", "sinan", "zhangyuan", "xintiandi", "imperial-treasure-rockbund", "1515-west-chophouse", "canton-table", "ruths-chris-shanghai", "nabi-shanghai", "meatopia-stone-sal"].includes(venue.id)) boost += 4;
    if (vibeGoal === "轻松" && ["arabica-wukang", "harmay", "duozhaoyu", "zhangyuan", "qing-blind-massage", "shanghai-library", "chun-k-sml-center"].includes(venue.id)) boost += 3;
    if (duration === "1-2小时" && ["arabica-wukang", "duozhaoyu", "sinan", "harmay", "shanghai-library", "qing-blind-massage"].includes(venue.id)) boost += 2;
    if (duration === "半天" && ["westbund", "psa", "zhangyuan", "xintiandi", "imperial-treasure-rockbund", "1515-west-chophouse"].includes(venue.id)) boost += 3;
    if (activitySet.has("展") && ["westbund", "psa"].includes(venue.id)) boost += 4;
    if (activitySet.has("散步") && ["zhangyuan", "sinan", "westbund", "arabica-wukang"].includes(venue.id)) boost += 3;
    if (activitySet.has("喝酒") && ["harmay", "xintiandi", "chun-k-sml-center", "cashbox-partyworld-fuxing-park"].includes(venue.id)) boost += 4;
    if (activitySet.has("吃饭") && ["xintiandi", "zhangyuan", "sinan", "harmay", "imperial-treasure-rockbund", "1515-west-chophouse", "canton-table", "ruths-chris-shanghai", "nabi-shanghai", "meatopia-stone-sal"].includes(venue.id)) boost += 3;
    if (fineDiningNight && ["imperial-treasure-rockbund", "1515-west-chophouse", "canton-table", "ruths-chris-shanghai", "nabi-shanghai", "meatopia-stone-sal"].includes(venue.id)) boost += 7;
    if (weatherDemo === "雨天" && ["餐厅", "图书馆", "KTV", "足浴", "博物馆", "展馆"].includes(venue.category)) boost += 3;
    if (weatherDemo === "雨天" && venue.category === "街区") boost -= 2;

    // === Context keyword scan (reads user's free-text input) ===
    // User writes things like "对象喜欢吃牛排" or "想换点韩料" - match them against venue text
    const contextText = (context || "").toLowerCase();
    if (contextText) {
      const venueSearchable = [
        venue.name, venue.desc, ...(venue.tags || []), ...(venue.searchAliases || []), venue.category, venue.vibe
      ].join(" ").toLowerCase();

      // Keywords that should strongly boost matching venues
      const cuisineKeywords = ["牛排", "steak", "粤菜", "港菜", "韩料", "韩餐", "韩食", "日料", "日餐", "寿司", "日式", "omakase", "板前", "鳗鱼", "寿喜锅", "居酒屋", "川菜", "火锅", "打边炉", "本帮", "本帮菜", "法餐", "法国菜", "意餐", "意大利", "意菜", "西餐", "东南亚", "螃蟹", "海鲜", "拉面"];
      const scenarioKeywords = ["咖啡", "coffee", "书店", "书", "展", "美术馆", "博物馆", "酒吧", "bar", "喝酒", "鸡尾酒", "cocktail", "威士忌", "水烟", "唱歌", "ktv", "按摩", "足浴", "spa", "台球", "citywalk", "散步", "江景", "外滩", "夜景"];

      // Strong positive boost: user mentioned X, this venue has X
      [...cuisineKeywords, ...scenarioKeywords].forEach((kw) => {
        if (contextText.includes(kw) && venueSearchable.includes(kw)) {
          boost += 8;
        }
      });

      // Strong negative penalty for cuisine: user wants 牛排 but this venue is 韩料 → wrong
      cuisineKeywords.forEach((kw) => {
        if (contextText.includes(kw)) {
          const venueCuisines = cuisineKeywords.filter((c) => venueSearchable.includes(c));
          if (venueCuisines.length > 0 && !venueCuisines.includes(kw)) {
            boost -= 10; // harsh penalty for wrong cuisine
          }
        }
      });

      // Negation handling: "不要xx" / "不想xx" / "别xx"
      const negationMatch = contextText.match(/(?:不要|不想|别|不吃|讨厌|怕)([^\s，。,.]+)/g);
      if (negationMatch) {
        negationMatch.forEach((neg) => {
          const negatedTerm = neg.replace(/^(不要|不想|别|不吃|讨厌|怕)/, "");
          if (negatedTerm && venueSearchable.includes(negatedTerm.toLowerCase())) {
            boost -= 12; // really don't recommend this
          }
        });
      }
    }

    return boost;
  }

  function routeBoost(candidate) {
    let boost = candidate.id === route.id ? 6 : 0;
    if (effectiveArea !== "不限" && candidate.title.includes(effectiveArea)) boost += 5;
    if (timeWindow === "晚上" && candidate.id === "anfu-yongkang") boost += 4;
    if (timeWindow === "白天" && ["wukang-fuxing", "sinan-xintiandi"].includes(candidate.id)) boost += 3;
    if (timeWindow === "周末半天" && ["westbund-river", "sinan-xintiandi"].includes(candidate.id)) boost += 4;
    if (scenePreference === "户外优先" && ["wukang-fuxing", "westbund-river", "sinan-xintiandi"].includes(candidate.id)) boost += 4;
    if (scenePreference === "室内优先" && ["anfu-yongkang", "sinan-xintiandi"].includes(candidate.id)) boost += 2;
    if (activitySet.has("喝酒") && candidate.id === "anfu-yongkang") boost += 4;
    if (activitySet.has("散步") && ["wukang-fuxing", "westbund-river", "sinan-xintiandi"].includes(candidate.id)) boost += 4;
    if (duration === "1-2小时" && ["wukang-fuxing", "sinan-xintiandi"].includes(candidate.id)) boost += 3;
    if (duration === "半天" && candidate.id === "westbund-river") boost += 5;
    if (fineDiningNight && candidate.id === "sinan-xintiandi") boost += 6;
    if (weatherDemo === "雨天" && candidate.id === "westbund-river") boost -= 2;
    return boost;
  }

  const rankedVenues = Array.from(new Set([...picks, ...venues.map((v) => v.id)]))
    .map((id) => venues.find((v) => v.id === id))
    .filter(Boolean)
    .sort((a, b) => {
      const aBase = picks.includes(a.id) ? 20 : 0;
      const bBase = picks.includes(b.id) ? 20 : 0;
      return bBase + preferenceBoost(b) - (aBase + preferenceBoost(a));
    });

  const budgetFiltered = budget === "不限" ? rankedVenues : rankedVenues.filter((venue) => venue.price === budget);
  let pickedVenues = (budgetFiltered.length ? budgetFiltered : rankedVenues).slice(0, 8);

  // === Cuisine intent lock ===
  // If user wrote a cuisine keyword in context (like "想吃牛排"), force-swap the main venue (index 1)
  // to the first matching restaurant. This overrides the general ranking system because cuisine
  // is a hard requirement, not a soft preference.
  const contextLower = (context || "").toLowerCase();
  const cuisineKeywords = ["牛排", "steak", "粤菜", "港菜", "韩料", "韩餐", "韩食", "日料", "日餐", "寿司", "日式", "omakase", "板前", "鳗鱼", "寿喜锅", "居酒屋", "川菜", "火锅", "打边炉", "本帮", "本帮菜", "法餐", "法国菜", "意餐", "意大利", "意菜", "西餐", "东南亚", "螃蟹", "海鲜", "拉面"];
  const requestedCuisine = cuisineKeywords.find((kw) => contextLower.includes(kw));
  if (requestedCuisine) {
    const matchingRestaurant = (budgetFiltered.length ? budgetFiltered : rankedVenues).find((v) => {
      const searchable = [v.name, v.desc, ...(v.tags || []), ...(v.searchAliases || [])].join(" ").toLowerCase();
      return v.category === "餐厅" && searchable.includes(requestedCuisine);
    });
    if (matchingRestaurant) {
      // Remove it from current position, insert at index 1 (main slot)
      pickedVenues = pickedVenues.filter((v) => v.id !== matchingRestaurant.id);
      if (pickedVenues.length >= 1) {
        pickedVenues = [pickedVenues[0], matchingRestaurant, ...pickedVenues.slice(1)].slice(0, 8);
      } else {
        pickedVenues = [matchingRestaurant];
      }
    }
  }

  const rankedRoutes = [...routes].sort((a, b) => routeBoost(b) - routeBoost(a));
  route = rankedRoutes[0] || route;

  return {
    tagline,
    analysis,
    tags,
    venues: pickedVenues,
    route,
    meta: {
      dateStage,
      budget,
      preferredArea,
      effectiveArea,
      rerollMode,
      matchedAreaCount: pickedVenues.filter((v) => getVenueAreaBucket(v) === effectiveArea).length,
      timeWindow,
      scenePreference,
      vibeGoal,
      duration,
      selectedActivities,
      weatherDemo,
      fineDiningNight,
      midpointArea,
      requestedCuisine, // surfaced for AI prompt
    },
  };
}

function getExecutiveSummary(recommendation) {
  const { dateStage, budget, effectiveArea, rerollMode, timeWindow, scenePreference, vibeGoal, duration, selectedActivities, fineDiningNight, midpointArea } = recommendation.meta;

  const stageSummary =
    dateStage === "第一次见面"
      ? "建议把本次见面控制在 60–90 分钟，以低压力破冰为主"
      : dateStage === "暧昧期"
      ? "建议先完成轻量开场，再通过一次转场测试关系推进空间"
      : dateStage === "稳定交往"
      ? "建议把这次约会排成一整晚的轻量 schedule，重点解决去哪和怎么接的问题"
      : "建议直接按完整路线执行，减少讨论成本，把‘想不到’外包给计划生成";

  const areaSummary = effectiveArea === "不限" ? "片区上按可执行性优先排" : `活动半径以 ${effectiveArea} 为圆心扩散`;
  const midpointSummary = midpointArea ? `折中见面点建议落在 ${midpointArea}` : "暂未启用折中见面点";
  const budgetSummary = budget === "不限" ? "预算暂不构成硬约束" : `预算约束锁定在 ${budget}`;
  const strategySummary =
    rerollMode === "safer"
      ? "策略上偏保守，优先撤退空间和聊天容错率"
      : rerollMode === "memorable"
      ? "策略上偏记忆点，优先氛围、转场和可延展的体验密度"
      : "策略上保持平衡，兼顾稳定性和体验密度";
  const scheduleSummary = `排程按 ${timeWindow} + ${duration} 设计，场景偏好为 ${scenePreference}，整体气质偏 ${vibeGoal}`;
  const activitySummary = selectedActivities?.length ? `活动重心放在 ${selectedActivities.join(" / ")}` : "活动类型保持开放";
  const diningSummary = fineDiningNight ? "今晚按 fine dining night 结构处理，先碰面再正式晚餐再做轻量收尾" : "今晚不强制走标准正式晚餐流程";

  return `${stageSummary}；${midpointSummary}；${areaSummary}；${budgetSummary}；${strategySummary}；${scheduleSummary}；${activitySummary}；${diningSummary}。`;
}

function buildVenueCandidates(kind, recommendation, hint = "") {
  const meta = recommendation.meta;
  const hintText = hint.trim();
  let ids = [];

  if (kind === "warmup") ids = ["arabica-wukang", "duozhaoyu", "sinan", "zhangyuan", "shanghai-library", "xintiandi"];
  if (kind === "main") ids = ["westbund", "psa", "xintiandi", "nabi-shanghai", "meatopia-stone-sal", "1515-west-chophouse", "imperial-treasure-rockbund", "canton-table", "zhangyuan", "sinan"];
  if (kind === "dinner") ids = ["imperial-treasure-rockbund", "1515-west-chophouse", "canton-table", "ruths-chris-shanghai", "nabi-shanghai", "meatopia-stone-sal", "sinan", "xintiandi", "zhangyuan"];
  if (kind === "flex") ids = ["harmay", "chun-k-sml-center", "cashbox-partyworld-fuxing-park", "qing-blind-massage", "xintiandi", "sinan", "zhangyuan", "arabica-wukang"];

  if (meta.scenePreference === "室内优先") ids = [...ids, "duozhaoyu", "psa", "xintiandi", "nabi-shanghai", "1515-west-chophouse", "imperial-treasure-rockbund", "cashbox-partyworld-fuxing-park", "qing-blind-massage", "shanghai-library"];
  if (meta.scenePreference === "户外优先") ids = [...ids, "zhangyuan", "sinan", "westbund", "arabica-wukang"];
  if (meta.timeWindow === "晚上") ids = [...ids, "harmay", "xintiandi", "sinan", "nabi-shanghai", "ruths-chris-shanghai", "cashbox-partyworld-fuxing-park", "qing-blind-massage"];
  if (meta.timeWindow === "白天") ids = [...ids, "arabica-wukang", "duozhaoyu", "zhangyuan", "westbund", "shanghai-library", "psa"];
  if (meta.duration === "半天") ids = [...ids, "westbund", "psa", "zhangyuan", "xintiandi", "shanghai-library"];
  if (meta.selectedActivities?.includes("展")) ids = [...ids, "westbund", "psa"];
  if (meta.selectedActivities?.includes("散步")) ids = [...ids, "zhangyuan", "sinan", "westbund", "arabica-wukang"];
  if (meta.selectedActivities?.includes("喝酒")) ids = [...ids, "harmay", "xintiandi", "chun-k-sml-center", "cashbox-partyworld-fuxing-park"];
  if (meta.selectedActivities?.includes("吃饭")) ids = [...ids, "imperial-treasure-rockbund", "1515-west-chophouse", "canton-table", "ruths-chris-shanghai", "nabi-shanghai", "meatopia-stone-sal", "xintiandi", "sinan", "zhangyuan"];
  if (meta.fineDiningNight) ids = ["imperial-treasure-rockbund", "1515-west-chophouse", "canton-table", "ruths-chris-shanghai", "nabi-shanghai", "meatopia-stone-sal", ...ids];
  if (meta.weatherDemo === "雨天") ids = ["duozhaoyu", "psa", "nabi-shanghai", "imperial-treasure-rockbund", "cashbox-partyworld-fuxing-park", "qing-blind-massage", "shanghai-library", ...ids];

  if (/喝酒|小酒|bar/.test(hintText)) ids = ["harmay", "xintiandi", ...ids];
  if (/ktv|唱歌|包厢/.test(hintText)) ids = ["chun-k-sml-center", "cashbox-partyworld-fuxing-park", ...ids];
  if (/足浴|按摩|放松|spa/.test(hintText)) ids = ["qing-blind-massage", ...ids];
  if (/安静|quiet|不吵/.test(hintText)) ids = ["duozhaoyu", "psa", "sinan", "shanghai-library", ...ids];
  if (/室内|indoor/.test(hintText)) ids = ["duozhaoyu", "psa", "xintiandi", "imperial-treasure-rockbund", "cashbox-partyworld-fuxing-park", ...ids];
  if (/户外|走走|citywalk|散步/.test(hintText)) ids = ["zhangyuan", "sinan", "westbund", "arabica-wukang", ...ids];
  if (/展|museum|艺术/.test(hintText)) ids = ["westbund", "psa", ...ids];
  if (/咖啡|coffee/.test(hintText)) ids = ["arabica-wukang", "duozhaoyu", ...ids];
  if (/图书馆|library|看书/.test(hintText)) ids = ["shanghai-library", ...ids];
  if (/浪漫|仪式感/.test(hintText)) ids = ["sinan", "westbund", "zhangyuan", "1515-west-chophouse", "imperial-treasure-rockbund", ...ids];
  if (/正式晚餐|finedining|fine dining|餐厅/.test(hintText)) ids = ["imperial-treasure-rockbund", "1515-west-chophouse", "canton-table", "ruths-chris-shanghai", "nabi-shanghai", "meatopia-stone-sal", ...ids];
  if (/牛排|steak/.test(hintText)) ids = ["1515-west-chophouse", "ruths-chris-shanghai", "meatopia-stone-sal", ...ids];
  if (/粤菜|cantonese/.test(hintText)) ids = ["imperial-treasure-rockbund", "canton-table", ...ids];
  if (/韩料|korean/.test(hintText)) ids = ["nabi-shanghai", ...ids];

  const candidates = Array.from(new Set(ids))
    .map((id) => venues.find((venue) => venue.id === id))
    .filter(Boolean);

  const areaFiltered = meta.effectiveArea === "不限" ? candidates : candidates.filter((venue) => getVenueAreaBucket(venue) === meta.effectiveArea);
  const budgetFiltered = meta.budget === "不限" ? (areaFiltered.length ? areaFiltered : candidates) : (areaFiltered.length ? areaFiltered : candidates).filter((venue) => venue.price === meta.budget);
  return budgetFiltered.length ? budgetFiltered : (areaFiltered.length ? areaFiltered : candidates);
}

function buildRouteCandidates(recommendation, hint = "") {
  const meta = recommendation.meta;
  const hintText = hint.trim();
  let ids = [recommendation.route?.id, ...routes.map((route) => route.id)];

  if (meta.scenePreference === "户外优先") ids = [...ids, "wukang-fuxing", "westbund-river", "sinan-xintiandi"];
  if (meta.timeWindow === "晚上") ids = [...ids, "anfu-yongkang", "sinan-xintiandi"];
  if (meta.selectedActivities?.includes("喝酒")) ids = [...ids, "anfu-yongkang"];
  if (meta.selectedActivities?.includes("散步")) ids = [...ids, "wukang-fuxing", "westbund-river", "sinan-xintiandi"];
  if (meta.duration === "半天") ids = [...ids, "westbund-river"];
  if (meta.fineDiningNight) ids = ["sinan-xintiandi", "anfu-yongkang", ...ids];

  if (/少走|别走太多|short/.test(hintText)) ids = ["sinan-xintiandi", "anfu-yongkang", ...ids];
  if (/散步|户外|walk/.test(hintText)) ids = ["wukang-fuxing", "westbund-river", "sinan-xintiandi", ...ids];
  if (/喝酒|夜晚/.test(hintText)) ids = ["anfu-yongkang", ...ids];
  if (/稳一点|安全/.test(hintText)) ids = ["sinan-xintiandi", "wukang-fuxing", ...ids];
  if (/正式晚餐|finedining|fine dining/.test(hintText)) ids = ["sinan-xintiandi", ...ids];

  return Array.from(new Set(ids))
    .map((id) => routes.find((route) => route.id === id))
    .filter(Boolean);
}

function createVenueBlock(kind, time, venue, hint = "") {
  if (!venue) return { id: `${kind}-${time}`, kind, time, title: "待补充", note: "系统暂时没有找到更合适的替代块。" };
  const hintPrefix = hint ? `已按“${hint}”方向替换。` : "";

  if (kind === "warmup") {
    return {
      id: `${kind}-${venue.id}-${Math.random().toString(36).slice(2, 6)}`,
      kind,
      time,
      venueId: venue.id,
      title: `先在 ${venue.name} 开场`,
      note: hintPrefix || "用一个低压力、容易进入状态的场所打开今天的约会。",
    };
  }

  if (kind === "main") {
    return {
      id: `${kind}-${venue.id}-${Math.random().toString(36).slice(2, 6)}`,
      kind,
      time,
      venueId: venue.id,
      title: `把主时段落在 ${venue.name}`,
      note: hintPrefix || "这里承接主内容和主要停留时间，决定今晚的体验密度。",
    };
  }

  if (kind === "dinner") {
    return {
      id: `${kind}-${venue.id}-${Math.random().toString(36).slice(2, 6)}`,
      kind,
      time,
      venueId: venue.id,
      title: `把正式晚餐落在 ${venue.name}`,
      note: hintPrefix || "这是今晚的核心 dinner block，优先保证仪式感、到店确定性和后续接酒吧的顺滑度。",
    };
  }

  return {
    id: `${kind}-${venue.id}-${Math.random().toString(36).slice(2, 6)}`,
    kind,
    time,
    venueId: venue.id,
    title: `把收尾留给 ${venue.name}`,
    note: hintPrefix || "保留一个弹性 block，聊得顺就继续，不顺也能自然收。",
  };
}

function createTransferBlock(time, route, hint = "") {
  return {
    id: `transfer-${route?.id || time}-${Math.random().toString(36).slice(2, 6)}`,
    kind: "transfer",
    time,
    routeId: route?.id,
    title: `按 ${route?.title || "推荐路线"} 做中段转场`,
    note: hint ? `已按“${hint}”方向替换中段 route。` : "把前后两段自然接起来，减少临场讨论成本。",
  };
}

function buildAutoDateSchedule(recommendation) {
  const timeWindow = recommendation.meta.timeWindow;
  const duration = recommendation.meta.duration;
  const fineDining = recommendation.meta.fineDiningNight;

  // Time slots per window
  const allTimes =
    timeWindow === "白天"
      ? ["14:00", "15:00", "16:30", "18:00"]
      : timeWindow === "周末半天"
      ? ["15:00", "16:30", "18:30", "21:00"]
      : ["18:30", "19:15", "20:30", "22:00"];

  const primary = recommendation.venues[0] || venues[0];
  const secondary = recommendation.venues[1] || recommendation.venues[0] || venues[1];
  const tertiary = recommendation.venues[2] || secondary || venues[2];

  // Fine dining night is a special structural mode — always 4 blocks
  if (fineDining) {
    return [
      createVenueBlock("warmup", "18:30", primary),
      createTransferBlock("19:15", recommendation.route || routes[0]),
      createVenueBlock("dinner", "20:00", secondary),
      createVenueBlock("flex", "22:00", tertiary),
    ];
  }

  // Duration-aware block count:
  //  - 1-2 小时 → 2 blocks (warmup + main, no transfer)
  //  - 2-4 小时 → 3 blocks (warmup + transfer + main)
  //  - 半天   → 4 blocks (full)
  if (duration === "1-2小时") {
    return [
      createVenueBlock("warmup", allTimes[0], primary),
      createVenueBlock("main", allTimes[2], secondary),
    ];
  }

  if (duration === "2-4小时") {
    return [
      createVenueBlock("warmup", allTimes[0], primary),
      createTransferBlock(allTimes[1], recommendation.route || routes[0]),
      createVenueBlock("main", allTimes[2], secondary),
    ];
  }

  // 半天 or default: full 4 blocks
  return [
    createVenueBlock("warmup", allTimes[0], primary),
    createTransferBlock(allTimes[1], recommendation.route || routes[0]),
    createVenueBlock("main", allTimes[2], secondary),
    createVenueBlock("flex", allTimes[3], tertiary),
  ];
}

function replaceScheduleBlock(block, recommendation, hint = "") {
  if (block.kind === "transfer") {
    const nextRoute = buildRouteCandidates(recommendation, hint).find((route) => route.id !== block.routeId) || buildRouteCandidates(recommendation, hint)[0] || routes[0];
    return createTransferBlock(block.time, nextRoute, hint);
  }

  const nextVenue = buildVenueCandidates(block.kind, recommendation, hint).find((venue) => venue.id !== block.venueId) || buildVenueCandidates(block.kind, recommendation, hint)[0] || venues[0];
  return createVenueBlock(block.kind, block.time, nextVenue, hint);
}

function SmartTransferDemo() {
  const [mood, setMood] = useState("聊得不错");
  const [energy, setEnergy] = useState(72);
  const [conversationDensity, setConversationDensity] = useState(78);
  const [movement, setMovement] = useState(0.8);
  const [elapsedMin, setElapsedMin] = useState(42);
  const [altIndex, setAltIndex] = useState(0);
  const [pulseOn, setPulseOn] = useState(true);

  const nextStops = useMemo(() => {
    if (mood === "刚破冰") {
      return [
        {
          title: "先别坐太久，往武康路里面走",
          reason: "对话还在试探期，降压力比增深度重要。保留移动感，避免太快对坐审问。",
          recommendation: venues.find((v) => v.id === "sinan") || venues[0],
          confidence: 74,
          etaMin: 8,
          distance: 0.5,
        },
        {
          title: "直接接一杯咖啡",
          reason: "静下来但不至于太静。% Arabica 站着喝 20 分钟是标准续场。",
          recommendation: venues.find((v) => v.id === "arabica-wukang") || venues[0],
          confidence: 62,
          etaMin: 4,
          distance: 0.2,
        },
      ];
    }
    if (mood === "聊得不错") {
      return [
        {
          title: "可以考虑做第一次转场",
          reason: "氛围已经稳定，适合从单点见面切到完整动线，制造共同记忆。",
          recommendation: venues.find((v) => v.id === "harmay") || venues[0],
          confidence: 84,
          etaMin: 12,
          distance: 0.7,
        },
        {
          title: "拉长停留时间，换一个更安静的场",
          reason: "状态允许深聊。下一站不必更热闹，而是更能承载对话。",
          recommendation: venues.find((v) => v.id === "duozhaoyu") || venues[0],
          confidence: 71,
          etaMin: 15,
          distance: 0.9,
        },
      ];
    }
    return [
      {
        title: "别做第二次转场，就在这里",
        reason: "深入聊的时候频繁换场会打断 flow。建议原地停留、点一杯、把对话继续。",
        recommendation: venues.find((v) => v.id === "westbund") || venues[0],
        confidence: 81,
        etaMin: 0,
        distance: 0,
      },
      {
        title: "如果一定要换，去能坐到很晚的地方",
        reason: "聊到这一层，关键是不被打烊赶走。选择时段和氛围都允许久坐的场。",
        recommendation: venues.find((v) => v.id === "union-trading-company") || venues[0],
        confidence: 68,
        etaMin: 18,
        distance: 1.1,
      },
    ];
  }, [mood]);

  const activeNextStop = nextStops[altIndex % nextStops.length];

  const activityLog = useMemo(() => {
    const base = elapsedMin;
    return [
      { time: `T-${base}min`, text: "开场 · % Arabica 武康路", type: "event" },
      { time: `T-${Math.max(base - 12, 1)}min`, text: "对话密度开始攀升", type: "signal" },
      { time: `T-${Math.max(base - 25, 1)}min`, text: "已移动 0.5 km · 进入梧桐段", type: "event" },
      { time: mood === "聊得不错" ? "now" : `T-${Math.max(base - 38, 0)}min`,
        text: mood === "刚破冰" ? "评估中：破冰期是否延长" :
              mood === "聊得不错" ? "转场窗口已激活" :
              "检测到深聊信号 · 暂不转场",
        type: "active" },
    ];
  }, [mood, elapsedMin]);

  // Subtle live-updating numbers to feel real-time
  useEffect(() => {
    const id = setInterval(() => {
      setEnergy((v) => Math.max(55, Math.min(92, v + (Math.random() - 0.5) * 4)));
      setConversationDensity((v) => Math.max(40, Math.min(95, v + (Math.random() - 0.5) * 5)));
      setMovement((v) => +(Math.max(0, v + (Math.random() - 0.3) * 0.05)).toFixed(1));
      setElapsedMin((v) => v + 1);
      setPulseOn((p) => !p);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  // Reset index when mood changes
  useEffect(() => {
    setAltIndex(0);
  }, [mood]);

  return (
    <div className="space-y-3">
      {/* Status bar: fake "live session" header */}
      <div className="flex items-center justify-between rounded-full border border-stone-200 bg-paper px-4 py-2">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full transition-opacity"
            style={{ background: "#5A8F4C", opacity: pulseOn ? 1 : 0.4 }}
          />
          <span className="text-[11px] font-medium text-ink">Session active</span>
        </div>
        <div className="text-[11px] text-stone-500">
          已开始 <span className="serif-hero italic text-ink">{elapsedMin}</span> 分钟
        </div>
      </div>

      <div className="rounded-[28px] border border-stone-200 bg-paper p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-mauve">Smart Transfer</p>
            <h3 className="serif-hero mt-3 text-[26px] leading-tight text-ink">
              下一站，<span className="italic text-mauve">实时</span>给你。
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <Badge className="bg-mauve-soft text-mauve text-[10px]" style={{ border: "1px solid rgba(164,134,157,0.3)" }}>Beta</Badge>
            <span className="text-[10px] text-stone-500">v0.3.1</span>
          </div>
        </div>

        {/* Real-time signal grid */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-[14px] border border-stone-200 bg-[#FAF6EE] p-3">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500">对话密度</p>
            <p className="serif-hero mt-1.5 text-[20px] italic text-ink">{Math.round(conversationDensity)}<span className="text-[12px] text-stone-400">%</span></p>
            <div className="mt-2 h-1 rounded-full bg-stone-200 overflow-hidden">
              <div className="h-full bg-mauve transition-all" style={{ width: `${conversationDensity}%` }} />
            </div>
          </div>
          <div className="rounded-[14px] border border-stone-200 bg-[#FAF6EE] p-3">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500">已移动</p>
            <p className="serif-hero mt-1.5 text-[20px] italic text-ink">{movement}<span className="text-[12px] text-stone-400"> km</span></p>
            <div className="mt-2 flex gap-0.5">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i < Math.min(8, Math.round(movement * 4)) ? "var(--ink)" : "var(--stone-200)" }} />
              ))}
            </div>
          </div>
          <div className="rounded-[14px] border border-stone-200 bg-[#FAF6EE] p-3">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500">流畅度</p>
            <p className="serif-hero mt-1.5 text-[20px] italic text-ink">{Math.round(energy)}<span className="text-[12px] text-stone-400">%</span></p>
            <div className="mt-2 h-1 rounded-full bg-stone-200 overflow-hidden">
              <div className="h-full bg-ink transition-all" style={{ width: `${energy}%` }} />
            </div>
          </div>
        </div>

        {/* Mood selector */}
        <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Detected mood · AI 判定的状态</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {["刚破冰", "聊得不错", "开始深入"].map((item) => {
            const active = mood === item;
            return (
              <button
                key={item}
                className={cn(
                  "rounded-full border px-2 py-2.5 text-[12px] font-medium transition",
                  active ? "border-ink bg-ink text-white" : "border-stone-200 bg-[#FAF6EE] text-stone-600-ink hover:border-mauve hover:text-ink"
                )}
                onClick={() => setMood(item)}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Next Move with multiple candidates */}
        <div className="mt-5 rounded-[22px] bg-ink p-5 text-white">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">Next move</p>
            <div className="flex items-center gap-1 rounded-full bg-white/10 p-0.5">
              {nextStops.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setAltIndex(i)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-medium transition",
                    altIndex === i ? "bg-white text-ink" : "text-stone-400"
                  )}
                >
                  候选 {i + 1}
                </button>
              ))}
            </div>
          </div>
          <h3 className="serif-hero mt-3 text-[22px] leading-tight">{activeNextStop.title}</h3>
          <p className="mt-3 text-[13px] leading-[1.65] text-stone-300">{activeNextStop.reason}</p>

          <div className="mt-4 flex items-center gap-3 text-[11px] text-stone-400">
            <span>置信度 <span className="serif-hero italic text-white">{activeNextStop.confidence}%</span></span>
            {activeNextStop.distance > 0 && (
              <>
                <span className="text-stone-600">·</span>
                <span>距离 {activeNextStop.distance}km</span>
              </>
            )}
            {activeNextStop.etaMin > 0 && (
              <>
                <span className="text-stone-600">·</span>
                <span>步行 {activeNextStop.etaMin}min</span>
              </>
            )}
          </div>

          <div className="mt-4 rounded-[16px] border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="serif-hero text-[17px] text-white truncate">{activeNextStop.recommendation?.name}</p>
                <p className="mt-1 text-[11px] italic text-stone-400 truncate">{activeNextStop.recommendation?.area} · {activeNextStop.recommendation?.category}</p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 text-stone-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Activity log */}
        <div className="mt-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Activity log</p>
          <div className="mt-2 space-y-1.5">
            {activityLog.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 text-[11px]">
                <span className={cn(
                  "serif-hero italic shrink-0 w-[54px] text-right",
                  entry.type === "active" ? "text-mauve" : "text-stone-400"
                )}>{entry.time}</span>
                <span className={cn(
                  "flex-1",
                  entry.type === "active" ? "text-ink font-medium" : "text-stone-600-ink"
                )}>
                  {entry.type === "active" && (
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-mauve mr-1.5 align-middle transition-opacity"
                      style={{ opacity: pulseOn ? 1 : 0.3 }}
                    />
                  )}
                  {entry.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VenueCard({ venue, favorited, onToggleFavorite, onOpen }) {
  const Icon = iconForCategory(venue.category);
  return (
    <div className="rounded-[24px] border border-stone-200 bg-paper p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="rounded-2xl bg-[#F5F1EA] p-2.5 text-stone-700 shrink-0">
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h3 className="serif-hero text-[19px] leading-tight text-ink truncate">{venue.name}</h3>
            <p className="mt-1 text-[12px] text-stone-500">{venue.area} · {venue.category}</p>
          </div>
        </div>
        <button onClick={onToggleFavorite} className="rounded-full p-2 text-stone-500 transition hover:bg-stone-100 hover:text-ink shrink-0">
          {favorited ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>
      <p
        className="mt-3 text-[13px] leading-[1.6] text-stone-600-ink"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {venue.desc}
      </p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          <Badge className="bg-[#F5F1EA] text-stone-700">{venue.price}</Badge>
          {venue.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="border border-stone-200 text-stone-600">{tag}</Badge>
          ))}
        </div>
        <button onClick={onOpen} className="serif-hero text-[13px] italic text-ink underline underline-offset-4 decoration-stone-300 hover:decoration-ink shrink-0">展开 →</button>
      </div>
    </div>
  );
}

function CompactVenueCard({ venue, favorited, onToggleFavorite, onOpen }) {
  const Icon = iconForCategory(venue.category);
  return (
    <div className="snap-start shrink-0 w-[240px] rounded-[22px] border border-stone-200 bg-paper p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="rounded-xl bg-[#F5F1EA] p-2 text-stone-700">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <button onClick={onToggleFavorite} className="rounded-full p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-ink">
          {favorited ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
        </button>
      </div>
      <h4 className="serif-hero mt-3 text-[16px] leading-tight text-ink line-clamp-2" style={{
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>{venue.name}</h4>
      <p className="mt-1 text-[11px] text-stone-500">{venue.area} · {venue.category}</p>
      <p
        className="mt-3 text-[12px] leading-[1.55] text-stone-600-ink"
        style={{
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}
      >
        {venue.desc}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <Badge className="bg-[#F5F1EA] text-stone-700 text-[10px]">{venue.price}</Badge>
        <button onClick={onOpen} className="serif-hero text-[12px] italic text-ink underline underline-offset-4 decoration-stone-300 hover:decoration-ink">展开 →</button>
      </div>
    </div>
  );
}

function RouteCard({ item, onOpen }) {
  return (
    <div className="rounded-[24px] border border-ink bg-ink p-6 text-white shadow-sm">
      <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400">Date Route</p>
      <h3 className="serif-hero mt-3 text-[24px] leading-tight">{item.title}</h3>
      <p className="mt-2 text-[12px] italic text-stone-400">{item.tagline}</p>
      <p className="mt-4 text-[13px] leading-[1.65] text-stone-300">{item.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.fit.map((tag) => (
          <Badge key={tag} className="bg-white/10 text-white">{tag}</Badge>
        ))}
      </div>
      <button onClick={onOpen} className="btn-hinge-primary mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-[13px]" style={{ background: "white", color: "#1A1A1A" }}>
        查看路线 →
      </button>
    </div>
  );
}

function BackHeader({ title, onBack }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <Button variant="outline" size="icon" onClick={onBack} className="rounded-full border-stone-300 bg-white">
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div>
        <p className="serif-hero text-[14px] tracking-tight" style={{ color: "#8A8278" }}>Date Tonight</p>
        <h2 className="serif-hero mt-0.5 text-[28px] leading-tight" style={{ color: "#1A1A1A" }}>{title}</h2>
      </div>
    </div>
  );
}

export default function ShanghaiDatingGuideDemo() {
  const initialRecommendation = () =>
    generateRecommendation(
      "",
      "",
      "这周末想一起出去，但不想再重复吃饭电影",
      "稳定交往",
      "不限",
      "不限",
      "balanced",
      "晚上",
      "都可以",
      "都可以",
      "2-4小时",
      ["吃饭", "散步"],
      "自动演示",
      false,
      "",
      "不限"
    );

  const [page, setPage] = useState("home");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("全部");
  const [selfMbti, setSelfMbti] = useState("");
  const [otherMbti, setOtherMbti] = useState("");
  const [dateStage, setDateStage] = useState("稳定交往");
  const [budget, setBudget] = useState("不限");
  const [preferredArea, setPreferredArea] = useState("不限");
  const [rerollMode, setRerollMode] = useState("balanced");
  const [timeWindow, setTimeWindow] = useState("晚上");
  const [scenePreference, setScenePreference] = useState("都可以");
  const [vibeGoal, setVibeGoal] = useState("都可以");
  const [duration, setDuration] = useState("2-4小时");
  const [selectedActivities, setSelectedActivities] = useState(["吃饭", "散步"]);
  const [weatherDemo, setWeatherDemo] = useState("自动演示");
  const [fineDiningNight, setFineDiningNight] = useState(false);
  const [myStartLocation, setMyStartLocation] = useState("");
  const [partnerStartLocation, setPartnerStartLocation] = useState("");
  const [useMidpointAssist, setUseMidpointAssist] = useState(true);
  const [context, setContext] = useState("这周末想一起出去，但不想再重复吃饭电影");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [recommendation, setRecommendation] = useState(() => initialRecommendation());
  const [autoDateSchedule, setAutoDateSchedule] = useState(() => buildAutoDateSchedule(initialRecommendation()));
  const [scheduleBlockHints, setScheduleBlockHints] = useState({});

  // === Hinge-style design tokens (fonts + css vars) ===
  useEffect(() => {
    if (document.getElementById("date-tonight-fonts")) return;
    const link = document.createElement("link");
    link.id = "date-tonight-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "date-tonight-style";
    style.textContent = `
      :root {
        --ink: #1A1A1A;
        --paper: #FFFFFD;
        --cream: #FAF6EE;
        --mauve: #A4869D;
        --mauve-soft: #EEE6EA;
        --kelp: #5A6F56;
        --lilac: #B8A9C9;
        --stone-200: #E5E3DE;
        --stone-400: #A8A299;
        --stone-600: #4A453E;
      }
      .font-display { font-family: 'Fraunces', 'Songti SC', Georgia, serif; font-optical-sizing: auto; }
      .font-body { font-family: 'Inter', 'PingFang SC', 'Hiragino Sans GB', system-ui, sans-serif; }
      body { font-family: 'Inter', 'PingFang SC', 'Hiragino Sans GB', system-ui, sans-serif; }
      /* Hinge-style big CTA */
      .btn-hinge-primary {
        background: var(--ink);
        color: var(--paper);
        border-radius: 9999px;
        font-weight: 500;
        letter-spacing: -0.005em;
        transition: transform 150ms ease, box-shadow 200ms ease;
        box-shadow: 0 2px 0 0 rgba(0,0,0,0.08);
      }
      .btn-hinge-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(26,26,26,0.18); }
      .btn-hinge-primary:active { transform: translateY(0); box-shadow: 0 2px 0 0 rgba(0,0,0,0.08); }
      .chip-selected-mauve { background: var(--mauve-soft) !important; color: var(--ink) !important; border-color: var(--mauve) !important; }
      .bg-cream { background: var(--cream); }
      .bg-paper { background: var(--paper); }
      .bg-ink { background: var(--ink); }
      .bg-mauve-soft { background: var(--mauve-soft); }
      .text-ink { color: var(--ink); }
      .text-mauve { color: var(--mauve); }
      .text-kelp { color: var(--kelp); }
      .text-stone-600-ink { color: var(--stone-600); }
      .border-ink { border-color: var(--ink); }
      .border-mauve { border-color: var(--mauve); }
      /* Serif headline micro-adjustments */
      .serif-hero { font-family: 'Fraunces', 'Songti SC', Georgia, serif; font-weight: 500; letter-spacing: -0.025em; font-variation-settings: "SOFT" 50, "WONK" 0; }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("shanghai-dating-favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("shanghai-dating-favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const favoriteCount = favorites.length;
  const midpointArea = useMemo(() => inferMidpointArea(myStartLocation, partnerStartLocation), [myStartLocation, partnerStartLocation]);
  const effectiveArea = useMemo(() => (useMidpointAssist && midpointArea ? midpointArea : preferredArea), [useMidpointAssist, midpointArea, preferredArea]);
  const weatherInsight = useMemo(() => getWeatherInsight(weatherDemo, effectiveArea, timeWindow, scenePreference), [weatherDemo, effectiveArea, timeWindow, scenePreference]);

  const filteredVenues = useMemo(() => {
    const q = query.trim().toLowerCase();
    const t = tag.trim().toLowerCase();
    return venues.filter((v) => {
      const searchText = getVenueSearchText(v);
      const hitQuery = !q || searchText.includes(q);
      const hitTag = tag === "全部" || searchText.includes(t);
      return hitQuery && hitTag;
    });
  }, [query, tag]);

  function toggleFavorite(id) {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleActivity(activity) {
    setSelectedActivities((prev) => (prev.includes(activity) ? prev.filter((item) => item !== activity) : [...prev, activity]));
  }

  function openVenue(venue) {
    setSelectedVenue(venue);
    setPage("venue-detail");
  }

  function openRoute(route) {
    setSelectedRoute(route);
    setPage("route-detail");
  }

  const [isGenerating, setIsGenerating] = useState(false);
  const [replacingBlockIndex, setReplacingBlockIndex] = useState(null);
  const [aiError, setAiError] = useState(null);

  async function runRecommendation(nextMode = rerollMode) {
    setRerollMode(nextMode);
    setAiError(null);

    // 1. Rule engine generates the structural recommendation (venues, route, schedule)
    const nextRecommendation = generateRecommendation(
      selfMbti,
      otherMbti,
      context,
      dateStage,
      budget,
      preferredArea,
      nextMode,
      timeWindow,
      scenePreference,
      vibeGoal,
      duration,
      selectedActivities,
      weatherDemo,
      fineDiningNight,
      midpointArea,
      effectiveArea
    );
    const nextSchedule = buildAutoDateSchedule(nextRecommendation);

    // 2. Show the rule-engine output immediately
    setRecommendation(nextRecommendation);
    setAutoDateSchedule(nextSchedule);
    setScheduleBlockHints({});

    // 3. Call AI in the background to polish tagline + analysis
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selfMbti, otherMbti, context, dateStage, vibeGoal,
          timeWindow, duration, fineDiningNight, midpointArea,
          mode: nextMode,
          venues: nextRecommendation.venues.map((v) => ({
            id: v.id, name: v.name, area: v.area, category: v.category, vibe: v.vibe,
          })),
          schedule: nextSchedule.map((b) => ({ time: b.time, title: b.title, note: b.note })),
        }),
      });
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();
      if (data.tagline || data.analysis) {
        setRecommendation((prev) => ({
          ...prev,
          tagline: data.tagline || prev.tagline,
          analysis: data.analysis || prev.analysis,
        }));
      }
    } catch (e) {
      console.error("AI polish failed:", e);
      setAiError("AI 润色没跑成功，当前显示的是规则引擎版本。");
    } finally {
      setIsGenerating(false);
    }
  }

  // Apply a scenario preset: fills form state, generates a plan with preset params
  // (not relying on async state updates), jumps to plan page with result visible.
  async function applyPreset(preset) {
    const c = preset.config;
    // Update form state so the user can see and edit the preset
    setDateStage(c.dateStage);
    setTimeWindow(c.timeWindow);
    setDuration(c.duration);
    setVibeGoal(c.vibeGoal);
    setScenePreference(c.scenePreference);
    setSelectedActivities(c.selectedActivities);
    setPreferredArea(c.preferredArea);
    setBudget(c.budget);
    setContext(c.context);
    setFineDiningNight(c.fineDiningNight);
    setWeatherDemo(c.weatherDemo);

    // Generate recommendation directly from preset config (avoids async state timing issues)
    const rec = generateRecommendation(
      selfMbti, otherMbti, c.context, c.dateStage, c.budget, c.preferredArea,
      "balanced", c.timeWindow, c.scenePreference, c.vibeGoal, c.duration,
      c.selectedActivities, c.weatherDemo, c.fineDiningNight, "", c.preferredArea
    );
    const schedule = buildAutoDateSchedule(rec);
    setRecommendation(rec);
    setAutoDateSchedule(schedule);
    setScheduleBlockHints({});
    setRerollMode("balanced");
    setAiError(null);
    setPage("mbti");

    // Trigger AI polish in background
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selfMbti, otherMbti,
          context: c.context, dateStage: c.dateStage, vibeGoal: c.vibeGoal,
          timeWindow: c.timeWindow, duration: c.duration,
          fineDiningNight: c.fineDiningNight, midpointArea: "",
          mode: "balanced",
          venues: rec.venues.map((v) => ({
            id: v.id, name: v.name, area: v.area, category: v.category, vibe: v.vibe,
          })),
          schedule: schedule.map((b) => ({ time: b.time, title: b.title, note: b.note })),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.tagline || data.analysis) {
          setRecommendation((prev) => ({
            ...prev,
            tagline: data.tagline || prev.tagline,
            analysis: data.analysis || prev.analysis,
          }));
        }
      }
    } catch (e) {
      console.error("AI polish failed for preset:", e);
    } finally {
      setIsGenerating(false);
    }
  }

  function rerollScheduleBlock(index) {
    setAutoDateSchedule((prev) => prev.map((block, blockIndex) => (blockIndex === index ? replaceScheduleBlock(block, recommendation, "") : block)));
  }

  async function applyHintedScheduleBlockReplacement(index) {
    const hint = (scheduleBlockHints[index] || "").trim();
    if (!hint) {
      rerollScheduleBlock(index);
      return;
    }

    setReplacingBlockIndex(index);
    setAiError(null);
    try {
      // Ask AI to interpret the hint into structured intent
      const res = await fetch("/api/interpret-hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hint,
          currentBlock: autoDateSchedule[index],
          scheduleContext: autoDateSchedule.map((b) => ({ time: b.time, title: b.title })),
        }),
      });

      let parsedHint = hint;
      if (res.ok) {
        const data = await res.json();
        if (data.normalizedHint) parsedHint = data.normalizedHint;
      }

      setAutoDateSchedule((prev) =>
        prev.map((block, blockIndex) => (blockIndex === index ? replaceScheduleBlock(block, recommendation, parsedHint) : block))
      );
    } catch (e) {
      console.error("Hint interpretation failed:", e);
      // Fallback to raw hint
      setAutoDateSchedule((prev) =>
        prev.map((block, blockIndex) => (blockIndex === index ? replaceScheduleBlock(block, recommendation, hint) : block))
      );
    } finally {
      setReplacingBlockIndex(null);
    }
  }

  return (
    <div className="min-h-screen bg-cream text-stone-900">
      <div className="mx-auto max-w-md px-4 pb-28 pt-5">
        {page === "home" && (
          <div className="space-y-5">
            <div className="flex items-start justify-between pt-1">
              <div>
                <h1 className="serif-hero text-[26px] leading-none text-ink">Date Tonight</h1>
                <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">上海最强约会指南</p>
              </div>
              <Badge className="rounded-full bg-ink text-white">{favoriteCount} 收藏</Badge>
            </div>

            <section className="rounded-[32px] bg-paper border border-stone-200 p-7 shadow-sm">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">Tonight · 今晚</p>
              <h2 className="serif-hero mt-4 text-[44px] leading-[1.02] text-ink">
                不知道去哪？
                <br />
                <span className="italic text-mauve">摇一次</span>就知道。
              </h2>
              <p className="mt-5 text-[14px] leading-[1.65] text-stone-600-ink">
                不是推荐几个地点，是自动生成一整段可执行的二人约会。<br />
                第一次见面、稳定情侣、长期伴侣，都能用。
              </p>
              <button
                onClick={() => setPage("mbti")}
                className="btn-hinge-primary mt-6 inline-flex items-center gap-2 px-6 py-3 text-[14px]"
              >
                <Sparkles className="h-4 w-4" />
                为今晚排一个
              </button>
            </section>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setPage("venues")}
                placeholder="搜店名 / 场景 / 商圈"
                className="rounded-full border border-stone-200 bg-paper py-3 pl-11 pr-4 text-[13px] placeholder:text-stone-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setPage("venues")} className="group rounded-[22px] border border-stone-200 bg-paper p-5 text-left transition hover:-translate-y-0.5 hover:border-ink hover:shadow-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">01</p>
                <h3 className="serif-hero mt-4 text-[22px] leading-tight text-ink">直接选店</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-stone-600-ink">先把颗粒度拉到可执行，不再靠临场空转。</p>
              </button>
              <button onClick={() => setPage("routes")} className="group rounded-[22px] border border-stone-200 bg-paper p-5 text-left transition hover:-translate-y-0.5 hover:border-ink hover:shadow-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">02</p>
                <h3 className="serif-hero mt-4 text-[22px] leading-tight text-ink">直接走路线</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-stone-600-ink">从一个起点开始，顺手接上下一段。</p>
              </button>
              <button onClick={() => setPage("mbti")} className="group rounded-[22px] bg-ink p-5 text-left text-white transition hover:-translate-y-0.5 hover:shadow-xl">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-400">03 · AI Plan</p>
                <h3 className="serif-hero mt-4 text-[26px] leading-[1.05] italic">
                  别再问<br/><span className="text-mauve-soft">"你想吃什么"</span>
                </h3>
                <p className="mt-3 text-[11px] leading-relaxed text-stone-400">摇一次，今晚去哪就定了。</p>
              </button>
              <button onClick={() => setPage("transfer")} className="group rounded-[22px] border border-stone-200 bg-mauve-soft p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-mauve">04 · Live</p>
                <h3 className="serif-hero mt-4 text-[26px] leading-[1.05] text-ink">
                  约会中的<br/><span className="italic text-mauve">Copilot</span>
                </h3>
                <p className="mt-3 text-[11px] leading-relaxed text-stone-600-ink">不是静态攻略，是实时决策。</p>
              </button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="px-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">Tonight's quick plans</p>
                <h2 className="serif-hero mt-2 text-[26px] leading-[1.1] text-ink">
                  不想填表？<br/><span className="italic text-mauve">挑一个直接跑</span>
                </h2>
                <p className="mt-2 text-[12px] leading-relaxed text-stone-600-ink">
                  三套最常见场景的预设。点一下，今晚的 schedule 和路线都有了。
                </p>
              </div>
              {scenarioPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="group w-full rounded-[24px] border border-stone-200 bg-paper p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-mauve">{preset.kicker}</p>
                      <h3 className="serif-hero mt-2 text-[20px] leading-tight text-ink">{preset.title}</h3>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-stone-600-ink">{preset.subtitle}</p>
                      <p className="mt-3 text-[11px] text-stone-500">{preset.meta}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1 text-ink group-hover:translate-x-0.5 transition-transform">
                      <span className="serif-hero italic text-[13px]">直接跑</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Author footer moved to global bottom */}
          </div>
        )}

        {page === "venues" && (
          <div className="space-y-5">
            <BackHeader title="挑一家" onBack={() => setPage("home")} />
            <div className="rounded-[24px] border border-stone-200 bg-paper p-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜店名 / 场景 / 商圈"
                  className="rounded-full border border-stone-200 bg-[#FAF6EE] py-3 pl-11 pr-4 text-[13px] placeholder:text-stone-400"
                />
              </div>
              <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Filter · 27 places</p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {venueBrowseChips.map((item) => (
                  <button
                    key={item}
                    onClick={() => setTag(item)}
                    className={cn(
                      "whitespace-nowrap shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition",
                      tag === item
                        ? "border-ink bg-ink text-white"
                        : "border-stone-200 bg-paper text-stone-600-ink hover:border-mauve hover:text-ink"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  favorited={favorites.includes(venue.id)}
                  onToggleFavorite={() => toggleFavorite(venue.id)}
                  onOpen={() => openVenue(venue)}
                />
              ))}
            </div>
          </div>
        )}

        {page === "venue-detail" && selectedVenue && (
          <div className="space-y-4">
            <BackHeader title={selectedVenue.name} onBack={() => setPage("venues")} />
            <div className="rounded-[32px] border border-ink bg-ink p-7 text-white shadow-lg">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">{selectedVenue.district} · {selectedVenue.category}</p>
              <h3 className="serif-hero mt-4 text-[36px] leading-[1.05]">{selectedVenue.name}</h3>
              <p className="mt-3 text-[12px] italic text-stone-400">{selectedVenue.area} · 被提到 {selectedVenue.mentions} 次</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge className="bg-white/10 text-white">{selectedVenue.price}</Badge>
                <Badge className="bg-white/10 text-white">{selectedVenue.vibe}</Badge>
                {selectedVenue.tags.map((item) => (
                  <Badge key={item} className="bg-white/10 text-white">{item}</Badge>
                ))}
              </div>
              <p className="mt-5 text-[14px] leading-[1.7] text-stone-300">{selectedVenue.desc}</p>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => toggleFavorite(selectedVenue.id)}
                  className="btn-hinge-primary inline-flex items-center gap-2 px-5 py-2.5 text-[13px]"
                  style={{ background: "white", color: "#1A1A1A" }}
                >
                  {favorites.includes(selectedVenue.id) ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  {favorites.includes(selectedVenue.id) ? "已收藏" : "收藏"}
                </button>
                <button className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-[13px] text-white transition hover:bg-white/10">
                  <MapPin className="h-3.5 w-3.5" />
                  地图打开
                </button>
              </div>
            </div>

            <div className="rounded-[24px] border border-stone-200 bg-paper p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">Suggested move</p>
              <h4 className="serif-hero mt-3 text-[22px] leading-tight text-ink">可以这样接一段路线</h4>
              <p className="mt-4 text-[13px] leading-[1.7] text-stone-600-ink">
                {selectedVenue.area.includes("武康")
                  ? "先在这里完成轻量开场，再顺着武康路往复兴中路走，给聊天留一点移动空间。"
                  : selectedVenue.area.includes("安福")
                  ? "先在安福路待 20 到 40 分钟，再视状态滑去永康路，把正式感卸掉。"
                  : "先把这一站坐稳，再接最近的街区或滨江。重点不是多，而是自然。"}
              </p>
            </div>
          </div>
        )}

        {page === "routes" && (
          <div className="space-y-5">
            <BackHeader title="选一条路线" onBack={() => setPage("home")} />
            <div className="rounded-[24px] border border-stone-200 bg-paper p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">Curated · {routes.length} routes</p>
              <h2 className="serif-hero mt-3 text-[22px] leading-tight text-ink">预设动线，顺手接上下一段</h2>
              <p className="mt-3 text-[13px] leading-[1.65] text-stone-600-ink">
                每条路线都是能真执行的 walking order，不用你再临场拼接。
              </p>
            </div>
            <div className="space-y-3">
              {routes.map((item) => (
                <RouteCard key={item.id} item={item} onOpen={() => openRoute(item)} />
              ))}
            </div>
          </div>
        )}

        {page === "route-detail" && selectedRoute && (
          <div className="space-y-4">
            <BackHeader title="路线" onBack={() => setPage("routes")} />
            <div className="rounded-[32px] border border-ink bg-ink p-7 text-white shadow-lg">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">Tour guide</p>
              <h3 className="serif-hero mt-4 text-[34px] leading-[1.05]">{selectedRoute.title}</h3>
              <p className="mt-3 text-[13px] italic text-stone-400">{selectedRoute.tagline}</p>
              <p className="mt-5 text-[14px] leading-[1.7] text-stone-300">{selectedRoute.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedRoute.fit.map((tag) => (
                  <Badge key={tag} className="bg-white/10 text-white">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-stone-200 bg-paper p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">Stops · 按顺序走</p>
              <div className="mt-4 space-y-2.5">
                {selectedRoute.stops.map((stop, index) => (
                  <div key={stop} className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-[#FAF6EE] px-4 py-3.5">
                    <div className="serif-hero flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] text-white">{index + 1}</div>
                    <div className="text-[14px] font-medium text-ink">{stop}</div>
                    {index < selectedRoute.stops.length - 1 && <ChevronRight className="ml-auto h-4 w-4 text-stone-400" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === "mbti" && (
          <div className="space-y-4">
            <BackHeader title="为今晚排一个" onBack={() => setPage("home")} />

            <div className="rounded-[24px] border border-stone-200 bg-paper p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">AI Plan</p>
              <h3 className="serif-hero mt-3 text-[24px] leading-[1.15] text-ink">
                今晚去哪，<span className="italic text-mauve">摇一次</span>就定。
              </h3>
              <p className="mt-3 text-[12px] leading-relaxed text-stone-600-ink">
                把"你想吃什么"、"我都行"的循环交给系统。填 5 件事，剩下的它排。
              </p>
            </div>

            <div className="space-y-5 rounded-[24px] border border-stone-200 bg-paper p-6">
                {/* ========== QUICK MODE（PRD 指定的 5 项默认可见） ========== */}

                {/* 1. 关系阶段 */}
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Stage · 关系阶段</p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {dateStageOptions.map((item) => {
                      const active = dateStage === item;
                      return (
                        <button
                          type="button"
                          key={item}
                          onClick={() => setDateStage(item)}
                          className={cn(
                            "rounded-full border px-2 py-2.5 text-[12px] font-medium transition",
                            active ? "border-ink bg-ink text-white" : "border-stone-200 bg-[#FAF6EE] text-stone-600-ink hover:border-mauve hover:text-ink"
                          )}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 氛围目标 */}
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Vibe · 想要的氛围</p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {vibeGoalOptions.map((item) => {
                      const active = vibeGoal === item;
                      return (
                        <button
                          type="button"
                          key={item}
                          onClick={() => setVibeGoal(item)}
                          className={cn(
                            "rounded-full border px-2 py-2.5 text-[12px] font-medium transition",
                            active ? "border-ink bg-ink text-white" : "border-stone-200 bg-[#FAF6EE] text-stone-600-ink hover:border-mauve hover:text-ink"
                          )}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. 双方出发地 + midpoint toggle */}
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Starting points · 双方位置</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={myStartLocation}
                      onChange={(e) => setMyStartLocation(e.target.value)}
                      placeholder="你：静安寺 / 武康路"
                      className="rounded-full border-stone-200 bg-[#FAF6EE] px-4 py-3 text-[13px]"
                    />
                    <Input
                      value={partnerStartLocation}
                      onChange={(e) => setPartnerStartLocation(e.target.value)}
                      placeholder="Ta：前滩 / 徐家汇"
                      className="rounded-full border-stone-200 bg-[#FAF6EE] px-4 py-3 text-[13px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-[20px] border border-stone-200 bg-[#FAF6EE] p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-mauve leading-tight">Midpoint<br/>折中点</p>
                      <IOSToggle on={useMidpointAssist} onClick={() => setUseMidpointAssist((p) => !p)} />
                    </div>
                    <p className="serif-hero mt-2.5 text-[13px] leading-snug text-ink">
                      {midpointArea ? `落在 ${midpointArea}` : "填出发地自动生成"}
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-stone-200 bg-[#FAF6EE] p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-mauve leading-tight">Fine<br/>Dining</p>
                      <IOSToggle on={fineDiningNight} onClick={() => setFineDiningNight((p) => !p)} />
                    </div>
                    <p className="serif-hero mt-2.5 text-[13px] leading-snug text-ink">
                      {fineDiningNight ? "按正式晚餐处理" : "不走正式流程"}
                    </p>
                  </div>
                </div>

                {/* 5. 一句话背景 */}
                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Context · 一句话背景（可选）</p>
                  <Textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="比如：已经见过两次，这周想换个节奏"
                    className="min-h-[70px] rounded-[18px] border-stone-200 bg-[#FAF6EE] px-4 py-3 text-[13px] placeholder:text-stone-400"
                  />
                </div>

                {/* ========== ADVANCED FILTERS（折叠） ========== */}
                <div className="rounded-[20px] border border-stone-200 bg-[#FAF6EE]">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced((prev) => !prev)}
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left"
                  >
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-mauve">More preferences</p>
                      <p className="serif-hero mt-1 text-[14px] text-ink">{showAdvanced ? "收起" : "展开 advanced"}</p>
                    </div>
                    <ChevronDown className={cn("h-4 w-4 text-stone-500 transition-transform", showAdvanced && "rotate-180")} />
                  </button>

                  {showAdvanced && (
                    <div className="space-y-4 border-t border-stone-200 p-4">
                      {/* MBTI */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">You · 你</p>
                          <select value={selfMbti} onChange={(e) => setSelfMbti(e.target.value)} className="w-full rounded-full border border-stone-200 bg-paper px-4 py-2.5 text-[13px] font-medium text-ink outline-none">
                            <option value="">— 不填 —</option>
                            {mbtiOptions.map((item) => <option key={item}>{item}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Ta · Ta</p>
                          <select value={otherMbti} onChange={(e) => setOtherMbti(e.target.value)} className="w-full rounded-full border border-stone-200 bg-paper px-4 py-2.5 text-[13px] font-medium text-ink outline-none">
                            <option value="">— 不填 —</option>
                            {mbtiOptions.map((item) => <option key={item}>{item}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* 预算 + 片区 */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Budget · 预算</p>
                          <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full rounded-full border border-stone-200 bg-paper px-4 py-2.5 text-[13px] text-ink outline-none">
                            {budgetOptions.map((item) => <option key={item}>{item}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Area · 片区</p>
                          <select value={preferredArea} onChange={(e) => setPreferredArea(e.target.value)} className="w-full rounded-full border border-stone-200 bg-paper px-4 py-2.5 text-[13px] text-ink outline-none">
                            {areaOptions.map((item) => <option key={item}>{item}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* 时段 + 室内外 + 时长 */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">When</p>
                          <select value={timeWindow} onChange={(e) => setTimeWindow(e.target.value)} className="w-full rounded-full border border-stone-200 bg-paper px-3 py-2.5 text-[12px] text-ink outline-none">
                            {timeWindowOptions.map((item) => <option key={item}>{item}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">Scene</p>
                          <select value={scenePreference} onChange={(e) => setScenePreference(e.target.value)} className="w-full rounded-full border border-stone-200 bg-paper px-3 py-2.5 text-[12px] text-ink outline-none">
                            {scenePreferenceOptions.map((item) => <option key={item}>{item}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">Length</p>
                          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full rounded-full border border-stone-200 bg-paper px-3 py-2.5 text-[12px] text-ink outline-none">
                            {durationOptions.map((item) => <option key={item}>{item}</option>)}
                          </select>
                        </div>
                      </div>

                      {/* 天气 demo */}
                      <div>
                        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Weather · 天气（demo）</p>
                        <select value={weatherDemo} onChange={(e) => setWeatherDemo(e.target.value)} className="w-full rounded-full border border-stone-200 bg-paper px-4 py-2.5 text-[13px] text-ink outline-none">
                          {weatherDemoOptions.map((item) => <option key={item}>{item}</option>)}
                        </select>
                      </div>

                      {/* 活动偏好 */}
                      <div>
                        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">Activities · 活动偏好</p>
                        <div className="flex flex-wrap gap-1.5">
                          {activityOptions.map((item) => {
                            const active = selectedActivities.includes(item);
                            return (
                              <button
                                type="button"
                                key={item}
                                onClick={() => toggleActivity(item)}
                                className={cn(
                                  "rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition",
                                  active ? "border-ink bg-ink text-white" : "border-stone-200 bg-paper text-stone-600-ink hover:border-mauve hover:text-ink"
                                )}
                              >
                                {item}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* How it works */}
                <details className="group rounded-[20px] border border-stone-200 bg-[#FAF6EE] px-4 py-3">
                  <summary className="flex items-center gap-3 cursor-pointer list-none">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-paper shrink-0">
                      <Sparkles className="h-3.5 w-3.5 text-mauve" />
                    </div>
                    <div className="flex-1 text-[11px] leading-[1.55] text-stone-600-ink">
                      按下按钮时，系统做了什么？<span className="text-mauve">展开看 ↓</span>
                    </div>
                  </summary>
                  <div className="mt-3 ml-11 space-y-2 text-[12px] leading-[1.65] text-stone-600-ink">
                    <p><span className="text-mauve font-medium">①</span> 规则引擎按你的输入（关系阶段、氛围、片区、出发地、context 关键词……）排出场所、schedule 和 route。</p>
                    <p><span className="text-mauve font-medium">②</span> 同时，Claude 读你的具体输入，写一段只属于今晚的 tagline 和 analysis。</p>
                    <p><span className="text-mauve font-medium">③</span> 如果 AI 慢或挂了，你看到的是规则引擎兜底版本——不会白屏。</p>
                  </div>
                </details>

                {/* 生成按钮 */}
                <button
                  onClick={() => runRecommendation("balanced")}
                  disabled={isGenerating}
                  className="btn-hinge-primary mt-2 flex w-full items-center justify-center gap-2 py-4 text-[15px] disabled:opacity-70"
                >
                  <Sparkles className={cn("h-4 w-4", isGenerating && "animate-pulse")} />
                  {isGenerating ? (
                    <span>AI 正在润色…</span>
                  ) : (
                    <>
                      <span className="serif-hero text-[18px] italic" style={{ fontWeight: 400 }}>摇一摇</span>
                      <span className="text-stone-400">·</span>
                      <span>生成今晚计划</span>
                    </>
                  )}
                </button>

                {aiError && (
                  <p className="text-center text-[11px] text-mauve">{aiError}</p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => runRecommendation("safer")}
                    variant="outline"
                    className={cn(
                      "w-full rounded-full border-stone-300 bg-white hover:bg-stone-50",
                      rerollMode === "safer" ? "border-ink bg-ink text-white hover:bg-ink hover:text-white" : "text-stone-900"
                    )}
                  >
                    更保守一点
                  </Button>
                  <Button
                    onClick={() => runRecommendation("memorable")}
                    variant="outline"
                    className={cn(
                      "w-full rounded-full border-stone-300 bg-white hover:bg-stone-50",
                      rerollMode === "memorable" ? "border-ink bg-ink text-white hover:bg-ink hover:text-white" : "text-stone-900"
                    )}
                  >
                    更有记忆点一点
                  </Button>
                </div>
            </div>

            <div className="rounded-[32px] border border-ink bg-ink p-7 text-white shadow-lg">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-400">Tonight</p>
              <h3 className="serif-hero mt-4 text-[30px] leading-[1.05] italic">{recommendation.tagline}</h3>
              <p className="mt-5 text-[14px] leading-[1.7] text-stone-300">{recommendation.analysis}</p>

              {/* Compact badges: only the 3 most informative */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                <Badge className="bg-white/10 text-white">{recommendation.meta.dateStage}</Badge>
                <Badge className="bg-white/10 text-white">{recommendation.meta.duration}</Badge>
                <Badge className="bg-white/10 text-white">
                  {recommendation.meta.effectiveArea === "不限" ? "片区不限" : recommendation.meta.effectiveArea}
                </Badge>
                {recommendation.meta.fineDiningNight && <Badge className="bg-white/10 text-white">Fine dining</Badge>}
              </div>

              {/* Inline meta row: weather + midpoint compacted into one row of micro-pills */}
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-kelp" style={{ background: "#8DB97D" }}></span>
                  {recommendation.meta.weatherDemo === "雨天" ? "雨天·偏室内" :
                   recommendation.meta.weatherDemo === "晴天" ? "晴天·户外可走" :
                   recommendation.meta.weatherDemo === "阴天" ? "阴天·灵活" :
                   "天气 OK"}
                </span>
                {midpointArea && (
                  <>
                    <span className="text-stone-600">·</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      落在 {midpointArea}
                    </span>
                  </>
                )}
                <span className="text-stone-600">·</span>
                <details className="inline-block">
                  <summary className="cursor-pointer list-none text-mauve hover:text-white transition">Why this →</summary>
                  <p className="mt-3 text-[12px] leading-[1.7] text-stone-300">
                    规则引擎读了你的关系阶段、时段、时长、片区、出发地、context 关键词，排出这套 schedule 和场所组合。上面的 tagline 和这段分析由 Claude 基于你的具体输入生成，每次会不一样。
                  </p>
                </details>
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-paper p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">Tonight's schedule</p>
                  <h4 className="serif-hero mt-3 text-[24px] leading-tight text-ink">为你排好的流程</h4>
                </div>
                <Badge className="bg-mauve-soft text-mauve" style={{ border: "1px solid rgba(164,134,157,0.3)" }}>可局部替换</Badge>
              </div>
              <p className="mt-3 text-[13px] leading-[1.65] text-stone-600-ink">整体可以，某个 block 不想去？单独换，不用重摇。</p>
              <div className="mt-5 space-y-3">
                {autoDateSchedule.map((item, index) => (
                  <div key={item.id} className="relative rounded-[20px] border border-stone-200 bg-[#FAF6EE] p-5">
                    <div className="flex items-baseline gap-4">
                      <div className="serif-hero min-w-[56px] text-[18px] italic text-mauve">{item.time}</div>
                      <div className="flex-1">
                        <div className="serif-hero text-[16px] leading-tight text-ink">{item.title}</div>
                        <div className="mt-1.5 text-[12px] leading-[1.6] text-stone-600-ink">{item.note}</div>
                      </div>
                    </div>
                    <Input
                      value={scheduleBlockHints[index] || ""}
                      onChange={(e) => setScheduleBlockHints((prev) => ({ ...prev, [index]: e.target.value }))}
                      placeholder="想怎么换？更安静 / 想唱歌 / 不要走太多"
                      className="mt-4 rounded-full border-stone-200 bg-paper px-4 py-2.5 text-[12px] placeholder:text-stone-400"
                    />
                    <div className="mt-2.5 flex gap-2">
                      <button
                        onClick={() => rerollScheduleBlock(index)}
                        disabled={replacingBlockIndex === index}
                        className="flex-1 rounded-full border border-stone-200 bg-paper px-3 py-2 text-[12px] font-medium text-stone-600-ink transition hover:border-mauve hover:text-ink disabled:opacity-60"
                      >
                        换一个
                      </button>
                      <button
                        onClick={() => applyHintedScheduleBlockReplacement(index)}
                        disabled={replacingBlockIndex === index}
                        className="btn-hinge-primary flex-1 px-3 py-2 text-[12px] disabled:opacity-70"
                      >
                        {replacingBlockIndex === index ? "AI 解读中…" : "按方向替换 →"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {recommendation.venues.slice(3).length > 0 && (
              <div className="-mx-4">
                <div className="px-5 pt-2">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-stone-500">Alternates · 其他可选</p>
                      <h4 className="serif-hero mt-2 text-[20px] leading-tight text-ink">
                        不想按 schedule 走？<br/>这几家也<span className="italic text-mauve">匹配你今晚</span>
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-500 shrink-0 pb-1">← 左右划 →</p>
                  </div>
                </div>
                <div
                  className="mt-4 flex gap-3 overflow-x-auto pb-2 px-4 snap-x snap-mandatory"
                  style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
                >
                  {recommendation.venues.slice(3).map((venue) => (
                    <CompactVenueCard
                      key={venue.id}
                      venue={venue}
                      favorited={favorites.includes(venue.id)}
                      onToggleFavorite={() => toggleFavorite(venue.id)}
                      onOpen={() => openVenue(venue)}
                    />
                  ))}
                </div>
              </div>
            )}

            <RouteCard item={recommendation.route} onOpen={() => openRoute(recommendation.route)} />
          </div>
        )}

        {page === "transfer" && (
          <div className="space-y-4">
            <BackHeader title="约会中 Copilot" onBack={() => setPage("home")} />
            <div className="rounded-[24px] border border-stone-200 bg-paper p-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-mauve">Live · 约会中决策</p>
              <h3 className="serif-hero mt-3 text-[24px] leading-[1.15] text-ink">
                约会进行到一半，<br/><span className="italic text-mauve">下一步它替你想</span>。
              </h3>
              <p className="mt-3 text-[12px] leading-relaxed text-stone-600-ink">
                不是静态攻略。根据你们当下的状态（刚破冰 / 聊得不错 / 开始深入），实时推下一站、判断要不要转场、给出置信度。
              </p>
            </div>
            <SmartTransferDemo />
          </div>
        )}

        {/* Global author footer - appears on every page */}
        <div className="mt-12 pb-32 text-center">
          <p className="text-[11px] text-stone-500 leading-relaxed">
            Built by <span className="serif-hero italic text-ink">@Savagettom</span> · build in progress
          </p>
          <p className="mt-1.5 text-[11px] text-stone-500 leading-relaxed">
            有建议或想聊？小红书 <span className="serif-hero italic text-ink">@Savagettom</span>
          </p>
        </div>
      </div>

      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-paper px-2 py-1.5 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = page === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                className={cn(
                  "flex min-w-[64px] flex-col items-center rounded-full px-3 py-2 transition",
                  active ? "bg-ink text-white" : "text-stone-500 hover:bg-stone-100"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="mt-1 text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}