// =============================================
// APP.JS — Lógica do Portfólio
// =============================================
// Este arquivo busca dados da API Java e renderiza o HTML dinamicamente.
// Conceito principal: Fetch API (requisições HTTP do JavaScript ao backend)

// ---- CONFIGURAÇÃO ----
// Quando rodando com Docker, o nginx vai fazer proxy /api -> backend.
// Em desenvolvimento local sem Docker, aponte para http://localhost:8080
const API_BASE = '/api';

// =============================================
// INICIALIZAÇÃO
// Quando a página terminar de carregar, rodamos o init()
// =============================================
document.addEventListener('DOMContentLoaded', init);

async function init() {
    setupNavigation();
    setupMobileMenu();
    setupNowPlaying();

    // Carregamos os dados da API em paralelo (mais rápido)
    // Promise.all espera todas as promessas resolverem ao mesmo tempo
    try {
        const [projects, skills, about] = await Promise.all([
            fetchData('/projects'),
            fetchData('/skills'),
            fetchData('/about')
        ]);

        renderHeroCards();
        renderFeaturedProjects(projects);
        renderSkillsPreview(skills);
        renderAllProjects(projects);
        renderSkillsByCategory(skills);
        renderAbout(about);
        renderContact(about);
        renderPlaylistSidebar(projects);
        setNowPlaying(about);

        // Anima as barras de skill depois de um pequeno delay
        setTimeout(animateSkillBars, 500);

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showError();
    }
}

// =============================================
// FETCH — Busca dados da API
// =============================================
// async/await é açúcar sintático para Promises.
// "await" pausa a execução até a Promise resolver.
async function fetchData(endpoint) {
    const response = await fetch(`${API_BASE}${endpoint}`);

    // Se a resposta não for OK (200-299), lançamos um erro
    if (!response.ok) {
        throw new Error(`Erro ${response.status} em ${endpoint}`);
    }

    // .json() converte o texto da resposta para um objeto JavaScript
    return response.json();
}

// =============================================
// NAVEGAÇÃO — Troca de seções
// =============================================
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.dataset.section;

            // Remove 'active' de todos, adiciona só no clicado
            navItems.forEach(n => n.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(`section-${targetSection}`).classList.add('active');

            // Anima skills toda vez que a seção é visitada
            if (targetSection === 'skills') {
                setTimeout(animateSkillBars, 100);
            }

            // Fecha menu mobile ao navegar
            document.getElementById('sidebar').classList.remove('open');
        });
    });
}

// =============================================
// MENU MOBILE
// =============================================
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');

    btn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

// =============================================
// RENDER: HERO CARDS (atalhos rápidos no topo)
// =============================================
function renderHeroCards() {
    const cards = [
        { label: 'Projetos',  icon: '💻', color: '#2D46B9', section: 'projects' },
        { label: 'Skills',    icon: '⚡', color: '#8B5CF6', section: 'skills'   },
        { label: 'Sobre',     icon: '🎵', color: '#E91429', section: 'about'    },
        { label: 'Contato',   icon: '📬', color: '#1DB954', section: 'contact'  },
    ];

    const container = document.getElementById('hero-cards');
    container.innerHTML = cards.map(card => `
        <div class="hero-card" onclick="navigateTo('${card.section}')">
            <div class="hero-card-icon" style="background:${card.color}">
                ${card.icon}
            </div>
            <span>${card.label}</span>
        </div>
    `).join('');
}

// =============================================
// RENDER: PROJETOS EM DESTAQUE (Home)
// =============================================
function renderFeaturedProjects(projects) {
    const container = document.getElementById('featured-projects');
    const featured = projects.slice(0, 4); // Pega os 4 primeiros
    container.innerHTML = featured.map(p => createProjectCard(p)).join('');
}

// =============================================
// RENDER: TODOS OS PROJETOS
// =============================================
function renderAllProjects(projects) {
    const container = document.getElementById('all-projects');
    container.innerHTML = projects.map(p => createProjectCard(p)).join('');
}

// Cria o HTML de um card de projeto
function createProjectCard(project) {
    return `
        <div class="project-card" onclick="openProject('${project.githubUrl}')">
            <img class="card-cover"
                 src="${project.imageUrl}"
                 alt="${project.title}"
                 onerror="this.src='https://via.placeholder.com/300x300/282828/1DB954?text=${encodeURIComponent(project.title[0])}'"
            />
            <p class="card-title">${project.title}</p>
            <p class="card-description">${project.description}</p>
            <p class="card-tech">${project.techStack}</p>
            <button class="card-play-btn" onclick="event.stopPropagation(); openProject('${project.githubUrl}')">
                <i class="fab fa-github"></i>
            </button>
        </div>
    `;
}

// =============================================
// RENDER: SKILLS (Preview na Home)
// =============================================
function renderSkillsPreview(skills) {
    const container = document.getElementById('skills-preview');
    const preview = skills.slice(0, 6);
    container.innerHTML = preview.map(s => createSkillCard(s)).join('');
}

