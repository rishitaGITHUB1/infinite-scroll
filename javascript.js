const loader = document.querySelector('.loader');
let currentPage = 1;
function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

async function getInitialPosts() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${currentPage}`
    );
    const data = await response.json();
    currentPage++;
    return data;
  } catch (error) {
    console.error('There was an error fetching the posts', error);
  }
}

function displayPosts(posts) {
  const postContainer = document.getElementById('posts');
  // function displayPosts(posts) {
  //   posts.forEach(post => {
  //   const postElement =document.createElement('div');
  //   postElement.classList.add('post');
  //   postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
  //   document.querySelector('.posts').appendChild(postElement);
  //   });
  //   }

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
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
window.addEventListener('scroll', debounce(() => {
  if (window.innerHeight + window.scrollY >=
  document.body.offsetHeight - 10) {
  loadMorePosts();
  }
  },200));
  async function loadMorePosts() {
    // Display the loader animation
    // showLoader();
    // Delay to simulate fetching data
    await setTimeout(() => {}, 1000);
    // Fetch the next set of posts
    const response = await
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${currentPage}`);
    const data = await response.json();
    // Render the fetched posts
    displayPosts(data);
    currentPage++;
    // Hide the loader animation
    hideLoader();
    }

  