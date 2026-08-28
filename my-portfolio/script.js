/* global BABYLON */

const projects = {
    babylon: {
        cat: "GAME DEVELOPMENT · 2026",
        title: "Babylon: Fable That Flows Into the Infinite",
        desc: "A 3D RPG exploring the consequences of war.",
        tools: "UNITY · C# · MAYA",
        image: "/babylon.jpg",
        demo: "#",
        github: "#"
    },

    DesignThinking: {
        cat: "2D QUIZ GAME · 2025",
        title: "TAMMY QUIZ RUSH: DESIGN THINKING",
        desc: "A 2D quiz game focused on Design Thinking.",
        tools: "2D · UNITY",
        image: "/design-thinking.jpg",
        demo: "#",
        github: "#"
    },

    SDG: {
        cat: "2D QUIZ GAME · 2026",
        title: "TAMMY QUIZ RUSH: SDG QUEST",
        desc: "A 2D quiz game focused on Sustainable Development Goals.",
        tools: "2D · UNITY",
        image: "/sdg-quest.jpg",
        demo: "#",
        github: "https://github.com/JhayD02/Tammy-s-Quiz-Rush-SDG-Quest"
    }
};

// Keep a small, session-only trail of meaningful portfolio interactions.
const activityLog = document.querySelector("#activityLog");

function addLog(message) {
    if (!activityLog) return;

    const entry = document.createElement("li");
    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    entry.textContent = `${time}  ${message}`;
    activityLog.prepend(entry);

    while (activityLog.children.length > 4) {
        activityLog.lastElementChild.remove();
    }
}

addLog("Portfolio interface ready");


// ==============================
// MOBILE NAVIGATION
// ==============================

const nav = document.querySelector("#nav");
const menuBtn = document.querySelector("#menuBtn");

menuBtn.onclick = () => {
    nav.classList.toggle("open");
    addLog(nav.classList.contains("open") ? "Navigation menu opened" : "Navigation menu closed");
};

document.querySelectorAll("nav a").forEach((link) => {
    link.onclick = () => {
        nav.classList.remove("open");
        addLog(`Viewed ${link.textContent.toLowerCase()}`);
    };
});


// ==============================
// PROJECT MODAL
// ==============================

const modal = document.querySelector("#modal");
const closeButton = document.querySelector("#close");
const projectImage = document.querySelector("#projectImage");
const demoLink = document.querySelector("#demoLink");
const githubLink = document.querySelector("#githubLink");

document.querySelectorAll(".open").forEach((button) => {

    button.onclick = () => {

        const project = projects[button.dataset.id];

        if (!project) return;

        document.querySelector("#mcat").textContent = project.cat;
        document.querySelector("#mtitle").textContent = project.title;
        document.querySelector("#mdesc").textContent = project.desc;
        document.querySelector("#mtools").textContent = project.tools;
        projectImage.src = project.image;
        projectImage.alt = `${project.title} project image`;
        demoLink.href = project.demo;
        githubLink.href = project.github;

        modal.classList.add("show");
        addLog(`Opened project: ${project.title}`);
    };

});


// Close modal
closeButton.onclick = () => {
    modal.classList.remove("show");
    addLog("Project details closed");
};


// Close modal when clicking outside the content
modal.onclick = (event) => {

    if (event.target === modal) {
        modal.classList.remove("show");
        addLog("Project details closed");
    }

};


// Close modal with ESC
document.onkeydown = (event) => {

    if (event.key === "Escape") {
        modal.classList.remove("show");
        addLog("Project details closed");
    }

};


// ==============================
// CONTACT FORM
// ==============================

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.onsubmit = (event) => {

        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        const subject = encodeURIComponent(
            `Portfolio inquiry from ${data.name}`
        );

        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n\n` +
            `${data.message}`
        );

        window.location.assign(
            `mailto:vfdelarosa15@gmail.com?subject=${subject}&body=${body}`
        );

        document.querySelector("#status").textContent =
            "OPENING YOUR EMAIL APP...";
        addLog("Contact message handed to email app");
    };
}
