export default {
  id: 'tailwind',
  title: 'Tailwind CSS',
  icon: '🌊',
  color: '#38bdf8',
  episodes: [
    {
      id: 'tw-01',
      number: 1,
      title: 'Utility-First Fundamentals',
      videoUrl: 'https://www.youtube.com/watch?v=elgqxmdVms8',
      readingUrl: 'https://tailwindcss.com/docs/utility-first',
      topics: ['Utility Classes vs Semantic CSS', 'Responsive Design (sm, md, lg)', 'Hover, Focus & Active States', 'Arbitrary Values'],
      interviewQuestions: [
        { q: 'What is a Utility-First CSS framework?', a: 'A framework that provides low-level utility classes (like flex, pt-4, text-center) to build custom designs directly in your markup, rather than writing custom CSS.' },
        { q: 'How does Tailwind handle responsiveness?', a: 'Using mobile-first breakpoints. Classes like "w-full md:w-1/2" apply full width on mobile and half width on medium screens and up.' }
      ],
      mcqs: [
        { question: 'Which class applies a padding-top of 1rem (16px)?', options: ['p-4', 'pt-4', 'padding-4', 'mt-4'], answer: 1, explanation: 'pt-4 stands for padding-top with size 4 (which is 1rem in default config).' }
      ]
    },
    {
      id: 'tw-02',
      number: 2,
      title: 'Customization & Performance',
      videoUrl: 'https://www.youtube.com/watch?v=2vS7vA3uXk8',
      readingUrl: 'https://tailwindcss.com/docs/configuration',
      topics: ['tailwind.config.js', 'Extending Themes', 'Plugins', 'Purging CSS (JIT Engine)'],
      interviewQuestions: [
        { q: 'What is the purpose of tailwind.config.js?', a: 'It allows you to customize the default theme (colors, spacing, fonts), add plugins, and configure which files Tailwind should scan for classes.' }
      ],
      mcqs: [
        { question: 'What does the JIT engine do in Tailwind?', options: ['Compiles CSS at runtime', 'Generates only the CSS you use as you write it', 'Minifies HTML', 'Speeds up the browser'], answer: 1, explanation: 'Just-In-Time (JIT) compiler generates styles on-demand, leading to faster builds and smaller CSS files.' }
      ]
    },
    {
      id: 'tw-03',
      number: 3,
      title: 'Reusability & Components',
      videoUrl: 'https://www.youtube.com/watch?v=MInZRE_A0p8',
      readingUrl: 'https://tailwindcss.com/docs/reusing-styles',
      topics: ['@apply directive', 'React Component patterns', 'Conditionals with cva/clsx', 'Design Systems'],
      interviewQuestions: [
        { q: 'When should you use @apply?', a: 'Only when you need to extract highly repetitive patterns for small elements that aren\'t worth making into full React components. Avoid overusing it as it breaks the utility-first benefit.' }
      ],
      mcqs: [
        { question: 'Which directive extracts classes into a custom CSS rule?', options: ['@include', '@apply', '@extend', '@use'], answer: 1, explanation: '@apply is used in Tailwind to inline existing utility classes into custom CSS.' }
      ]
    },
    {
      id: 'tw-04',
      number: 4,
      title: 'Dark Mode & Official Plugins',
      videoUrl: 'https://www.youtube.com/watch?v=oMoZ_qJFpKQ',
      readingUrl: 'https://tailwindcss.com/docs/dark-mode',
      topics: ['Selector vs Media strategy', 'Typography Plugin', 'Forms Plugin', 'Container Queries'],
      interviewQuestions: [
        { q: 'How do you enable Dark Mode in Tailwind?', a: 'By using the "dark:" modifier (e.g., dark:bg-black). You can toggle it based on the user\'s OS preference or manually via a "dark" class on the <html> element.' }
      ],
      mcqs: [
        { question: 'What prefix is used for dark mode styles?', options: ['night:', 'black:', 'dark:', 'moon:'], answer: 2, explanation: 'The "dark:" modifier is used for all dark mode utility variants.' }
      ]
    }
  ]
}
