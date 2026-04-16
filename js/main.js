const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
            isDarkMode: false,
        };
    },
    created() {
        window.addEventListener("load", () => {
            this.loading = false;
            // 检测系统主题偏好
            this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.updateTheme();
        });
        // 监听系统主题变化
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.isDarkMode = e.matches;
            this.updateTheme();
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
        // 创建主题切换按钮
        this.createThemeToggle();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
        createThemeToggle() {
            const toggle = document.createElement('div');
            toggle.id = 'theme-toggle';
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            toggle.addEventListener('click', () => {
                this.isDarkMode = !this.isDarkMode;
                this.updateTheme();
            });
            document.body.appendChild(toggle);
        },
        updateTheme() {
            const toggle = document.getElementById('theme-toggle');
            if (this.isDarkMode) {
                document.documentElement.classList.add('dark-mode');
                if (toggle) toggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.documentElement.classList.remove('dark-mode');
                if (toggle) toggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        },
    },
});
app.mount("#layout");

// 添加深色模式的CSS类
const style = document.createElement('style');
style.textContent = `
    .dark-mode {
        --bg-color: #1a1a1a;
        --text-color: #e0e0e0;
        --card-bg: #2d2d2d;
        --border-color: #444;
        --primary-color: #66afef;
        --hover-color: #8ab5ff;
        --menu-bg: #1a1a1a;
        --menu-text: #e0e0e0;
        --code-bg: #333;
        --blockquote-bg: #2d2d2d;
        --table-even: #333;
        --table-odd: #2d2d2d;
        --table-header: #444;
    }
    
    .dark-mode body {
        background: var(--bg-color);
        color: var(--text-color);
    }
    
    .dark-mode #home-card #card-style {
        background: var(--card-bg);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    
    .dark-mode #home-posts .post {
        background: var(--card-bg);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }
    
    .dark-mode #home-posts .post .category-and-date {
        color: var(--text-color);
    }
    
    .dark-mode #home-posts .post-title {
        color: var(--primary-color);
    }
    
    .dark-mode #menu {
        background: var(--menu-bg);
    }
    
    .dark-mode #menu #desktop-menu .title,
    .dark-mode #menu #desktop-menu a,
    .dark-mode #menu #mobile-menu .title,
    .dark-mode #menu #mobile-menu a {
        color: var(--menu-text);
    }
    
    .dark-mode #menu.menu-color {
        background: rgba(26, 26, 26, 0.8);
    }
    
    .dark-mode #menu.menu-color #desktop-menu a,
    .dark-mode #menu.menu-color #mobile-menu a,
    .dark-mode #menu.menu-color #mobile-menu .title {
        color: var(--menu-text);
    }
    
    .dark-mode .article .info .date {
        color: var(--text-color);
    }
    
    .dark-mode #archives .categories-tags span a {
        border: rgba(224, 224, 224, 0.5) 1px solid;
        color: var(--text-color);
    }
    
    .dark-mode #archives .categories-tags span a:hover {
        background: var(--card-bg) !important;
        border: var(--primary-color) 1px solid;
        color: var(--primary-color);
    }
    
    .dark-mode #footer #footer-wrap {
        border-top: 1px solid var(--border-color);
        color: var(--text-color);
    }
    
    .dark-mode #home-card #card-div .icon-links a,
    .dark-mode #home-card #card-div .friend-links a {
        color: var(--text-color);
    }
    
    .dark-mode #home-card #card-div .icon-links a:hover,
    .dark-mode #home-card #card-div .friend-links a:hover {
        background: var(--primary-color);
        color: #fff;
    }
    
    .dark-mode .input {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        color: var(--text-color);
    }
    
    .dark-mode .input:focus {
        background: var(--card-bg);
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(102, 175, 239, 0.25);
    }
    
    .dark-mode .input:hover {
        background: var(--card-bg);
    }
    
    .dark-mode pre {
        border: 1px solid var(--border-color);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    }
    
    .dark-mode code {
        background: rgba(102, 175, 239, 0.1);
    }
    
    .dark-mode h1, .dark-mode h2, .dark-mode h3, .dark-mode h4, .dark-mode h5, .dark-mode h6 {
        color: var(--text-color);
    }
    
    .dark-mode blockquote {
        background: var(--blockquote-bg);
        border-left: 3px solid var(--primary-color);
    }
    
    .dark-mode table:not(.hljs-ln) td:nth-child(even) {
        background: var(--table-even);
    }
    
    .dark-mode table:not(.hljs-ln) td:nth-child(odd) {
        background: var(--table-odd);
    }
    
    .dark-mode table:not(.hljs-ln) th {
        background: var(--table-header);
    }
    
    .dark-mode ::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border: 3px solid var(--bg-color);
    }
    
    .dark-mode ::-webkit-scrollbar-track {
        background: var(--bg-color);
    }
    
    .dark-mode .timeline-content {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
    }
    
    .dark-mode .timeline-tail {
        background: var(--card-bg);
        border: 2px solid var(--primary-color);
    }
    
    .dark-mode #theme-toggle {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        color: var(--text-color);
    }
`;
document.head.appendChild(style);
