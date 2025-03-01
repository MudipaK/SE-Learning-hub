document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chat-bot-toggle');
    const chatbotWindow = document.getElementById('chat-bot-window');
    const closeChat = document.querySelector('.close-chat');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const questionButtons = document.querySelectorAll('.question-btn');

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
        if (!chatbotWindow.classList.contains('hidden')) {
            userInput.focus();
            // Add welcome message if chat is empty
            if (chatMessages.children.length === 0) {
                addMessage("Hello! I'm your AI assistant for software engineering questions. How can I help you today?", 'bot-message');
            }
        }
    });

    // Close chatbot window
    closeChat.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    // Handle predefined questions
    questionButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const question = button.textContent;
            addMessage(question, 'user-message');
            const botResponse = await getBotResponse(question);
            addMessage(botResponse, 'bot-message');
        });
    });

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

    // Knowledge base for common IT/Programming questions
    const knowledgeBase = {
        programming: {
            javascript: [
                "JavaScript is a programming language commonly used for web development",
                "Key concepts include variables, functions, objects, and asynchronous programming",
                "Popular frameworks include React, Vue, and Angular"
            ],
            python: [
                "Python is known for its simple, readable syntax",
                "Great for beginners and used in data science, web development, and automation",
                "Popular frameworks include Django and Flask"
            ],
            java: [
                "Java is a strongly typed, object-oriented programming language",
                "Used for Android development, enterprise applications, and more",
                "Features include platform independence and strong memory management"
            ],
            cpp: [
                "C++ is a powerful systems programming language",
                "Used in game development, embedded systems, and high-performance applications",
                "Features include object-oriented programming, templates, and direct memory management"
            ],
            csharp: [
                "C# is a modern, object-oriented language developed by Microsoft",
                "Popular for Windows applications, game development with Unity, and enterprise software",
                "Features include strong typing, LINQ, and extensive .NET framework support"
            ]
        },
        webdev: {
            frontend: [
                "Frontend development focuses on user interface and experience",
                "Key technologies: HTML, CSS, JavaScript",
                "Important concepts: responsive design, accessibility, performance"
            ],
            backend: [
                "Backend development handles server-side logic and databases",
                "Common technologies: Node.js, Python, Java, PHP",
                "Key concepts: APIs, databases, security"
            ]
        },
        databases: {
            sql: [
                "SQL is used for relational database management",
                "Common operations: SELECT, INSERT, UPDATE, DELETE",
                "Popular databases: MySQL, PostgreSQL, SQL Server"
            ],
            nosql: [
                "NoSQL databases are non-relational and more flexible",
                "Types include document, key-value, and graph databases",
                "Examples: MongoDB, Redis, Neo4j"
            ]
        },
        cloud: {
            aws: [
                "Amazon Web Services is a leading cloud platform",
                "Services include EC2, S3, Lambda, and many more",
                "Used for scalable, reliable cloud infrastructure"
            ],
            azure: [
                "Microsoft Azure offers comprehensive cloud solutions",
                "Popular for .NET integration and enterprise services",
                "Includes AI, IoT, and serverless computing options"
            ]
        },
        mobile: {
            android: [
                "Android development primarily uses Kotlin or Java",
                "Key concepts include Activities, Fragments, and Material Design",
                "Popular tools include Android Studio and Firebase"
            ],
            ios: [
                "iOS development uses Swift or Objective-C",
                "Key concepts include UIKit, SwiftUI, and App Store guidelines",
                "Development requires Xcode and macOS"
            ],
            crossPlatform: [
                "Cross-platform development allows writing code once for multiple platforms",
                "Popular frameworks include React Native, Flutter, and Xamarin",
                "Reduces development time but may have performance trade-offs"
            ]
        },
        devops: {
            concepts: [
                "DevOps combines development and operations practices",
                "Key concepts include CI/CD, automation, and monitoring",
                "Tools include Git, Jenkins, Docker, and Kubernetes"
            ],
            practices: [
                "Continuous Integration ensures code quality through automated testing",
                "Continuous Deployment automates application delivery",
                "Infrastructure as Code manages server configurations programmatically"
            ]
        },
        // Predefined answers for suggested questions
        predefined: {
            "How to learn JavaScript?": 
                "To learn JavaScript effectively:\n\n" +
                "1. Start with the basics: syntax, variables, data types\n" +
                "2. Learn DOM manipulation for web interaction\n" +
                "3. Practice with small projects like calculators or to-do apps\n" +
                "4. Study modern ES6+ features\n" +
                "5. Explore frameworks like React or Vue\n" +
                "6. Use resources like MDN, freeCodeCamp, and JavaScript.info",
            
            "Tell me about Python": 
                "Python is a versatile, high-level programming language known for:\n\n" +
                "• Simple, readable syntax making it beginner-friendly\n" +
                "• Powerful libraries for data science (NumPy, Pandas)\n" +
                "• Web development frameworks (Django, Flask)\n" +
                "• Strong in automation, AI, and machine learning\n" +
                "• Large, supportive community and extensive documentation\n" +
                "• Cross-platform compatibility",
            
            "Web development careers": 
                "Web development career paths include:\n\n" +
                "1. Frontend Developer: HTML, CSS, JavaScript (React, Angular, Vue)\n" +
                "2. Backend Developer: Server-side languages (Node.js, Python, Ruby)\n" +
                "3. Full Stack Developer: Both frontend and backend skills\n" +
                "4. DevOps Engineer: Deployment, CI/CD, infrastructure\n" +
                "5. UX/UI Developer: Design-oriented development\n\n" +
                "Entry-level roles typically require a portfolio of projects and fundamental web technologies knowledge.",
            
            "Best beginner projects": 
                "Great beginner coding projects:\n\n" +
                "1. Personal portfolio website\n" +
                "2. To-do list application\n" +
                "3. Weather app using public APIs\n" +
                "4. Simple calculator\n" +
                "5. Quiz or trivia game\n" +
                "6. Blog system with basic CRUD operations\n" +
                "7. Recipe finder app\n\n" +
                "These projects help practice fundamental concepts while building something useful for your portfolio."
        }
    };

    async function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let response = '';

        // Show typing indicator
        showTypingIndicator();

        // Check for predefined questions first
        for (const [question, answer] of Object.entries(knowledgeBase.predefined)) {
            if (userMessage === question) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                hideTypingIndicator();
                return answer;
            }
        }

        // Greetings
        const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
        const farewells = ['bye', 'goodbye', 'see you', 'see ya', 'good night', 'have a good day'];

        if (greetings.some(greeting => message.includes(greeting))) {
            const randomGreetings = [
                "Hello! How can I assist you today?",
                "Hi there! What would you like to learn about?",
                "Hey! I'm here to help you with your software engineering journey.",
                "Welcome! Feel free to ask me about programming, web development, or career advice."
            ];
            response = randomGreetings[Math.floor(Math.random() * randomGreetings.length)];
        }
        // Farewells
        else if (farewells.some(farewell => message.includes(farewell))) {
            const randomFarewells = [
                "Goodbye! Feel free to come back if you have more questions.",
                "See you later! Keep coding and learning!",
                "Take care! Don't forget to practice what you've learned.",
                "Bye! Remember, I'm here whenever you need programming help."
            ];
            response = randomFarewells[Math.floor(Math.random() * randomFarewells.length)];
        }
        // Programming languages
        else if (message.includes('javascript') || message.includes('js')) {
            response = knowledgeBase.programming.javascript.join('\n\n');
        } else if (message.includes('python')) {
            response = knowledgeBase.programming.python.join('\n\n');
        } else if (message.includes('java')) {
            response = knowledgeBase.programming.java.join('\n\n');
        } else if (message.includes('c++') || message.includes('cpp')) {
            response = knowledgeBase.programming.cpp.join('\n\n');
        } else if (message.includes('c#') || message.includes('csharp')) {
            response = knowledgeBase.programming.csharp.join('\n\n');
        } 
        // Web development
        else if (message.includes('frontend') || message.includes('front-end') || message.includes('front end')) {
            response = knowledgeBase.webdev.frontend.join('\n\n');
        } else if (message.includes('backend') || message.includes('back-end') || message.includes('back end')) {
            response = knowledgeBase.webdev.backend.join('\n\n');
        } 
        // Databases
        else if (message.includes('sql')) {
            response = knowledgeBase.databases.sql.join('\n\n');
        } else if (message.includes('nosql') || message.includes('mongodb')) {
            response = knowledgeBase.databases.nosql.join('\n\n');
        } 
        // Cloud
        else if (message.includes('aws') || message.includes('amazon')) {
            response = knowledgeBase.cloud.aws.join('\n\n');
        } else if (message.includes('azure') || message.includes('microsoft cloud')) {
            response = knowledgeBase.cloud.azure.join('\n\n');
        } 
        // Mobile
        else if (message.includes('android')) {
            response = knowledgeBase.mobile.android.join('\n\n');
        } else if (message.includes('ios') || message.includes('iphone')) {
            response = knowledgeBase.mobile.ios.join('\n\n');
        } else if (message.includes('react native') || message.includes('flutter') || message.includes('cross platform')) {
            response = knowledgeBase.mobile.crossPlatform.join('\n\n');
        } 
        // DevOps
        else if (message.includes('devops') || message.includes('ci/cd')) {
            response = knowledgeBase.devops.concepts.join('\n\n');
        }

        // Learning path recommendations
        if (message.includes('learn') || message.includes('study') || message.includes('course')) {
            if (message.includes('web') || message.includes('frontend') || message.includes('backend')) {
                response = "I recommend checking our Web Development learning path. You can find it in the Learning Paths section. It covers both frontend and backend development.";
            } else if (message.includes('algorithm') || message.includes('data structure')) {
                response = "Check out our Data Structures & Algorithms learning path. It's perfect for improving your problem-solving skills and preparing for technical interviews.";
            }
        }

        // Interview preparation
        if (message.includes('interview') || message.includes('prepare')) {
            response = "Visit our Interview Prep section! It contains comprehensive guides for technical interviews, including common questions and best practices.";
        }

        // Career guidance
        if (message.includes('career') || message.includes('job') || message.includes('work')) {
            if (message.includes('web')) {
                response = "For a web development career, I recommend:\n\n1. Start with our Web Development learning path\n2. Build a portfolio of projects\n3. Practice with our interview prep section\n4. Learn both frontend and backend technologies";
            } else if (message.includes('mobile')) {
                response = "For a mobile development career, consider:\n\n1. Choose between iOS, Android, or cross-platform development\n2. Follow our mobile development learning path\n3. Build sample mobile applications\n4. Learn about app store deployment processes";
            } else if (message.includes('devops')) {
                response = "For a DevOps career:\n\n1. Learn cloud platforms (AWS, Azure)\n2. Master CI/CD practices\n3. Study container technologies\n4. Practice infrastructure as code";
            }
        }

        // Project ideas
        if (message.includes('project') || message.includes('portfolio')) {
            if (message.includes('beginner')) {
                response = "Here are some beginner project ideas:\n\n1. Personal portfolio website\n2. To-do list application\n3. Weather app using public APIs\n4. Simple blog system\n5. Calculator with basic operations";
            } else if (message.includes('advanced')) {
                response = "Advanced project ideas:\n\n1. Full-stack e-commerce platform\n2. Real-time chat application\n3. Social media dashboard\n4. Project management system\n5. Mobile app with backend integration";
            }
        }

        // Resources and documentation
        if (message.includes('resource') || message.includes('documentation') || message.includes('tutorial')) {
            response = "Check out our learning paths section for structured resources. Each path includes:\n\n1. Official documentation\n2. Interactive tutorials\n3. Video courses\n4. Practice exercises\n5. Community forums";
        }

        // Default response if no specific match is found
        if (!response) {
            response = "I understand you're asking about " + message + ". You can ask about:\n\n1. Specific programming languages\n2. Web/Mobile development\n3. Cloud platforms\n4. Career guidance\n5. Project ideas\n6. Learning resources";
        }

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));
        hideTypingIndicator();
        
        return response;
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        typingIndicator.id = 'typing-indicator';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
});