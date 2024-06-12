document.addEventListener("DOMContentLoaded", function() {
    const lines = document.querySelectorAll('.line');
    const text = document.querySelector('.text');
    const form = document.querySelector('.user-input-form'); // Selecciona el formulario
    const duration = 10000; // Duración en milisegundos para que las líneas se alarguen completamente
    const maxWidth = window.innerWidth;

    lines.forEach((line, index) => {
        const randomTop = Math.random() * (window.innerHeight - 10); // Asegurar que no se salga de la ventana
        line.style.top = `${randomTop}px`;
        animateLine(line);
        growLine(line);
    });

    // Crear copias invertidas de las líneas y colocarlas en el lado derecho de la pantalla
    lines.forEach((line, index) => {
        const clone = line.cloneNode(true);
        clone.style.left = 'auto';
        clone.style.right = '0';
        line.parentElement.appendChild(clone);

        animateLine(clone, true);
        growLine(clone);
    });

    // Temporizador para hacer aparecer el texto
    setTimeout(() => {
        text.classList.add('appear');

        // Temporizador para hacer desaparecer el texto después de 5 segundos
        setTimeout(() => {
            text.classList.add('disappear');

            // Temporizador para mostrar el formulario después de que desaparezca el texto
            setTimeout(() => {
                form.classList.add('appear'); // Mostrar gradualmente el formulario
            }, 1000); // Mostrar después de 1 segundo
        }, 5000); // Desaparecer después de 5 segundos
    }, 4000); // Aparecer después de 4 segundos

    function animateLine(line, reverse = false) {
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

    function growLine(line) {
        let startTime = null;

        function updateGrowth(time) {
            if (!startTime) startTime = time;
            const progress = time - startTime;
            const width = Math.min(200 + (maxWidth - 200) * (progress / duration), maxWidth);
            line.style.width = `${width}px`;

            if (progress < duration) {
                requestAnimationFrame(updateGrowth);
            }
        }

        requestAnimationFrame(updateGrowth);
    }
});
