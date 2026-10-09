
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ai-chat-form");
    const input = document.getElementById("ai-chat-input");
    const messages = document.getElementById("ai-messages");
    const suggestions = document.querySelectorAll(".suggestion");

    if (!form || !input || !messages) {
        console.error("Chatbot: Required HTML elements not found.");
        return;
    }

    // Add a message to the chat
    function addMessage(text, sender) {
        const bubble = document.createElement("div");

        bubble.className = sender === "user"
            ? "message user-message"
            : "message bot-message";

        bubble.textContent = text;
        messages.appendChild(bubble);
        messages.scrollTop = messages.scrollHeight;
    }

    // Match questions to specific responses
    function getReply(message) {
        const text = message
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s]/gu, " ")
            .replace(/\s+/g, " ")
            .trim();

        const has = (...words) =>
            words.some(word => text.includes(word));

        // Greetings
        if (/^(hi|hello|hey|hii|hiii|হ্যালো|নমস্কার)$/.test(text)) {
            return "Hello! Welcome to Chirkut — Your Wedding Note. How can we help you make your special moments unforgettable?";
        }

        // Pricing and packages
        if (has("price", "pricing", "cost", "package", "budget", "দাম", "টাকা")) {
            return "Our photography packages can be tailored to your event, coverage duration and requirements. Please contact our team with your event date and location to discuss a personalised quote.";
        }

        // Booking
        if (has("booking", "book", "reserve", "availability", "available date")) {
            return "We would love to hear about your event! Please visit our Contact Us page and share your event date, venue and the photography services you need. Our team can then discuss availability with you.";
        }

        // Pre-wedding photography
        if (has("pre wedding", "prewedding", "engagement shoot", "couple shoot")) {
            return "Make your love story part of the memories. Our pre-wedding photography can capture natural moments, romantic portraits and creative couple shots. Contact us to discuss your preferred style and location.";
        }

        // Candid photography
        if (has("candid", "natural moments", "candid photo")) {
            return "Candid photography is all about capturing genuine emotions, spontaneous smiles and those little moments you may not even notice on the day. Ask us about candid coverage for your event.";
        }

        // Cinematic films
        if (has("cinematic", "wedding film", "wedding video", "videography", "video")) {
            return "A cinematic wedding film brings your special day back to life through meaningful moments, atmosphere and storytelling. Contact us to discuss video coverage for your celebration.";
        }

        // Event photography
        if (has("event photography", "birthday", "anniversary", "reception", "corporate event")) {
            return "Chirkut can help you preserve the memories of your special celebrations. Tell us what kind of event you are planning, along with the date and venue, so we can discuss suitable coverage.";
        }

        // Wedding photography
        if (has("wedding", "marriage", "বিয়ে", "বিবাহ")) {
            return "Every wedding has a unique story. From emotional rituals to joyful celebrations, wedding photography helps preserve the moments you will want to revisit for years. Contact us to discuss your wedding plans.";
        }

        // Services
        if (has("service", "services", "what do you offer", "what do you do")) {
            return "Our photography services include:\n\n• Wedding Photography\n• Candid Photography\n• Pre-Wedding Shoots\n• Cinematic Wedding Films\n• Event Photography\n\nWhich service would you like to know more about?";
        }

        // Portfolio and gallery
        if (has("portfolio", "gallery", "photos", "photographs", "sample work", "previous work")) {
            return "You can explore our website's gallery and portfolio to get an idea of our photography style. If you have a particular look in mind, tell us whether you prefer candid, traditional, romantic or cinematic photography.";
        }

        // Location
        if (has("location", "where are you", "area", "kolkata", "west bengal", "travel")) {
            return "Please share your event location with us. Our team can confirm whether coverage is available for your venue and whether any travel arrangements are needed.";
        }

        // Contact details
       ```javascript
// Contact details
if (
    has(
        "contact",
        "phone",
        "phone number",
        "mobile number",
        "email",
        "email address",
        "whatsapp",
        "contact details",
        "contact number",
        "reach you",
        "যোগাযোগ"
    )
) {
    return `📩 Contact Chirkut — Your Wedding Note

📞 Phone: +91 999999999
💬 WhatsApp: +91 999999999
✉️ Email: xyz123@gmail.com

Feel free to reach out to us for photography packages, wedding bookings, availability, or any other enquiries. We'd be happy to help you!`;
}

        }

        // About Chirkut
        if (has("about", "who are you", "chirkut")) {
            return "Chirkut — Your Wedding Note is focused on preserving meaningful celebrations through photography and visual storytelling. Explore our website to learn more about our work and services.";
        }

        // Thank you
        if (has("thank", "thanks", "ধন্যবাদ")) {
            return "You're very welcome! Thank you for considering Chirkut to capture your special moments.";
        }

        // Help
        if (has("help", "options", "what can i ask")) {
            return "I can help you explore:\n\n• Photography services\n• Wedding and pre-wedding shoots\n• Candid photography\n• Cinematic films\n• Packages and pricing enquiries\n• Booking and event locations\n• Contact information\n\nWhat would you like to know?";
        }

        // Default response
      
// Default response for unknown questions
return "Thank you for your question! ✨ I’d be happy to help you with your enquiry. I may not have the exact information you’re looking for right now, and I don’t want to give you incorrect details. Please explore our website or contact the Chirkut team for personalised assistance. We’ll be happy to help you make your special moments memorable! ❤️";

    }

    // Send a message
function showTypingIndicator() {
    const wrapper = document.createElement("div");
    wrapper.className = "message bot-message ai-typing";

    wrapper.innerHTML = `
        <span class="typing-robot">🤖</span>
        <span class="typing-content">
            <span class="typing-label">Chirkut AI is thinking</span>
            <span class="typing-dots">
                <i></i><i></i><i></i>
            </span>
        </span>
    `;

    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;

    return wrapper;
}

function sendMessage(value) {
    const message = value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";
    input.focus();

    const typingIndicator = showTypingIndicator();

    window.setTimeout(() => {
        typingIndicator.remove();
        addMessage(getReply(message), "bot");
    }, 1100);
}


    // Handle form submission
    form.addEventListener("submit", event => {
        event.preventDefault();
        sendMessage(input.value);
    });

    // Handle suggested question buttons
    suggestions.forEach(button => {
        button.addEventListener("click", () => {
            sendMessage(
                button.dataset.message || button.textContent
            );
        });
    });
});
