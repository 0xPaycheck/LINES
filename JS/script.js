document.addEventListener("DOMContentLoaded", function() {
    const lines = document.querySelectorAll('.line');
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    lines.forEach(line => {
        const randomTop = Math.random() * maxHeight;
        const randomLeft = Math.random() * maxWidth;
        const randomWidth = 100 + Math.random() * 200; // Ancho entre 100px y 300px

        line.style.top = `${randomTop}px`;
        line.style.left = `${randomLeft}px`;
        line.style.width = `${randomWidth}px`;

        animateLine(line);
    });

    function animateLine(line) {
        let startTime = null;
        const path = line.querySelector('path');
        const length = path.getTotalLength();
        const numPoints = 20;
        const points = [];
        const speed = 0.01; // Ajusta la velocidad aquí

        for (let i = 0; i <= numPoints; i++) {
            const point = path.getPointAtLength((i / numPoints) * length);
            points.push({ x: point.x, y: point.y });
        }

        function updateWave(time) {
            if (!startTime) startTime = time;
            const progress = (time - startTime) * speed;

            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                point.y = 5 + 5 * Math.sin(i * 0.5 + progress);
            }

            const newPath = points.map((point, index) => {
                if (index === 0) {
                    return `M${point.x},${point.y}`;
                } else {
                    return `L${point.x},${point.y}`;
                }
            }).join(' ');

            path.setAttribute('d', newPath);

            requestAnimationFrame(updateWave);
        }

        requestAnimationFrame(updateWave);
    }
});
