document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT SELECTORS ---
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');
    const contentDiv = document.getElementById('content');
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const htmlElement = document.documentElement;

    let allData = {}; // To store the fetched data

    // --- THEME-TOGGLE LOGIC ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            themeIconLight.classList.add('hidden');
            themeIconDark.classList.remove('hidden');
        } else {
            htmlElement.classList.remove('dark');
            themeIconLight.classList.remove('hidden');
            themeIconDark.classList.add('hidden');
        }
    };

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    themeToggleButton.addEventListener('click', () => {
        const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- MOBILE MENU ---
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- DATA FETCHING AND RENDERING ---
    async function loadAndRenderData() {
        try {
            const response = await fetch("data.json");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allData = await response.json();
            renderContent(allData.sections);
        } catch (error) {
            console.error("Failed to load or process data.json:", error);
            if (contentDiv) {
                contentDiv.innerHTML = '<p class="text-red-500 text-center">Error loading content. Please check the console.</p>';
            }
        }
    }

    function createItemCard(item) {
        return `
            <a href="${item.url}" target="_blank" class="card-item-link">
                <div class="card-item">
                     <div class="flex-grow">
                        <h4 class="font-semibold text-gray-800 dark:text-white">${item.title}</h4>
                        <p class="text-gray-600 dark:text-white/70 mt-2 text-sm">${item.description}</p>
                    </div>
                    <div class="mt-4 flex justify-between items-center">
                         <span class="text-xs font-medium text-primary bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded">${item.source}</span>
                         <span class="material-symbols-outlined !text-base text-primary">arrow_forward</span>
                    </div>
                </div>
            </a>
        `;
    }

    function renderContent(sections, noResults = false) {
        if (!contentDiv) return;
        
        if (noResults) {
            contentDiv.innerHTML = '<p class="text-gray-600 dark:text-white/70 text-center">Nenhum resultado encontrado.</p>';
            return;
        }
        
        contentDiv.innerHTML = sections.map(section => `
            <section class="content-section">
                <h3 class="section-title">${section.title}</h3>
                <p class="section-description">${section.description}</p>
                <div class="items-grid">
                    ${section.items.map(createItemCard).join('')}
                </div>
            </section>
        `).join('');
    }

    // --- SEARCH LOGIC ---
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (!searchTerm) {
            renderContent(allData.sections); // Render all data if search is empty
            return;
        }

        const filteredSections = allData.sections.map(section => {
            const filteredItems = section.items.filter(item => 
                item.title.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)
            );

            // Return a new section object with only filtered items
            if (filteredItems.length > 0) {
                return { ...section, items: filteredItems };
            }
            return null; // Return null if no items in this section match
        }).filter(Boolean); // Filter out the null sections

        renderContent(filteredSections, filteredSections.length === 0);
    }
    
    // --- EVENT LISTENERS ---
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch();
    });
    searchInput.addEventListener('input', performSearch);

    // --- INITIAL LOAD ---
    loadAndRenderData();
});
