---
layout: post
title:  "Pentaho BI Exceptions"
date:   2014-08-07 17:55:00
categories: [java, pentaho, business intelligence, exception, reporting]
comments: true
short: Some exceptions using the Pentaho BI Java API and their solutions.
thumbnail: thumb-post-default.png
---
Pentaho Business Intelligence or Pentaho BI is a suite of tools for data management, from data mining to reporting scheduling and generation.

I've been working with the Pentaho BI Java API, to mainly use the report capabilities of the product. The problem is that, even when their 
documentation is pretty good (compared with other products out there), there are some simple errors that are not very informative. And the 
related cases in forums that I could find, doesn't provide a direct answer.

That is why I'm going to list here some of those problems and a direct solution for them, so you don't have to go and pick stone in 
dark forums.

**Exception**	
{% highlight java %}
java.lang.NoClassDefFoundError: org/pentaho/reporting/libraries/fonts/LibFontInfo
{% endhighlight %}

Thrown from:  
{% highlight java %}
ClassicEngineBoot.getInstance().start();
{% endhighlight %}

Fixed by:

Add `libfonts-1.2.1.jar` to the project.

**Exception**  
{% highlight java %}
Unable to parse the document: ResourceKey{schema=org.pentaho.reporting.libraries.docbundle.bundleloader.ZipResourceBundleLoader, identifier=content.xml, factoryParameters={
org.pentaho.reporting.libraries.resourceloader.FactoryParameterKey{name=repository}=org.pentaho.reporting.libraries.repository.zipreader.ZipReadRepository@4e15f6af, 
org.pentaho.reporting.libraries.resourceloader.FactoryParameterKey{name=repository-loader}=org.pentaho.reporting.libraries.docbundle.bundleloader.ZipResourceBundleLoader@3f68336
}, parent=ResourceKey{schema=org.pentaho.reporting.libraries.resourceloader.loader.URLResourceLoader, identifier=http:localhost:8080/Templates/Test.prpt, factoryParameters={}, 
parent=null}}
{% endhighlight %}
	
Thrown from:
{% highlight java %}
classloader.getResource("http:localhost:8080/Templates/Test.prpt");
{% endhighlight %}

From Pentaho's forums, there are many possible causes for this exception. You would have to check the cause and parent fields of the exception to determine which one is it.

One of them is:

{% highlight java %}
org.pentaho.reporting.libraries.xmlns.parser.ParseException: Failed to instantiate the specified preprocessor 'org.pentaho.reporting.engine.classic.wizard.WizardProcessor' [Location: Line=3 Column=85] 
{% endhighlight %}

This is fixed adding `pentaho-reporting-engine-wizard-core-X.XX.jar` to the classpath.

Another cause is:

{% highlight java %}
org.pentaho.reporting.libraries.xmlns.parser.ParseException: Failure while loading data: styles.xml [Location: Line=5 Column=11]
{% endhighlight %}
or
{% highlight java %}
org.pentaho.reporting.libraries.xmlns.parser.ParseException: Failure while loading data: layout.xml [Location: Line=5 Column=11]
{% endhighlight %}
or any other XML file.
If you look further down on the causes, you'll see something like:
{% highlight java %}
org.pentaho.reporting.engine.classic.core.util.beans.BeanException: No such property:PropertySpecification={raw=ignoreCrosstabMode}
{% endhighlight %}
which means that one property (in this case `ignoreCrosstabMode`) is missing from the stated XML file (`styles.xml` or `layout.xml`). 
All you have to do is delete it from the file.

Just be careful of how you edit the XML file, because you could corrupt the file and receive one exception like
{% highlight java %}
com.sun.org.apache.xerces.internal.impl.io.MalformedByteSequenceException: Invalid byte 1 of 1-byte UTF-8 sequence.
{% endhighlight %}
or
{% highlight java %}
org.xml.sax.SAXParseException: Content is not allowed in prolog.
{% endhighlight %}
I was able to successful edit the XML by opening `Test.prpt` with 7-Zip, find the selected XML, and delete just the missing property.

If you have different solutions to these same problems, please let me know in the comments. I'll add more exceptions I find.