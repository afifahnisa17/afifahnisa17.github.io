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
        'AI/ML ENGINEER',
        'DATA ANALYST',
        'BACKEND WEB DEVELOPER'
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

// 4. Custom Cursor & Data Trail
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    // Smooth cursor movement
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Random Binary Trail
    if (Math.random() > 0.88) {
        const trail = document.createElement('span');
        trail.className = 'data-trail';
        trail.innerText = Math.round(Math.random());
        trail.style.left = e.clientX + (Math.random() * 20 - 10) + 'px';
        trail.style.top = e.clientY + (Math.random() * 20 - 10) + 'px';
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 800);
    }
});

// Cursor Interactions
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Hover Effect on Interactive Elements
const interactiveElements = document.querySelectorAll('button, a, .dense-card, span');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderColor = 'var(--accent)';
        cursor.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '22px';
        cursor.style.height = '22px';
        cursor.style.backgroundColor = 'transparent';
    });
});


// 5. Filter proyek
function renderProjects(filter = 'All') {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = ''; // Kosongkan grid

    const filtered = filter === 'All' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    filtered.forEach(project => {
        const card = `
            <a href="${project.link}" target="_blank" class="dense-card">
                <div class="card-header">
                    <p class="tag">${project.tag}</p>
                    <h3>${project.title}</h3>
                    <p class="sub-text">${project.subText}</p>
                </div>
                <ul class="card-list">
                    ${project.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
                <div class="card-footer">
                    <p class="tools-text">Tools: ${project.tools}</p>
                </div>
            </a>
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