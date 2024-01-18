let isFirstCapybara = true;
let isFirstCorgi = true;

document.getElementById('randomCapybaraBtn').addEventListener('click', function() {
    fetchRandomImageFlikr('capybara');
    if (isFirstCapybara) {
        updateButtonText('randomCapybaraBtn', 'One More Capybara');
        isFirstCapybara = false;
    }

});

document.getElementById('randomCorgiBtn').addEventListener('click', function() {
    fetchRandomImageFlikr('corgi dog');
    if (isFirstCorgi) {
        updateButtonText('randomCorgiBtn', 'One More Corgi');
        isFirstCorgi = false;
    }
});

function fetchRandomImage() {
    let randomImageUrl = 'https://picsum.photos/500/500?random=' + new Date().getTime();
    document.getElementById('randomImage').src = randomImageUrl;
}

function updateButtonText(buttonId, newText) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.textContent = newText;
    }
}

function fetchRandomImageFlikr(animal) {
    const apiKey = 'dc5efbd8abf207580b1759638de4f96c';
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${animal}&format=json&nojsoncallback=1&safe_search=1&content_type=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.photos.photo.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.photos.photo.length);
                const photo = data.photos.photo[randomIndex];
                const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
                document.getElementById('randomImage').src = photoUrl;
            } else {
                console.log('No images found');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}