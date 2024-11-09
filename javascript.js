const loader = document.querySelector('.loader');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

async function getInitialPosts() {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_limit=5'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error fetching the posts', error);
  }
}

function displayPosts(posts) {
  const postContainer = document.getElementById('posts');

  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    const titleElement = document.createElement('h2');
    titleElement.classList.add('post-title');
    titleElement.textContent = post.title;

    const bodyElement = document.createElement('p');
    bodyElement.classList.add('post-body');
    bodyElement.textContent = post.body;

    postElement.appendChild(titleElement);
    postElement.appendChild(bodyElement);

    postContainer.appendChild(postElement);
  });
}

//showLoader(); // Show loader before fetching data

getInitialPosts().then((posts) => {
  displayPosts(posts);
  hideLoader(); // Hide loader after displaying posts
});