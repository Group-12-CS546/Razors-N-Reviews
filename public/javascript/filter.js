// function getAllCards() {
//     let cards = document.getElementsByClassName("card");
//     let salons = [];
//     for (card of cards) {
//         let salon = {};
//         salon.link = card.children[0].children[0].getAttribute("href"); // Targets link of <a>, with id
//         salon.name = card.children[0].children[0].innerHTML; // Targets content of <a>, name
//         salon.service = card.children[1].innerHTML;
//         salon.address = card.children[2].innerHTML;
//         salon.city = card.children[3].innerHTML;
//         salon.rating = card.children[4].innerHTML;
//         salons.push(salon);
//     }
//     return salons;
// }

// function sortCardsAscending() {
//     salons = getAllCards();
//     salons.sort(lowToHigh);
//     let cards = document.getElementsByClassName("card");
//     while (cards[0]) { // Delete all card elements on page
//         cards[0].remove();
//     }
//     const parentDiv = document.getElementsByClassName("salon_Collection")[0];
//     for (salon of salons) { // Reinstantiate all cards in sorted order
//         let div = document.createElement("div");
//         div.setAttribute("class", "card");
//         div.setAttribute("onClick", "location.href=\"" + salon.link + "\";");
//         let h2 = document.createElement("h2");
//         let a = document.createElement("a");
//         a.setAttribute("href", salon.link);
//         a.innerHTML = salon.name;
//         h2.appendChild(a);
//         div.appendChild(h2);
//         let p1 = document.createElement("p");
//         p1.setAttribute("class", "service");
//         p1.innerHTML = salon.service;
//         div.appendChild(p1);
//         let p2 = document.createElement("p");
//         p2.innerHTML = salon.address;
//         div.appendChild(p2);
//         let p3 = document.createElement("p");
//         p3.innerHTML = salon.city;
//         div.appendChild(p3);
//         let p4 = document.createElement("p");
//         p4.setAttribute("class", "avg");
//         p4.innerHTML = salon.rating;
//         div.appendChild(p4);
//         div.appendChild(document.createElement("br"))
//         parentDiv.append(div);
//     }
// }

// function sortCardsDescending() {
//     salons = getAllCards();
//     salons.sort(highToLow);
//     let cards = document.getElementsByClassName("card");
//     while (cards[0]) {
//         cards[0].parentNode.removeChild(cards[0]);
//     }
//     const parentDiv = document.getElementsByClassName("salon_Collection")[0];
//     for (salon of salons) {
//         let div = document.createElement("div");
//         div.setAttribute("class", "card");
//         div.setAttribute("onClick", "location.href=\"" + salon.link + "\";");
//         let h2 = document.createElement("h2");
//         let a = document.createElement("a");
//         a.setAttribute("href", salon.link);
//         a.innerHTML = salon.name;
//         h2.appendChild(a);
//         div.appendChild(h2);
//         let p1 = document.createElement("p");
//         p1.setAttribute("class", "service");
//         p1.innerHTML = salon.service;
//         div.appendChild(p1);
//         let p2 = document.createElement("p");
//         p2.innerHTML = salon.address;
//         div.appendChild(p2);
//         let p3 = document.createElement("p");
//         p3.innerHTML = salon.city;
//         div.appendChild(p3);
//         let p4 = document.createElement("p");
//         p4.setAttribute("class", "avg");
//         p4.innerHTML = salon.rating;
//         div.appendChild(p4);
//         div.appendChild(document.createElement("br"));
//         parentDiv.append(div);
//     }
// }

// function lowToHigh(a, b) {
//     ratingA = a.rating.substring(0, 3);
//     ratingB = b.rating.substring(0, 3); // Non-numerical ratings should sort to bottom regardless
//     if (ratingB === "No ") return -1 // It isn't really important to check contents of other string
//     if (ratingA === "No ") return 1 // If both are non-numerical, the sort will be stable
//     return parseFloat(ratingA) - parseFloat(ratingB)
// }

// function highToLow(a, b) {
//     ratingA = a.rating.substring(0, 3);
//     ratingB = b.rating.substring(0, 3);
//     if (ratingB === "No ") return -1
//     if (ratingA === "No ") return 1
//     return parseFloat(ratingB) - parseFloat(ratingA)
// }


$(document).ready(function(event) {
    $('#serviceid').change(function() {
        $this = $(this);
        $('.card-deck').hide();
        $('.' + $this.val()).show();
        console.log("showing " + $this.val() + " boxes");
    });
});