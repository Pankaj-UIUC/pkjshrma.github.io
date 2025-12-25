---
layout: page
title: Posts
eyebrow: Writing
permalink: /blog/
---
<p class="intro">Long-form notes and in-progress experiments in data science, causal inference, and analytics craft.</p>

<div class="card-grid">
  {%- assign sorted_posts = site.posts | sort: 'date' | reverse -%}
  {%- for post in sorted_posts -%}
    {%- include post-card.html post=post -%}
  {%- endfor -%}
</div>
