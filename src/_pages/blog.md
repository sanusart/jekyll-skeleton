---
layout: default
page_name: "blog"
title: "Blog"
description: "This is description"
permalink: "/blog/"
---

# Blog

This is blog page from `{{page.path}}`

{% for post in site.posts %}

  <h2>{{ post.title }}</h2>

  {{ post.excerpt }}

  <a href="{{ post.url }}">Read more &raquo;</a>
  <hr>

{% endfor %}