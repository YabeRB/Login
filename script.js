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

// Login con Google
document.querySelector(".google").addEventListener("click", (e) => {
    e.preventDefault();
    auth.signInWithPopup(googleProvider)
        .then(result => {
            const nombre = result.user.displayName || "Usuario";
            window.location.href = `bienvenido.html?nombre=${encodeURIComponent(nombre)}`;
        })
        .catch(err => alert(err.message));
});

// Login con GitHub
document.querySelector(".github").addEventListener("click", (e) => {
    e.preventDefault();
    auth.signInWithPopup(githubProvider)
        .then(result => {
            const nombre = result.user.displayName || "Usuario";
            window.location.href = `bienvenido.html?nombre=${encodeURIComponent(nombre)}`;
        })
        .catch(err => alert(err.message));
});