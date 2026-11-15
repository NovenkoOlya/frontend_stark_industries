// 1. Текст, що самодрукується (Головна сторінка)
const brandTitle = document.querySelector('.brand-title');
const alertBox = document.getElementById('typewriter-alert');

if (brandTitle && alertBox) {
    const titleWeight = parseInt(window.getComputedStyle(brandTitle).fontWeight, 10) || 600;
    alertBox.style.fontWeight = Math.min(900, Math.round(titleWeight * 1.5));
    alertBox.style.color = '#ff2a2a';

    const statusTag = document.createElement('span');
    statusTag.textContent = '[J.A.R.V.I.S. ALERT]: ';
    statusTag.style.color = '#00f0ff';
    alertBox.appendChild(statusTag);

    const message = "УВАГА: У зв'язку з різдвяними канікулами та релокацією штабу з 25.12 по 05.01 прийом відвідувачів здійснюється лише за спецперепустками.";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < message.length) {
            alertBox.append(message.charAt(charIndex));
            charIndex++;
            setTimeout(typeWriter, 40);
        }
    }
    typeWriter();
}

// 2. Модальне вікно при наведенні на блок напряму («Напрями діяльності»)
document.addEventListener('DOMContentLoaded', () => {
    const restrictedCard = document.querySelector('.activity-card.restricted');
    const modal = document.getElementById('security-modal');
    const confirmCheckbox = document.getElementById('confirm-protocol');
    const closeModalBtn = document.getElementById('close-modal-btn');

    let isConfirmed = false;

    if (restrictedCard && modal && confirmCheckbox && closeModalBtn) {
        restrictedCard.addEventListener('mouseenter', () => {
            if (!isConfirmed) {
                modal.style.display = 'flex';
            }
        });

        confirmCheckbox.addEventListener('change', (e) => {
            closeModalBtn.disabled = !e.target.checked;
        });

        closeModalBtn.onclick = function() {
            isConfirmed = true;
            modal.style.display = 'none';
        };
    }
});

// 3. Інтерактивне поле «Детально» + Tooltip («Зворотній зв’язок»)
const detailTextarea = document.getElementById('detailText');
const detailsTooltip = document.getElementById('details-tooltip');

if (detailTextarea && detailsTooltip) {
    detailTextarea.addEventListener('mouseenter', () => {
        detailTextarea.classList.add('hovered-field');
        detailsTooltip.style.display = 'inline-block';
    });

    detailTextarea.addEventListener('mouseleave', () => {
        detailTextarea.classList.remove('hovered-field');
        detailsTooltip.style.display = 'none';
    });
}

// 4. Нічний режим: затемнення фону всіх елементів на 40% (21:00 – 06:00)
function applyNightThemeIfNeeded() {
    const isHomePage = document.getElementById('typewriter-alert') !== null;
    if (!isHomePage) return;

    const allInputs = document.getElementsByTagName('input');

    const currentHour = new Date().getHours();
    const isNightTime = currentHour >= 21 || currentHour < 6;

    if (isNightTime) {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            const bgColor = computedStyle.backgroundColor;

            const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
            if (match) {
                const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
                if (alpha > 0) {
                    const r = Math.round(parseInt(match[1], 10) * 0.6);
                    const g = Math.round(parseInt(match[2], 10) * 0.6);
                    const b = Math.round(parseInt(match[3], 10) * 0.6);

                    const newBg = match[4] !== undefined
                        ? `rgba(${r}, ${g}, ${b}, ${alpha})`
                        : `rgb(${r}, ${g}, ${b})`;

                    el.style.setProperty('background-color', newBg, 'important');
                }
            }
        });

        console.log(`Нічний режим активовано (година: ${currentHour}:00). Фон усіх елементів темніший на 40%.`);
    }
}

document.addEventListener('DOMContentLoaded', applyNightThemeIfNeeded);