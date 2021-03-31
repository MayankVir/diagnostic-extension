
// chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.get(tab.tabId, tabInfo => {
//         if(/localhost:3000/.test(tabInfo.url)) {
//             chrome.system.cpu.getInfo((cpuInfo) => {
//                 chrome.tabs.sendMessage(tab.tabId, cpuInfo, null);
//                 chrome.tabs.executeScript(tab.tabId, {file: "modules/cpu_data.js"}, () => {
//                     console.log("YOYOYOYO I am foreground");
//                 });
//                 // console.log(cpuInfo);                
//             });
//             chrome.system.storage.getInfo((storageInfo) => {
//             //     chrome.tabs.sendMessage(tab.tabId, storageInfo, null);
//             //     chrome.tabs.executeScript(tab.tabId, {file: "modules/storage_data.js"}, () => {
//             //         console.log("YOYOYOYO I am foregbro");
//             //     })
//                 console.log(storageInfo);
//             });
//             chrome.system.memory.getInfo((memoryInfo) => {
//                 console.log(memoryInfo);
//             });
//             // chrome.tabs.executeScript(tab.tabId, {file: "./foreground.js"}, () => {
//             //     console.log("YOYOYOYO I am foreground");
//             // });
//         }
//     })
// })

// chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.get(tab.tabId, tabInfo => {
//         if(/localhost:3000/.test(tabInfo.url)) {
//             const port = chrome.tabs.connect(tab.tabId, {name: "A"});
//             port.postMessage({joke: "Knock knock"});
//             port.onMessage.addListener(function(msg) {
//             if (msg.question == "Who's there?")
//                 port.postMessage({answer: "Madame"});
//             else if (msg.question == "Madame who?")
//                 port.postMessage({answer: "Madame... Bovary"});
//             });
//         }
//     })
// })
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//       console.log(response);
//     });
// });


// console.log(chrome.tabs);


// const port = chrome.runtime.connect(null, {name: "A"});
// port.postMessage({txt: "Sent message from background from port"});
// console.log("Yaha se gya");
// chrome.runtime.onConnect.addListener((port) => {
//     console.log('connected to: ', port.name);
//     port.postMessage({
//         msg: 'hello from popup'
//     });
// })


// chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, (response) => {
//       console.log(response.farewell);
//     });
//   });

// var port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage({joke: "Knock knock"});
// port.onMessage.addListener(function(msg) {
//   if (msg.question == "Who's there?")
//     port.postMessage({answer: "Madame"});
//   else if (msg.question == "Madame who?")
//     port.postMessage({answer: "Madame... Bovary"});
// });

// let i=0;
// chrome.tabs.query({}, (tabInfo) => {
//     while(i<tabInfo.length) {
//         if(/localhost:3000/.test(tabInfo[i].url)) {
//             chrome.system.cpu.getInfo((cpuInfo) => {
//                 chrome.tabs.sendMessage(null, cpuInfo, null);
//                 chrome.tabs.executeScript(null, {file: "modules/cpu_data.js"}, () => {
//                     console.log("YOYOYOYO I am foreground");
//                 });
//                 console.log(cpuInfo);                
//             });
//             break;
//         }
//         i++;
//     }
// });


// ---->> THIS IS WORKING <-----


function updateAll() {
    let cpuInfo = chrome.system.cpu.getInfo((info) => {
        cpuInfo = info;
    });
    let storageInfo = chrome.system.storage.getInfo((info) => {
        storageInfo = info;
    });
    let memoryInfo = chrome.system.memory.getInfo((info) => {
        memoryInfo = info;
    });
    
    chrome.runtime.onConnect.addListener(function(port) {
        console.assert(port.name == "knockknock");
        console.log("Came here");
        console.log(cpuInfo);
        let allData = [cpuInfo, storageInfo, memoryInfo];
        port.postMessage(allData);
    });
    
    setInterval(updateAll, 2000);
}

updateAll();