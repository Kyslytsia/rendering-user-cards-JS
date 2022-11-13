const gradation = {
  20: "satisfactory",
  55: "good",
  85: "very-good",
  100: "excellent",
};

function grad(mark) {
  for (const keys in gradation) {
    if (mark <= keys) {
      return gradation[keys];
    }
  }
}

const users = [
  {
    name: "Jack Smith",
    age: 23,
    img: "JackSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 20,
      },
      {
        title: "Java Enterprise",
        mark: 100,
      },
    ],
  },

  {
    name: "Amal Smith",
    age: 20,
    img: "AmalSmith",
    role: "student",
  },

  {
    name: "Noah Smith",
    age: 43,
    img: "NoahSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 50,
      },
    ],
  },

  {
    name: "Charlie Smith",
    age: 18,
    img: "CharlieSmith",
    role: "student",
    courses: [
      {
        title: "Front-end Pro",
        mark: 75,
      },
      {
        title: "Java Enterprise",
        mark: 23,
      },
    ],
  },

  {
    name: "Emily Smith",
    age: 30,
    img: "EmilySmith",
    role: "admin",
    courses: [
      {
        title: "Front-end Pro",
        score: 10,
        lector: "Leo Smith",
      },
      {
        title: "Java Enterprise",
        score: 50,
        lector: "David Smith",
      },
      {
        title: "QA",
        score: 75,
        lector: "Emilie Smith",
      },
    ],
  },

  {
    name: "Leo Smith",
    age: 25,
    img: "LeoSmith",
    role: "lector",
    courses: [
      {
        title: "Front-end Pro",
        score: 78,
        studentsScore: 79,
      },
      {
        title: "Java Enterprise",
        score: 85,
        studentsScore: 85,
      },
    ],
  },
];

class User {
  constructor(args) {
    this.name = args.name;
    this.age = args.age;
    this.img = args.img;
    this.role = args.role;
    if (args.courses) {
      this.courses = args.courses;
    }
  }

  render() {
    return `
    <div class="user">
      <div class="user__info">
        <div class="user__info--data">
          <img src="images/users/${this.img}.png" alt=${this.name} height="50">
          <div class="user__naming">
            <p>Name: <b>${this.name}</b></p>
            <p>Age: <b>${this.age}</b></p>
          </div>
        </div>
        <div class="user__info--role ${this.role}">
          <img src="images/roles/${this.role}.png" alt=${this.role} height="25">
          <p>${this.role}</p>
        </div>
      </div>
      ${this.renderCourses()}
    </div>`;
  }

  renderCourses() {
    if (this.courses?.length > 0) {
      return `<div class="user__courses">
      ${this.courses
        .map(
          (el) =>
            `<p class="user__courses--course student">${
              el.title
            }<span class="${grad(el.mark)}">${grad(el.mark)}</span></p>`
        )
        .join("")}
    </div>`;
    } else {
      return "";
    }
  }
}

class Admin extends User {
  renderCourses() {
    return `<div class="user__courses admin--info">
              ${this.courses
                .map(
                  (el) => `
              <div class="user__courses--course admin">
                <p>Title: <b>${el.title}</b></p>
                <p>Admin's score: <span class="${grad(el.score)}">${grad(
                    el.score
                  )}</span></p>
                <p>Lector: <b>${el.lector}</b></p>
              </div>`
                )
                .join("")}
	          </div>`;
  }
}

class Lector extends User {
  renderCourses() {
    return `<div class="user__courses admin--info">
              ${this.courses
                .map(
                  (el) => `
                  <div class="user__courses--course lector">
                    <p>Title: <b>${el.title}</b></p>
                    <p>Lector's score: <span class="${grad(el.score)}">${grad(
                    el.score
                  )}</span></p>
                    <p>Average student's score: <span class="${grad(
                      el.score
                    )}">${grad(el.score)}</span></p>
                  </div>`
                )
                .join("")}
	          </div>`;
  }
}

class Student extends User {}

document.write(`<div class="users"></div>`);

const ROLES_MAP = {
  student: (user) => new Student(user),
  lector: (user) => new Lector(user),
  admin: (user) => new Admin(user),
  default: (user) => new User(user),
};

const body = document.querySelector(".users");

body.innerHTML = users
  .map((el) => ROLES_MAP[el.role](el) ?? ROLES_MAP.default(el)) // тут создаем нужный экземпляр класса
  .map((obj) => obj.render()) // тут по цепочке уже будет нужный объект с нужным render методом
  .join(""); // все приводим к строке
