

/*******************************************************
 * Show/hide sections
 *******************************************************/
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('hidden');
    });
    // Show chosen section
    document.getElementById(sectionId).classList.remove('hidden');
  
    // If user clicked View PRs, show the PR table
    if (sectionId === 'viewPRs') {
      displayPRs();
    }
  }

  // Google Sign in Feature
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  
  // Global array to store workout data
  let workoutData = [];
  
  // Load data from LocalStorage on page load
  window.onload = () => {
    loadWorkouts();
    renderChart(workoutData); // Render chart with existing data
  };
  
  //-------------------------------------
  // LOG WORKOUT
  //-------------------------------------
  document.getElementById('workoutForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const exercise = document.getElementById('exercise').value;
    const weight = Number(document.getElementById('weight').value);
    const reps = Number(document.getElementById('reps').value);
    const sets = Number(document.getElementById('sets').value);
    const date = new Date().toISOString().split('T')[0]; // e.g. "2025-03-05"
  
    // Add to workoutData
    workoutData.push({ exercise, weight, reps, sets, date });
    saveWorkouts();
  
    alert('Workout Logged!');
    e.target.reset();
  
    // Refresh the chart
    renderChart(workoutData);
  });

  /*clearData button functionalility
  document.getElementById('clearData').addEventListener('click', function() {
    // creates a confirmation dialog
    const userConfirmed = confirm('WARNING: Proceeding will delete all WORKOUT DATA');

    if (userConfirmed) {
      // clears the workout data array 
      workoutData = [];
      
      //removes from localStorage
      localStorage.removeItem('workoutData');

      // alerts the user
      alert('Workout data has been cleared');

      // re-renders the chart with the empty data
      renderChart(workoutData);

    }
});


*/

document.getElementById('deleteData').addEventListener('click', function() {
  // creates a confirmation dialog for the user
  const userConfirmation = confirm('WARNING: Proceeding will delete all data');

  // case when the user confirms
  if (userConfirmation) {
    // clears the workout data array
    workoutData = [];

    // clears the localStorage
    localStorage.removeItem('workoutData');

    // alert for the user 
    alert('Workout data has been clear');

    // re-renders the chart with the cleared data
    renderChart(workoutData);
  }
})



  
  //-------------------------------------
  // SET GOALS
  //-------------------------------------
  document.getElementById('goalForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const goalExercise = document.getElementById('goalExercise').value;
    const goalWeight = document.getElementById('goalWeight').value;
    const goalReps = document.getElementById('goalReps').value;
  
    // Insert a new row in the goals table
    const tableBody = document.querySelector('#goalsTable tbody');
    const newRow = tableBody.insertRow();
  
    const exerciseCell = newRow.insertCell();
    exerciseCell.textContent = goalExercise;
  
    const weightCell = newRow.insertCell();
    weightCell.textContent = goalWeight;
  
    const repsCell = newRow.insertCell();
    repsCell.textContent = goalReps;
  
    alert('Goal Set!');
    e.target.reset();
  });
  
  //-------------------------------------
  // VIEW PROGRESS (Chart.js)
  //-------------------------------------
  let chart;
  
  // Re-render chart with the selected exercise
  function renderChart(data) {
    const ctx = document.getElementById('progressGraph').getContext('2d');
    const selectedExercise = document.getElementById('exerciseSelect').value;
  
    // Filter data for the chosen exercise
    const filteredData = data.filter(item => item.exercise === selectedExercise);
  
    const labels = filteredData.map(item => item.date);
    const weights = filteredData.map(item => item.weight);
  
    // Destroy previous chart instance if it exists
    if (chart) {
      chart.destroy();
    }
  
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: `Weight Progress (${selectedExercise})`,
            data: weights,
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Weight (lbs)'
            }
          }
        }
      }
    });
  }
  
  // When exercise is changed in the dropdown, update the chart
  document.getElementById('exerciseSelect').addEventListener('change', () => {
    renderChart(workoutData);
  });
  
  //-------------------------------------
  // VIEW PR's
  //-------------------------------------
  function displayPRs() {
    const tableBody = document.querySelector('#prTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows
  
    // Calculate max weight for each exercise
    const maxWeights = {};
    workoutData.forEach(item => {
      const { exercise, weight } = item;
      if (!maxWeights[exercise] || weight > maxWeights[exercise]) {
        maxWeights[exercise] = weight;
      }
    });
  
    // Create a table row for each exercise's max weight
    for (let exercise in maxWeights) {
      const row = tableBody.insertRow();
      const exerciseCell = row.insertCell();
      exerciseCell.textContent = exercise;
      const weightCell = row.insertCell();
      weightCell.textContent = maxWeights[exercise];
    }
  }
  
  //-------------------------------------
  // LOCAL STORAGE HELPERS
  //-------------------------------------
  function saveWorkouts() {
    localStorage.setItem('workoutData', JSON.stringify(workoutData));
  }
  
  function loadWorkouts() {
    const data = localStorage.getItem('workoutData');
    if (data) {
      workoutData = JSON.parse(data);
    }
  }
  