const Charts = {
  chart: null,
  defaultData: {
    labels: ['May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17', 'May 18'],
    revenue: [25, 32, 28, 35, 42, 38, 48],
    bookings: [18, 22, 20, 28, 32, 30, 38]
  },

  initRevenueChart(canvasId = 'revenueChart', data = null) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const chartData = data || this.defaultData;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Revenue',
          data: chartData.revenue,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4,
          fill: true
        }, {
          label: 'Bookings',
          data: chartData.bookings,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

    return this.chart;
  },

  updateFilter(metric) {
    if (!this.chart) return;
    var i0 = 0, i1 = 1;
    switch (metric) {
      case 'Total Revenue':
        this.chart.setDatasetVisibility(i0, true);
        this.chart.setDatasetVisibility(i1, true);
        break;
      case 'Bookings':
        this.chart.setDatasetVisibility(i0, false);
        this.chart.setDatasetVisibility(i1, true);
        break;
      case 'Cancellations':
        this.chart.setDatasetVisibility(i0, true);
        this.chart.setDatasetVisibility(i1, false);
        break;
    }
    this.chart.update();
  }
};

window.Charts = Charts;