document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const ratingForm = document.getElementById('rating-form');
    const ratingsList = document.getElementById('ratings-list');
    const stars = document.querySelectorAll('.rating-stars i');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = this.getAttribute('data-rating');
            document.getElementById('rating').value = selectedRating;
            stars.forEach(s => s.classList.remove('selected'));
            for (let i = 0; i < selectedRating; i++) {
                stars[i].classList.add('selected');
            }
        });
    });

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const commentText = document.getElementById('comment').value;
        const rating = document.getElementById('rating').value;

        if (commentText && rating) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');

            const commentContent = document.createElement('p');
            commentContent.textContent = commentText;
            commentElement.appendChild(commentContent);

            const ratingContent = document.createElement('div');
            ratingContent.classList.add('rating-stars');
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.classList.add('fas', 'fa-star');
                if (i < rating) {
                    star.classList.add('selected');
                }
                ratingContent.appendChild(star);
            }
            commentElement.appendChild(ratingContent);

            commentsList.appendChild(commentElement);

            commentForm.reset();
        }
    });

    ratingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const commentText = document.getElementById('comment').value;
        const rating = document.getElementById('rating').value;

        if (commentText && rating) {
            const ratingElement = document.createElement('div');
            ratingElement.classList.add('rating');

            const commentContent = document.createElement('p');
            commentContent.textContent = commentText;
            ratingElement.appendChild(commentContent);

            const ratingContent = document.createElement('div');
            ratingContent.classList.add('rating-stars');
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.classList.add('fas', 'fa-star');
                if (i < rating) {
                    star.classList.add('selected');
                }
                ratingContent.appendChild(star);
            }
            ratingElement.appendChild(ratingContent);

            ratingsList.appendChild(ratingElement);

            ratingForm.reset();
            stars.forEach(s => s.classList.remove('selected'));
        }
    });

    fetch('/api/ratings')
        .then(response => response.json())
        .then(data => {
            data.forEach(rating => {
                displayRating(rating);
            });
        });

    function displayRating(rating) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const commentContent = document.createElement('p');
        commentContent.textContent = rating.comment;
        commentElement.appendChild(commentContent);

        const ratingContent = document.createElement('div');
        ratingContent.classList.add('rating-stars');
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.classList.add('fas', 'fa-star');
            if (i < rating.rating) {
                star.classList.add('selected');
            }
            ratingContent.appendChild(star);
        }
        commentElement.appendChild(ratingContent);

        commentsList.appendChild(commentElement);
    }
});