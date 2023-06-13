'use-strict'

const images = [
    { 'id' : '1', 'url' : './images/slide-1.png' },
    { 'id' : '2', 'url' : './images/slide-2.png' },
    { 'id' : '3', 'url' : './images/slide-3.png' },
    { 'id' : '4', 'url' : './images/slide-4.png' },
    { 'id' : '5', 'url' : './images/slide-5.png' },
];

const containerItems = document.querySelector("#container-items");

const LoadImages = (images, container) => {
    images.forEach(image => {
        container.innerHTML += `
            <div class="item">
                <img src="${image.url}"
            </div>
        `
    })
}

LoadImages(images, containerItems);

let items = document.querySelectorAll('.item');

const previous = () => {
    const lastItem = items[items.length - 1];
    containerItems.insertBefore(lastItem, items[0]);
    items = document.querySelectorAll('.item');
}

const next = () => {
    containerItems.appendChild(items[0]);
    items = document.querySelectorAll('.item');
}

document.querySelector('#previous').addEventListener('click', previous);
document.querySelector('#next').addEventListener('click', next);