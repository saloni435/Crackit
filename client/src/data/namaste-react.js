export default {
  id: 'namaste-react',
  title: 'Namaste React',
  icon: '⚛️',
  color: '#61DAFB',
  episodes: [
    {
      id: 'ep-01',
      number: 1,
      title: 'Inception',
      topics: ['React CDN setup', 'React.createElement', 'ReactDOM.render', 'JSX basics', 'difference between library and framework'],
      interviewQuestions: [
        { q: 'What is React?', a: 'React is an open-source JavaScript library for building user interfaces, primarily single-page applications. It lets developers compose complex UIs from small, isolated pieces called components, and efficiently updates the DOM using a virtual DOM diffing algorithm.' },
        { q: 'What is the difference between a library and a framework?', a: 'A library is a collection of functions you call when you need them — you are in control (e.g., React). A framework calls your code following its own conventions — it is in control (e.g., Angular). React is a library focused on the UI layer; you pair it with other libraries for routing, state, etc.' },
        { q: 'How do you use React without a bundler?', a: 'Include React and ReactDOM via CDN script tags. Use React.createElement(tag, props, children) to build elements and ReactDOM.createRoot(domNode).render(element) to mount them. JSX requires a transpiler so without a bundler you write createElement calls directly.' },
        { q: 'What does React.createElement do?', a: 'React.createElement(type, props, ...children) returns a plain JavaScript object (a React element) describing what to render. It is the core API; JSX compiles down to createElement calls. It is not a DOM node — it is a lightweight description.' },
        { q: 'What is the role of ReactDOM?', a: 'ReactDOM is the package that connects React to the browser DOM. ReactDOM.createRoot(container).render(element) mounts React elements into the real DOM. React itself is DOM-agnostic — React Native uses a different renderer.' }
      ],
      mcqs: [
        { question: 'React is a ___.', options: ['Framework', 'Library', 'Language', 'Compiler'], answer: 1, explanation: 'React is a library focused on the view layer; you compose it with other tools.' },
        { question: 'Which function creates a React element?', options: ['React.make()', 'React.createElement()', 'React.build()', 'React.new()'], answer: 1, explanation: 'React.createElement(type, props, children) returns a React element object.' },
        { question: 'ReactDOM is used to ___.', options: ['Build components', 'Mount React elements to the DOM', 'Bundle code', 'Handle state'], answer: 1, explanation: 'ReactDOM provides DOM-specific methods like createRoot and render.' },
        { question: 'A React element is ___.', options: ['A DOM node', 'A plain JavaScript object describing the UI', 'An HTML string', 'A class instance'], answer: 1, explanation: 'React elements are lightweight JS objects; React reconciles them with the DOM.' },
        { question: 'Without a bundler, you write UI via ___ instead of JSX.', options: ['HTML strings', 'React.createElement calls', 'Template literals', 'innerHTML'], answer: 1, explanation: 'JSX needs transpilation; raw createElement works in vanilla script tags.' }
      ]
    },
    {
      id: 'ep-02',
      number: 2,
      title: 'Igniting our App',
      topics: ['npm', 'package.json', 'node_modules', 'Parcel bundler', 'Babel', '.gitignore', 'HMR'],
      interviewQuestions: [
        { q: 'What is npm?', a: 'npm (Node Package Manager) is the default package manager for Node.js. It lets you install, share, and manage dependencies via the npm registry. Projects declare dependencies in package.json; running npm install fetches them into node_modules.' },
        { q: 'What is package.json and package-lock.json?', a: 'package.json declares project metadata, scripts, and dependencies (with version ranges). package-lock.json locks exact installed versions and the full dependency tree to guarantee reproducible installs across environments.' },
        { q: 'What is Parcel?', a: 'Parcel is a zero-config web bundler. It automatically handles HTML/CSS/JS/assets, compiles modern syntax, does code splitting, tree-shaking, minification, image optimization, and includes a dev server with Hot Module Replacement (HMR).' },
        { q: 'What is HMR (Hot Module Replacement)?', a: 'HMR updates modified modules in the running app without a full page reload, preserving application state. It dramatically speeds up development feedback loops compared to full refreshes.' },
        { q: 'What is Babel and why is it used?', a: 'Babel is a JavaScript compiler that transpiles modern ES syntax (JSX, arrow functions, classes, spread, etc.) into older-compatible JS for broader browser support. Bundlers like Parcel/Webpack use Babel under the hood to process JSX and new syntax.' }
      ],
      mcqs: [
        { question: 'package.json contains ___.', options: ['Only dependencies', 'Project metadata, scripts, dependencies', 'Only scripts', 'Compiled code'], answer: 1, explanation: 'package.json declares all project-level information including deps, scripts, metadata.' },
        { question: 'Why should node_modules be gitignored?', options: ['It contains secrets', 'It is huge and reproducible from lockfile', 'It is binary', 'Git cannot track it'], answer: 1, explanation: 'node_modules is large and can be recreated from package-lock.json, so committing is wasteful.' },
        { question: 'Parcel is ___.', options: ['A state manager', 'A zero-config bundler', 'A testing library', 'A CSS framework'], answer: 1, explanation: 'Parcel is a bundler with zero configuration needed for common cases.' },
        { question: 'HMR stands for ___.', options: ['Heavy Module Reload', 'Hot Module Replacement', 'Hyper Memory Runtime', 'High Module Reducer'], answer: 1, explanation: 'Hot Module Replacement — swaps modules in running app without reload.' },
        { question: 'Babel transpiles ___.', options: ['CSS into JS', 'Modern JS/JSX to older JS', 'JS to machine code', 'HTML to React'], answer: 1, explanation: 'Babel converts modern syntax and JSX to broadly-compatible JS.' }
      ]
    },
    {
      id: 'ep-03',
      number: 3,
      title: 'Laying the Foundation',
      topics: ['JSX', 'transpilation', 'React.createElement vs JSX', 'functional components', 'component composition'],
      interviewQuestions: [
        { q: 'What is JSX?', a: 'JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code inside JavaScript. It compiles down to React.createElement calls via Babel. JSX makes component markup readable and co-located with logic.' },
        { q: 'Is JSX valid JavaScript?', a: 'No. JSX is not valid JS — it must be transpiled (usually by Babel) into React.createElement calls before running. Bundlers handle this automatically.' },
        { q: 'What is a functional component?', a: 'A JavaScript function that returns JSX (a React element). Functional components are concise, use hooks for state and side effects, and are the recommended pattern in modern React. They start with a capital letter.' },
        { q: 'What is component composition?', a: 'Composition is building complex UIs by combining smaller components. Parents render children via JSX, pass props down, and children can themselves compose other components. Encouraged over inheritance in React.' },
        { q: 'Why do components need to start with a capital letter?', a: 'JSX treats lowercase tags as HTML elements (string type) and uppercase as component references. If you write <greeting/>, JSX passes "greeting" as a string type; <Greeting/> correctly references the component.' }
      ],
      mcqs: [
        { question: 'JSX compiles to ___.', options: ['HTML', 'React.createElement calls', 'Plain strings', 'Web components'], answer: 1, explanation: 'Babel compiles JSX into React.createElement(type, props, children).' },
        { question: 'Functional component names must start with a ___ letter.', options: ['Lowercase', 'Uppercase', 'Underscore', 'Any'], answer: 1, explanation: 'JSX distinguishes HTML tags (lowercase) from components (uppercase).' },
        { question: 'JSX can only have one ___ element at the top level.', options: ['Parent', 'Child', 'Style', 'Script'], answer: 0, explanation: 'Must return a single root (or Fragment <>...</>).' },
        { question: 'Component composition is preferred over ___ in React.', options: ['Functions', 'Inheritance', 'Hooks', 'Props'], answer: 1, explanation: 'React docs recommend composition over class-style inheritance.' },
        { question: 'className is used in JSX instead of ___.', options: ['style', 'id', 'class', 'name'], answer: 2, explanation: '`class` is a reserved word in JS, so JSX uses className.' }
      ]
    },
    {
      id: 'ep-04',
      number: 4,
      title: 'Talk is Cheap, Show Me the Code',
      topics: ['building food ordering app UI', 'props', 'passing data', 'config-driven UI', 'optional chaining'],
      interviewQuestions: [
        { q: 'What are props?', a: 'Props (properties) are read-only inputs passed from parent to child component. They flow one-way (top-down) and allow reuse of components with different data. Modifying props directly inside a child is not allowed.' },
        { q: 'What is config-driven UI?', a: 'An approach where UI is rendered dynamically from configuration/data fetched from a backend rather than hardcoded. Enables remote updates (e.g., promotional banners, restaurant menus) without redeploying the app.' },
        { q: 'What is optional chaining?', a: '?. safely accesses properties on potentially nullish values. obj?.a?.b returns undefined if any link is null/undefined instead of throwing TypeError. Useful for deep API response access where fields may be missing.' },
        { q: 'Why are keys important when rendering lists?', a: 'Keys help React identify which items changed/added/removed during reconciliation. Stable unique keys avoid unnecessary re-renders and bugs when list order changes. Do not use array index as key for dynamic lists.' },
        { q: 'What is destructuring in props?', a: 'ES6 syntax to unpack props directly in the function signature: function Card({name, price}) {}. Makes components more concise and self-documenting about what props they consume.' }
      ],
      mcqs: [
        { question: 'Props flow ___ in React.', options: ['Bottom-up', 'Top-down (parent to child)', 'Bidirectional', 'Horizontally between siblings'], answer: 1, explanation: 'Props pass data from parent to child components.' },
        { question: 'Are props mutable inside a child?', options: ['Yes', 'No, they are read-only', 'Only state props', 'Only strings'], answer: 1, explanation: 'Props are immutable from the child\'s perspective.' },
        { question: 'obj?.foo returns undefined when ___.', options: ['obj is any object', 'obj is null or undefined', 'foo is undefined', 'Never'], answer: 1, explanation: 'Optional chaining short-circuits to undefined on null/undefined receivers.' },
        { question: 'Keys in list rendering help React ___.', options: ['Style the items', 'Identify items for efficient updates', 'Sort the list', 'Cache the list'], answer: 1, explanation: 'Keys let React match elements across renders during reconciliation.' },
        { question: 'Best key for a list of items from API?', options: ['Array index', 'Random number', 'Stable unique id from API', 'Item label'], answer: 2, explanation: 'Stable, unique IDs (usually from backend) are ideal keys.' }
      ]
    },
    {
      id: 'ep-05',
      number: 5,
      title: "Let's Get Hooked",
      topics: ['useState hook', 'state vs props', 're-rendering', 'named/default exports', 'file structure'],
      interviewQuestions: [
        { q: 'What is useState?', a: 'useState is a React hook that adds state to functional components. const [value, setValue] = useState(initial) returns the current state and a setter. Calling the setter triggers a re-render with the new value.' },
        { q: 'Difference between state and props?', a: 'Props are external inputs passed by parent, read-only. State is internal, managed by the component, and triggers re-renders when updated. Props let a component be parameterized; state lets it be interactive.' },
        { q: 'Why does updating state trigger a re-render?', a: 'React tracks state changes. When the setter is called with a new value, React schedules a re-render of the component so the UI reflects the latest state. It then diffs the new virtual DOM against the previous to update the real DOM efficiently.' },
        { q: 'Named vs default export?', a: 'Default: `export default X` — imported with any name: `import X from` (one per file). Named: `export const Y` — imported with exact name in braces: `import { Y } from` (many per file). Both can coexist.' },
        { q: 'Why is state considered immutable in React?', a: 'You should not mutate state directly (e.g., state.push()). Use the setter with a new reference (e.g., setState([...state, x])). Mutation bypasses React\'s change detection and may not trigger re-renders.' }
      ],
      mcqs: [
        { question: 'useState returns ___.', options: ['A single value', 'An array [value, setter]', 'An object', 'A promise'], answer: 1, explanation: 'useState returns [currentValue, setterFn] array — destructure to use.' },
        { question: 'State updates trigger ___.', options: ['A re-render of the component', 'Full page reload', 'Nothing', 'Only DOM mutation'], answer: 0, explanation: 'React re-renders the component with the new state.' },
        { question: 'Named export uses ___.', options: ['export default', 'export const name', 'module.exports', 'globalExport'], answer: 1, explanation: 'Named exports use the export keyword with a declaration.' },
        { question: 'Direct state mutation ___.', options: ['Is recommended', 'Bypasses React\'s detection and is a bug', 'Auto-triggers re-render', 'Only works in classes'], answer: 1, explanation: 'Mutating state without the setter breaks React\'s reactivity.' },
        { question: 'Props vs state: which is managed internally?', options: ['Props', 'State', 'Both', 'Neither'], answer: 1, explanation: 'State is owned internally; props are provided externally.' }
      ]
    },
    {
      id: 'ep-06',
      number: 6,
      title: 'Exploring the World',
      topics: ['useEffect hook', 'API fetching', 'fetch API', 'CORS', 'conditional rendering', 'shimmer UI'],
      interviewQuestions: [
        { q: 'What is useEffect?', a: 'useEffect(fn, deps) runs side effects after render. Common uses: data fetching, subscriptions, manual DOM manipulation. The dependency array controls when it re-runs: [] runs once after mount; [a,b] runs when a or b changes; no deps runs after every render.' },
        { q: 'When should you fetch data in React?', a: 'Typically inside useEffect with an empty dependency array so the fetch runs once after mount. For parameterized fetches, include the relevant params in deps. Libraries like React Query / SWR handle caching and deduplication.' },
        { q: 'What is CORS?', a: 'Cross-Origin Resource Sharing — a browser security feature that restricts requests between different origins. Servers must include CORS headers (Access-Control-Allow-Origin) to allow access from other origins. It is enforced by the browser, not Node or Postman.' },
        { q: 'What is conditional rendering in React?', a: 'Rendering different JSX based on conditions. Common patterns: ternary (cond ? A : B), logical && (cond && <A/>), early returns, or extracted components. Used to show loading states, empty states, auth-gated UI, etc.' },
        { q: 'What is a shimmer UI and why use it?', a: 'A placeholder with animated shimmering skeletons shown while content loads. It improves perceived performance and reduces user frustration during loading. Better UX than a bare spinner because it conveys the layout about to appear.' }
      ],
      mcqs: [
        { question: 'useEffect(fn, []) runs ___.', options: ['On every render', 'Once after mount', 'Never', 'Only on unmount'], answer: 1, explanation: 'Empty dep array = run once after initial render (mount).' },
        { question: 'CORS is enforced by ___.', options: ['Node server', 'Browser', 'OS', 'DNS'], answer: 1, explanation: 'CORS is a browser-enforced policy; Postman and server-to-server calls bypass it.' },
        { question: 'fetch returns ___.', options: ['The data', 'A Promise', 'A callback', 'An error'], answer: 1, explanation: 'fetch returns a Promise resolving to a Response object.' },
        { question: 'Best pattern for data fetching in a component?', options: ['Fetch inside render', 'Fetch in useEffect', 'Fetch in useState initializer', 'Fetch in constructor'], answer: 1, explanation: 'useEffect is the standard hook for side effects like data fetching.' },
        { question: 'A shimmer UI is shown ___.', options: ['After errors', 'During initial data load', 'Only on mobile', 'After unmount'], answer: 1, explanation: 'Shimmer skeletons fill UI during loading for better perceived performance.' }
      ]
    },
    {
      id: 'ep-07',
      number: 7,
      title: 'Finding the Path',
      topics: ['React Router v6', 'createBrowserRouter', 'RouterProvider', 'Link', 'useParams', 'Outlet', 'nested routing'],
      interviewQuestions: [
        { q: 'What is React Router?', a: 'React Router is a standard routing library for React that enables client-side routing (navigation without full page reloads). v6 introduced data APIs, loaders, and a cleaner declarative route config.' },
        { q: 'Why use <Link> instead of <a>?', a: '<a href> triggers a full page reload, losing state and redownloading everything. <Link to> uses the history API to change URL and re-render matched routes client-side without reload, preserving app state.' },
        { q: 'What is useParams?', a: 'useParams is a hook that returns an object of dynamic URL parameters. For a route /restaurant/:id, useParams() returns { id: "42" }, letting the component read the route parameter.' },
        { q: 'What is <Outlet/>?', a: 'A placeholder component that renders the matched child route inside a parent route. Enables nested layouts: the parent renders common chrome (header, sidebar) and <Outlet/> renders the currently active child page.' },
        { q: 'What is createBrowserRouter?', a: 'The v6.4+ API that creates a router instance with route definitions as a data structure. Passed to <RouterProvider router={...}/>. Supports loaders, actions, errorElement, and data-driven routing.' }
      ],
      mcqs: [
        { question: 'Which component navigates without a page reload?', options: ['<a>', '<Link>', '<button>', '<form>'], answer: 1, explanation: '<Link> uses client-side routing; <a> reloads the page.' },
        { question: 'useParams returns ___.', options: ['Query strings', 'Dynamic route params as an object', 'The full URL', 'The previous route'], answer: 1, explanation: 'useParams reads values matched against :dynamic segments.' },
        { question: '<Outlet/> is used to ___.', options: ['Render child routes inside a parent layout', 'Handle errors', 'Style routes', 'Fetch data'], answer: 0, explanation: 'Outlet is the nested route render slot.' },
        { question: 'The v6 API for route objects is ___.', options: ['Switch', 'createBrowserRouter', 'BrowserRouter + Route', 'useRoutes only'], answer: 1, explanation: 'createBrowserRouter + RouterProvider is the modern data-router API.' },
        { question: 'React Router enables ___.', options: ['Server-side routing', 'Client-side routing (SPA)', 'Neither', 'Only authentication'], answer: 1, explanation: 'React Router is a client-side SPA router.' }
      ]
    },
    {
      id: 'ep-08',
      number: 8,
      title: "Let's Get Classy",
      topics: ['class components', 'constructor', 'render()', 'componentDidMount', 'componentDidUpdate', 'componentWillUnmount', 'lifecycle'],
      interviewQuestions: [
        { q: 'What are class components?', a: 'Pre-hooks React components that extend React.Component. They have lifecycle methods, use this.state for state and this.setState to update. Still supported but functional components with hooks are now preferred.' },
        { q: 'What does componentDidMount do?', a: 'Runs once after the component is inserted into the DOM. Ideal for data fetching, subscriptions, DOM measurements. Equivalent in function components: useEffect with empty deps array.' },
        { q: 'Explain class component lifecycle order.', a: 'Mounting: constructor -> render -> componentDidMount. Updating: render -> componentDidUpdate. Unmounting: componentWillUnmount. For parent+child: parent constructor/render then children mount, then parent componentDidMount.' },
        { q: 'What is componentWillUnmount for?', a: 'Called just before a component is removed from the DOM. Used for cleanup: clearing timers, canceling subscriptions, removing listeners. Prevents memory leaks.' },
        { q: 'Why call super(props) in constructor?', a: 'Class components extend React.Component. Calling super(props) invokes the parent constructor with props, initializing this.props correctly so you can use props inside the constructor.' }
      ],
      mcqs: [
        { question: 'Class components extend ___.', options: ['React.Class', 'React.Component', 'React.PureClass', 'React.Hook'], answer: 1, explanation: 'Class components extend React.Component (or PureComponent).' },
        { question: 'componentDidMount runs ___.', options: ['Before render', 'Once after first render', 'On every render', 'On unmount'], answer: 1, explanation: 'Called once after initial mount — good for init side effects.' },
        { question: 'To update state in class components use ___.', options: ['this.state = ...', 'this.setState({...})', 'useState', 'direct mutation'], answer: 1, explanation: 'setState is the only way to update state and trigger re-render.' },
        { question: 'Cleanup in classes happens in ___.', options: ['componentDidMount', 'render', 'componentWillUnmount', 'constructor'], answer: 2, explanation: 'componentWillUnmount runs right before removal — cleanup goes here.' },
        { question: 'super(props) ensures ___.', options: ['Inheritance works', 'this.props is available', 'State is set', 'Render works'], answer: 1, explanation: 'Passing props to super(props) initializes this.props correctly.' }
      ]
    },
    {
      id: 'ep-09',
      number: 9,
      title: 'Optimizing our App',
      topics: ['custom hooks', 'code splitting', 'lazy loading', 'React.lazy', 'Suspense', 'dynamic import'],
      interviewQuestions: [
        { q: 'What are custom hooks?', a: 'User-defined hooks — functions whose names start with "use" that may call other hooks. They extract and reuse stateful logic between components (e.g., useOnlineStatus, useFetch). Do not call components; call them inside components/hooks.' },
        { q: 'What is code splitting?', a: 'Breaking the app bundle into smaller chunks that load on demand instead of a single large file. Reduces initial load time. Achieved via dynamic import() and tools like Webpack/Parcel which produce separate chunk files.' },
        { q: 'What is React.lazy?', a: 'React.lazy(() => import("./Comp")) returns a lazily-loaded component. The component is downloaded only when rendered. Must be rendered inside <Suspense fallback={...}> which shows fallback UI while the chunk loads.' },
        { q: 'What is <Suspense>?', a: 'A component that shows fallback UI while its children (lazy-loaded components, or data-fetching with suspense) are loading. Enables a declarative loading UX instead of manual state flags.' },
        { q: 'When should you lazy-load a component?', a: 'When it is not needed on initial render — e.g., modal dialogs, route pages, rarely-used heavy widgets. Route-based code splitting is the most common and effective pattern.' }
      ],
      mcqs: [
        { question: 'Custom hook names must start with ___.', options: ['do', 'get', 'use', 'my'], answer: 2, explanation: 'Convention "use" lets React\'s linter enforce the rules of hooks.' },
        { question: 'React.lazy returns ___.', options: ['A component to render inside Suspense', 'A promise', 'A hook', 'A factory'], answer: 0, explanation: 'React.lazy returns a lazy component; must be rendered inside <Suspense>.' },
        { question: '<Suspense> requires ___.', options: ['A children prop only', 'A fallback prop', 'A context', 'A router'], answer: 1, explanation: 'Suspense needs a fallback to show while loading.' },
        { question: 'Code splitting helps ___.', options: ['Reduce bundle size and improve initial load', 'Improve readability', 'Add more features', 'Increase memory'], answer: 0, explanation: 'Splitting reduces first-load payload and improves performance.' },
        { question: 'Best candidate for lazy loading?', options: ['App root component', 'Route pages and modals', 'Every component', 'State setters'], answer: 1, explanation: 'Route-level splitting is the biggest win; also modals and rare widgets.' }
      ]
    },
    {
      id: 'ep-10',
      number: 10,
      title: 'Jo Dikhta Hai, Vo Bikta Hai',
      topics: ['Tailwind CSS', 'utility classes', 'responsive design', 'className', 'Tailwind advantages'],
      interviewQuestions: [
        { q: 'What is Tailwind CSS?', a: 'A utility-first CSS framework that provides low-level utility classes (p-4, text-red-500, flex, grid) to style elements directly in markup. No pre-designed components — full control with a consistent design system.' },
        { q: 'Why use Tailwind over traditional CSS?', a: 'Faster iteration (no context-switching between files), consistent spacing/color scale, small production bundle (unused classes purged), responsive design with prefixes, and no class-name collisions.' },
        { q: 'How does Tailwind handle responsive design?', a: 'Using breakpoint prefixes: sm:, md:, lg:, xl:. E.g., "text-sm md:text-lg" is small on mobile, large on md screens and up. Mobile-first approach with override-on-larger-screens.' },
        { q: 'What is PurgeCSS/JIT in Tailwind?', a: 'Tailwind JIT scans your files for used class names and only generates CSS for those, producing a tiny production bundle. Removes unused utilities automatically, solving CSS bloat problems.' },
        { q: 'Downsides of Tailwind?', a: 'Long className strings can clutter JSX. Learning curve on utility names. Ref pattern discouraged to keep markup DRY may force @apply or component extraction. Not suitable if your team prefers strict separation of concerns.' }
      ],
      mcqs: [
        { question: 'Tailwind is ___.', options: ['A component library', 'A utility-first CSS framework', 'A JS framework', 'A preprocessor'], answer: 1, explanation: 'Tailwind provides utility classes rather than pre-built components.' },
        { question: 'Responsive class prefix for tablet-and-up is ___.', options: ['mobile:', 'md:', 'lg-plus:', 'res:'], answer: 1, explanation: 'md: applies styles starting from the medium breakpoint (default 768px).' },
        { question: 'JIT in Tailwind helps with ___.', options: ['Animation', 'Removing unused classes to shrink bundle', 'Routing', 'State management'], answer: 1, explanation: 'JIT generates only used utilities, keeping production CSS small.' },
        { question: 'In JSX you use ___ for CSS classes.', options: ['class', 'className', 'style-class', 'tw'], answer: 1, explanation: 'JSX uses className because class is a reserved word in JS.' },
        { question: 'Tailwind is ___-first by default.', options: ['Desktop', 'Mobile', 'Tablet', 'Print'], answer: 1, explanation: 'Tailwind responsive utilities follow mobile-first philosophy.' }
      ]
    },
    {
      id: 'ep-11',
      number: 11,
      title: 'Data is the New Oil',
      topics: ['Higher-order components', 'controlled vs uncontrolled', 'lifting state up', 'Context API', 'prop drilling'],
      interviewQuestions: [
        { q: 'What is a higher-order component (HOC)?', a: 'A function that takes a component and returns a new enhanced component. Pattern: withAuth(Page) or withLogger(Page). Used for cross-cutting concerns. Hooks have largely replaced HOCs for new code.' },
        { q: 'Controlled vs uncontrolled components?', a: 'Controlled: form input value is driven by React state via value + onChange. Uncontrolled: input manages its own state, read via refs. Controlled is preferred for most cases — single source of truth.' },
        { q: 'What is lifting state up?', a: 'Moving shared state from multiple siblings up to their common ancestor, then passing it down via props. Enables two siblings to share and sync state. Canonical React pattern before considering Context/Redux.' },
        { q: 'What is prop drilling?', a: 'Passing props through many intermediate components that do not use them just to reach a deep consumer. Hurts readability and maintenance. Solved by Context API or state management libraries.' },
        { q: 'What is the Context API?', a: 'Built-in way to share values across the component tree without prop drilling. createContext -> <Provider value={...}/> -> useContext(ctx) in consumers. Good for theme, auth, locale. Overuse can hurt performance due to re-render on value change.' }
      ],
      mcqs: [
        { question: 'A HOC is ___.', options: ['A component that renders many items', 'A function that wraps a component and returns a new one', 'A high-priority component', 'A hook'], answer: 1, explanation: 'HOC: higher-order component = function(Component) => NewComponent.' },
        { question: 'Controlled inputs use React state for the ___.', options: ['className', 'value and onChange', 'ref', 'type'], answer: 1, explanation: 'Controlled: value comes from state, updated via onChange.' },
        { question: 'Prop drilling is solved by ___.', options: ['More components', 'Context API or state management', 'useState', 'useEffect'], answer: 1, explanation: 'Context lets deep components read without intermediate props.' },
        { question: 'useContext reads from ___.', options: ['Redux store', 'createContext Provider value', 'Local state', 'URL params'], answer: 1, explanation: 'useContext returns the value provided by the nearest Provider.' },
        { question: 'Lifting state up means moving state ___.', options: ['To local component', 'To common ancestor of siblings', 'To server', 'To browser storage'], answer: 1, explanation: 'State moves up to the lowest common parent to share between siblings.' }
      ]
    },
    {
      id: 'ep-12',
      number: 12,
      title: "Let's Build Our Store",
      topics: ['Redux Toolkit', 'createSlice', 'configureStore', 'Provider', 'useSelector', 'useDispatch', 'actions', 'reducers'],
      interviewQuestions: [
        { q: 'What is Redux?', a: 'A predictable state container for JavaScript apps. Single store holds the entire state tree; state is read-only; updates happen via pure reducer functions in response to actions. Enables predictable flow and time-travel debugging.' },
        { q: 'What is Redux Toolkit?', a: 'The official, opinionated wrapper for Redux that reduces boilerplate. Provides createSlice (combines actions+reducers), configureStore (preconfigured store with middleware), createAsyncThunk for async, and uses Immer for mutable-looking reducer writes.' },
        { q: 'What does createSlice do?', a: 'Defines a feature slice with name, initialState, and reducers. Auto-generates action creators and action types based on reducer keys. With Immer, you can write reducers as if mutating state; RTK produces immutable updates.' },
        { q: 'Difference between useSelector and useDispatch?', a: 'useSelector(fn) reads a slice of state from the store; re-renders the component when that slice changes. useDispatch() returns the store\'s dispatch function used to send actions that update state.' },
        { q: 'Why wrap the app in <Provider store={...}>?', a: 'Provider makes the Redux store available to all nested components via React Context. Without it, useSelector/useDispatch cannot locate the store and will throw errors.' }
      ],
      mcqs: [
        { question: 'createSlice generates ___.', options: ['Only reducers', 'Actions and reducers together', 'Middleware', 'Selectors only'], answer: 1, explanation: 'createSlice bundles actions and reducers with typed action creators.' },
        { question: 'useSelector returns ___.', options: ['Dispatch function', 'Selected portion of state', 'All state', 'Actions array'], answer: 1, explanation: 'useSelector runs a selector and returns the picked state slice.' },
        { question: 'useDispatch returns ___.', options: ['State', 'The dispatch function to send actions', 'A thunk', 'A reducer'], answer: 1, explanation: 'useDispatch gives you dispatch for dispatching actions.' },
        { question: '<Provider> wraps the app to ___.', options: ['Style it', 'Make the Redux store available via context', 'Create routes', 'Fetch data'], answer: 1, explanation: 'Provider injects the store into React context.' },
        { question: 'Redux Toolkit uses ___ under the hood to allow "mutating" reducers.', options: ['Mobx', 'Immer', 'Proxy.js', 'Manual clone'], answer: 1, explanation: 'Immer lets you write mutative-looking code that produces immutable updates.' }
      ]
    },
    {
      id: 'ep-13',
      number: 13,
      title: 'Time for the Test',
      topics: ['Jest', 'React Testing Library', 'unit tests', 'integration tests', 'test coverage', 'mocking'],
      interviewQuestions: [
        { q: 'What is Jest?', a: 'A JavaScript testing framework by Facebook. Provides a test runner, assertion library (expect), mocking, and coverage tooling. Zero-config for most projects. Used widely for React testing.' },
        { q: 'What is React Testing Library (RTL)?', a: 'A library that encourages testing components from the user\'s perspective — by finding elements by role/text rather than implementation details. Promotes accessible, resilient tests. Works with Jest.' },
        { q: 'Difference between unit and integration tests?', a: 'Unit tests test a single piece in isolation (pure function, single component with mocks). Integration tests test how multiple pieces work together (component + context + router + api mock). Both have value; integration tests typically provide more confidence per test.' },
        { q: 'Why avoid testing implementation details?', a: 'Tests that rely on internal state/classNames break during refactors even when user-facing behavior is unchanged. RTL encourages querying by role/text — tests pass if the user experience is intact, fostering safer refactors.' },
        { q: 'What is mocking and why use it?', a: 'Replacing real dependencies (APIs, modules) with fake versions for tests — faster, deterministic, and isolated. Jest provides jest.fn(), jest.mock(), and MSW for network mocking.' }
      ],
      mcqs: [
        { question: 'Jest is a ___.', options: ['State manager', 'Test framework', 'Bundler', 'Linter'], answer: 1, explanation: 'Jest is a test runner/framework with assertions and mocking.' },
        { question: 'React Testing Library encourages queries by ___.', options: ['CSS class', 'Role, label, or text (user-facing)', 'Internal state', 'Component instance'], answer: 1, explanation: 'RTL prefers user-visible queries to keep tests resilient.' },
        { question: 'Unit tests focus on ___.', options: ['Isolated units', 'Whole apps', 'Only UI', 'Servers'], answer: 0, explanation: 'Unit = smallest testable unit, often with mocked dependencies.' },
        { question: 'jest.fn() creates ___.', options: ['A real function', 'A mock/spy function', 'A component', 'A reducer'], answer: 1, explanation: 'jest.fn() is a mock you can assert on and control return values.' },
        { question: 'Tests should be ___ to refactors.', options: ['Tightly coupled', 'Resilient (test behavior not implementation)', 'Dependent on class names', 'Linked to internal state'], answer: 1, explanation: 'Behavior-focused tests survive refactors that preserve UX.' }
      ]
    }
  ]
};
