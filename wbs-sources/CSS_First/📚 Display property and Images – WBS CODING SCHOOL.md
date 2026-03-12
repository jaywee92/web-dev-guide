### Display

The `display` property in CSS is a fundamental property that dictates how an element is displayed on the web page. It determines the layout behavior of both the element itself and its children. The `display` property can take several values, but here are some of the most commonly used ones:

1.  **`block`**: Elements styled with `display: block;` stack vertically and start on a new line. They take up the full width available, regardless of their content's width. Examples include `<div>`, `<p>`, and `<h1>` elements.
2.  **`inline`**: `display: inline;` makes elements sit on the same line as their content or neighboring elements, if there's enough space. Inline elements don't start on a new line and only take up as much width as necessary. Examples include `<span>`, `<a>`, and `<img>`.
3.  **`inline-block`**: Combines aspects of both `inline` and `block`. Elements with `display: inline-block;` sit on the same line like inline elements but can have a width and height set like block elements.
4.  **`none`**: Elements with `display: none;` are completely removed from the document flow and not rendered, making them invisible and not affecting the layout.

While `flex` and `grid` values for the `display` property enable advanced layout techniques by defining flexible or grid-based layout structures, the basic values of `block`, `inline`, `inline-block`, and `none` provide the foundational mechanisms for controlling element visibility and the document flow.

Understanding these basic `display` values is crucial for mastering CSS layout techniques.

### Images

Styling images in CSS to make them responsive or make them act like covers to their container involves several common properties. These techniques ensure images scale correctly across devices, maintain aspect ratios, and fill their containing elements without distortion.

Here's a brief explanation of these properties:

1.  **`width`** **and** **`height`**: Setting the width to `100%` and height to `auto` makes the image scale proportionally to the width of its container, maintaining its aspect ratio. This is a key technique in making images responsive.
2.  **`object-fit`**: This property controls how the content of a replaced element, like an image, is resized to fit its container. Setting `object-fit: cover;` makes the image cover the area of the container without stretching. The image will be clipped to cover the container, preserving its aspect ratio.
3.  **`object-position`**: When using `object-fit: cover;`, `object-position` allows you to specify how the image is positioned within its container. It's similar to background-position for background images.
4.  **`max-width`** **and** **`max-height`**: Setting `max-width: 100%;` ensures that the image is never wider than its container or a specified max size, adding to its responsiveness. `max-height` can be used similarly to limit an image's height.
5.  **`border-radius`**: To round the corners of an image, you can use the `border-radius` property. Setting it to a high value like `50%` can turn square images into circles.
6.  **`border`**: Adds a border around the image. You can specify the width, style, and color of the border.