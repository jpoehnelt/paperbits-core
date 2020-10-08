import * as ko from "knockout";


ko.bindingHandlers["carousel"] = {
    init: (element: HTMLElement, valueAccessor: () => (data: any) => void) => {
        console.log("QQQQ");
    }
}

console.log("REG");

// import * as ko from "knockout";
// debugger;

// ko.bindingHandlers["carousel1"] = {
//     init(element: HTMLElement, valueAccessor: () => any): void {

//         debugger;
//         setTimeout(() => {
//             const carouselItems = element.querySelectorAll(".carousel-item");
//             console.log(carouselItems);

//             if (carouselItems.length === 0) {
//                 return;
//             }

//             carouselItems[0].classList.add("active");
//         }, 1000);
//     }
// };