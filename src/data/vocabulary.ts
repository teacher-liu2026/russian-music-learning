// 俄语音乐术语词汇库
// 数据来源：音乐俄语课程 / 词汇库 / 乐器总词汇表.md

export interface VocabularyItem {
  id: string;
  russian: string;
  ipa: string;
  chinese: string;
  category: string;
  subcategory: string;
  notes?: string;
  frequency?: number; // 星级：1-5，频率最高的标记
}

export interface Category {
  id: string;
  name: string;
  nameCn: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: "keyboard", name: "Клавиатурные", nameCn: "键盘乐器", icon: "🎹", color: "#6366f1" },
  { id: "strings-bow", name: "Струнные смычковые", nameCn: "弓弦乐器", icon: "🎻", color: "#8b5cf6" },
  { id: "strings-pluck", name: "Струнные щипковые", nameCn: "拨弦乐器", icon: "🪕", color: "#a855f7" },
  { id: "woodwind", name: "Деревянные духовые", nameCn: "木管乐器", icon: "🎵", color: "#10b981" },
  { id: "brass", name: "Медные духовые", nameCn: "铜管乐器", icon: "🎺", color: "#f59e0b" },
  { id: "percussion", name: "Ударные", nameCn: "打击乐器", icon: "🥁", color: "#ef4444" },
  { id: "folk", name: "Народные", nameCn: "俄罗斯民族乐器", icon: "🪈", color: "#ec4899" },
  { id: "vocal", name: "Вокальные", nameCn: "声乐声部", icon: "🎤", color: "#14b8a6" },
  { id: "terms", name: "Термины", nameCn: "乐理与记谱术语", icon: "📖", color: "#64748b" },
];

