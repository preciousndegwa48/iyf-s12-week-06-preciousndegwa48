fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => { console.log("Status:", response.status); console.log("OK:", response.ok); return response.json(); })
  .then(data => { console.log("User data:", data); })
  .catch(error => { console.error("Fetch error:", error); });

async function getUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) { console.error("Failed to fetch user:", error); }
}
async function main12() {
  const user = await getUser(1);
  console.log(user);
  const allUsers = await (await fetch("https://jsonplaceholder.typicode.com/users")).json();
  console.log("All users:", allUsers);
  const posts = await (await fetch("https://jsonplaceholder.typicode.com/users/1/posts")).json();
  console.log("Posts for user 1:", posts);
}
main12();

const loading12 = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
let allUsers = [];
let sortOrder = "asc";

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}
async function loadUsers() {
  try {
    showLoading();
    allUsers = await fetchUsers();
    buildCityFilter(allUsers);
    displayUsers(allUsers);
  } catch (error) { showError(error.message); } finally { hideLoading(); }
}
function showLoading() { if (loading12) { loading12.classList.remove("hidden"); } if (container) container.innerHTML = ""; }
function hideLoading() { if (loading12) loading12.classList.add("hidden"); }
function showError(message) { if (errorDiv) { errorDiv.textContent = `Error: ${message}`; errorDiv.classList.remove("hidden"); } }
function displayUsers(users) {
  let sorted = [...users].sort((a, b) => sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  if (container) {
    container.innerHTML = sorted.map(user => `<div class="user-card"><h2>${user.name}</h2><p>${user.email}</p><p>${user.company.name}</p><p>${user.address.city}</p></div>`).join("");
  }
}
function buildCityFilter(users) {
  const citySelect = document.getElementById("city-filter");
  if (!citySelect) return;
  const cities = [...new Set(users.map(u => u.address.city))];
  citySelect.innerHTML = `<option value="">All Cities</option>` + cities.map(c => `<option value="${c}">${c}</option>`).join("");
}
async function initDirectory() {
  await loadUsers();
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = allUsers.filter(user => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));
      displayUsers(applyCityFilter(filtered));
    });
  }
  const sortSelect = document.getElementById("sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => { sortOrder = e.target.value; displayUsers(applyCityFilter(allUsers)); });
  }
  const citySelect = document.getElementById("city-filter");
  if (citySelect) {
    citySelect.addEventListener("change", () => { displayUsers(applyCityFilter(allUsers)); });
  }
}
function applyCityFilter(users) {
  const citySelect = document.getElementById("city-filter");
  const searchInput = document.getElementById("search");
  let result = users;
  if (citySelect && citySelect.value) result = result.filter(u => u.address.city === citySelect.value);
  if (searchInput && searchInput.value) {
    const q = searchInput.value.toLowerCase();
    result = result.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }
  return result;
}
async function createPost(title, body, userId) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId })
  });
  if (!response.ok) throw new Error("Failed to create post");
  return response.json();
}
async function demoCreate() {
  const newPost = await createPost("My First Post", "This is the content of my post.", 1);
  console.log("Created:", newPost);
  const resultDiv = document.getElementById("post-result");
  if (resultDiv) resultDiv.textContent = `Created post ${newPost.id}: ${newPost.title}`;
}
const postForm = document.getElementById("post-form");
if (postForm) {
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("post-title").value;
    const body = document.getElementById("post-body").value;
    const created = await createPost(title, body, 1);
    const resultDiv = document.getElementById("post-result");
    if (resultDiv) resultDiv.textContent = `Created post ${created.id}: ${created.title}`;
  });
}
if (document.getElementById("users-container")) initDirectory();
