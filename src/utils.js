import { fullScreenDialogueData, exps, projs } from './constants.js';

export function displayDialogue(text, onDialogueEnd) {
    const dialogueUI = document.getElementById('textbox-container');
    const dialogue = document.getElementById('dialogue');

    dialogueUI.style.display = 'block';

    let index = 0;
    let currentText = '';
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            const nextChar = text[index];
            currentText += nextChar;
            dialogue.innerHTML = currentText;
            index++;

            // If the next part of the text contains a link, insert it all at once
            if (nextChar === '<') {
                const linkEnd = text.indexOf('>', index);
                if (linkEnd !== -1) {
                    currentText += text.slice(index, linkEnd + 1);
                    index = linkEnd + 1;
                    dialogue.innerHTML = currentText;
                }
            }
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
    dialogue.innerHTML = text;
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

export function displayNavigableDialogue(allData, onDialogueEnd) {
    const dialogueUI = document.getElementById('full-textbox-container');
    const titleElement = document.getElementById('title');
    const dialogue = document.getElementById('full-dialogue');
    const closeBtn = document.getElementById('fullclose');
    const navLeft = document.getElementById('nav-left');
    const navRight = document.getElementById('nav-right');
    let currentIndex = 0;

    navLeft.style.display = 'inline-block';
    navRight.style.display = 'inline-block';

    function updateDialogue(index) {
        titleElement.innerText = allData[index].title;
        dialogue.innerHTML = allData[index].text;
    }
    
    updateDialogue(currentIndex);

    navLeft.onclick = () => {
        if (currentIndex > 0) {
            updateDialogue(--currentIndex);
        }
        else if (currentIndex === 0){
            updateDialogue(allData.length - 1);
            currentIndex = allData.length - 1;
        }
    };

    navRight.onclick = () => {
        if (currentIndex < allData.length - 1) {
            updateDialogue(++currentIndex);
        }
        else if (currentIndex === allData.length - 1) {
            updateDialogue(0);
            currentIndex = 0;
        }
    };

    function onCloseBtnClick() {
        onDialogueEnd();
        dialogueUI.style.display = 'none';
        titleElement.innerText = '';
        dialogue.innerText = '';
        closeBtn.removeEventListener('click', onCloseBtnClick);
        navLeft.onclick = null;
        navRight.onclick = null;
        document.removeEventListener('keydown', onKeyDown);
        document.getElementById("game").focus();

        navLeft.style.display = 'none';
        navRight.style.display = 'none';
    }

    function onKeyDown(event) {
        switch(event.key) {
            case 'Enter':
                onCloseBtnClick();
                break;
            case 'ArrowLeft':
                navLeft.click();
                break;
            case 'ArrowRight':
                navRight.click();
                break;
        }
    }

    closeBtn.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onKeyDown);
    dialogueUI.style.display = 'block';
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
        displayFullscreenDialogue(fullScreenDialogueData["aboutme"][0], fullScreenDialogueData["aboutme"][1], function() {
            console.log("Closed About Me");
        });
    });

    document.getElementById('experiences').addEventListener('click', () => {
        displayNavigableDialogue(exps, function() {
            console.log("Closed Experiences");
        });
    });

    document.getElementById('projects').addEventListener('click', () => {
        displayNavigableDialogue(projs, function() {
            console.log("Closed Experiences");
        });
    });

    document.getElementById('resume').addEventListener('click', () => {
        window.open('https://drive.google.com/file/d/1VWXZNxgw7ZgKtJios7U4BTuXGZlR4Gfb/view?usp=sharing', '_blank');
    });

    document.getElementById('contactMe').addEventListener('click', () => {
        displayFullscreenDialogue(fullScreenDialogueData["contactme"][0], fullScreenDialogueData["contactme"][1], function() {
            console.log("Closed Contact Me");
        });
    });

    // Setup for responsive navbar
    const hamburger = document.getElementById('hamburger-menu');
    const buttons = document.querySelectorAll('.navbar button');
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-content';
    dropdown.style.display = 'none';
    document.querySelector('.navbar').appendChild(dropdown);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.className = 'close-button';
    dropdown.appendChild(closeButton);

    buttons.forEach(button => {
        const item = button.cloneNode(true);
        item.style.display = 'block';
        dropdown.appendChild(item);
    });

    hamburger.addEventListener('click', () => {
        dropdown.style.display = (dropdown.style.display === 'none') ? 'block' : 'none';
    });

    closeButton.addEventListener('click', () => {
        dropdown.style.display = 'none';
    });

    dropdown.querySelectorAll('button').forEach(button => {
        if (button !== closeButton) {
            button.addEventListener('click', function() {
                dropdown.style.display = 'none';
                document.getElementById(button.id).click();
            });
        }
    });
}