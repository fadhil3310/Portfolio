
let background
let glow
let article

let aboutPage
let aboutNavButton

let skillPage
let skillNavButton

let portfolioPage
let portfolioNavButton

let isGlowVisible = true

window.addEventListener('load', _ => {
    setupUI()
})

function setupUI() {
    background = document.querySelector('#background')
    article = document.querySelector('article')

    aboutPage = document.querySelector("#about")
    aboutNavButton = document.querySelector("#nav-desktop-item-about")

    skillPage = document.querySelector("#skill")
    skillNavButton = document.querySelector("#nav-desktop-item-skill")

    portfolioPage = document.querySelector("#portfolio")
    portfolioNavButton = document.querySelector("#nav-desktop-item-portfolio")

    aboutNavButton.addEventListener('click', openAboutPage)
    skillNavButton.addEventListener('click', openSkillPage)
    portfolioNavButton.addEventListener('click', openPortfolioPage)

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
            gsap.to(glow, { opacity: 1 })
            isGlowVisible = true
        }
    })
    document.body.addEventListener('mouseleave', _ => {
        gsap.to(glow, { opacity: 0 })
        isGlowVisible = false
    })
}

function openPortfolioPage() {
    // Animate nav button
    gsap.to(aboutNavButton, { y: '-100vh', duration: 0.75, ease: 'expo.in' })
    gsap.to(skillNavButton, { y: '-100vh', duration: 0.5, ease: 'expo.in' })
    gsap.to(portfolioNavButton, { y: '-100vh', duration: 0.25, ease: 'expo.in' })

    // Hide glow effect
    gsap.to(glow, { opacity: 0, display: 'none' })

    setTimeout(_ => {
        playPageTransition('right', '#4b1d34', _ => {
            portfolioPage.style.display = 'block'
            background.style.display = 'none'
            article.style.display = 'none'
        })
    }, 500)

    // Animate background and article
    gsap.to("#background", { y: -400, opacity: 0, duration: 1, ease: 'expo.in' })
    gsap.to("article", { y: -150, opacity: 0, duration: 1, ease: 'expo.in' })
}

function openSkillPage() {
    // Animate nav button
    gsap.to(aboutNavButton, { y: '-100vh', duration: 0.5, ease: 'expo.in' })
    gsap.to(skillNavButton, { y: '-100vh', duration: 0.25, ease: 'expo.in' })
    gsap.to(portfolioNavButton, { y: '-100vh', duration: 0.5, ease: 'expo.in' })

    // Hide glow effect
    //gsap.to(glow, { opacity: 0, display: 'none' })
    glow.style.width = '500px'
    glow.style.height = '500px'

    setTimeout(_ => {
        playPageTransition('bottom', 'black', _ => {
            skillPage.style.display = 'block'
            background.style.display = 'none'
            article.style.display = 'none'
        })
    }, 500)

    // Animate background and article
    gsap.to("#background", { y: -400, opacity: 0, duration: 1, ease: 'expo.in' })
    gsap.to("article", { y: -150, opacity: 0, duration: 1, ease: 'expo.in' })
}

function openAboutPage() {
    // Animate nav button
    gsap.to(aboutNavButton, { y: '-100vh', duration: 0.25, ease: 'expo.in' })
    gsap.to(skillNavButton, { y: '-100vh', duration: 0.5, ease: 'expo.in' })
    gsap.to(portfolioNavButton, { y: '-100vh', duration: 0.75, ease: 'expo.in' })

    // Hide glow effect
    gsap.to(glow, { opacity: 0, display: 'none' })

    setTimeout(_ => {
        playPageTransition('left', '#4b1d34', _ => {
            aboutPage.style.display = 'block'
            background.style.display = 'none'
            article.style.display = 'none'
        })
    }, 500)

    // Animate background and article
    gsap.to("#background", { y: -400, opacity: 0, duration: 1, ease: 'expo.in' })
    gsap.to("article", { y: -150, opacity: 0, duration: 1, ease: 'expo.in' })
}

function playPageTransition(from, color, onFinish) {
    const pageTransition = document.createElement('div')
    pageTransition.classList.add('page-transition')

    document.body.appendChild(pageTransition)

    let cubeSize = 100
    let position
    let counter = 1
    let continueLooping = true

    if (window.innerWidth < 600) {
        cubeSize = window.innerWidth / 12
        from = 'bottom'
    }

    if (from == 'left') position = 0
    else if (from == 'right') position = window.innerWidth - cubeSize
    else position = window.innerHeight - cubeSize

    while (continueLooping) {
        let cubeAmount = from != 'bottom' ? counter : Math.ceil(window.innerWidth / cubeSize)
        let howManyCubesCreated = 0

        for (let i = 1; i <= cubeAmount; i++) {
            const cube = document.createElement('div')
            cube.classList.add('page-transition-cube')
            cube.style.width = cubeSize + 'px'
            cube.style.height = cubeSize + 'px'
            cube.style.borderColor = color

            //cube.innerText = counter

            let cubeX
            let cubeY
            let isCubeXOutOfBound
            let isCubeYOutOfBound

            if (from == 'left') {
                cubeX = position - ((i - 1) * cubeSize)
                cubeY = pageTransition.clientHeight - (i * cubeSize)

                isCubeXOutOfBound = cubeX > window.innerWidth + cubeSize
                isCubeYOutOfBound = cubeY < -cubeSize
            } else if (from == 'right') {
                cubeX = position + ((i - 1) * cubeSize)
                cubeY = pageTransition.clientHeight - (i * cubeSize)
                
                isCubeXOutOfBound = cubeX < -cubeSize
                isCubeYOutOfBound = cubeY < -cubeSize
            } else {
                cubeX = (i - 1) * cubeSize
                cubeY = position

                isCubeXOutOfBound = cubeX > window.innerWidth + cubeSize
                isCubeYOutOfBound = cubeY < -cubeSize

                console.log(cubeX, cubeY, cubeSize, counter)
            }

            // If cubeX or cubeY is out of bound, skip
            if (isCubeXOutOfBound) continue
            if (isCubeYOutOfBound) continue

            cube.style.left = cubeX + 'px'
            cube.style.top = cubeY + 'px'

            // Store cube states to temporary variables to be checked later
            // if this cube is the last cube in the transition
            let counterTemp = counter
            let positionTemp = position
            
            howManyCubesCreated++

            // Animate cube
            gsap.from(cube, { opacity: 0, duration: 0.1, delay: counter * 0.02, onComplete: _ => {
                gsap.to(cube, { background: color, duration: 0.25, onComplete: _ => {
                    const isLastCube = from != 'bottom' ?
                        counterTemp > 1 && howManyCubesCreated == 1: positionTemp < -cubeAmount && i == cubeAmount
                    console.log(isLastCube, position, i, cubeAmount)
                    // If this is the last cube, call onFinish
                    if (isLastCube) onFinish()
                    gsap.to(cube, { opacity: 0, duration: 0.25, delay: 0.25, onComplete: _ => {
                        // Remove pageTransition
                        if (isLastCube) pageTransition.style.display = 'none'
                    }})  
                }})
            }})

            pageTransition.appendChild(cube)
        }

        if (from != 'bottom') {
            if (counter > 1 && howManyCubesCreated == 1) {
                continueLooping = false
                break
            }
        } else {
            if (position < -cubeSize) {
                continueLooping = false
                break
            }
        }   

        counter++
        
        if (from == 'right' || from == 'bottom')
            position -= cubeSize
        else
            position += cubeSize
    }
}