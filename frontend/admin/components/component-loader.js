/**
 * Component Loader - Dynamically loads HTML components
 */

const ComponentLoader = (function() {
    'use strict';
    
    const cache = new Map();
    const componentsPath = '/components/';
    
    async function load(componentPath) {
        // Check cache first
        if (cache.has(componentPath)) {
            return cache.get(componentPath);
        }
        
        try {
            const response = await fetch(`${componentsPath}${componentPath}`);
            if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
            const html = await response.text();
            cache.set(componentPath, html);
            return html;
        } catch (error) {
            console.error('Component load error:', error);
            return '';
        }
    }
    
    async function render(componentPath, targetElement, data = {}) {
        let html = await load(componentPath);
        
        // Replace template variables
        Object.entries(data).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, value);
        });
        
        if (typeof targetElement === 'string') {
            targetElement = document.querySelector(targetElement);
        }
        
        if (targetElement) {
            targetElement.innerHTML = html;
        }
        
        return html;
    }
    
    function clearCache() {
        cache.clear();
    }
    
    return {
        load,
        render,
        clearCache
    };
})();

// Export
if (typeof window !== 'undefined') {
    window.ComponentLoader = ComponentLoader;
}