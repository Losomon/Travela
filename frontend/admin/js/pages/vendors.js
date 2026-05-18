const Vendors = {
  init() {
    this.renderVendorList();
    this.wireAddVendorButton();
  },

  renderVendorList() {
    const vendors = window.TravelaConfig.vendors || [];
    const tbody = document.querySelector('#vendorsTable tbody');
    tbody.innerHTML = '';
    vendors.forEach(vendor => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${vendor.id}</td>
        <td>${vendor.name}</td>
        <td>${vendor.email}</td>
        <td><span class="badge bg-${vendor.status === 'active' ? 'success' : 'danger'}">${vendor.status}</span></td>
        <td><button class="btn btn-sm btn-outline-danger delete-vendor" data-id="${vendor.id}">Delete</button></td>
      `;
      tbody.appendChild(tr);
    });
    this.wireDeleteButtons();
  },

  wireAddVendorButton() {
    const btn = document.getElementById('addVendorBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        const newVendor = {
          id: Date.now(),
          name: 'New Vendor',
          email: 'new@example.com',
          status: 'active'
        };
        this.addVendor(newVendor);
        window.Helpers.showNotification('Vendor added successfully', 'success');
      });
    }
  },

  addVendor(vendor) {
    const tbody = document.querySelector('#vendorsTable tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${vendor.id}</td>
      <td>${vendor.name}</td>
      <td>${vendor.email}</td>
      <td><span class="badge bg-success">${vendor.status}</span></td>
      <td><button class="btn btn-sm btn-outline-danger delete-vendor" data-id="${vendor.id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
    this.wireDeleteButton(tr.querySelector('.delete-vendor'));
  },

  deleteVendor(id) {
    const row = document.querySelector(`#vendorsTable tr[data-id="${id}"]`);
    if (row) {
      row.remove();
      window.Helpers.showNotification('Vendor deleted', 'warning');
    }
  },

  wireDeleteButtons() {
    document.querySelectorAll('.delete-vendor').forEach(btn => {
      this.wireDeleteButton(btn);
    });
  },

  wireDeleteButton(btn) {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      this.deleteVendor(id);
    });
  }
};

window.Vendors = Vendors;