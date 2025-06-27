// 鼠标移动时，创建星星元素
// 对象：banner
// css .star

const banner = document.querySelector('.banner');
// let isHovering = false;

// banner.addEventListener('mouseenter', function () {
//     isHovering = true;
// });
// banner.addEventListener('mouseleave', function () {
//     isHovering = false;
// });


banner.addEventListener('mousemove', function (e) {
    if (true) {

        const star = document.createElement('div');
        star.classList.add('star');
        // 随机设置星光大小
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        // 随机设置星光颜色
        const colors = ['#fff', '#ffd700', '#00ffff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.backgroundColor = randomColor;
        star.style.left = e.pageX + 'px';
        star.style.top = e.pageY + 'px';
        document.body.appendChild(star);

        // 一段时间后移除星星元素
        setTimeout(() => {
            star.remove();
        }, 1000);
    }
});



// 图片根据鼠标移动而移动
document.querySelectorAll(".float-out1").forEach(img => {
    img.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = img.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / width * 50; // 计算 X 偏移
        const y = (e.clientY - top - height / 2) / height * 50; // 计算 Y 偏移
        img.style.transform = `translate(${x * -1}px, ${y * -1}px)`;
    });

    img.addEventListener("mouseleave", () => {
        img.style.transform = "translate(0, 0)";
    });
});



// 轮播通知功能
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.announcement-slide');
    const dots = document.querySelectorAll('.announcement-dot,.announcement-dot-home');
    const prevBtn = document.querySelector('.announcement-arrow.prev');
    const nextBtn = document.querySelector('.announcement-arrow.next');
    let currentSlide;
    let autoSlideInterval;

    // 初始化轮播
    function initCarousel() {
        currentSlide = (dots.length - 1) / 2;
        //dots为奇数，取中间的dot为初始点。
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        startAutoSlide();
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval); // 先清除旧的
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    nextBtn.addEventListener('click', function () {
        stopAutoSlide();
        nextSlide();
        // startAutoSlide();
    });

    prevBtn.addEventListener('click', function () {
        stopAutoSlide();
        prevSlide();
        // startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            stopAutoSlide();
            showSlide(index);
            // startAutoSlide();
        });
    });

    document.querySelector('.announcement-container').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.announcement-container').addEventListener('mouseleave', startAutoSlide);

    // 初始化轮播
    // initCarousel();


    // 定义自动跳转与用户点击事件
    const intro = document.getElementById('intro-screen');
    const body = document.getElementById('body-content');

    // 自动显示主页，设定时间为5.5秒（延迟显示）
    let autoTransition = setTimeout(showBody, 10000);

    // 用户点击页面立即切换至主页
    intro.addEventListener('click', () => {
        clearTimeout(autoTransition);
        showBody();
    });

    function showBody() {
        intro.style.display = 'none';
        body.style.display = 'block';
        // 初始化轮播
        initCarousel();
        
        // 子菜单打开
        // 页面加载完成后执行
        // 这里加事件委托绑定，确保菜单已渲染
        // 事件委托绑定在父元素（如 .nav-list）上，只需要绑定一次。
        // 当你点击任何后代（比如 span），事件会“冒泡”到父元素，父元素通过 event.target 判断是不是 span，然后处理。
        // 直接绑定在 span 上，如果 span 是后面才插入 DOM 的（比如页面切换后才显示），那么最初的 querySelectorAll('.nav-mobile .nav-list .nav-item > span') 找不到这些 span，就不会给它们绑定事件。
        // document.querySelectorAll('.nav-mobile .nav-list .nav-item > span').forEach(icon => {

        const navList = document.querySelector('.nav-mobile .nav-list');
        if (navList && !navList._hasSpanDelegate) { // 防止重复绑定
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
            navList._hasSpanDelegate = true;
        }
    }


    // 检查 sessionStorage 是否已有访问记录
    const hasVisited = sessionStorage.getItem("hasVisited");
    let elements = document.querySelectorAll(".fade-in-banner");
    if (!hasVisited) {
        elements.forEach(el => {
            el.classList.add("show"); // 添加 `show` 让它淡入
        });
        // 设置 sessionStorage 标记为已访问
        sessionStorage.setItem("hasVisited", "true");
    } else {
        // 后续访问：直接显示，无动画
        // elements.forEach(el => {
        //     el.classList.add("no-anim");
        // });

        // 直接显示内容
        showBody();
    }


});