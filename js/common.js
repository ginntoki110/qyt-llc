// 汉堡菜单
const menuToggle = document.getElementById('menuToggle');
const closeMenuButton = document.getElementById('closeMenu');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');


// 汉堡菜单功能
function openMenu() {
    menu.classList.add('active');
    overlay.classList.add('active');
    closeMenuButton.classList.add('active');
    menuToggle.style.display = 'none';
}

function closeMenu() {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    closeMenuButton.classList.remove('active');
    menuToggle.style.display = 'block';
}


// common.js 优化版本
document.addEventListener('DOMContentLoaded', function () {
    // ✅ 1. 加入 footer 加载逻辑
    // fetch('./footer.html')
    //     .then(response => response.text())
    //     .then(data => {
    //         const footerElement = document.getElementById('footer-placeholder');
    //         if (footerElement) {
    //             footerElement.innerHTML = data;
    //         } else {
    //             console.warn("找不到 footer-placeholder 元素");
    //         }
    //     });

    // 卡片加载动画：掉落和浮出
    const cards = document.querySelectorAll('.drop-down,.float-out');
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, i * 200); // 每个卡片延迟200ms
    });


    // 顶部logo滚动效果
    const header = document.querySelector('header');
    const logoContainer = document.querySelector('.logo-container');

    // 回到顶部按钮
    const backToTopButton = document.getElementById("backToTop");
    let lastScroll = window.scrollY;



    // 页面项目滚轮下滑渐出效果
    const fadeElements = document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right");

    // 处理滚动事件
    function handleScroll() {
        const currentScroll = window.scrollY;

        // 处理header滚动效果
        if (currentScroll > 50) {
            header.classList.add('scrolled');
            logoContainer.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            logoContainer.classList.remove('scrolled');
        }

        // 处理回到顶部按钮显示逻辑
        const isScrollingUp = currentScroll < lastScroll;
        if (isScrollingUp && currentScroll > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
        lastScroll = currentScroll;

        // 处理元素渐入效果
        fadeElements.forEach(el => {
            let rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * (3 / 4)) {
                el.classList.add("show");
            } else {
                el.classList.remove("show");
            }
        });
    }



    // 添加事件监听器
    window.addEventListener('scroll', handleScroll);

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    menuToggle.addEventListener('click', openMenu);
    closeMenuButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // 点击菜单项也关闭菜单
    document.querySelectorAll('#menu nav a').forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // 页面跳转功能
    window.jumpToIndex = function () {
        window.location.href = "./index.html";
    }

    window.jumpToCompany = function () {
        if (window.location.pathname.endsWith("index.html")) {
            localStorage.setItem("scrollY", window.scrollY);
        } else {
            localStorage.removeItem("scrollY");
        }
        window.location.href = "./company.html";
    }

    window.jumpToService = function () {
        if (window.location.pathname.endsWith("index.html")) {
            localStorage.setItem("scrollY", window.scrollY);
        } else {
            localStorage.removeItem("scrollY");
        }
        window.location.href = "./service.html";
    }

    window.jumpTorecruit = function () {
        if (window.location.pathname.endsWith("index.html")) {
            localStorage.setItem("scrollY", window.scrollY);
        } else {
            localStorage.removeItem("scrollY");
        }
        window.location.href = "./recruit.html";
    }

    window.jumpToconsult = function () {
        if (window.location.pathname.endsWith("index.html")) {
            localStorage.setItem("scrollY", window.scrollY);
        } else {
            localStorage.removeItem("scrollY");
        }
        window.location.href = "./consult.html";
    }

    window.jumpToconsult = function () {
        if (window.location.pathname.endsWith("index.html")) {
            localStorage.setItem("scrollY", window.scrollY);
        } else {
            localStorage.removeItem("scrollY");
        }
        window.location.href = "./consult.html";
    }

    // 恢复滚动位置
    window.addEventListener("load", () => {
        const y = localStorage.getItem("scrollY");
        if (y && window.location.pathname.endsWith("index.html")) {
            window.scrollTo(0, parseInt(y));
            localStorage.removeItem("scrollY");
        }
    });

    // 初始化滚动处理以显示float-out和fade-in元素
    if (window.innerWidth <= 768) {
        // 当前为小屏幕（如手机或窄窗口）
        handleScroll();
    }

});

