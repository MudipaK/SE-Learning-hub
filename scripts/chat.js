document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user-message');
            userInput.value = '';
            const botResponse = await getBotResponse(userMessage);
            addMessage(botResponse, 'bot-message');
        }
    });

    function addMessage(message, className) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${className}`;
        messageElement.innerHTML = `
            <i class="fas fa-${className === 'bot-message' ? 'robot' : 'user'}"></i>
            <div class="message-content">${message}</div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getBotResponse(message) {
        // Simulate a delay for bot response
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Here you can integrate with an actual chatbot API
        return `You said: ${message}`;
    }
});