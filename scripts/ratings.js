document.addEventListener('DOMContentLoaded', function() {
    const ratingForm = document.getElementById('rating-form');
    const ratingsList = document.getElementById('ratings-list');
    const stars = document.querySelectorAll('.rating-stars i');
    let selectedRating = 0;

    fetch('/api/ratings')
        .then(response => response.json())
        .then(data => {
            data.forEach(rating => {
                displayRating(rating);
            });
        });

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

    ratingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const commentText = document.getElementById('comment').value;
        const rating = document.getElementById('rating').value;

        if (commentText && rating) {
            const newRating = { comment: commentText, rating: parseInt(rating) };

            fetch('/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRating)
            })
            .then(response => response.json())
            .then(data => {
                displayRating(data);
                ratingForm.reset();
                stars.forEach(s => s.classList.remove('selected'));
            });
        }
    });

    function displayRating(rating) {
        const ratingElement = document.createElement('div');
        ratingElement.classList.add('rating');

        const commentContent = document.createElement('p');
        commentContent.textContent = rating.comment;
        ratingElement.appendChild(commentContent);

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
        ratingElement.appendChild(ratingContent);

        ratingsList.appendChild(ratingElement);
    }
});