const tools = document.getElementById('tools');
const Query = window.location.search;
const urlParams = new URLSearchParams(Query);
var passcode = '';
const VM = document.getElementById('VM');
const powerButton = document.getElementById('shutoff-button');
const rebootButton = document.getElementById('reboot-button');
const aboutButton = document.getElementById('about-button');
const quality = document.getElementById('quality');
const saveButton = document.getElementById('save-button');
const cpuIndicator = document.getElementById('cpu-indicator');
const ramIndicator = document.getElementById('ram-indicator');
const developerMode = document.getElementById('developer-mode');
const hardwareAcceleration = document.getElementById('hardware-acceleration');
const hardwareScaling = document.getElementById('hardware-scaling');
const hardwareRendering = document.getElementById('hardware-rendering');
const settingsButton = document.getElementById('settings-button');
const hibernateButton = document.getElementById('hibernate-button');
const fullScreenButton = document.getElementById('fullscreen-button');
const suspendModal = document.getElementById('suspend');
const suspendButton = document.getElementById('suspend-button');
const lockButton = document.getElementById('lock-button');
const down = document.getElementById('angle-down');
const indicator = document.getElementById('indicator');
const os = urlParams.get('os');
checkCPU();
if (os !== null) {
    VM.setAttribute('src', os);
} else {
    alert('You must specify a OS');
    indicator.style.display = 'flex';
}
// save ALL of these settings in a cookie
saveButton.addEventListener('click', function () {
    var settings = {
        quality: quality.value,
        developerMode: developerMode.checked,
        hardwareAcceleration: hardwareAcceleration.checked,
        hardwareScaling: hardwareScaling.checked,
        hardwareRendering: hardwareRendering.checked
    };
    document.cookie = 'settings=' + JSON.stringify(settings);
    // appear the indicator and say it "Successfully saved" for 3 seconds
    indicator.style.display = 'flex';
    indicator.innerHTML = 'Successfully saved';
    setTimeout(function () {
        indicator.style.display = 'none';
    }
    , 3000);
});
// when document autoloads, load the cookie settings
document.addEventListener('DOMContentLoaded', function () {
    var settings = document.cookie.split('=')[1];
    if (settings !== undefined) {
        settings = JSON.parse(settings);
        quality.value = settings.quality;
        qualityIndicator.innerHTML = 'VM Quality: ' + settings.quality;
        developerMode.checked = settings.developerMode;
        hardwareAcceleration.checked = settings.hardwareAcceleration;
        hardwareScaling.checked = settings.hardwareScaling;
        hardwareRendering.checked = settings.hardwareRendering;
    }
});
// display what cpu does the computer use (e.g. intel core i7, etc)
function checkCPU() {
    var xhr = new XMLHttpRequest();
    // cpu benchmark failed, we are gonna choose another api
    xhr.onload = function () {
        if (this.status === 200) {
            console.log('OK: Response text: ' + this.responseText);
            var data = JSON.parse(this.responseText);
            var cpu = data.cpus[0].name;
            cpuIndicator.innerHTML = 'CPU: ' + cpu;
        }
        else if (this.status === 400) {
            console.log('FAIL: Response text: ' + this.responseText);
        }
        else if (this.status === 500) {
            console.log('FAIL: Response text: ' + this.responseText);
        }
    };
}
// check this page memory usage
function checkMemoryUsage() {
    var memory = performance.memory;
    var used = memory.usedJSHeapSize / memory.totalJSHeapSize * 100;
    ramIndicator.innerHTML = 'RAM Consumption: ' + Math.round(used) + '%';
    console.log('HEAP: Memory usage: ' + Math.round(used) + '%');
}
const interval = setInterval(checkMemoryUsage, 1);
// show devmode div devmode checkbox is checked
developerMode.addEventListener('click', function () {
    if (developerMode.checked) {
        document.getElementById('devmode').style.display = 'block';
    } else {
        document.getElementById('devmode').style.display = 'none';
    }
});
// read quality value from range
quality.addEventListener('input', function () {
    const qualityIndicator = document.getElementById('quality-indicator');
    // set the vm quality
    VM.setAttribute('quality', quality.value);
    // set the quality indicator
    qualityIndicator.innerHTML = 'VM Quality: ' + quality.value;
    console.log('OK: VM quality set to ' + quality.value);
    // if hardware acceleration is enabled
    if (hardwareAcceleration.checked) {
        // set the vm quality
        VM.setAttribute('hardwareAcceleration', 'true');
        // set the quality indicator
        qualityIndicator.innerHTML = 'VM Quality: ' + quality.value + ' (Hardware Acceleration)';
        console.log('OK: VM quality set to ' + quality.value + ' (Hardware Acceleration)');
    }
    // set to auto when value is 50
    if (quality.value === '50') {
        VM.setAttribute('hardwareScaling', 'auto');
        console.log('OK: VM hardware scaling set to auto');
    }
});
// enable hardware rendering to VM element
hardwareRendering.addEventListener('click', function () {
    if (hardwareRendering.checked) {
        VM.setAttribute('hardware-rendering', 'true');
        console.log('OK: hardware rendering enabled');
    } else {
        VM.setAttribute('hardware-rendering', 'false');
        console.log('OK: hardware rendering disabled');
    }
});
// enable hardware scaling when checkbox is checked
hardwareScaling.addEventListener('change', function () {
    if (hardwareScaling.checked) {
        VM.setAttribute('scaling', 'true');
        console.log('OK: Hardware scaling enabled');
    } else {
        VM.setAttribute('scaling', 'false');
        console.log('OK: Hardware scaling disabled');
    }
});
// enable hardware acceleration when checkbox is ticked
hardwareAcceleration.addEventListener('change', function () {
    if (hardwareAcceleration.checked) {
        VM.setAttribute('webkit-transform-3d', 'true');
        console.log('OK: Hardware acceleration enabled');
    } else {
        VM.removeAttribute('webkit-transform-3d');
        console.log('OK: Hardware acceleration disabled');
    }
});
// show the about dialog when about button is clicked
aboutButton.addEventListener('click', function () {
    const about = document.getElementById('about');
    about.style.display = 'flex';
});
// show the settings dialog when cog is clicked
settingsButton.addEventListener('click', function () {
    const settings = document.getElementById('settings');
    settings.style.display = 'flex';
});
// hide the settings dialog when the close button is clicked
const closeSettings = document.getElementById('close-settings');
closeSettings.addEventListener('click', function () {
    const settings = document.getElementById('settings');
    settings.style.display = 'none';
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
            indicator.style.display = 'flex';
            indicator.innerHTML = 'The VM is currently locked. Click the &nbsp; <i class="fa-solid fa-lock"></i> &nbsp; again to unlock';
        } else {
            passcode = prompt('Set a passcode (this is needed so your VM wont be messed up by a baby :)');
            if (passcode === null) {
                alert('You must enter a passcode');
                passcode = prompt('Set a passcode');
            }
            VM.style.display = 'none';
            alert('The VM is now locked');
            indicator.style.display = 'flex';
            indicator.innerHTML = 'The VM is currently locked. Click the &nbsp; <i class="fa-solid fa-lock"></i> &nbsp; again to unlock';
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
