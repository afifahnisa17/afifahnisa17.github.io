// 1. Navigation Logic
function show(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');
}

// 2. Typed.js - AI/Data Roles
new Typed('#typed', {
    strings: [
        'WEB DEVELOPER',
        'AI/ML ENGINEER',
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    smartBackspace: true
});

// 3. Theme Toggle (Day/Night)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlRoot = document.documentElement;

themeToggle.addEventListener('click', () => {
    if (htmlRoot.getAttribute('data-theme') === 'dark') {
        htmlRoot.removeAttribute('data-theme');
        themeIcon.innerText = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        htmlRoot.setAttribute('data-theme', 'dark');
        themeIcon.innerText = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// Sync Theme on Load
if (localStorage.getItem('theme') === 'dark') {
    htmlRoot.setAttribute('data-theme', 'dark');
    themeIcon.innerText = '☀️';
}

// 5. Filter proyek
function createProjectThumbnail(project) {
    if (project.image) {
        return project.image;
    }

    const safeTitle = project.title.replace(/[&<>]/g, '').trim();
    const safeTag = project.category.replace(/[&<>]/g, '').trim();
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 720" role="img" aria-label="${safeTitle}">
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#1A3C34"/>
                    <stop offset="55%" stop-color="#3E6B5E"/>
                    <stop offset="100%" stop-color="#FF6B6B"/>
                </linearGradient>
                <radialGradient id="glow" cx="35%" cy="25%" r="65%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.22)"/>
                    <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                </radialGradient>
            </defs>
            <rect width="960" height="720" fill="url(#bg)"/>
            <rect width="960" height="720" fill="url(#glow)"/>
            <circle cx="790" cy="140" r="90" fill="rgba(255,255,255,0.12)"/>
            <circle cx="180" cy="560" r="150" fill="rgba(255,255,255,0.08)"/>
            <rect x="72" y="76" width="816" height="568" rx="42" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.22)"/>
            <text x="120" y="172" fill="#F7FFF9" font-family="JetBrains Mono, monospace" font-size="34" font-weight="700">${safeTag}</text>
            <text x="120" y="252" fill="#F7FFF9" font-family="JetBrains Mono, monospace" font-size="60" font-weight="700">${safeTitle}</text>
            <text x="120" y="338" fill="rgba(247,255,249,0.92)" font-family="JetBrains Mono, monospace" font-size="28">Project thumbnail</text>
            <rect x="120" y="408" width="240" height="16" rx="8" fill="rgba(247,255,249,0.68)"/>
            <rect x="120" y="446" width="360" height="16" rx="8" fill="rgba(247,255,249,0.48)"/>
            <rect x="120" y="484" width="280" height="16" rx="8" fill="rgba(247,255,249,0.32)"/>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderProjects(filter = 'All') {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = ''; // Kosongkan grid

    const filtered = filter === 'All' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    filtered.forEach(project => {
        const card = `
            <article class="dense-card">
                <div class="card-image-container">
                    <img src="${createProjectThumbnail(project)}" alt="${project.title}" class="project-img" loading="lazy">
                </div>
                <div class="card-badges">
                    <span class="badge badge--type">${project.tag}</span>
                    <span class="badge badge--category">${project.category}</span>
                </div>
                <div class="card-header">
                    <h3>${project.title}</h3>
                    <p class="sub-text">${project.subText}</p>
                </div>
                <details class="project-details">
                    <summary class="project-summary">Baca selengkapnya</summary>
                    <div class="details-content">
                        <ul class="card-list card-list--compact">
                            ${project.points.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                        <p class="tools-inline"><strong>Tools:</strong> ${project.tools}</p>
                        <div class="project-links">
                            <a href="${project.link}" target="_blank" class="github-link project-link-btn">Lihat proyek</a>
                            <a href="${project.doc}" target="_blank" class="github-link project-link-btn">Dokumentasi</a>
                        </div>
                    </div>
                </details>
            </article>
        `;
        grid.innerHTML += card;
    });
}


// Fungsi Filter
function filterProjects(category) {
    // Update button active state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        
        // Ambil teks tombol dan sesuaikan dengan argumen category
        // Menggunakan perbandingan sederhana yang lebih aman
        if (btn.getAttribute('onclick').includes(`'${category}'`)) {
            btn.classList.add('active');
        }
    });
    
    renderProjects(category);
}

// Panggil render pertama kali saat file di-load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});

// Handle details toggle - hanya satu project bisa buka sekaligus
document.addEventListener('toggle', (event) => {
    if (!event.target.classList.contains('project-details')) {
        return;
    }

    const currentDetails = event.target;
    const currentCard = currentDetails.closest('.dense-card');

    if (currentDetails.open) {
        // Tutup semua details yang lain
        document.querySelectorAll('.project-details[open]').forEach((details) => {
            if (details !== currentDetails) {
                details.removeAttribute('open');
                details.closest('.dense-card')?.classList.remove('is-expanded');
            }
        });
        currentCard?.classList.add('is-expanded');
    } else {
        currentCard?.classList.remove('is-expanded');
    }
}, true);

function show(id) {
    // 1. Sembunyikan semua section dulu
    document.querySelectorAll('.section').forEach(s => {
        s.style.display = 'none';
    });

    // 2. Munculkan yang dipilih dengan tipe display yang benar
    const target = document.getElementById(id);
    if (id === 'home') {
        target.style.display = 'flex'; // Agar tetap di tengah
    } else {
        target.style.display = 'block'; // Agar bisa memanjang ke bawah
    }

    // 3. Update status tombol di Navbar
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + id).classList.add('active');

    document.querySelector('.main-window').scrollTop = 0;
}

// Jalankan Home pertama kali
document.addEventListener('DOMContentLoaded', () => {
    show('home');
    renderProjects();
});