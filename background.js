let our_url = "https://diagnosticapp.netlify.app"

// chrome.tabs.query({}, (tab) => {
//     if(tab[0].url === our_url) {

        const getData = () => {
            return new Promise(async (resolve, reject) => {
              const memory = await getMemory();
              const cpu = await getCpu();
              const storage = await getStorage();
              let final_data = [ cpu, storage, memory ];
              resolve(final_data);
            });
        };
        const getCpu = () => {
            return new Promise((resolve, reject) => {
              chrome.system.cpu.getInfo((data) => {
                resolve(data);
              });
            });
          };
          
          const getMemory = () => {
            return new Promise((resolve, reject) => {
              chrome.system.memory.getInfo((data) => {
                resolve(data);
              });
            });
          };
          
          const getStorage = () => {
            return new Promise((resolve, reject) => {
              chrome.system.storage.getInfo((data) => {
                resolve(data);
              });
            });
          };

        chrome.runtime.onConnect.addListener((port) => {

            if(port.name === "diagnosis") {
                port.onMessage.addListener(async (msg) => {
                    if(msg.name === "init-cpu") {
                        const data = await getData();
                        port.postMessage({name: "init-data", data})
                    }
                    if(msg.name === "update-cpu") {
                        updateAll();
                    }
                })
            }


            function updateAll() {

                setInterval(async () => {
                    const data = await getData();
                    port.postMessage({name: "update-data", data})
                }, 3000)
            }
        });
//       }
// });