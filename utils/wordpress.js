const BASE_URL =  (process.env.BASE_URL || 'https://thenewssast.com')+"/wp-json/wp/v2";
export async function getPosts() {
  console.log('link:', BASE_URL + "/posts?_embed");
  const postsRes = await fetch(BASE_URL + "/posts?_embed");
  const posts = await postsRes.json();
  return posts;
}

export async function getPost(slug) {
  const posts = await getPosts();
  // console.log('posts:',posts);
  const postArray = posts.filter((post) => post.id == slug);
  const post = postArray.length > 0 ? postArray[0] : null;
  return post;
}
export async function getEvents() {
  const eventsRes = await fetch(BASE_URL + "/events?_embed");
  const events = await eventsRes.json();
  return events;
}

export async function getEvent(slug) {
  const events = await getEvents();
  const eventArray = events.filter((event) => event.slug == slug);
  const event = eventArray.length > 0 ? eventArray[0] : null;
  return event;
}

export async function getSlugs(type) {
  let elements = [];
  switch (type) {
    case "posts":
      elements = await getPosts();
      break;
    case "events":
      elements = await getEvents();
      break;
  }
  const elementsIds = elements.map((element) => {
    return {
      params: {
        id: element.id+'',
      },
    };
  });
  return elementsIds;
}

