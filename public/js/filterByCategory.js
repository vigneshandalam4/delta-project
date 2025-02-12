let category = "<%= category %>";

let filters = document.querySelectorAll(".filter");

for(filter of filters){
    let button = filter.querySelector("button");
    // console.log(button.innerText);
    if(category === button.innerText){
        console.log("true");
        filter.style.opacity="1";
        let underline = button.querySelector(".hrzntlline");
        underline.style.display = "block";
    }
    // filter.style.opacity="1";
}