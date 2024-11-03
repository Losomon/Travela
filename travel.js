// Function to handle trip planning
function PlanTrip() {
    // Get values from input fields
    const destination = document.getElementById('Destination').value;
    const startDate = document.getElementById('Start Date').value;
    const endDate = document.getElementById('End Date').value;
    const travelers = document.getElementById('Travelers').value;
    const travelStyle = document.getElementById('TravelStyle').value;

    // Validate that all fields are filled in
    if (!destination || !startDate || !endDate || !travelers) {
        alert("Please fill in all fields."); // Alert user if fields are missing
        return; // Exit the function if validation fails
    }

    // Display a summary of the planned trip
    alert(`Your trip to ${destination} has been planned!\nStart Date: ${startDate}\nEnd Date: ${endDate}\nTravelers: ${travelers}\nTravel Style: ${travelStyle}`);
}

// Function to search for flights
function Searchflight() {
    // Get values from input fields for flight search
    const from = document.getElementById('From').value;
    const to = document.getElementById('To').value;
    const flightDate = document.getElementById('Flight Date').value;

    // Validate that all fields are filled in
    if (!from || !to || !flightDate) {
        alert("Please fill in all fields."); // Alert user if fields are missing
        return; // Exit the function if validation fails
    }

    // Display an alert with flight search details
    alert(`Searching for flights from ${from} to ${to} on ${flightDate}.`);
}

// Function to find accommodations
function findAccommodation() {
    // Get values from input fields
    const location = document.getElementById('location').value;
    const roomType = document.getElementById('RoomType').value;

    // Initialize an array to hold selected amenities
    const amenities = [];
    // Get all checked checkboxes for amenities
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        amenities.push(checkbox.value); // Add selected amenities to the array
    });

    // Validate that required fields are filled in
    if (!location || !roomType) {
        alert("Please fill in all fields."); // Alert user if fields are missing
        return; // Exit the function if validation fails
    }

    // Prepare a message for the alert with amenities if any are selected
    let amenitiesList = amenities.length > 0 ? ` with amenities: ${amenities.join(', ')}` : '';
    // Display an alert with accommodation search details
    alert(`Finding ${roomType} accommodations in ${location}${amenitiesList}.`);
}


