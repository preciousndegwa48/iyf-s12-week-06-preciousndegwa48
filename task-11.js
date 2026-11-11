console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");
console.log("1 - Start");
setTimeout(() => { console.log("2 - This is delayed"); }, 2000);
console.log("3 - End");
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
setTimeout(() => console.log("D"), 100);
console.log("E");
function fetchData(callback) {
  setTimeout(() => { callback({ name: "John", age: 30 }); }, 1000);
}
fetchData(function(data) { console.log("Data received:", data); });
function loadUser(userId, callback) {
  setTimeout(() => { callback({ id: userId, name: "John", age: 30, email: "john@example.com" }); }, 1500);
}
loadUser(1, function(user) { console.log("loadUser:", user); });
function getUserDataCB(userId, callback) {
  setTimeout(() => { callback({ id: userId, name: "John" }); }, 1000);
}
function getUserPostsCB(userId, callback) {
  setTimeout(() => { callback([{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }]); }, 1000);
}
function getPostCommentsCB(postId, callback) {
  setTimeout(() => { callback([{ id: 1, text: "Great post!" }, { id: 2, text: "Thanks for sharing" }]); }, 1000);
}
getUserDataCB(1, function(user) {
  console.log("User:", user);
  getUserPostsCB(user.id, function(posts) {
    console.log("Posts:", posts);
    getPostCommentsCB(posts[0].id, function(comments) { console.log("Comments:", comments); });
  });
});
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => { if (success) resolve("It worked!"); else reject("Something went wrong"); }, 1000);
});
myPromise.then(result => console.log("Success:", result)).catch(error => console.log("Error:", error));
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { if (userId > 0) resolve({ id: userId, name: "John" }); else reject("Invalid user ID"); }, 1000);
  });
}
function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { if (userId > 0) resolve([{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }]); else reject("Invalid user ID for posts"); }, 1000);
  });
}
function getPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { if (postId > 0) resolve([{ id: 1, text: "Great post!" }, { id: 2, text: "Thanks for sharing" }]); else reject("Invalid post ID"); }, 1000);
  });
}
getUserData(1).then(user => console.log("Promise User:", user)).catch(err => console.log("Error:", err));
getUserData(-1).then(user => console.log(user)).catch(err => console.log("Expected Error:", err));
getUserData(1).then(user => { console.log("User:", user); return getUserPosts(user.id); }).then(posts => { console.log("Posts:", posts); return getPostComments(posts[0].id); }).then(comments => { console.log("Comments:", comments); }).catch(error => { console.error("Error:", error); });
const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);
Promise.all([promise1, promise2, promise3]).then(results => { console.log("All users:", results); }).catch(error => { console.error("One failed:", error); });
Promise.all([getUserData(1), getUserData(2), getUserData(3)]).then(users => { users.forEach(u => console.log(`- ${u.name} (id: ${u.id})`)); });
const fast = new Promise(resolve => setTimeout(() => resolve("Fast!"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow!"), 500));
Promise.race([fast, slow]).then(result => { console.log("Winner:", result); });
function getDataWithPromises() {
  return getUserData(1).then(user => getUserPosts(user.id)).then(posts => getPostComments(posts[0].id)).then(comments => comments);
}
async function getDataWithAsync() {
  const user = await getUserData(1);
  const posts = await getUserPosts(user.id);
  const comments = await getPostComments(posts[0].id);
  return comments;
}
getDataWithAsync().then(comments => console.log("Async/Await Comments:", comments));
async function main() {
  const comments = await getDataWithAsync();
  console.log("Main() Comments:", comments);
}
main();
async function fetchUserData(userId) {
  try {
    const user = await getUserData(userId);
    const posts = await getUserPosts(user.id);
    return { user, posts };
  } catch (error) { console.error("Failed to fetch:", error); throw error; }
}
fetchUserData(1).then(data => console.log("fetchUserData OK:", data));
fetchUserData(-1).catch(err => console.log("fetchUserData caught:", err));
async function getAllUsers() {
  const [u1, u2, u3] = await Promise.all([getUserData(1), getUserData(2), getUserData(3)]);
  return [u1, u2, u3];
}
getAllUsers().then(users => console.log("getAllUsers parallel:", users));
async function getAllDataWithAsync() {
  try {
    const user = await getUserData(1);
    console.log("BUILD Async - User:", user);
    const posts = await getUserPosts(user.id);
    console.log("BUILD Async - Posts:", posts);
    const comments = await getPostComments(posts[0].id);
    console.log("BUILD Async - Comments:", comments);
    return comments;
  } catch (error) { console.error("BUILD Async - Error:", error); }
}
getAllDataWithAsync();
