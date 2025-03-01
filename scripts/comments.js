document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page with comments section
    const commentsSection = document.querySelector('.comments-section');
    if (!commentsSection) return;

    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const nameInput = document.getElementById('comment-name');
    const commentInput = document.getElementById('comment-text');
    const submitButton = document.querySelector('.submit-button');
    
    let isFirebaseWorking = true;

    // Initialize comments
    initializeComments();

    // Handle form submission
    if (commentForm) {
        commentForm.addEventListener('submit', handleCommentSubmission);
    }

    async function handleCommentSubmission(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();
        
        if (!name || !comment) {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        try {
            const pagePath = window.location.pathname;
            const commentData = {
                name,
                comment,
                pagePath,
                timestamp: new Date()
            };
            
            // Add to Firebase
            await db.collection('comments').add(commentData);
            
            // Clear form
            commentForm.reset();
            
            showAlert('Comment added successfully!', 'success');
            
            // Reload comments immediately
            await loadComments();
            
        } catch (error) {
            console.error("Error adding comment:", error);
            showAlert('Comment saved locally. We\'ll sync it when connection is restored.', 'warning');
            
            // Store in localStorage as fallback
            const localComments = JSON.parse(localStorage.getItem('localComments') || '[]');
            localComments.push({
                name,
                comment,
                pagePath: window.location.pathname,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('localComments', JSON.stringify(localComments));
            
            // Reload local comments immediately
            commentForm.reset();
            loadLocalComments();
            
            isFirebaseWorking = false;
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit Comment';
        }
    }

    // Initialize comments by trying Firebase first, then falling back to local
    async function initializeComments() {
        try {
            await loadComments();
        } catch (error) {
            console.error("Could not load comments from Firebase:", error);
            loadLocalComments();
            isFirebaseWorking = false;
        }
    }

    // Load comments from Firebase
    async function loadComments() {
        if (!commentsList) return;
        
        // Show loading state
        commentsList.innerHTML = '<div class="loading-indicator"><i class="fas fa-spinner fa-spin"></i> Loading comments...</div>';
        
        try {
            // Get current page path
            const pagePath = window.location.pathname;
            
            // Get comments for this page
            const snapshot = await db.collection('comments')
                .where('pagePath', '==', pagePath)
                .orderBy('timestamp', 'desc')
                .get();
            
            // Clear loading indicator
            commentsList.innerHTML = '';
                
            if (snapshot.empty) {
                commentsList.innerHTML = '<div class="no-comments">No comments yet. Be the first to comment!</div>';
                return;
            }
            
            snapshot.forEach(doc => {
                const data = doc.data();
                addCommentToDOM(data);
            });
            
            // Also load any local comments not yet synced
            if (localStorage.getItem('localComments')) {
                const localComments = JSON.parse(localStorage.getItem('localComments'));
                if (localComments.length > 0) {
                    const divider = document.createElement('div');
                    divider.className = 'comments-divider';
                    divider.innerHTML = '<span>Local Comments (Not Yet Synchronized)</span>';
                    commentsList.appendChild(divider);
                    
                    localComments.filter(c => c.pagePath === pagePath).forEach(comment => {
                        addCommentToDOM({ 
                            ...comment, 
                            timestamp: { 
                                toDate: () => new Date(comment.createdAt) 
                            } 
                        });
                    });
                }
            }
            
        } catch (error) {
            console.error("Error loading comments:", error);
            commentsList.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Failed to load comments. Please refresh the page.</div>';
            
            // Fall back to local comments
            loadLocalComments();
            isFirebaseWorking = false;
        }
    }
    
    // Load comments from localStorage as fallback
    function loadLocalComments() {
        if (!commentsList) return;
        
        commentsList.innerHTML = '';
        
        const localComments = JSON.parse(localStorage.getItem('localComments') || '[]');
        const pagePath = window.location.pathname;
        const filteredComments = localComments.filter(c => c.pagePath === pagePath);
        
        if (filteredComments.length === 0) {
            commentsList.innerHTML = '<div class="no-comments">No comments yet. Be the first to comment!</div>';
            return;
        }
        
        filteredComments.forEach(comment => {
            addCommentToDOM({ 
                ...comment, 
                timestamp: { 
                    toDate: () => new Date(comment.createdAt) 
                } 
            });
        });
        
        // Add note about offline mode
        const offlineNote = document.createElement('div');
        offlineNote.className = 'offline-note';
        offlineNote.innerHTML = '<i class="fas fa-wifi-slash"></i> You\'re viewing comments in offline mode. Comments will sync when connection is restored.';
        commentsList.prepend(offlineNote);
    }
    
    // Helper function to add a comment to the DOM
    function addCommentToDOM(data) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        
        // Format timestamp
        const date = data.timestamp.toDate();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
        
        commentElement.innerHTML = `
            <div class="comment-header">
                <strong>${escapeHTML(data.name)}</strong>
                <span class="comment-date">${formattedDate}</span>
            </div>
            <p class="comment-body">${escapeHTML(data.comment)}</p>
        `;
        
        commentsList.appendChild(commentElement);
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
        if (commentForm) {
            commentForm.insertAdjacentElement('beforebegin', alertElement);
        } else {
            document.querySelector('.comments-section').prepend(alertElement);
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
    
    // Sync local comments to Firebase when online
    window.addEventListener('online', async () => {
        if (isFirebaseWorking && localStorage.getItem('localComments')) {
            const localComments = JSON.parse(localStorage.getItem('localComments'));
            if (localComments.length > 0) {
                showAlert('Connection restored. Syncing comments...', 'info');
                
                try {
                    for (const comment of localComments) {
                        await db.collection('comments').add({
                            ...comment,
                            timestamp: new Date(comment.createdAt)
                        });
                    }
                    
                    localStorage.removeItem('localComments');
                    showAlert('All comments synchronized successfully!', 'success');
                    loadComments();
                } catch (error) {
                    console.error('Error syncing comments:', error);
                    showAlert('Could not sync some comments. Will try again later.', 'warning');
                }
            }
        }
    });
});