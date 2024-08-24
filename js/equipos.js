
async function fetchEquipos() {
    try {
        const response = await fetch('http://localhost:3000/equipos');
        const data = await response.json();

        // Renderiza los equipos y sus escudos
        const equiposList = document.getElementById('equipos-list');
        data.forEach(equipo => {
            const escudoUrl = equipo.escudoUrl;
            const equipoCard = document.createElement('div');
            equipoCard.classList.add('card', 'mb-3');
            equipoCard.innerHTML = `
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${escudoUrl}" class="img-fluid" alt="Escudo del equipo">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${equipo.nombre}</h5>
                            <p class="card-text">Ciudad: ${equipo.ciudad}</p>
                            <button class="btn btn-danger" onclick="eliminarEquipo(${equipo.id}, this)">Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
            equiposList.appendChild(equipoCard);
        });
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}

fetchEquipos();

async function eliminarEquipo(id, button) {
    try {
        const response = await fetch(`http://localhost:3000/equipos/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            // Elimina la tarjeta del equipo del DOM
            const equipoCard = button.closest('.card');
            equipoCard.remove();

            // Muestra el mensaje de éxito
            const mensajeEliminado = document.createElement('div');
            mensajeEliminado.classList.add('alert', 'alert-success');
            mensajeEliminado.textContent = '¡Equipo eliminado correctamente!';
            document.body.insertBefore(mensajeEliminado, document.body.firstChild);

            // Oculta el mensaje después de 3 segundos
            setTimeout(() => {
                mensajeEliminado.remove();
            }, 3000);
        } else {
            // Manejo de errores al eliminar el equipo
            const mensajeError = document.createElement('div');
            mensajeError.classList.add('alert', 'alert-danger');
            mensajeError.textContent = 'No se puede eliminar el equipo porque tiene partidos programados.';
            document.body.insertBefore(mensajeError, document.body.firstChild);

            // Oculta el mensaje después de 5 segundos
            setTimeout(() => {
                mensajeError.remove();
            }, 5000);

            console.error('Error al eliminar el equipo');
        }
    } catch (error) {
        console.error('Error al eliminar el equipo:', error);
    }
}

