export default {
  id: 'project-design',
  title: 'Project & Machine Coding',
  icon: '💻',
  color: '#33FF57',
  modules: true,
  episodes: [
    {
      id: 'pd-01',
      number: 1,
      title: 'API Design (REST & GraphQL)',
      videoUrl: 'https://www.youtube.com/watch?v=_YlYuNMTCc8',
      topics: ['HTTP Methods', 'Status Codes', 'Idempotency', 'GraphQL Schema Design'],
      interviewQuestions: [
        { q: 'What is an Idempotent API?', a: 'An API where multiple identical requests have the same effect as a single request (e.g., GET, PUT, DELETE).' },
        { q: 'When to use GraphQL over REST?', a: 'When you have complex data structures, want to avoid over-fetching, or need to aggregate data from multiple sources in one request.' }
      ],
      mcqs: [
        { question: 'Which HTTP status code means "Created"?', options: ['200', '201', '204', '400'], answer: 1, explanation: '201 Created is the standard response for a successful POST request that creates a resource.' }
      ]
    },
    {
      id: 'pd-02',
      number: 2,
      title: 'Performance Optimization',
      topics: ['Debouncing/Throttling', 'Lazy Loading', 'Image Optimization', 'Bundle Size'],
      interviewQuestions: [
        { q: 'Explain Debouncing.', a: 'A technique to delay the execution of a function until after a certain amount of time has passed since the last time it was called (common for search inputs).' }
      ],
      mcqs: [
        { question: 'What does Tree Shaking do?', options: ['Adds icons', 'Removes unused code', 'Compresses images', 'Minifies CSS'], answer: 1, explanation: 'Tree shaking is a term used for dead-code elimination in JavaScript bundles.' }
      ]
    }
  ]
}
