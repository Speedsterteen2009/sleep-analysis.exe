// sleep-stats.js
window.onload = function() {
    // Mock data for demonstration
    const logs = [
      { date: "2024-11-19", quality: 4 },
      { date: "2024-11-20", quality: 3 },
      { date: "2024-11-21", quality: 5 }
    ];
  
    const dates = logs.map(log => log.date);
    const qualities = logs.map(log => log.quality);
  
    // Reference to the canvas element
    const ctx = document.getElementById("sleep-chart").getContext("2d");
  
    // Initialize the chart
    const sleepChart = new Chart(ctx, {
      type: 'line', // Line chart
      data: {
        labels: dates, // X-axis labels
        datasets: [{
          label: 'Sleep Quality',
          data: qualities, // Y-axis data
          borderColor: '#6a11cb',
          backgroundColor: 'rgba(106, 17, 203, 0.2)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
  };
  