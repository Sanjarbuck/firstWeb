const $show_img = document.querySelectorAll(".js-show-img")
const $body = document.querySelector("body")
let imageElement
let selector
let isRun = false
let isMobile = false

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true
}

if (!isMobile) {
    $show_img.forEach(el => {
        el.addEventListener("mouseenter", (ev) => {
            el.classList.add("show")
            selector = el
            imageElement = el.querySelector(".img-hover")
            isRun = true
        })
        el.addEventListener("mouseleave", () => {
            el.classList.remove("show")
            isRun = false
        })
    })

    $body.addEventListener("mousemove", ev => {
        if (isRun && imageElement) {
            const x = ev.clientX - selector.offsetLeft - imageElement.offsetWidth / 2
            const y = ev.pageY - selector.offsetTop - selector.offsetHeight / 2 - imageElement.offsetHeight / 2
            imageElement.style.transform = `translate(${x}px, ${y}px)`
        }
    })
}
