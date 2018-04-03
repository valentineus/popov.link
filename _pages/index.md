---
permalink:    "/index.html"
layout:       default
title:        "Home"
id:           index
---

<div class="page">
    <div class="posts">
        {% for node in site.posts %}
            <div class="post">
                <!-- Date -->
                <span class="post-date">
                    {{ node.latest_update | default: node.date | date_to_long_string }}
                </span>

                <!-- Header -->
                <h1 class="post-title">
                    <a href="{{ node.url | relative_url | uri_escape }}">
                        {{ node.title | smartify | strip_html | normalize_whitespace }}
                    </a>
                </h1>

                <!-- Content -->
                <span class="post-date">
                    {{ node.description | smartify | strip_html | normalize_whitespace }}
                </span>
            </div>
        {% endfor %}
    </div>
</div>
