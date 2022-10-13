window.onload = function () {
    slideOne()
    slideTwo()
    fillColor()
}

let sliderOne = document.getElementById("slider-1")
let sliderSecond = document.getElementById("slider-2")

let inputOne = document.getElementById("range1")
let inputSecond = document.getElementById("range2")

let minGap = 0
let sliderTrack = document.querySelector(".slider-track")
let sliderMaxValue = document.getElementById("slider-1").max

function slideOne() {
    if (parseInt(sliderSecond.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderSecond.value) - minGap
    }

    inputOne.value = sliderOne.value
    fillColor()
}

function inputCHangeOne(){
    sliderOne.value = inputOne.value
    fillColor()
}

function slideTwo() {
    if (parseInt(sliderSecond.value) - parseInt(sliderOne.value) <= minGap) {
        sliderSecond.value = parseInt(sliderOne.value) + minGap
    }
    inputSecond.value = sliderSecond.value
    fillColor()
}

function inputCHangeTwo(){
    sliderSecond.value = inputSecond.value
    fillColor()
}

function fillColor() {
    let percent1 = (sliderOne.value / sliderMaxValue) * 100
    let percent2 = (sliderSecond.value / sliderMaxValue) * 100

    sliderTrack.style.background = `linear-gradient(90deg, #C4C7C7 ${percent1}% , #8E9192 ${percent1}%, #8E9192 ${percent2}%, #C4C7C7 ${percent2}%)`
}