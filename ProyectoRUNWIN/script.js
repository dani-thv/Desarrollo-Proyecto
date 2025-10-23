// Actualiza la cantidad al hacer click en los botones +/-
// button: el botón que llama a la función; change: +1 o -1
function changeQuantity(button, change) {
    const row = button.closest('tr');
    const quantityElement = row.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent, 10);

    quantity = Math.max(1, quantity + change); // mínimo 1
    quantityElement.textContent = quantity;

    updateTotals();
}

// Recalcula subtotales, subtotal total y actualiza el DOM
function updateTotals() {
    const rows = document.querySelectorAll('.cart-table tbody tr');
    let subtotal = 0;

    rows.forEach(row => {
        // Precio: extraer solo números del texto (ej. "COP 800.000")
        const priceText = row.querySelector('.price').textContent.replace(/[^\d]/g, '');
        const price = parseInt(priceText, 10) || 0;
        const quantity = parseInt(row.querySelector('.quantity').textContent, 10) || 0;
        const subValue = price * quantity;
        subtotal += subValue;

        // Mostrar subtotal con formato local (ej: 1.600.000)
        const subFormatted = 'COP ' + subValue.toLocaleString('es-CO');
        const subtotalValue = row.querySelector('.subtotal-value');
        if (subtotalValue) {
        subtotalValue.textContent = subFormatted;
        }
    });

    const subtotalFormatted = 'COP ' + subtotal.toLocaleString('es-CO');
    document.getElementById('subtotal').textContent = subtotalFormatted;
    document.getElementById('total').textContent = subtotalFormatted;
}

// Ejecutar al cargar la página para sincronizar valores iniciales
window.addEventListener('DOMContentLoaded', () => {
    updateTotals();

    // ejemplo: aplicar cupón (dummy)
    const applyBtn = document.getElementById('apply-coupon');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const code = document.getElementById('coupon').value.trim();
            if (!code) {
                alert('Ingresa un código de cupón.');
                return;
            }
            // comportamiento de ejemplo: si el cupón es "DESC10" aplica 10% de descuento
            if (code.toUpperCase() === 'DESC10') {
                // calcular descuento
                const subtotalText = document.getElementById('subtotal').textContent.replace(/[^\d]/g, '');
                const subtotal = parseInt(subtotalText, 10) || 0;
                const descuento = Math.round(subtotal * 0.10);
                const nuevoTotal = subtotal - descuento;
                document.getElementById('total').textContent = 'COP ' + nuevoTotal.toLocaleString('es-CO');
                alert('Cupón aplicado: 10% de descuento');
            } else {
                alert('Cupón no válido (ejemplo: prueba con DESC10).');
            }
        });
    }
});
