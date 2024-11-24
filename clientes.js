let clients = []; // Array para almacenar los clientes
let selectedClientRow = null;

// Función para agregar un cliente
function addClient() {
    const clientName = document.getElementById('clientName').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();

    if (clientName && clientEmail && clientPhone) {
        const newClient = { id: clients.length + 1, clientName, clientEmail, clientPhone };
        clients.push(newClient);
        renderClientTable();
        clearClientFields();
    } else {
        alert('Todos los campos son obligatorios.');
    }
}

// Función para renderizar la tabla de clientes
function renderClientTable() {
    const clientTable = document.getElementById('clientTable');
    clientTable.innerHTML = clients.map((client, index) => `
        <tr onclick="selectClientRow(${index})">
            <td>${client.id}</td>
            <td>${client.clientName}</td>
            <td>${client.clientEmail}</td>
            <td>${client.clientPhone}</td>
        </tr>
    `).join('');
}

// Función para limpiar los campos del formulario
function clearClientFields() {
    document.getElementById('clientForm').reset();
    selectedClientRow = null;
    toggleClientButtons(false);
}

// Función para seleccionar una fila en la tabla de clientes
function selectClientRow(index) {
    selectedClientRow = index;
    const client = clients[index];
    document.getElementById('clientName').value = client.clientName;
    document.getElementById('clientEmail').value = client.clientEmail;
    document.getElementById('clientPhone').value = client.clientPhone;

    toggleClientButtons(true);
}

// Función para editar un cliente
function editClient() {
    if (selectedClientRow !== null) {
        const clientName = document.getElementById('clientName').value.trim();
        const clientEmail = document.getElementById('clientEmail').value.trim();
        const clientPhone = document.getElementById('clientPhone').value.trim();

        if (clientName && clientEmail && clientPhone) {
            clients[selectedClientRow] = { id: clients[selectedClientRow].id, clientName, clientEmail, clientPhone };
            renderClientTable();
            clearClientFields();
        } else {
            alert('Todos los campos son obligatorios.');
        }
    }
}

// Función para eliminar un cliente
function deleteClient() {
    if (selectedClientRow !== null) {
        clients.splice(selectedClientRow, 1);
        renderClientTable();
        clearClientFields();
    }
}

// Función para habilitar/deshabilitar botones
function toggleClientButtons(isRowSelected) {
    document.getElementById('deleteClientBtn').disabled = !isRowSelected;
    document.getElementById('editClientBtn').disabled = !isRowSelected;
    document.getElementById('addClientBtn').disabled = isRowSelected;
}

// Escucha el evento de limpiar formulario
document.getElementById('clearClientBtn').addEventListener('click', () => {
    clearClientFields();
});
