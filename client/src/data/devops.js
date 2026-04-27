export default {
  id: 'devops',
  title: 'DevOps & Deployment',
  icon: '🚀',
  color: '#3357FF',
  modules: true,
  episodes: [
    {
      id: 'do-01',
      number: 1,
      title: 'Docker Basics',
      topics: ['Containers vs VMs', 'Dockerfile', 'Images & Containers', 'Docker Compose'],
      interviewQuestions: [
        { q: 'What is a Docker image?', a: 'A read-only template with instructions for creating a Docker container.' },
        { q: 'What is the difference between a Container and a VM?', a: 'VMs virtualize hardware and include a full OS; Containers virtualize the OS kernel and are much lighter/faster.' }
      ],
      mcqs: [
        { question: 'Which file is used to define Docker containers?', options: ['docker.config', 'Dockerfile', 'container.json', 'Makefile'], answer: 1, explanation: 'The Dockerfile contains the commands to assemble a Docker image.' }
      ]
    },
    {
      id: 'do-02',
      number: 2,
      title: 'CI/CD Pipelines',
      videoUrl: 'https://www.youtube.com/watch?v=scEDHsr3APg',
      topics: ['GitHub Actions', 'Jenkins', 'Build Automation', 'Deployment Strategies'],
      interviewQuestions: [
        { q: 'What is Continuous Integration (CI)?', a: 'The practice of automating the integration of code changes from multiple contributors into a single software project.' }
      ],
      mcqs: [
        { question: 'Which of these is a popular CI/CD tool?', options: ['Vite', 'Postman', 'Jenkins', 'Figma'], answer: 2, explanation: 'Jenkins is a widely used open-source automation server for CI/CD.' }
      ]
    }
  ]
}
