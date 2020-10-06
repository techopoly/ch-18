//18-9

const liElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post')


function sendHttpRequest(method, url) {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url);
    xhr.send();
    xhr.responseType = 'json';

    const promise = new Promise((res, rej) => {
        xhr.onload = function () {
            res(xhr.response);
        };
    })
    return promise

}


async function fetchPosts() {
    const allPosts = await sendHttpRequest(
        'GET', 'https://jsonplaceholder.typicode.com/posts'
    );

    console.log(allPosts);
    for (const post of allPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        liElement.append(postEl);
    }
}

fetchPosts()











// this is how I did
/* lets try something. lets promisify the onload */

/* function afterLoad() {
    const promise = new Promise((res, rej) => {
        xhr.onload = function () {
            //intoArray = JSON.parse(xhr.response) // converting json into array
            //console.log(intoArray)
            //console.log(xhr.response)
            res(xhr.response);
        };
    })
    return promise
}

afterLoad().then(posts => {
    console.log(posts);
    for (const post of posts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        liElement.append(postEl);
    }
}) */
