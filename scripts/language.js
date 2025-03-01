const programmingLanguages = {
    'python': {
        name: 'Python',
        icon: 'fab fa-python',
        description: 'A versatile, beginner-friendly programming language known for its simplicity and readability.',
        levels: {
            beginner: [
                {
                    name: 'Python Official Documentation',
                    url: 'https://docs.python.org/3/',
                    type: 'documentation',
                    platform: 'Python.org'
                },
                {
                    name: 'Python for Beginners',
                    url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
                    type: 'video',
                    platform: 'YouTube',
                    duration: '6 hours'
                },
                {
                    name: 'Python Crash Course',
                    url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
                    type: 'course',
                    platform: 'freeCodeCamp'
                }
            ],
            intermediate: [
                {
                    name: 'Python OOP Tutorial',
                    url: 'https://realpython.com/python3-object-oriented-programming/',
                    type: 'tutorial',
                    platform: 'Real Python'
                },
                {
                    name: 'Python Web Development with Django',
                    url: 'https://www.djangoproject.com/start/',
                    type: 'framework',
                    platform: 'Django'
                },
                {
                    name: 'Data Science with Python',
                    url: 'https://www.kaggle.com/learn/python',
                    type: 'course',
                    platform: 'Kaggle'
                }
            ],
            advanced: [
                {
                    name: 'Advanced Python Features',
                    url: 'https://docs.python.org/3/howto/functional.html',
                    type: 'documentation',
                    platform: 'Python.org'
                },
                {
                    name: 'Python Design Patterns',
                    url: 'https://python-patterns.guide/',
                    type: 'guide',
                    platform: 'Python Patterns'
                }
            ],
            expert: [
                {
                    name: 'Python Internals',
                    url: 'https://realpython.com/cpython-source-code-guide/',
                    type: 'deep-dive',
                    platform: 'Real Python'
                },
                {
                    name: 'Python Concurrency',
                    url: 'https://docs.python.org/3/library/concurrency.html',
                    type: 'documentation',
                    platform: 'Python.org'
                }
            ]
        },
        practice: [
            {
                name: 'Python Exercises',
                url: 'https://www.practicepython.org/',
                type: 'practice',
                difficulty: 'Mixed'
            },
            {
                name: 'Python Projects',
                url: 'https://github.com/practical-tutorials/project-based-learning#python',
                type: 'projects',
                platform: 'GitHub'
            }
        ],
        community: [
            {
                name: 'Python Discord',
                url: 'https://discord.gg/python',
                type: 'community'
            },
            {
                name: 'r/learnpython',
                url: 'https://www.reddit.com/r/learnpython/',
                type: 'forum'
            }
        ]
    },
    'javascript': {
        name: 'JavaScript',
        icon: 'fab fa-js',
        description: 'The programming language of the web, essential for front-end and modern full-stack development.',
        levels: {
            beginner: [
                {
                    name: 'JavaScript.info',
                    url: 'https://javascript.info/',
                    type: 'tutorial',
                    platform: 'JavaScript.info'
                },
                {
                    name: 'JavaScript Full Course',
                    url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
                    type: 'video',
                    platform: 'YouTube',
                    duration: '3 hours'
                },
                {
                    name: 'MDN JavaScript Guide',
                    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
                    type: 'documentation',
                    platform: 'MDN'
                }
            ],
            intermediate: [
                {
                    name: 'Modern JavaScript',
                    url: 'https://javascript.info/ui',
                    type: 'tutorial',
                    platform: 'JavaScript.info'
                },
                {
                    name: 'React Fundamentals',
                    url: 'https://react.dev/learn',
                    type: 'framework',
                    platform: 'React'
                },
                {
                    name: 'Node.js Basics',
                    url: 'https://nodejs.dev/learn',
                    type: 'runtime',
                    platform: 'Node.js'
                }
            ],
            advanced: [
                {
                    name: 'JavaScript Design Patterns',
                    url: 'https://addyosmani.com/resources/essentialjsdesignpatterns/book/',
                    type: 'book',
                    platform: 'Addy Osmani'
                },
                {
                    name: 'TypeScript Documentation',
                    url: 'https://www.typescriptlang.org/docs/',
                    type: 'documentation',
                    platform: 'TypeScript'
                }
            ],
            expert: [
                {
                    name: 'JavaScript Engine Internals',
                    url: 'https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e',
                    type: 'deep-dive',
                    platform: 'SessionStack'
                },
                {
                    name: 'Web Assembly with JavaScript',
                    url: 'https://developer.mozilla.org/en-US/docs/WebAssembly',
                    type: 'documentation',
                    platform: 'MDN'
                }
            ]
        },
        practice: [
            {
                name: 'JavaScript30',
                url: 'https://javascript30.com/',
                type: 'projects',
                difficulty: 'Intermediate'
            },
            {
                name: 'Exercism JavaScript Track',
                url: 'https://exercism.io/tracks/javascript',
                type: 'practice',
                platform: 'Exercism'
            }
        ],
        community: [
            {
                name: 'JavaScript Discord',
                url: 'https://discord.gg/javascript',
                type: 'community'
            },
            {
                name: 'r/javascript',
                url: 'https://www.reddit.com/r/javascript/',
                type: 'forum'
            }
        ]
    },
    'java': {
        name: 'Java',
        icon: 'fab fa-java',
        description: 'A powerful, object-oriented programming language used for enterprise applications and Android development.',
        levels: {
            beginner: [
                {
                    name: 'Java Official Documentation',
                    url: 'https://docs.oracle.com/javase/tutorial/',
                    type: 'documentation',
                    platform: 'Oracle'
                },
                {
                    name: 'Java Programming Basics',
                    url: 'https://www.udemy.com/course/java-tutorial/',
                    type: 'course',
                    platform: 'Udemy'
                },
                {
                    name: 'Java for Complete Beginners',
                    url: 'https://www.youtube.com/watch?v=eIrMbAQSU34',
                    type: 'video',
                    platform: 'YouTube',
                    duration: '12 hours'
                }
            ],
            intermediate: [
                {
                    name: 'Spring Framework',
                    url: 'https://spring.io/guides',
                    type: 'framework',
                    platform: 'Spring'
                },
                {
                    name: 'Java Collections Framework',
                    url: 'https://docs.oracle.com/javase/tutorial/collections/',
                    type: 'documentation',
                    platform: 'Oracle'
                },
                {
                    name: 'Java Multithreading',
                    url: 'https://www.baeldung.com/java-concurrency',
                    type: 'tutorial',
                    platform: 'Baeldung'
                }
            ],
            advanced: [
                {
                    name: 'Design Patterns in Java',
                    url: 'https://refactoring.guru/design-patterns/java',
                    type: 'tutorial',
                    platform: 'Refactoring Guru'
                },
                {
                    name: 'Advanced Java Programming',
                    url: 'https://www.oracle.com/java/technologies/javase/codeconventions-contents.html',
                    type: 'documentation',
                    platform: 'Oracle'
                }
            ],
            expert: [
                {
                    name: 'JVM Internals',
                    url: 'https://www.artima.com/insidejvm/ed2/',
                    type: 'book',
                    platform: 'Artima'
                },
                {
                    name: 'Java Performance',
                    url: 'https://www.oracle.com/java/technologies/performance.html',
                    type: 'documentation',
                    platform: 'Oracle'
                }
            ]
        },
        practice: [
            {
                name: 'Java Exercises',
                url: 'https://www.codewars.com/kata/search/java',
                type: 'practice',
                platform: 'Codewars'
            },
            {
                name: 'Spring Boot Projects',
                url: 'https://spring.io/guides#tutorials',
                type: 'projects',
                platform: 'Spring'
            }
        ],
        community: [
            {
                name: 'Java Discord',
                url: 'https://discord.gg/java',
                type: 'community'
            },
            {
                name: 'r/java',
                url: 'https://www.reddit.com/r/java/',
                type: 'forum'
            }
        ]
    },
    'cpp': {
        name: 'C++',
        icon: 'fas fa-code',
        description: 'A high-performance programming language used in system/software development, game development, and more.',
        levels: {
            beginner: [
                {
                    name: 'C++ Reference',
                    url: 'https://en.cppreference.com/w/',
                    type: 'documentation',
                    platform: 'CPP Reference'
                },
                {
                    name: 'C++ Programming Course',
                    url: 'https://www.learncpp.com/',
                    type: 'tutorial',
                    platform: 'LearnCpp'
                },
                {
                    name: 'C++ Video Tutorial',
                    url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
                    type: 'video',
                    platform: 'YouTube',
                    duration: '4 hours'
                }
            ],
            intermediate: [
                {
                    name: 'Modern C++',
                    url: 'https://microsoft.github.io/GSL/',
                    type: 'documentation',
                    platform: 'Microsoft'
                },
                {
                    name: 'Game Development with C++',
                    url: 'https://www.sfml-dev.org/tutorials/2.5/',
                    type: 'tutorial',
                    platform: 'SFML'
                }
            ],
            advanced: [
                {
                    name: 'C++ Templates',
                    url: 'https://en.cppreference.com/w/cpp/language/templates',
                    type: 'documentation',
                    platform: 'CPP Reference'
                },
                {
                    name: 'Effective Modern C++',
                    url: 'https://www.oreilly.com/library/view/effective-modern-c/9781491908419/',
                    type: 'book',
                    platform: "O'Reilly"
                }
            ],
            expert: [
                {
                    name: 'C++ Memory Model',
                    url: 'https://en.cppreference.com/w/cpp/language/memory_model',
                    type: 'documentation',
                    platform: 'CPP Reference'
                },
                {
                    name: 'Boost C++ Libraries',
                    url: 'https://www.boost.org/doc/',
                    type: 'documentation',
                    platform: 'Boost'
                }
            ]
        },
        practice: [
            {
                name: 'C++ Exercises',
                url: 'https://www.hackerrank.com/domains/cpp',
                type: 'practice',
                platform: 'HackerRank'
            },
            {
                name: 'Project Ideas',
                url: 'https://github.com/danistefanovic/build-your-own-x',
                type: 'projects',
                platform: 'GitHub'
            }
        ],
        community: [
            {
                name: 'C++ Discord',
                url: 'https://discord.gg/cpp',
                type: 'community'
            },
            {
                name: 'r/cpp',
                url: 'https://www.reddit.com/r/cpp/',
                type: 'forum'
            }
        ]
    },
    'csharp': {
        name: 'C#',
        icon: 'fab fa-microsoft',
        description: 'A versatile language for building Windows apps, web services, and game development with Unity.',
        levels: {
            beginner: [
                {
                    name: 'C# Documentation',
                    url: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
                    type: 'documentation',
                    platform: 'Microsoft'
                },
                {
                    name: 'C# Fundamentals',
                    url: 'https://www.youtube.com/watch?v=gfkTfcpWqAY',
                    type: 'video',
                    platform: 'YouTube',
                    duration: '8 hours'
                },
                {
                    name: 'C# Tutorial',
                    url: 'https://www.w3schools.com/cs/index.php',
                    type: 'tutorial',
                    platform: 'W3Schools'
                }
            ],
            intermediate: [
                {
                    name: 'ASP.NET Core',
                    url: 'https://learn.microsoft.com/en-us/aspnet/core/',
                    type: 'framework',
                    platform: 'Microsoft'
                },
                {
                    name: 'Unity Game Development',
                    url: 'https://learn.unity.com/',
                    type: 'tutorial',
                    platform: 'Unity'
                },
                {
                    name: 'LINQ Tutorial',
                    url: 'https://www.tutorialsteacher.com/linq',
                    type: 'tutorial',
                    platform: 'TutorialsTeacher'
                }
            ],
            advanced: [
                {
                    name: 'C# Advanced Concepts',
                    url: 'https://www.pluralsight.com/courses/csharp-advanced',
                    type: 'course',
                    platform: 'Pluralsight'
                },
                {
                    name: '.NET Architecture',
                    url: 'https://dotnet.microsoft.com/learn/dotnet/architecture-guides',
                    type: 'documentation',
                    platform: 'Microsoft'
                }
            ],
            expert: [
                {
                    name: 'C# Language Design',
                    url: 'https://github.com/dotnet/csharplang',
                    type: 'documentation',
                    platform: 'GitHub'
                },
                {
                    name: 'Advanced Patterns in C#',
                    url: 'https://www.dofactory.com/net/design-patterns',
                    type: 'tutorial',
                    platform: 'DoFactory'
                }
            ]
        },
        practice: [
            {
                name: 'C# Exercises',
                url: 'https://exercism.io/tracks/csharp',
                type: 'practice',
                platform: 'Exercism'
            },
            {
                name: 'Project Ideas',
                url: 'https://github.com/practical-tutorials/project-based-learning#cc-1',
                type: 'projects',
                platform: 'GitHub'
            }
        ],
        community: [
            {
                name: 'C# Discord',
                url: 'https://discord.gg/csharp',
                type: 'community'
            },
            {
                name: 'r/csharp',
                url: 'https://www.reddit.com/r/csharp/',
                type: 'forum'
            }
        ]
    },
    'ruby': {
        name: 'Ruby',
        icon: 'fas fa-gem',
        description: 'An elegant, dynamic programming language focused on simplicity and productivity.',
        levels: {
            beginner: [
                {
                    name: 'Ruby Documentation',
                    url: 'https://ruby-doc.org/',
                    type: 'documentation',
                    platform: 'Ruby-Doc'
                },
                {
                    name: 'Ruby in 20 Minutes',
                    url: 'https://www.ruby-lang.org/en/documentation/quickstart/',
                    type: 'quickstart',
                    platform: 'Ruby-Lang'
                },
                {
                    name: 'Learn Ruby',
                    url: 'https://www.codecademy.com/learn/learn-ruby',
                    type: 'course',
                    platform: 'Codecademy'
                }
            ],
            intermediate: [
                {
                    name: 'Ruby on Rails',
                    url: 'https://guides.rubyonrails.org/',
                    type: 'framework',
                    platform: 'Rails'
                },
                {
                    name: 'Ruby Best Practices',
                    url: 'https://rubystyle.guide/',
                    type: 'guide',
                    platform: 'Ruby Style Guide'
                }
            ],
            advanced: [
                {
                    name: 'Metaprogramming Ruby',
                    url: 'https://pragprog.com/titles/ppmetr2/',
                    type: 'book',
                    platform: 'Pragmatic Bookshelf'
                },
                {
                    name: 'Ruby Performance',
                    url: 'https://thoughtbot.com/blog/ruby-performance-optimization',
                    type: 'article',
                    platform: 'Thoughtbot'
                }
            ],
            expert: [
                {
                    name: 'Ruby Under a Microscope',
                    url: 'https://patshaughnessy.net/ruby-under-a-microscope',
                    type: 'book',
                    platform: 'Pat Shaughnessy'
                },
                {
                    name: 'Ruby Internals',
                    url: 'https://ruby-hacking-guide.github.io/',
                    type: 'guide',
                    platform: 'Ruby Hacking Guide'
                }
            ]
        },
        practice: [
            {
                name: 'Ruby Koans',
                url: 'http://rubykoans.com/',
                type: 'practice',
                platform: 'Ruby Koans'
            },
            {
                name: 'Ruby Projects',
                url: 'https://www.theodinproject.com/paths/full-stack-ruby-on-rails',
                type: 'projects',
                platform: 'The Odin Project'
            }
        ],
        community: [
            {
                name: 'Ruby Discord',
                url: 'https://discord.gg/ruby',
                type: 'community'
            },
            {
                name: 'r/ruby',
                url: 'https://www.reddit.com/r/ruby/',
                type: 'forum'
            }
        ]
    },
    'php': {
        name: 'PHP',
        icon: 'fab fa-php',
        description: 'A popular server-side scripting language for web development.',
        levels: {
            beginner: [
                {
                    name: 'PHP Manual',
                    url: 'https://www.php.net/manual/en/',
                    type: 'documentation',
                    platform: 'PHP.net'
                },
                {
                    name: 'PHP Tutorial',
                    url: 'https://www.w3schools.com/php/',
                    type: 'tutorial',
                    platform: 'W3Schools'
                },
                {
                    name: 'PHP for Beginners',
                    url: 'https://laracasts.com/series/php-for-beginners',
                    type: 'course',
                    platform: 'Laracasts'
                }
            ],
            intermediate: [
                {
                    name: 'Laravel Framework',
                    url: 'https://laravel.com/docs',
                    type: 'framework',
                    platform: 'Laravel'
                },
                {
                    name: 'Modern PHP',
                    url: 'https://phptherightway.com/',
                    type: 'guide',
                    platform: 'PHP The Right Way'
                },
                {
                    name: 'Composer Package Manager',
                    url: 'https://getcomposer.org/doc/',
                    type: 'documentation',
                    platform: 'Composer'
                }
            ],
            advanced: [
                {
                    name: 'PHP Design Patterns',
                    url: 'https://refactoring.guru/design-patterns/php',
                    type: 'tutorial',
                    platform: 'Refactoring Guru'
                },
                {
                    name: 'PHP Security',
                    url: 'https://phpsecurity.readthedocs.io/en/latest/',
                    type: 'guide',
                    platform: 'PHP Security Guide'
                }
            ],
            expert: [
                {
                    name: 'PHP Internals',
                    url: 'https://www.phpinternalsbook.com/',
                    type: 'book',
                    platform: 'PHP Internals Book'
                },
                {
                    name: 'High Performance PHP',
                    url: 'https://symfony.com/doc/current/performance.html',
                    type: 'documentation',
                    platform: 'Symfony'
                }
            ]
        },
        practice: [
            {
                name: 'PHP Exercises',
                url: 'https://www.hackerrank.com/domains/php',
                type: 'practice',
                platform: 'HackerRank'
            },
            {
                name: 'PHP Projects',
                url: 'https://github.com/practical-tutorials/project-based-learning#php',
                type: 'projects',
                platform: 'GitHub'
            }
        ],
        community: [
            {
                name: 'PHP Discord',
                url: 'https://discord.gg/php',
                type: 'community'
            },
            {
                name: 'r/PHP',
                url: 'https://www.reddit.com/r/PHP/',
                type: 'forum'
            }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const language = params.get('lang');

    if (language && programmingLanguages[language]) {
        loadLanguageContent(language);
    }

    // Handle skill level navigation
    const skillButtons = document.querySelectorAll('.skill-btn');
    skillButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.getAttribute('data-level');
            showResourceSection(level);
            
            // Update ARIA states
            skillButtons.forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
                btn.classList.remove('active');
            });
            button.setAttribute('aria-selected', 'true');
            button.classList.add('active');
        });
    });
});