// 监听窗口大小变化以调整菜单显示
window.addEventListener('resize', function () {
    const menuToggle = document.querySelector('.menuToggle');
    if (window.innerWidth > 868) {
        closeMenu();
        menuToggle.style.display = 'none';
    } else {
        menuToggle.style.display = 'block';
    }
});


// 面包屑数据结构 - 定义路径与显示名称的映射关系
const breadcrumbMap = {
    'company': '会社情報',
    'service': 'サービス',
    'recruit': '採用情報',
    'consult': 'お問い合わせ',
    'tab1': "メッセージ",
    'tab2': "会社概要",
    'tab3': "会社沿革",
    'tab4': "組織体制",
    'service1': 'システム開発',
    'service2': 'インフラ構築',
    'service3': 'ITコンサル',
    'service4': 'DX支援',
    'service5': 'セキュリティ',
    'service6': 'AIソリューション',
    'recruit1': '募集要項',
    'recruit2': '働く環境',
    'recruit3': 'キャリア',
    'recruit4': '研修・福利厚生',
    'recruit5': '社員インタビュー',
    'consult1': 'お問い合わせフォーム',
    'consult2': 'アクセス',
    'consult3': 'プライバシーポリシー',
};

// 当前路径状态
let currentPath = [];

// DOM 元素
const breadcrumbElement = document.querySelector('.breadcrumb-list');
const categoryCards = document.querySelectorAll('.service-card');

// function init() {
//     const pathFromUrl = getFullPathFromHashOrPath();
//     if (pathFromUrl.length) {
//         navigateToPath(pathFromUrl, false);
//     }

//     // 绑定分类卡片点击事件
//     categoryCards.forEach(card => {
//         card.addEventListener('click', () => {
//             const path = card.dataset.path;
//             let parent = '';
//             if (path.startsWith('service')) parent = 'service';
//             else if (path.startsWith('recruit')) parent = 'recruit';
//             else if (path.startsWith('consult')) parent = 'consult';
//             else parent = '';
//             if (parent) {
//                 navigateToPath([parent, path]);
//             } else {
//                 navigateToPath([path]);
//             }
//         });
//     });


//     // 监听浏览器历史记录变化
//     window.addEventListener('popstate', (event) => {
//         if (event.state && event.state.path) {
//             navigateToPath(event.state.path, false);
//         }
//     });
// }

// 导航到指定路径
function navigateToPath(path, pushState = true) {
    // // 合并路径（如果是子路径）
    // if (path[0] !== 'home') {
    //     // 如果新路径的第一个元素与当前路径的最后一个元素相同，则视为子路径
    //     if (currentPath.length > 0 && path[0] === currentPath[currentPath.length - 1]) {
    //         currentPath = [...currentPath, ...path.slice(1)];
    //     } else {
    //         currentPath = [...path];
    //     }
    // } else {
    //     currentPath = [];
    // }
    currentPath = path;
    // 更新面包屑
    updateBreadcrumb();

    // 更新 URL
    if (pushState) {
        const urlPath = currentPath.join('/');
        history.pushState({ path: currentPath }, '', `#${urlPath}`);
    }
}

// 更新面包屑导航
function updateBreadcrumb() {
    // 清除现有面包屑（保留首页）
    const homeItem = breadcrumbElement.querySelector('li:first-child');
    breadcrumbElement.innerHTML = '';
    breadcrumbElement.appendChild(homeItem);

    let currentUrl = '';

    // 添加分隔符
    const separator = document.createElement('span');
    separator.className = 'breadcrumb-separator';
    separator.textContent = '/';
    breadcrumbElement.appendChild(separator);

    // 为每个路径段添加面包屑项
    currentPath.forEach((segment, index) => {
        let li = document.createElement('li');
        li.className = 'breadcrumb-item';

        const isFirstLevel =
            (segment === 'service' || segment === 'company' || segment === 'recruit' || segment === 'consult') &&
            index === 0;

        const isLast = index === currentPath.length - 1;

        if (isFirstLevel && !isLast) {
            // 一级栏目且不是最后一个节点，生成链接
            let a = document.createElement('a');
            a.href = window.location.pathname;
            a.textContent = breadcrumbMap[segment] || segment;
            a.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = window.location.pathname;
            });
            li.appendChild(a);
        } else if (!isLast) {
            // 其它中间节点
            let a = document.createElement('a');
            a.href = `#${currentPath.slice(0, index + 1).join('/')}`;
            a.textContent = breadcrumbMap[segment] || segment;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToPath(currentPath.slice(0, index + 1));
            });
            li.appendChild(a);
        } else {
            // 最后一个节点，纯文本
            li.className += ' active';
            li.textContent = breadcrumbMap[segment] || segment;
        }

        breadcrumbElement.appendChild(li);

        // 添加分隔符
        if (index < currentPath.length - 1) {
            let separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = '/';
            breadcrumbElement.appendChild(separator);
        }
    });
    animateBreadcrumbItems();
}

