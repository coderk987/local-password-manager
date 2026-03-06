function strengthTest(password){
    const minLength = 8;

    const hasLength = password.length >= minLength;
    if(!hasLength){
        console.log("Password Too short");
    }
    const hasUppercase = /[A-Z]/.test(password);
    if(!hasUppercase){
        console.log("Password must have an Uppercase Letter");
    }
    const hasNumber = /[0-9]/.test(password);
    if(!hasNumber){
        console.log("Password must have a Digit");
    }

    return hasLength && hasUppercase && hasNumber;
}

export default strengthTest;