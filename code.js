
let background
let glow
let article

let aboutNavButton

let skillNavButton

let portfolioPage
let portfolioNavButton

let isGlowVisible = true

window.addEventListener('load', function() {
    setupUI()
})

function setupUI() {
    background = document.querySelector('#background')
    article = document.querySelector('article')

    aboutNavButton = document.querySelector("#nav-desktop-item-about")

    skillNavButton = document.querySelector("#nav-desktop-item-skill")

    portfolioPage = document.querySelector("#portfolio")
    portfolioNavButton = document.querySelector("#nav-desktop-item-portfolio")

    portfolioNavButton.addEventListener('click', function() {
        openPortfolioPage()
    })

    setupBackgroundGlow()
}

function setupBackgroundGlow() {
    glow = document.createElement('div')
    glow.classList.add('glow')
    document.body.appendChild(glow)

    document.body.addEventListener('mousemove', ev => {
        glow.style.transform = `translate(${(ev.pageX - 150)}px, ${(ev.pageY - 150)}px)`
    })
    document.body.addEventListener('mouseenter', _ => {
        if (!isGlowVisible) {
            gsap.to(glow, {opacity: 1})
            isGlowVisible = true
        }
    })
    document.body.addEventListener('mouseleave', _ => {
        gsap.to(glow, {opacity: 0})
        isGlowVisible = false
    })
}

function openPortfolioPage() {
    //portfolioPage.style.display = 'block'
    //gsap.fromTo(portfolioPage, {clipPath: "polygon(0% 100%, 50% 100%, 50% 100%, 100% 100%)"}, {clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)"})
    
    // Animate nav button
    gsap.to(aboutNavButton, {y: '-100vh', duration: 0.75, ease: 'expo.in'})
    gsap.to(skillNavButton, {y: '-100vh', duration: 0.5, ease: 'expo.in'})
    gsap.to(portfolioNavButton, {y: '-100vh', duration: 0.25, ease: 'expo.in'})
    
    // Hide glow effect
    gsap.to(glow, { opacity: 0, display: 'none' })


    const portfolioTransition = document.createElement('div')
    portfolioTransition.id = "portfolio-transition"

    document.body.appendChild(portfolioTransition)

    let counter = 1
    let x = window.innerWidth - 100
    let transitionDuration = 0
    let continueLooping = true

    const cubeSize = 100

    setTimeout(_ => {
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
                    gsap.to(cube, { background: '#4b1d34', duration: 0.25, onComplete: function() {
                        const isLastCube = counterTemp > 1 && howManyCubesCreated == 1
                        if (isLastCube) {
                            portfolioPage.style.display = 'block'
                            background.style.display = 'none'
                            article.style.display = 'none'
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
        
    }, 500)
    
    gsap.to("#background", { y: -400, opacity: 0, duration: 1, ease: 'expo.in' })
    gsap.to("article", { y: -150, opacity: 0, duration: 1, ease: 'expo.in' })
    
}