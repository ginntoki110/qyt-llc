
// 組織図のズーム制御
const orgChart = document.getElementById('orgChart');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const resetZoomBtn = document.getElementById('resetZoomBtn');
let currentScale = 0.5;

zoomInBtn.addEventListener('click', () => {
    if (currentScale < 1.5) {
        currentScale += 0.1;
        orgChart.style.transform = `scale(${currentScale})`;
    }
});

zoomOutBtn.addEventListener('click', () => {
    if (currentScale > 0.1) {
        currentScale -= 0.1;
        orgChart.style.transform = `scale(${currentScale})`;
    }
});

resetZoomBtn.addEventListener('click', () => {
    currentScale = 0.5;
    orgChart.style.transform = 'scale(0.5)';
});

// 部署検索機能
const searchInput = document.getElementById('deptSearch');
const searchBtn = document.getElementById('searchBtn');
const nodes = document.querySelectorAll('.node');

let matchedNodes = [];
let currentMatchIndex = 0;

//部署検索
function searchDepartment() {
    const term = searchInput.value.trim().toLowerCase();
    if (!term) return;

    // 清空上次的结果
    matchedNodes.forEach(n => n.style.boxShadow = '');
    matchedNodes = [];

    nodes.forEach(node => {
        const title = node.querySelector('.node-title').textContent.toLowerCase();
        const desc = node.querySelector('.node-desc')?.textContent.toLowerCase() || '';
        if (title.includes(term) || desc.includes(term)) {
            matchedNodes.push(node);
        }
    });

    if (matchedNodes.length === 0) {
        alert(`"${searchInput.value}" に一致する部署は見つかりませんでした`);
        return;
    }

    currentMatchIndex = 0;
    highlightAndCenter(matchedNodes[0]);
}

//显示结果动画
function highlightAndCenter(node) {
    // 高亮
    node.style.boxShadow = '0 0 0 3px #ff9800';
    node.style.zIndex = '100';

    // 居中滚动
    node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });

    // 呼吸动画
    node.animate([
        { transform: 'scale(1.1)', backgroundColor: '#fff9c4' },
        { transform: 'scale(1)', backgroundColor: '' }
    ], {
        duration: 1000,
        iterations: 3
    });

    // 5 秒后去掉高亮
    setTimeout(() => {
        node.style.boxShadow = '';
        node.style.zIndex = '';
    }, 5000);
}


// function searchDepartment() {
//     const searchTerm = searchInput.value.trim().toLowerCase();

//     if (!searchTerm) return;

//     let found = false;

//     nodes.forEach(node => {
//         const title = node.querySelector('.node-title').textContent.toLowerCase();
//         const desc = node.querySelector('.node-desc')?.textContent.toLowerCase() || '';

//         if (title.includes(searchTerm) || desc.includes(searchTerm)) {
//             found = true;
//             // ハイライト表示 
//             node.style.boxShadow = '0 0 0 3px #ff9800';
//             node.style.zIndex = '100';

//             // スクロールして表示　 方法A
//             // //BUG：问题在于，getBoundingClientRect() 返回的是元素相对于 视口（viewport）的坐标，而 scrollLeft 却期望的是相对于 滚动容器内容 的像素偏移。二者的坐标系并不一致，所以计算出的值不准确，就无法把目标节点真正滚动到容器中间。
//             // const container = document.querySelector('.org-chart-container');
//             // const rect = node.getBoundingClientRect();
//             // const containerRect = container.getBoundingClientRect();
//             // container.scrollLeft = rect.left - containerRect.left - (container.clientWidth / 2) + (rect.width / 2);

//             // スクロールして表示 方法B
//             // centerNode(node);

//             // スクロールして表示 方法C
//             node.scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'nearest',   // 垂直方向保持当前视图
//                 inline: 'center'    // 水平方向居中
//             });

//             // アニメーション
//             node.animate([
//                 { transform: 'scale(1.1)', backgroundColor: '#fff9c4' },
//                 { transform: 'scale(1)', backgroundColor: '' }
//             ], {
//                 duration: 1000,
//                 iterations: 3
//             });

//             // 5秒後にハイライトを解除
//             setTimeout(() => {
//                 node.style.boxShadow = '';
//             }, 5000);
//         }
//     });

