// script.js

// Example: Fetch and show all stories
fetch("http://localhost:8080/api/stories")
  .then(res => res.json())
  .then(stories => {
    const container = document.getElementById("story-container");

    if (!container) return console.warn("No container found in HTML!");

    container.innerHTML = stories
      .map(
        story => `
      <div class="story">
        <h2>${story.title}</h2>
        <p>${story.content}</p>
        <small>— ${story.author}</small>
      </div>
    `
      )
      .join("");
  })
  .catch(err => console.error("Error fetching stories:", err));
