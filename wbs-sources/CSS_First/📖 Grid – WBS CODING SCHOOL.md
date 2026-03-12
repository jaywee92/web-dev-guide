Grid is a two-dimensional layout system, which means you can manage both rows and columns simultaneously. It’s like Flexbox’s big sibling, offering even more control for complex layouts.

![grid.png](%F0%9F%93%96%20Grid%20%E2%80%93%20WBS%20CODING%20SCHOOL/.png)

### **Key Features of Grid**

-   **Grid Container and Items:** By declaring **`display: grid;`** on a container, you can place child elements into a grid layout.
-   **Defining Tracks:** With **`grid-template-rows`** and **`grid-template-columns`**, you set up the rows and columns of your grid, controlling their size and the number of tracks.
-   **Placement Control:** You can position items in specific spots in the grid with **`grid-column`** and **`grid-row`**, giving you pinpoint control.
-   [Grid Documentation](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids)

### But how?

You know it’s coming… ![🥁](%F0%9F%93%96%20Grid%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f941.svg)![🥁](%F0%9F%93%96%20Grid%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f941.svg)![🥁](%F0%9F%93%96%20Grid%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f941.svg)

In this one will guide you through creating an image gallery using CSS Grid, teaching you how to define grid columns, rows, and how to place items within your grid layout.

### **Step 1: HTML Structure**

Start by setting up the HTML structure for your gallery. The main container is **`.gallery-container`**, which includes a heading and the **`.gallery`** grid. Inside the grid, you have multiple **`.gallery-item`** elements, each containing an image sourced from **Lorem Picsum.**

```php-template
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Grid Image Gallery</title>
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div class="gallery-container">
      <h1>IMAGE GALLERY</h1>
      <div class="gallery">
        <div class="gallery-item">
          <img src="https://picsum.photos/400" alt="Gallery image 1" />
        </div>
        <div class="gallery-item">
          <img src="https://picsum.photos/500" alt="Gallery image 2" />
        </div>
        <div class="gallery-item">
          <img src="https://picsum.photos/600" alt="Gallery image 3" />
        </div>
        <div class="gallery-item">
          <img src="https://picsum.photos/700" alt="Gallery image 4" />
        </div>
        <div class="gallery-item">
          <img src="https://picsum.photos/800" alt="Gallery image 5" />
        </div>
        <div class="gallery-item">
          <img src="https://picsum.photos/900" alt="Gallery image 6" />
        </div>
        <div class="gallery-item">
          <img src="https://picsum.photos/500" alt="Gallery image 7" />
        </div>
        <div class="gallery-item">
          <img src="https://picsum.photos/400" alt="Gallery image 8" />
        </div>
        <div class="gallery-item">
          <img src="https://picsum.photos/900?r" alt="Gallery image 9" />
        </div>
      </div>
    </div>
  </body>
</html>
```

[**![📌](%F0%9F%93%96%20Grid%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f4cc.svg)**](https://emojipedia.org/de/rei%C3%9Fzwecke) _In this exercise, we're using Lorem Picsum for placeholder images. Each_ _**`src`**_ _attribute in your_ _**`<img>`**_ _tags points to a different random image URL from Lorem Picsum, like_ \_**`https://picsum.photos/400`**\__. This service is great for generating placeholder images for your layouts._

### **Step 2: CSS Setup**

Next, set up the basic styles for your gallery. Your CSS defines the grid container, its items, and ensures that the images are styled correctly.

```css
.gallery-container {
  font-family: Arial, sans-serif;
  text-align: center;
}

.gallery {
  margin: 1.5rem;
}

.gallery-item img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5%;
}
```

### **Step 3: Implementing CSS Grid**

Now it’s time to define the grid structure for your gallery. We will set up a three-column layout:

-   Apply a value of **`grid`** to the **`display`** property of your **`.gallery`** selector. Nothing changed… or did it?
-   Apply **`grid-template-columns: repeat(3, 1fr);`** to the same selector, this is telling the grid that we want a three-column layout with each column taking the same amount of space
-   Give it some air with **`gap: 1rem;`**

The modified ruleset should look like this:

```css
.gallery {  
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  margin: 1.5rem;
}
```

### Step 4: Go crazy! ![🤪](%F0%9F%93%96%20Grid%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f92a.svg)

Try to explore the Grid documentation. What happens if you set **`grid-template-rows: 1fr 2fr 1fr;`** or **`grid-template-columns: 1fr 2fr 1fr;`** or both!

### **Step 5: Experiment with Developer Tools**

Use your browser's developer tools to inspect the **`.gallery`** element. Try changing **`grid-template-columns`** to various values and observe how the grid adjusts. Experiment with the **`gap`** property as well to see how spacing between items can be controlled.

### **Bonus: Responsive Adjustments**

To ensure the gallery looks good on different screen sizes, let's make it responsive by adding a media query.

```css
@media (max-width: 600px) {
    .gallery {
        grid-template-columns: repeat(2, 1fr); /* Two columns for smaller screens */
    }
}
```