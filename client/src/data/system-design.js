export default {
  id: 'system-design',
  title: 'System Design (HLD & LLD)',
  icon: '🏗️',
  color: '#FF5733',
  modules: true,
  episodes: [
    {
      id: 'sd-01',
      number: 1,
      title: 'Introduction to Scalability',
      topics: ['Vertical vs Horizontal Scaling', 'Load Balancers', 'Stateful vs Stateless Apps', 'High Availability'],
      interviewQuestions: [
        { q: 'What is Horizontal Scaling?', a: 'Scaling out by adding more machines to the pool of resources, as opposed to adding more power (CPU/RAM) to an existing machine.' },
        { q: 'How does a Load Balancer work?', a: 'It sits in front of your servers and routes incoming client requests across all servers capable of fulfilling those requests.' }
      ],
      mcqs: [
        { question: 'Which scaling is more cost-effective for massive growth?', options: ['Vertical', 'Horizontal', 'Diagonal', 'Manual'], answer: 1, explanation: 'Horizontal scaling allows adding cheap commodity hardware infinitely.' }
      ]
    },
    {
      id: 'sd-02',
      number: 2,
      title: 'Caching Strategies',
      videoUrl: 'https://www.youtube.com/watch?v=U3RkDL21TH0',
      topics: ['Redis', 'CDN', 'Write-through vs Write-back', 'Cache Eviction (LRU)'],
      interviewQuestions: [
        { q: 'Explain Cache Eviction policies.', a: 'Policies like LRU (Least Recently Used) determine which data to remove when the cache is full to make room for new data.' }
      ],
      mcqs: [
        { question: 'What does CDN stand for?', options: ['Content Delivery Network', 'Central Data Node', 'Code Distribution Network', 'Cloud Data Network'], answer: 0, explanation: 'Content Delivery Network serves static assets from edge locations closer to the user.' }
      ]
    }
  ]
}
