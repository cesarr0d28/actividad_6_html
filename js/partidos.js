async function fetchPartidos() {
    try {
        const response = await fetch('http://localhost:3000/partidos');
        const data = await response.json();

        // Renderizar los partidos en tarjetas
        const partidosList = document.getElementById('partidos-list');
        partidosList.innerHTML = ''; // Limpiar el contenido existente
        data.forEach(partido => {
            const partidoCard = document.createElement('div');
            partidoCard.classList.add('col-md-4', 'mb-4');
            partidoCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Partido ${partido.id}</h5>
                        <p class="card-text"><strong>Equipo Local:</strong> ${partido.equipoLocal}</p>
                        <p class="card-text"><strong>Equipo Visitante:</strong> ${partido.equipoVisitante}</p>
                        <p class="card-text"><strong>Fecha:</strong> ${new Date(partido.fecha).toLocaleDateString()}</p>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-danger" onclick="eliminarPartido(${partido.id}, this)">Eliminar</button>
                    </div>
                </div>
            `;
            partidosList.appendChild(partidoCard);
        });
    } catch (error) {
        console.error('Error al obtener los partidos:', error);
    }
}

async function eliminarPartido(id, button) {
    try {
        const response = await fetch(`http://localhost:3000/partidos/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            // Eliminar la tarjeta del DOM
            const partidoCard = button.closest('.col-md-4');
            partidoCard.remove();

            // Mostrar mensaje de éxito
            mostrarMensaje('¡Partido eliminado correctamente!', 'success');
        } else {
            console.error('Error al eliminar el partido');
            mostrarMensaje('Error al eliminar el partido.', 'danger');
        }
    } catch (error) {
        console.error('Error al eliminar el partido:', error);
        mostrarMensaje('Error de red al intentar eliminar el partido.', 'danger');
    }
}

function mostrarMensaje(texto, tipo) {
    const mensajeAccion = document.getElementById('mensajeAccion');
    mensajeAccion.textContent = texto;
    mensajeAccion.className = `alert alert-${tipo}`;
    mensajeAccion.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeAccion.style.display = 'none';
    }, 3000);
}

// Cargar los partidos al cargar la página
document.addEventListener('DOMContentLoaded', fetchPartidos);
