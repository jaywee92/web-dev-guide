Flexbox, short for "Flexible Box Layout", is a one-dimensional layout method for laying out items in rows or columns. It allows you to distribute space dynamically across elements of an unknown size. Perfect for creating scalable layouts.

![flexbox.png](%F0%9F%93%96Flexbox%20%E2%80%93%20WBS%20CODING%20SCHOOL/.png)

### Key Features of Flexbox

-   **Flex Containers and Items:** Elements become flexible by defining a parent container with **`display: flex;`** and adjusting its child elements, known as **flex items.**
-   **Direction-Aware:** You can easily switch the main axis from horizontal to vertical with **`flex-direction`**, accommodating different layouts and orientations.
-   **Space Distribution:** Properties like **`justify-content`** and **`align-items`** let you align and space items within the container, handling both horizontal and vertical alignment.
-   [Flexbox Documentation](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)

### But how?

At this point you know that here at WBS CODING SCHOOL we are fans of a very hands-on approach! So… ![🥁](%F0%9F%93%96Flexbox%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f941.svg)![🥁](%F0%9F%93%96Flexbox%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f941.svg)![🥁](%F0%9F%93%96Flexbox%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f941.svg)

In this quick example, you'll create a horizontal navigation bar using **Flexbox**. The goal is to space out the navigation links and center them vertically within the navbar.

### **Step 1: HTML Structure**

Start with the basic HTML structure for a navigation bar. You'll need a **`<nav>`** element containing an unordered list **`<ul>`**, with list items **`<li>`** representing the navigation links.

```php-template
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flexbox Navbar</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <nav class="navbar">
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </body>
</html>
```

### **Step 2: Basic CSS Setup**

Before you dive into Flexbox, add some basic styles to your navbar to set the stage.

```css
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.navbar {
  background-color: #333;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-links li:hover {
  background-color: salmon;
  color: black;
}
```

### **Step 3: Applying Flexbox**

-   Now, apply a value of **`flex`** to the **`display`** property of the **`.nav-links`** selector
    -   This should make the **`<li>`** elements within the **`<nav>`** to rearranged themselves in a row
-   The items look super cramped, let’s give them some air apply **`justify-content: center`** , **`align-items: center`** and **`gap: 1rem`**

The modified ruleset should look like this:

```css
.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
```

### **Step 4: Test and Experiment**

Inspect the **navbar** with your browser’s developer tools. Modify the **`justify-content`** and **`align-items`** properties within the tools to see the live changes to the layout of the navbar. This hands-on approach helps you understand the immediate effects of **Flexbox** properties on your design.

[**![📌](%F0%9F%93%96Flexbox%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f4cc.svg)**](https://emojipedia.org/de/rei%C3%9Fzwecke) _A great way to see what’s happening is to use developer tools in your web browser. These tools allow you to inspect elements, see the applied CSS, and even adjust properties on-the-fly._

-   Open your Developer Tools in your web browser using F12 (Windows) or Option + ⌘ + I (Mac).
-   Search through Elements to find your Flexbox container.

![Devtools%28flex%29.png](%F0%9F%93%96Flexbox%20%E2%80%93%20WBS%20CODING%20SCHOOL/.1.png)

-   Now you should see your Flexbox Editor on the right side, under Styles, like so:
    
    ![Devtools2.png](%F0%9F%93%96Flexbox%20%E2%80%93%20WBS%20CODING%20SCHOOL/.2.png)
    
-   Feel free to play around with the properties and inspect the live changes on your navbar.