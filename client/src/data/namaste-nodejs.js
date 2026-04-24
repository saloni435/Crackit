export default {
  id: 'namaste-nodejs',
  title: 'Namaste Node.js',
  icon: '🟩',
  color: '#68A063',
  episodes: [
    {
      id: 'ep-01',
      number: 1,
      season: 1,
      title: 'Introduction to Node.js',
      topics: ['what is Node.js', 'V8 engine', 'JavaScript runtime', 'non-blocking I/O', 'use cases'],
      interviewQuestions: [
        { q: 'What is Node.js?', a: 'Node.js is an open-source, cross-platform JavaScript runtime built on Chrome\'s V8 engine. It lets you run JavaScript outside the browser, primarily on servers, and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for data-intensive real-time applications.' },
        { q: 'Is Node.js a language, framework, or runtime?', a: 'Node.js is a runtime environment, not a language or framework. The language is JavaScript. Node.js provides the V8 engine to execute JS plus libuv and Node core APIs (fs, http, net, etc.) that let JavaScript talk to the operating system.' },
        { q: 'Why is Node.js single-threaded yet able to handle many concurrent requests?', a: 'Node.js runs JavaScript on a single thread but delegates I/O operations (file, network, DB) to libuv which uses the OS kernel or a thread pool. While those operations complete asynchronously, the single JS thread continues processing other work, driven by the event loop.' },
        { q: 'What are the main advantages of using Node.js?', a: 'Same language (JavaScript) on client and server, huge npm ecosystem, non-blocking I/O for high concurrency with low resource usage, fast V8 execution, excellent for real-time apps (chat, streaming), and a strong community.' },
        { q: 'What are typical Node.js use cases, and where is it a poor fit?', a: 'Great for I/O-heavy workloads: REST APIs, real-time apps, streaming, microservices, CLI tools, SSR. Poor fit for CPU-heavy workloads (video encoding, heavy image processing, complex math) since CPU work blocks the single JS thread; use worker_threads, native addons, or a different runtime for those.' }
      ],
      mcqs: [
        { question: 'Node.js is built on which JavaScript engine?', options: ['SpiderMonkey', 'V8', 'Chakra', 'JavaScriptCore'], answer: 1, explanation: 'Node.js embeds Google\'s V8 engine, the same one used by Chrome, to execute JavaScript.' },
        { question: 'Node.js is best described as a ___.', options: ['Framework', 'Language', 'Runtime environment', 'Database'], answer: 2, explanation: 'Node.js is a runtime that lets JavaScript run outside a browser; the language is still JS.' },
        { question: 'Which I/O model does Node.js use?', options: ['Blocking synchronous', 'Non-blocking event-driven', 'Multi-threaded blocking', 'Polling only'], answer: 1, explanation: 'Node.js uses non-blocking, event-driven I/O powered by libuv.' },
        { question: 'Node.js is NOT ideal for which workload?', options: ['REST APIs', 'Real-time chat', 'Heavy CPU-bound computation', 'Streaming'], answer: 2, explanation: 'CPU-bound work blocks the single JS thread; use workers or another platform.' },
        { question: 'Which statement is TRUE about Node.js concurrency?', options: ['Every request spawns a new thread', 'JS runs on a single thread with async I/O', 'It has no concurrency', 'It uses Python greenlets'], answer: 1, explanation: 'A single JS thread handles requests and async I/O is offloaded via libuv.' }
      ]
    },
    {
      id: 'ep-02',
      number: 2,
      season: 1,
      title: 'JS on Server & Module System',
      topics: ['CommonJS', 'require()', 'module.exports', 'ES modules', 'module wrapper'],
      interviewQuestions: [
        { q: 'What is the CommonJS module system?', a: 'CommonJS is the original module system used by Node.js. Each file is treated as a separate module with its own scope. You expose values via module.exports and consume them with require(). It loads modules synchronously.' },
        { q: 'What is the difference between CommonJS and ES Modules?', a: 'CommonJS uses require()/module.exports, loads synchronously, and values are copied by reference but bindings are not live. ES Modules use import/export, are asynchronous, support static analysis and tree-shaking, and provide live read-only bindings. Node supports both; ESM requires "type":"module" in package.json or .mjs extension.' },
        { q: 'What is the Node.js module wrapper?', a: 'Before execution, Node wraps every module in a function: (function(exports, require, module, __filename, __dirname) { ... }). This gives each module its own scope and injects the five variables, preventing leakage into global scope.' },
        { q: 'How does require() resolve a module path?', a: 'Node checks: 1) core modules (fs, http), 2) relative paths (./, ../), 3) absolute paths (/), 4) node_modules lookup — walking up parent directories. For directories it looks for package.json "main", then index.js. Extensions .js, .json, .node are tried in order.' },
        { q: 'Why is require() synchronous and what problem can that cause?', a: 'CommonJS was designed for servers where modules are on local disk, so synchronous loading is acceptable at startup. Problems arise with large dependency graphs slowing startup, and it cannot be used to load modules over the network or lazily without blocking.' }
      ],
      mcqs: [
        { question: 'Which is the CommonJS export syntax?', options: ['export default foo', 'module.exports = foo', 'exports foo', 'public foo'], answer: 1, explanation: 'CommonJS exposes values via module.exports (or exports.x = ...).' },
        { question: 'Which variables are NOT injected by the module wrapper?', options: ['require', 'module', 'window', '__dirname'], answer: 2, explanation: 'window is a browser global; Node injects require, module, exports, __filename, __dirname.' },
        { question: 'To use ES Modules in Node without .mjs, you set ___ in package.json.', options: ['"esm": true', '"type": "module"', '"module": "esm"', '"esmodules": true'], answer: 1, explanation: 'Setting "type": "module" makes .js files load as ESM.' },
        { question: 'require() is ___.', options: ['Asynchronous', 'Synchronous', 'Streaming', 'Parallel'], answer: 1, explanation: 'CommonJS require() loads and evaluates modules synchronously.' },
        { question: 'When resolving a directory, Node first looks at ___.', options: ['index.html', 'package.json "main"', 'main.js', 'Random file'], answer: 1, explanation: 'The "main" field of package.json is checked first, then index.js as fallback.' }
      ]
    },
    {
      id: 'ep-03',
      number: 3,
      season: 1,
      title: 'libuv & Async I/O',
      topics: ['libuv library', 'thread pool', 'async I/O', 'event-driven architecture', 'kernel offloading'],
      interviewQuestions: [
        { q: 'What is libuv?', a: 'libuv is a C library that provides Node.js with its event loop, asynchronous I/O primitives, a thread pool, timers, DNS, networking, and file system access. It abstracts OS-specific async APIs (epoll on Linux, kqueue on macOS, IOCP on Windows) behind one interface.' },
        { q: 'How does libuv handle file I/O vs network I/O?', a: 'Network I/O uses the OS async facilities (epoll/kqueue/IOCP) — no extra threads needed. File I/O on most OSes has no true async API, so libuv offloads it to its thread pool (default 4 threads) and signals completion via the event loop.' },
        { q: 'What is the default size of libuv\'s thread pool?', a: 'libuv\'s thread pool defaults to 4 threads. You can change it with the UV_THREADPOOL_SIZE environment variable (up to 1024). It is used for file system calls, DNS lookups via getaddrinfo, crypto (pbkdf2, scrypt), and user C++ addons.' },
        { q: 'What happens when the thread pool is saturated?', a: 'Tasks queue up waiting for a free thread. A few CPU-heavy crypto or DNS tasks can starve other I/O operations, causing latency spikes. Solutions: raise UV_THREADPOOL_SIZE, offload CPU work to worker_threads or native services, or cache DNS.' },
        { q: 'Why can Node.js scale to thousands of connections on a single thread?', a: 'Because the JS thread only dispatches callbacks — the actual waiting for sockets is done in the OS kernel via epoll/kqueue/IOCP. When data arrives, the kernel notifies libuv, which enqueues a callback. The JS thread never blocks on I/O.' }
      ],
      mcqs: [
        { question: 'libuv is written in which language?', options: ['JavaScript', 'C', 'C++', 'Rust'], answer: 1, explanation: 'libuv is a portable C library.' },
        { question: 'Default libuv thread pool size is ___.', options: ['1', '4', '8', '16'], answer: 1, explanation: 'The default thread pool has 4 threads; override with UV_THREADPOOL_SIZE.' },
        { question: 'Which task does NOT use the libuv thread pool?', options: ['fs.readFile', 'crypto.pbkdf2', 'TCP socket read', 'dns.lookup'], answer: 2, explanation: 'TCP uses the OS kernel (epoll/kqueue/IOCP) directly, not the thread pool.' },
        { question: 'On Linux, libuv\'s network polling uses ___.', options: ['select', 'poll', 'epoll', 'IOCP'], answer: 2, explanation: 'libuv uses epoll on Linux, kqueue on BSD/macOS, and IOCP on Windows.' },
        { question: 'Which env variable tunes the thread pool?', options: ['NODE_POOL', 'UV_THREADPOOL_SIZE', 'LIBUV_THREADS', 'THREAD_SIZE'], answer: 1, explanation: 'UV_THREADPOOL_SIZE sets the pool size up to 1024.' }
      ]
    },
    {
      id: 'ep-04',
      number: 4,
      season: 1,
      title: 'V8 JS Engine Deep Dive',
      topics: ['parsing', 'AST', 'Ignition interpreter', 'TurboFan optimizer', 'garbage collection', 'JIT compilation'],
      interviewQuestions: [
        { q: 'What is V8?', a: 'V8 is Google\'s high-performance open-source JavaScript and WebAssembly engine written in C++. It compiles JS to native machine code using just-in-time compilation. Used by Chrome, Node.js, Deno, Electron, and others.' },
        { q: 'What is the Ignition-TurboFan pipeline?', a: 'V8 parses JS to an AST, Ignition (the interpreter) converts it to bytecode and executes it while collecting type feedback. Hot functions are then sent to TurboFan (the optimizing compiler) which produces highly optimized machine code based on the feedback. If assumptions break, V8 deoptimizes back to bytecode.' },
        { q: 'How does V8 perform garbage collection?', a: 'V8 uses a generational GC with a young generation (Scavenger, semispace copying, fast) for short-lived objects and an old generation (Mark-Sweep-Compact) for long-lived objects. It runs incrementally and concurrently to minimize pause times.' },
        { q: 'What is JIT compilation in V8?', a: 'Just-In-Time compilation means code is compiled to machine code at runtime rather than ahead of time. V8 starts with fast bytecode execution and, based on runtime profiling, promotes hot code to optimized machine code for near-native performance.' },
        { q: 'What triggers deoptimization in V8?', a: 'TurboFan optimizes based on type assumptions (hidden classes, inline caches). If a function is later called with a new shape or type, the optimized code is invalid, so V8 deopts and falls back to Ignition. Frequent deopts hurt performance — keep object shapes and argument types consistent.' }
      ],
      mcqs: [
        { question: 'Ignition in V8 is a ___.', options: ['Parser', 'Interpreter', 'Optimizer', 'Garbage collector'], answer: 1, explanation: 'Ignition is V8\'s bytecode interpreter; TurboFan is the optimizer.' },
        { question: 'JIT stands for ___.', options: ['Just In Time', 'JavaScript Inline Transform', 'Java Interpreter Tool', 'JIT Is Terrible'], answer: 0, explanation: 'Just-In-Time compilation compiles code at runtime.' },
        { question: 'V8 garbage collection is ___.', options: ['Single generation', 'Generational (young + old)', 'Manual only', 'Reference counted'], answer: 1, explanation: 'V8 uses a generational GC with different collectors per generation.' },
        { question: 'TurboFan produces ___.', options: ['Bytecode', 'Machine code', 'HTML', 'AST'], answer: 1, explanation: 'TurboFan compiles hot bytecode into optimized machine code.' },
        { question: 'Which practice helps V8 keep optimized code?', options: ['Change object shapes often', 'Pass different types to functions', 'Keep hidden classes stable', 'Use eval frequently'], answer: 2, explanation: 'Stable hidden classes/types avoid deoptimizations.' }
      ]
    },
    {
      id: 'ep-05',
      number: 5,
      season: 1,
      title: 'Sync, Async & setTimeout',
      topics: ['synchronous code', 'asynchronous code', 'setTimeout in Node', 'process.nextTick', 'setImmediate'],
      interviewQuestions: [
        { q: 'What is the difference between synchronous and asynchronous code in Node?', a: 'Synchronous code blocks the JS thread until it finishes — the next line waits. Asynchronous code starts an operation and continues; the result is delivered later via a callback, promise, or await. Node favors async for I/O to avoid blocking the event loop.' },
        { q: 'How does setTimeout work in Node.js?', a: 'setTimeout schedules a callback to run after at least the given delay (ms). It registers a timer in libuv; when the event loop enters the timers phase and the delay has elapsed, the callback is enqueued and executed. The delay is a minimum, not exact.' },
        { q: 'What is process.nextTick?', a: 'process.nextTick queues a callback to run immediately after the current operation completes, before the event loop continues to the next phase. It has higher priority than promise microtasks in older Node versions and is useful for deferring work within the same tick.' },
        { q: 'Difference between setImmediate and setTimeout(fn, 0)?', a: 'setImmediate runs its callback in the check phase of the event loop — after I/O callbacks. setTimeout(fn, 0) runs in the timers phase with a minimum 1ms delay clamp. Inside an I/O callback, setImmediate typically fires first; at the top level, order is non-deterministic.' },
        { q: 'What happens if you schedule a blocking loop inside an async callback?', a: 'The blocking loop holds the single JS thread, preventing the event loop from advancing, timers from firing, and I/O callbacks from running. All other requests stall until the loop ends. Never run long CPU work on the main thread.' }
      ],
      mcqs: [
        { question: 'Which queues a callback for the next iteration, before other microtasks historically?', options: ['setTimeout', 'setImmediate', 'process.nextTick', 'queueMicrotask'], answer: 2, explanation: 'process.nextTick has its own queue drained before other microtasks.' },
        { question: 'setTimeout delay is ___.', options: ['Exact', 'A minimum', 'A maximum', 'Ignored'], answer: 1, explanation: 'The timer is queued after at least the given delay.' },
        { question: 'setImmediate runs in which event loop phase?', options: ['timers', 'poll', 'check', 'close'], answer: 2, explanation: 'setImmediate callbacks run in the check phase.' },
        { question: 'A CPU-heavy loop on the main thread will ___.', options: ['Run in parallel', 'Block the event loop', 'Be offloaded automatically', 'Throw an error'], answer: 1, explanation: 'Long synchronous work blocks the single JS thread.' },
        { question: 'setTimeout(fn, 0) is clamped to a minimum delay of ___.', options: ['0 ms', '1 ms', '4 ms', '16 ms'], answer: 1, explanation: 'Node clamps setTimeout to at least 1ms.' }
      ]
    },
    {
      id: 'ep-06',
      number: 6,
      season: 1,
      title: 'Event Loop in Node.js',
      topics: ['event loop phases', 'timers phase', 'pending callbacks', 'poll phase', 'check phase', 'close phase', 'microtasks'],
      interviewQuestions: [
        { q: 'What are the phases of the Node.js event loop?', a: 'In order: 1) timers — runs setTimeout/setInterval callbacks whose threshold has elapsed, 2) pending callbacks — runs deferred system callbacks, 3) idle/prepare — internal, 4) poll — retrieves new I/O events and runs their callbacks, 5) check — runs setImmediate callbacks, 6) close callbacks — e.g. socket.on("close"). Between each phase, microtasks (process.nextTick, then promises) are drained.' },
        { q: 'When does the poll phase block?', a: 'When the poll queue is empty, the loop checks if there are timers about to expire (then it exits to handle them) or setImmediate scheduled (exits to check phase). Otherwise it blocks waiting for new I/O events, keeping the process idle rather than busy-looping.' },
        { q: 'How do microtasks fit in the event loop?', a: 'After each macrotask (callback in any phase) finishes, Node drains the process.nextTick queue first, then the Promise microtask queue, before proceeding. This means promises resolve quickly between phases, but long microtask chains can starve I/O.' },
        { q: 'Why can process.nextTick starve the event loop?', a: 'nextTick callbacks are processed before the event loop advances phases. If a nextTick callback recursively schedules more nextTicks, the queue never empties, and I/O/timers never run — the loop is starved. Prefer setImmediate for deferred work in most cases.' },
        { q: 'Which phase handles incoming HTTP requests?', a: 'The poll phase, which retrieves new I/O events (e.g. socket data). For an HTTP server, accepted connections and incoming data arrive here, and their JS callbacks run in poll.' }
      ],
      mcqs: [
        { question: 'Which phase runs setImmediate callbacks?', options: ['timers', 'poll', 'check', 'close'], answer: 2, explanation: 'check phase is dedicated to setImmediate.' },
        { question: 'I/O callbacks run primarily in the ___ phase.', options: ['timers', 'poll', 'check', 'close'], answer: 1, explanation: 'poll retrieves and executes I/O callbacks.' },
        { question: 'Microtasks run ___ phases.', options: ['Only at the end', 'Only once per loop', 'Between', 'Never'], answer: 2, explanation: 'nextTick and Promise microtasks drain between each macrotask.' },
        { question: 'Which priority is HIGHEST?', options: ['setTimeout', 'setImmediate', 'process.nextTick', 'fs.readFile callback'], answer: 2, explanation: 'process.nextTick runs before other microtasks and before the loop advances.' },
        { question: 'Event loop order starts with ___.', options: ['poll', 'timers', 'check', 'close'], answer: 1, explanation: 'Each tick begins in the timers phase.' }
      ]
    },
    {
      id: 'ep-07',
      number: 7,
      season: 1,
      title: 'Thread Pool in libuv',
      topics: ['UV_THREADPOOL_SIZE', 'CPU-bound vs I/O-bound tasks', 'thread pool starvation', 'worker_threads'],
      interviewQuestions: [
        { q: 'Which Node operations use the libuv thread pool?', a: 'File system (most fs.* async calls), DNS via dns.lookup, some crypto operations (pbkdf2, scrypt, randomBytes for large sizes), zlib compression, and custom C++ addons that choose to. Network I/O does NOT use the thread pool.' },
        { q: 'How do you tune UV_THREADPOOL_SIZE?', a: 'Set the UV_THREADPOOL_SIZE env variable before Node starts, e.g. UV_THREADPOOL_SIZE=16 node app.js. Valid range is 1-1024. Must be set before the first libuv call; changing it at runtime has no effect.' },
        { q: 'Difference between CPU-bound and I/O-bound tasks in Node?', a: 'I/O-bound tasks spend time waiting (disk, network, DB) and are perfect for Node\'s async model. CPU-bound tasks consume CPU cycles (hashing, compression, image processing) and block the single JS thread or exhaust the thread pool. Use worker_threads or child processes for CPU work.' },
        { q: 'What are worker_threads?', a: 'worker_threads is a Node module providing true OS threads, each with its own V8 instance and event loop. Perfect for CPU-bound JavaScript work that would block the main thread. They communicate via messageports and SharedArrayBuffer, unlike child_process which spawns a whole new process.' },
        { q: 'Symptoms and fixes for thread pool saturation?', a: 'Symptoms: file reads, DNS, or crypto calls get slow/stalled; timers fire late; throughput drops. Fixes: raise UV_THREADPOOL_SIZE, cache DNS results, offload heavy crypto to worker_threads, move CPU work out of the main process, profile to find the culprit.' }
      ],
      mcqs: [
        { question: 'Which task does NOT use the libuv thread pool?', options: ['fs.readFile', 'crypto.pbkdf2', 'HTTP request body read from socket', 'dns.lookup'], answer: 2, explanation: 'Socket I/O goes through kernel epoll/kqueue/IOCP, not the pool.' },
        { question: 'Max UV_THREADPOOL_SIZE is ___.', options: ['64', '128', '512', '1024'], answer: 3, explanation: 'libuv allows up to 1024 threads in the pool.' },
        { question: 'worker_threads share ___ with the main thread.', options: ['Nothing', 'Global state', 'SharedArrayBuffers only (and messages)', 'Full memory'], answer: 2, explanation: 'Workers have isolated memory; share via SAB or transferable messages.' },
        { question: 'For CPU-heavy hashing, you should use ___.', options: ['setTimeout', 'process.nextTick', 'worker_threads or offload', 'Bigger thread pool only'], answer: 2, explanation: 'Prefer worker_threads so the main thread stays responsive.' },
        { question: 'dns.lookup uses ___; dns.resolve uses ___.', options: ['Pool / pool', 'Pool / network (c-ares)', 'Network / pool', 'Neither'], answer: 1, explanation: 'lookup uses getaddrinfo on the pool; resolve uses c-ares over the network.' }
      ]
    },
    {
      id: 'ep-08',
      number: 8,
      season: 1,
      title: 'Streams & Buffers',
      topics: ['readable streams', 'writable streams', 'duplex and transform streams', 'Buffer', 'pipe', 'backpressure'],
      interviewQuestions: [
        { q: 'What is a Buffer in Node.js?', a: 'A Buffer is a fixed-size chunk of raw binary memory outside V8\'s heap, used to handle binary data like files, network packets, and image bytes. Buffers are instances of Uint8Array with extra methods for encoding/decoding strings.' },
        { q: 'What are the four types of streams in Node?', a: '1) Readable — source of data (fs.createReadStream, http req), 2) Writable — destination (fs.createWriteStream, http res), 3) Duplex — both readable and writable with independent channels (TCP socket), 4) Transform — duplex where output is a function of input (zlib, crypto).' },
        { q: 'What is backpressure and how does pipe handle it?', a: 'Backpressure occurs when a writable stream cannot keep up with a readable stream. .pipe() handles this automatically: if write() returns false, the readable is paused; when the writable emits drain, the readable resumes. This prevents unbounded memory growth.' },
        { q: 'Why are streams useful?', a: 'Streams process data in chunks instead of loading everything into memory. This keeps memory usage low regardless of data size, enables processing as data arrives (low latency), and composes well via pipe: read → transform → write.' },
        { q: 'What is the difference between flowing and paused mode?', a: 'Paused mode (default) requires explicit .read() calls; data accumulates in an internal buffer. Flowing mode starts pushing chunks via "data" events as soon as a listener is attached or .resume() is called. .pipe() switches to flowing mode automatically.' }
      ],
      mcqs: [
        { question: 'Which is NOT a stream type?', options: ['Readable', 'Writable', 'Circular', 'Transform'], answer: 2, explanation: 'The four stream types are Readable, Writable, Duplex, and Transform.' },
        { question: 'Buffer is stored ___.', options: ['On the V8 heap', 'Outside V8 heap in raw memory', 'On disk', 'In localStorage'], answer: 1, explanation: 'Buffers live in off-heap memory managed by Node/libuv.' },
        { question: '.pipe() handles ___ automatically.', options: ['Authentication', 'Backpressure', 'Parsing', 'Encryption'], answer: 1, explanation: 'pipe pauses/resumes the source based on the destination.' },
        { question: 'gzip compression is a ___ stream.', options: ['Readable', 'Writable', 'Transform', 'Duplex'], answer: 2, explanation: 'zlib gzip/gunzip are Transform streams (input → output).' },
        { question: 'Backpressure prevents ___.', options: ['CPU starvation', 'Unbounded memory growth', 'SQL injection', 'XSS'], answer: 1, explanation: 'It stops producers from overwhelming slower consumers.' }
      ]
    },
    {
      id: 'ep-09',
      number: 9,
      season: 2,
      title: 'Microservices vs Monolith',
      topics: ['monolithic architecture', 'microservices architecture', 'scaling patterns', 'trade-offs', 'when to use which'],
      interviewQuestions: [
        { q: 'What is a monolithic architecture?', a: 'A single codebase and deployable that contains all features — UI, business logic, data access — running as one process. Simple to build and deploy at small scale, but scales as a whole and becomes hard to maintain as it grows.' },
        { q: 'What is microservices architecture?', a: 'An application composed of small, independently deployable services, each owning a specific business capability and its own data. Services communicate over the network (HTTP, gRPC, message queues). Enables independent scaling, polyglot tech, and team autonomy.' },
        { q: 'What are the main trade-offs of microservices?', a: 'Pros: independent deploys, scaling, polyglot, fault isolation, team autonomy. Cons: operational complexity (orchestration, monitoring), network latency, distributed transactions, eventual consistency, harder debugging, duplicated infra, higher upfront cost.' },
        { q: 'When should a startup choose a monolith?', a: 'When the team is small, the domain is not yet well understood, and speed of iteration matters. Start with a well-modularized monolith (sometimes called "modular monolith") and extract services only when you hit clear scaling or organizational limits.' },
        { q: 'How do microservices communicate?', a: 'Synchronously via HTTP/REST or gRPC for request/response. Asynchronously via message queues/brokers (Kafka, RabbitMQ, SQS) for events, jobs, and loose coupling. Service discovery (Consul, k8s DNS) helps them find each other.' }
      ],
      mcqs: [
        { question: 'Monolith = ___.', options: ['Many services', 'Single deployable', 'No database', 'Serverless only'], answer: 1, explanation: 'A monolith is a single deployable containing all features.' },
        { question: 'A core benefit of microservices is ___.', options: ['Simpler ops', 'Independent deployability', 'No network calls', 'Shared database'], answer: 1, explanation: 'Each service can be deployed and scaled on its own.' },
        { question: 'Microservices communicate via ___.', options: ['Direct memory access', 'Network (HTTP, queues)', 'Shared globals', 'USB'], answer: 1, explanation: 'Services run in separate processes and use the network.' },
        { question: 'Which is a downside of microservices?', options: ['Simpler debugging', 'Lower ops overhead', 'Distributed system complexity', 'Single point of failure'], answer: 2, explanation: 'They introduce distributed system challenges like partial failure, latency, and eventual consistency.' },
        { question: 'A good starting point for a new product is usually ___.', options: ['100 microservices', 'A modular monolith', 'Serverless only', 'No architecture'], answer: 1, explanation: 'Start simple; extract services when justified by scale/team structure.' }
      ]
    },
    {
      id: 'ep-10',
      number: 10,
      season: 2,
      title: 'Express.js Setup',
      topics: ['express()', 'routing', 'request/response', 'nodemon', 'basic server'],
      interviewQuestions: [
        { q: 'What is Express.js?', a: 'Express is a minimal, unopinionated web framework for Node.js. It provides routing, middleware support, request/response helpers, and templating integrations, while leaving architectural choices to the developer. It is the de facto standard for Node HTTP servers.' },
        { q: 'How do you create a basic Express server?', a: 'const express = require("express"); const app = express(); app.get("/", (req, res) => res.send("Hello")); app.listen(3000). You define routes with app.METHOD(path, handler), handle req/res, then start listening on a port.' },
        { q: 'What is the request and response object?', a: 'req represents the incoming HTTP request with properties like params, query, body, headers, method, path, cookies. res represents the response, with methods like send, json, status, redirect, render, set(header). Both extend Node\'s http.IncomingMessage and http.ServerResponse.' },
        { q: 'What is nodemon?', a: 'nodemon is a dev tool that watches your files and automatically restarts the Node process when changes are detected. Install globally or as a devDependency and run `nodemon app.js` instead of node during development.' },
        { q: 'How do you handle route parameters and query strings?', a: 'Route params are in the URL pattern: app.get("/users/:id", (req, res) => req.params.id). Query strings come from ?key=value: req.query.key. Params are parsed synchronously at match time, query via querystring parsing.' }
      ],
      mcqs: [
        { question: 'Which method creates an Express app?', options: ['new Express()', 'express()', 'Express.app()', 'createApp()'], answer: 1, explanation: 'Calling the default-exported function express() returns the app.' },
        { question: 'To access route params in Express, use ___.', options: ['req.params', 'req.body', 'req.query', 'req.url'], answer: 0, explanation: 'req.params holds values for :name placeholders.' },
        { question: 'nodemon mainly helps with ___.', options: ['Production scaling', 'Auto-restarting on file changes', 'TLS termination', 'Database pooling'], answer: 1, explanation: 'It restarts Node automatically during development.' },
        { question: 'Which call starts the server?', options: ['app.open(port)', 'app.listen(port)', 'app.start(port)', 'app.bind(port)'], answer: 1, explanation: 'app.listen(port) binds and starts accepting connections.' },
        { question: 'req.query gives you ___.', options: ['URL path params', 'Parsed query string', 'Request body', 'Response headers'], answer: 1, explanation: 'req.query is the parsed ?key=value portion of the URL.' }
      ]
    },
    {
      id: 'ep-11',
      number: 11,
      season: 2,
      title: 'Middlewares & Error Handling',
      topics: ['app.use()', 'next() function', 'error-handling middleware', 'custom middleware', 'middleware order'],
      interviewQuestions: [
        { q: 'What is middleware in Express?', a: 'Middleware is a function with signature (req, res, next) that executes during the request-response cycle. It can modify req/res, end the response, or pass control to the next middleware via next(). Examples: body parsing, auth, logging, error handling.' },
        { q: 'How do you create error-handling middleware?', a: 'Use a four-argument signature: (err, req, res, next) => { ... }. Express recognizes the arity and routes errors there when next(err) is called or an async handler rejects. Register it AFTER all routes.' },
        { q: 'Why does middleware order matter?', a: 'Middleware runs in the order it is registered. Body parsers must come before routes that read req.body; auth must come before protected routes; error handlers must come last so they catch errors from everything above.' },
        { q: 'How do you handle async errors in Express?', a: 'Wrap async route handlers in try/catch and call next(err), or use a helper like express-async-errors (or custom asyncHandler) that forwards rejections to the error middleware automatically. From Express 5+, async route handlers forward promise rejections natively.' },
        { q: 'Difference between app.use and app.METHOD?', a: 'app.use(path?, fn) registers middleware that runs for any HTTP method at the (optional) path prefix. app.get/post/put/delete registers a handler for a specific method and exact path pattern, typically ending a route.' }
      ],
      mcqs: [
        { question: 'Error middleware arity is ___.', options: ['2', '3', '4', '5'], answer: 2, explanation: 'Four arguments: (err, req, res, next) signals to Express this is an error handler.' },
        { question: 'To pass control to the next middleware call ___.', options: ['return()', 'next()', 'done()', 'skip()'], answer: 1, explanation: 'next() invokes the next middleware; next(err) jumps to error handling.' },
        { question: 'Body parser should be registered ___.', options: ['After routes', 'Before routes that read req.body', 'Anywhere', 'Inside routes'], answer: 1, explanation: 'Order matters — parsers must run before handlers that use parsed data.' },
        { question: 'app.use() applies to ___.', options: ['All HTTP methods', 'Only GET', 'Only POST', 'Nothing until specified'], answer: 0, explanation: 'app.use is method-agnostic; it applies to any method at the given path.' },
        { question: 'Error handlers should be registered ___.', options: ['First', 'Last, after routes', 'Randomly', 'Twice'], answer: 1, explanation: 'They must come after routes so next(err) reaches them.' }
      ]
    },
    {
      id: 'ep-12',
      number: 12,
      season: 2,
      title: 'Database & Mongoose',
      topics: ['MongoDB basics', 'Mongoose ODM', 'Schema', 'Model', 'CRUD operations'],
      interviewQuestions: [
        { q: 'What is MongoDB?', a: 'MongoDB is a document-oriented NoSQL database that stores data as BSON documents grouped into collections. It offers flexible schemas, horizontal scaling via sharding, replication, and rich query and aggregation capabilities. Each document has a unique _id.' },
        { q: 'What is Mongoose?', a: 'Mongoose is an ODM (Object Data Modeling) library for MongoDB in Node.js. It provides schemas with validation, middleware (hooks), query building, population for references, and type casting. It sits between your app and the MongoDB driver.' },
        { q: 'What is a Mongoose Schema vs Model?', a: 'A Schema defines the structure of documents: fields, types, validators, defaults, indexes, methods, and virtuals. A Model is a constructor compiled from a Schema and represents a collection; instances are documents. Models provide CRUD methods like find, create, updateOne, deleteOne.' },
        { q: 'How do Mongoose validators work?', a: 'Validators run on save and some update operations. Built-in ones include required, min, max, minlength, maxlength, enum, match. You can also pass custom validate functions per field. Invalid docs throw ValidationError.' },
        { q: 'How do you perform CRUD with Mongoose?', a: 'Create: Model.create(data) or new Model(data).save(). Read: Model.find(filter), findOne, findById. Update: Model.updateOne(filter, update), findByIdAndUpdate(id, update, {new:true}). Delete: Model.deleteOne(filter), findByIdAndDelete(id).' }
      ],
      mcqs: [
        { question: 'MongoDB is a ___ database.', options: ['Relational', 'Document-oriented NoSQL', 'Graph', 'Key-value only'], answer: 1, explanation: 'MongoDB stores documents (BSON) in collections.' },
        { question: 'Mongoose is an ___.', options: ['OS', 'ODM', 'ORM', 'IDE'], answer: 1, explanation: 'Mongoose is an Object Data Modeling library for MongoDB.' },
        { question: 'A Mongoose Model is compiled from ___.', options: ['A Schema', 'JSON only', 'SQL', 'YAML'], answer: 0, explanation: 'Schemas define structure; Model is built via mongoose.model(name, schema).' },
        { question: 'To get the updated doc back, pass ___ to findByIdAndUpdate.', options: ['{ upsert: true }', '{ new: true }', '{ lean: true }', 'Nothing'], answer: 1, explanation: 'The new option returns the post-update document.' },
        { question: 'Which is NOT a built-in Mongoose validator?', options: ['required', 'min', 'enum', 'isBlue'], answer: 3, explanation: 'isBlue is not built-in; you can implement it with a custom validate function.' }
      ]
    },
    {
      id: 'ep-13',
      number: 13,
      season: 2,
      title: 'Data Sanitization & Validation',
      topics: ['input validation', 'express-validator', 'sanitization', 'preventing injection', 'security headers'],
      interviewQuestions: [
        { q: 'Why are validation and sanitization important?', a: 'User input cannot be trusted. Validation ensures input matches expected rules (type, length, format). Sanitization cleans unsafe content (HTML, scripts, NoSQL operators). Together they prevent injection attacks, data corruption, and application errors.' },
        { q: 'What is express-validator?', a: 'express-validator is a middleware library that provides chainable validators and sanitizers for Express requests. You declare rules with body(), param(), query() etc., then handle validation results via validationResult(req).' },
        { q: 'Difference between validation and sanitization?', a: 'Validation rejects invalid input (throws / returns errors). Sanitization transforms input (trim whitespace, escape HTML, normalize email, strip tags) to make it safe. Often used together: validate shape first, then sanitize values.' },
        { q: 'How do you prevent NoSQL injection in Node?', a: 'Never pass raw user input directly into query objects. Validate and coerce expected types (strings stay strings). Use libraries like express-mongo-sanitize to strip operator-like keys ($gt, $ne) from req.body/query. Avoid eval-like query builders.' },
        { q: 'What common headers boost API security?', a: 'Use helmet middleware to set Content-Security-Policy, X-Frame-Options, Strict-Transport-Security (HSTS), X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy, and remove X-Powered-By. Combine with CORS, rate limiting, and HTTPS.' }
      ],
      mcqs: [
        { question: 'Validation ___.', options: ['Transforms input', 'Checks input meets rules', 'Ignores input', 'Encrypts input'], answer: 1, explanation: 'Validation enforces rules; sanitization transforms.' },
        { question: 'Which middleware helps strip $ operators from user input?', options: ['helmet', 'express-mongo-sanitize', 'cors', 'morgan'], answer: 1, explanation: 'express-mongo-sanitize removes keys containing $ or dots to prevent NoSQL injection.' },
        { question: 'Which package sets many security headers at once?', options: ['helmet', 'body-parser', 'dotenv', 'axios'], answer: 0, explanation: 'helmet sets a bundle of hardening HTTP headers.' },
        { question: 'express-validator rule for body field starts with ___.', options: ['body("email")', 'header("email")', 'cookie("email")', 'env("email")'], answer: 0, explanation: 'body() targets fields in req.body.' },
        { question: 'Sanitization example: ___.', options: ['isEmail()', 'trim()', 'isLength()', 'equals()'], answer: 1, explanation: 'trim removes whitespace; the others are validators.' }
      ]
    },
    {
      id: 'ep-14',
      number: 14,
      season: 2,
      title: 'Authentication with JWT',
      topics: ['JWT structure', 'jsonwebtoken library', 'httpOnly cookies', 'auth middleware', 'refresh tokens'],
      interviewQuestions: [
        { q: 'What is a JWT?', a: 'A JSON Web Token is a compact, URL-safe token composed of three base64url-encoded parts: header.payload.signature. The header specifies algorithm/type, the payload holds claims (sub, iat, exp, custom), and the signature is an HMAC or RSA/ECDSA signature that verifies integrity and authenticity.' },
        { q: 'How do you create and verify JWTs in Node?', a: 'With jsonwebtoken: jwt.sign(payload, secret, { expiresIn: "1h" }) creates a token, jwt.verify(token, secret) verifies the signature and expiry, throwing on failure and returning decoded claims on success.' },
        { q: 'Why store JWTs in httpOnly cookies instead of localStorage?', a: 'localStorage is accessible to any JS on the page, so an XSS vulnerability leaks the token. httpOnly cookies are not readable from JS, mitigating XSS token theft. Combine with Secure, SameSite=Strict/Lax, and CSRF protection.' },
        { q: 'What goes in an auth middleware?', a: 'Read the token from header (Authorization: Bearer ...) or cookie; if missing, 401. Verify with jwt.verify — catch errors and 401. On success, attach req.user (decoded payload) and call next(). Protected routes mount this middleware before their handlers.' },
        { q: 'Why use refresh tokens?', a: 'Access tokens should be short-lived to limit damage if stolen. A long-lived refresh token (stored more securely, e.g., httpOnly cookie on /auth path) is exchanged for new access tokens. This keeps sessions alive without forcing re-login and allows server-side revocation via a token store.' }
      ],
      mcqs: [
        { question: 'A JWT has ___ parts.', options: ['2', '3', '4', '5'], answer: 1, explanation: 'header.payload.signature — three parts separated by dots.' },
        { question: 'JWTs are best stored in ___ to mitigate XSS token theft.', options: ['localStorage', 'sessionStorage', 'httpOnly cookies', 'IndexedDB'], answer: 2, explanation: 'httpOnly cookies are not readable by JS, reducing XSS risk.' },
        { question: 'jwt.sign\'s expiresIn accepts ___.', options: ['Number (sec) or duration string', 'Only ISO dates', 'Regex', 'None'], answer: 0, explanation: 'It takes seconds or a string like "1h", "7d".' },
        { question: 'Signature in JWT provides ___.', options: ['Encryption', 'Integrity and authenticity', 'Compression', 'Routing'], answer: 1, explanation: 'JWTs are signed but not encrypted — payload is readable but tamper-evident.' },
        { question: 'Refresh tokens exist primarily to ___.', options: ['Leak more data', 'Allow short-lived access tokens while keeping sessions', 'Bypass HTTPS', 'Store passwords'], answer: 1, explanation: 'They let you keep access tokens short-lived while UX stays smooth.' }
      ]
    },
    {
      id: 'ep-15',
      number: 15,
      season: 2,
      title: 'REST APIs & Express Router',
      topics: ['REST principles', 'HTTP methods and status codes', 'express.Router()', 'resource modeling', 'versioning'],
      interviewQuestions: [
        { q: 'What is REST?', a: 'REST (Representational State Transfer) is an architectural style for networked APIs using HTTP. Resources have URLs; standard HTTP verbs (GET, POST, PUT, PATCH, DELETE) map to operations; responses include appropriate status codes; stateless interactions.' },
        { q: 'What does express.Router do?', a: 'express.Router() creates a mountable, modular route handler — essentially a mini Express app. You define routes and middleware on it, then mount with app.use("/api/users", usersRouter). Great for splitting code by resource.' },
        { q: 'How do HTTP status codes categorize responses?', a: '1xx informational, 2xx success (200 OK, 201 Created, 204 No Content), 3xx redirection (301, 302, 304), 4xx client error (400 Bad Request, 401, 403, 404, 409, 422), 5xx server error (500, 502, 503). Choose precise codes.' },
        { q: 'PUT vs PATCH?', a: 'PUT replaces the entire resource at the URL with the request body (idempotent full update). PATCH applies a partial update (idempotence not guaranteed by spec but usually designed to be idempotent). Use PATCH when sending only changed fields.' },
        { q: 'How do you version a REST API?', a: 'Common approaches: URL path (e.g., /api/v1/users), custom header (Accept-Version), or media type (Accept: application/vnd.app.v1+json). URL versioning is simplest and most discoverable; header versioning is cleaner but less visible.' }
      ],
      mcqs: [
        { question: 'Creating a new resource should return ___.', options: ['200', '201', '204', '404'], answer: 1, explanation: '201 Created is the correct response for successful resource creation.' },
        { question: 'express.Router() gives you ___.', options: ['A database client', 'A modular route handler', 'A logger', 'A template engine'], answer: 1, explanation: 'Routers are mountable mini-apps for composing routes.' },
        { question: 'Idempotent method among these is ___.', options: ['POST', 'PATCH', 'PUT', 'CONNECT'], answer: 2, explanation: 'PUT is idempotent by HTTP spec (repeating has the same effect).' },
        { question: '404 means ___.', options: ['Server error', 'Not Found', 'Unauthorized', 'Conflict'], answer: 1, explanation: '404 indicates the resource does not exist at that URL.' },
        { question: 'Common URL-based versioning pattern is ___.', options: ['/api/v1/users', '/users?v=1', '/users#v1', '/users_v1'], answer: 0, explanation: 'Path segments like /api/v1 are the most common pattern.' }
      ]
    },
    {
      id: 'ep-16',
      number: 16,
      season: 2,
      title: 'Mongoose Relationships & Populate',
      topics: ['references with ObjectId ref', '.populate()', 'embedded vs referenced', 'one-to-many', 'many-to-many'],
      interviewQuestions: [
        { q: 'Embedded vs referenced documents — when to use each?', a: 'Embed when child data is tightly bound to the parent, read together, and small/bounded (e.g., address on user). Reference when data is shared across documents, unbounded in size, or updated independently (e.g., posts per user). Consider query patterns and write amplification.' },
        { q: 'How do you define a reference in Mongoose?', a: 'Use a field with type Schema.Types.ObjectId and a ref to the target model: author: { type: Schema.Types.ObjectId, ref: "User" }. Store the related document\'s _id.' },
        { q: 'What does .populate() do?', a: '.populate() fetches referenced documents and replaces the ObjectId (or array of IDs) with the actual document(s). It runs a second query — you can filter, select, and nested-populate. Not a true SQL join; use aggregation $lookup for server-side joins.' },
        { q: 'How do you model many-to-many in Mongoose?', a: 'Either store arrays of ObjectIds on both sides (Users have [Groups], Groups have [Users]) — simple but dual-write risk — or create a join collection (Membership { userId, groupId, joinedAt, role }). Join collection scales better for metadata and large sets.' },
        { q: 'What are performance pitfalls of populate?', a: 'It issues extra queries (N+1 on lists if done in loops). For large lists, batch populate at the top level (Mongoose does batch by default when called on a query). For heavy joins consider $lookup aggregation or denormalization.' }
      ],
      mcqs: [
        { question: 'A reference field type in Mongoose is ___.', options: ['String', 'Schema.Types.ObjectId', 'Number', 'Mixed'], answer: 1, explanation: 'Use ObjectId with a ref to another model.' },
        { question: '.populate() replaces ___.', options: ['Strings with numbers', 'ObjectId(s) with referenced docs', 'Documents with IDs', 'Queries with results'], answer: 1, explanation: 'It fetches and substitutes the referenced documents.' },
        { question: 'Embedding is a good fit when ___.', options: ['Data is shared across many docs', 'Child data is bounded and always read with parent', 'Unlimited child growth', 'You need independent updates'], answer: 1, explanation: 'Tightly-bound, bounded children are ideal for embedding.' },
        { question: 'Server-side join alternative to populate is ___.', options: ['$lookup aggregation', '$join operator', '$ref pipeline', 'JOIN ON'], answer: 0, explanation: 'MongoDB aggregation\'s $lookup performs joins server-side.' },
        { question: 'N+1 queries from populate can be mitigated by ___.', options: ['Looping harder', 'Batching / top-level populate / $lookup', 'Ignoring it', 'Client-side joins only'], answer: 1, explanation: 'Populate at the query level batches; aggregation avoids round trips.' }
      ]
    },
    {
      id: 'ep-17',
      number: 17,
      season: 3,
      title: 'AWS EC2 & Deployment',
      topics: ['EC2 basics', 'SSH access', 'PM2 process manager', 'deploying Node in production', 'security groups'],
      interviewQuestions: [
        { q: 'What is AWS EC2?', a: 'Amazon Elastic Compute Cloud provides resizable virtual machines in the cloud. You pick an AMI (image), instance type (size), storage, and networking (VPC, subnet, security group), then SSH in and run your apps. Pay-as-you-go by second/hour.' },
        { q: 'How do you SSH into an EC2 instance?', a: 'Download the .pem key when creating the instance, restrict its permissions (chmod 400 key.pem on Unix), then ssh -i key.pem ec2-user@<public-ip>. The default user depends on the AMI (ubuntu for Ubuntu AMIs, ec2-user for Amazon Linux).' },
        { q: 'Why use PM2 in production?', a: 'PM2 is a production process manager for Node. It keeps your app running, restarts on crashes, clusters across CPU cores, handles zero-downtime reloads, and provides logs and monitoring. Commands: pm2 start app.js, pm2 list, pm2 logs, pm2 save, pm2 startup.' },
        { q: 'What are security groups?', a: 'Virtual firewalls for EC2 instances controlling inbound/outbound traffic by protocol, port, and source. Typical web server: allow 22 (SSH) from your IP only, 80 and 443 from anywhere. Never expose DB ports publicly.' },
        { q: 'What deployment steps are typical for Node on EC2?', a: '1) Provision EC2, open needed ports. 2) SSH in, install Node via nvm or package manager. 3) Clone repo, npm ci, set env vars. 4) Start with PM2, set up pm2 startup and save. 5) Put Nginx in front for TLS and static files. 6) Add monitoring and backups.' }
      ],
      mcqs: [
        { question: 'EC2 stands for ___.', options: ['Elastic Compute Cloud', 'Extended Container Cluster', 'Easy Cloud Compute', 'Encrypted Compute Cloud'], answer: 0, explanation: 'Elastic Compute Cloud — AWS\'s VM service.' },
        { question: 'PM2 is a ___.', options: ['Database', 'Node process manager', 'Logger only', 'Reverse proxy'], answer: 1, explanation: 'PM2 manages Node processes in production (restarts, cluster mode).' },
        { question: 'Security groups control ___.', options: ['Billing', 'Inbound/outbound network traffic', 'File permissions', 'DNS only'], answer: 1, explanation: 'They are stateful virtual firewalls for EC2.' },
        { question: 'SSH default user for Ubuntu AMI is ___.', options: ['root', 'admin', 'ubuntu', 'ec2-user'], answer: 2, explanation: 'Ubuntu AMIs use the ubuntu user; ec2-user is for Amazon Linux.' },
        { question: 'Which command saves the PM2 process list for restart?', options: ['pm2 save', 'pm2 dump', 'pm2 backup', 'pm2 store'], answer: 0, explanation: 'pm2 save persists the current list so pm2 resurrect/startup restores it.' }
      ]
    },
    {
      id: 'ep-18',
      number: 18,
      season: 3,
      title: 'Nginx as Reverse Proxy',
      topics: ['Nginx basics', 'reverse proxy config', 'TLS/HTTPS termination', 'load balancing', 'static file serving'],
      interviewQuestions: [
        { q: 'What is a reverse proxy?', a: 'A reverse proxy sits in front of your backend and forwards client requests to it, often adding TLS termination, caching, load balancing, compression, request routing, and security filtering. Clients see the proxy; backends are hidden.' },
        { q: 'Why put Nginx in front of Node?', a: 'Nginx handles TLS efficiently, serves static files fast, buffers slow clients, provides gzip/brotli, enforces rate limits, load-balances multiple Node instances, and restarts independently. Node focuses on application logic.' },
        { q: 'Minimal Nginx reverse proxy config?', a: 'server { listen 80; server_name example.com; location / { proxy_pass http://127.0.0.1:3000; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; } }' },
        { q: 'How does Nginx load-balance?', a: 'Use the upstream block: upstream app { server 10.0.0.1:3000; server 10.0.0.2:3000; } then proxy_pass http://app. Default is round-robin; other methods: least_conn, ip_hash, hash. Add health checks in Plus or external tooling.' },
        { q: 'How do you enable HTTPS with Let\'s Encrypt?', a: 'Install certbot (certbot --nginx), run certbot --nginx -d example.com. It obtains a certificate, edits your Nginx config to add listen 443 ssl with the cert paths, and sets up auto-renewal via a systemd timer or cron.' }
      ],
      mcqs: [
        { question: 'A reverse proxy is placed ___.', options: ['On the client', 'Between client and backend, client-facing', 'Inside the DB', 'Nowhere'], answer: 1, explanation: 'It receives client traffic and forwards to backend services.' },
        { question: 'Nginx directive to forward to Node is ___.', options: ['redirect', 'proxy_pass', 'forward', 'route'], answer: 1, explanation: 'proxy_pass http://host:port forwards requests to an upstream.' },
        { question: 'Default Nginx upstream LB algorithm is ___.', options: ['Random', 'Round-robin', 'Least conn', 'Hash'], answer: 1, explanation: 'Round-robin is the default; others are opt-in.' },
        { question: 'Let\'s Encrypt certs are typically obtained via ___.', options: ['certbot', 'openssl only', 'npm install', 'apt-get tls'], answer: 0, explanation: 'certbot automates ACME certificate issuance and renewal.' },
        { question: 'Which header preserves the original client IP behind a proxy?', options: ['X-Forwarded-For', 'X-Real-App', 'X-Client-Header', 'X-Origin'], answer: 0, explanation: 'X-Forwarded-For (or X-Real-IP) carries the client IP through the proxy.' }
      ]
    },
    {
      id: 'ep-19',
      number: 19,
      season: 3,
      title: 'WebSockets & Socket.io',
      topics: ['WebSocket protocol', 'socket.io library', 'rooms and namespaces', 'real-time events', 'scaling with Redis adapter'],
      interviewQuestions: [
        { q: 'What is a WebSocket?', a: 'WebSocket is a protocol (ws://, wss://) providing a full-duplex, persistent TCP connection between client and server after an HTTP upgrade handshake. Unlike HTTP polling, both sides can push messages at any time with very low overhead — ideal for real-time apps.' },
        { q: 'What is Socket.io?', a: 'Socket.io is a Node library that provides real-time bidirectional event-based communication. It uses WebSocket when possible and falls back to HTTP long-polling. Adds features like auto-reconnect, rooms, namespaces, acknowledgements, and broadcasting.' },
        { q: 'What are rooms and namespaces in Socket.io?', a: 'Namespaces partition the server into multiple endpoints (e.g., /chat, /admin). Rooms are arbitrary groupings within a namespace — a socket can join/leave rooms and you can broadcast only to a room. Great for channels, private chats, multiplayer games.' },
        { q: 'How do you scale Socket.io across multiple Node processes?', a: 'Use the Redis adapter (@socket.io/redis-adapter). It publishes events across all server instances via Redis Pub/Sub, so a broadcast from one server reaches clients connected to others. Also use sticky sessions at the load balancer because of the upgrade handshake.' },
        { q: 'How do you send an acknowledgement in Socket.io?', a: 'Pass a callback as the last argument: socket.emit("event", data, (ack) => { ... }). On the server side, the handler receives the same callback as the last arg and calls it with a response. This lets you confirm receipt or get a reply.' }
      ],
      mcqs: [
        { question: 'WebSocket connection starts via ___.', options: ['HTTP Upgrade handshake', 'UDP datagrams', 'gRPC', 'FTP'], answer: 0, explanation: 'The client sends an HTTP request with Upgrade: websocket to begin.' },
        { question: 'Which provides full-duplex communication?', options: ['HTTP/1.1 request only', 'WebSocket', 'Webhook', 'CORS'], answer: 1, explanation: 'WebSockets allow both sides to send anytime after handshake.' },
        { question: 'Scaling Socket.io across Node instances uses ___.', options: ['Shared filesystem', 'Redis adapter / pub-sub', 'LocalStorage', 'Random routing'], answer: 1, explanation: 'The Redis adapter propagates events among instances.' },
        { question: 'A Socket.io room is ___.', options: ['A namespace', 'An arbitrary group sockets can join', 'A separate port', 'A database table'], answer: 1, explanation: 'Rooms let you scope broadcasts to a group of sockets.' },
        { question: 'Socket.io falls back to ___ when WebSocket is unavailable.', options: ['gRPC', 'Long polling', 'FTP', 'SSH'], answer: 1, explanation: 'HTTP long polling is the fallback transport.' }
      ]
    },
    {
      id: 'ep-20',
      number: 20,
      season: 3,
      title: 'Cron Jobs & Background Tasks',
      topics: ['node-cron', 'cron expressions', 'scheduled tasks', 'worker threads', 'queues (BullMQ)'],
      interviewQuestions: [
        { q: 'What is a cron job?', a: 'A cron job is a scheduled task that runs at specific times or intervals based on a cron expression (minute hour day-of-month month day-of-week). In Node, libraries like node-cron let you schedule functions using those expressions without the OS cron.' },
        { q: 'How do you schedule a task with node-cron?', a: 'const cron = require("node-cron"); cron.schedule("0 * * * *", () => { /* runs every hour */ }, { timezone: "Asia/Kolkata" }). The first argument is the cron expression, the second the callback, and options allow timezone and scheduled flag.' },
        { q: 'When should you use a queue like BullMQ instead of cron?', a: 'When tasks are event-triggered, need retries, backoff, concurrency control, rate limiting, persistence, or distribution across workers. BullMQ (Redis-backed) handles these patterns. Cron is for time-based schedules; queues are for job orchestration.' },
        { q: 'What are worker_threads good for?', a: 'CPU-bound JavaScript work that would block the main event loop. Each worker has its own V8 instance and event loop. Examples: image processing, heavy parsing, cryptographic computations, compression. Communicate via messages or SharedArrayBuffer.' },
        { q: 'How do you keep scheduled tasks reliable across restarts?', a: 'Externalize state: persist schedules and job state in a DB or Redis (BullMQ does this). Use a process manager (PM2) or supervisor to restart on crash. For multi-instance deployments, use a queue or an external scheduler to avoid duplicate runs.' }
      ],
      mcqs: [
        { question: 'A cron expression has ___ fields (standard).', options: ['3', '5', '6', '8'], answer: 1, explanation: 'Classic cron: minute hour day month day-of-week — 5 fields.' },
        { question: 'node-cron schedules using ___.', options: ['SQL', 'Cron expression', 'CRON URL', 'ISO date only'], answer: 1, explanation: 'You pass a standard cron expression string.' },
        { question: 'CPU-heavy tasks in Node should go to ___.', options: ['Main thread loop', 'worker_threads or external workers', 'setImmediate', 'process.nextTick'], answer: 1, explanation: 'Workers prevent blocking the main event loop.' },
        { question: 'BullMQ uses ___ as backend.', options: ['MongoDB', 'Redis', 'MySQL', 'Filesystem'], answer: 1, explanation: 'BullMQ stores queues and state in Redis.' },
        { question: 'To run a job at 9:30 AM daily use ___.', options: ['"30 9 * * *"', '"9 30 * * *"', '"* * 9 30 *"', '"0 9 30 * *"'], answer: 0, explanation: 'Format is minute hour day month dow, so 30 9 * * *.' }
      ]
    },
    {
      id: 'ep-21',
      number: 21,
      season: 3,
      title: 'Payment Gateway',
      topics: ['Razorpay integration', 'order creation', 'payment flow', 'webhook verification', 'signature validation'],
      interviewQuestions: [
        { q: 'What is the typical Razorpay payment flow?', a: '1) Server creates an order via Razorpay API with amount, currency, receipt, and gets an order_id. 2) Server sends order_id + key_id to the client. 3) Client opens Razorpay Checkout; user pays. 4) On success, client receives payment_id, order_id, signature. 5) Server verifies signature and updates DB.' },
        { q: 'Why create the order on the server, not the client?', a: 'The amount and currency must be authoritative and tamper-proof. A client-supplied amount could be manipulated. Server-side order creation uses secret credentials and binds the amount to the order_id that the checkout validates.' },
        { q: 'How do you verify a Razorpay payment signature?', a: 'Compute HMAC-SHA256 of `${order_id}|${payment_id}` using your KEY_SECRET and compare (constant-time) with razorpay_signature returned by the client. Only if they match should you mark the payment successful.' },
        { q: 'What are webhooks and why use them?', a: 'Webhooks are server-to-server HTTP callbacks from Razorpay when events happen (payment.captured, refund.processed). They provide a reliable out-of-band source of truth independent of the browser — useful if the client closes before confirming. Verify the X-Razorpay-Signature header.' },
        { q: 'How do you handle idempotency in payment endpoints?', a: 'Use unique receipts/order IDs; store an idempotency key on mutations; check if an order/payment was already processed before reapplying changes; keep webhook handlers idempotent since events can be retried.' }
      ],
      mcqs: [
        { question: 'Razorpay order creation happens on the ___.', options: ['Client', 'Server', 'Browser console', 'Mobile only'], answer: 1, explanation: 'Orders must be created server-side with secret credentials.' },
        { question: 'Signature verification uses which algorithm?', options: ['MD5', 'HMAC-SHA256', 'SHA-1', 'bcrypt'], answer: 1, explanation: 'Razorpay uses HMAC-SHA256 with your key secret.' },
        { question: 'The correct payload for signature is ___.', options: ['payment_id|order_id', 'order_id|payment_id', 'amount|order_id', 'currency|payment_id'], answer: 1, explanation: 'HMAC input is `${order_id}|${payment_id}`.' },
        { question: 'Webhooks provide ___.', options: ['Frontend UI', 'Reliable server-to-server event notifications', 'Push notifications only', 'Emails'], answer: 1, explanation: 'They are out-of-band callbacks Razorpay sends to your server.' },
        { question: 'String comparison of signatures should be ___.', options: ['==', 'Constant-time', 'Regex', 'Random'], answer: 1, explanation: 'Use crypto.timingSafeEqual to avoid timing attacks.' }
      ]
    },
    {
      id: 'ep-22',
      number: 22,
      season: 3,
      title: 'Production Best Practices',
      topics: ['dotenv configuration', 'structured logging', 'rate limiting', 'CORS', 'graceful shutdown'],
      interviewQuestions: [
        { q: 'How do you manage configuration in production?', a: 'Never commit secrets. Use environment variables, loaded in dev via dotenv (.env files excluded from git). In production, inject env vars via the platform (systemd, Docker env, k8s secrets, AWS SSM/Secrets Manager). Validate required vars at startup.' },
        { q: 'What makes logging production-ready?', a: 'Structured (JSON) logs with levels (debug/info/warn/error), correlation/request IDs, timestamps, no secrets, and aggregated centrally (CloudWatch, Datadog, ELK). Libraries like pino or winston are common. Avoid console.log in hot paths — it is slow.' },
        { q: 'Why and how implement rate limiting?', a: 'Prevents abuse, brute force, scraping, and protects resources. In Express, express-rate-limit provides basic IP/time-based limits; for distributed use, back it with Redis (rate-limiter-flexible or express-rate-limit with RedisStore) so counts are shared across instances.' },
        { q: 'What is CORS and how do you configure it safely?', a: 'Cross-Origin Resource Sharing lets browsers call APIs on another origin. Use the cors middleware with an explicit origin whitelist rather than *. For credentials (cookies), origin must be explicit and credentials: true set. Preflight (OPTIONS) is handled automatically by the middleware.' },
        { q: 'What is graceful shutdown in Node?', a: 'Listen for SIGTERM/SIGINT, stop accepting new connections (server.close), finish in-flight requests, close DB and cache connections, then exit. This avoids dropped requests during deploys. Pair with short keep-alive timeouts and readiness probes.' }
      ],
      mcqs: [
        { question: 'Secrets in production should live in ___.', options: ['Committed .env', 'Code constants', 'Env vars / secret manager', 'Public README'], answer: 2, explanation: 'Use environment variables or a secret manager; never commit secrets.' },
        { question: 'Rate limiting across multiple Node instances needs ___.', options: ['In-memory counts only', 'A shared store like Redis', 'Nothing', 'A file'], answer: 1, explanation: 'In-memory counts are per-instance; use Redis for shared limits.' },
        { question: 'Structured logs are typically in ___.', options: ['Plain free text', 'JSON format', 'Images', 'SQL'], answer: 1, explanation: 'JSON is machine-parseable by log aggregators.' },
        { question: 'CORS with credentials requires origin to be ___.', options: ['*', 'An explicit value', 'Empty', 'Regex only'], answer: 1, explanation: 'Browsers reject credentialed requests when origin is * — must be specific.' },
        { question: 'Graceful shutdown is triggered on ___.', options: ['SIGKILL', 'SIGTERM/SIGINT', 'EXIT event only', 'CRASH'], answer: 1, explanation: 'Handle SIGTERM/SIGINT to drain connections before exit.' }
      ]
    }
  ]
}
