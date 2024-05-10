import { dialogueData, fullScreenDialogueData } from './constants.js';

export function displayDialogue(text, onDialogueEnd) {
    const dialogueUI = document.getElementById('textbox-container');
    const dialogue = document.getElementById('dialogue');

    dialogueUI.style.display = 'block';

    let index = 0;
    let currentText = '';
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            currentText += text[index];
            dialogue.innerHTML = currentText;
            index++;
            return;
        }

        clearInterval(intervalRef);
    }, 5);

    const closeBtn = document.getElementById('close');

    function onCloseBtnClick() {
        onDialogueEnd();
        dialogueUI.style.display = 'none';
        dialogue.innerHTML = '';
        clearInterval(intervalRef);
        closeBtn.removeEventListener('click', onCloseBtnClick);
        document.removeEventListener('keydown', onKeyDown);
        document.getElementById("game").focus();
    }

    function onKeyDown(event) {
        if (event.key === 'Enter') {
            onCloseBtnClick();
        }
    }

    closeBtn.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onKeyDown);
}

export function displayFullscreenDialogue(title, text, onDialogueEnd) {
    const dialogueUI = document.getElementById('full-textbox-container');
    const titleElement = document.getElementById('title');
    const dialogue = document.getElementById('full-dialogue');
    const closeBtn = document.getElementById('fullclose');

    titleElement.innerText = title;
    dialogue.innerText = text;
    dialogueUI.style.display = 'block';

    function onCloseBtnClick() {
        onDialogueEnd();
        dialogueUI.style.display = 'none';
        titleElement.innerText = '';
        dialogue.innerText = '';
        closeBtn.removeEventListener('click', onCloseBtnClick);
        document.removeEventListener('keydown', onKeyDown);
        document.getElementById("game").focus();
    }

    function onKeyDown(event) {
        if (event.key === 'Enter') {
            onCloseBtnClick();
        }
    }

    closeBtn.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onKeyDown);
}

export function setCamScale(k) {
    const resizeFactor = k.width() / k.height()

    if (resizeFactor < 1) {
        k.camScale(k.vec2(1))
        return;
    } 
    k.camScale(k.vec2(1.5))
}

export function setupNavbarEventListeners() {
    document.getElementById('aboutMe').addEventListener('click', () => {
        console.log("About Me clicked");
        displayFullscreenDialogue(fullScreenDialogueData["aboutme"][0], fullScreenDialogueData["aboutme"][1], function() {
            console.log("Closed About Me");
        });
    });

    document.getElementById('experiences').addEventListener('click', () => {
        displayFullscreenDialogue(fullScreenDialogueData["experiences"][0], fullScreenDialogueData["experiences"][1], function() {
            console.log("Closed Experiences");
        });
    });

    document.getElementById('projects').addEventListener('click', () => {
        displayFullscreenDialogue(fullScreenDialogueData["projects"][0], fullScreenDialogueData["projects"][1], function() {
            console.log("Closed Projects");
        });
    });

    document.getElementById('contactMe').addEventListener('click', () => {
        displayFullscreenDialogue(fullScreenDialogueData["contactme"][0], fullScreenDialogueData["contactme"][1], function() {
            console.log("Closed Contact Me");
        });
    });
}