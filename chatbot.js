document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const messages = document.getElementById("ai-messages");
    const suggestions = document.querySelectorAll(".suggestion");

    if (!form || !input || !messages) {
        console.error("Chatbot: Required HTML elements not found.");
        return;
    }

    const replies = [
        {
            keywords: ["hello", "hi", "hey", "হ্যালো"],
            answer: "Hello! Welcome to Chirkut — Your Wedding Note. ✨ How can I help you plan your special day?"
        },
        {
            keywords: ["service", "services", "photography", "photo", "কী কী"],
            answer: "📸 Our Photography Services\n\n• Wedding Photography\n• Candid Photography\n• Pre-Wedding Shoots\n• Cinematic Wedding Films\n• Event Photography\n\nAsk us about any service!"
        },
        {
            keywords: ["price", "pricing", "package", "cost", "দাম", "টাকা"],
            answer: "💍 We'd love to help you find the right package! Pricing depends on your event date, location and requirements. Please contact Chirkut directly for a personalised quote."
        },
        {
            keywords: ["book", "booking", "reserve", "বুকিং"],
            answer: "💌 Planning your special day? To enquire about booking, please visit our Contact Us page and share your event date, location and photography requirements."
        },
        {
            keywords: ["contact", "phone", "email", "যোগাযোগ"],
            answer: "📩 You can reach Chirkut through the Contact Us section of our website. Please share your event date and requirements so the team can assist you."
        },
        {
            keywords: ["wedding", "marriage", "বিয়ে", "বিবাহ"],
            answer: "❤️ Every wedding has a story worth preserving. Chirkut offers wedding photography, candid moments and cinematic films to help you remember your special day."
        },
        {
            keywords: ["location", "where", "kolkata", "কলকাতা"],
            answer: "📍 Chirkut serves wedding photography clients around Kolkata and West Bengal. Please contact us to confirm availability for your event location."
        },
        {
            keywords: ["thank", "thanks", "ধন্যবাদ"],
            answer: "You're welcome! ❤️ Thank you for considering Chirkut for your special moments."
        }
    ];

    function addMessage(text, sender) {
        const bubble = document.createElement("div");

        bubble.className = sender === "user"
            ? "message user-message"
            : "message bot-message";

        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    }

    function getReply(text) {
        const normalised = text.toLowerCase();

        for (const item of replies) {
            if (item.keywords.some(keyword => normalised.includes(keyword))) {
                return item.answer;
            }
        }

        return "Thank you for your question! ✨ I can help with our photography services, packages, wedding bookings and contact information. Choose one of the suggested topics below, or contact Chirkut for more specific assistance.";
    }

    function sendMessage(text) {
        const message = text.trim();

        if (!message) return;

        addMessage(message, "user");
        input.value = "";

        window.setTimeout(() => {
            addMessage(getReply(message), "bot");
        }, 350);
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
