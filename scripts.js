// Custom SVG gaming keyboard cursor, angled 45deg, top-right as pointer, animated LED keys
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor-mouse';
    // SVG with more keys, 45deg rotation, and animated gradient for LED effect
    cursor.innerHTML = `
        <svg id="keyboard-cursor-svg" width="90" height="90" viewBox="0 0 80 80" style="transform: rotate(45deg) translate(18px, 21px) scale(0.575); filter: drop-shadow(0 0 8px #00fff7) drop-shadow(0 0 16px #00fff7);">
            <defs>
                <linearGradient id="led-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#00fff7">
                        <animate attributeName="stop-color" values="#00fff7;#ff00ea;#ffe600;#00fff7" dur="4s" repeatCount="indefinite"/>
                    </stop>
                    <stop offset="100%" stop-color="#ff00ea">
                        <animate attributeName="stop-color" values="#ff00ea;#ffe600;#00fff7;#ff00ea" dur="4s" repeatCount="indefinite"/>
                    </stop>
                </linearGradient>
                <filter id="neon-red-glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <!-- Keyboard body -->
            <rect x="4" y="16" width="72" height="40" rx="8" fill="#222" stroke="url(#led-gradient)" stroke-width="2"/>
            <!-- Keys: 4 rows, 9 columns (top row has 9 keys, not 10) -->
            <g>
                <!-- Row 1 (top row, 9 keys) -->
                <rect x="8" y="20" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="16" y="20" width="6" height="6" rx="1.5" fill="url(#led-gradient)"/>
                <rect x="24" y="20" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="32" y="20" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="40" y="20" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="48" y="20" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="56" y="20" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="64" y="20" width="6" height="6" rx="1.5" fill="url(#led-gradient)"/>
                <!-- Row 2 -->
                <rect x="10" y="28" width="6" height="6" rx="1.5" fill="url(#led-gradient)"/>
                <rect x="18" y="28" width="6" height="6" rx="1.5" fill="url(#led-gradient)"/>
                <rect x="26" y="28" width="6" height="6" rx="1.5" fill="url(#led-gradient)"/>
                <rect x="34" y="28" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="42" y="28" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="50" y="28" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="58" y="28" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="66" y="28" width="6" height="6" rx="1.5" fill="#444"/>
                <!-- Row 3 -->
                <rect x="12" y="36" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="20" y="36" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="28" y="36" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="36" y="36" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="44" y="36" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="52" y="36" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="60" y="36" width="6" height="6" rx="1.5" fill="#444"/>
                <!-- Row 4 (custom: 1 key, 1 long key, 1 key) -->
                <rect x="14" y="48" width="6" height="6" rx="1.5" fill="#444"/>
                <rect x="22" y="48" width="28" height="6" rx="2" fill="url(#led-gradient)"/>
                <rect x="52" y="48" width="6" height="6" rx="1.5" fill="#444"/>
            </g>
            <!-- Neon red pointer dot at the center (actual mouse position) -->
            <circle cx="40" cy="40" r="3" fill="#ff0040" filter="url(#neon-red-glow)" opacity="0.9" style="transform: translate(-36px, -24px);">
                <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
            </circle>
        </svg>
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        // Position the red dot exactly where the actual mouse pointer is
        cursor.style.position = 'fixed';
        cursor.style.left = (e.clientX - 40) + 'px';  // Adjust to center the dot at mouse position
        cursor.style.top = (e.clientY - 40) + 'px';   // Adjust to center the dot at mouse position
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = 9999;
    });
    // Cursor grows on link hover
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.2)', '');
        });
    });
});

// Generate animated stars in black gradient areas
function createStars() {
    const starCount = 50; // Total stars for both sides
    const leftStars = Math.floor(starCount / 2);
    const rightStars = starCount - leftStars;
    
    // Create stars for left side
    for (let i = 0; i < leftStars; i++) {
        createStar('left');
    }
    
    // Create stars for right side  
    for (let i = 0; i < rightStars; i++) {
        createStar('right');
    }
}

function createStar(side) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random color selection
    const colors = ['white', 'red', 'yellow', 'purple', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    star.classList.add(randomColor);
    
    // Position stars only in black gradient areas
    if (side === 'left') {
        // Left side: position within first 18vw where gradient goes from black to transparent
        star.style.left = Math.random() * 12 + 'vw'; // 0-12vw (mostly black area)
    } else {
        // Right side: position within last 18vw where gradient goes from transparent to black
        star.style.right = Math.random() * 12 + 'vw'; // 0-12vw from right edge
    }
    
    // Get header height to avoid placing stars in header area
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 120; // fallback to 120px
    
    // Random vertical position below header
    const minTop = headerHeight + 20; // 20px buffer below header
    const maxTop = window.innerHeight - 50; // 50px buffer from bottom
    star.style.top = (minTop + Math.random() * (maxTop - minTop)) + 'px';
    
    // Random size for variety
    const size = Math.random() * 3 + 1; // 1-4px
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    // Random animation delay and duration for organic feel
    const delay = Math.random() * 4; // 0-4s delay
    const duration = Math.random() * 3 + 2; // 2-5s duration
    
    // Apply delay only to twinkling, not movement
    star.style.animationDelay = delay + 's';
    star.style.animationDuration = duration + 's';
    
    // Random initial opacity
    star.style.opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8
    
    // Add the twinkling animation
    star.classList.add('star-twinkle');
    
    // Add horizontal movement based on side (starts immediately)
    if (side === 'left') {
        star.classList.add('star-move-left');
    } else {
        star.classList.add('star-move-right');
    }
    
    document.body.appendChild(star);
    
    // Respawn stars when they move off screen or after animation cycle
    const moveTimeout = 35000; // 35 seconds for movement animation
    setTimeout(() => {
        if (star.parentNode) {
            star.remove();
            createStar(side);
        }
    }, Math.min(moveTimeout, (delay + duration + Math.random() * 10) * 1000));
}

// Initialize stars when page loads
document.addEventListener('DOMContentLoaded', function() {
    createStars();
});

// Skills tooltip functionality
document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    document.body.appendChild(tooltip);

    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            tooltip.textContent = item.getAttribute('data-tooltip');
            tooltip.style.opacity = '1';
            tooltip.style.display = 'block';
        });
        item.addEventListener('mousemove', function(e) {
            tooltip.style.left = (e.clientX + 20) + 'px';
            tooltip.style.top = (e.clientY + 16) + 'px';
        });
        item.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            tooltip.style.display = 'none';
        });
    });
});
