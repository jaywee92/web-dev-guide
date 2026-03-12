### Formatting

HTML provides a range of tags for formatting text, allowing authors to indicate emphasis, importance, or mood.

Tags like `<em>` and `<strong>` have semantic meaning, indicating emphasis or importance, respectively, and should be used over purely stylistic tags like `<i>` and `<b>` when the meaning is relevant.

This distinction is not only important for visual presentation but also for accessibility, as screen readers interpret these tags differently.

Here's a list of some common formatting HTML elements along with short descriptions:

-   **`<b>`**: Bold text without any extra importance.
-   **`<strong>`**: Bold text with added importance.
-   **`<i>`**: Italic text without any extra emphasis.
-   **`<em>`**: Italic text with added emphasis.
-   **`<mark>`**: Text highlighted for reference or notation purposes.
-   **`<small>`**: Smaller text, often used for disclaimers or side comments.
-   **`<del>`**: Represents text that has been deleted from the document.
-   **`<ins>`**: Represents text that has been inserted into the document.
-   **`<sub>`**: Subscript text, appearing half a character below the normal line.
-   **`<sup>`**: Superscript text, appearing half a character above the normal line.
-   **`<u>`**: Underlined text.
-   **`<pre>`**: Preformatted text displayed in a monospace font, preserving spaces and line breaks.
-   **`<blockquote>`**: A section quoted from another source, typically indented.
-   **`<q>`**: Inline quotation.
-   **`<abbr>`**: An abbreviation or acronym; the full expression can be provided in the title attribute.
-   **`<cite>`**: The title of a creative work, indicating a citation.
-   **`<dfn>`**: A term being defined within the context of its use.
-   **`<address>`**: Contact information for the author/owner of a document or article.

Each of these elements serves a specific purpose in HTML document structure and presentation, allowing developers and content creators to produce rich, semantically meaningful web content.

### Comments

Comments in HTML are used to insert notes, explanations, or references in the code that are not displayed in the browser.

This is incredibly useful for documentation, to do notes, or to temporarily disable code. Comments are enclosed in `<!--` and `-->` markers.

They can be placed anywhere in the code and are ignored by the browser, making them invisible to the end-user.

### Links

Links, defined by the `<a>` tag (anchor), are one of the foundational elements of the web, enabling users to navigate from one web page to another or to a specific part within a page.

The `href` attribute specifies the URL of the page the link goes to. The `target` attribute can determine how the linked document is opened, with values like `_blank` to open the link in a new tab or window.

Links are not limited to navigating to web pages; they can also be used to download files, navigate to sections within a page, or initiate email actions through `mailto:`.

### Images

Images add visual interest and information to web pages. The `<img>` tag is used to embed images in an HTML document.

This tag is self-closing and requires the `src` attribute to specify the image's location.

The `alt` attribute provides alternative text for the image, crucial for accessibility and SEO, as it describes the image content.

The `width` and `height` attributes control the dimensions of the image, which can be specified in pixels or percentages.