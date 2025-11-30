const cache = {
    result:null
};

const slowFunction = (timeout = 3000) => {
    let start = performance.now();
    let x = 0;
    let i = 0;
    do{
        i += 1;
        x += (Math.random() - 0.5) * i;
    }while(performance.now() - start < timeout);
    console.log('end', x);
    return x;
}

const recalculate = (timeout) => {
    cache.result = slowFunction(timeout);
    return cache.result;
}

const getCachedResult = (timeout) => {
    const cachedResult = cache.result;
    if(cachedResult) {
        return cachedResult;
    } else {
        return recalculate(timeout);
    }
}

const broadcast = async (msg) => {
    const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    });
    for(const client of clients) {
    client.postMessage(msg);
    }
}

self.addEventListener('activate', async (evt) => {
console.log('activate', evt);
evt.waitUntil(self.clients.claim());
});

self.addEventListener('message', async (evt) => {
    const { action, timeout = 3000 } = evt.data;
    console.log('message', evt);
    if(action === 'recalculate') {
        const result = recalculate(timeout);
        await broadcast({ result });
    } else if(action === 'getCachedResult') {
        const result = getCachedResult(timeout);
        await broadcast({ result });
    }
    // Реализуйте вызов фунций recalculate и getCachedResult при получении определённых сообщений
    // ...
    // await broadcast(...);
});
