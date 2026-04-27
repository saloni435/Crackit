export default {
  id: 'css',
  title: 'Advanced CSS',
  icon: '🎨',
  color: '#264de4',
  episodes: [
    {
      id: 'css-01',
      number: 1,
      title: 'Box Model & Specificity',
      videoUrl: 'https://www.youtube.com/watch?v=nSst4paum90',
      readingUrl: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model',
      topics: ['Content, Padding, Border, Margin', 'Box-sizing: border-box', 'Specificity Calculation', 'Cascading Order'],
      interviewQuestions: [
        { q: 'What is the CSS Box Model?', a: 'Every element in CSS is a rectangular box consisting of: Content, Padding, Border, and Margin. Total width = content + padding + border + margin.' },
        { q: 'Explain CSS Specificity.', a: 'It is a set of rules that determine which CSS rule is applied by the browser. Order of precedence: Inline > ID > Class/Pseudo-class > Element.' }
      ],
      mcqs: [
        { question: 'Which property changes how the total width is calculated?', options: ['display', 'box-sizing', 'overflow', 'position'], answer: 1, explanation: 'box-sizing: border-box includes padding and border in the specified width.' }
      ]
    },
    {
      id: 'css-02',
      number: 2,
      title: 'Flexbox & Grid Mastery',
      videoUrl: 'https://www.youtube.com/watch?v=rg7Fvvl3mse',
      readingUrl: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
      topics: ['Flex-direction & Alignment', 'Flex-grow/shrink/basis', 'CSS Grid Template Areas', 'Grid Gap & Spanning'],
      interviewQuestions: [
        { q: 'Difference between Flexbox and Grid?', a: 'Flexbox is 1-dimensional (row OR column), ideal for alignment. Grid is 2-dimensional (rows AND columns), ideal for layout structure.' }
      ],
      mcqs: [
        { question: 'Which property centers items along the main axis in Flexbox?', options: ['align-items', 'justify-content', 'align-content', 'justify-items'], answer: 1, explanation: 'justify-content aligns items along the main axis (usually horizontal).' }
      ]
    },
    {
      id: 'css-03',
      number: 3,
      title: 'Animations & Transitions',
      videoUrl: 'https://www.youtube.com/watch?v=zHUpx90NerM',
      readingUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations',
      topics: ['Keyframes', 'Transition-timing-function', 'Animation-fill-mode', 'Will-change & Performance'],
      interviewQuestions: [
        { q: 'Difference between Transition and Animation?', a: 'Transitions require a trigger (like :hover) to change from state A to B. Animations can start automatically, repeat, and have multiple keyframe steps.' },
        { q: 'What is the "will-change" property?', a: 'It provides a hint to the browser about which properties are likely to change, allowing it to optimize rendering beforehand (use sparingly to avoid memory issues).' }
      ],
      mcqs: [
        { question: 'Which property defines the steps in a CSS animation?', options: ['@keyframes', 'transform', 'transition', 'display'], answer: 0, explanation: '@keyframes defines the intermediate steps of the animation sequence.' }
      ]
    },
    {
      id: 'css-04',
      number: 4,
      title: 'Responsive Design & Architecture',
      videoUrl: 'https://www.youtube.com/watch?v=srvUrASNj0s',
      readingUrl: 'https://web.dev/learn/design/',
      topics: ['Media Queries', 'Clamp/Min/Max functions', 'Mobile First Strategy', 'BEM Methodology'],
      interviewQuestions: [
        { q: 'What is BEM?', a: 'Block Element Modifier. A naming convention that makes CSS easier to read and maintain by keeping specificity low (e.g., .card, .card__title, .card--featured).' },
        { q: 'Explain the Mobile-First approach.', a: 'Designing for the smallest screen first and then using media queries to add complexity for larger screens. This usually results in cleaner, faster code.' }
      ],
      mcqs: [
        { question: 'What does the "M" in BEM stand for?', options: ['Margin', 'Modifier', 'Main', 'Module'], answer: 1, explanation: 'Modifier — used to change the appearance or behavior of a block or element.' }
      ]
    }
  ]
}
