var port = chrome.runtime.connect({name: "knockknock"});
port.onMessage.addListener(function(request) {
      
      document.querySelector(".cpu_name_content").textContent = request[0].modelName;
      document.querySelector(".cpu_arch_content").textContent = request[0].archName;
      document.querySelector(".cpu_features_content").textContent = request[0].features.join(', ').toUpperCase();
      document.querySelector(".cpu_temp_content").textContent = request[0].temperatures;


      var cpuUsage = document.querySelector('.cpu_processors_chart');
      var width = parseInt(window.getComputedStyle(cpuUsage).width.replace(/px/g, ''));
      for (var i = 0; i < request[0].numOfProcessors; i++) {
            var cpuBar = document.createElement('div');
            cpuBar.classList.add('bar');
            var usedSection = document.createElement('span');
            usedSection.classList.add('bar-section', 'used');
            usedSection.style.transform = 'translate(-' + width + 'px, 0px)';
            cpuBar.appendChild(usedSection);
            cpuUsage.appendChild(cpuBar);
      }

      let eachStorage = document.querySelector(".storage_content");
      let dummyStorage = request[1];
      for(let i=0; i<dummyStorage.length; i++) {
            let storage_data = document.createElement('div');
            storage_data.innerHTML = dummyStorage[i].name + " - " + parseInt((dummyStorage[i].capacity/(1024*1024*1024))) + " GB";
            storage_data.classList.add('storage_spacer');
            eachStorage.appendChild(storage_data);
      }
      
      document.querySelector(".memory_total_content").textContent = parseInt(Math.round((request[2].capacity)/(1024*1024*1024))) + " GB";
      document.querySelector(".memory_total_content").classList.add('storage_spacer', 'storage_content');

});   