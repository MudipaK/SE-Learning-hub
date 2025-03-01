document.addEventListener('DOMContentLoaded', () => {
    // Initialize interview content
    const interviewData = {
        frontend: {
            title: 'Frontend Development',
            icon: 'desktop',
            topics: [
                {
                    title: 'UI Technologies',
                    items: ['HTML5/CSS3', 'JavaScript (ES6+)', 'DOM Manipulation', 'Browser APIs', 'Web Performance'],
                    resources: [
                        { name: 'Frontend Interview Handbook', url: '#' },
                        { name: 'JavaScript Interview Questions', url: '#' },
                        { name: 'CSS Tricks - Interview Guide', url: '#' }
                    ]
                },
                {
                    title: 'Frontend Frameworks',
                    items: ['React/Vue/Angular', 'State Management', 'Component Design', 'Testing Libraries', 'Build Tools'],
                    resources: [
                        { name: 'React Interview Questions', url: '#' },
                        { name: 'Frontend System Design', url: '#' },
                        { name: 'Web Performance Patterns', url: '#' }
                    ]
                }
            ]
        },
        backend: {
            title: 'Backend Development',
            icon: 'server',
            topics: [
                {
                    title: 'Server Technologies',
                    items: ['API Design', 'Database Design', 'Authentication/Authorization', 'Caching', 'Message Queues'],
                    resources: [
                        { name: 'System Design Interview', url: '#' },
                        { name: 'Database Interview Questions', url: '#' },
                        { name: 'API Design Patterns', url: '#' }
                    ]
                },
                {
                    title: 'Backend Concepts',
                    items: ['Microservices', 'Distributed Systems', 'Security', 'Scalability', 'Cloud Services'],
                    resources: [
                        { name: 'Microservices Architecture', url: '#' },
                        { name: 'Security Best Practices', url: '#' },
                        { name: 'Cloud Platform Questions', url: '#' }
                    ]
                }
            ]
        },
        fullstack: {
            title: 'Full Stack Development',
            icon: 'layer-group',
            topics: [
                {
                    title: 'Full Stack Architecture',
                    items: ['End-to-End Application Design', 'RESTful Architecture', 'GraphQL', 'WebSocket Integration', 'Progressive Web Apps'],
                    resources: [
                        { name: 'Full Stack Open Course', url: 'https://fullstackopen.com/' },
                        { name: 'MERN Stack Guide', url: 'https://www.mongodb.com/mern-stack' },
                        { name: 'JAMStack Best Practices', url: 'https://jamstack.org/best-practices/' }
                    ],
                    commonQuestions: [
                        {
                            q: "What is the difference between client-side and server-side rendering?",
                            a: "Client-side rendering executes JavaScript in the browser to render content, while server-side rendering generates the full HTML on the server. CSR provides better interactivity and reduces server load, while SSR offers better SEO and initial page load."
                        },
                        {
                            q: "Explain the concept of REST and RESTful APIs",
                            a: "REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources, are stateless, and use standard data formats like JSON."
                        }
                    ]
                }
            ]
        },
        devops: {
            title: 'DevOps Engineering',
            icon: 'infinity',
            topics: [
                {
                    title: 'CI/CD & Infrastructure',
                    items: ['Container Orchestration', 'Infrastructure as Code', 'CI/CD Pipelines', 'Cloud Platforms', 'Monitoring & Logging'],
                    resources: [
                        { name: 'DevOps Roadmap', url: 'https://roadmap.sh/devops' },
                        { name: 'Kubernetes Learning Path', url: 'https://kubernetes.io/docs/tutorials/' },
                        { name: 'AWS DevOps Guide', url: 'https://aws.amazon.com/devops/' }
                    ]
                },
                {
                    title: 'DevOps Practices',
                    items: ['Git & Version Control', 'Configuration Management', 'Security Practices', 'Scalability Patterns', 'Incident Response'],
                    resources: [
                        { name: 'GitOps Principles', url: '#' },
                        { name: 'SRE Interview Preparation', url: '#' },
                        { name: 'Infrastructure Security', url: '#' }
                    ]
                }
            ]
        },
        mobile: {
            title: 'Mobile Development',
            icon: 'mobile-alt',
            topics: [
                {
                    title: 'Mobile Fundamentals',
                    items: ['Native Development', 'Cross-Platform Frameworks', 'Mobile UI/UX', 'App Lifecycle', 'Performance Optimization'],
                    resources: [
                        { name: 'React Native Documentation', url: 'https://reactnative.dev/' },
                        { name: 'Flutter Dev Guide', url: 'https://flutter.dev/docs' },
                        { name: 'iOS Development Guide', url: 'https://developer.apple.com/documentation/' }
                    ]
                },
                {
                    title: 'Mobile Architecture',
                    items: ['State Management', 'Offline Storage', 'Push Notifications', 'API Integration', 'Mobile Security'],
                    resources: [
                        { name: 'Mobile Architecture Patterns', url: '#' },
                        { name: 'Mobile Testing Strategies', url: '#' },
                        { name: 'App Store Guidelines', url: '#' }
                    ]
                }
            ]
        },
        quickNotes: {
            title: 'Quick Reference Notes',
            icon: 'book',
            topics: [
                {
                    title: 'SQL Fundamentals',
                    items: [
                        'SELECT, INSERT, UPDATE, DELETE basics',
                        'JOINs (INNER, LEFT, RIGHT, FULL)',
                        'GROUP BY and HAVING clauses',
                        'Indexes and Performance',
                        'Transactions (ACID properties)'
                    ],
                    notes: [
                        "ACID: Atomicity (all or nothing), Consistency (valid states), Isolation (concurrent transactions), Durability (permanent changes)",
                        "Index Types: B-tree (default), Hash (equality), GiST (geometry), Full-text",
                        "Normalization Forms: 1NF (atomic values), 2NF (single-column key), 3NF (no transitive dependencies)"
                    ],
                    resources: [
                        { name: 'SQL Practice Problems', url: 'https://leetcode.com/problemset/database/' },
                        { name: 'SQL Performance Tuning', url: 'https://use-the-index-luke.com/' }
                    ]
                },
                {
                    title: 'OOP Concepts',
                    items: [
                        'Encapsulation',
                        'Inheritance',
                        'Polymorphism',
                        'Abstraction',
                        'Design Patterns'
                    ],
                    notes: [
                        "SOLID Principles: Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion",
                        "Common Design Patterns: Factory, Singleton, Observer, Strategy, Command",
                        "Composition vs Inheritance: Favor composition for flexibility"
                    ],
                    resources: [
                        { name: 'Design Patterns Guide', url: 'https://refactoring.guru/design-patterns' },
                        { name: 'SOLID Principles', url: 'https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design' }
                    ]
                },
                {
                    title: 'System Design',
                    items: [
                        'Scalability',
                        'Load Balancing',
                        'Caching',
                        'Database Sharding',
                        'Microservices'
                    ],
                    notes: [
                        "Vertical vs Horizontal Scaling: Adding power vs adding more machines",
                        "Cache Strategies: Write-through, Write-back, Cache-aside",
                        "CAP Theorem: Consistency, Availability, Partition Tolerance (pick 2)"
                    ],
                    resources: [
                        { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
                        { name: 'Distributed Systems', url: 'https://martinfowler.com/articles/patterns-of-distributed-systems/' }
                    ]
                },
                {
                    title: 'Data Structures',
                    items: [
                        'Arrays & Strings',
                        'LinkedList & Trees',
                        'Hash Tables',
                        'Graphs',
                        'Heaps'
                    ],
                    notes: [
                        "Time Complexity: O(1) < O(log n) < O(n) < O(n log n) < O(n²)",
                        "Space-Time Tradeoff: Hash tables use more space for O(1) lookups",
                        "Binary Trees: BST operations average O(log n), worst O(n)"
                    ],
                    resources: [
                        { name: 'DS Visualizations', url: 'https://visualgo.net/' },
                        { name: 'Practice Problems', url: 'https://leetcode.com/explore/learn/' }
                    ]
                }
            ]
        },
        mostAsked: {
            title: 'Most Asked Questions',
            icon: 'question-circle',
            topics: [
                {
                    title: 'Technical Questions',
                    items: [
                        'What happens when you type a URL in the browser?',
                        'Explain how HTTPS works',
                        'Describe the event loop in JavaScript',
                        'What are the differences between cookies and localStorage?',
                        'How does database indexing work?',
                        'Explain REST API principles',
                        'What is the difference between process and thread?',
                        'Explain CORS and how to handle it',
                        'What is dependency injection?',
                        'Explain the differences between SQL and NoSQL'
                    ],
                    answers: [
                        {
                            q: "What happens when you type a URL in the browser?",
                            a: "1. DNS lookup to find IP address\n2. TCP connection established\n3. HTTPS handshake if secure\n4. HTTP request sent\n5. Server processes request\n6. Response received\n7. Browser renders page\n8. DOM construction and CSSOM creation\n9. JavaScript execution\n10. Final rendering"
                        },
                        {
                            q: "Explain how HTTPS works",
                            a: "1. Client sends 'hello' with supported cipher suites\n2. Server responds with certificate and chosen cipher\n3. Client verifies certificate authenticity\n4. Key exchange using asymmetric encryption\n5. Session keys generated for symmetric encryption\n6. Secure communication begins using faster symmetric encryption\n7. All data is encrypted and integrity-checked"
                        },
                        {
                            q: "Describe the event loop in JavaScript",
                            a: "The event loop manages execution in JavaScript:\n1. Call stack executes synchronous code\n2. Web APIs handle async operations\n3. Callback queue holds completed async callbacks\n4. Microtask queue (promises) has higher priority\n5. Event loop checks if call stack is empty\n6. Processes microtasks first\n7. Then processes callback queue\n8. Ensures non-blocking async operations"
                        },
                        {
                            q: "What are the differences between cookies and localStorage?",
                            a: "Key differences:\n1. Size: Cookies ~4KB, localStorage ~5-10MB\n2. Expiration: Cookies can be set to expire, localStorage persists\n3. Server Access: Cookies sent with requests, localStorage is client-only\n4. Security: Cookies can be httpOnly for XSS protection\n5. Usage: Cookies for server-side, localStorage for client data\n6. API: Cookies more complex, localStorage simple key-value"
                        },
                        {
                            q: "How does database indexing work?",
                            a: "Database indexing process:\n1. Creates separate data structure (B-tree common)\n2. Stores ordered references to rows\n3. Speeds up search/sort operations\n4. Trade-off: Slower writes for faster reads\n5. Primary vs Secondary indexes\n6. Covering indexes include all query data\n7. Consider: Column selectivity and query patterns\n8. Composite indexes for multiple columns"
                        },
                        {
                            q: "Explain REST API principles",
                            a: "REST principles include:\n1. Stateless: No client state stored on server\n2. Client-Server: Separation of concerns\n3. Cacheable: Responses must be cacheable\n4. Uniform Interface: Standard methods (GET, POST, etc.)\n5. Layered System: Intermediary servers allowed\n6. Resource-Based: URLs identify resources\n7. Response formats (JSON/XML)\n8. HTTP status codes for responses"
                        },
                        {
                            q: "What is the difference between process and thread?",
                            a: "Process vs Thread:\n1. Process: Independent program with own memory\n2. Thread: Lightweight unit within process\n3. Memory: Processes don't share, threads do\n4. Communication: IPC for process, direct for threads\n5. Creation: Processes heavier, threads lighter\n6. Isolation: Processes isolated, threads share\n7. Fault: Process fault isolated, thread affects process"
                        },
                        {
                            q: "Explain CORS and how to handle it",
                            a: "Cross-Origin Resource Sharing:\n1. Security feature blocking cross-origin requests\n2. Server sets Access-Control-Allow-Origin header\n3. Simple vs Preflighted requests\n4. OPTIONS request for complex cases\n5. Credentials handling with withCredentials\n6. Common headers needed:\n   - Access-Control-Allow-Methods\n   - Access-Control-Allow-Headers\n7. Handle in server configuration"
                        }
                    ]
                },
                {
                    title: 'System Design Questions',
                    items: [
                        'Design a URL shortening service',
                        'How would you design Twitter?',
                        'Design a distributed cache',
                        'How would you implement a chat system?',
                        'Design a video streaming service'
                    ],
                    answers: [
                        {
                            q: "Design a URL shortening service",
                            a: "Key components and considerations:\n1. API Design:\n   - POST /shorten for new URLs\n   - GET /{code} for redirection\n2. URL Generation:\n   - Hash function or incremental ID\n   - Base62 encoding for short URLs\n3. Storage:\n   - Key-value store for URLs\n   - Caching layer for popular URLs\n4. Scale Considerations:\n   - Load balancing\n   - Database sharding\n5. Additional Features:\n   - Analytics\n   - Custom URLs\n   - Expiration"
                        },
                        {
                            q: "How would you design Twitter?",
                            a: "Twitter system design:\n1. Core Features:\n   - Tweet posting\n   - Timeline generation\n   - Following mechanism\n2. Data Model:\n   - Users, Tweets, Following\n   - Timeline cache\n3. Scale Solutions:\n   - Fan-out on write/read\n   - Redis for timeline cache\n   - Sharding by user ID\n4. Additional Systems:\n   - Search indexing\n   - Media storage\n   - Notification system"
                        }
                    ]
                },
                {
                    title: 'Behavioral Questions',
                    items: [
                        'Describe a challenging project you worked on',
                        'How do you handle conflicts in a team?',
                        'Tell me about a time you failed and learned from it',
                        'How do you stay updated with new technologies?',
                        'How do you handle tight deadlines?',
                        'Describe a time you improved a process',
                        'How do you mentor junior developers?',
                        'Tell me about a major technical decision you made'
                    ],
                    tips: [
                        "Use STAR method: Situation, Task, Action, Result",
                        "Be specific with examples",
                        "Focus on positive outcomes and learning",
                        "Show growth mindset and adaptability",
                        "Emphasize teamwork and communication",
                        "Quantify results when possible",
                        "Highlight leadership and initiative",
                        "Show problem-solving approach"
                    ],
                    answers: [
                        {
                            q: "How do you handle conflicts in a team?",
                            a: "Effective conflict resolution approach:\n1. Listen actively to all perspectives\n2. Identify the root cause objectively\n3. Focus on issues, not personalities\n4. Propose solutions that benefit the team\n5. Document agreements and follow up\n6. Learn from the experience\n7. Maintain professional relationships\n8. Escalate appropriately if needed"
                        },
                        {
                            q: "How do you stay updated with new technologies?",
                            a: "Technology learning strategy:\n1. Regular reading of tech blogs and news\n2. Following industry leaders on social media\n3. Participating in online communities\n4. Taking online courses and certifications\n5. Building side projects\n6. Attending conferences and meetups\n7. Contributing to open source\n8. Sharing knowledge with team members"
                        }
                    ]
                }
            ]
        }
    };

    const categoryButtons = document.querySelectorAll('.category-btn');
    const interviewContent = document.querySelector('.interview-content');

    function createTopicElement(topic) {
        return `
            <div class="topic">
                <div class="topic-header">
                    <h3>${topic.title}</h3>
                </div>
                <ul class="topic-items">
                    ${topic.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
                ${topic.notes ? `
                    <div class="quick-notes">
                        <h4>Quick Notes:</h4>
                        <ul>
                            ${topic.notes.map(note => `<li>${note}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${topic.answers ? `
                    <div class="common-answers">
                        <h4>Detailed Answers:</h4>
                        ${topic.answers.map(qa => `
                            <div class="qa-item">
                                <h5>${qa.q}</h5>
                                <p>${qa.a}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${topic.tips ? `
                    <div class="interview-tips">
                        <h4>Interview Tips:</h4>
                        <ul>
                            ${topic.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="resources">
                    <h4>Recommended Resources:</h4>
                    <ul>
                        ${topic.resources.map(resource => 
                            `<li><a href="${resource.url}" target="_blank">${resource.name}</a></li>`
                        ).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    function loadInterviewContent(category) {
        const data = interviewData[category];
        if (!data) return;

        const content = `
            <div class="interview-section" id="${category}-interview">
                <h2><i class="fas fa-${data.icon}"></i> ${data.title}</h2>
                <div class="interview-topics">
                    ${data.topics.map(topic => createTopicElement(topic)).join('')}
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = content;
        
        // Replace existing content
        const existingSection = document.querySelector('.interview-section.active');
        if (existingSection) {
            existingSection.classList.remove('active');
        }
        
        const newSection = container.firstElementChild;
        newSection.classList.add('active');
        interviewContent.appendChild(newSection);
    }

    // Event listeners for category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.dataset.category;
            if (category !== 'general') {
                loadInterviewContent(category);
            } else {
                // Show default general section
                document.querySelectorAll('.interview-section').forEach(section => {
                    section.classList.remove('active');
                });
                document.getElementById('general-interview').classList.add('active');
            }
        });
    });

    // Handle mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Scroll to top functionality
    const scrollTopButton = document.querySelector('.scroll-top');
    if (scrollTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });

        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Handle category switching
    const sections = document.querySelectorAll('.interview-section');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding section
            const category = button.dataset.category;
            const targetSection = document.getElementById(`${category}-interview`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Handle deep linking
    const handleDeepLink = () => {
        const hash = window.location.hash;
        if (hash) {
            const category = hash.replace('#', '').replace('-interview', '');
            const targetButton = document.querySelector(`[data-category="${category}"]`);
            if (targetButton) {
                targetButton.click();
                setTimeout(() => {
                    window.scrollTo({
                        top: document.querySelector('.interview-categories').offsetTop - 100,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    };

    window.addEventListener('hashchange', handleDeepLink);
    handleDeepLink();
});