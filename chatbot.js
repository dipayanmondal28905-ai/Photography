const toggle = document.getElementById("chatbotToggle");
const panel = document.getElementById("chatbotPanel");
const closeButton = document.getElementById("chatbotClose");
const form = document.getElementById("chatbotForm");
const input = document.getElementById("chatbotInput");
const messages = document.getElementById("chatbotMessages");

function setChatOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));

    if (open) input.focus();
}

toggle.addEventListener("click", () => {
    setChatOpen(panel.hidden);
});

closeButton.addEventListener("click", () => {
    setChatOpen(false);
});

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `chat-message ${type}-message`;
    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

function handleDemoMessage(text) {
    const question = text.toLowerCase();

    if (question.includes("service")) {
        return "We offer wedding photography, candid photography, pre-wedding shoots and cinematic wedding films.";
    }

    if (
        question.includes("contact") ||
        question.includes("whatsapp") ||
        question.includes("book")
    ) {
        return "You can reach the Chirkut team through the Contact Us page.";
    }

    return "This is the chatbot demo. We'll connect a real AI model in the next step so I can answer a wider range of questions.";
}

function sendMessage(text) {
    const cleanText = text.trim();
    if (!cleanText) return;

    addMessage(cleanText, "user");
    input.value = "";

    const reply = handleDemoMessage(cleanText);
    addMessage(reply, "bot");
}

form.addEventListener("submit", event => {
    event.preventDefault();
    sendMessage(input.value);
});

document.querySelectorAll("[data-question]").forEach(button => {
    button.addEventListener("click", () => {
        sendMessage(button.dataset.question);
    });
});
