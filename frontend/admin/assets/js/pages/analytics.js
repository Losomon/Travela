const Analytics = {
  init() {
    // Initialize two charts: revenue and bookings
    Charts.initRevenueChart('revenueChart');
    Charts.initBookingsChart('bookingsChart');
    // Initialize date range filter
    this.initDateRangeFilter();
  },

  switchDateRange(range) {
    // Update chart data based on selected range
    Charts.updateRevenueChart(range);
    Charts.updateBookingsChart(range);
    // Update UI to reflect selected range
    document.querySelectorAll('.date-range-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.range === range);
    });
  },

  exportReport() {
    // Mock export: convert chart to CSV and trigger download
    const revenueData = Charts.getRevenueChartData();
    const bookingsData = Charts.getBookingsChartData();
    // Combine data into CSV format
    const csvContent = [
      ['Date', 'Revenue', 'Bookings'],
      ...revenueData.labels.map((label, i) => [
        label,
        revenueData.data[i],
        bookingsData.data[i] || 0
      ].join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'analytics_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  initDateRangeFilter() {
    const buttons = document.querySelectorAll('.date-range-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const range = btn.dataset.range;
        this.switchDateRange(range);
      });
    });
  }
};

window.Analytics = Analytics;