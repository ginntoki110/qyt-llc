// 1. 处理 tab 切换
document.addEventListener("DOMContentLoaded", function () {
    const tabBtns = document.querySelectorAll(".card-tab-btn");
    const contents = document.querySelectorAll(".card-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-tab");

            // 切换按钮激活状态
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // 切换内容显示（同时可以在动画中处理滑动效果）
            contents.forEach(content => {
                if (content.getAttribute("data-tab") === target) {
                    content.classList.add("active");
                } else {
                    content.classList.remove("active");
                }
            });
        });
    });
});


// 会社沿革
document.addEventListener('DOMContentLoaded', function () {
    const timeline = document.getElementById('company-timeline');
    const items = timeline.querySelectorAll('.timeline-item');
    let splitIndex = -1;
    const now = new Date();
    // 找到第一个未来节点的索引（用年月判断）
    items.forEach((item, idx) => {
        const yearText = item.querySelector('.timeline-year')?.textContent;
        if (!yearText) return;
        // 解析“2025年6月”或“2025年06月”等格式
        const match = yearText.match(/(\d{4})年\s*(\d{1,2})月?/);
        if (!match) return;
        const year = parseInt(match[1], 10);
        const month = match[2] ? parseInt(match[2], 10) : 1;
        // JS月份从0开始
        const itemDate = new Date(year, month - 1, 1);
        // 只要节点时间大于当前年月，就是未来节点
        if (splitIndex === -1 && (itemDate > new Date(now.getFullYear(), now.getMonth(), 1))) {
            splitIndex = idx;
        }
        // 自动为未来节点添加 future class
        if (itemDate > new Date(now.getFullYear(), now.getMonth(), 1)) {
            item.classList.add('future');
        } else {
            item.classList.remove('future');
        }
    });
    // 先移除所有 split-line
    items.forEach(item => item.classList.remove('split-line'));
    // 给“最后一个过去节点”加 split-line
    if (splitIndex > 0) {
        const lastPastIdx = splitIndex - 1;
        items[lastPastIdx].classList.add('split-line');
        const splitNode = items[lastPastIdx];
        const top = splitNode.offsetTop + splitNode.offsetHeight / 2;
        timeline.style.setProperty('--history-line-height', `${top}px`);
        timeline.style.setProperty('--future-line-top', `${top}px`);
        timeline.style.setProperty('--future-line-height', `${timeline.offsetHeight - top}px`);
    }
});