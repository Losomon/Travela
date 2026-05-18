const Finance = {
  init() {
    this.renderRevenueSummary();
    this.renderTransactionsTable();
    this.recalculateTotals();
  },

  renderRevenueSummary() {
    const summary = window.TravelaConfig.financeSummary || {};
    document.getElementById('totalRevenue').textContent = `$${summary.totalRevenue || 0}`;
    document.getElementById('totalExpenses').textContent = `$${summary.totalExpenses || 0}`;
    document.getElementById('netProfit').textContent = `$${summary.netProfit || 0}`;
  },

  renderTransactionsTable() {
    const transactions = window.TravelaConfig.transactions || [];
    const tbody = document.querySelector('#transactionsTable tbody');
    tbody.innerHTML = '';
    transactions.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${t.id}</td>
        <td>${t.description}</td>
        <td>${t.date}</td>
        <td class="${t.type === 'income' ? 'text-success' : 'text-danger'}">
          ${t.type === 'income' ? '+' : '-'}$${t.amount}
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  recalculateTotals() {
    const rows = document.querySelectorAll('#transactionsTable tbody tr');
    let totalIncome = 0;
    let totalExpenses = 0;
    rows.forEach(row => {
      const amountCell = row.querySelector('td:nth-child(4)');
      const amount = parseFloat(amountCell.textContent.replace(/[^\d.-]/g, ''));
      if (amountCell.classList.contains('text-success')) {
        totalIncome += amount;
      } else {
        totalExpenses += amount;
      }
    });
    const netProfit = totalIncome - totalExpenses;
    document.getElementById('totalRevenue').textContent = `$${totalIncome}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses}`;
    document.getElementById('netProfit').textContent = `$${netProfit}`;
  },

  exportCSV() {
    const rows = document.querySelectorAll('#transactionsTable tbody tr');
    let csv = 'ID,Description,Date,Amount,Type\n';
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const id = cells[0].textContent;
      const description = cells[1].textContent;
      const date = cells[2].textContent;
      const amountCell = cells[3];
      const amount = amountCell.textContent;
      const type = amountCell.classList.contains('text-success') ? 'Income' : 'Expense';
      csv += `"${id}","${description}","${date}","${amount}","${type}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'finance_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

window.Finance = Finance;