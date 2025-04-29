const ThemeManager = {
    currentTheme: 'dark',
    
    init() {
        document.body.setAttribute('data-theme', this.currentTheme);
        this.updateThemeElements();
        
        const themeButton = document.querySelector('.extension-header-button');
        themeButton.addEventListener('click', () => this.toggleTheme());
    },
    
    updateThemeElements() {
        const themeButton = document.querySelector('.extension-header-button img');
        themeButton.src = this.currentTheme === 'dark' ? '/images/icon-sun.svg' : '/images/icon-moon.svg';
        
        const logo = document.querySelector('.extension-header-title img');
        logo.src = this.currentTheme === 'dark' ? '/images/logo-dark-mode.svg' : '/images/logo-light-mode.svg';
    },
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', this.currentTheme);
        this.updateThemeElements();
    }
};