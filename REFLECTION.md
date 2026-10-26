# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
=Imperative means we manually write the exact steps to change the screen like giving someone turn-by-turn directions. Declarative means we just tell React what the final screen should look like, and React does the hard work of updating it for us.
2. Why must a component name start with a capital letter?
=React uses capital letters to tell the difference between custom components and normal HTML tags.
3. What does a fragment <>...</> do, and why not just use a <div>?
=A fragment can group multiple pieces of code together without adding a new, invisible box to the website. We use it instead of a <div> because adding too many <div> tags clutters up the page and can mess up website's layout.
4. Name one benefit of splitting the UI into small components.
=It makes the code much easier to reuse and fix. Just like Lego bricks, we can build a small piece like a button, once and use it all over the website, and if it breaks, we only have to fix it in one place.