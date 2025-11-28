//broadcast.onmessage = (evt) => {
//document.getElementById('result').innerHTML = evt.data;
//};

//document.getElementById('start').addEventListener('click', () => {
//window.open('./thread.html','thread','popup,left=500,top=100,width=320,height=320');
//});

document.getElementById('start').addEventListener('click', () => {
if (window.Worker) {
const thread = new Worker("./thread.js");
    thread.onmessage = (evt) => {
        console.log(evt)
        document.getElementById('result').innerHTML = `returned value from worker ${evt.data}`;
        thread.terminate();
    }
} else {
    console.log("not worked")
}
});