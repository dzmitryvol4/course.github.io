const getServiceWorker = async (scriptURL, options) => {
    if("serviceWorker" in navigator) {
        try{
            let registration = await navigator.serviceWorker.getRegistration();
            if (!registration) {
                registration = await navigator.serviceWorker.register(scriptURL, options);
                await navigator.serviceWorker.ready;
            }
            return{
                    registration: registration,
                    container: navigator.serviceWorker,
                    controller: registration.active,
                    addEventListener: navigator.serviceWorker.addEventListener.bind(navigator.serviceWorker),
                    postMessage: registration.active.postMessage.bind(registration.active)
                };
            }catch(error) {
        console.error(`Registration failed with${error}`);
        }
    }
}


(async () => {
    const serviceWorker = await getServiceWorker("./thread-worker.js", { scope:"./"});
        if (!serviceWorker) return;

    console.log(serviceWorker);
    const resultWorker = document.getElementById("resultServiceWorker");
    serviceWorker.addEventListener("message", (event) => {
        console.log(event)
        resultWorker.textContent = `EvenData: ${event.data.result}`;
    })

    document.getElementById("startServiceWorker").addEventListener("click", () => {
        serviceWorker.postMessage({ action: "recalculate" , timeout: 3000})
    })

    serviceWorker.postMessage({action:"getCachedResult"});
// Your code here...
})();