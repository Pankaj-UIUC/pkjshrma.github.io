---
layout: page
title: Posts
eyebrow: Writing
permalink: /blog/
---
<div class="status-banner" role="status">
  <span class="status-label">In development</span>
  <span class="status-text">This blog is still being built. Expect updates and iterative improvements.</span>
</div>

<p class="intro">Long-form notes and in-progress experiments in data science, causal inference, and analytics craft.</p>

<div class="card-grid">
  {%- assign sorted_posts = site.posts | sort: 'date' | reverse -%}
  {%- for post in sorted_posts -%}
    {%- include post-card.html post=post -%}
  {%- endfor -%}
</div>
