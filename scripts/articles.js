document.addEventListener('DOMContentLoaded', () => {
    const articlesGrid = document.querySelector('.articles-grid');
    // Using only Dev.to API (free, no API key required)
    const DEVTO_API = 'https://dev.to/api/articles';
    
    let isLoading = false;
    
    async function fetchArticles() {
        if (isLoading) return;
        
        isLoading = true;
        showLoadingState();

        try {
            const articles = await fetchDevToArticles();
            displayArticles(articles);
        } catch (error) {
            console.error('Error fetching articles:', error);
            displayError(error.message);
        } finally {
            isLoading = false;
        }
    }
    
    async function fetchDevToArticles() {
        const timestamp = new Date().getTime();
        const response = await fetch(`${DEVTO_API}?per_page=9&_t=${timestamp}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch Dev.to articles: ${response.status}`);
        }
        
        const articles = await response.json();
        
        if (!Array.isArray(articles) || articles.length === 0) {
            throw new Error('No articles found from Dev.to');
        }
        
        // Format to match our display function
        return articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.cover_image || article.social_image,
            publishedAt: article.published_at,
            source: { name: 'Dev.to' }
        }));
    }

    function showLoadingState() {
        articlesGrid.innerHTML = `
            <div class="loading-message">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading latest articles...</p>
                <p class="loading-subtext">This may take a few moments</p>
            </div>
        `;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function truncateText(text, maxLength = 150) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    function displayArticles(articles) {
        if (!articles || articles.length === 0) {
            displayError('No articles found.');
            return;
        }

        articlesGrid.innerHTML = articles.map(article => `
            <article class="article-card">
                ${article.image ? `
                    <div class="article-image-container">
                        <img src="${article.image}" alt="${article.title}" class="article-image" 
                            onerror="this.onerror=null; this.src='https://via.placeholder.com/400x200?text=No+Image+Available'">
                    </div>
                ` : `
                    <div class="article-image-container">
                        <img src="https://via.placeholder.com/400x200?text=No+Image+Available" alt="No image available" class="article-image">
                    </div>
                `}
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-description">${truncateText(article.description || '')}</p>
                    <div class="article-meta">
                        <span class="article-date">
                            <i class="far fa-calendar"></i>
                            ${formatDate(article.publishedAt)}
                        </span>
                        <span class="article-source">
                            <i class="fas fa-newspaper"></i>
                            ${article.source.name}
                        </span>
                    </div>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="article-link">
                        Read More
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </article>
        `).join('');
    }

    function displayError(message = 'Unable to load articles at this time.') {
        articlesGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
                <button onclick="retryFetch()" class="retry-button">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
    }

    // Add retry functionality
    window.retryFetch = function() {
        if (!isLoading) {
            fetchArticles();
        }
    };

    // Add auto-refresh every 5 minutes
    const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
    let refreshTimer = setInterval(fetchArticles, REFRESH_INTERVAL);

    // Clear interval when page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(refreshTimer);
        } else {
            refreshTimer = setInterval(fetchArticles, REFRESH_INTERVAL);
            // Refresh articles when page becomes visible again
            fetchArticles();
        }
    });
    
    // Initial fetch
    fetchArticles();
});