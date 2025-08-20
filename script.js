function showForm(formId) {
    document.querySelectorAll(".form").forEach(form => {
        form.classList.remove("active");
    });
    document.getElementById(`${formId}-form`).classList.add("active");
}

const firebaseConfig = {
    apiKey: "AIzaSyBqYALkDu6bpXH9VpUPlxacW-RBFvRYouE",
    authDomain: "capuccino-24c78.firebaseapp.com",
    projectId: "capuccino-24c78",
    appId: "1:143035495004:web:ca14483aa4506138756c99"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

//login con correo mas contraseña
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            redirigirUsuario(result.user);
        })
        .catch(err => alert(err.message));
});

//registrar con correo
document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            redirigirUsuario(result.user);
        })
        .catch(err => alert(err.message));
});

//login con google
document.querySelector(".google").addEventListener("click", (e) => {
    e.preventDefault();
    auth.signInWithPopup(googleProvider)
        .then(result => {
            redirigirUsuario(result.user);
        })
        .catch(err => alert(err.message));
});

//login con GitHub
document.querySelector(".github").addEventListener("click", (e) => {
    e.preventDefault();
    auth.signInWithPopup(githubProvider)
        .then(result => {
            const profile = result.additionalUserInfo?.profile;
            const nombre = profile?.name || profile?.login || result.user.email || "Usuario";
            const foto = result.user.photoURL || "https://www.w3schools.com/howto/img_avatar.png";
            window.location.href = `bienvenido.html?nombre=${encodeURIComponent(nombre)}&foto=${encodeURIComponent(foto)}`;
        })
        .catch(err => alert(err.message));
});

//redireccionamiento
function redirigirUsuario(user) {
    const nombre = user.displayName || user.email || "Usuario";
    const foto = user.photoURL || "https://www.w3schools.com/howto/img_avatar.png";
    window.location.href = `bienvenido.html?nombre=${encodeURIComponent(nombre)}&foto=${encodeURIComponent(foto)}`;
}

auth.onAuthStateChanged(user => {
    if (user) {
        console.log("Usuario logueado:", user.email);
    } else {
        console.log("No hay usuario activo");
    }
});