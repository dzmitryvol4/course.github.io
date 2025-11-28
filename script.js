//broadcast.onmessage = (evt) => {
//document.getElementById('result').innerHTML = evt.data;
//};

//document.getElementById('start').addEventListener('click', () => {
//window.open('./thread.html','thread','popup,left=500,top=100,width=320,height=320');
//});
let thread = null;

document.getElementById('start').addEventListener('click', () => {
if (window.Worker) {
    if(!thread){
        thread = new Worker("./thread.js");
//        thread.onmessage = (evt) => {
//            console.log(evt)
//            document.getElementById('result').innerHTML = `returned value from worker ${evt.data}`;
////            thread.terminate();
//        };

        thread.addEventListener('message', evt => {
        document.getElementById('result').innerHTML = evt.data;
        });

        thread.postMessage({ timeout: 5000});
        } else {
            console.log("used already exist worker")
//            thread.onmessage = (evt) => {
//                console.log(evt)
//                document.getElementById('result').innerHTML = `returned value from already exist worker ${evt.data}`;
//            };

            thread.addEventListener('message', evt => {
                document.getElementById('result').innerHTML = evt.data;
            });
            thread.postMessage({ timeout: 5000});
        }
    }else {
    console.log("not worked")
    }
});