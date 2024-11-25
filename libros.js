let books = []; // Array para almacenar los registros
let selectedRow = null; // Fila seleccionada

// Navegar entre pantallas
function navigate(url) {
    window.location.href = url;
}

// Función para agregar un registro
function addRecord() {
    const bookName = document.getElementById('bookName').value.trim();
    const authorName = document.getElementById('authorName').value.trim();
    const year = document.getElementById('year').value.trim();

    if (bookName && authorName && year) {
        const newBook = { id: books.length + 1, bookName, authorName, year };
        books.push(newBook);
        renderTable();
        clearFields();
    } else {
        alert('Todos los campos son obligatorios.');
    }
}

// Función para renderizar la tabla
function renderTable() {
    const bookTable = document.getElementById('bookTable');
    bookTable.innerHTML = books.map((book, index) => `
        <tr onclick="selectRow(${index})">
            <td>${book.id}</td>
            <td>${book.bookName}</td>
            <td>${book.authorName}</td>
            <td>${book.year}</td>
        </tr>
    `).join('');
}

// Función para limpiar los campos del formulario
function clearFields() {
    document.getElementById('bookForm').reset();
    selectedRow = null;
    toggleButtons(false); // Deshabilita botones de eliminar/editar, habilita agregar
}

// Función para seleccionar una fila en la tabla
function selectRow(index) {
    selectedRow = index;
    const book = books[index];
    document.getElementById('bookName').value = book.bookName;
    document.getElementById('authorName').value = book.authorName;
    document.getElementById('year').value = book.year;

    toggleButtons(true); // Habilita botones de eliminar/editar, deshabilita agregar
}

// Función para editar un registro
function editRecord() {
    if (selectedRow !== null) {
        const bookName = document.getElementById('bookName').value.trim();
        const authorName = document.getElementById('authorName').value.trim();
        const year = document.getElementById('year').value.trim();

        if (bookName && authorName && year) {
            books[selectedRow] = { id: books[selectedRow].id, bookName, authorName, year };
            renderTable();
            clearFields();
        } else {
            alert('Todos los campos son obligatorios.');
        }
    }
}

// Función para eliminar un registro
function deleteRecord() {
    if (selectedRow !== null) {
        books.splice(selectedRow, 1);
        renderTable();
        clearFields();
    }
}

// Función para habilitar/deshabilitar botones
function toggleButtons(isRowSelected) {
    document.getElementById('deleteBtn').disabled = !isRowSelected;
    document.getElementById('editBtn').disabled = !isRowSelected;
    document.getElementById('addBtn').disabled = isRowSelected;
}

// Escucha el evento de limpiar formulario
document.getElementById('clearBtn').addEventListener('click', () => {
    clearFields();
});
