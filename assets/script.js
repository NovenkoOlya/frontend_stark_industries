function sendFeedback(event) {
    event.preventDefault();
    const name = document.getElementById('fullName').value;
    const purpose = document.getElementById('purpose').value;

    alert(`Запит успішно надіслано!\nДякуємо, ${name}.\nМета звернення: "${purpose}".`);
    document.getElementById('feedbackForm').reset();
}