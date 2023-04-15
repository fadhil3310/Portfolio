

let aboutNavButton

let skillNavButton

let portfolioPage
let portfolioNavButton

window.addEventListener('load', function() {
    layoutBackground()
    setupUI()
})

function setupUI() {
    aboutNavButton = document.querySelector("#nav-item-about")

    skillNavButton = document.querySelector("#nav-item-skill")

    portfolioPage = document.querySelector("#portfolio")
    portfolioNavButton = document.querySelector("#nav-item-portfolio")

    portfolioNavButton.addEventListener('click', function() {
        openPortfolioPage()
    })
}

function openPortfolioPage() {
    //portfolioPage.style.display = 'block'
    //gsap.fromTo(portfolioPage, {clipPath: "polygon(0% 100%, 50% 100%, 50% 100%, 100% 100%)"}, {clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)"})
    gsap.to(aboutNavButton, {yPercent: 100})
    gsap.to(skillNavButton, {yPercent: 100})


    const portfolioTransition = document.createElement('div')
    portfolioTransition.id = "portfolio-transition"

    document.body.appendChild(portfolioTransition)

    let counter = 1
    let x = window.innerWidth - 100
    let transitionDuration = 0
    let continueLooping = true

    const cubeSize = 100

    while (continueLooping) {
        let cubeAmount = counter
        let howManyCubesCreated = 0
        
        for (let i = 1; i <= cubeAmount; i++) {
            const cube = document.createElement('div')
            cube.classList.add('portfolio-transition-cube')

            //cube.innerText = counter

            let cubeX = x + ((i - 1) * cubeSize)
            let cubeY = portfolioTransition.clientHeight - (i * cubeSize)

            if (cubeX < -cubeSize) {
                continue
            }

            if (cubeY < -cubeSize) {
                continue
            }

            cube.style.left = cubeX + 'px'
            cube.style.top = cubeY + 'px'

            howManyCubesCreated++

            let counterTemp = counter

            gsap.from(cube, { opacity: 0, duration: 0.1, delay: counter * 0.02, onComplete: function() {
                gsap.to(cube, { background: 'white', duration: 0.25, onComplete: function() {
                    const isLastCube = counterTemp > 1 && howManyCubesCreated == 1
                    if (isLastCube) {
                        portfolioPage.style.display = 'block'
                        document.querySelector('#background').style.display = 'none'
                    }
                    gsap.to(cube, { opacity: 0, duration: 0.25, delay: 0.25, onComplete: function() {
                        if (isLastCube) {
                            portfolioTransition.style.display = 'none'
                        }
                    }})
                    
                }})
            }})

            portfolioTransition.appendChild(cube)  
        }

        if (counter > 1 && howManyCubesCreated == 1) {
            continueLooping = false
            break
        }

        transitionDuration += 0.1

        counter++
        x -= cubeSize
        
    }

    /*console.log(transitionDuration)
    setTimeout(function() {
        //portfolioTransition.style.display = 'none'
        //portfolioPage.style.display = 'block'
        //gsap.fromTo(portfolioPage, {clipPath: "polygon(0% 100%, 50% 100%, 50% 100%, 100% 100%)"}, {clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)"})
    }, (transitionDuration * 1000))*/
    gsap.to("#background", { y: -200, opacity: 0, duration: transitionDuration, ease: 'expo.out' })
    gsap.to("article", { y: -100, opacity: 0, duration: transitionDuration, ease: 'expo.out' })
}

function layoutBackground() {
    
}