// Manejo del formulario de agregar equipo
document.getElementById('agregarEquipoForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const ciudad = document.getElementById('ciudad').value;
    const escudoUrl = document.getElementById('escudoUrl').value;

    try {
        const response = await fetch('http://localhost:3000/equipos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, ciudad, escudoUrl })
        });

        if (response.ok) {
            // Equipo agregado correctamente
            const equipo = await response.json();

            // Mostrar el mensaje de éxito
            const mensajeRegistro = document.getElementById('mensajeRegistro');
            mensajeRegistro.style.display = 'block';

            // Ocultar el mensaje después de 3 segundos
            setTimeout(() => {
                mensajeRegistro.style.display = 'none';
            }, 3000);

            // Opcional: limpiar el formulario después de agregar el equipo
            document.getElementById('agregarEquipoForm').reset();
        } else {
            console.error('Error al agregar el equipo');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
});

    