function loadLanguageContent(languageId) {
    const language = programmingLanguages[languageId];
    
    // Update header with ARIA labels
    const iconContainer = document.querySelector('.language-icon');
    iconContainer.innerHTML = `<i class="${language.icon}" role="img" aria-label="${language.name} icon"></i>`;
    
    const title = document.querySelector('.language-title');
    title.textContent = language.name;
    document.title = `${language.name} Learning Path - SE Learning Hub`;
    
    const description = document.querySelector('.language-description');
    description.textContent = language.description;

    // Load resources for each level
    Object.keys(language.levels).forEach(level => {
        const resources = language.levels[level];
        const section = document.querySelector(`.resource-section[data-level="${level}"] .resources-grid`);
        
        section.innerHTML = resources.map(resource => `
            <div class="resource-card" role="article">
                <h4>${resource.name}</h4>
                <span class="platform" role="text">${resource.platform}</span>
                <span class="type" role="text">${resource.type}</span>
                ${resource.duration ? `<span class="duration" role="text">Duration: ${resource.duration}</span>` : ''}
                <a href="${resource.url}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="resource-link"
                   aria-label="Access ${resource.name} on ${resource.platform}">
                    <i class="fas fa-external-link-alt" aria-hidden="true"></i> Click Here to Access Resource
                </a>
            </div>
        `).join('');
    });

    // Load practice resources with enhanced accessibility
    const practiceGrid = document.querySelector('.practice-grid');
    practiceGrid.innerHTML = language.practice.map(practice => `
        <div class="practice-card" role="article">
            <h4>${practice.name}</h4>
            <span class="type" role="text">${practice.type}</span>
            ${practice.difficulty ? `<span class="difficulty" role="text">Difficulty: ${practice.difficulty}</span>` : ''}
            <a href="${practice.url}" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Start practicing ${practice.name} on ${practice.platform}">
               Start Practicing
            </a>
        </div>
    `).join('');

    // Load community resources with enhanced accessibility
    const communityGrid = document.querySelector('.community-grid');
    communityGrid.innerHTML = language.community.map(community => `
        <div class="community-card" role="article">
            <h4>${community.name}</h4>
            <span class="type" role="text">${community.type}</span>
            <a href="${community.url}" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Join ${community.name} community">
               Join Community
            </a>
        </div>
    `).join('');
}

function showResourceSection(level) {
    const sections = document.querySelectorAll('.resource-section');
    sections.forEach(section => {
        if (section.getAttribute('data-level') === level) {
            section.style.display = 'block';
            section.setAttribute('aria-hidden', 'false');
            section.style.animation = 'slideIn 0.5s ease-out';
        } else {
            section.style.display = 'none';
            section.setAttribute('aria-hidden', 'true');
        }
    });
}