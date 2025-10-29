// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Copy code block functionality
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentNode;
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper relative';
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button absolute top-2 right-2 bg-gray-600 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded transition-colors';
        copyButton.textContent = 'Copiar';
        
        copyButton.addEventListener('click', function() {
            const text = codeBlock.textContent;
            
            navigator.clipboard.writeText(text).then(function() {
                copyButton.textContent = 'Copiado!';
                copyButton.className = copyButton.className.replace('bg-gray-600 hover:bg-gray-700', 'bg-green-600');
                
                setTimeout(function() {
                    copyButton.textContent = 'Copiar';
                    copyButton.className = copyButton.className.replace('bg-green-600', 'bg-gray-600 hover:bg-gray-700');
                }, 2000);
            });
        });
        
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(copyButton);
    });
});

// Search functionality (if implemented)
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            // Implementation for search would go here
            console.log('Searching for:', query);
        });
    }
}

// Table of Contents generator
function generateTOC() {
    const toc = document.getElementById('table-of-contents');
    if (!toc) return;
    
    const headings = document.querySelectorAll('h2, h3, h4');
    if (headings.length === 0) return;
    
    const tocList = document.createElement('ul');
    tocList.className = 'space-y-2';
    
    headings.forEach(function(heading) {
        if (!heading.id) {
            heading.id = heading.textContent.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
        }
        
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        link.className = 'text-sm text-gray-600 hover:text-blue-600 transition-colors';
        
        if (heading.tagName === 'H3') {
            li.className = 'ml-4';
        } else if (heading.tagName === 'H4') {
            li.className = 'ml-8';
        }
        
        li.appendChild(link);
        tocList.appendChild(li);
    });
    
    toc.appendChild(tocList);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    generateTOC();
});

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'fixed bottom-4 right-4 bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition-colors opacity-0 pointer-events-none';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});