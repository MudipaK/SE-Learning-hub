document.addEventListener('DOMContentLoaded', () => {
    // References to DOM elements
    const starRating = document.querySelector('.star-rating');
    const stars = document.querySelectorAll('.star-rating i');
    const commentInput = document.getElementById('comment');
    const submitButton = document.getElementById('submitRating');
    const ratingsContent = document.getElementById('ratingsContent');

    let currentRating = 0;

    // Create alert container
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';
    document.querySelector('.rating-form').insertBefore(alertContainer, submitButton);

    // Show alert message
    function showAlert(message, type = 'error') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alertContainer.innerHTML = '';
        alertContainer.appendChild(alert);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    // Handle star rating interaction
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            highlightStars(rating);
        });

        star.addEventListener('click', function() {
            currentRating = this.dataset.rating;
            highlightStars(currentRating);
            // Add hover class for visual feedback
            this.classList.add('selected');
        });
    });

    starRating.addEventListener('mouseleave', () => {
        highlightStars(currentRating);
    });

    // Submit rating and comment with improved validation
    submitButton.addEventListener('click', async () => {
        try {
            if (currentRating === 0) {
                showAlert('Please select a rating');
                return;
            }

            const comment = commentInput.value.trim();
            if (!comment) {
                showAlert('Please add a comment');
                return;
            }

            // Disable submit button while processing
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            await db.collection('ratings').add({
                rating: parseInt(currentRating),
                comment: comment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Show success message
            showAlert('Rating submitted successfully!', 'success');

            // Reset form
            currentRating = 0;
            commentInput.value = '';
            highlightStars(0);
            stars.forEach(star => star.classList.remove('selected'));

            // Reload ratings
            await loadRatings();
        } catch (error) {
            console.error('Error submitting rating:', error);
            showAlert('Error submitting rating. Please try again.');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Rating';
        }
    });

    // Helper function to highlight stars
    function highlightStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            star.classList.toggle('fas', starRating <= rating);
            star.classList.toggle('far', starRating > rating);
            star.classList.toggle('hover', starRating <= rating);
        });
    }

    // Load and display ratings with error handling
    async function loadRatings() {
        try {
            ratingsContent.innerHTML = '<div class="loading">Loading ratings...</div>';

            const ratingsSnapshot = await db.collection('ratings')
                .orderBy('timestamp', 'desc')
                .limit(20)
                .get();

            if (ratingsSnapshot.empty) {
                ratingsContent.innerHTML = '<div class="no-ratings">No ratings yet. Be the first to rate!</div>';
                return;
            }

            ratingsContent.innerHTML = '';
            
            ratingsSnapshot.forEach(doc => {
                const rating = doc.data();
                const ratingElement = document.createElement('div');
                ratingElement.className = 'rating-item';
                ratingElement.innerHTML = `
                    <div class="rating-stars">
                        ${getStarHTML(rating.rating)}
                    </div>
                    <div class="rating-comment">
                        <p>${escapeHtml(rating.comment || 'No comment')}</p>
                        <small>${formatDate(rating.timestamp)}</small>
                    </div>
                `;
                ratingsContent.appendChild(ratingElement);
            });
        } catch (error) {
            console.error('Error loading ratings:', error);
            ratingsContent.innerHTML = '<div class="error">Error loading ratings. Please try again later.</div>';
        }
    }

    // Helper function to generate star HTML
    function getStarHTML(rating) {
        return Array(5).fill(0)
            .map((_, index) => `<i class="${index < rating ? 'fas' : 'far'} fa-star"></i>`)
            .join('');
    }

    // Helper function to format date
    function formatDate(timestamp) {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    // Helper function to escape HTML to prevent XSS
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Initial load of ratings
    loadRatings();

    // Add offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
            }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});