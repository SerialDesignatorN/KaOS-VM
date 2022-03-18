const tools = document.getElementById('tools');
const Query = window.location.search;
const urlParams = new URLSearchParams(Query);
var passcode = '';
const VM = document.getElementById('VM');
const powerButton = document.getElementById('shutoff-button');
const rebootButton = document.getElementById('reboot-button');
const aboutButton = document.getElementById('about-button');
const hibernateButton = document.getElementById('hibernate-button');
const fullScreenButton = document.getElementById('fullscreen-button');
const suspendModal = document.getElementById('suspend');
const suspendButton = document.getElementById('suspend-button');
const lockButton = document.getElementById('lock-button');
const down = document.getElementById('angle-down');
const indicator = document.getElementById('indicator');
const os = urlParams.get('os');
if (os !== null) {
    VM.setAttribute('src', os);
} else {
    alert('You must specify a OS');
    indicator.style.display = 'block';
}
// show the about dialog when about button is clicked
aboutButton.addEventListener('click', function () {
    const about = document.getElementById('about');
    about.style.display = 'flex';
});
// hide the about dialog when close button is clicked
const closeAbout = document.getElementById('close-about');
closeAbout.addEventListener('click', function () {
    const about = document.getElementById('about');
    about.style.display = 'none';
});
// hibernate the iframe
hibernateButton.addEventListener('click', () => {
    VM.contentWindow.postMessage('hibernate', '*');
});
// make the entire page fullscreen
fullScreenButton.addEventListener('click', () => {
    // make the page fullscreen
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});

// lock the iframe
lockButton.addEventListener('click', () => {
    // hide and show the iframe (toggling)
    if (VM.style.display === 'block') {
        if (passcode !== '') {
            VM.style.display = 'none';
            VM.style.display = 'none';
            alert('The VM is now locked');
            indicator.style.display = 'block';
            indicator.innerHTML = 'The VM is currently locked. Click the <i class="fa-solid fa-lock"></i> again to unlock';
        } else {
            passcode = prompt('Set a passcode (this is needed so your VM wont be messed up by a baby :)');
            if (passcode === null) {
                alert('You must enter a passcode');
                passcode = prompt('Set a passcode');
            }
            VM.style.display = 'none';
            alert('The VM is now locked');
            indicator.style.display = 'block';
            indicator.innerHTML = 'The VM is currently locked. Click the <i class="fa-solid fa-lock"></i> again to unlock';
        }
    }
    else {
        unlockPasscode = prompt('Enter the passcode to unlock the VM (blank if the first time doing this cuz its a bug');
        if (unlockPasscode === passcode) {
            VM.style.display = 'block';
            alert('The VM will unlocked');
            indicator.style.display = 'none';    
        }
        else {
            alert('Wrong passcode');
        }
    }
});
// suspend button
suspendButton.addEventListener('click', () => {
    // we need user confirmation
    var logic = 0;
    if (logic === 0) {
        suspendModal.style.display = 'block';
        logic = 1;
    } else if (logic === 1) {
        suspendModal.style.display = 'none';
        logic = 0;
    }
});

powerButton.addEventListener('click', () => {
    // shut the vm off by going back to the start page
    // but first we need user confirmation
    if (confirm('Are you sure you want to shut down the VM?')) {
        window.location.href = '../index.html';
    }
});
// reboot e vm by refreshing
rebootButton.addEventListener('click', () => {
    // we need user confirmation
    if (confirm('Are you sure you want to reboot the VM?')) {
        VM.src = VM.src;
    }
});
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		if (tools.style.display == 'none'){
            tools.style.display = 'block';
            console.log('requested');
        } else {
            tools.style.display = 'none';
        }
	}
});
down.addEventListener('mouseover', function(){
    tools.style.display = 'block';
});
tools.addEventListener('mouseleave', e => {
    tools.style.display = 'none';
});
