function submitData() {
    const inputName = document.getElementById("inputName").value;
    const inputEmail = document.getElementById("inputEmail").value;
    const inputPhone = document.getElementById("inputPhone").value;
    const inputSubject = document.getElementById("inputSubject").value;
    const inputMessage = document.getElementById("inputMessage").value;

    if (inputName === "") {
        alert('Name Must Be Filled Out!!!');
    } else if (inputEmail === "") {
        alert('Email Must Be Filled Out!!!');
    } else if (inputPhone === "") {
        alert('Phone Number Must Be Filled Out!!!');
    } else if (inputSubject === "") {
        alert('Subject Must Be Filled Out!!!');
    } else if (inputMessage === "") {
        alert('Message Must Be Filled Out!!!');
    } else {
       
        console.log(`Name: ${inputName}\nEmail: ${inputEmail}\nPhone: ${inputPhone}\nSubject: ${inputSubject}\nMessage: ${inputMessage}`);

        const mailtoLink = `mailto:ravanoganteng123@gmail.com?subject=${inputSubject}&body=${inputMessage}`;

        window.location.href = mailtoLink;
    }
}