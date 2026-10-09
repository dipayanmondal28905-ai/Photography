
const WORKER_URL =
    "https://chirkut-ai-assistant.dipayanmondal28905.workers.dev";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const messages = document.getElementById("ai-messages");
    const sendButton = document.getElementById("ai-send-button");
    const suggestions = document.querySelectorAll(".suggestion");

    if (!form || !input || !messages || !sendButton) {
        console.error("Chirkut AI: Required HTML elements not found.");
        return;
    }

    let isSending = false;
    const history = [];

    function addMessage(text, type) {
        const element = document.createElement("div");
        element.className =
            type === "user"
                ? "message user-message"
                : "message bot-message";

        element.textContent = text;
        messages.appendChild(element);
        messages.scrollTop = messages.scrollHeight;

        return element;
    }

    async function sendMessage(value) {
        const message = value.trim();

        if (!message || isSending) return;

        addMessage(message, "user");
        input.value = "";
        isSending = true;
        sendButton.disabled = true;

        const loading = addMessage("Thinking...", "bot");

        try {
            const response = await fetch(WORKER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    history: history.slice(-10)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Worker response:", data);
                throw new Error(
                    data.details ||
                    data.error ||
                    `Request failed (${response.status})`
                );
            }

            if (typeof data.reply !== "string" || !data.reply.trim()) {
                console.error("Unexpected response:", data);
                throw new Error("The AI response was empty.");
            }

            loading.textContent = data.reply;

            history.push(
                { role: "user", content: message },
                { role: "assistant", content: data.reply }
            );

        } catch (error) {
            console.error("Chirkut AI error:", error);

            loading.textContent =
                "Sorry, I couldn't respond right now. Please try again.";

        } finally {
            isSending = false;
            sendButton.disabled = false;
            messages.scrollTop = messages.scrollHeight;
            input.focus();
        }
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        sendMessage(input.value);
    });

    suggestions.forEach(button => {
        button.addEventListener("click", () => {
            sendMessage(
                button.dataset.message || button.textContent
            );
        });
    });
});
