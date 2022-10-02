let cursorDiv = document.getElementById("cursor-dot-outline")
let sections = document.querySelectorAll("section")
let h1 = document.querySelector("h1")
let nav = document.querySelector("nav")
let totalColors = [];

window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('mousemove', mouseMoveFunc)

    h1.addEventListener("mouseover", (e) => {
        cursorDiv.style.transform = 'scale(3.5)'
    })
    h1.addEventListener("mouseout", (e) => {
        cursorDiv.style.transform = 'scale(1)'
    })
})

function mouseMoveFunc(e) {
    cursorDiv.style.left = e.pageX + 'px'
    cursorDiv.style.top = e.pageY + 'px'
    requestAnimationFrame(mouseMoveFunc)
}

function changeColorRandomly(length) {
    for (let x = 0; x < length; x++) {
        let letters = '0123456789ABCDEF'
        let randomColor = '#'
        for (let i = 0; i < 6; i++) {
            randomColor += letters[Math.floor(Math.random() * 16)]
        }
        totalColors.push(randomColor)
        sections[x].style.backgroundColor = totalColors[x]
        sections[x].firstChild.nextSibling.style.color = invertColor(totalColors[x])
    }
}


function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + r + g + b;
}

changeColorRandomly(4)





for (let i = 0; i < sections.length; i++) {
    const element = sections[i];
    console.log(element);
    gsap.fromTo(`.${element.childNodes[1].className}`, {
        scrollTrigger: {
            trigger: `.${element.className}`,
            start: "top center",
        },
        y: 400,
        opacity: 0,
    }, {
        scrollTrigger: {
            trigger: `.${element.className}`,
            start: "top center",
        },
        y: 0,
        opacity: 1,
        duration: 1
    })

}



gsap.set('nav', { xPercent: -50, yPercent: -50, autoAlpha: 1 })

var menu = gsap.timeline({ paused: true, reversed: true })
    .from("nav", { xPercent: 100, duration: 1, ease: 'power2.inOut' })
    .from("nav button", 0.2, { autoAlpha: 0, x: -25, duration: 0.2, stagger: 0.1 })
    .to(".menuButton", { text: "CLOSE", duration: 0.5, ease: "none" }, 0.5)

// toggle the animation / diff speed = timeScale(2) faster

document.querySelector(".menuButton").addEventListener("click", toggleMenu);

function toggleMenu() {
    menu.reversed() ? menu.timeScale(1).play() : menu.timeScale(2).reverse();
}


// images train left and right
let leftTrainScrollWidth = document.querySelector(".images-train-left")
gsap.fromTo(".images-train-left", { x: leftTrainScrollWidth.scrollWidth }, {
    x: -1 * (leftTrainScrollWidth.offsetWidth),
    scrollTrigger: {
        trigger: `body`,
        scrub: 1,
    },
})


gsap.fromTo('.images-train-right', { x: -1500 }, {
    x: -500,
    scrollTrigger: {
        trigger: `.train-container`,
        scrub: 1,
    },
})