export const vocabulary: VocabularyItem[] = [
  // 键盘乐器
  { id: "k1", russian: "Фортепиано", ipa: "/fərtʲɪpʲɪˈano/", chinese: "钢琴", category: "keyboard", subcategory: "键盘乐器", notes: "⭐最高频", frequency: 5 },
  { id: "k2", russian: "Пианино", ipa: "/pʲɪɐˈnʲinə/", chinese: "立式钢琴", category: "keyboard", subcategory: "键盘乐器", notes: "小型钢琴" },
  { id: "k3", russian: "Рояль", ipa: "/rɐˈjalʲ/", chinese: "三角钢琴", category: "keyboard", subcategory: "键盘乐器", notes: "音乐会大钢琴" },
  { id: "k4", russian: "Орган", ipa: "/ɐrˈɡan/", chinese: "管风琴", category: "keyboard", subcategory: "键盘乐器" },
  { id: "k5", russian: "Клавесин", ipa: "/kləvʲɪˈsʲin/", chinese: "羽管键琴", category: "keyboard", subcategory: "键盘乐器", notes: "巴洛克时期" },
  { id: "k6", russian: "Цифровое пианино", ipa: "/tsɨfˈrovəjə pʲɪɐˈnʲinə/", chinese: "电钢琴", category: "keyboard", subcategory: "键盘乐器" },
  { id: "k7", russian: "Челеста", ipa: "/tɕɪlʲɪˈsta/", chinese: "钢片琴", category: "keyboard", subcategory: "键盘乐器", notes: "键盘打击乐器" },

  // 弓弦乐器
  { id: "s1", russian: "Скрипка", ipa: "/skrʲípkə/", chinese: "小提琴", category: "strings-bow", subcategory: "弓弦乐器", notes: "⭐重音在и", frequency: 5 },
  { id: "s2", russian: "Альт", ipa: "/alt/", chinese: "中提琴", category: "strings-bow", subcategory: "弓弦乐器", frequency: 4 },
  { id: "s3", russian: "Виолончель", ipa: "/vʲɪələnˈtɕelʲ/", chinese: "大提琴", category: "strings-bow", subcategory: "弓弦乐器", frequency: 5 },
  { id: "s4", russian: "Контрабас", ipa: "/kəntrəˈbas/", chinese: "低音提琴", category: "strings-bow", subcategory: "弓弦乐器" },

  // 拨弦乐器
  { id: "sp1", russian: "Арфа", ipa: "/arfa/", chinese: "竖琴", category: "strings-pluck", subcategory: "拨弦乐器" },
  { id: "sp2", russian: "Гитара", ipa: "/ɡʲɪˈtarə/", chinese: "吉他", category: "strings-pluck", subcategory: "拨弦乐器" },
  { id: "sp3", russian: "Домра", ipa: "/domrə/", chinese: "琵琶/冬不拉", category: "strings-pluck", subcategory: "拨弦乐器", notes: "俄罗斯民族乐器" },
  { id: "sp4", russian: "Балалайка", ipa: "/bələˈlajkə/", chinese: "三角琴", category: "strings-pluck", subcategory: "拨弦乐器", notes: "俄罗斯民族乐器", frequency: 4 },
  { id: "sp5", russian: "Гусли", ipa: "/ˈɡuslʲɪ/", chinese: "古斯里琴", category: "strings-pluck", subcategory: "拨弦乐器", notes: "俄罗斯古弦乐" },
  { id: "sp6", russian: "Мандолина", ipa: "/mɐndɐˈlʲina/", chinese: "曼陀林", category: "strings-pluck", subcategory: "拨弦乐器" },

  // 木管乐器
  { id: "w1", russian: "Флейта", ipa: "/flʲejta/", chinese: "长笛", category: "woodwind", subcategory: "木管乐器", frequency: 4 },
  { id: "w2", russian: "Пикколо", ipa: "/pʲikˈkolo/", chinese: "短笛", category: "woodwind", subcategory: "木管乐器" },
  { id: "w3", russian: "Гобой", ipa: "/ɡɐˈboj/", chinese: "双簧管", category: "woodwind", subcategory: "木管乐器", frequency: 4 },
  { id: "w4", russian: "Английский рожок", ipa: "/ɐnˈɡlʲijskɪj rɐˈʒok/", chinese: "英国管", category: "woodwind", subcategory: "木管乐器" },
  { id: "w5", russian: "Кларнет", ipa: "/klərnʲˈet/", chinese: "单簧管/黑管", category: "woodwind", subcategory: "木管乐器", frequency: 4 },
  { id: "w6", russian: "Фагот", ipa: "/fɐˈɡot/", chinese: "大管/巴松", category: "woodwind", subcategory: "木管乐器" },
  { id: "w7", russian: "Саксофон", ipa: "/səksɐˈfon/", chinese: "萨克斯管", category: "woodwind", subcategory: "木管乐器" },

  // 铜管乐器
  { id: "b1", russian: "Валторна", ipa: "/vɐlˈtornə/", chinese: "圆号", category: "brass", subcategory: "铜管乐器", notes: "⭐交响乐团必备", frequency: 5 },
  { id: "b2", russian: "Труба", ipa: "/truˈba/", chinese: "小号", category: "brass", subcategory: "铜管乐器", frequency: 4 },
  { id: "b3", russian: "Тромбон", ipa: "/trɐmˈbon/", chinese: "长号", category: "brass", subcategory: "铜管乐器" },
  { id: "b4", russian: "Туба", ipa: "/tuˈba/", chinese: "大号", category: "brass", subcategory: "铜管乐器" },

  // 打击乐器
  { id: "p1", russian: "Литавры", ipa: "/lʲɪˈtavrɨ/", chinese: "定音鼓", category: "percussion", subcategory: "打击乐器", notes: "⭐交响乐团必备", frequency: 5 },
  { id: "p2", russian: "Малый барабан", ipa: "/məˈlɨj bərəˈban/", chinese: "小军鼓", category: "percussion", subcategory: "打击乐器" },
  { id: "p3", russian: "Большой барабан", ipa: "/bɐlʲˈʂoj bərəˈban/", chinese: "大鼓", category: "percussion", subcategory: "打击乐器" },
  { id: "p4", russian: "Тарелки", ipa: "/təˈrʲelki/", chinese: "钹", category: "percussion", subcategory: "打击乐器", notes: "复数形式" },
  { id: "p5", russian: "Треугольник", ipa: "/trʲɪʊˈɡolʲnʲɪk/", chinese: "三角铁", category: "percussion", subcategory: "打击乐器" },
  { id: "p6", russian: "Ксилофон", ipa: "/ksɪlɐˈfon/", chinese: "木琴", category: "percussion", subcategory: "打击乐器" },
  { id: "p7", russian: "Вибрафон", ipa: "/vɪˈbrafon/", chinese: "颤音琴", category: "percussion", subcategory: "打击乐器" },

  // 俄罗斯民族乐器
  { id: "f1", russian: "Баян", ipa: "/bɐˈjan/", chinese: "巴扬（键钮手风琴）", category: "folk", subcategory: "俄罗斯民族乐器", notes: "⭐俄罗斯民族乐器之王", frequency: 5 },
  { id: "f2", russian: "Аккордеон", ipa: "/ɐkɐrˈdʲeɐn/", chinese: "键盘式手风琴", category: "folk", subcategory: "俄罗斯民族乐器" },
  { id: "f3", russian: "Гармонь", ipa: "/ɡɐrˈmonʲ/", chinese: "俄式手风琴", category: "folk", subcategory: "俄罗斯民族乐器", notes: "俗称" },

  // 声乐声部
  { id: "v1", russian: "Сопрано", ipa: "/sɐˈpranə/", chinese: "女高音", category: "vocal", subcategory: "声乐声部", frequency: 5 },
  { id: "v2", russian: "Колоратурное сопрано", ipa: "/kɐlɐrɐˈturnəjə sɐˈpranə/", chinese: "花腔女高音", category: "vocal", subcategory: "声乐声部" },
  { id: "v3", russian: "Меццо-сопрано", ipa: "/ˈmʲetstso sɐˈpranə/", chinese: "女中音", category: "vocal", subcategory: "声乐声部" },
  { id: "v4", russian: "Альт", ipa: "/alt/", chinese: "女低音", category: "vocal", subcategory: "声乐声部" },
  { id: "v5", russian: "Тенор", ipa: "/tʲɪˈnor/", chinese: "男高音", category: "vocal", subcategory: "声乐声部", frequency: 5 },
  { id: "v6", russian: "Баритон", ipa: "/bərʲɪˈton/", chinese: "男中音", category: "vocal", subcategory: "声乐声部" },
  { id: "v7", russian: "Бас", ipa: "/bas/", chinese: "男低音", category: "vocal", subcategory: "声乐声部" },

  // 乐理与记谱术语
  { id: "t1", russian: "Вокал", ipa: "/vɐˈkal/", chinese: "声乐", category: "terms", subcategory: "声乐专业" },
  { id: "t2", russian: "Ария", ipa: "/ɐˈrʲijə/", chinese: "咏叹调", category: "terms", subcategory: "声乐专业", frequency: 4 },
  { id: "t3", russian: "Речитатив", ipa: "/rʲɪtɕɪtɐˈvʲif/", chinese: "宣叙调", category: "terms", subcategory: "声乐专业" },
  { id: "t4", russian: "Хор", ipa: "/xor/", chinese: "合唱", category: "terms", subcategory: "声乐专业", frequency: 4 },
  { id: "t5", russian: "Соло", ipa: "/sɐˈlo/", chinese: "独唱/独奏", category: "terms", subcategory: "通用" },
  { id: "t6", russian: "Нота", ipa: "/ˈnotə/", chinese: "音符", category: "terms", subcategory: "乐谱记谱", frequency: 4 },
  { id: "t7", russian: "Партитура", ipa: "/pɐrˈtʲiturə/", chinese: "总谱", category: "terms", subcategory: "乐谱记谱", frequency: 4 },
  { id: "t8", russian: "Такт", ipa: "/takt/", chinese: "小节", category: "terms", subcategory: "乐谱记谱", frequency: 3 },
  { id: "t9", russian: "Ключ", ipa: "/klʲutɕ/", chinese: "谱号", category: "terms", subcategory: "乐谱记谱" },
  { id: "t10", russian: "Диез", ipa: "/dʲɪˈjes/", chinese: "升号", category: "terms", subcategory: "乐谱记谱", frequency: 3 },
  { id: "t11", russian: "Бемоль", ipa: "/bʲɪˈmolʲ/", chinese: "降号", category: "terms", subcategory: "乐谱记谱", frequency: 3 },
];

export function getVocabularyByCategory(categoryId: string): VocabularyItem[] {
  return vocabulary.filter(v => v.category === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getHighFrequency(): VocabularyItem[] {
  return vocabulary.filter(v => v.frequency && v.frequency >= 4);
}
