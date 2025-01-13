function showProductForm() {
    const numProducts = parseInt(document.getElementById('numProducts').value);
    if (isNaN(numProducts) || numProducts < 1) {
        alert('Please enter a valid number of products.');
        return;
    }

    // Hide the initial form and show the product form
    document.getElementById('initialForm').classList.add('hidden');
    const productForm = document.getElementById('productForm');
    const productInputs = document.getElementById('productInputs');
    productInputs.innerHTML = '';

    // Create product input fields dynamically
    for (let i = 0; i < numProducts; i++) {
        productInputs.innerHTML += `
            <h2>Product ${i + 1}</h2>
            <label for="productName${i}">Product Name:</label>
            <input type="text" id="productName${i}" placeholder="Enter product name" required>

            <label for="quantity${i}">Quantity:</label>
            <input type="number" id="quantity${i}" placeholder="Enter quantity" required min="1">

            <label for="rate${i}">Amount (₹):</label>
            <input type="number" id="rate${i}" placeholder="Enter amount" required>

            <label for="tax${i}">Tax (%):</label>
            <input type="number" id="tax${i}" placeholder="Enter tax percentage" required>

            <label for="discount${i}">Discount (%):</label>
            <input type="number" id="discount${i}" placeholder="Enter discount percentage" required>
        `;
    }

    productForm.classList.remove('hidden');
}

function generateInvoice() {
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const numProducts = parseInt(document.getElementById('numProducts').value);

    let invoiceDetails = `
        <div class="invoice">
            <h1 class="invoice-title">INVOICE</h1>
            <div class="invoice-header">
                <div>
                    <p><strong>Customer Name:</strong> ${customerName}</p>
                    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                </div>
                <div>
                    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                </div>
            </div>
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Amount (₹)</th>
                        <th>Discount (%)</th>
                        <th>Amount after Discount (₹)</th>
                        <th>Tax (%)</th>
                        <th>Amount after Tax (₹)</th>
                    </tr>
                </thead>
                <tbody>
    `;

    let totalAmount = 0;

    for (let i = 0; i < numProducts; i++) {
        const productName = document.getElementById(`productName${i}`).value;
        const quantity = parseFloat(document.getElementById(`quantity${i}`).value);
        const rate = parseFloat(document.getElementById(`rate${i}`).value);
        const taxPercent = parseFloat(document.getElementById(`tax${i}`).value);
        const discountPercent = parseFloat(document.getElementById(`discount${i}`).value);

        const subtotal = quantity * rate;
        const discountAmount = (discountPercent / 100) * subtotal;
        const amountAfterDiscount = subtotal - discountAmount;
        const taxAmount = (taxPercent / 100) * amountAfterDiscount;
        const totalProductAmount = amountAfterDiscount + taxAmount;

        totalAmount += totalProductAmount;

        invoiceDetails += `
            <tr>
                <td>${productName}</td>
                <td>${quantity}</td>
                <td>₹${subtotal.toFixed(2)}</td>
                <td>${discountPercent.toFixed(2)}%</td>
                <td>₹${amountAfterDiscount.toFixed(2)}</td>
                <td>${taxPercent.toFixed(2)}%</td>
                <td>₹${totalProductAmount.toFixed(2)}</td>
            </tr>
        `;
    }

    invoiceDetails += `
                </tbody>
            </table>
            <div class="invoice-footer">
                <p><strong>Total Amount:</strong> ₹${totalAmount.toFixed(2)}</p>
            </div>
            <button id="savePdfButton" onclick="saveAsPdf()">Save as PDF</button>
        </div>
    `;

    // Open a new page and display the invoice
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
        <head>
            <title>Invoice</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            ${invoiceDetails}
            <script>
                document.getElementById('savePdfButton').addEventListener('click', function() {
                    window.print();
                });
            </script>
        </body>
        </html>
    `);
    newWindow.document.close();
}

function saveAsPdf() {
    window.print();
}
