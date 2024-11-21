const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');

// Simple responses for the AI
const responses = {
    "hello": "Hi there! How can I help you today?",
    "how are you": "I'm doing well, thank you for asking! How are you?",
    "what's your name": "I'm an AI chatbot. You can call me ChatBot!",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm not sure how to respond to that. Could you try rephrasing?"
};

// Add initial welcome message
window.onload = function() {
    addMessage("Hello! How can I help you today?", 'ai');
};

// Handle chat form submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(messageInput.value, 'user');
    messageInput.value = '';

    // Show typing indicator
    const typingIndicator = addTypingIndicator();

    // Get AI response
    setTimeout(() => {
        // Remove typing indicator
        chatMessages.removeChild(typingIndicator);
        
        // Add AI response
        let response = responses[message.toLowerCase()] || responses.default;
        addMessage(response, 'ai');
    }, 1500); // Increased delay to show typing
});

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'ai-message', 'typing-indicator');
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv;
}