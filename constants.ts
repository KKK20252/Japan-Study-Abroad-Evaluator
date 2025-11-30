import { FormConfig, CategoryId } from './types';

export const FORM_CONFIG: FormConfig = {
  undergrad: [
    {
      id: "edu",
      label: "您的最高学历状态？",
      options: [
        { label: "重点高中/一本线", value: 5, dimensions: [5, 0, 0, 0, 1] },
        { label: "普通高中/本科线", value: 3, dimensions: [3, 0, 0, 0, 0] },
        { label: "职高/中专/大专线", value: 2, dimensions: [2, 0, 0, 0, 0] }
      ]
    },
    {
      id: "jp",
      label: "目前的日语水平？",
      options: [
        { label: "N1/N2 高级水平", value: 5, dimensions: [0, 5, 0, 0, 1] },
        { label: "N3/N4 中级水平", value: 3, dimensions: [0, 3, 0, 0, 0] },
        { label: "N5/零基础", value: 1, dimensions: [0, 1, 0, 0, 0] }
      ]
    },
    {
      id: "en",
      label: "英语能力 (托福/雅思)？",
      options: [
        { label: "优秀 (托福80+/雅思6.0+)", value: 5, dimensions: [0, 1, 5, 0, 1] },
        { label: "一般 (有基础)", value: 3, dimensions: [0, 0, 3, 0, 0] },
        { label: "较弱/无成绩", value: 1, dimensions: [0, 0, 1, 0, 0] }
      ]
    },
    {
      id: "gpa",
      label: "EJU留考/在校成绩预估？",
      options: [
        { label: "非常有信心/学霸", value: 5, dimensions: [1, 0, 1, 0, 5] },
        { label: "成绩中等/一般", value: 3, dimensions: [0, 0, 0, 0, 3] },
        { label: "成绩较差/偏科", value: 1, dimensions: [0, 0, 0, 0, 1] }
      ]
    },
    {
      id: "money",
      label: "留学预算 (年)",
      options: [
        { label: "15万以上 (充裕)", value: 0, dimensions: [0, 0, 0, 6, 0] },
        { label: "10-15万 (正常)", value: 0, dimensions: [0, 0, 0, 4, 0] },
        { label: "10万以下 (需打工)", value: 0, dimensions: [0, 0, 0, 2, 0] }
      ]
    }
  ],
  grad: [
    {
      id: "school",
      label: "本科出身院校？",
      options: [
        { label: "985/211/双一流", value: 5, dimensions: [6, 0, 0, 0, 2] },
        { label: "普通一本", value: 4, dimensions: [4, 0, 0, 0, 1] },
        { label: "二本/三本", value: 3, dimensions: [3, 0, 0, 0, 0] },
        { label: "专科/自考", value: 1, dimensions: [2, 0, 0, 0, 0] }
      ]
    },
    {
      id: "jp",
      label: "日语等级证书？",
      options: [
        { label: "N1 (120分+)", value: 5, dimensions: [0, 6, 0, 0, 1] },
        { label: "N1及格/N2", value: 3, dimensions: [0, 4, 0, 0, 0] },
        { label: "N3以下/无", value: 1, dimensions: [0, 2, 0, 0, 0] }
      ]
    },
    {
      id: "en",
      label: "英语能力？",
      options: [
        { label: "托福85+ / 托业800+", value: 5, dimensions: [0, 0, 6, 0, 1] },
        { label: "有一定基础", value: 3, dimensions: [0, 0, 3, 0, 0] },
        { label: "无成绩", value: 1, dimensions: [0, 0, 1, 0, 0] }
      ]
    },
    {
      id: "research",
      label: "在校GPA及科研经历？",
      options: [
        { label: "GPA3.2+ / 有论文或课题", value: 5, dimensions: [0, 0, 2, 6, 2] },
        { label: "GPA3.0 / 无科研", value: 3, dimensions: [0, 0, 0, 4, 0] },
        { label: "GPA较低", value: 1, dimensions: [0, 0, 0, 2, 0] }
      ]
    }
  ],
  art: [
    {
      id: "major",
      label: "您的专业方向？",
      options: [
        { label: "纯艺术 (油画/雕塑)", value: 0, dimensions: [4, 0, 2, 0, 2] },
        { label: "设计 (平面/产品)", value: 0, dimensions: [4, 0, 4, 0, 2] },
        { label: "动漫/插画", value: 0, dimensions: [3, 0, 5, 0, 2] }
      ]
    },
    {
      id: "jp",
      label: "日语水平？",
      options: [
        { label: "N2以上", value: 5, dimensions: [0, 6, 0, 1, 0] },
        { label: "N3/N4", value: 3, dimensions: [0, 4, 0, 0, 0] },
        { label: "零基础", value: 1, dimensions: [0, 2, 0, 0, 0] }
      ]
    },
    {
      id: "portfolio",
      label: "作品集准备进度？",
      options: [
        { label: "作品集成熟/有风格", value: 5, dimensions: [2, 0, 2, 6, 5] },
        { label: "有基础/未成体系", value: 3, dimensions: [1, 0, 1, 4, 3] },
        { label: "零基础/跨专业", value: 1, dimensions: [0, 0, 0, 2, 1] }
      ]
    }
  ]
};

export const RADAR_LABELS: Record<CategoryId, string[]> = {
  undergrad: ['学历基础', '日语能力', '英语能力', '经济预算', '综合潜力'],
  grad: ['出身院校', '日语能力', '英语/科研', '研究计划', '综合潜能'],
  art: ['艺术功底', '日语能力', '作品风格', '备考状态', '发展潜力']
};
