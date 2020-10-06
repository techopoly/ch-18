//18-10
// now lets create posts and send it off to the server
const liElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post')


function sendHttpRequest(method, url, data) {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url);
    xhr.send(JSON.stringify(data)); // you need to pass json data as the server requires that. it would take data in any other from
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
async function createPost(title, content) {
    const data = {
        title: title,
        body: content,
        userId: Math.random()
    }
    sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', data); //data is the object we will be passing
}


fetchPosts();
createPost('how to get into relationship', 'this comes with experience and reflection');











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
