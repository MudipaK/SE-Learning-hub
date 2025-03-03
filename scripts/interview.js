document.addEventListener('DOMContentLoaded', () => {
    // Initialize interview content
    const interviewData = {
        general: {
            title: 'General Software Engineering',
            icon: 'code',
            topics: [
                // ...existing topics...
            ]
        },
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
                // ...other quick notes topics...
            ]
        },
        mostAsked: {
            title: 'Most Asked Questions',
            icon: 'question-circle',
            topics: [
                // ...existing topics...
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

    function loadInterviewContent(category, shouldScroll = true) {
        const data = interviewData[category];
        if (!data) return;

        // Remove any previously dynamically loaded content
        const dynamicSections = document.querySelectorAll('.interview-section.dynamic-content');
        dynamicSections.forEach(section => section.remove());

        const content = `
            <div class="interview-section dynamic-content" id="${category}-interview">
                <h2><i class="fas fa-${data.icon}"></i> ${data.title}</h2>
                <div class="interview-topics">
                    ${data.topics.map(topic => createTopicElement(topic)).join('')}
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = content;
        
        // Hide all sections
        const allSections = document.querySelectorAll('.interview-section');
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Add and activate the new section
        const newSection = container.firstElementChild;
        newSection.classList.add('active');
        interviewContent.appendChild(newSection);

        // Update URL for deep linking (optional)
        if (shouldScroll) {
            history.replaceState(null, null, `#${category}-interview`);
            // Scroll to content
            newSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Switch to a specific category
    function switchToCategory(category, shouldScroll = true) {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to the selected button
        const targetButton = document.querySelector(`.category-btn[data-category="${category}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        // Find section or load content as needed
        const existingSection = document.getElementById(`${category}-interview`);
        
        if (existingSection) {
            // Hide all sections
            document.querySelectorAll('.interview-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            existingSection.classList.add('active');
            
            // Update URL and scroll if needed
            if (shouldScroll) {
                history.replaceState(null, null, `#${category}-interview`);
                existingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // Load dynamically for categories that need it
            loadInterviewContent(category, shouldScroll);
        }
    }

    // Event listeners for category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            switchToCategory(category);
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

    // Handle deep linking and URL parameters
    const handleDeepLink = () => {
        const hash = window.location.hash;
        if (hash) {
            const sectionId = hash.replace('#', '');
            const category = sectionId.replace('-interview', '');
            
            if (category) {
                switchToCategory(category, true);
            }
        } else {
            // Default to general if no hash
            switchToCategory('general', false);
        }
    };

    // Listen for direct navigation via hash changes
    window.addEventListener('hashchange', handleDeepLink);
    
    // Handle initial page load
    handleDeepLink();
    
    // Add support for search navigation - expose switchToCategory globally for search.js
    window.interviewNavigation = {
        switchToCategory: switchToCategory
    };
    
    // Export searchable content for the search feature
    if (window.searchableContentRegistry) {
        const interviewTopics = [];
        
        // Create searchable entries for all interview topics
        Object.entries(interviewData).forEach(([category, data]) => {
            // Add category itself
            interviewTopics.push({
                title: data.title,
                description: `Interview questions for ${data.title}`,
                url: `interview-prep.html#${category}-interview`,
                keywords: [data.title, category, 'interview', 'questions']
            });
            
            // Add individual topics
            data.topics.forEach(topic => {
                interviewTopics.push({
                    title: topic.title,
                    description: `${data.title}: ${topic.title}`,
                    url: `interview-prep.html#${category}-interview`,
                    keywords: [
                        topic.title,
                        ...topic.items,
                        data.title,
                        'interview'
                    ]
                });
            });
        });
        
        // Register with search
        window.searchableContentRegistry.registerContent('interview', interviewTopics);
    }
});