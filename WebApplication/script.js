/**
 * Show/hide the sections
 */
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

/**
 * Logs the workouts
 */
document.getElementById('workoutForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const exercise = document.getElementById('exercise').value;
    const weight = document.getElementById('weight').value;
    const reps = document.getElementById('reps').value;
    const sets = document.getElementById('sets').value;

    console.log(`Logged: ${exercise}, ${weight} lbs, ${reps} reps, ${sets} sets`);
    alert('Workout Logged!');
    e.target.reset();
});

/**
 * sets goals
 */
document.getElementById('goalForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const goalExercise = document.getElementById('goalExercise').value;
    const goalWeight = document.getElementById('goalWeight').value;
    const goalReps = document.getElementById('goalReps').value;

    console.log(`Goal Set: ${goalExercise}, ${goalWeight} lbs, ${goalReps} reps`);
    alert('Goal Set!');
    e.target.reset();
});

// Array to store workout data
let workoutData = [];

// Save workouts to LocalStorage
function saveWorkouts() {
    localStorage.setItem('workoutData', JSON.stringify(workoutData));
}

// Load workouts from LocalStorage
function loadWorkouts() {
    const data = localStorage.getItem('workoutData');
    if (data) workoutData = JSON.parse(data);
}

// Chart.js - Render Progress Graph
let chart;
function renderChart(data) {
    const ctx = document.getElementById('progressGraph').getContext('2d');

    // Filter data for a specific exercise (e.g., "Squat")
    const filteredData = data.filter(item => item.exercise === "Squat");

    const labels = filteredData.map(item => item.date);
    const weights = filteredData.map(item => item.weight);

    // Destroy previous chart instance if it exists
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weight Progress (Squat)',
                data: weights,
                borderColor: '#36a2eb',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Weight (lbs)' }, beginAtZero: true }
            }
        }
    });
}

// Update `workoutForm` submission
document.getElementById('workoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get workout data from the form
    const exercise = document.getElementById('exercise').value;
    const weight = Number(document.getElementById('weight').value);
    const reps = Number(document.getElementById('reps').value);
    const sets = Number(document.getElementById('sets').value);
    const date = new Date().toISOString().split('T')[0]; // Current date

    // Add workout to the data array
    workoutData.push({ exercise, weight, reps, sets, date });
    saveWorkouts(); // Save the updated data to LocalStorage

    alert('Workout Logged!');

    // Clear the form
    e.target.reset();

    // Refresh the chart
    renderChart(workoutData);
});

// Render the chart when the user opens the "View Progress" section
document.getElementById('viewGraph').addEventListener('click', () => {
    renderChart(workoutData);
});

// Initialize data on page load
window.onload = () => {
    loadWorkouts();
    renderChart(workoutData); // Render chart with existing data
};
