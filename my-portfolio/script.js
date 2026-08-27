/* global BABYLON */

const projects = {
    babylon: {
        cat: "GAME DEVELOPMENT · 2026",
        title: "Babylon: Fable That Flows Into the Infinite",
        desc: "A 3D RPG exploring the consequences of war.",
        tools: "UNITY · C# · MAYA"
    },

    modeling: {
        cat: "2D QUIZ GAME · 2025",
        title: "TAMMY QUIZ RUSH: DESIGN THINKING",
        desc: "A 2D quiz game focused on Design Thinking.",
        tools: "BLENDER · 3D MODELING"
    },

    animation: {
        cat: "2D QUIZ GAME · 2026",
        title: "TAMMY QUIZ RUSH: SDG QUEST",
        desc: "A 2D quiz game focused on Sustainable Development Goals.",
        tools: "BLENDER · UNITY"
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
// BABYLON HERO SCENE
// ==============================

const babylonCanvas = document.querySelector("#babylonCanvas");
const babylonFallback = document.querySelector("#babylonFallback");

function startBabylonScene() {
    if (!babylonCanvas || !window.BABYLON) {
        if (babylonFallback) babylonFallback.textContent = "BABYLON FAILED TO LOAD";
        addLog("Babylon.js failed to load");
        return;
    }

    try {
        const engine = new BABYLON.Engine(babylonCanvas, true);
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.04, 0.05, 0.07, 1);

        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Math.PI / 2,
            Math.PI / 2.8,
            10,
            new BABYLON.Vector3(0, 1.2, 0),
            scene
        );
        camera.attachControl(babylonCanvas, true);
        camera.lowerRadiusLimit = 6;
        camera.upperRadiusLimit = 15;
        camera.wheelPrecision = 80;

        new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(0, 1, 0), scene).intensity = 0.8;
        const keyLight = new BABYLON.DirectionalLight("key", new BABYLON.Vector3(-1, -2, -1), scene);
        keyLight.intensity = 1.5;

        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 14, height: 14 }, scene);
        const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
        groundMaterial.diffuseColor = new BABYLON.Color3(0.08, 0.1, 0.12);
        ground.material = groundMaterial;

        const templeMaterial = new BABYLON.StandardMaterial("templeMaterial", scene);
        templeMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.9, 0.5);
        templeMaterial.emissiveColor = new BABYLON.Color3(0.08, 0.16, 0.06);

        const base = BABYLON.MeshBuilder.CreateBox("base", { width: 3.6, height: 0.45, depth: 2.4 }, scene);
        base.position.y = 0.22;
        base.material = templeMaterial;

        for (let index = -1; index <= 1; index += 1) {
            const pillar = BABYLON.MeshBuilder.CreateBox(`pillar${index}`, { width: 0.42, height: 2.4, depth: 0.42 }, scene);
            pillar.position.set(index * 1.35, 1.42, 0);
            pillar.material = templeMaterial;
        }

        const roof = BABYLON.MeshBuilder.CreateCylinder("roof", { diameter: 3.8, height: 0.5, tessellation: 4 }, scene);
        roof.rotation.y = Math.PI / 4;
        roof.position.y = 2.65;
        roof.material = templeMaterial;

        const relic = BABYLON.MeshBuilder.CreateTorus("relic", { diameter: 1.15, thickness: 0.16 }, scene);
        relic.position.set(0, 1.35, -0.35);
        relic.rotation.x = Math.PI / 2;
        relic.material = templeMaterial;

        if (babylonFallback) babylonFallback.hidden = true;
        engine.runRenderLoop(() => {
            relic.rotation.z += 0.008;
            scene.render();
        });

        window.addEventListener("resize", () => engine.resize());
        addLog("Babylon 3D scene initialized");
    } catch (error) {
        if (babylonFallback) {
            babylonFallback.hidden = false;
            babylonFallback.textContent = "3D SCENE UNAVAILABLE";
        }
        addLog("Babylon scene could not initialize");
        console.error("Babylon scene initialization failed", error);
    }
}

startBabylonScene();


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

document.querySelectorAll(".open").forEach((button) => {

    button.onclick = () => {

        const project = projects[button.dataset.id];

        if (!project) return;

        document.querySelector("#mcat").textContent = project.cat;
        document.querySelector("#mtitle").textContent = project.title;
        document.querySelector("#mdesc").textContent = project.desc;
        document.querySelector("#mtools").textContent = project.tools;

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
