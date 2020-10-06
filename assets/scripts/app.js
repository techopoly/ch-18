//18-14
// lets handle error
/* there might be 2 kinds of error. 
browser side : when the browser fails to send any request to the server. ex: slow internet/ no internet
server side: when we successfully send the request but the server fails to send back any response. ex: sending 
request to wrong path and getting no response */

const liElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post')


function sendHttpRequest(method, url, data) {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url);
    xhr.send(JSON.stringify(data)); // this part actually send the request to the server
    xhr.responseType = 'json';

    const promise = new Promise((res, rej) => {
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                res(xhr.response);
            }
            else {
                rej('something went wrong. the server did not respond') //this error message is sent to the catch block.max did it in a slightly diff way
            }
        };
        xhr.onerror = function () { // when the browser fails to send request
            rej(new Error('the browser could not send request. something went wrong'))
        }
    })
    return promise
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
