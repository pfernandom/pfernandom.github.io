---
layout: post
title:  "MVC architecture design: A tutorial"
date:   2014-08-22 18:00:00
author: Pedro Marquez
categories: [mvc, pattern]
comments: true
short: A simple explanation and example about the Model-View-Controller pattern
thumbnail: thumb-post-default.png
permalink: posts/mvc-tutorial/
---

According to Wikipedia, [MVC (Model-View-Controller)](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) is a "software architectural pattern for 
implementing user interfaces. It divides a given software application into three interconnected parts, so as to separate internal representations of information 
from the ways that information is presented to or accepted from the user."

As easy to understand this description would be, it might get heavy for the mind. So let's try to put everything in even simpler terms.

Model-View-Controller is a defined way to organize your application in how it works with the information and shows it to the user. And organization is (almost) 
always a good thing.  
I'll use as example the case of an inventory management application to have control of different products.

**Model**  
The model could be seen as the definition or blueprint of your entities. It's the heart of the application. It describes the data you are using in your application 
as well as its main behaviour.
In the inventory application case, the model would describe the products themselves:

![Product Model](/images/product-model.jpg)

Our model for the Product shows us its properties: it has an ID, name, price and quantity. Also, we see that it has methods to describe the main behaviour or a product:
remove or add products to the inventory, validate that the product exists, etc. 

This is just one example of many possible models. For example, if we managed users in our application, there would be another model to describe the entity User.

![Antipattern](/images/antipattern.png) Don't go and try to do in one model more that it's its own responsibility. **The model only has the functionality needed for itself**, 
meaning that the methods will not try to do other domain's work (the methods in the model of Product won't affect Purchase Orders or Users).

The real distinction of the model in the MVC pattern is that it doesn't have any behaviour about how it will be represented graphically: No formatting like colours, fonts,
HTML formatting or other presentation stuff is included in the model.  
By doing that, we can separate concerns and less coupling: Our model doesn't care if it's going to be executed in a web application, a desktop application, a mobile app, 
or a batch job. The model only cares about it's "business logic".

**View**  
The view is all about the user. The view contains exactly how you are going to display the application's data and how the user is going to interact with it.

The idea to have the view as a separate layer in your application is that the view really doesn't care about the application's data. Just as the model is supposed to have 
the capability to be displayed in different ways, the view should be capable to display different information with little effort.

Take a look to the following "List Products" view: 

{% highlight html %}
{% raw %}
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=windows-1252" http-equiv="content-type">
    <title></title>
  </head>
  <body>  
    <c:forEach items="${products}" var="product">
    <tr>
    <td><form:input path="product.id" size="30" maxlength="20"/></td>
    <td><form:input path="product.name" size="30" maxlength="200"/></td>
    <td><form:input path="product.price" size="20" maxlength="20"/></td>
    <td><form:input path="product.quantiy" size="20" maxlength="20"/></td>
    </tr>
 </c:forEach>
  </body>
</html>
{% endraw %}
{% endhighlight %}

We can see that it will iterate over a list of products and print its properties in HTML inputs. The view doesn't care about where this list came from, if it was the result
of a search, if it's listing all the products or just for a specific purchase order. By not including this information in the view, we can use it in all 
of those cases.

![Antipattern](/images/antipattern.png) What happens if we add more application or business logic to our view? Take a look to the following "Filter Products" view:

{% highlight html %}
{% raw %}
<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html; charset=windows-1252" http-equiv="content-type">
    <title></title>
  </head>
  <body>  
    <c:forEach items="${products}" var="product">
      <c:if test="${product.price<1000}">
      <tr>
      <td><form:input path="product.id" size="30" maxlength="20"/></td>
      <td><form:input path="product.name" size="30" maxlength="200"/></td>
      <td><form:input path="product.price" size="20" maxlength="20"/></td>
      <td><form:input path="product.quantiy" size="20" maxlength="20"/></td>
      </tr>
      </c:if>
 </c:forEach>
  </body>
</html>
{% endraw %}
{% endhighlight %}

This view does almost the same as the first one, except that it will only print those products whose price value is less than 1000.  

It doesn't look that bad, does it? But believe me, it is. 

What would happen if you need another view to display all the products with a price higher than 1000? 
Probably you will create another view. And if we want to filter it by another field like, those with a quantity greater than 0? Another view.  
Let's say we do the same for another 8 views, all of them required by the application. 
What happens if the product changes and now it has to include another property like category? We will have to go to our 8 views and update each one.  
A lot of tedious work.

Even worst is going and adding code to the view to create or delete products. Just imagine the code for the view, trying to tell apart the HTML code from the 
PHP, JSLT, C# or Ruby code.

But, then where should we put all these filters? The model is not the answer since we already know that the model doesn't care about how will it be displayed.

**Controller**  
The controller is the bridge between the model and the user interface. The controller is in charge of taking the information requested by the users, look
into the model and see which method has to be used. Then, grab the results and returned by the model and return the information to the client.

Now, let's go back to the scenario where the application requires to filter the products by their price and availability. We can keep the first "List Products" view 
(the one without filters) as list.jsp:

![Product View](/images/product-view.jpg)

And have a controller like the following:

{% highlight java %}
{% raw %}
@Controller
public class MainController {
	@RequestMapping
	public ModelAndView getProductsLessThan() {
 
		List<Product> productList = Product.getProductsPriceLessThan(1000);
 
		//Use view list.jsp
		ModelAndView model = new ModelAndView("list");
		model.addObject("lists", productList);
 
		return model;
	}
	
	@RequestMapping
	public ModelAndView getProductsMoreThan() {
 
		List<Product> productList = Product.getProductsPriceMoreThan(1000);
 
		//Use view list.jsp
		ModelAndView model = new ModelAndView("list");
		model.addObject("lists", productList);
 
		return model;
	}
	
	@RequestMapping
	public ModelAndView getAvailableProducts() {
 
		List<Product> productList = Product.getAvailable();
 
		//Use view list.jsp
		ModelAndView model = new ModelAndView("list");
		model.addObject("lists", productList);
 
		return model;
	}
}
{% endraw %}
{% endhighlight %}

If you haven't worked with Spring MVC probably you will feel confused about the annotations and Java code.  
The important thing you have to understand is that each method is called by a different action button in the view:

* The button "List Products under $1000" will make a request to the method getProductsLessThan()
* The button "List Products above $1000" will make a request to the method getProductsMoreThan()
* The button "List existent Products" will make a request to the method getAvailableProducts()

Then, after each method finishes, the list of products is sent to the view, to list.jsp (which still doesn't have any filter and just prints whatever it receives, as long as is 
a valid list of products).

The controller doesn't care about how a product calculates its sales, or how will it filter the results to know if a product is available or not. The controller doesn't care 
which colours and fonts the view uses. All the controller does is translate back and forth the information exchanged between the Model and the View.

![Note](/images/note.png) There is a lot of confusion about where "business logic" is supposed to reside. Many MVC frameworks have examples showing very thin models 
(only a set of properties, with setters and getters, but no "business logic") and fat controllers (all the "business logic" exists in the controller). This confusion is logic, 
since [the concept of Model can be used in different contexts](posts/mvc-business-logic/). But all we can say about the MVC pattern is that should only be in charge of the 
application's flow, and not "business logic", following the [separation of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns).

![MVC Flow](/images/mvc-flow.jpg)

