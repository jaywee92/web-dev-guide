Welcome to the vibrant world of CSS, the style sheet language that breathes life into the web. If you've ever marvelled at the aesthetic appeal of a website, its layout, or how it feels so interactive and lively, chances are, CSS played a pivotal role in that experience. Let's dive into the essentials of CSS, exploring its background, meaning, application, syntax, and the intriguing concept of specificity.

### Background and Origin

CSS was proposed by Håkon Wium Lie in 1994. As the web began to grow, the need for a language to style websites became evident. CSS was designed to separate content (written in HTML) from presentation (controlled by CSS). This separation allows for more flexibility and accessibility, making web development a more streamlined process.

### What does CSS mean?

CSS stands for Cascading Style Sheets. The term "cascading" refers to the priority scheme used to determine which style rule applies if more than one rule matches a specific element. This mechanism enables multiple style sheets to influence the look of a site, with a clear hierarchy determining which rules take precedence.

### How Styles are Applied?

CSS can be applied to HTML in three main ways:

-   **Inline styles**, directly within an HTML tag using the **`style`** attribute.
-   **Internal styles**, inside the **`<style>`** element in the **`head`** within an HTML document.
-   **External styles**, by linking to an external CSS file using the **`<link>`** element in the **`head`** section of an HTML document.

Each method has its use case, with external stylesheets being the most common and preferred method for maintaining larger websites due to their scalability and ease of management.

### Syntax for Rules

A CSS rule consists of a selector and a declaration block. The selector points to the HTML element you want to style, while the declaration block contains one or more declarations separated by semicolons. Each declaration includes a CSS property name and a value, separated by a colon.

```css
selector {
  property: value;
}
```

For example, to change the text color of all **`<p>`** elements to blue, you would write:

```css
p {
  color: blue;
}
```

### Simple selectors and specificity

A simple selector is a selector with a single component to target a given element. The idea here is to describe the element we want to style a good as possible so our selector is a match.

Specificity is a crucial concept in CSS, determining which style rules apply to an element when multiple rules could apply. Specificity is calculated based on the types of selectors used in a rule, with the following hierarchy:

-   Inline styles (highest specificity)

```php-template
<p style="color: blue;">Hello there!</p>
```

-   IDs

```bash
<p id="my-paragraph">Hello there!</p>
```

```css
#my-paragraph {
  color: blue;
}
```

-   Classes, attributes, and pseudo-classes

```php-template
<p class="blue-paragraphs">Hello there!</p>
```

```css
.blue-paragraphs {
  color: blue;
}
```

-   Elements and pseudo-elements (lowest specificity)

```css
<p>Hello there!</p>
```

```css
p {
  color: blue;
}
```

When two rules conflict, the one with higher specificity wins. If specificity is equal, the latest rule defined takes precedence. You can combine selectors to increase specificity and avoid collisions

### Compound selectors

-   A sequence of simple selectors that are not separated.
-   It represents a set of simultaneous conditions on a single element

```css
a.external {
 //Matches all <a> elements that also have the .external class
}
```

### Complex selectors

A sequence of simple selectors separated by a **combinator**, which is a way of describing the relationship of an element with surrounding elements:

**Descendant combinator** Denoted with spaces, selects elements that are descendants of the first element

```css
div span {
  // All <span> elements inside a <div>
}
```

**Child combinator** Denoted with greater than `>`, selects a direct child of the first element

```css
div>span {
  // Only <span> elements that are a direct child of a <div>
}
```

**Subsequent-sibling combinator** Denoted by a tilde `~`, selects the second element only if preceded by the first regardless of being adjacent

```css
a~span {
  // Only <span> elements that are preceded by an <a>
}
```

**Next-sibling combinator** Denotes by a plus `+`, selects the second element only if directly preceded by the first

```css
a+span {
  // Only <span> elements that are directly preceded by an <a>
}
```

![💡](%F0%9F%93%9A%20CSS%20Styling%20the%20Web%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f4a1.svg) Within your text editor, you can hover over a selector to see the calculated specificity:

![Screenshot_2024-03-26_at_14.52.05.png](%F0%9F%93%9A%20CSS%20Styling%20the%20Web%20%E2%80%93%20WBS%20CODING%20SCHOOL/.png)

```css
p {
  /* Specificity: (0, 0, 1) */
}

p.special-paragraph {
  /* Specificity: (0, 1, 1) */
}
```

CSS is a vast and exciting world, with the basics serving as the foundation for creating beautiful, responsive websites. As you continue to explore, remember that mastering CSS is a journey, and with each step, you'll unlock new possibilities for creative expression on the web. ![🎨](%F0%9F%93%9A%20CSS%20Styling%20the%20Web%20%E2%80%93%20WBS%20CODING%20SCHOOL/1f3a8.svg)