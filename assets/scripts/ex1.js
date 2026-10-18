let directions = [
    { id: 101, name: "Чиста термоядерна енергетика (Arc Reactor Technology)", department: "Департамент енергетики", govLink: "Міненерго", usersDay1: 350, usersDay2: 420, duration: 24 },
    { id: 102, name: "Захисна робототехніка та бронекостюми", department: "Інженерний відділ", govLink: "Міноборони", usersDay1: 290, usersDay2: 310, duration: 12 },
    { id: 103, name: "Штучний Інтелект та автономні нейромережі (J.A.R.V.I.S. / F.R.I.D.A.Y.)", department: "IT-департамент", govLink: "Мінцифри", usersDay1: 500, usersDay2: 600, duration: 6 },
    { id: 104, name: "Аерокосмічні та орбітальні системи", department: "Аерокосмічний сектор", govLink: "ДКАУ", usersDay1: 180, usersDay2: 200, duration: 36 },
    { id: 105, name: "Військово-оборонне та тактичне обладнання", department: "Тактичний відділ", govLink: "Міноборони", usersDay1: 150, usersDay2: 90, duration: 12 },
    { id: 106, name: "Медичні нанотехнології та біомедицина", department: "Біомед лабораторія", govLink: "МОЗ", usersDay1: 210, usersDay2: 230, duration: 18 },
    { id: 107, name: "Квантові обчислення та голографічні інтерфейси", department: "R&D Центр", govLink: "МОН", usersDay1: 320, usersDay2: 410, duration: 24 },
    { id: 108, name: "Екологічна очистка та відновлення природних ресурсів", department: "Екодепартамент", govLink: "Міндовкілля", usersDay1: 95, usersDay2: 110, duration: 6 },
    { id: 109, name: "Глобальна кібербезпека та криптографія", department: "IT-департамент", govLink: "ДССЗЗІ", usersDay1: 280, usersDay2: 300, duration: 12 },
    { id: 110, name: "Захисні енергетичні бар'єри та силові поля", department: "Лабораторія фізики", govLink: "Рада безпеки", usersDay1: 140, usersDay2: 85, duration: 18 }
];

console.log("=== ЗАВДАННЯ 1 ===");

// 1.1. Впорядкування за тривалістю та середнє охоплення користувачів
function processByDuration(data) {
    let sorted = [...data].sort((a, b) => a.duration - b.duration);
    console.log("1.1. Напрями, впорядковані за тривалістю:", sorted);

    let durationGroups = {};
    sorted.forEach(item => {
        let totalUsers = item.usersDay1 + item.usersDay2;
        if (!durationGroups[item.duration]) {
            durationGroups[item.duration] = { totalUsers: 0, count: 0 };
        }
        durationGroups[item.duration].totalUsers += totalUsers;
        durationGroups[item.duration].count += 1;
    });

    console.log("Середня кількість користувачів за тривалістю послуги:");
    for (let duration in durationGroups) {
        let avg = durationGroups[duration].totalUsers / durationGroups[duration].count;
        console.log(`- Тривалість ${duration} міс.: середнє = ${avg.toFixed(1)} користувачів`);
    }
}
processByDuration(directions);

// 1.2. Напрям з мінімальною кількістю користувачів за добу_2
function findMinDay2Department(data) {
    let minItem = data.reduce((min, item) => item.usersDay2 < min.usersDay2 ? item : min, data[0]);
    console.log(`\n1.2. Напрям з мін. користувачів за добу_2: "${minItem.name}" (${minItem.usersDay2} чол.). Вiддiл: ${minItem.department}`);
}
findMinDay2Department(directions);

// 1.3. Додавання нового напряму
function addDirection(list, newDirection) {
    let isComplete = newDirection.id && newDirection.name && newDirection.department && 
                       newDirection.govLink && newDirection.usersDay1 !== undefined && 
                       newDirection.usersDay2 !== undefined && newDirection.duration;

    if (!isComplete) {
        console.log("\n1.3. Інформація неповна! Додаємо в кінець списку.");
        list.push(newDirection);
    } else {
        console.log("\n1.3. Всі дані є. Шукаємо місце у списку за внутрішнім ID.");
        let index = list.findIndex(item => item.id > newDirection.id);
        if (index === -1) {
            list.push(newDirection);
        } else {
            list.splice(index, 0, newDirection);
        }
    }
    return list;
}

addDirection(directions, { id: 103.5, name: "Квантові обчислення", department: "IT-відділ", govLink: "МОН", usersDay1: 100, usersDay2: 120, duration: 18 });

// 1.4. Обчислення сумарної тривалості надання кількох послуг
function calculateTotalDuration(servicesDurations) {
    let count = servicesDurations.length;
    let multiplier = 1;

    switch (count) {
        case 1:
            multiplier = 0.95;
            break;
        case 2:
        case 3:
            multiplier = 0.95;
            break;
        default:
            multiplier = 0.6;
            break;
    }

    let total = servicesDurations.reduce((sum, d) => sum + (d * multiplier), 0);
    console.log(`\n1.4. Тривалість для ${count} послуг [${servicesDurations.join(", ")}]: ${total.toFixed(2)} (коефіцієнт ${multiplier})`);
    return total;
}

calculateTotalDuration([12]);
calculateTotalDuration([12, 6, 24]);
calculateTotalDuration([10, 20, 30, 40]);
