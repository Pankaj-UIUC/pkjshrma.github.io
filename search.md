---
layout: page
title: Search
eyebrow: Find a post
permalink: /search/
---
<div class="search-box">
  <label for="search-input">Search posts</label>
  <input id="search-input" class="search-input" type="search" placeholder="Filter by title, tag, or keyword" aria-label="Search posts" />
  <div class="search-results" aria-live="polite"></div>
</div>

<script>
  window.__POSTS__ = [
    {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
    {% for post in sorted_posts %}
      {
        title: {{ post.title | jsonify }},
        url: {{ post.url | relative_url | jsonify }},
        date: {{ post.date | date: '%b %d, %Y' | jsonify }},
        dateIso: {{ post.date | date_to_xmlschema | jsonify }},
        excerpt: {{ post.excerpt | strip_html | strip_newlines | truncate: 160 | jsonify }},
        tags: [{% if post.tags %}{% for tag in post.tags %}{{ tag | jsonify }}{% unless forloop.last %}, {% endunless %}{% endfor %}{% endif %}]
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
</script>
