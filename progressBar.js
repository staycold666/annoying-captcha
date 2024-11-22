let progress = 0;

function startProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    
    function updateProgress() {
        if (Math.random() < 0.3) {
            // 30% chance to decrease progress
            progress = Math.max(0, progress - Math.random() * 20);
        } else {
            progress = Math.min(100, progress + Math.random() * 10);
        }
        
        progressBar.style.background = `linear-gradient(90deg, 
            #4ecdc4 0%, 
            #4ecdc4 ${progress}%, 
            #eee ${progress}%, 
            #eee 100%)`;
            
        if (progress < 100) {
            setTimeout(updateProgress, Math.random() * 1000 + 500);
        }
    }
    
    updateProgress();
}
