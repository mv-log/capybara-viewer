import requests
import os

def download_images(api_key, query, num_images, download_path):
    url = f"https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={api_key}&tags={query}&per_page={num_images}&format=json&nojsoncallback=1"
    response = requests.get(url).json()
    
    if not os.path.exists(download_path):
        os.makedirs(download_path)

    for photo in response['photos']['photo']:
        photo_url = f"https://live.staticflickr.com/{photo['server']}/{photo['id']}_{photo['secret']}_w.jpg"
        img_data = requests.get(photo_url).content
        with open(os.path.join(download_path, f"{photo['id']}.jpg"), 'wb') as file:
            file.write(img_data)

# Example usage
api_key = 'dc5efbd8abf207580b1759638de4f96c'
query = 'capybara baby'
num_images = 3
download_path = './asset_2'
download_images(api_key, query, num_images, download_path)