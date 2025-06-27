// common.js        

// 顶部logo滚动效果
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const logoContainer = document.querySelector('.logo-container');

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        logoContainer.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        logoContainer.classList.remove('scrolled');
    }
});


// 回到顶部按钮
// 对象：回到顶部按钮   
// css #backToTop
// 事件：滚动时显示/隐藏按钮，点击按钮平滑滚动到顶部
const button = document.getElementById("backToTop");
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const isScrollingUp = currentScroll < lastScroll;

    if (isScrollingUp && currentScroll > 300) {
        button.classList.add("show");
    } else {
        button.classList.remove("show");
    }

    lastScroll = currentScroll;
});

button.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 页面项目滚轮下滑渐出效果
// css .fade-in 
// css .fade-in.show 
document.addEventListener("scroll", function () {
    let elements = document.querySelectorAll(".fade-in, .fade-in-left, .fade-in-right");
    console.log("scroll 事件触发！");
    elements.forEach(el => {
        let rect = el.getBoundingClientRect();
        // 获取 el（某个 HTML 元素）相对于 视口（viewport） 的 位置信息和尺寸
        if (rect.top < window.innerHeight * (3 / 4)) {
            el.classList.add("show"); // 添加 `show` 让元素渐显
        } else {
            el.classList.remove("show"); // 滚出视口后可渐隐
        }
    });
});

// 汉堡菜单
// 对象：汉堡菜单   
// css #menuToggle
// css #menu
// css #menu.active
// css #overlay
// css #overlay.active
// css #closeMenu
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');

    function openMenu() {
        menu.classList.add('active');
        overlay.classList.add('active');
        closeMenu.classList.add('active');
        menuToggle.style.display = 'none';
    }

    function closeMenuHandler() {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        closeMenu.classList.remove('active');
        menuToggle.style.display = 'block';
    }

    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuHandler);
    overlay.addEventListener('click', closeMenuHandler);

    // 点击菜单项也关闭菜单
    document.querySelectorAll('#menu .nav a').forEach(item => {
        item.addEventListener('click', closeMenuHandler);
    });
});


function jumpToIndex() {
    // localStorage.removeItem("scrollY"); // 清除
    //跳转页面到company.html    
    window.location.href = "./index.html";
    // window.scrollTo(0, 0);  
    // 确保跳转后滚动到顶部

}
// 页面跳转功能
// 对象：页面跳转功能
function jumpToCompany() {
    if (window.location.pathname.endsWith("index.html")) {
        // 获取当前滚动位置并存储到 localStorage
        localStorage.setItem("scrollY", window.scrollY);
    } else {
        // 清除存储滚动位置
        localStorage.removeItem("scrollY"); // 可选：恢复后清除
    }
    //跳转页面到company.html    
    window.location.href = "./company.html";
}

function jumpToService() {

    if (window.location.pathname.endsWith("index.html")) {
        // 获取当前滚动位置并存储到 localStorage
        localStorage.setItem("scrollY", window.scrollY);
    } else {
        // 清除存储滚动位置
        localStorage.removeItem("scrollY"); // 可选：恢复后清除
    }
    //跳转页面到company.html    
    window.location.href = "./service.html";

}

function jumpTorecruit() {

    if (window.location.pathname.endsWith("index.html")) {
        // 获取当前滚动位置并存储到 localStorage
        localStorage.setItem("scrollY", window.scrollY);
    } else {
        // 清除存储滚动位置
        localStorage.removeItem("scrollY"); // 可选：恢复后清除
    }
    //跳转页面到recruit.html    
    window.location.href = "./recruit.html";

}

function jumpToconsult() {
    if (window.location.pathname.endsWith("index.html")) {
        // 获取当前滚动位置并存储到 localStorage
        localStorage.setItem("scrollY", window.scrollY);
    } else {
        // 清除存储滚动位置
        localStorage.removeItem("scrollY"); // 可选：恢复后清除
    }
    //跳转页面到consult.html    
    window.location.href = "./consult.html";
}

function jumpToconsult() {
    if (window.location.pathname.endsWith("index.html")) {
        // 获取当前滚动位置并存储到 localStorage
        localStorage.setItem("scrollY", window.scrollY);
    } else {
        // 清除存储滚动位置
        localStorage.removeItem("scrollY"); // 可选：恢复后清除
    }
    //跳转页面到consult.html    
    window.location.href = "./consult.html";
    // 或者使用 window.location.assign("index.html/#consult") 也可以
}

window.addEventListener("load", () => {
    const y = localStorage.getItem("scrollY");
    if (y) {
        if (window.location.pathname.endsWith("index.html")) {
            window.scrollTo(0, parseInt(y));
            localStorage.removeItem("scrollY"); // 可选：恢复后清除
        }

    }
});

