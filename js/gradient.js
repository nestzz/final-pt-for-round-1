document.addEventListener('DOMContentLoaded', () => {
    // Create and animate gradient background
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.filter = 'blur(100px)';

    let width, height;
    
    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Darker gradient colors
    const colors = [
        [9, 97, 116],   // Darker blue #095974
        [98, 56, 118],  // Darker purple #623876
        [123, 39, 44]   // Darker red #7b272c
    ];

    let currentMouse = { x: width / 2, y: height / 2 };
    let targetMouse = { x: width / 2, y: height / 2 };

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        targetMouse.x = e.clientX;
        targetMouse.y = e.clientY;
    });

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function animate() {
        currentMouse.x = lerp(currentMouse.x, targetMouse.x, 0.1);
        currentMouse.y = lerp(currentMouse.y, targetMouse.y, 0.1);

        const gradient = ctx.createRadialGradient(
            currentMouse.x, currentMouse.y, 0,
            currentMouse.x, currentMouse.y, Math.max(width, height)
        );

        // Reduced opacity for softer effect
        gradient.addColorStop(0, `rgba(${colors[0].join(',')}, 0.6)`);
        gradient.addColorStop(0.5, `rgba(${colors[1].join(',')}, 0.6)`);
        gradient.addColorStop(1, `rgba(${colors[2].join(',')}, 0.6)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        requestAnimationFrame(animate);
    }

    animate();
});
