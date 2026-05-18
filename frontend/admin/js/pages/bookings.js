const Bookings = {
  init() {
    this.renderBookings();
    this.initFilterBar();
  },

  renderBookings() {
    const bookings = window.TravelaConfig.bookings || [];
    const tbody = document.querySelector('#bookingsTable tbody');
    tbody.innerHTML = '';
    bookings.forEach(booking => {
      const tr = document.createElement('tr');
      tr.className = `booking-status-${booking.status}`;
      tr.innerHTML = `
        <td>${booking.id}</td>
        <td>${booking.customer}</td>
        <td>${booking.destination}</td>
        <td>${booking.date}</td>
        <td><span class="badge bg-${this.getStatusColor(booking.status)}">${booking.status}</span></td>
        <td>${booking.amount}</td>
        <td>
          ${booking.status !== 'confirmed' ? `<button class="btn btn-sm btn-success confirm-booking" data-id="${booking.id}">Confirm</button>` : ''}
        </td>
      `;
      tbody.appendChild(tr);
    });
    this.wireConfirmButtons();
  },

  getStatusColor(status) {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  },

  filterBy(status) {
    const rows = document.querySelectorAll('#bookingsTable tbody tr');
    rows.forEach(row => {
      const matches = status === 'all' || row.classList.contains(`booking-status-${status}`);
      row.style.display = matches ? '' : 'none';
    });
  },

  confirmBooking(id) {
    const row = document.querySelector(`#bookingsTable tbody tr[data-id="${id}"]`);
    if (!row) return;
    // Update the row's status to confirmed
    row.className = 'booking-status-confirmed';
    const statusCell = row.querySelector('.badge');
    statusCell.className = 'badge bg-success';
    statusCell.textContent = 'Confirmed';
    // Remove the confirm button
    const confirmBtn = row.querySelector('.confirm-booking');
    if (confirmBtn) confirmBtn.remove();
    window.Helpers.showNotification(`Booking #${id} confirmed`, 'success');
  },

  initFilterBar() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const status = btn.dataset.status;
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filterBy(status);
      });
    });
  },

  wireConfirmButtons() {
    document.querySelectorAll('.confirm-booking').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        this.confirmBooking(id);
      });
    });
  }
};

window.Bookings = Bookings;