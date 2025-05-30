let copidusers = JSON.parse(localStorage.getItem("users")) || [] ;

function testcredentials() {
    let name = document.getElementById("testusername").value.trim();
    let password = document.getElementById("testpassword").value;

    const user = copidusers.find(u => u.Username === name && u.Password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "AccountInfo.html";
    } else {
        alert("Incorrect Credential!")
    }
}