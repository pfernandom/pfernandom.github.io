---
layout: post
title:  "Jekyll and categories"
date:   2014-08-06 20:05:14
categories: [jekyll, categories, GET parameter]
comments: true
---

Halfway of creating this blog's template, I thought "wouldn't it be easier to just user Blogger or similar? It would be a lot faster". 
But the choice of using GitHub Pages has paid for itself: by giving me something to put in the first real post.

**Jekyll**  
Jekyll ["transforms your plain text into static websites and blogs"](http://jekyllrb.com/). It’s a tool to create templates for websites, very focused on blogs. 
And it’s the main suggested tool by Github Pages to work with. 

Besides of being a good way to improve the communication between you and other developers and the ease of not dealing with hosting, one of the advantages of using Github Pages and Jekyll is that, even when it only works with static pages (no server side code like PHP, Java, etc.) it allows a great deal of dynamic editing; a lot more than with other blog services.
If you have an account on Github, probably you’ll want to give it a try. [This one](https://help.github.com/articles/using-jekyll-with-pages) and [this](http://24ways.org/2013/get-started-with-github-pages/) are good tutorials.

**Listing by categories**  
As you might have seen in other blogs or news sites, you can tag your posts with categories. And you’ll want to list all the posts for a category in specific:

1. A user clicks on a category
2. A listing of all the posts for that category is displayed

All this without having to create a list page for each category. This is **not something you can currently do out-of-the-box**.  
After looking for how to implement this functionality, all the suggestions were focused on installing Jekyll plug ins (a way that I didn't want to take). [This 
StackOverflow question](http://stackoverflow.com/questions/20872861/jekyll-display-posts-by-category) is the closest I found to what I wanted to do. 
I created a new page categories.md and a new layout page [list.html](_layouts/list.html), and added the following code:

{% highlight html %}
{% raw %}
---
layout: default
---
<div class="post">
	{% for category in site.categories %}
	<div class="category-element" id="category-{{category | first}}">
    <h2>Category: {{ category | first }}</h2>
    <ul class="posts">	
    {% for posts in category %}
      {% for post in posts %}
	   {% if post.url %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
		{% endif %}
      {% endfor %}
    {% endfor %}
    </ul>
	</div>
{% endfor %}
{% endraw %}
{% endhighlight %}

And this is the result:  
![Unfiltered listing of posts by category]({{ site.url }}_images/image1.jpeg?raw=true "Unfiltered listing of posts by category")

But the problem still was filtering the categories to just get the one the user clicked on. If we worked with a common web application, a web form or AJAX call would be enough,
but remember, no server code. So we use the next best thing: **JavaScript**.With it we simulate the behaviour of a common HTTP GET request.

The logic goes like this:  
Direct each category link in the site to the newly created "categories" page, and manually attach the category name to the link's URL as a GET parameter:

{% highlight html %}
{% raw %}
{% for category in post.categories %}
	<a href="/categories?category={{category}}">{{category}}</a>
{% endfor %}
{% endraw %}
{% endhighlight %}

Now we have to retrieve the value of the parameter on the list.html layout using the following JavaScript method:
{% highlight javascript %}
{% raw %}
function parseGetParams(val) {
    var result = "Not found",
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    }
    return result;
}
{% endraw %}
{% endhighlight %}

Notice the `<div class="category-element" id="category-{{category | first}}">` tag in list.html? It's inside the loop, so that DIV will be created, one per list of each category.

Now, we just go and grab all the elements with the class "category-element", iterate through them and checking the ids. If the id doesn't match the value we retrieved from the URL,
hide it:

{% highlight javascript %}
{% raw %}
var catElements = document.getElementsByClassName("category-element");
for(var i = 0; i < catElements.length; i++)
{
   if(catElements[i].id!='category-'+parseGetParams("category")){
	catElements[i].style.display = 'none'; 
	catElements[i].style.visibility = 'hidden';
   }
}
{% endraw %}
{% endhighlight %}

If the value in the URL parameter is empty or doesn't exist, it will hide all the lists.
And there you go. You use the value of a GET request to filter the list of posts by category.

![Filtered listing of posts by category]({{ site.url }}_images/image2.jpeg?raw=true "Filtered listing of posts by category")