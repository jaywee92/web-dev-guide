### Inline styles

Inline styles in HTML are used to apply CSS directly within an HTML element, using the `style` attribute.

This method of styling has the highest specificity, meaning it overrides any other styles declared in external or internal stylesheets, or within a `<style>` tag in the HTML document itself.

Inline styles are directly tied to the specific element they are applied to, making them very powerful for unique, one-off styling adjustments.

However, their high specificity can make it challenging to override these styles with CSS selectors later, and their use is generally discouraged for large-scale styling due to maintainability issues and separation of concerns. Only `!important` can override styles declared inline!

It's encouraged to target elements by specificity rather than resorting to `!important`

### HTML style element

The `<style>` element in HTML is used to embed CSS directly within an HTML document, typically placed within the `<head>` section.

This allows for styling rules to be written directly within the HTML file, facilitating quick tests or small-scale style applications without needing a separate CSS file.

However, for maintainability and separation of concerns, extensive styling is best kept in external stylesheets.

### Colors

In CSS, colors can be specified in various ways, including by name (e.g., "red"), HEX code (e.g., "#FF0000"), RGB (e.g., "rgb(255, 0, 0)"), RGBA (e.g., "rgba(255, 0, 0, 0.5)"), HSL (e.g., "hsl(0, 100%, 50%)"), and HSLA (e.g., "hsla(0, 100%, 50%, 0.5)").

These color values can be applied to a wide range of properties, such as `color` (text color), `background-color`, `border-color`, and many others, allowing for versatile styling of HTML elements.

RGB and HSL values offer additional control through specifying the opacity level (alpha channel) with RGBA and HSLA formats, enabling the creation of semi-transparent elements.