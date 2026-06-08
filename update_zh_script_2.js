const fs = require('fs');
let zh = fs.readFileSync('src/messages/zh.js', 'utf8');

const replacements = [
  {
    old: `  "hours": {
    "title": "开放时间",
    "outdoor": "老桥全域",
    "outdoorTime": "全天免费开放，无内部收费展馆，无分季节限制",
    "lighthouse": "周边景点",
    "summer": "海德堡城堡",
    "summerTime": "通常为 09:00-18:00（具体以城堡官方公告为准）",
    "winter": "德国药房博物馆",
    "winterTime": "通常为 10:00-17:30",
    "warning": "老桥铜像与桥头堡",
    "warningTime": "全天开放供游客观赏",
    "tip": "清晨和傍晚是老桥最宁静的时刻，适合散步和拍照"
  },`,
    new: `  "hours": {
    "title": "开放时间",
    /*
    "outdoor": "老桥全域",
    "outdoorTime": "全天免费开放，无内部收费展馆，无分季节限制",
    "lighthouse": "周边景点",
    "summer": "海德堡城堡",
    "summerTime": "通常为 09:00-18:00（具体以城堡官方公告为准）",
    "winter": "德国药房博物馆",
    "winterTime": "通常为 10:00-17:30",
    "warning": "老桥铜像与桥头堡",
    "warningTime": "全天开放供游客观赏",
    "tip": "清晨和傍晚是老桥最宁静的时刻，适合散步和拍照"
    */
    "outdoor": "埃斯林根堡全域",
    "outdoorTime": "全天免费开放，无内部收费展馆，无分季节限制",
    "lighthouse": "周边景点",
    "summer": "胖塔（Dicker Turm）",
    "summerTime": "通常在特定活动或导览期间开放内部",
    "winter": "城墙长廊（Seilergang）",
    "winterTime": "全天开放供游客漫步",
    "warning": "城堡庭院与观景台",
    "warningTime": "全天开放供游客观赏",
    "tip": "清晨和傍晚是城堡最宁静的时刻，适合俯瞰老城并拍照"
  },`
  },
  {
    old: `  "tickets": {
    "title": "门票价格",
    "outdoor": "海德堡老桥 (Alte Brücke)",
    "outdoorPrice": "全天免费开放",
    "lighthouse": "周边付费景点",
    "adults": "海德堡城堡",
    "adultsPrice": "需购买门票进入",
    "students": "周边博物馆",
    "studentsPrice": "根据各场馆规定收费",
    "children": "停车费",
    "childrenPrice": "老城区周边设有付费停车场（如 P12 或 P13），步行 5-10 分钟即可到达老桥",
    "card": "交通建议",
    "cardPrice": "位于老城区，步行即可轻松抵达周边餐饮与主街 (Hauptstraße) 购物区"
  },`,
    new: `  "tickets": {
    "title": "门票价格",
    /*
    "outdoor": "海德堡老桥 (Alte Brücke)",
    "outdoorPrice": "全天免费开放",
    "lighthouse": "周边付费景点",
    "adults": "海德堡城堡",
    "adultsPrice": "需购买门票进入",
    "students": "周边博物馆",
    "studentsPrice": "根据各场馆规定收费",
    "children": "停车费",
    "childrenPrice": "老城区周边设有付费停车场（如 P12 或 P13），步行 5-10 分钟即可到达老桥",
    "card": "交通建议",
    "cardPrice": "位于老城区，步行即可轻松抵达周边餐饮与主街 (Hauptstraße) 购物区"
    */
    "outdoor": "埃斯林根堡 (Esslinger Burg)",
    "outdoorPrice": "全域全天免费开放",
    "lighthouse": "周边付费景点",
    "adults": "圣迪奥尼修斯教堂等",
    "adultsPrice": "根据各场馆规定收费",
    "students": "导览服务",
    "studentsPrice": "参加官方组织的城市或城堡导览需额外付费",
    "children": "停车费",
    "childrenPrice": "城堡设有专属收费停车场；老城区内也有多个停车库",
    "card": "交通建议",
    "cardPrice": "建议将车停在老城区或城堡停车场，步行游览体验最佳"
  },`
  },
  {
    old: `  "route": {
    "title": "游览路线",
    "overview": "海德堡老城休闲步行路线",
    "steps": [
      "抵达海德堡老桥，欣赏桥头堡与著名的老桥铜像 (Brückenaffe)",
      "漫步于内卡河畔，感受历史名城的浪漫气息",
      "穿过老桥堡门进入海德堡老城区，探索主街 (Hauptstraße) 的咖啡馆和精品店",
      "步行前往集市广场 (Marktplatz)，参观圣灵大教堂 (Heiliggeistkirche)",
      "搭乘齿轨缆车或步行上山，游览雄伟的海德堡城堡 (Schloss Heidelberg)",
      "在老城区品尝德国传统的猪肘、香肠及当地特色啤酒"
    ],
    "supplements": [
      "老桥为公共通道，全天免费开放，无需预约",
      "老城区停车位紧张，建议将车停在指定的公共停车库 (Parkhaus)",
      "海德堡城堡位于高处，步行前往需经过一段较陡的石板路，建议穿着舒适的鞋子"
    ],
    "supplementsTitle": "游览须知"
  },`,
    new: `  "route": {
    "title": "游览路线",
    /*
    "overview": "海德堡老城休闲步行路线",
    "steps": [
      "抵达海德堡老桥，欣赏桥头堡与著名的老桥铜像 (Brückenaffe)",
      "漫步于内卡河畔，感受历史名城的浪漫气息",
      "穿过老桥堡门进入海德堡老城区，探索主街 (Hauptstraße) 的咖啡馆和精品店",
      "步行前往集市广场 (Marktplatz)，参观圣灵大教堂 (Heiliggeistkirche)",
      "搭乘齿轨缆车或步行上山，游览雄伟的海德堡城堡 (Schloss Heidelberg)",
      "在老城区品尝德国传统的猪肘、香肠及当地特色啤酒"
    ],
    "supplements": [
      "老桥为公共通道，全天免费开放，无需预约",
      "老城区停车位紧张，建议将车停在指定的公共停车库 (Parkhaus)",
      "海德堡城堡位于高处，步行前往需经过一段较陡的石板路，建议穿着舒适的鞋子"
    ],
    */
    "overview": "埃斯林根老城与城堡步行路线",
    "steps": [
      "从埃斯林根老城集市广场出发，欣赏半木结构建筑群",
      "找到城堡台阶（Burgstaffel）的入口，开始攀登",
      "沿着带顶棚的石阶一路向上，中途在观景平台稍作休息",
      "抵达埃斯林根堡，参观胖塔（Dicker Turm）外观与高耸的城墙",
      "漫步于城墙长廊（Seilergang），俯瞰内卡河谷与葡萄园美景",
      "下山回到老城区，在传统德国餐厅品尝施瓦本特色美食"
    ],
    "supplements": [
      "城堡区域全天免费开放，无需预约",
      "城堡台阶较陡，请务必穿着舒适的步行鞋",
      "也可以选择开车直接前往城堡的专属停车场"
    ],
    "supplementsTitle": "游览须知"
  },`
  },
  {
    old: `  "photoSpots": {
    "title": "拍照机位",
    "spots": [
      {
        "name": "老桥铜像",
        "desc": "拍摄标志性铜像及背景的老城建筑"
      },
      {
        "name": "内卡河畔风光",
        "desc": "以内卡河和两岸的红顶建筑为背景，拍摄经典的欧洲风情"
      },
      {
        "name": "老桥桥门堡",
        "desc": "拍摄标志性的白色双塔桥门，展现海德堡的历史底蕴"
      },
      {
        "name": "远眺海德堡城堡",
        "desc": "从桥上仰望雄伟的海德堡城堡"
      }
    ],
    "tips": "拍照补充说明",
    "tipsContent": "清晨的阳光洒在内卡河与红砂岩石桥上，是拍摄老桥的最佳时机。"
  },`,
    new: `  "photoSpots": {
    "title": "拍照机位",
    /*
    "spots": [
      {
        "name": "老桥铜像",
        "desc": "拍摄标志性铜像及背景的老城建筑"
      },
      {
        "name": "内卡河畔风光",
        "desc": "以内卡河和两岸的红顶建筑为背景，拍摄经典的欧洲风情"
      },
      {
        "name": "老桥桥门堡",
        "desc": "拍摄标志性的白色双塔桥门，展现海德堡的历史底蕴"
      },
      {
        "name": "远眺海德堡城堡",
        "desc": "从桥上仰望雄伟的海德堡城堡"
      }
    ],
    "tips": "拍照补充说明",
    "tipsContent": "清晨的阳光洒在内卡河与红砂岩石桥上，是拍摄老桥的最佳时机。"
    */
    "spots": [
      {
        "name": "城墙长廊（Seilergang）",
        "desc": "透过射击孔拍摄下方连绵的葡萄园和老城全景"
      },
      {
        "name": "胖塔（Dicker Turm）",
        "desc": "拍摄这座标志性圆塔及其厚重的石墙"
      },
      {
        "name": "带顶棚的台阶（Burgstaffel）",
        "desc": "拍摄蜿蜒向上的木制顶棚长阶，极具历史感"
      },
      {
        "name": "观景台俯瞰",
        "desc": "从高处拍摄埃斯林根老城密集的半木结构红顶房屋"
      }
    ],
    "tips": "拍照补充说明",
    "tipsContent": "傍晚时分的夕阳照在老城的红屋顶上，是拍摄全景的最佳时刻。"
  },`
  },
  {
    old: `  "hotels": {
    "title": "住宿建议",
    "hotels": [
      {
        "name": "海德堡老城精品酒店",
        "desc": "距离老桥和城堡缆车站仅一步之遥，出行极度便利",
        "price": "适合喜欢历史氛围和老城风情的游客"
      },
      {
        "name": "内卡河畔舒适公寓",
        "desc": "配备厨房设施，周边餐饮和超市配套完善",
        "price": "适合家庭或长途旅行者"
      },
      {
        "name": "周边小镇度假酒店（如内卡格明德附近）",
        "desc": "距离海德堡约半小时车程，可享受内卡河谷的宁静自然风光",
        "price": "适合自驾且追求度假体验的游客"
      }
    ],
    "supplements": "住宿补充说明",
    "supplementsContent": "海德堡周边有众多极高评价的本地风味餐馆，可以品尝传统德国美食。",
    "supplementsTitle": "本地美食"
  },`,
    new: `  "hotels": {
    "title": "住宿建议",
    /*
    "hotels": [
      {
        "name": "海德堡老城精品酒店",
        "desc": "距离老桥和城堡缆车站仅一步之遥，出行极度便利",
        "price": "适合喜欢历史氛围和老城风情的游客"
      },
      {
        "name": "内卡河畔舒适公寓",
        "desc": "配备厨房设施，周边餐饮和超市配套完善",
        "price": "适合家庭或长途旅行者"
      },
      {
        "name": "周边小镇度假酒店（如内卡格明德附近）",
        "desc": "距离海德堡约半小时车程，可享受内卡河谷的宁静自然风光",
        "price": "适合自驾且追求度假体验的游客"
      }
    ],
    "supplements": "住宿补充说明",
    "supplementsContent": "海德堡周边有众多极高评价的本地风味餐馆，可以品尝传统德国美食。",
    */
    "hotels": [
      {
        "name": "埃斯林根老城历史酒店",
        "desc": "置身于半木结构建筑中，步行即可前往集市广场和城堡台阶",
        "price": "适合喜欢历史氛围和老城风情的游客"
      },
      {
        "name": "内卡河畔现代公寓",
        "desc": "配备完善设施，交通便利，紧邻火车站",
        "price": "适合家庭或长途旅行者"
      },
      {
        "name": "周边葡萄园度假酒店",
        "desc": "距离市中心稍远，可享受宁静自然风光和品酒体验",
        "price": "适合自驾且追求度假体验的游客"
      }
    ],
    "supplements": "住宿补充说明",
    "supplementsContent": "埃斯林根老城有众多极高评价的施瓦本风味餐馆，可以品尝传统的德国面饺（Maultaschen）等美食。",
    "supplementsTitle": "本地美食"
  },`
  },
  {
    old: `"subtitle": "海德堡老桥的迷人风光",`,
    new: `/* "subtitle": "海德堡老桥的迷人风光", */
    "subtitle": "埃斯林根堡的迷人风光",`
  },
  {
    old: `  "officialManagement": {
    "title": "关于 Old Bridge Heidelberg",
    "text": "Alte Brücke Heidelberg 是海德堡市中心的一座重要历史遗迹，由海德堡市文物保护局（Denkmalschutz Heidelberg）管理与维护。"
  }`,
    new: `  "officialManagement": {
    /* "title": "关于 Old Bridge Heidelberg", */
    "title": "关于 Esslinger Burg",
    /* "text": "Alte Brücke Heidelberg 是海德堡市中心的一座重要历史遗迹，由海德堡市文物保护局（Denkmalschutz Heidelberg）管理与维护。" */
    "text": "Esslinger Burg 是埃斯林根市的重要历史防御工事，由相关文物保护部门管理与维护。"
  }`
  }
];

replacements.forEach(r => {
  if (zh.includes(r.old)) {
    zh = zh.replace(r.old, r.new);
  } else {
    console.log("NOT FOUND:", r.old.substring(0, 50));
  }
});

fs.writeFileSync('src/messages/zh.js', zh, 'utf8');
console.log("Done part 2");
