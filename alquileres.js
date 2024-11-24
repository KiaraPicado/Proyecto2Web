let rentals = []; // Array para almacenar los alquileres
let selectedRentalRow = null;

// Función para agregar un alquiler
function addRental() {
    const rentalBook = document.getElementById('rentalBook').value.trim();
    const rentalClient = document.getElementById('rentalClient').value.trim();
    const rentalDate = document.getElementById('rentalDate').value;

    if (rentalBook && rentalClient && rentalDate) {
        const newRental = { id: rentals.length + 1, rentalBook, rentalClient, rentalDate };
        rentals.push(newRental);
        renderRentalTable();
        clearRentalFields();
    } else {
        alert('Todos los campos son obligatorios.');
    }
}

// Función para renderizar la tabla de alquileres
function renderRentalTable() {
    const rentalTable = document.getElementById('rentalTable');
    rentalTable.innerHTML = rentals.map((rental, index) => `
        <tr onclick="selectRentalRow(${index})">
            <td>${rental.id}</td>
            <td>${rental.rentalBook}</td>
            <td>${rental.rentalClient}</td>
            <td>${rental.rentalDate}</td>
        </tr>
    `).join('');
}

// Función para limpiar los campos del formulario
function clearRentalFields() {
    document.getElementById('rentalForm').reset();
    selectedRentalRow = null;
    toggleRentalButtons(false);
}

// Función para seleccionar una fila en la tabla de alquileres
function selectRentalRow(index) {
    selectedRentalRow = index;
    const rental = rentals[index];
    document.getElementById('rentalBook').value = rental.rentalBook;
    document.getElementById('rentalClient').value = rental.rentalClient;
    document.getElementById('rentalDate').value = rental.rentalDate;

    toggleRentalButtons(true);
}

// Función para editar un alquiler
function editRental() {
    if (selectedRentalRow !== null) {
        const rentalBook = document.getElementById('rentalBook').value.trim();
        const rentalClient = document.getElementById('rentalClient').value.trim();
        const rentalDate = document.getElementById('rentalDate').value;

        if (rentalBook && rentalClient && rentalDate) {
            rentals[selectedRentalRow] = { 
                id: rentals[selectedRentalRow].id, 
                rentalBook, 
                rentalClient, 
                rentalDate 
            };
            renderRentalTable();
            clearRentalFields();
        } else {
            alert('Todos los campos son obligatorios.');
        }
    }
}

// Función para eliminar un alquiler
function deleteRental() {
    if (selectedRentalRow !== null) {
        rentals.splice(selectedRentalRow, 1);
        renderRentalTable();
        clearRentalFields();
    }
}

// Función para habilitar/deshabilitar botones
function toggleRentalButtons(isRowSelected) {
    document.getElementById('deleteRentalBtn').disabled = !isRowSelected;
    document.getElementById('editRentalBtn').disabled = !isRowSelected;
    document.getElementById('addRentalBtn').disabled = isRowSelected;
}

// Escucha el evento de limpiar formulario
document.getElementById('clearRentalBtn').addEventListener('click', () => {
    clearRentalFields();
});
