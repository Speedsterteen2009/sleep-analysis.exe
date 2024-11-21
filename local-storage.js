// Example sleep data to test
const sleepData = [
    { date: "2024-11-19", quality: 4 },
    { date: "2024-11-20", quality: 3 },
    { date: "2024-11-21", quality: 5 }
  ];
  
  // Save the data to localStorage
  localStorage.setItem("sleepLogs", JSON.stringify(sleepData));
  