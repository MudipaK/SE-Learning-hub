/**
 * Enhanced Search Functionality for SE Learning Hub
 * - Displays search results in a dropdown
 * - Properly navigates to selected pages/sections
 * - Highlights keywords when searching
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Search script loaded');
    
    // Search elements
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (!searchForm || !searchInput) {
        console.error('Search form or input not found');
        return;
    }
    
    // Create dropdown results container
    let searchResults = document.querySelector('.search-results');
    if (!searchResults) {
        searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        searchForm.appendChild(searchResults);
    }
    
    // Searchable content database - base content
    const searchableContent = [
        {
            title: 'Software Engineering',
            description: 'Core principles, methodologies, and software development practices',
            url: 'index.html#paths',
            pathId: 'software-engineering',
            keywords: ['software engineering', 'development', 'programming', 'coding', 'agile', 'scrum', 'waterfall', 'devops']
        },
        {
            title: 'Cloud Computing',
            description: 'AWS, Azure, GCP, and cloud architecture principles',
            url: 'index.html#paths',
            pathId: 'cloud-computing',
            keywords: ['cloud computing', 'aws', 'azure', 'gcp', 'cloud services', 'serverless', 'iaas', 'paas', 'saas']
        },
        {
            title: 'UI/UX Design',
            description: 'User interface and user experience design principles',
            url: 'index.html#paths',
            pathId: 'ui-ux',
            keywords: ['ui', 'ux', 'user interface', 'user experience', 'design', 'wireframes', 'prototyping', 'usability']
        },
        {
            title: 'Quality Assurance',
            description: 'Testing methodologies, frameworks, and quality practices',
            url: 'index.html#paths',
            pathId: 'qa',
            keywords: ['quality assurance', 'qa', 'testing', 'automated testing', 'manual testing', 'tdd', 'bdd', 'unit testing']
        },
        {
            title: 'Data Structures and Algorithms',
            description: 'Learn fundamental computer science concepts and optimization techniques',
            url: 'index.html#paths',
            pathId: 'algorithms',
            keywords: ['data structures', 'algorithms', 'dsa', 'complexity', 'big o', 'arrays', 'linked lists', 'trees', 'graphs']
        },
        {
            title: 'Mobile Development',
            description: 'iOS, Android, and cross-platform mobile app development',
            url: 'index.html#paths',
            pathId: 'mobile-development',
            keywords: ['mobile development', 'android', 'ios', 'swift', 'kotlin', 'react native', 'flutter', 'mobile apps']
        },
        {
            title: 'Learning Paths Overview',
            description: 'Structured learning paths for different technologies',
            url: 'index.html#paths',
            keywords: ['paths', 'learning', 'roadmap', 'guide']
        },
        {
            title: 'Latest Articles',
            description: 'Technical articles and tutorials',
            url: 'index.html#articles',
            keywords: ['articles', 'tutorials', 'blog']
        },
        {
            title: 'Interview Preparation',
            description: 'Prepare for technical interviews',
            url: 'interview-prep.html',
            keywords: ['interview', 'preparation', 'questions', 'practice']
        },
        {
            title: 'Ratings & Feedback',
            description: 'View and submit ratings and feedback',
            url: 'ratings.html',
            keywords: ['ratings', 'feedback', 'reviews']
        }
    ];

    // Interview preparation specific content
    const interviewContent = [
        {
            title: 'General SWE Interviews',
            description: 'General software engineering interview topics',
            url: 'interview-prep.html#general-interview',
            keywords: ['software engineer interview', 'coding', 'algorithms', 'data structures']
        },
        {
            title: 'Frontend Interview Questions',
            description: 'Frontend development interview topics',
            url: 'interview-prep.html#frontend-interview',
            keywords: ['frontend', 'javascript', 'react', 'angular', 'vue', 'html', 'css']
        },
        {
            title: 'Backend Interview Questions',
            description: 'Backend development interview topics',
            url: 'interview-prep.html#backend-interview',
            keywords: ['backend', 'server', 'api', 'database', 'nodejs', 'python', 'java']
        },
        {
            title: 'Full Stack Interview Questions',
            description: 'Full stack development interview topics',
            url: 'interview-prep.html#fullstack-interview',
            keywords: ['fullstack', 'full stack', 'mern', 'mean', 'lamp']
        },
        {
            title: 'DevOps Interview Questions',
            description: 'DevOps and infrastructure interview topics',
            url: 'interview-prep.html#devops-interview',
            keywords: ['devops', 'ci/cd', 'docker', 'kubernetes', 'aws', 'cloud']
        },
        {
            title: 'Mobile Development Interview Questions',
            description: 'Mobile app development interview topics',
            url: 'interview-prep.html#mobile-interview',
            keywords: ['mobile', 'android', 'ios', 'react native', 'flutter', 'swift', 'kotlin']
        }
    ];

    // Check current page and add appropriate content
    function initializePageSpecificContent() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Add interview content if we're on interview page or based on search context
        if (currentPage === 'interview-prep.html') {
            interviewContent.forEach(item => searchableContent.push(item));
            console.log('Added interview-specific content to search');
            
            // Also add specific topics from the page
            const topicHeaders = document.querySelectorAll('.topic-header h3');
            topicHeaders.forEach(header => {
                const topic = header.textContent.trim();
                const parentSection = header.closest('.interview-section');
                if (!parentSection) return;
                
                const sectionId = parentSection.id;
                const topicItems = header.closest('.topic').querySelectorAll('.topic-items li');
                const keywords = Array.from(topicItems).map(item => item.textContent.trim());
                
                searchableContent.push({
                    title: topic,
                    description: `Interview topic: ${topic}`,
                    url: `interview-prep.html#${sectionId}`,
                    keywords: [topic, ...keywords]
                });
            });
        }
    }
    
    // Add additional content from the page if available
    function addDynamicContent() {
        try {
            // Add article titles
            const articleTitles = document.querySelectorAll('.article-card h3');
            if (articleTitles.length > 0) {
                articleTitles.forEach(title => {
                    const articleCard = title.closest('.article-card');
                    if (!articleCard) return;
                    
                    const link = articleCard.querySelector('a.article-link');
                    const desc = articleCard.querySelector('.article-description');
                    
                    if (link) {
                        searchableContent.push({
                            title: title.textContent.trim(),
                            description: desc ? desc.textContent.trim() : 'Article',
                            url: link.getAttribute('href'),
                            keywords: [title.textContent.trim(), 'article']
                        });
                    }
                });
            }
            
            // Initialize page-specific content
            initializePageSpecificContent();
            
            console.log(`Search database initialized with ${searchableContent.length} items`);
        } catch (err) {
            console.error('Error adding dynamic content:', err);
        }
    }
    
    // Initialize dynamic content
    addDynamicContent();
    
    // Show results when user is actively searching
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 1) {
            performSearch(searchInput.value);
        }
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            hideResults();
        }
    });
    
    // Perform search
    function performSearch(query) {
        if (!query || query.trim().length < 1) {
            hideResults();
            return;
        }
        
        query = query.toLowerCase().trim();
        
        // Score and filter results
        const results = searchableContent
            .map(item => {
                const titleMatch = item.title.toLowerCase().includes(query);
                const descMatch = item.description.toLowerCase().includes(query);
                const keywordMatch = item.keywords && item.keywords.some(keyword => 
                    keyword.toLowerCase().includes(query)
                );
                
                // Calculate relevance score
                let score = 0;
                if (titleMatch) score += 3;
                if (descMatch) score += 2;
                if (keywordMatch) score += 1;
                
                return { ...item, score };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8); // Limit to top 8 results
        
        displayResults(results, query);
    }
    
    // Display search results
    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            searchResults.style.display = 'block';
            return;
        }
        
        searchResults.innerHTML = results.map(result => {
            // Highlight the query in the title and description
            let title = highlightText(result.title, query);
            let description = highlightText(result.description, query);
            
            return `
                <div class="search-result-item" data-url="${result.url}" ${result.pathId ? `data-path-id="${result.pathId}"` : ''}>
                    <div class="search-result-link">
                        <div class="search-result-title">${title}</div>
                        <div class="search-result-description">${description}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add click handlers for navigation
        const items = searchResults.querySelectorAll('.search-result-item');
        items.forEach(item => {
            item.addEventListener('click', function() {
                navigateToResult(this);
            });
        });
        
        searchResults.style.display = 'block';
    }
    
    // Hide search results
    function hideResults() {
        searchResults.style.display = 'none';
    }
    
    // Highlight search terms in text
    function highlightText(text, query) {
        if (!query || query.length < 2) return text;
        
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<strong style="color: var(--primary-color)">$1</strong>');
    }
    
    // Escape special regex characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Navigate to search result
    function navigateToResult(resultElement) {
        const url = resultElement.getAttribute('data-url');
        const pathId = resultElement.getAttribute('data-path-id');
        
        if (!url) return;
        
        // Extract page and section parts
        const urlParts = url.split('#');
        const pagePart = urlParts[0];
        const sectionPart = urlParts.length > 1 ? '#' + urlParts[1] : '';
        
        // Check if we need to navigate to a different page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (pagePart && pagePart !== currentPage) {
            // Navigate to different page
            window.location.href = url;
        } else {
            // Same page navigation
            if (sectionPart) {
                // If this is a section on the current page
                const targetSection = document.querySelector(sectionPart);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Handle interview category buttons
                    if (sectionPart.includes('interview')) {
                        const categoryId = sectionPart.replace('#', '');
                        // Find and activate the correct category button
                        setTimeout(() => {
                            const categoryBtn = document.querySelector(`.category-btn[data-category="${categoryId.replace('-interview', '')}"]`);
                            if (categoryBtn) {
                                // Remove active class from all buttons
                                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                                // Activate this button
                                categoryBtn.classList.add('active');
                                categoryBtn.click();
                            }
                        }, 300);
                    }
                    
                    // If this is a path and has an ID, click the corresponding path card
                    if (pathId) {
                        setTimeout(() => {
                            const pathCard = document.querySelector(`.path-card[data-path="${pathId}"]`);
                            if (pathCard) {
                                pathCard.click();
                                pathCard.focus();
                            }
                        }, 300);
                    }
                }
            }
        }
        
        // Hide results after navigation
        hideResults();
    }
    
    // Form submission handling
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstResult = searchResults.querySelector('.search-result-item');
        if (firstResult) {
            navigateToResult(firstResult);
        } else if (searchInput.value.trim().length > 0) {
            // If no results but query exists, show no results message
            displayResults([], searchInput.value);
        }
    });
    
    // Show results as user types
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim().length >= 1) {
            performSearch(searchInput.value);
        } else {
            hideResults();
        }
    });
    
    // Keyboard navigation in search results
    searchForm.addEventListener('keydown', (e) => {
        const resultItems = Array.from(searchResults.querySelectorAll('.search-result-item'));
        if (resultItems.length === 0) return;
        
        // Find currently focused item
        const focusedElement = document.activeElement;
        let currentIndex = -1;
        
        resultItems.forEach((item, index) => {
            if (item === focusedElement || item.contains(focusedElement)) {
                currentIndex = index;
            }
        });
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < resultItems.length - 1) {
                    resultItems[currentIndex + 1].focus();
                } else {
                    resultItems[0].focus();
                }
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    resultItems[currentIndex - 1].focus();
                } else {
                    resultItems[resultItems.length - 1].focus();
                }
                break;
                
            case 'Escape':
                e.preventDefault();
                hideResults();
                searchInput.focus();
                break;

            case 'Enter':
                if (focusedElement && resultItems.includes(focusedElement)) {
                    e.preventDefault();
                    navigateToResult(focusedElement);
                }
                break;
        }
    });
    
    // Add tabindex for keyboard navigation
    function addTabindexToResults() {
        const items = searchResults.querySelectorAll('.search-result-item');
        items.forEach(item => {
            item.setAttribute('tabindex', '0');
        });
    }
    
    // Observer to add tabindex when results are displayed
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && searchResults.children.length > 0) {
                addTabindexToResults();
            }
        });
    });
    
    observer.observe(searchResults, { childList: true });
});