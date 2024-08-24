document.addEventListener('DOMContentLoaded', () => {
    cargarEquipos();
    document.getElementById('agregarPartidoForm').addEventListener('submit', agregarPartido);
});

async function cargarEquipos() {
    try {
        const response = await fetch('http://localhost:3000/equipos');
        const equipos = await response.json();

        const equipoLocalSelect = document.getElementById('equipoLocal');
        const equipoVisitanteSelect = document.getElementById('equipoVisitante');

        equipos.forEach(equipo => {
            const option = document.createElement('option');
            option.value = equipo.nombre;
            option.textContent = equipo.nombre;

            // Agregar la opción a ambos selects
            equipoLocalSelect.appendChild(option.cloneNode(true));
            equipoVisitanteSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los equipos:', error);
        alert('Hubo un error al cargar los equipos. Por favor, inténtelo más tarde.');
    }
}

async function agregarPartido(event) {
    event.preventDefault();

    const equipoLocal = document.getElementById('equipoLocal').value;
    const equipoVisitante = document.getElementById('equipoVisitante').value;
    const fecha = document.getElementById('fecha').value;

    if (!equipoLocal || !equipoVisitante || !fecha) {
        mostrarMensaje('Todos los campos son obligatorios', 'danger');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/partidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ equipoLocal, equipoVisitante, fecha })
        });

        if (response.ok) {
            mostrarMensaje('¡Partido registrado con éxito!', 'success');
            document.getElementById('agregarPartidoForm').reset();
        } else {
            const errorData = await response.json();
            mostrarMensaje(errorData.message || 'Error al registrar el partido', 'danger');
        }
    } catch (error) {
        console.error('Error al registrar el partido:', error);
        mostrarMensaje('Error de red. No se pudo registrar el partido.', 'danger');
    }
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeEl = document.getElementById('mensaje');
    mensajeEl.className = `alert alert-${tipo}`;
    mensajeEl.textContent = mensaje;
    mensajeEl.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeEl.style.display = 'none';
    }, 3000);
}
