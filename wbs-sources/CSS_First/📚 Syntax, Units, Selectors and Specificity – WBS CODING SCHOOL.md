### Syntax

CSS (Cascading Style Sheets) is a language used to style and layout web pages. A CSS rule consists of a selector and a declaration block.

The selector targets the HTML elements you want to style, while the declaration block contains one or more declarations separated by semicolons.

Each declaration includes a CSS property name and a value, separated by a colon. Properties are specific aspects of the selected elements you wish to style, such as color, font, width, or margin.

CSS rules are typically placed in a separate `.css` file or within a `<style>` tag in an HTML document. By using CSS, developers can control the appearance of web elements across different pages from a single stylesheet, enhancing consistency and maintainability of web projects.

### CSS units

Many CSS properties, including `width`, `margin`, `padding`, `font-size`, and others, accept values defined as "lengths."

These lengths can be specified using a variety of units, such as pixels (px), ems (em), rems (rem), and more.

The units `em` and `rem` are particularly useful for creating scalable and responsive designs.

The default size for both `em` and `rem` is 16 pixels (16px), assuming the user's browser has not been adjusted from its default setting.

-   The `em` unit is relative to the font size of its closest parent element, meaning 1em equals the font size of the parent.
-   The `rem` unit, on the other hand, is relative to the root element (`<html>`), making it consistent across the entire document; thus, 1rem is equal to the default font size of the document (usually 16px).

This system allows for flexible and accessible design that can adapt to the user's display and preferences.

In this example, try changing the `font-size` on the `html` element to see what happens!

### Selectors

CSS selectors are patterns used to select the HTML elements you want to style. There are several types of selectors in CSS, offering a wide range of possibilities to precisely target and apply styles to different parts of a webpage.

1.  **Simple Selectors:** These target elements based on their name, class, or id. For example, `p` selects all `<p>` elements, `.classname` selects all elements with `class="classname"`, and `#idname` selects an element with `id="idname"`.
2.  **Combinators:** These are used to define relationships between different elements. For instance, the descendant selector ( ) selects all elements that are descendants of a specified element, while the child selector (`>`) targets only direct children. Other combinators include the adjacent sibling selector (`+`) and the general sibling selector (`~`), targeting siblings in specific ways.
3.  **Pseudo-classes:** Pseudo-classes allow you to target elements based on their state rather than their name, class, or id. For example, `:hover` applies a style when the user hovers over an element, `:first-child` targets the first child of its parent, and `:nth-child()` can target elements based on their order in a parent.
4.  **Pseudo-elements:** These let you style certain parts of an element. For example, `::before` and `::after` can be used to insert content before or after an element's content. `::first-line` and `::first-letter` allow styling the first line or letter of a block of text.
5.  **Attribute Selectors:** These selectors target elements based on the presence or value of attributes. For example, `[type="text"]` selects all elements with a `type` attribute value of `text`, `[attribute^="value"]` selects elements whose attribute value begins with "value", and `[attribute*="value"]` targets elements whose attribute value contains "value" anywhere.

CSS selectors are a powerful tool, enabling developers to apply precise styling to their web pages by combining different types of selectors and their unique capabilities.

### Specificity

CSS specificity is a set of rules used by browsers to determine which style declarations are most relevant to an element and, therefore, will be applied.

Specificity is calculated based on the types of selectors used in a CSS declaration, with different types of selectors having different "weights" or values in this calculation. The specificity calculation creates a hierarchy that helps resolve conflicts when multiple CSS rules could apply to the same element.

-   **Inline styles**: Added directly to an element's HTML tag (e.g., `style="font-weight: bold;"`) have the highest specificity.
-   **IDs**: An ID selector (e.g., `#navbar`) has a higher specificity than class, attribute, and tag selectors.
-   **Classes, attributes, and pseudo-classes**: These selectors have the same specificity level and are considered next in the hierarchy.
-   **Elements and pseudo-elements**: These have the lowest specificity.

Specificity is calculated by counting each type of selector. The count forms a "score" in the order of inline styles, IDs, classes/attributes/pseudo-classes, and elements/pseudo-elements. For example, a score might look like 0,1,0,2, which represents 0 inline styles, 1 ID, 0 classes/attributes/pseudo-classes, and 2 elements/pseudo-elements.

**Cascading Nature of CSS**

CSS stands for Cascading Style Sheets, highlighting the cascading nature of styling rules. When multiple rules target the same element, the rule with the highest specificity "wins" and gets applied. If two rules have the same specificity, the latter rule in the code will take precedence.

**Universal Selector,** **`!important`**

-   \*_Universal Selector (_)\*\*: Has the lowest specificity and can be easily overridden by any other selector.
-   **`!important`**: This declaration overrides any other declaration, regardless of specificity, making it the most powerful tool in CSS for styling an element. However, its use is generally discouraged unless absolutely necessary due to its ability to disrupt the natural cascading flow.

In Visual Studio Code (and also in this editor) you can see the specificity of a selector by hovering over it in your CSS file.