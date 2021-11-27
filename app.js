document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Hide results
    document.getElementById('results').style.display = "none";
    // show loader
    document.getElementById('loading').style.display = "block";

    setTimeout(loanResults, 2000);

    e.preventDefault();
});

function loanResults() {
    // UI 
    const input = document.getElementById('input');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(input.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payment

    const y = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * y * calculatedInterest) / (y - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // show results
        document.getElementById('results').style.display = "block"
            // hide loader
        document.getElementById('loading').style.display = "none";
    } else {
        showError('Please check your numbers');
    }

}

//show error

function showError(error) {
    // hide results
    document.getElementById('results').style.display = "none"
        // hide loader
    document.getElementById('loading').style.display = "none";
    // create a div
    const errorDiv = document.createElement('div');

    // Get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // set timeout
    setTimeout(clearError, 3000)
}

//clear error function
function clearError() {
    document.querySelector('.alert').remove();
}