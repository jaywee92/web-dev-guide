Creating a website is a bit like building a house. Before you add the doors, windows, and paint, you need a solid foundation and a plan for where everything should go. In web design, CSS layout techniques are that foundation, giving structure to your website’s content; telling elements how to arranged themselves in relation to the viewport but also in relation to each other.

By combining different values for the **`display`** property, different positioning controls and more, you can create complex layouts for the most creative web applications. We’ll try to focus on two very important layout techniques, **Flexbox** and **Grid**, but before we do so, it’s important we cover the basics.

It’s important to know the elements naturally fall into a so-called **Normal Flow**, this it’s just the way elements are arranged given the default styles the browser provides. We know that **block** elements take all the space that’s available to them, whereas **inline** elements take only as much as needed.

```php-template
<p>You are learning CSS layout techniques</p>

<ul>
  <li>All of these elements are block elements</li>
  <li>That means they will take all the space that's available to them</li>
  <li>One line each. Top to bottom.</li>
</ul>

<p>Quite easy!</p>
```

From the previous HTML excerpt, it’s very easy to know how the document will be presented in the browser. But what if you want to change things around?

The methods that can change the way elements are laid out are:

-   The **`display`** property: [https://developer.mozilla.org/en-US/docs/Web/CSS/display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
    -   Values such as **`block`**, **`inline`** or **`inline-block`** can change how an element is arranged
    -   There are entire methods based on specific values for this property: **`flex`** and **`grid`**
-   The **`float`** property: [https://developer.mozilla.org/en-US/docs/Web/CSS/float](https://developer.mozilla.org/en-US/docs/Web/CSS/float)
    -   Different values of float will make an element position itself differently while allowing inline elements to be wrap around it
-   The **`position`** property: [https://developer.mozilla.org/en-US/docs/Web/CSS/position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
    -   Allows you to control how boxes are placed within other boxes. A div within a div within a div kind of stuff.
    -   It’s a escape hatch from the normal flow!
-   Multi-column properties:
    -   They allow you to make a block element’s content to be broken into several columns

We can take away a lot from the previous lines but let’s go with two important take aways:

-   The **`display`** property is VERY important
-   These properties need to be used carefully, among other reasons, because of accessibility! Changing the normal flow of a document can impact accessibility technologies if not done properly

With the basic context in place, let’s take a look at those cool layout methods: **Flexbox** and **Grid**! ![🚀](%F0%9F%93%96%20CSS%20layout%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f680.svg)