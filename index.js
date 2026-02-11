function addStock() {
  const box1 = document.querySelector(".box1");

  box1.insertAdjacentHTML("beforeend", `
    <h2>New Stock</h2>
    <input type ="text" class="stock-name" placeholder="Stock Name">
    <br>
    <input type="number" class="dps" placeholder="DPS (Annual)">
    <br>
    <input type="number" class="shares" placeholder="Number of Shares">
  `);
}

let myChart;

function calculateTotal() {
  const nameList = document.querySelectorAll(".stock-name");
  const dpsList = document.querySelectorAll(".dps");
  const shareList = document.querySelectorAll(".shares");

  let total = 0;
  let dividends = [];
  let labels = [];

  for (let i = 0; i < dpsList.length; i++) {
    const dps = Number(dpsList[i].value);
    const shares = Number(shareList[i].value);
    const stockTotal = dps * shares; 

    if(stockTotal > 0){
      dividends.push(stockTotal);
      labels.push(nameList[i].value || `Stock ${i+1}`);
      total += stockTotal;
    }
  }

  document.getElementById("yearly").textContent =
    "Yearly: " + total;
  document.getElementById("monthly").textContent =
    "Monthly: " + (total / 12).toFixed(2);

  if (myChart) {
    myChart.destroy();
  }

  const ctx = document.getElementById('chart').getContext('2d');

  myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: labels,
    datasets: [{
      data: dividends
    }]
  },
  options: {
    plugins: {
      legend:{display: false},
      datalabels: {
        color: "black", 
        font: {
          weight: "bold",
          size: 18
        },
        formatter: function(value, context) {
          const total = context.chart._metasets[0].total;
          const percent = ((value / total) * 100).toFixed(1);
          return context.chart.data.labels[context.dataIndex] + "\n" + value + " (" + percent + "%)";
        }
      }
    }
  },
  plugins: [ChartDataLabels]
  });
}