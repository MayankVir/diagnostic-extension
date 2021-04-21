let processors_usage = [0, 0, 0, 0, 0];
let all_processors = [];
let avg_processor_usage = 0;
let updated_labels = [0, 0, 0, 0, 3];

let cpu_processors = document.querySelector(".cpu_processors_chart");
cpu_processors.insertAdjacentHTML('afterBegin',`<canvas id="myChart" width="500px" height="200px"></canvas>`);


let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
      type: 'line',
      data: {
            labels: [0, 0, 0, 0, 0],
            datasets: [{
                  label: 'Avg of All Processors Usage',
                  data: processors_usage,
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor:'rgba(54, 162, 235, 1)',
                  borderWidth: 2,
                  tension: 0.3
            }]
      },
});

var port = chrome.runtime.connect({name: "diagnosis"});
port.postMessage({ name: "init-cpu" });
port.onMessage.addListener((request) => {

      if(request.name === "init-data"){
            console.log(request);
            document.querySelector(".cpu_name_content").textContent = request.data[0].modelName;
            document.querySelector(".cpu_arch_content").textContent = request.data[0].archName;
            document.querySelector(".cpu_features_content").textContent = request.data[0].features.join(', ').toUpperCase();
            document.querySelector(".cpu_temp_content").textContent = request.data[0].temperatures;

            for(let i=0; i<request.data[0].numOfProcessors; i++) {
                  inner_value = request.data[0].processors[i];
                  all_processors[i] = request.data[0].processors[i];
                  value = Math.floor((inner_value.usage.kernel + inner_value.usage.user) / inner_value.usage.total * 100);
                  avg_processor_usage += value;
            }
            avg_processor_usage /= request.data[0].numOfProcessors;
            processors_usage[4] = avg_processor_usage;
            

            let eachStorage = document.querySelector(".storage_content");
            let dummyStorage = request.data[1];
            for(let i=0; i<dummyStorage.length; i++) {
                  let storage_data = document.createElement('div');
                  storage_data.innerHTML = dummyStorage[i].name + " - " + parseInt((dummyStorage[i].capacity/(1024*1024*1024))) + " GB";
                  storage_data.classList.add('storage_spacer');
                  eachStorage.appendChild(storage_data);
            }
            
            document.querySelector(".memory_total_content").textContent = parseInt(Math.round((request.data[2].capacity)/(1024*1024*1024))) + " GB";
            document.querySelector(".memory_total_content").classList.add('storage_spacer', 'storage_content');

            port.postMessage({name: "update-cpu"});
      }
      
      else if(request.name === "update-data") {
            for(let i=0; i<request.data[0].numOfProcessors; i++) {
                  inner_value = request.data[0].processors[i];
                  prev_processors = all_processors[i];
                  value = Math.floor((inner_value.usage.kernel + inner_value.usage.user - prev_processors.usage.kernel - prev_processors.usage.user) / (inner_value.usage.total-prev_processors.usage.total) * 100);
                  avg_processor_usage += value;
            }
            
            avg_processor_usage = parseInt(avg_processor_usage/request.data[0].numOfProcessors)
            processors_usage[0] = processors_usage[1]
            processors_usage[1] = processors_usage[2]
            processors_usage[2] = processors_usage[3]
            processors_usage[3] = processors_usage[4]
            processors_usage[4] = avg_processor_usage


            updated_labels[0] = updated_labels[1]
            updated_labels[1] = updated_labels[2]
            updated_labels[2] = updated_labels[3]
            updated_labels[3] = updated_labels[4]
            updated_labels[4] += 3;

            myChart.data.labels = updated_labels;
            myChart.data.datasets[0].data = processors_usage;
            myChart.update();

      }
});   