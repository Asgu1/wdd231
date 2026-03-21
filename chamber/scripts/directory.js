const url = "data/members.json";
const container = document.querySelector("#members");

async function getMembers(){
const response = await fetch(url);
const data = await response.json();
displayMembers(data.members);
}

function displayMembers(members){
container.innerHTML = "";

members.forEach(member => {

const card = document.createElement("div");
card.classList.add("card");

if(member.membership === 3){
card.classList.add("gold");
}
else if(member.membership === 2){
card.classList.add("silver");
}

card.innerHTML = `
<img src="images/${member.image}" alt="${member.name}">
<div>
<h3>${member.name}</h3>
<p>${member.address}</p>
<p>${member.phone}</p>
<a href="${member.website}" target="_blank">Visit Website</a>
</div>
`;

container.appendChild(card);

});
}

getMembers();


// TOGGLE VIEW
document.querySelector("#gridBtn").addEventListener("click", () => {
container.classList.add("grid");
container.classList.remove("list");

document.querySelectorAll(".card img").forEach(img => {
img.style.display = "block";
});
});

document.querySelector("#listBtn").addEventListener("click", () => {
container.classList.add("list");
container.classList.remove("grid");

document.querySelectorAll(".card img").forEach(img => {
img.style.display = "none";
});
});


// MENU
const menuBtn = document.querySelector("#menuBtn");
const menu = document.querySelector("#menu");

menuBtn.addEventListener("click", () => {
menu.classList.toggle("open");
});


// FOOTER
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;