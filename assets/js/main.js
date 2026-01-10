(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const toc = document.getElementById('toc');

  const getPreferredTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (mode) => {
    root.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  };

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (toc) {
    const headings = document.querySelectorAll('.post-content h2, .post-content h3');
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = heading.tagName.toLowerCase();
      toc.appendChild(link);
    });

    if (!toc.children.length) {
      toc.parentElement.style.display = 'none';
    }
  }

  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');
  if (searchInput && searchResults && window.__POSTS__) {
    const posts = window.__POSTS__;
    const renderResults = (items) => {
      searchResults.innerHTML = '';
      if (!items.length) {
        const empty = document.createElement('p');
        empty.textContent = 'No matches yet. Try another keyword.';
        searchResults.appendChild(empty);
        return;
      }
      items.forEach((post) => {
        const card = document.createElement('article');
        card.className = 'post-card';
        card.innerHTML = `
          <a class="post-card__link" href="${post.url}">
            <div class="post-card__meta">
              <time datetime="${post.dateIso}">${post.date}</time>
              ${post.tags.length ? `<div class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
            </div>
            <h3 class="post-card__title">${post.title}</h3>
            <p class="post-card__excerpt">${post.excerpt}</p>
            <span class="post-card__cta">Read post →</span>
          </a>
        `;
        searchResults.appendChild(card);
      });
    };

    renderResults(posts);

    searchInput.addEventListener('input', (event) => {
      const term = event.target.value.trim().toLowerCase();
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term))
      );
      renderResults(filtered);
    });
  }

  // Code block copy buttons
  document.querySelectorAll('pre').forEach((pre) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement('button');
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.innerHTML = `
      <svg class="copy-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="9" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/>
        <path d="M3 10.5V3C3 2.44772 3.44772 2 4 2H10.5" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      <span class="copy-text">Copy</span>
    `;

    wrapper.appendChild(button);

    button.addEventListener('click', async () => {
      const code = pre.querySelector('code') || pre;
      const text = code.textContent;

      try {
        await navigator.clipboard.writeText(text);
        button.classList.add('copied');
        button.querySelector('.copy-text').textContent = 'Copied!';

        setTimeout(() => {
          button.classList.remove('copied');
          button.querySelector('.copy-text').textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
})();
