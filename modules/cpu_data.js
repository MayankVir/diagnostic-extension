// chrome.runtime.onMessage.addListener((request) => {
//             console.log("cpu data here");
//             document.getElementById("cpu_name").innerHTML = request.modelName;
//             document.getElementById("cpu_arch").innerHTML = request.archName;
//             let cpuFeatures = request.features;
//             document.getElementById("cpu_feat").innerHTML = cpuFeatures;
//             // if(request.temperatures.length===0) {
//                   document.getElementById("cpu_temp").innerHTML = "Empty";
//             // }
//             // else {
//             //       document.getElementById("cpu_temp").innerHTML = request.temperatures;
//             // }
//             return true;
//       }
// );

// chrome.runtime.onMessage.addListener(
//       function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//                     "from a content script:" + sender.tab.url :
//                     "from the extension");
//         if (request.greeting == "hello")
//           sendResponse({farewell: "goodbye"});
//       }
// );
// chrome.runtime.onConnect.addListener(function(port) {
//       console.assert(port.name == "knockknock");
//       port.onMessage.addListener(function(msg) {
//         if (msg.joke == "Knock knock")
//           port.postMessage({question: "Who's there?"});
//         else if (msg.answer == "Madame")
//           port.postMessage({question: "Madame who?"});
//         else if (msg.answer == "Madame... Bovary")
//           port.postMessage({question: "I don't get it."});
//       });
//     });

// ---->> THIS IS WORKING <<----

// const port = chrome.runtime.connect({name: "A"});

// port.postMessage({joke: "Knock knock"});
//       port.onMessage.addListener(function(msg) {
//             if (msg.question == "Who's there?")
//             port.postMessage({answer: "Madame"});
//             else if (msg.question == "Madame who?")
//             port.postMessage({answer: "Madame... Bovary"});
// });
var port = chrome.runtime.connect({name: "knockknock"});
port.onMessage.addListener(function(request) {
      console.log(request);
      document.getElementById("cpu_name").innerHTML = request[0].modelName;
      document.getElementById("cpu_arch").innerHTML = request[0].archName;
      document.getElementById("cpu_feat").innerHTML = request[0].features.join(', ').toUpperCase();
      document.getElementById("cpu_temp").innerHTML = request[0].temperatures;
      document.getElementById("cpu_name").classList.add('dark');
      document.getElementById("cpu_arch").classList.add('dark');
      document.getElementById("cpu_feat").classList.add('dark');
      document.getElementById("cpu_temp").classList.add('dark');


      // ----> TO CHECK <-----
      var cpuUsage = document.getElementById('cpu_util');
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
      
      
      let eachStorage = document.getElementById("storage_name");
      let dummyStorage = request[1];
      for(let i=0; i<request[1].length; i++) {
            let storage_data = document.createElement('div');
            storage_data.innerHTML = dummyStorage[i].name + " - " + parseInt((dummyStorage[i].capacity/(1024*1024*1024))) + " GB";
            storage_data.classList.add('storage_spacer', 'dark');
            eachStorage.appendChild(storage_data);
      }
      
      
      
      document.getElementById("memory_total").innerHTML = parseInt((request[2].capacity)/(1024*1024)) + " GB";
      document.getElementById("memory_total").classList.add('storage_spacer', 'dark');

});