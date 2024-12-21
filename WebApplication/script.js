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