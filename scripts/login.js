document.getElementById("loginBtn").addEventListener("click", function () {
  // get email
  const inputEmail = document.getElementById("inputEmail");
  const email = inputEmail.value;
  console.log(email);

  //   get password
  const inputPass = document.getElementById("inputPassword");
  const pass = inputPass.value;
  console.log(pass);

  if (email === "admin" && pass == "admin123") {
    alert("Login Success");
    window.location.assign("");
  } else {
    alert("Login Failed !!\n Wrong Password or Email");
    return;
  }
});
