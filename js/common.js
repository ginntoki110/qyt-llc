// ======================== 菜单控制 ========================
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenuButton = document.getElementById('closeMenu');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');

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

        // ✅ 重置所有子菜单状态
        document.querySelectorAll('.nav-mobile .subnav-list.expanded').forEach(el => {
            el.classList.remove('expanded');
        });
        document.querySelectorAll('.nav-mobile .nav-list li span.on').forEach(el => {
            el.classList.remove('on');
        });
    }

    menuToggle.addEventListener('click', openMenu);
    closeMenuButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    document.querySelectorAll('#menu nav a').forEach(item => item.addEventListener('click', closeMenu));

    window.addEventListener('resize', () => {
        if (window.innerWidth > 868) {
            closeMenu();
            menuToggle.style.display = 'none';
        } else {
            menuToggle.style.display = 'block';
        }
    });
}

// ======================== 滚动控制 ========================
function initScrollEffects() {
    const header = document.querySelector('header');
    const logoContainer = document.querySelector('.logo-container');
    const backToTopButton = document.getElementById('backToTop');
    let lastScroll = window.scrollY;

    function handleScroll() {
        const current = window.scrollY;
        header.classList.toggle('scrolled', current > 50);
        logoContainer.classList.toggle('scrolled', current > 50);

        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.75) {
                el.classList.add('show');
            } else {
                el.classList.remove('show');
            }
        });

        backToTopButton.classList.toggle('show', current < lastScroll && current > 300);
        lastScroll = current;
    }

    window.addEventListener('scroll', handleScroll);
    backToTopButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    if (window.innerWidth <= 768) handleScroll();
}

// ======================== 页面跳转 ========================
function saveScrollIfNeeded() {
    if (window.location.pathname.endsWith("index.html")) {
        localStorage.setItem("scrollY", window.scrollY);
    } else {
        localStorage.removeItem("scrollY");
    }
}

function initPageJump() {
    const jumpMap = {
        jumpToIndex: "./index.html",
        jumpToCompany: "./company.html",
        jumpToService: "./service.html",
        jumpTorecruit: "./recruit.html",
        jumpToconsult: "./consult.html"
    };

    for (const [name, path] of Object.entries(jumpMap)) {
        window[name] = () => {
            saveScrollIfNeeded();
            window.location.href = path;
        };
    }

    window.addEventListener('load', () => {
        const y = localStorage.getItem("scrollY");
        if (y && window.location.pathname.endsWith("index.html")) {
            window.scrollTo(0, parseInt(y));
            localStorage.removeItem("scrollY");
        }
    });
}

// ======================== 面包屑路径 ========================
const breadcrumbMap = {
    company: '会社情報', service: 'サービス', recruit: '採用情報', consult: 'お問い合わせ',
    tab1: "メッセージ", tab2: "会社概要", tab3: "会社沿革", tab4: "組織体制",
    service1: 'システム開発', service2: 'インフラ構築', service3: 'ITコンサル', service4: 'DX支援',
    service5: 'セキュリティ', service6: 'AIソリューション',
    recruit1: '募集要項', recruit2: '働く環境', recruit3: 'キャリア', recruit4: '研修・福利厚生', recruit5: '社員インタビュー',
    consult1: 'お問い合わせフォーム', consult2: 'アクセス', consult3: 'プライバシーポリシー'
};
let currentPath = [];
const breadcrumbElement = document.querySelector('.breadcrumb-list');

function navigateToPath(path, pushState = true) {
    currentPath = path;
    updateBreadcrumb();
    if (pushState) {
        const urlPath = currentPath.join('/');
        history.pushState({ path: currentPath }, '', `#${urlPath}`);
    }
}