//     if (!found) {
//         alert(`"${searchInput.value}" に一致する部署は見つかりませんでした`);
//     }
// }

// function centerNode(node) {
//     const container = document.querySelector('.org-chart-container');
//     // 节点在内容区的左侧偏移（未缩放前）
//     const rawLeft = node.offsetLeft;
//     const rawCenter = rawLeft + node.offsetWidth / 2;
//     // 考虑 scale 缩放后的像素
//     const scaledCenter = rawCenter * currentScale;

//     // 目标 scrollLeft：使节点中心落到容器中点
//     const targetScrollLeft = scaledCenter - container.clientWidth / 2;

//     container.scrollTo({
//         left: targetScrollLeft,
//         behavior: 'smooth'
//     });
// }

//检索事件监听
searchBtn.addEventListener('click', searchDepartment);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchDepartment();
    }
});

//下一个结果，上一个结果
const prevBtn = document.getElementById('prevMatch');
const nextBtn = document.getElementById('nextMatch');

prevBtn.addEventListener('click', () => cycleMatch(-1));
nextBtn.addEventListener('click', () => cycleMatch(1));

function cycleMatch(direction) {
    if (matchedNodes.length === 0) return;
    // 清除上一个的高亮
    matchedNodes[currentMatchIndex].style.boxShadow = '';
    matchedNodes[currentMatchIndex].style.zIndex = '';

    // 计算下一个索引（循环）
    currentMatchIndex = (currentMatchIndex + direction + matchedNodes.length) % matchedNodes.length;
    highlightAndCenter(matchedNodes[currentMatchIndex]);
}


