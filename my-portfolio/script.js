/* global BABYLON */

const projects = {
    babylon: {
        cat: "GAME DEVELOPMENT · 2026",
        title: "Babylon: Fable That Flows Into the Infinite",
        desc: "A 3D RPG exploring the consequences of war.",
        tools: "UNITY · C# · MAYA",
        image: "./babylon.jpg",
        demo: "#",
        github: "#"
    },

    DesignThinking: {
        cat: "2D QUIZ GAME · 2025",
        title: "TAMMY QUIZ RUSH: DESIGN THINKING",
        desc: "A 2D quiz game focused on Design Thinking.",
        tools: "2D · UNITY",
        image: "./design-thinking.jpg",
        demo: "#",
        github: "#"
    },

    SDG: {
        cat: "2D QUIZ GAME · 2026",
        title: "TAMMY QUIZ RUSH: SDG QUEST",
        desc: "A 2D quiz game focused on Sustainable Development Goals.",
        tools: "2D · UNITY",
        image: "./SDG.gif",
        demo: "#",
        github: "https://github.com/JhayD02/Tammy-s-Quiz-Rush-SDG-Quest"
    }
};

// ==============================
// MOBILE NAVIGATION
// ==============================

const nav = document.querySelector("#nav");
const menuBtn = document.querySelector("#menuBtn");

menuBtn.onclick = () => {
    nav.classList.toggle("open");
};

document.querySelectorAll("nav a").forEach((link) => {
    link.onclick = () => {
        nav.classList.remove("open");
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

const closeModal = () => {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
};

document.querySelectorAll(".open").forEach((button) => {

    button.onclick = () => {

        const project = projects[button.dataset.id];

        if (!project) {
            console.error(`Project not found: ${button.dataset.id}`);
            return;
        }

        document.querySelector("#mcat").textContent = project.cat;
        document.querySelector("#mtitle").textContent = project.title;
        document.querySelector("#mdesc").textContent = project.desc;
        document.querySelector("#mtools").textContent = project.tools;
        projectImage.src = project.image;
        projectImage.alt = `${project.title} project image`;
        demoLink.href = project.demo;
        githubLink.href = project.github;

        modal.classList.add("show");
        document.body.classList.add("modal-open");
        modal.querySelector(".modalbox").scrollTop = 0;
    };

});


// Close modal
closeButton.onclick = () => {
    closeModal();
};


// Close modal when clicking outside the content
modal.onclick = (event) => {

    if (event.target === modal) {
        closeModal();
    }

};


// Close modal with ESC
document.onkeydown = (event) => {

    if (event.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
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
    };
}
