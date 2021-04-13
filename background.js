
function initAll() {

    let our_url = "http://localhost:3000/"

    chrome.tabs.query({}, (tab) => {
        if(tab[0].url === our_url) {

            let cpuInfo = chrome.system.cpu.getInfo((info) => {
                cpuInfo = info;
            });
            let storageInfo = chrome.system.storage.getInfo((info) => {
                storageInfo = info;
            });
            let memoryInfo = chrome.system.memory.getInfo((info) => {
                memoryInfo = info;
            });

            chrome.runtime.onConnect.addListener((port) => {
                console.assert(port.name == "knockknock");
                console.log("Came here");
                console.log(cpuInfo);
                let allData = [cpuInfo, storageInfo, memoryInfo];
                port.postMessage(allData);
            });
        }
    });
}

initAll();