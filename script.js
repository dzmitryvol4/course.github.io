const broadcast = new BroadcastChannel("test_channel");

broadcast.onmessage = (evt) => {
document.getElementById('result').innerHTML = evt.data;
};

//document.getElementById('start').addEventListener('click', () => {
//window.open('./thread.html','thread','popup,left=500,top=100,width=320,height=320');
//});

document.getElementById('start').addEventListener('click', () => {
if (window.Worker) {
const thread =new Worker("./thread.js");
}
});