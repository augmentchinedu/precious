<template>
  <div class="home">
    <header>
      <h1>Welcome to Augment Plus</h1>
    </header>
    <main>
      <section class="platform-description">
        <h2>About Us</h2>
        <p>Augment Plus is a collaborative Web Development Community focused on building innovative projects and fostering engineering talent. We specialize in Vue 3, Node.js, and modern software engineering practices.</p>
      </section>
      <section class="projects">
        <h2>Our Projects</h2>
        <ul>
          <li v-for="project in projects" :key="project.name">
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
          </li>
        </ul>
      </section>
    </main>
    <footer>
      <p>&copy; 2026 Augment Plus. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // Mock data as per the task description from Michael
      projects: [
        { name: 'The Great Unknown', description: 'A project shrouded in mystery and innovation.' },
        { name: 'AgriMart', description: 'A platform to connect farmers directly with consumers.' },
        { name: 'Augment Plus', description: 'The very platform we are building right now!' }
      ]
    };
  }
};
</script>

<style scoped>
.home {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #333;
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

header h1 {
  color: #42b983; /* Vue green */
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.platform-description, .projects {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #35495e; /* Vue dark blue */
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1.5rem;
}

h3 {
  margin-bottom: 0.5rem;
  color: #35495e;
}

footer {
  text-align: center;
  margin-top: 2rem;
  color: #777;
  font-size: 0.9rem;
}
</style>
