const resultElement = document.getElementById("result");
let recognition;
let language='en-US';




function startConverting(){
    if('webkitSpeechRecognition' in window){
        recognition = new webkitSpeechRecognition();
        setupRecognition(recognition);
        recognition.start();
    }
}

function setupRecognition(recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; 
    recognition.onresult = function (event) {
        const { finalTranscript, interTranscript } = processResult(event.results);
        resultElement.innerHTML = finalTranscript + interTranscript;
    }
}
function processResult(results){
    let finalTranscript='';
    let interTranscript='';
    for(let i=0;i < results.length; i++){
        let transcript=results[i][0].transcript;
        transcript.replace("/n","<br>");

        if(results[i].isFinal){
            finalTranscript += transcript;
        }else{
            interTranscript +=transcript;
        }
    }
    return{finalTranscript,interTranscript}
}
function saveTranscript() {
    const textToSave = resultElement.innerText || "";
    const blob = new Blob([textToSave], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transcript.txt";
    link.click();
}
function clearTranscript() {
    resultElement.innerHTML = "";
}

d
function copyToClipboard() {
    const textToCopy = resultElement.innerText || "";
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Transcript copied to clipboard!");
    }).catch((error) => {
        console.error("Error copying to clipboard: ", error);
    });
}


function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
function stopConverting(){
    if(recognition){
        recognition.stop();
    }
}