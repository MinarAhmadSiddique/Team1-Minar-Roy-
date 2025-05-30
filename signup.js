let users = JSON.parse(localStorage.getItem("users")) || [];
function userinfo() {
    const values = {
        Username:document.getElementById("username").value,
        Email:document.getElementById("email").value,
        Phone_Num:document.getElementById("phone").value,
        Password:document.getElementById("userpassword").value,
        Full_Name:document.getElementById("fullname").value,
        DOB:document.getElementById("DOB").value,
    }

    if (users.some(user => user.Username === values.Username)) {
        alert("Username already exists!");
        return;
    }

    for (let i in values) {
        if (!values[i]) {
            alert(`Please fill in ${i} field`);
            return;
        }
    }

    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(values));

    window.location.href="Login.html"
}
function redirectsigninpage() {
    window.location.href = "Login.html";
}