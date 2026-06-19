// assets/content-map.js

const contentMap = {
  siteUrl: "https://page-cn-leyu.com.cn",
  siteName: "乐鱼体育",
  createdAt: "2025-01-10",
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["乐鱼体育", "首页推荐", "热门赛事"],
      keywords: ["体育赛事", "直播", "比分"]
    },
    {
      id: "live",
      title: "直播中心",
      tags: ["乐鱼体育", "直播", "体育赛事"],
      keywords: ["NBA", "英超", "欧冠", "F1"]
    },
    {
      id: "esports",
      title: "电竞频道",
      tags: ["乐鱼体育", "电竞", "游戏"],
      keywords: ["英雄联盟", "Dota2", "CS:GO", "王者荣耀"]
    },
    {
      id: "news",
      title: "体育资讯",
      tags: ["乐鱼体育", "新闻", "赛事速递"],
      keywords: ["转会", "战报", "赛程", "排名"]
    },
    {
      id: "casino",
      title: "娱乐城",
      tags: ["乐鱼体育", "赌场", "老虎机"],
      keywords: ["21点", "百家乐", "轮盘", "扑克"]
    }
  ],
  globalTags: ["乐鱼体育", "体育", "娱乐", "博彩"]
};

function searchContent(query, data = contentMap) {
  if (!query || typeof query !== "string") {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  data.sections.forEach((section) => {
    const matchTitle =
      section.title &&
      section.title.toLowerCase().includes(lowerQuery);

    const matchTag = section.tags.some((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );

    const matchKeyword = section.keywords.some((keyword) =>
      keyword.toLowerCase().includes(lowerQuery)
    );

    if (matchTitle || matchTag || matchKeyword) {
      results.push({
        sectionId: section.id,
        title: section.title,
        tags: section.tags,
        keywords: section.keywords,
        matchType: matchTitle ? "title" : matchTag ? "tag" : "keyword"
      });
    }
  });

  return results;
}

function filterByTag(tag, data = contentMap) {
  if (!tag || typeof tag !== "string") {
    return [];
  }

  const lowerTag = tag.toLowerCase().trim();
  return data.sections.filter((section) =>
    section.tags.some((t) => t.toLowerCase() === lowerTag)
  );
}

function getTagCloud(data = contentMap) {
  const tagCount = {};

  data.sections.forEach((section) => {
    section.tags.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  data.globalTags.forEach((tag) => {
    tagCount[tag] = (tagCount[tag] || 0) + 1;
  });

  return tagCount;
}

function generateSectionMap(data = contentMap) {
  const sectionMap = {};
  data.sections.forEach((section) => {
    sectionMap[section.id] = {
      title: section.title,
      tags: [...section.tags],
      keywords: [...section.keywords]
    };
  });
  return sectionMap;
}

function getSiteIdentifier() {
  return {
    url: contentMap.siteUrl,
    name: contentMap.siteName,
    identifier: contentMap.siteUrl.replace(/https?:\/\//, "").replace(/\./g, "-")
  };
}

export {
  contentMap,
  searchContent,
  filterByTag,
  getTagCloud,
  generateSectionMap,
  getSiteIdentifier
};