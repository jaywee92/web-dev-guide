### Backgrounds

CSS background properties offer extensive control over the appearance of element backgrounds.

-   `background-color` sets the color of an element's background.
-   `background-image` allows the placement of an image as the background.
-   `background-repeat` controls whether and how the background image repeats, with options like `repeat`, `repeat-x`, `repeat-y`, and `no-repeat`. `background-attachment` determines whether the background image is fixed (`fixed`) or scrolls with the content (`scroll`).
-   `background-position` sets the starting position of a background image, allowing positioning by keywords (`top`, `left`, etc.) or values (`50%`, `10px`).

### Borders, margins and paddings

Borders, margins, paddings, width, and height are fundamental CSS properties that control the layout and spacing of HTML elements.

-   **Borders**: Define the outermost edge of an element, visible as a line surrounding it. You can control its color, style, and width.
-   **Margins**: The space outside the border, separating the element from adjacent elements. Margins do not have a background color; they are transparent.
-   **Paddings**: The space between an element's border and its content. Padding increases the size of the element but keeps the same background color as the element.
-   **Width and Height**: Specify the size of an element. When used on elements inside a container, their values can be set in absolute units (like pixels) or relative units (like percentages), which are calculated based on the size of their parent container.

It's important to note that percentages for margins and paddings on an element, refer to the parent's width! This is because the height of an element is determined by its content but the width is guaranted to exist even without content!

### Box Model

The CSS Box Model is a fundamental concept in web design and development, describing the structure of every element on a webpage. It consists of four main components that define the size and spacing of elements:

1.  **Content**: The actual content of the box, where text and images appear.
2.  **Padding**: The space between the content and the border. Padding increases the size of the box but is inside the border.
3.  **Border**: Surrounds the padding (if any) and content. It's the edge of the box as defined by its border style.
4.  **Margin**: The space outside the border. Margin separates the element from other elements.

CSS provides two main values for the `box-sizing` property to control how the size of boxes is calculated:

-   **`content-box`** (the default): The width and height of the element are measured including only the content, but not the padding, border, or margin. This means if you set an element to be 100px wide and then add 20px of padding, the actual display width will be 140px (100px content + 20px padding left + 20px padding right).
-   **`border-box`**: The width and height of the element include the content, padding, and border, but not the margin. This approach makes it easier to size elements. Using the same example, if an element is set to 100px width with 20px of padding, the total width remains 100px; the content width is reduced to accommodate the padding and border within the specified width.

Using `box-sizing: border-box;` is popular in responsive design because it simplifies layout calculations by allowing the designer to include the padding and border in the element's width and height. This model is especially useful in grid and flex layouts, where maintaining consistent element sizes is crucial for alignment and spacing.