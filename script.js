const wrapper = document.querySelector(".wrapper"),
form =wrapper.querySelector("form"),
fileimp =form.querySelector("input"),
infoText = form.querySelector("p"),
copybtn = wrapper.querySelector(".copy"),
closebtn= wrapper.querySelector(".close");

function fetchRequest(formData, file){
    infoText.innerHTML = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:"POST",body:formData
    }).then(res=> res.json()).then(result =>{
        result = result[0].symbol[0].data;
        infoText.innerHTML = result ? "Upload QRcode to scan." : "Couldn't Scan QR code";
        if(!result) return;
        wrapper.querySelector("textarea").innerText= result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    });
}
fileimp.addEventListener("change", e =>{
    let file = e.target.files[0];
    if(!file) return;
    let formData = new FormData();
    formData.append("file",file);
    fetchRequest(formData, file);
});

copybtn.addEventListener("click", ()=>{
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});
form.addEventListener("click", ()=> fileimp.click());
closebtn.addEventListener("click", ()=> wrapper.classList.remove("active"));