// モーダル制御
const modal = document.getElementById('departmentModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalDeptName = document.getElementById('modalDeptName');
const modalIcon = document.getElementById('modalIcon');
const modalDescription = document.getElementById('modalDescription');
const modalStaff = document.getElementById('modalStaff');
const modalProjects = document.getElementById('modalProjects');
const modalYears = document.getElementById('modalYears');
const modalSatisfaction = document.getElementById('modalSatisfaction');

// 部署情報のデータ
const departmentData = {
    "代表取締役社長": {
        // icon: "fa-crown",
        icon: "fa-user-tie",
        description: "会社全体の経営戦略と方向性を決定する最高責任者",
        staff: 1,
        projects: 0,
        years: 15,
        satisfaction: "98%"
    },
    "管理部": {
        icon: "fa-users-gear",
        description: "人事・総務、経理・財務を担当する部署。社内業務の効率化とリソース管理を担当しています。",
        staff: 12,
        projects: 8,
        years: 5,
        satisfaction: "92%"
    },
    "営業部": {
        icon: "fa-handshake",
        description: "法人営業とマーケティングを担当。新規顧客開拓から既存顧客管理まで、営業戦略全般を統括しています。",
        staff: 18,
        projects: 32,
        years: 4,
        satisfaction: "89%"
    },
    "開発本部": {
        icon: "fa-laptop-code",
        description: "システム開発と品質保証を統括する部門。技術革新と製品開発の中心的な役割を担っています。",
        staff: 45,
        projects: 15,
        years: 6,
        satisfaction: "91%"
    },
    "技術推進室": {
        icon: "fa-flask",
        description: "研究開発(R&D)と技術教育を担当。新技術の研究開発と社内技術力向上を推進しています。",
        staff: 8,
        projects: 6,
        years: 7,
        satisfaction: "95%"
    },
    "システム開発部": {
        icon: "fa-code",
        description: "Web、モバイル、クラウドアプリケーションの開発を担当する部門。",
        staff: 25,
        projects: 12,
        years: 4,
        satisfaction: "88%"
    },
    "品質保証部": {
        icon: "fa-vial",
        description: "ソフトウェア品質保証とテストを担当する部門。",
        staff: 10,
        projects: 15,
        years: 3,
        satisfaction: "90%"
    },
    "DX推進部": {
        icon: "fa-rocket",
        description: "デジタルトランスフォーメーションを推進する部門。",
        staff: 7,
        projects: 5,
        years: 5,
        satisfaction: "94%"
    },
    "Webアプリ開発課": {
        icon: "fa-globe",
        description: "Webアプリケーションの開発を担当するチーム。",
        staff: 8,
        projects: 6,
        years: 4,
        satisfaction: "87%"
    },
    "モバイル開発課": {
        icon: "fa-mobile-screen",
        description: "iOS/Androidアプリの開発を担当するチーム。",
        staff: 7,
        projects: 5,
        years: 3,
        satisfaction: "85%"
    },
    "インフラ・クラウド課": {
        icon: "fa-cloud",
        description: "インフラストラクチャとクラウドサービスの構築・運用を担当。",
        staff: 10,
        projects: 8,
        years: 5,
        satisfaction: "90%"
    },
    "テスト・QA課": {
        icon: "fa-bug",
        description: "ソフトウェアのテストと品質保証を専門に行うチーム。",
        staff: 10,
        projects: 15,
        years: 3,
        satisfaction: "90%"
    },
    "R&D": {
        icon: "fa-microscope",
        description: "新技術の研究開発を担当するチーム。",
        staff: 5,
        projects: 4,
        years: 6,
        satisfaction: "96%"
    },
    "技術教育": {
        icon: "fa-graduation-cap",
        description: "社内技術者のスキル向上を支援する教育チーム。",
        staff: 3,
        projects: 2,
        years: 7,
        satisfaction: "94%"
    }
};

// ノードクリック時の処理
nodes.forEach(node => {
    node.addEventListener('click', function () {
        const title = this.querySelector('.node-title').textContent;

        // モーダルにデータを設定
        const data = departmentData[title] || {
            icon: "fa-building",
            description: "詳細情報は利用できません",
            staff: "-",
            projects: "-",
            years: "-",
            satisfaction: "-"
        };

        modalTitle.textContent = `${title} 詳細情報`;
        modalDeptName.textContent = title;
        modalIcon.className = `fa-solid ${data.icon}`;
        modalDescription.textContent = data.description;
        modalStaff.textContent = data.staff;
        modalProjects.textContent = data.projects;
        modalYears.textContent = data.years;
        modalSatisfaction.textContent = data.satisfaction;

        // モーダル表示
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// モーダルを閉じる
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// モーダル外をクリックで閉じる
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ページ読み込み時に組織図を中央にスクロール
window.addEventListener('load', function () {

    const orgChartContainer = document.querySelector('.org-chart-container');
    if (orgChartContainer) {
        setTimeout(() => {
            orgChartContainer.scrollLeft = (orgChartContainer.scrollWidth - orgChartContainer.clientWidth) / 2;
        }, 300);
    }

    // 初期化時に接続線を計算
    setTimeout(calculateConnectorLines, 100);

});

// 接続線の動的計算機能
function calculateConnectorLines() {

    const multipleChildrenContainers = document.querySelectorAll('.multiple-children');

    multipleChildrenContainers.forEach(container => {
        const childNodes = container.querySelectorAll(':scope > .child-node');

        if (childNodes.length < 2) {
            // 子ノードが1つ以下の場合は線を表示しない
            container.style.setProperty('--line-width', '0');
            return;
        }

        // 最初と最後の子ノードを取得
        const firstChild = childNodes[0];
        const lastChild = childNodes[childNodes.length - 1];

        // 各ノードの位置とサイズを取得
        const firstRect = firstChild.getBoundingClientRect();
        const lastRect = lastChild.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // 相対位置を計算
        const firstCenter = (firstRect.left - containerRect.left + firstRect.width / 2) / currentScale;
        const lastCenter = (lastRect.left - containerRect.left + lastRect.width / 2) / currentScale;

        // 線の幅と開始位置を計算
        const lineWidth = lastCenter - firstCenter;
        const lineLeft = firstCenter;

        // CSS変数を設定
        container.style.setProperty('--line-width', `${lineWidth}px`);
        container.style.setProperty('--line-left', `${lineLeft}px`);

        // デバッグ情報表示（必要に応じてコメントアウト）
        console.log(`Container: ${container.className}`);
        console.log(`First child center: ${firstCenter}px`);
        console.log(`Last child center: ${lastCenter}px`);
        console.log(`Line width: ${lineWidth}px`);
        console.log(`Line left: ${lineLeft}px`);
    });
}

// デバウンス関数（リサイズイベント用）
function debounce(func, wait) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}


// リサイズ時に接続線を再計算（デバウンス付き）
window.addEventListener('resize', debounce(() => {
    calculateConnectorLines();
}, 250));
