//18-15
/* lets work on fetch api.
you will not understand everything about fetch api but the main concept is that fetch() is a promisified function
by default that the browser supports.
-fetch(url) sends the request to the server and recieves response.
-you can access the response using then() as you do in other promisified async functions
-then convert the response from streamed json body to workable javascript snapshot with response.
 */
const liElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post')


function sendHttpRequest(method, url, data) {
    return fetch(url).then(response => { // eventually returns the parsed response data
        return response.json()
    })
}


async function fetchPosts() {
    try {
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
    } catch (error) {
        alert(error)
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
