// Toggle Chat Visibility
let queryType = '';

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

    handleQuery(input.value, queryType);

    input.value = '';
    input.focus();
    messagesContainer.scrollTop = messagesContainer.scrollHeight;


}


async function handleQuery(message, query) {

//aiMessage("Thinking... Please wait.... ")

    console.log('printing the query type ::' + query);

   

    if (query == 'general') {
        queryType = 'general';
        genralQuery(message);
    

    } else if (query == 'expense') {

        queryType = 'expense';
        console.log("coming here" + message);
        if (message == 'Add Expense') {
            aiMessage("Please add your expense like below  so our agent will take care for you.");
            aiMessage("Example ::  I had food with my family on 09-04-2024 and paid 600 by UPI ");
        }
        else {

            createExpense(message);
			

        }



    }

   
}

async function genralQuery(message) {

    try {
		const { loader, loaderInterval } = showLoader();
        const response = await fetch(
            '/api/v1/aiservice/general?message=' + encodeURIComponent(message)
        );

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        } else {

            aiMessage(await response.text());

			clearLoader(loader, loaderInterval);


        }

    } catch (error) {
        console.error(error);

        // Show error instead of leaving "Thinking..."
        aiMessage("Sorry, something went wrong. Please try again.");
    }




}



async function createExpense(message) {

    const userId = document.getElementById("userId").value;

    console.log("are we getting the user id :::" + userId);

    try {
		const { loader, loaderInterval } = showLoader();
        const response = await fetch(
            '/api/v1/aiservice/addexpense?message=' + encodeURIComponent(message), {

            method: "GET",
            headers: {

                "X-UserId": userId
            }



        }

        );

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        } else {

            aiMessage(await response.text());

			clearLoader(loader, loaderInterval);


        }

    } catch (error) {
        console.error(error);

        // Show error instead of leaving "Thinking..."
        aiMessage("Sorry, something went wrong. Please try again.");
    }




}



function aiMessage(result) {
    console.log('getting here in ai message ::' + result);

    const messagesContainer = document.getElementById('chatMessages');


    // Add user message
    const aiResponse = document.createElement('div');
    aiResponse.className = 'message';
    aiResponse.style.backgroundColor = '#007bff';
    aiResponse.style.color = 'white';
    aiResponse.textContent = result;
    messagesContainer.appendChild(aiResponse);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;

}




// Allow pressing 'Enter' to send
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}


function showLoader() {

    const messagesContainer = document.getElementById('chatMessages');

    // Create loader
    const dynamicLoader = document.createElement('div');

    dynamicLoader.className = 'message';
    dynamicLoader.style.backgroundColor = '#007bff';
    dynamicLoader.style.color = 'white';
    dynamicLoader.textContent = 'Thinking';

    messagesContainer.appendChild(dynamicLoader);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Start animation
    let dots = 0;

    const loaderInterval = setInterval(() => {
        dots = (dots + 1) % 4;

        dynamicLoader.textContent =
            "Thinking" + ".".repeat(dots);

        messagesContainer.scrollTop =
            messagesContainer.scrollHeight;

    }, 500);

    return {
        loader: dynamicLoader,
        loaderInterval
    };
}


function clearLoader(dynamicLoader, loaderInterval) {

    // Stop the animation
    clearInterval(loaderInterval);

    // Clear loader content/styles
    dynamicLoader.className = '';
    dynamicLoader.style.background = '';
    dynamicLoader.textContent = '';
}

