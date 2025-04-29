// State management
const State = {
    extensions: [],
    currentFilter: 'all', 
    
    setExtensions(extensions) {
        this.extensions = extensions;
        this.render();
    },
    
    toggleExtension(id) {
        const extension = this.extensions.find(ext => ext.id === id);
        if (extension) {
            extension.isActive = !extension.isActive;
            this.render();
        }
    },
    
    removeExtension(id) {
        this.extensions = this.extensions.filter(ext => ext.id !== id);
        this.render();
    },
    
    setFilter(filter) {
        this.currentFilter = filter;
        this.render();
    },
    
    getFilteredExtensions() {
        switch (this.currentFilter) {
            case 'active':
                return this.extensions.filter(ext => ext.isActive);
            case 'inactive':
                return this.extensions.filter(ext => !ext.isActive);
            default:
                return this.extensions;
        }
    },
    
    render() {
        const container = document.querySelector(".extension-list-items");
        const containerExtension = document.querySelector(".container-extension");
        
        const startHeight = containerExtension.offsetHeight;
        
        container.innerHTML = ExtensionList(this.getFilteredExtensions());
        
        containerExtension.style.height = 'auto';
        const endHeight = containerExtension.offsetHeight;
        
        containerExtension.style.height = startHeight + 'px';
        
        containerExtension.offsetHeight;
        
        containerExtension.style.height = endHeight + 'px';
        
        document.querySelectorAll('.extension-list-header-buttons button').forEach(button => {
            button.classList.remove('active');
            if (button.dataset.filter === this.currentFilter) {
                button.classList.add('active');
            }
        });
        
        setTimeout(() => {
            containerExtension.style.height = 'auto';
        }, 300); 
    }
};

const handleToggle = (id) => {
    State.toggleExtension(id);
};

const handleRemove = (id) => {
    State.removeExtension(id);
};

const handleFilter = (filter) => {
    State.setFilter(filter);
};

const ExtensionItem = ({ id, logo, name, description, isActive }) => `
    <div class="extension-list-item">
        <div class="extension-item-header">
            <div class="extension-item-logo">
                <img src="${logo}" alt="${name} logo">
            </div>
            <div class="extension-item-info">
                <h3 class="extension-item-name">${name}</h3>
                <p class="extension-item-description">${description}</p>
            </div>
        </div>
        <div class="extension-item-footer">
            <button class="extension-item-remove" onclick="handleRemove('${id}')">Remove</button>
            <label class="toggle-switch">
                <input type="checkbox" ${isActive ? "checked" : ""} onchange="handleToggle('${id}')">
                <div class="toggle-switch-background">
                    <div class="toggle-switch-handle"></div>
                </div>
            </label>
        </div>
    </div>
`;

const ExtensionList = (extensions) => {
    if (extensions.length === 0) {
        let message = '';
        switch (State.currentFilter) {
            case 'active':
                message = 'No active extensions. Activate some extensions to see them here.';
                break;
            case 'inactive':
                message = 'No inactive extensions. All your extensions are active.';
                break;
            default:
                message = 'No extensions found. Add extensions to start.';
        }
        return `<div class="no-extensions-message">${message}</div>`;
    }
    return extensions.map((extension) => ExtensionItem(extension)).join("");
};

const App = async () => {
    try {
        const response = await fetch("data.json");
        const extensions = await response.json();
        
        const extensionsWithIds = extensions.map((ext, index) => ({
            ...ext,
            id: `ext-${index}`
        }));
        
        State.setExtensions(extensionsWithIds);
        
        document.querySelectorAll('.extension-list-header-buttons button').forEach(button => {
            button.addEventListener('click', () => handleFilter(button.dataset.filter));
        });
        
        ThemeManager.init();
    } catch (error) {
        console.error("Error loading extensions:", error);
    }
};

document.addEventListener("DOMContentLoaded", App);
