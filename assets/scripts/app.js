//18-16
//lets work on how to send post request to the server.
/* as we do in the httpXMLRequest, we will add an object in the argument in the fetch() to define the method */

const liElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post')


function sendHttpRequest(method, url, data) {

    return fetch(url, {  // returns a promise
        method: method,
        body: JSON.stringify(data)
    }).then(response => { // eventually returns the parsed response data
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










