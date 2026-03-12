### Lists

Lists organize information into ordered (numbered) and unordered (bulleted) formats, making content easy to read and understand.

The `<ul>` tag creates an unordered list, while the `<ol>` tag creates an ordered list.

Inside these lists, the `<li>` tag is used to define each list item.

Lists can be nested within each other to create sublists, allowing for complex hierarchical structures of information.

### Block level

Block-level elements in HTML are those that start on a new line and stretch out as wide as their container, creating a "block".

This category includes elements like `<div>`, `<p>`, `<h1>`\-`<h6>`, `<ol>`, `<ul>`, and more. In contrast, inline elements, such as `<span>`, `<a>`, and `<img>`, do not start on a new line and only take up as much width as necessary.

If you are curious enough, you may have noticed that even though in the preview we are showing angle brackets, e.g. `<h2>`, in the source code we have `&lt;h2&gt;`. This weird looking notation uses [**HTML Characters Entities**](https://www.w3schools.com/html/html_entities.asp), a way of telling the browser we want to use these special characters without actually creating an HTML element.

Understanding the difference between block-level and inline elements is crucial for structuring and styling.

### DIV

The `<div>` element is a block-level, generic container for flow content that has no intrinsic semantic meaning.

It's commonly used as a "division" of the page, helpful for styling purposes or to group sections of a document together using CSS or JavaScript.

The `<div>` tag is one of the most versatile HTML elements because it can hold any other block-level or inline content, making it perfect for building web page layouts.