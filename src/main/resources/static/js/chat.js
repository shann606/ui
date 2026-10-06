// Toggle Chat Visibility
function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    const chatToggleBtn = document.getElementById('chatToggleBtn');

    if (chatContainer.style.display === 'flex') {
        chatContainer.style.display = 'none';
        chatToggleBtn.style.display = 'flex';
    } else {
        chatContainer.style.display = 'flex';
        chatToggleBtn.style.display = 'none';
    }
}

// Send Message Functionality
function sendMessage() {
	
	
	
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');

    if (input.value.trim() === '') return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message';
    userMsg.style.backgroundColor = '#007bff';
    userMsg.style.color = 'white';
    userMsg.style.alignSelf = 'flex-end';
    userMsg.textContent = input.value;
    messagesContainer.appendChild(userMsg);



    input.value = '';
	input.focus();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

   // fromAI(input.value);
}


   function handleQuery(message){
	
	console.log('The Query ' + message);
	
	
   }
   
   
   
   



// Allow pressing 'Enter' to send
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
