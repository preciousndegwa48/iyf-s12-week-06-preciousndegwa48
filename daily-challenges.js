function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function day1() {
  await delay(2000);
  console.log("This prints after 2 seconds");
}
day1();

function taskA() { return new Promise(resolve => setTimeout(() => resolve("A done"), Math.random() * 1000)); }
function taskB() { return new Promise(resolve => setTimeout(() => resolve("B done"), Math.random() * 1000)); }
function taskC() { return new Promise(resolve => setTimeout(() => resolve("C done"), Math.random() * 1000)); }
async function day2() {
  const start = Date.now();
  const a = await taskA();
  console.log(a);
  const b = await taskB();
  console.log(b);
  const c = await taskC();
  console.log(c);
  console.log(`Total time: ${Date.now() - start}ms`);
}
day2();

async function fetchUserWithDefault(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (response.status === 404) return { id: 0, name: "Guest User", email: "guest@example.com" };
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    return { id: 0, name: "Guest User", email: "guest@example.com" };
  }
}
fetchUserWithDefault(999).then(u => console.log("Day 3:", u));

function getUserCallback(id, callback) {
  setTimeout(() => callback({ id, name: "John" }), 500);
}
function getUserPromise(id) {
  return new Promise(resolve => setTimeout(() => resolve({ id, name: "John" }), 500));
}
async function getUserAsync(id) {
  const user = await getUserPromise(id);
  return user;
}
getUserAsync(1).then(u => console.log("Day 4:", u));

async function day5() {
  const urls = [
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/comments/1"
  ];
  const results = await Promise.allSettled(urls.map(url => fetch(url).then(r => r.json())));
  results.forEach((result, i) => {
    if (result.status === "fulfilled") console.log(`Endpoint ${i + 1} success:`, result.value);
    else console.log(`Endpoint ${i + 1} failed:`, result.reason);
  });
}
day5();