// =============================================
// RENDER: SKILLS AGRUPADAS POR CATEGORIA
// =============================================
function renderSkillsByCategory(skills) {
    const container = document.getElementById('skills-by-category');

    // Agrupa as skills por categoria usando reduce()
    // reduce() transforma um array em qualquer outra estrutura de dados
    const grouped = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    const icons = { Backend: '⚙️', Frontend: '🎨', DevOps: '🐳' };

    container.innerHTML = Object.entries(grouped).map(([category, categorySkills]) => `
        <div class="skills-category">
            <h3 class="skills-category-title">
                ${icons[category] || '🔧'} ${category}
            </h3>
            <div class="skills-grid">
                ${categorySkills.map(s => createSkillCard(s)).join('')}
            </div>
        </div>
    `).join('');
}

// Cria o HTML de um card de skill
function createSkillCard(skill) {
    return `
        <div class="skill-card">
            <div class="skill-header">
                <i class="devicon-${skill.icon}-plain skill-icon colored"></i>
                <span class="skill-name">${skill.name}</span>
            </div>
            <div class="skill-bar-container">
                <div class="skill-bar-fill" data-level="${skill.level}" style="width: 0%"></div>
            </div>
            <span class="skill-level-text">${getLevelLabel(skill.level)}</span>
        </div>
    `;
}

// Transforma número em texto descritivo
function getLevelLabel(level) {
    if (level >= 80) return 'Avançado';
    if (level >= 60) return 'Intermediário';
    if (level >= 40) return 'Em progresso';
    return 'Aprendendo';
}

// Anima as barras de progresso das skills
function animateSkillBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const level = bar.dataset.level;
        bar.style.width = level + '%';
    });
}

// =============================================
// RENDER: SOBRE (PERFIL)
// =============================================
function renderAbout(about) {
    const container = document.getElementById('about-profile');
    const initials = about.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    container.innerHTML = `
        <div class="about-banner"></div>
        <div class="about-info">
            <div class="about-avatar">${initials}</div>
            <h1 class="about-name">${about.name}</h1>
            <p class="about-role">${about.role}</p>
            <p class="about-location">
                <i class="fas fa-map-marker-alt"></i> ${about.location}
            </p>
            <p class="about-bio">${about.bio}</p>

            <div class="about-currently-playing">
                <p class="currently-playing-title">ATUALMENTE APRENDENDO</p>
                <ul class="currently-playing-list">
                    ${about.currentlyPlaying.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// =============================================
// RENDER: CONTATO
// =============================================
function renderContact(about) {
    const container = document.getElementById('contact-content');
    container.innerHTML = `
        <div class="contact-links">
            <a href="${about.githubUrl}" target="_blank" class="contact-link github">
                <i class="fab fa-github"></i>
                <div>
                    <div>GitHub</div>
                    <small style="color:var(--text-secondary)">Ver meus repositórios</small>
                </div>
            </a>
            <a href="${about.linkedinUrl}" target="_blank" class="contact-link linkedin">
                <i class="fab fa-linkedin"></i>
                <div>
                    <div>LinkedIn</div>
                    <small style="color:var(--text-secondary)">Conectar profissionalmente</small>
                </div>
            </a>
            <a href="mailto:${about.email}" class="contact-link email">
                <i class="fas fa-envelope"></i>
                <div>
                    <div>Email</div>
                    <small style="color:var(--text-secondary)">${about.email}</small>
                </div>
            </a>
        </div>
    `;
}

// =============================================
// RENDER: PLAYLIST NA SIDEBAR
// =============================================
function renderPlaylistSidebar(projects) {
    const list = document.getElementById('playlist-list');
    list.innerHTML = projects.map(p => `
        <li onclick="navigateTo('projects')">${p.title}</li>
    `).join('');
}

// =============================================
// NOW PLAYING BAR
// =============================================
function setNowPlaying(about) {
    document.getElementById('np-track-name').textContent = about.role;
    document.getElementById('np-artist').textContent = about.name;
}

function setupNowPlaying() {
    const playBtn = document.getElementById('np-play-btn');
    let playing = false;

    playBtn.addEventListener('click', () => {
        playing = !playing;
        playBtn.innerHTML = playing
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
    });

    // Simula barra de progresso girando
    animateProgress();
}

function animateProgress() {
    const fill = document.getElementById('progress-fill');
    const duration = document.getElementById('np-duration');
    const totalSeconds = 180; // 3 minutos simulados
    let current = 0;
    duration.textContent = '3:00';

    setInterval(() => {
        current = (current + 1) % totalSeconds;
        const percent = (current / totalSeconds) * 100;
        fill.style.width = percent + '%';

        const min = Math.floor(current / 60);
        const sec = current % 60;
        document.querySelector('.np-time').textContent =
            `${min}:${sec.toString().padStart(2, '0')}`;
    }, 1000);
}

// =============================================
// UTILITÁRIOS
// =============================================
function navigateTo(section) {
    const navItem = document.querySelector(`[data-section="${section}"]`);
    if (navItem) navItem.click();
}

function openProject(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    }
}

function showError() {
    const main = document.getElementById('main-content');
    const activeSection = main.querySelector('.section.active');
    if (activeSection) {
        activeSection.innerHTML = `
            <div style="padding:48px; text-align:center; color:var(--text-secondary)">
                <div style="font-size:3rem;margin-bottom:16px">⚠️</div>
                <h2>Erro ao conectar com a API</h2>
                <p>Certifique-se de que o backend Java está rodando.<br/>
                   Verifique o console para mais detalhes.</p>
            </div>
        `;
    }
}
