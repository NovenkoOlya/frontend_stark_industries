// Клас Користувача
class User {
    constructor(lastName, firstName, age, education, goal, date, time) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.age = age;
        this.education = education;
        this.goal = goal;
        this.date = date;
        this.time = time;
    }
}

class UserManager {
    constructor(users = []) {
        this.users = users;
    }

    addUser(user) {
        this.users.push(user);
    }

    // 2.1. Виведення переліку за місяцем та моментом часу
    filterByMonthAndTime(targetMonth, targetTime) {
        console.log(`\n2.1. Користувачі, що звернулись у місяць "${targetMonth}" о "${targetTime}":`);
        let filtered = this.users.filter(u => u.date.startsWith(targetMonth) && u.time === targetTime);
        if (filtered.length === 0) {
            console.log("  Нікого не знайдено.");
        } else {
            filtered.forEach(u => console.log(`  - ${u.lastName} ${u.firstName} (${u.goal})`));
        }
    }

    // 2.2. Середній вік користувача
    getAverageAge() {
        let totalAge = this.users.reduce((sum, u) => sum + u.age, 0);
        let avg = totalAge / this.users.length;
        console.log(`\n2.2. Середній вік користувачів: ${avg.toFixed(1)} років`);
        return avg;
    }

    // 2.3. Поділ користувачів на 3 класи
    classifyUsers() {
        let classes = {
            middleWorkTime: [],
            seniorNonWorkTime: [],
            others: []
        };

        this.users.forEach(u => {
            let hour = parseInt(u.time.split(':')[0], 10);
            let isWorkTime = hour >= 9 && hour < 17;
            let isMiddleAge = u.age >= 25 && u.age <= 60;
            let isSenior = u.age > 60;

            if (isMiddleAge && isWorkTime) {
                classes.middleWorkTime.push(u);
            } else if (isSenior && !isWorkTime) {
                classes.seniorNonWorkTime.push(u);
            } else {
                classes.others.push(u);
            }
        });

        console.log("\n2.3. Розподіл по класах:");
        console.log(`- Середній вік у робочий час: ${classes.middleWorkTime.length} осіб`);
        console.log(`- Похилого віку у неробочий час: ${classes.seniorNonWorkTime.length} осіб`);
        console.log(`- Інші: ${classes.others.length} осіб`);
    }

    // 2.4. Сортування в алфавітному порядку + вивід мети
    sortAndShowGoal() {
        let sorted = [...this.users].sort((a, b) => a.lastName.localeCompare(b.lastName, 'uk'));
        console.log("\n2.4. Користувачі в алфавітному порядку (з метою звернення):");
        sorted.forEach(u => console.log(`  - ${u.lastName} ${u.firstName}: Мета - "${u.goal}"`));
    }
}

// 2. Створення 10 облікових записів
const userList = [
    new User("Старк", "Тоні", 45, "Вища", "Запит на інвестиції", "2026-10-15", "11:30"),
    new User("Роджерс", "Стів", 101, "Середня", "Консультація щодо архівів", "2026-10-15", "18:00"),
    new User("Романова", "Наташа", 36, "Вища", "Партнерська програма", "2026-09-10", "14:00"),
    new User("Беннер", "Брюс", 50, "Науковий ступінь", "Технічна підтримка", "2026-10-15", "11:30"),
    new User("Паркер", "Пітер", 20, "Неповна вища", "Стажування в Stark Lab", "2026-10-12", "16:45"),
    new User("Вільсон", "Сем", 40, "Вища", "Оновлення обладнання", "2026-08-05", "08:15"),
    new User("Барнс", "Бакі", 104, "Середня", "Скарга на роботу сервісу", "2026-10-20", "20:30"),
    new User("Денверс", "Керол", 38, "Вища", "Питання безпеки", "2026-09-10", "10:00"),
    new User("Стрендж", "Стівен", 42, "Доктор наук", "Запит на співпрацю", "2026-10-01", "12:00"),
    new User("Леншерр", "Ерік", 65, "Вища", "Запит до ради директорів", "2026-10-18", "19:00")
];

console.log("\n=== ЗАВДАННЯ 2 (ООП) ===");
const manager = new UserManager(userList);

manager.filterByMonthAndTime("2026-10", "11:30");
manager.getAverageAge();
manager.classifyUsers();
manager.sortAndShowGoal();
