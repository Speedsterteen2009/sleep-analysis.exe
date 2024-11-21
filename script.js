// Sleep Analysis App JS

let sleepLogs = JSON.parse(localStorage.getItem("sleepLogs")) || [];
updateStats();

// Handle form submission
document.getElementById("sleep-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const sleepTime = document.getElementById("sleep-time").value;
  const wakeTime = document.getElementById("wake-time").value;

  const sleep = new Date(`1970-01-01T${sleepTime}:00`);
  const wake = new Date(`1970-01-01T${wakeTime}:00`);
  
  let sleepDuration = (wake - sleep) / (1000 * 60 * 60);
  if (sleepDuration < 0) sleepDuration += 24;

  const log = { sleepTime, wakeTime, duration: sleepDuration.toFixed(2) };
  sleepLogs.push(log);
  localStorage.setItem("sleepLogs", JSON.stringify(sleepLogs));

  updateStats();
  document.getElementById("sleep-form").reset();
});

function updateStats() {
  const statsMessage = document.getElementById("stats-message");
  const statsList = document.getElementById("stats-list");

  if (sleepLogs.length === 0) {
    statsMessage.textContent = "Log your sleep to see results!";
    statsList.innerHTML = "";
    renderChart();
    renderDistributionChart();
    return;
  }

  const latestLog = sleepLogs[sleepLogs.length - 1];
  statsMessage.textContent = `You slept for ${latestLog.duration} hours on your last entry.`;

  statsList.innerHTML = sleepLogs
    .map(log => `<li>🛌 Slept at ${log.sleepTime}, woke at ${log.wakeTime} (${log.duration} hrs)</li>`)
    .join("");

  renderChart();
  renderDistributionChart();
}

// Graph Functions
function renderChart() {
  const ctx = document.getElementById('sleepChart').getContext('2d');
  const durations = sleepLogs.map(log => log.duration);
  const dates = sleepLogs.map((_, index) => `Day ${index + 1}`);

  if (window.sleepChart) window.sleepChart.destroy();

  window.sleepChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{
        label: 'Sleep Duration (hours)',
        data: durations,
        backgroundColor: 'rgba(233, 69, 96, 0.5)',
        borderColor: 'rgba(233, 69, 96, 1)',
        borderWidth: 1
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}

function renderDistributionChart() {
  const ctx = document.getElementById('distributionChart').getContext('2d');
  const totalHours = sleepLogs.reduce((sum, log) => sum + parseFloat(log.duration), 0);
  const deepSleep = totalHours * 0.25;
  const lightSleep = totalHours * 0.50;
  const remSleep = totalHours * 0.25;

  if (window.distributionChart) window.distributionChart.destroy();

  window.distributionChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Deep Sleep', 'Light Sleep', 'REM Sleep'],
      datasets: [{
        data: [deepSleep, lightSleep, remSleep],
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3']
      }]
    },
    options: { responsive: true }
  });
}

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";
document.body.classList.toggle("light", currentTheme === "light");
themeToggle.textContent = currentTheme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode";

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const newTheme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode";
});

document.getElementById("clear-data").addEventListener("click", function() {
  if (confirm("Are you sure you want to reset all data?")) {
    sleepLogs = [];
    localStorage.removeItem("sleepLogs");
    updateStats();
  }
});
