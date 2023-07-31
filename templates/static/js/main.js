// Render total sales in dashboard
const renderSalesTotal = async (url) => {
    const totalBalance = document.getElementById('total-balance');
    try{const response = await fetch(url, {
        method: 'GET',
    });
    const data = await response.json();
    totalBalance.innerHTML = Number(data.total).toFixed(2);  // Number to convert a string into a float and toFixed(2) to show 2 decimal places
    } catch(err){
        console.log(err);
        totalBalance.innerHTML = "-.--";
    }    
}

// Generate random color
const randomColor = (amount) => {
    if (!amount) {
      amount = 1;
    }

    let bgColors = [];
    let borderColors = [];
    for (let i = 0; i < amount; i++) { 
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        bgColors.push(`rgba(${red}, ${green}, ${blue}, 0.2)`);
        borderColors.push(`rgba(${red}, ${green}, ${blue}, 1)`);

    }
    return [bgColors, borderColors];
}

// Generates the monthly expenses chart using chart.js
const renderMonthlyExpenses = () => {
    try {
        const ctx = document.getElementById('monthly_expenses').getContext('2d');
        // let monthlyExpensesColors = randomColor(12);
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Monthly Expenses',
                        data: [300, 100, 400, 200, 300, 500, 900, 600, 300, 400],
                        backgroundColor: '#cb1ea8',
                        borderColor: '#ffffff',
                        borderWidth: 0.2
                    }
                ]
            }
        });
    } catch (error) {
        console.log('renderMonthlyExpenses',error.message);
    }
}

// Generates the monthly sales chart using chart.js
const renderMonthlySales = async (url) => { 
    try {
        const response = await fetch(url, {
            method: 'GET',
        })
        const data = await response.json();
        const ctx = document.getElementById('monthly_income').getContext('2d');
        let monthlySalesColors = randomColor(12);
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Monthly Sales',
                        data: data.data,
                        backgroundColor: monthlySalesColors[0],
                        borderColor: monthlySalesColors[1],
                        borderWidth: 1
                    }
                ]
            }
        });
    } catch (error) {
        console.log('renderMonthlySales',error.message);
    }
}

// Generates the monthly top seller products chart using chart.js
const renderMonthlyTopSellerProducts = async (url) => { 
    try {
        const response = await fetch(url, {
            method: 'GET',
        })
        const data = await response.json();
        const ctx = document.getElementById('best_sellers').getContext('2d');
        let monthlyTopSellerProductsColors = randomColor(4);
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Monthly Top Seller Products',
                        data: data.data,
                        backgroundColor: monthlyTopSellerProductsColors[0],
                        borderColor: monthlyTopSellerProductsColors[1],
                        borderWidth: 1
                    }
                ]
            }
        });
    } catch (error) {
        console.log('renderMonthlyTopSellerProducts',error.message);
    }
}

// Generates the monthly top three employees chart using chart.js
const renderMonthlyTopThreeEmployees = async (url) => { 
    try {
        const response = await fetch(url, {
            method: 'GET',
        })
        const data = await response.json();
        const ctx = document.getElementById('employees_of_the_month').getContext('2d');
        let monthlyTopThreeEmployeesColors = randomColor(3);
        new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        data: data.data,
                        backgroundColor: monthlyTopThreeEmployeesColors[0],
                        borderColor: monthlyTopThreeEmployeesColors[1],
                        borderWidth: 1
                    }
                ]
            }
        });
    } catch (error) {
        console.log('renderMonthlyTopThreeEmployees',error.message);
    }
}