function updateBreadcrumb() {
    if (!breadcrumbElement) return;
    const homeItem = breadcrumbElement.querySelector('li:first-child');
    breadcrumbElement.innerHTML = '';
    breadcrumbElement.appendChild(homeItem);
    const separator = document.createElement('span');
    separator.className = 'breadcrumb-separator';
    separator.textContent = '/';
    breadcrumbElement.appendChild(separator);

    currentPath.forEach((segment, index) => {
        let li = document.createElement('li');
        li.className = 'breadcrumb-item';
        const isFirstLevel = ['service', 'company', 'recruit', 'consult'].includes(segment) && index === 0;
        const isLast = index === currentPath.length - 1;

        if (isFirstLevel && !isLast) {
            const a = document.createElement('a');
            a.href = window.location.pathname;
            a.textContent = breadcrumbMap[segment] || segment;
            a.addEventListener('click', e => {
                e.preventDefault();
                window.location.href = window.location.pathname;
            });
            li.appendChild(a);
        } else if (!isLast) {
            const a = document.createElement('a');
            a.href = `#${currentPath.slice(0, index + 1).join('/')}`;
            a.textContent = breadcrumbMap[segment] || segment;
            a.addEventListener('click', e => {
                e.preventDefault();
                navigateToPath(currentPath.slice(0, index + 1));
            });
            li.appendChild(a);
        } else {
            li.className += ' active';
            li.textContent = breadcrumbMap[segment] || segment;
        }

        breadcrumbElement.appendChild(li);
        if (index < currentPath.length - 1) {
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = '/';
            breadcrumbElement.appendChild(separator);
        }
    });
    animateBreadcrumbItems();
}

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

function doClick(hash) {
    const targetTab = document.querySelector(`[data-path="${hash}"]`);
    if (targetTab) targetTab.click();
}

// ======================== 页面初始化 ========================
document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initScrollEffects();
    initPageJump();

    const hash = window.location.hash.replace(/^#/, '');
    const pathname = window.location.pathname;
    let path = [];

    if (hash.startsWith('tab')) path = ['company', hash];
    else if (hash.startsWith('service')) path = ['service', hash];
    else if (hash.startsWith('recruit')) path = ['recruit', hash];
    else if (hash.startsWith('consult')) path = ['consult', hash];
    else if (pathname.endsWith('service.html')) path = ['service'];
    else if (pathname.endsWith('company.html')) path = ['company'];
    else if (pathname.endsWith('recruit.html')) path = ['recruit'];
    else if (pathname.endsWith('consult.html')) path = ['consult'];

    doClick(hash);
    navigateToPath(path, false);

    document.querySelectorAll('.card-tab-btn').forEach(btn =>
        btn.addEventListener('click', () => navigateToPath(['company', btn.dataset.path], false)));

    document.querySelectorAll('.service-card').forEach(card =>
        card.addEventListener('click', () => navigateToPath(['service', card.dataset.path], false)));

    document.querySelectorAll('.recruit-card').forEach(card =>
        card.addEventListener('click', () => navigateToPath(['recruit', card.dataset.path], false)));

    document.querySelectorAll('.consult-card').forEach(card =>
        card.addEventListener('click', () => navigateToPath(['consult', card.dataset.path], false)));

    document.querySelectorAll('.drop-down, .float-out').forEach((el, i) =>
        setTimeout(() => el.classList.add('visible'), i * 200));

    const navList = document.querySelector('.nav-mobile .nav-list');
    navList?.addEventListener('click', e => {
        if (e.target.matches('.nav-item > span')) {
            const icon = e.target;
            const navItem = icon.closest('.nav-item');
            const subnav = navItem?.querySelector('.subnav-list');

            if (!subnav) return;

            // 关闭其他打开的项
            document.querySelectorAll('.nav-mobile .nav-item .subnav-list.expanded').forEach(el => {
                if (el !== subnav) el.classList.remove('expanded');
            });
            document.querySelectorAll('.nav-mobile .nav-list li span.on').forEach(el => {
                if (el !== icon) el.classList.remove('on');
            });

            // 切换当前项
            icon.classList.toggle('on');
            subnav.classList.toggle('expanded');
        }
    });

});
