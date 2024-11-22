function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const captchaContent = document.getElementById('captcha-content');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        captchaContent.style.display = 'block';
        initializeCaptcha();
    }, 3000);
}

function initializeCaptcha() {
    startProgressBar();
    initializeMovingTarget();
    initializeMathProblem();
    initializeTextVerify();
    initializeDistractions();
}

document.addEventListener('DOMContentLoaded', showLoadingScreen);
