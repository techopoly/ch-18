const liElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post')


const xhr = new XMLHttpRequest()

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();
xhr.responseType = 'json' //we can use it instead of converting into array with json.parse. it automaly converts into array

//this is how maxmillian did:

xhr.onload = function () {
    //     //intoArray = JSON.parse(xhr.response) // converting json into array
    //     //console.log(intoArray)
    //     console.log(xhr.response);

    const posts = xhr.response
    for (const post of posts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        liElement.append(postEl);
    }
};








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
