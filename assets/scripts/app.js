//18-17
//lets work on adding header.
/* we add header to make sure we send off additional request metadata to the server. 
-for example what kind of data we want to send
-this dummy server does not require header as it accepts json data by default
-but some servers might require header
-for some reason i dont see the content-type, i set in the header, on the Header se */

const liElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post')


function sendHttpRequest(method, url, data) {

    return fetch(url, {  
        method: method,
        body: JSON.stringify(data),
        header : {
            'Content-Type': 'application/json' // this is one of the typical headers we add to outgoing requests to notify that our request json data
        }
    }).then(response => { 
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










