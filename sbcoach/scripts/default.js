const submitBtn = document.getElementById('submit');
const outputDiv = document.getElementById('output');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('asunto').value;
    if (!name || !email || !message) {
        outputDiv.textContent = 'Por favor, rellene todos los campos.';
        return;
    }
    outputDiv.textContent = 'Su mensaje ha sido enviado correctamente.';
});