const Tables = {
  init() {
    document.querySelectorAll('tr').forEach(row => {
      row.addEventListener('mouseenter', () => row.classList.add('hover'));
      row.addEventListener('mouseleave', () => row.classList.remove('hover'));
    });

    document.querySelectorAll('.sortable-th').forEach(th => {
      th.addEventListener('click', () => {
        const table = th.closest('table');
        const colIndex = Array.from(th.parentNode.children).indexOf(th);
        this.sort(table, colIndex);
      });
    });
  },

  sort(table, colIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isDate = rows[0]?.cells[colIndex]?.textContent?.match(/\d{4}|\d{1,2}\s\w+/);

    rows.sort((a, b) => {
      const aText = a.cells[colIndex]?.textContent?.trim() || '';
      const bText = b.cells[colIndex]?.textContent?.trim() || '';

      if (isDate) {
        return new Date(aText) - new Date(bText);
      }
      return aText.localeCompare(bText);
    });

    rows.forEach(row => tbody.appendChild(row));
  },

  renderPagination(total, perPage, onPage) {
    const pages = Math.ceil(total / perPage);
    const container = document.createElement('div');
    container.className = 'pagination';

    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.addEventListener('click', () => onPage(i));
      container.appendChild(btn);
    }

    return container;
  },

  getSelected() {
    return Array.from(document.querySelectorAll('tr input[type="checkbox"]:checked')).map(cb => cb.closest('tr'));
  }
};

window.Tables = Tables;