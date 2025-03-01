document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page with ratings section
    const ratingsSection = document.querySelector('.ratings-section');
    if (!ratingsSection) return;

    const ratingForm = document.getElementById('rating-form');
    const ratingsList = document.getElementById('ratings-list');
    const nameInput = document.getElementById('rating-name');
    const commentInput = document.getElementById('rating-comment');
    const stars = document.querySelectorAll('.rating-stars .fa-star');
    const submitButton = document.querySelector('.submit-button');
    
    let currentRating = 0;
    let isFirebaseWorking = true;

    // Initialize ratings
    initializeRatings();
    
    // Set up star rating functionality
    if (stars.length > 0) {
        stars.forEach((star, index) => {
            // Mouse hover events
            star.addEventListener('mouseover', () => {
                resetStars();
                for (let i = 0; i <= index; i++) {
                    stars[i].style.color = 'var(--accent-color)';
                }
            });

            star.addEventListener('click', (e) => {
                e.preventDefault();
                currentRating = index + 1;
                resetStars();
                for (let i = 0; i < currentRating; i++) {
                    stars[i].style.color = 'var(--accent-color)';
                    stars[i].classList.add('selected');
                }
            });
        });

        // Reset stars when mouse leaves the rating container
        document.querySelector('.rating-stars').addEventListener('mouseleave', () => {
            resetStars();
            if (currentRating > 0) {
                for (let i = 0; i < currentRating; i++) {
                    stars[i].style.color = 'var(--accent-color)';
                    stars[i].classList.add('selected');
                }
            }
        });
    }

    // Handle form submission
    if (ratingForm) {
        ratingForm.addEventListener('submit', handleRatingSubmission);
    }

    async function handleRatingSubmission(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();
        
        if (!name || currentRating === 0) {
            showAlert('Please provide your name and select a rating', 'error');
            return;
        }
        
        // Disable form while submitting
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        try {
            const pagePath = window.location.pathname;
            const ratingData = {
                name,
                comment,
                rating: currentRating,
                pagePath,
                timestamp: new Date()
            };
            
            // Add to Firebase
            await db.collection('ratings').add(ratingData);
            
            // Clear form and reset
            ratingForm.reset();
            currentRating = 0;
            resetStars();
            
            showAlert('Thank you for your rating!', 'success');
            
            // Reload ratings immediately
            await loadRatings();
            
        } catch (error) {
            console.error("Error adding rating:", error);
            showAlert('Rating saved locally. Will sync when connection is restored.', 'warning');
            
            // Store in localStorage as fallback
            const localRatings = JSON.parse(localStorage.getItem('localRatings') || '[]');
            localRatings.push({
                name,
                comment,
                rating: currentRating,
                pagePath: window.location.pathname,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('localRatings', JSON.stringify(localRatings));
            
            // Clear form and reload local ratings immediately
            ratingForm.reset();
            currentRating = 0;
            resetStars();
            loadLocalRatings();
            
            isFirebaseWorking = false;
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Rating';
        }
    }

    // Reset all stars to default state
    function resetStars() {
        stars.forEach(star => {
            star.style.color = '#d1d5db';
            star.classList.remove('selected', 'hover');
        });
    }

    // Initialize ratings by trying Firebase first, then falling back to local
    async function initializeRatings() {
        try {
            await loadRatings();
        } catch (error) {
            console.error("Could not load ratings from Firebase:", error);
            loadLocalRatings();
            isFirebaseWorking = false;
        }
    }

    // Load ratings from Firebase
    async function loadRatings() {
        if (!ratingsList) return;
        
        // Show loading state
        ratingsList.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-spin"></i> Loading ratings...</div>';
        
        try {
            // Get current page path
            const pagePath = window.location.pathname;
            
            // Get ratings for this page
            const snapshot = await db.collection('ratings')
                .where('pagePath', '==', pagePath)
                .orderBy('timestamp', 'desc')
                .get();
                
            // Clear loading indicator
            ratingsList.innerHTML = '';
                
            // Calculate average rating
            let totalRating = 0;
            let ratingCount = 0;
            
            if (snapshot.empty) {
                ratingsList.innerHTML = '<div class="no-ratings">No ratings yet. Be the first to rate!</div>';
                updateAverageRating(0, 0);
                return;
            }
            
            snapshot.forEach(doc => {
                const data = doc.data();
                addRatingToDOM(data, totalRating, ratingCount);
                
                // Add to rating totals
                totalRating += data.rating;
                ratingCount++;
            });
            
            // Update average rating display
            updateAverageRating(totalRating, ratingCount);
            
            // Also load any local ratings not yet synced
            if (localStorage.getItem('localRatings')) {
                const localRatings = JSON.parse(localStorage.getItem('localRatings'));
                if (localRatings.length > 0) {
                    const divider = document.createElement('div');
                    divider.className = 'ratings-divider';
                    divider.innerHTML = '<span>Local Ratings (Not Yet Synchronized)</span>';
                    ratingsList.appendChild(divider);
                    
                    localRatings.filter(r => r.pagePath === pagePath).forEach(rating => {
                        addRatingToDOM(
                            { 
                                ...rating, 
                                timestamp: { 
                                    toDate: () => new Date(rating.createdAt) 
                                } 
                            }, 
                            0, 0
                        );
                    });
                }
            }
            
        } catch (error) {
            console.error("Error loading ratings:", error);
            ratingsList.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Failed to load ratings. Please refresh the page.</div>';
            
            // Fall back to local ratings
            loadLocalRatings();
            isFirebaseWorking = false;
        }
    }
    
    // Load ratings from localStorage as fallback
    function loadLocalRatings() {
        if (!ratingsList) return;
        
        ratingsList.innerHTML = '';
        
        const localRatings = JSON.parse(localStorage.getItem('localRatings') || '[]');
        const pagePath = window.location.pathname;
        const filteredRatings = localRatings.filter(r => r.pagePath === pagePath);
        
        if (filteredRatings.length === 0) {
            ratingsList.innerHTML = '<div class="no-ratings">No ratings yet. Be the first to rate!</div>';
            updateAverageRating(0, 0);
            return;
        }
        
        let totalRating = 0;
        let ratingCount = 0;
        
        filteredRatings.forEach(rating => {
            addRatingToDOM(
                { 
                    ...rating, 
                    timestamp: { 
                        toDate: () => new Date(rating.createdAt) 
                    } 
                }, 
                totalRating, 
                ratingCount
            );
            
            totalRating += rating.rating;
            ratingCount++;
        });
        
        updateAverageRating(totalRating, ratingCount);
        
        // Add note about offline mode
        const offlineNote = document.createElement('div');
        offlineNote.className = 'offline-note';
        offlineNote.innerHTML = '<i class="fas fa-wifi-slash"></i> You\'re viewing ratings in offline mode. Ratings will sync when connection is restored.';
        ratingsList.prepend(offlineNote);
    }
    
    // Helper function to add a rating to the DOM
    function addRatingToDOM(data, totalRating, ratingCount) {
        const ratingElement = document.createElement('div');
        ratingElement.className = 'rating';
        
        // Format timestamp
        const date = data.timestamp.toDate();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
        
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<i class="fas fa-star ${i <= data.rating ? 'selected' : ''}"></i>`;
        }
        
        ratingElement.innerHTML = `
            <div class="rating-header">
                <div class="rating-user-info">
                    <span class="rating-name"><strong>${escapeHTML(data.name)}</strong></span>
                    <span class="rating-date">${formattedDate}</span>
                </div>
                <div class="rating-badge">${getRatingText(data.rating)}</div>
            </div>
            <div class="rating-stars-display">${starsHtml}</div>
            ${data.comment ? `<p class="rating-comment">${escapeHTML(data.comment)}</p>` : ''}
        `;
        
        ratingsList.appendChild(ratingElement);
    }
    
    // Update the average rating display
    function updateAverageRating(total, count) {
        const averageDisplay = document.getElementById('average-rating');
        if (!averageDisplay) return;
        
        if (count === 0) {
            averageDisplay.innerHTML = '<div class="no-ratings-yet">No ratings yet</div>';
            return;
        }
        
        const average = (total / count).toFixed(1);
        
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            // For partial stars
            if (i <= Math.floor(average)) {
                starsHtml += '<i class="fas fa-star selected"></i>';
            } else if (i - 0.5 <= average) {
                starsHtml += '<i class="fas fa-star-half-alt selected"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        
        averageDisplay.innerHTML = `
            <div class="average-rating-container">
                <div class="average-number">${average}</div>
                <div class="average-details">
                    <div class="average-stars">${starsHtml}</div>
                    <div class="rating-count">${count} ${count === 1 ? 'rating' : 'ratings'}</div>
                </div>
            </div>
        `;
    }

    // Helper function to show alerts
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type}`;
        
        const icon = type === 'success' ? 'check-circle' : 
                    type === 'error' ? 'exclamation-circle' : 
                    type === 'warning' ? 'exclamation-triangle' : 'info-circle';
        
        alertElement.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
        
        // Add to DOM
        if (ratingForm) {
            ratingForm.insertAdjacentElement('beforebegin', alertElement);
        } else {
            document.querySelector('.ratings-section').prepend(alertElement);
        }
        
        // Add animation
        setTimeout(() => {
            alertElement.classList.add('show');
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            alertElement.classList.remove('show');
            setTimeout(() => alertElement.remove(), 300);
        }, 4000);
    }

    // Helper function to escape HTML for security
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[tag]));
    }
    
    // Sync local ratings to Firebase when online
    window.addEventListener('online', async () => {
        if (isFirebaseWorking && localStorage.getItem('localRatings')) {
            const localRatings = JSON.parse(localStorage.getItem('localRatings'));
            if (localRatings.length > 0) {
                showAlert('Connection restored. Syncing ratings...', 'info');
                
                try {
                    for (const rating of localRatings) {
                        await db.collection('ratings').add({
                            ...rating,
                            timestamp: new Date(rating.createdAt)
                        });
                    }
                    
                    localStorage.removeItem('localRatings');
                    showAlert('All ratings synchronized successfully!', 'success');
                    loadRatings();
                } catch (error) {
                    console.error('Error syncing ratings:', error);
                    showAlert('Could not sync some ratings. Will try again later.', 'warning');
                }
            }
        }
    });

    // Helper function to get rating text based on number of stars
    function getRatingText(rating) {
        switch(rating) {
            case 1: return 'Poor';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Very Good';
            case 5: return 'Excellent';
            default: return '';
        }
    }

});