// 面包屑项动画
function animateBreadcrumbItems() {
    const items = breadcrumbElement.querySelectorAll('.breadcrumb-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 50 * index);
    });
}

//触发卡片点击事件
function doClick(hash) {
    if (hash) {
        const targetTab = document.querySelector(`[data-path="${hash}"]`);
        if (targetTab) {
            // 画面初期化时触发按钮事件 （假设已有按钮点击逻辑）
            targetTab.click();
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function () {
    let path = [];
    const hash = window.location.hash.replace(/^#/, '');
    const pathname = window.location.pathname;

    if (hash) {
        if (hash.startsWith('tab')) path = ['company', hash];
        else if (hash.startsWith('service')) path = ['service', hash];
        else if (hash.startsWith('recruit')) path = ['recruit', hash];
        else if (hash.startsWith('consult')) path = ['consult', hash];
        else if (hash === 'service' || hash === 'recruit' || hash === 'consult' || hash === 'company') path = [hash];
        else path = [hash];
    } else if (pathname.endsWith('service.html')) path = ['service'];
    else if (pathname.endsWith('company.html')) path = ['company'];
    else if (pathname.endsWith('recruit.html')) path = ['recruit'];
    else if (pathname.endsWith('consult.html')) path = ['consult'];

    // 画面初期化时触发按钮事件
    doClick(hash);


    navigateToPath(path, false);

    // company(tab)卡片点击
    document.querySelectorAll('.card-tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const tab = btn.dataset.path;
            // window.location.hash = tab; // 只改变hash
            navigateToPath(['company', tab], false);
        });
    });
    // service卡片点击
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function () {
            const sub = card.dataset.path;
            window.location.hash = sub; // 只改变hash
            // window.scrollTo({ top: scrollY }); // 保持原位置

            navigateToPath(['service', sub], false);
        });
    });

    // recruit卡片点击
    document.querySelectorAll('.recruit-card').forEach(btn => {
        btn.addEventListener('click', function () {
            const tab = btn.dataset.path;
            window.scrollTo({ top: 0 }); // 保持原位置

            navigateToPath(['recruit', tab], false);
        });
    });

    // consult卡片点击
    document.querySelectorAll('.connsult-card').forEach(btn => {
        btn.addEventListener('click', function () {
            const tab = btn.dataset.path;
            navigateToPath(['connsult', tab], false);
        });
    });
    // 子菜单打开
    // 事件委托绑定在父元素（如 .nav-list）上，只需要绑定一次。
    // 当你点击任何后代（比如 span），事件会“冒泡”到父元素，父元素通过 event.target 判断是不是 span，然后处理。
    // 直接绑定在 span 上，如果 span 是后面才插入 DOM 的（比如页面切换后才显示），那么最初的 querySelectorAll('.nav-mobile .nav-list .nav-item > span') 找不到这些 span，就不会给它们绑定事件。
    // document.querySelectorAll('.nav-mobile .nav-list .nav-item > span').forEach(icon => {
    // ...existing code...

    // 子菜单打开（事件委托，兼容动态插入）
    const navList = document.querySelector('.nav-mobile .nav-list');
    if (navList) {
        navList.addEventListener('click', function (e) {
            if (e.target.matches('.nav-item > span')) {
                e.stopPropagation();
                const icon = e.target;
                const navItem = icon.closest('.nav-item');
                const subnav = navItem.querySelector('.subnav-list');
                if (!subnav) return;
                if (icon.classList.contains('on')) {
                    icon.classList.remove('on');
                    subnav.style.display = 'none';
                } else {
                    icon.classList.add('on');
                    subnav.style.display = 'block';
                }
            }
        });
    }

    // ...existing code...

});