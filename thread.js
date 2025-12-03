console.log("thread2")
let thread2 = new Worker("./thread2.js");;

thread2.onmessage = (evt) => {
    const result = evt.data;
    postMessage(result)
}

onmessage = (evt) => {
    const result = evt.data;
    thread2.postMessage(result)
}


//    thread2.postMessage({timeout: 1000})


