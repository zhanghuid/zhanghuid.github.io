const bingApiUrl = "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1";
const corsAnywhereUrl = "https://cors.whoops.space/";
const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': 'https://zhanghuid.github.io'
};

// Intersection Observer for lazy loading the background image
const skeletonBg = document.getElementById('skeletonBg');

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        fetch(corsAnywhereUrl + bingApiUrl, { headers: headers })
            .then(response => response.json())
            .then(data => {
                const imageUrl = `https://www.bing.com${data.images[0].urlbase}_UHD.jpg&rf=LaDigue_UHD.jpg&pid=hp&rs=1&c=4&qlt=100&uhd=1&uhdwidth=3840&uhdheight=2160`;
                loadImage(imageUrl);
            })
            .catch(error => console.error("Error fetching image:", error));
        observer.unobserve(skeletonBg); // Stop observing after the image is loaded
    }
}, { threshold: 0.1 });

observer.observe(skeletonBg);

function loadImage(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
        const skeletonBgElement = document.querySelector('.skeleton-bg');
        skeletonBgElement.style.backgroundImage = `url(${imageUrl})`;
        skeletonBgElement.classList.add('loaded');
        adjustTextColor(imageUrl);
        setTimeout(() => {
            document.querySelector('.skeleton').style.display = 'none';
            document.querySelector('.content').style.display = 'block';
        }, 500); // Slight delay for smooth transition
    };
    img.onerror = () => console.error("Error loading image:", imageUrl);
}

function adjustTextColor(imageUrl) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);

        let brightness = 0;
        let totalPixels = 0;

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            brightness += (r + g + b) / 3;
            totalPixels++;
        }

        if (totalPixels > 0) {
            brightness /= totalPixels;
        }

        const textColor = brightness > 127 ? '#000' : '#fff'; // Set color based on brightness
        document.body.style.color = textColor;
        document.querySelector('.container-lg').style.color = textColor;
    };
}