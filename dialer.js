// 自动给所有名称包含“落地”、“家宽”、“oracle”的节点添加 dialer-proxy: "⚙️ 节点选择"
// 适用于 Sub-Store JS 处理（需支持自定义 JS 处理功能）

function main({ proxies }) {
  // 需要匹配的关键词，可自行添加
  const keywords = [/SG/i];
  // 需要排除的关键词
  const excludeKeywords = [/reality/i];
  const newProxies = [];
  for (const proxy of proxies) {
    // 将原始代理添加到新列表中（保持不变）
    newProxies.push(proxy);
    if (!proxy.name) continue;
    // 检查是否包含需要匹配的关键词
    const isMatched = keywords.some(reg => reg.test(proxy.name));
    // 检查是否包含需要排除的关键词
    const isExcluded = excludeKeywords.some(reg => reg.test(proxy.name));
    // 检查是否匹配关键词且不包含排除关键词
    if (isMatched && !isExcluded) {
      // 创建一个新的代理对象，复制原始代理的所有属性
      const newProxy = { ...proxy };
      // 为新代理添加 dialer-proxy 属性
      newProxy["dialer-proxy"] = "⚙️ 节点选择";
      newProxy["name"] = "链式代理 " + proxy.name;
      // 将新代理添加到列表中
      newProxies.push(newProxy);
    }
  }
  // 返回包含原始代理和新增代理的对象
  return { proxies: newProxies };
}
