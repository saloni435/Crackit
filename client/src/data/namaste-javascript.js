export default {
  id: 'namaste-javascript',
  title: 'Namaste JavaScript',
  icon: '🟨',
  color: '#F7DF1E',
  episodes: [
    {
      id: 'ep-01',
      number: 1,
      season: 1,
      title: 'How JavaScript Works & Execution Context',
      videoUrl: 'https://www.youtube.com/watch?v=pN6jk0uUrD8',
      videoUrl: 'https://www.youtube.com/watch?v=pN6jk0uUrD8',
      topics: ['execution context', 'call stack', 'global EC', 'memory creation phase', 'code execution phase'],
      interviewQuestions: [
        { q: 'What is an execution context in JavaScript?', a: 'An execution context is the environment in which JavaScript code is evaluated and executed. It contains two components: memory (variable environment) where variables and functions are stored, and code (thread of execution) where code is executed line by line.' },
        { q: 'What are the two phases of JavaScript code execution?', a: 'Phase 1 is the Memory Creation Phase where JS allocates memory for variables (as undefined) and functions (full function code). Phase 2 is the Code Execution Phase where the code runs line by line, values are assigned, and functions are invoked creating new execution contexts.' },
        { q: 'Is JavaScript a synchronous or asynchronous language?', a: 'JavaScript is a synchronous single-threaded language by default. It executes one command at a time in a specific order on a single call stack. Asynchronous behavior is achieved via Web APIs, callbacks, promises, and the event loop, not by the language itself.' },
        { q: 'What is the Global Execution Context?', a: 'The Global Execution Context (GEC) is the first execution context created when a JS program starts. It creates a global object (window in browsers) and binds `this` to it. All code not inside a function runs in the GEC.' },
        { q: 'What happens to the execution context when a function returns?', a: 'When a function finishes executing, its execution context is popped off the call stack and destroyed. Control returns to the calling execution context, which resumes execution from where it left off.' }
      ],
      mcqs: [
        { question: 'How many phases does an execution context go through?', options: ['1', '2', '3', '4'], answer: 1, explanation: 'Two phases: Memory Creation Phase (allocates memory for variables/functions) and Code Execution Phase (executes code line by line).' },
        { question: 'What gets stored in memory for a function during the Memory Creation Phase?', options: ['undefined', 'null', 'The entire function code', 'A reference pointer'], answer: 2, explanation: 'Functions are hoisted fully — the whole function body is stored in memory during the creation phase, unlike variables which are stored as undefined.' },
        { question: 'Which object is created along with the Global Execution Context in a browser?', options: ['document', 'window', 'console', 'global'], answer: 1, explanation: 'In browsers, the window object is the global object created with the GEC. In Node.js it would be global.' },
        { question: 'JavaScript is a ___-threaded language.', options: ['multi', 'single', 'zero', 'dual'], answer: 1, explanation: 'JavaScript is single-threaded, meaning it has one call stack and executes one operation at a time.' },
        { question: 'What does `this` refer to in the Global Execution Context in a browser?', options: ['null', 'undefined', 'window', 'document'], answer: 2, explanation: 'At the global level in a browser, `this` points to the window object.' }
      ]
    },
    {
      id: 'ep-02',
      number: 2,
      season: 1,
      title: 'How JavaScript Code is Executed & Call Stack',
      videoUrl: 'https://www.youtube.com/watch?v=iLWTnMzWtj4',
      topics: ['call stack mechanics', 'LIFO', 'stack overflow', 'execution phases'],
      interviewQuestions: [
        { q: 'What is the call stack?', a: 'The call stack is a LIFO (Last In First Out) data structure used by JavaScript to keep track of function execution contexts. When a function is called, a new execution context is pushed onto the stack; when it returns, the context is popped off.' },
        { q: 'What is stack overflow in JavaScript?', a: 'Stack overflow occurs when the call stack exceeds its maximum size, typically due to unbounded recursion. The JS engine throws a RangeError: Maximum call stack size exceeded.' },
        { q: 'What other names does the call stack have?', a: 'The call stack is also called Execution Context Stack, Program Stack, Control Stack, Runtime Stack, and Machine Stack — all referring to the same concept.' },
        { q: 'What happens at the bottom of the call stack?', a: 'The Global Execution Context sits at the bottom of the call stack. It is the first thing pushed when the program starts and the last thing popped when the program ends.' },
        { q: 'How does the call stack manage nested function calls?', a: 'Each nested function call creates a new execution context pushed on top of the stack. Execution pauses in the caller until the callee completes and its context is popped, then the caller resumes.' }
      ],
      mcqs: [
        { question: 'Which data structure does the call stack follow?', options: ['FIFO', 'LIFO', 'Priority Queue', 'Circular Queue'], answer: 1, explanation: 'The call stack is LIFO — the last function pushed is the first to be popped off.' },
        { question: 'What error occurs on infinite recursion?', options: ['TypeError', 'ReferenceError', 'RangeError (stack overflow)', 'SyntaxError'], answer: 2, explanation: 'Infinite recursion fills the call stack beyond its limit, throwing RangeError: Maximum call stack size exceeded.' },
        { question: 'What is pushed onto the call stack first?', options: ['main() function', 'Global Execution Context', 'window object', 'document'], answer: 1, explanation: 'The Global Execution Context is always pushed first and sits at the bottom of the stack.' },
        { question: 'When a function returns, what happens to its execution context?', options: ['It stays on the stack', 'It is popped off and destroyed', 'It moves to the heap', 'It is cached'], answer: 1, explanation: 'The execution context is popped off the call stack and removed from memory when the function returns.' },
        { question: 'Which of these is NOT another name for the call stack?', options: ['Execution Context Stack', 'Program Stack', 'Heap Stack', 'Runtime Stack'], answer: 2, explanation: 'Heap Stack is not a real term. The heap is a different memory region for objects; it is not a stack.' }
      ]
    },
    {
      id: 'ep-03',
      number: 3,
      season: 1,
      title: 'Hoisting in JavaScript',
      videoUrl: 'https://www.youtube.com/watch?v=Fnlnw8uY6jo',
      topics: ['variable hoisting', 'function hoisting', 'var vs let/const hoisting behavior'],
      interviewQuestions: [
        { q: 'What is hoisting in JavaScript?', a: 'Hoisting is JavaScript\'s default behavior of moving declarations to the top of their scope during the memory creation phase. Variables declared with var are initialized to undefined, functions are fully hoisted, and let/const are hoisted but not initialized (temporal dead zone).' },
        { q: 'How are function declarations hoisted differently from function expressions?', a: 'Function declarations are fully hoisted — the entire function is available before its definition line. Function expressions (especially anonymous ones) assigned to variables behave like variables: only the variable declaration is hoisted, not the function value, so calling them before assignment gives undefined or TypeError.' },
        { q: 'What is the difference between "undefined" and "not defined"?', a: '"undefined" means the variable has been declared (memory allocated) but not yet assigned a value. "not defined" (ReferenceError) means the variable has never been declared at all.' },
        { q: 'Why can we call a function declared below its invocation?', a: 'During the memory creation phase, the entire function body is stored in memory under its identifier. When execution reaches the invocation line, the function is already available in memory, so it can be called.' },
        { q: 'Are let and const hoisted?', a: 'Yes, let and const are hoisted but placed in the Temporal Dead Zone. They are not initialized until their declaration line executes. Accessing them before that throws a ReferenceError.' }
      ],
      mcqs: [
        { question: 'What is the value of a var-declared variable before its assignment line?', options: ['null', 'undefined', 'ReferenceError', '0'], answer: 1, explanation: 'var declarations are hoisted and initialized to undefined during the memory creation phase.' },
        { question: 'console.log(x); var x = 5; — what does this print?', options: ['5', 'undefined', 'ReferenceError', 'null'], answer: 1, explanation: 'var x is hoisted and initialized to undefined before the console.log runs.' },
        { question: 'console.log(y); let y = 5; — what does this print?', options: ['5', 'undefined', 'ReferenceError', 'null'], answer: 2, explanation: 'let is hoisted but in the Temporal Dead Zone; accessing before declaration throws ReferenceError.' },
        { question: 'Which is fully hoisted with its body?', options: ['Arrow function assigned to let', 'Function declaration', 'Function expression', 'Class'], answer: 1, explanation: 'Only function declarations (function foo(){}) are fully hoisted with their body.' },
        { question: 'If a variable is never declared and you try to read it, what happens?', options: ['It returns undefined', 'It returns null', 'ReferenceError: not defined', 'It auto-declares as undefined'], answer: 2, explanation: 'Reading a never-declared variable throws ReferenceError: variable is not defined.' }
      ]
    },
    {
      id: 'ep-04',
      number: 4,
      season: 1,
      title: 'How Functions Work & Variable Environment',
      videoUrl: 'https://www.youtube.com/watch?v=gSDncyy32DA',
      topics: ['function EC', 'local memory', 'arguments', 'return values'],
      interviewQuestions: [
        { q: 'What happens when a function is invoked?', a: 'A new Function Execution Context is created and pushed onto the call stack. It has its own memory (variable environment) where parameters and local variables live, independent of the calling context. After execution, the context is popped and control returns to the caller with any return value.' },
        { q: 'What is a variable environment?', a: 'A variable environment is the memory component of an execution context. It holds all the identifiers (variables, function parameters, functions) declared in that scope along with their values.' },
        { q: 'Why can two functions have variables with the same name?', a: 'Each function invocation creates its own independent execution context with its own variable environment. Variables are scoped to that context, so the same name in different contexts refers to different memory locations.' },
        { q: 'What is the arguments object?', a: 'In non-arrow functions, arguments is an array-like object that holds all arguments passed to the function. It allows accessing all arguments even if parameters were not explicitly named. Arrow functions do not have their own arguments.' },
        { q: 'What does the return statement do to the execution context?', a: 'The return statement exits the function, producing the given value (or undefined) for the caller. The function\'s execution context is popped off the call stack and its local memory is eligible for garbage collection.' }
      ],
      mcqs: [
        { question: 'Each function invocation creates a new ___.', options: ['Global context', 'Execution context', 'Thread', 'Process'], answer: 1, explanation: 'Every function call creates its own execution context with its own variable environment.' },
        { question: 'Where do function parameters live?', options: ['Global memory', 'Function\'s local variable environment', 'Heap', 'Call stack frame header only'], answer: 1, explanation: 'Parameters are stored in the function\'s local variable environment, inside its execution context.' },
        { question: 'What does a function return if there is no return statement?', options: ['null', 'undefined', '0', 'empty string'], answer: 1, explanation: 'Functions without an explicit return return undefined by default.' },
        { question: 'Can two different functions both declare a variable `x`?', options: ['Yes, they are scoped independently', 'No, identifier must be unique', 'Only with var', 'Only if they are in different files'], answer: 0, explanation: 'Each function has its own variable environment, so identifier names do not collide across functions.' },
        { question: 'What happens to a function\'s local variables after it returns?', options: ['They stay forever', 'They become global', 'They become eligible for garbage collection (unless captured by a closure)', 'They remain in the call stack'], answer: 2, explanation: 'Once the execution context is popped, local variables are eligible for GC unless still referenced (e.g., via a closure).' }
      ]
    },
    {
      id: 'ep-05',
      number: 5,
      season: 1,
      title: 'SHORTEST JS Program – window & this',
      videoUrl: 'https://www.youtube.com/watch?v=QCRpVw2KXf8',
      topics: ['global object', 'window object', 'this keyword at global scope'],
      interviewQuestions: [
        { q: 'What is the shortest JavaScript program?', a: 'An empty file. Even with no code, the JS engine creates the Global Execution Context, the global object (window in browser), and sets up `this` to point to the global object.' },
        { q: 'What is the relationship between `this` and `window` at global scope?', a: 'At global scope in a browser, `this === window` is true. Both refer to the same global object. Variables declared with var at global scope also attach to the window object.' },
        { q: 'Does let or const attach variables to window?', a: 'No. Only var declarations and function declarations at global scope attach to the window object. let and const create global bindings in a separate script scope record, so window.x is undefined for let/const declared x.' },
        { q: 'What is the global object in Node.js?', a: 'In Node.js, the global object is called `global` (and `globalThis` is a standardized cross-environment alias). It serves the same role as window in browsers but has different built-ins (no DOM, but has process, Buffer, etc.).' },
        { q: 'What is globalThis?', a: 'globalThis is a standardized property that provides a consistent way to access the global object across environments — window in browsers, global in Node, self in Web Workers.' }
      ],
      mcqs: [
        { question: 'At global scope in a browser, `this` equals ___.', options: ['undefined', 'null', 'window', '{}'], answer: 2, explanation: 'In a browser at global scope, `this` refers to the window object.' },
        { question: 'var a = 10 at global scope: is window.a === 10?', options: ['Yes', 'No', 'Only in strict mode', 'Depends on bundler'], answer: 0, explanation: 'Global var declarations attach to the window object in browsers.' },
        { question: 'let b = 10 at global scope: window.b is?', options: ['10', 'undefined', 'ReferenceError', 'null'], answer: 1, explanation: 'let/const do not attach to window; they live in a separate script scope record.' },
        { question: 'What is the global object in Node.js?', options: ['window', 'self', 'global', 'process'], answer: 2, explanation: 'Node.js uses `global` as its global object.' },
        { question: 'Which works across all JS environments?', options: ['window', 'global', 'self', 'globalThis'], answer: 3, explanation: 'globalThis is the ECMAScript-standardized way to access the global object in any environment.' }
      ]
    },
    {
      id: 'ep-06',
      number: 6,
      season: 1,
      title: 'undefined vs not defined',
      videoUrl: 'https://www.youtube.com/watch?v=B7iF6G3EyIk',
      topics: ['undefined type', 'ReferenceError', 'temporal dead zone preview'],
      interviewQuestions: [
        { q: 'What is undefined in JavaScript?', a: 'undefined is a primitive value and a type in JavaScript. It is the default value automatically assigned to variables declared with var during the memory creation phase, and to function parameters that are not passed.' },
        { q: 'Is undefined the same as not defined?', a: 'No. undefined means the variable exists in memory but has no assigned value. Not defined means the variable has never been declared and accessing it throws a ReferenceError.' },
        { q: 'Should you manually assign undefined to a variable?', a: 'Generally no. Manually assigning undefined is discouraged because it makes debugging harder — you cannot tell whether undefined was the default or intentionally set. Use null for intentional absence of value.' },
        { q: 'Is JavaScript loosely typed or strongly typed?', a: 'JavaScript is loosely (weakly) typed and dynamically typed. Variables are not bound to any type and can be reassigned to values of different types at runtime.' },
        { q: 'What is the typeof undefined?', a: 'typeof undefined returns the string "undefined". Interestingly, typeof of an undeclared variable also returns "undefined" (one of the few safe ways to check without throwing ReferenceError).' }
      ],
      mcqs: [
        { question: 'typeof undefined returns?', options: ['"null"', '"undefined"', '"object"', '"void"'], answer: 1, explanation: 'typeof undefined is the string "undefined".' },
        { question: 'var x; console.log(x); prints?', options: ['null', 'undefined', 'ReferenceError', '""'], answer: 1, explanation: 'Uninitialized var variables default to undefined.' },
        { question: 'console.log(foo); where foo is never declared, throws?', options: ['nothing, prints undefined', 'TypeError', 'ReferenceError: foo is not defined', 'SyntaxError'], answer: 2, explanation: 'Accessing a never-declared variable throws ReferenceError: foo is not defined.' },
        { question: 'What is the recommended value for intentional "no value"?', options: ['undefined', 'null', '0', 'false'], answer: 1, explanation: 'null is used to signal intentional absence of value; undefined is JS\'s default unassigned value.' },
        { question: 'JavaScript is ___ typed.', options: ['Strongly and statically', 'Loosely and dynamically', 'Strongly and dynamically', 'Loosely and statically'], answer: 1, explanation: 'JS is loosely (weakly) typed and dynamically typed — variable types can change at runtime.' }
      ]
    },
    {
      id: 'ep-07',
      number: 7,
      season: 1,
      title: 'The Scope Chain, Scope & Lexical Environment',
      videoUrl: 'https://www.youtube.com/watch?v=uH-tVicherZA',
      topics: ['lexical environment', 'scope chain', 'outer reference'],
      interviewQuestions: [
        { q: 'What is lexical environment?', a: 'A lexical environment is the local memory of a function along with a reference to the lexical environment of its parent (the environment in which it was physically written). It is created whenever an execution context is created.' },
        { q: 'What is the scope chain?', a: 'The scope chain is the chain of lexical environments that JavaScript traverses to resolve variable references. When a variable is not found locally, JS looks in the outer (parent) lexical environment, then its parent, and so on until it reaches the global scope or throws ReferenceError.' },
        { q: 'What does "lexical" mean in lexical scoping?', a: '"Lexical" refers to the physical placement of code in the source text. Scope is determined by where functions and blocks are written, not where they are called from. A nested function has access to the variables of the enclosing function because of where it was defined.' },
        { q: 'How does JavaScript resolve a variable not found in the local scope?', a: 'JS walks up the scope chain via the outer lexical environment reference. It keeps going up until it finds the variable or reaches the global scope. If still not found, it throws ReferenceError.' },
        { q: 'Is scope chain static or dynamic?', a: 'Lexical scope chain is static — determined at author/parse time by where code is written. It does not change based on how or from where the function is called at runtime.' }
      ],
      mcqs: [
        { question: 'Lexical scope is determined by ___.', options: ['Where code is called from', 'Where code is written', 'Runtime conditions', 'The call stack'], answer: 1, explanation: 'Lexical scoping is based on the physical (lexical) location in the source code.' },
        { question: 'The scope chain ends at ___.', options: ['The current function', 'The module scope', 'The global lexical environment (which points to null)', 'The event loop'], answer: 2, explanation: 'The global lexical environment has null as its outer reference; that ends the scope chain.' },
        { question: 'If a variable is not found anywhere in the scope chain, JS throws?', options: ['TypeError', 'ReferenceError', 'SyntaxError', 'RangeError'], answer: 1, explanation: 'ReferenceError is thrown when an identifier cannot be resolved.' },
        { question: 'A function can access variables from ___.', options: ['Only its own scope', 'Its own and any outer lexical scopes', 'Only the global scope', 'Any scope in the program'], answer: 1, explanation: 'Functions access their own scope plus any enclosing lexical scopes via the scope chain.' },
        { question: 'What is stored alongside local memory in a lexical environment?', options: ['Call stack pointer', 'Reference to outer lexical environment', 'Heap pointer', 'Event loop reference'], answer: 1, explanation: 'A lexical environment = local memory + outer lexical environment reference.' }
      ]
    },
    {
      id: 'ep-08',
      number: 8,
      season: 1,
      title: 'let & const – Temporal Dead Zone',
      videoUrl: 'https://www.youtube.com/watch?v=BNC6slYCj50',
      topics: ['TDZ', 'block scope', 'let vs var', 'const immutability'],
      interviewQuestions: [
        { q: 'What is the Temporal Dead Zone (TDZ)?', a: 'The TDZ is the period between entering scope and the actual declaration line for let/const variables. During this time the variable is hoisted but uninitialized; accessing it throws ReferenceError. The TDZ ends at the line where the variable is initialized.' },
        { q: 'What is the difference between var, let, and const?', a: 'var is function-scoped, hoisted and initialized to undefined, can be redeclared. let is block-scoped, hoisted but in TDZ until assigned, cannot be redeclared in same scope. const is block-scoped, in TDZ, cannot be redeclared or reassigned, but object/array contents can still be mutated.' },
        { q: 'Can const variables be mutated?', a: 'The binding cannot be reassigned (const x = 5; x = 6; throws TypeError). However, if the value is an object or array, its properties or elements can still be mutated (const a = []; a.push(1) works).' },
        { q: 'Why does SyntaxError occur on `let a; let a;`?', a: 'let (and const) do not allow redeclaration in the same scope. Redeclaring produces a SyntaxError ("Identifier already declared") caught during parsing, before any code runs.' },
        { q: 'Can you declare a const without initialization?', a: 'No. const x; without an initial value throws SyntaxError: Missing initializer in const declaration. You must assign at declaration time.' }
      ],
      mcqs: [
        { question: 'Accessing a let variable in its TDZ throws?', options: ['TypeError', 'ReferenceError', 'SyntaxError', 'undefined'], answer: 1, explanation: 'TDZ access throws ReferenceError — the variable exists but is uninitialized.' },
        { question: 'Which is block-scoped?', options: ['var', 'let and const', 'function', 'All of them'], answer: 1, explanation: 'let and const are block-scoped; var is function-scoped.' },
        { question: 'const arr = [1,2]; arr.push(3); — what happens?', options: ['TypeError', 'Works, arr is [1,2,3]', 'ReferenceError', 'SyntaxError'], answer: 1, explanation: 'const freezes the binding, not the value. Object/array mutation is allowed.' },
        { question: 'let x = 1; let x = 2; — what happens?', options: ['x becomes 2', 'TypeError', 'SyntaxError', 'Works in strict mode only'], answer: 2, explanation: 'Redeclaring let in the same scope is a SyntaxError caught at parse time.' },
        { question: 'const without initializer is?', options: ['Allowed, value is undefined', 'SyntaxError', 'TypeError', 'Allowed only at global scope'], answer: 1, explanation: 'const requires initialization at declaration — omitting it throws SyntaxError.' }
      ]
    },
    {
      id: 'ep-09',
      number: 9,
      season: 1,
      title: 'BLOCK SCOPE & Shadowing',
      videoUrl: 'https://www.youtube.com/watch?v=lW_erSjyMak',
      topics: ['block scope', 'variable shadowing', 'let/const in blocks'],
      interviewQuestions: [
        { q: 'What is a block in JavaScript?', a: 'A block is code grouped inside curly braces {}. Blocks allow writing multiple statements where one is expected (e.g., if bodies, loop bodies). let and const declared inside a block are scoped to that block only.' },
        { q: 'What is variable shadowing?', a: 'Variable shadowing is when a variable in an inner scope has the same name as a variable in an outer scope. The inner variable "shadows" the outer within its scope, so the outer one is not accessible there.' },
        { q: 'What is illegal shadowing?', a: 'Illegal shadowing happens when shadowing crosses scope types in a way that breaks rules — for example, shadowing a let with a var inside a block. This throws SyntaxError because var would leak out of the block and collide with the outer let.' },
        { q: 'How is var scoped inside a block?', a: 'var ignores block scope (except function blocks). var inside an if or for block leaks to the enclosing function or global scope. That is why let/const are preferred in modern JS.' },
        { q: 'Can you legally shadow a var with a let?', a: 'Yes. let inside a block can shadow an outer var of the same name because let is confined to the block and does not conflict with the outer var.' }
      ],
      mcqs: [
        { question: 'Which is scoped to the nearest block?', options: ['var', 'let and const', 'function', 'All three'], answer: 1, explanation: 'let and const are block-scoped. var is function-scoped and ignores non-function blocks.' },
        { question: '{ var x = 1; } console.log(x); outputs?', options: ['undefined', 'ReferenceError', '1', '0'], answer: 2, explanation: 'var leaks out of a plain block and is accessible outside.' },
        { question: '{ let y = 1; } console.log(y); outputs?', options: ['undefined', '1', 'ReferenceError', 'null'], answer: 2, explanation: 'let is block-scoped; y is not accessible outside the block.' },
        { question: 'let a = 1; { var a = 2; } — what happens?', options: ['Legal shadowing', 'Illegal shadowing (SyntaxError)', 'a becomes 2 globally', 'TypeError'], answer: 1, explanation: 'Shadowing a let with a var is illegal — var leaks and collides with the outer let.' },
        { question: 'var a = 1; { let a = 2; } — is this legal?', options: ['Yes (legal shadowing)', 'No (SyntaxError)', 'Only at top level', 'Only inside functions'], answer: 0, explanation: 'let can legally shadow var; let stays inside the block.' }
      ]
    },
    {
      id: 'ep-10',
      number: 10,
      season: 1,
      title: 'Closures in JS',
      videoUrl: 'https://www.youtube.com/watch?v=qikxEIxsXco',
      topics: ['closure definition', 'lexical scoping', 'closure over variables', 'memory persistence'],
      interviewQuestions: [
        { q: 'What is a closure?', a: 'A closure is a function bundled together with references to its surrounding lexical environment. It gives the function access to variables from its outer scope even after that outer function has finished executing.' },
        { q: 'How does a closure retain access to outer variables?', a: 'When a function is created, it retains a reference to its lexical environment. Even if the outer function returns and its execution context is popped, the inner function keeps the outer scope alive via this reference, preventing garbage collection.' },
        { q: 'What are real-world uses of closures?', a: 'Closures enable data privacy/encapsulation (module pattern), function factories, currying, memoization, event handlers with persistent state, setTimeout callbacks, and implementing private variables in modules.' },
        { q: 'Do closures cause memory leaks?', a: 'They can if misused — holding references to large objects in the outer scope prevents GC. Modern engines optimize to only retain variables actually referenced by the closure, but long-lived closures referencing DOM nodes are a common leak source.' },
        { q: 'Show a closure example.', a: 'function counter() { let count = 0; return function() { count++; return count; }; } const c = counter(); c(); // 1; c(); // 2 — the inner function closes over count, keeping it alive between calls.' }
      ],
      mcqs: [
        { question: 'A closure gives a function access to ___.', options: ['Only its own scope', 'The global scope only', 'Its outer lexical scope, even after the outer has returned', 'Random scopes'], answer: 2, explanation: 'Closures bundle a function with references to variables in its lexical environment.' },
        { question: 'What keeps outer variables alive after a function returns?', options: ['The call stack', 'The closure reference from the inner function', 'The heap allocator', 'The event loop'], answer: 1, explanation: 'The inner function\'s reference to the outer scope prevents those variables from being GC\'d.' },
        { question: 'Which is NOT a use case of closures?', options: ['Data privacy', 'Currying', 'Allocating heap memory manually', 'Memoization'], answer: 2, explanation: 'JS does not expose manual heap allocation; closures don\'t do that. The others are canonical uses.' },
        { question: 'Closures are enabled by ___ scoping.', options: ['Dynamic', 'Lexical', 'Block', 'Function'], answer: 1, explanation: 'Closures rely on JavaScript\'s lexical scoping.' },
        { question: 'function outer(){let x=1; return function(){return x;}} — calling outer()() returns?', options: ['undefined', '1', 'ReferenceError', 'null'], answer: 1, explanation: 'The inner function closes over x and returns its value, 1.' }
      ]
    },
    {
      id: 'ep-11',
      number: 11,
      season: 1,
      title: 'setTimeout + Closures Interview Question',
      videoUrl: 'https://www.youtube.com/watch?v=eBTBG4nda2A',
      topics: ['setTimeout with closures', 'loop + closure', 'fix with let/IIFE'],
      interviewQuestions: [
        { q: 'Why does `for (var i=0; i<3; i++) setTimeout(()=>console.log(i), 1000)` log 3,3,3?', a: 'Because var is function-scoped, all three timer callbacks close over the same single i. By the time they fire, the loop has completed and i is 3. All three print 3.' },
        { q: 'How do you fix it to print 0,1,2?', a: 'Replace var with let (block-scoped, creates a new binding per iteration), or wrap the setTimeout in an IIFE that takes i as a parameter to create a per-iteration copy: (function(j){ setTimeout(()=>console.log(j),1000) })(i).' },
        { q: 'Why does let fix the problem?', a: 'let is block-scoped per iteration of a for loop. Each iteration creates a new binding of i, so each closure captures its own distinct i — 0, 1, 2 respectively.' },
        { q: 'Does setTimeout guarantee exact delay?', a: 'No. setTimeout guarantees a minimum delay. The callback is queued after the delay, but actual execution waits until the call stack is empty and the event loop picks it up from the task queue.' },
        { q: 'Can closures and setTimeout cause memory issues?', a: 'Yes. Long-lived timers holding closures over large objects keep them from being GC\'d. Always clearTimeout/clearInterval when no longer needed, especially for closures over DOM elements.' }
      ],
      mcqs: [
        { question: 'for(var i=0;i<3;i++)setTimeout(()=>console.log(i),0); prints?', options: ['0 1 2', '3 3 3', '0 0 0', 'undefined'], answer: 1, explanation: 'var i is shared; all callbacks see the final value 3.' },
        { question: 'Replacing var with let in the above prints?', options: ['0 1 2', '3 3 3', '1 2 3', 'undefined'], answer: 0, explanation: 'let creates a new binding each iteration, so each closure captures its own i.' },
        { question: 'An IIFE can fix var-closure bug by ___.', options: ['Changing scope to global', 'Copying the loop variable into a parameter', 'Delaying execution', 'Removing the closure'], answer: 1, explanation: 'IIFE with a parameter captures the current value per iteration in its own scope.' },
        { question: 'setTimeout(fn, 1000) guarantees?', options: ['Exactly 1000ms delay', 'At least 1000ms delay before fn runs', 'Fn runs synchronously', 'Fn never runs'], answer: 1, explanation: 'setTimeout delay is a minimum — actual execution depends on call stack and queue.' },
        { question: 'Which does NOT fix the var closure issue?', options: ['let', 'IIFE', 'const in for loop', 'Increasing the timeout'], answer: 3, explanation: 'Increasing timeout only delays execution; the bug (shared var) is unchanged.' }
      ]
    },
    {
      id: 'ep-12',
      number: 12,
      season: 1,
      title: 'CRAZY JS INTERVIEW ft. Closures',
      videoUrl: 'https://www.youtube.com/watch?v=t1nFAMws5FI',
      topics: ['closure-based interview questions', 'data encapsulation', 'module pattern'],
      interviewQuestions: [
        { q: 'How do closures help with data encapsulation?', a: 'Closures allow you to create private variables — state that is only accessible via exposed methods. The outer function\'s variables are not visible externally, but the returned functions can read/modify them, providing private state like OOP.' },
        { q: 'Explain the module pattern using closures.', a: 'Wrap a function as an IIFE that defines private variables and returns an object with public methods. The methods close over the private variables, exposing controlled access while hiding internal state. This pattern creates singletons with private data.' },
        { q: 'What are the disadvantages of closures?', a: 'Overuse can lead to memory consumption since closed-over variables persist. Debugging can be harder due to hidden state. Excessive nested closures may also impact performance due to scope chain traversal.' },
        { q: 'Create a function that only runs once using closures.', a: 'function once(fn){ let called=false, result; return function(...args){ if(!called){ called=true; result=fn(...args); } return result; }; } — the closure over called/result ensures subsequent calls do nothing.' },
        { q: 'What is currying and how do closures enable it?', a: 'Currying transforms a function of multiple arguments into a sequence of unary functions. Each inner function closes over the previously received arguments. Example: const add=a=>b=>a+b; add(2)(3)===5.' }
      ],
      mcqs: [
        { question: 'Private variables in JS are typically implemented via?', options: ['Classes only', 'Closures', 'Global variables', 'The #private syntax only'], answer: 1, explanation: 'Closures are the classic way to achieve private state in JS (now also # private fields).' },
        { question: 'The module pattern combines closures with ___.', options: ['Loops', 'IIFE', 'Prototypes', 'Promises'], answer: 1, explanation: 'IIFE + closures = module pattern; expose an object of methods with private state.' },
        { question: 'Currying transforms f(a,b,c) into ___.', options: ['f(a)+f(b)+f(c)', 'f(a)(b)(c)', 'f([a,b,c])', 'Promise.all'], answer: 1, explanation: 'Currying returns nested unary functions; each closes over previous args.' },
        { question: 'A "once" function is implemented with a closure over ___.', options: ['A callback', 'A flag tracking if it ran', 'An array', 'A Promise'], answer: 1, explanation: 'The closure keeps a boolean flag persistent across invocations.' },
        { question: 'Potential downside of closures?', options: ['Slower than synchronous code', 'Memory retention of captured variables', 'Cannot access globals', 'Only work in strict mode'], answer: 1, explanation: 'Captured variables stay alive as long as the closure exists, which can cause retention.' }
      ]
    },
    {
      id: 'ep-13',
      number: 13,
      season: 1,
      title: 'FIRST CLASS FUNCTIONS & Anonymous Functions',
      videoUrl: 'https://www.youtube.com/watch?v=SHINoHxvTso',
      topics: ['first-class citizens', 'anonymous functions', 'function expressions vs declarations'],
      interviewQuestions: [
        { q: 'What does "first-class function" mean?', a: 'In JS, functions are first-class citizens — they can be assigned to variables, passed as arguments, returned from other functions, and stored in data structures. This enables higher-order functions, callbacks, and functional programming patterns.' },
        { q: 'Difference between function declaration and function expression?', a: 'Function declarations (function foo(){}) are fully hoisted and can be invoked before their line. Function expressions (const foo = function(){}) are not hoisted as functions — only the variable is hoisted, so they cannot be called before assignment.' },
        { q: 'What is an anonymous function?', a: 'A function without a name. Used as values, e.g., callbacks or IIFEs: setTimeout(function(){}, 1000). They cannot be used as standalone statements — anonymous function declarations throw SyntaxError because declarations require an identifier.' },
        { q: 'What is a named function expression?', a: 'A function expression with a name: const foo = function bar(){}. The name bar is only accessible inside the function body (useful for recursion). Externally only foo is available.' },
        { q: 'What is the difference between parameters and arguments?', a: 'Parameters are named placeholders in the function signature. Arguments are the actual values passed when invoking the function. In function add(a,b){} — a, b are parameters; in add(2,3), 2 and 3 are arguments.' }
      ],
      mcqs: [
        { question: 'First-class functions means functions can be ___.', options: ['Only called', 'Passed as args, returned, and stored', 'Only declared at top-level', 'Only asynchronous'], answer: 1, explanation: 'Being first-class = treated as values; can be passed/returned/stored.' },
        { question: 'Which is hoisted with its body?', options: ['const f = function(){}', 'function f(){}', 'const f = () => {}', 'Named expression'], answer: 1, explanation: 'Only function declarations (statements) are fully hoisted.' },
        { question: 'function(){} as a standalone statement throws?', options: ['Nothing', 'TypeError', 'SyntaxError: function statements require a name', 'ReferenceError'], answer: 2, explanation: 'Anonymous function declaration is a SyntaxError because declarations need identifiers.' },
        { question: 'In function greet(name){}, `name` is a ___.', options: ['Argument', 'Parameter', 'Callback', 'Closure'], answer: 1, explanation: 'Named placeholders in the signature are parameters.' },
        { question: 'Named function expressions are primarily useful for ___.', options: ['Hoisting', 'Self-reference / recursion inside the function', 'Speed', 'Memory'], answer: 1, explanation: 'The internal name allows the function to refer to itself for recursion.' }
      ]
    },
    {
      id: 'ep-14',
      number: 14,
      season: 1,
      title: 'Callback Functions & Event Listeners',
      videoUrl: 'https://www.youtube.com/watch?v=btj35dh3_U8',
      topics: ['callbacks', 'event-driven model', 'addEventListener', 'removing event listeners', 'memory'],
      interviewQuestions: [
        { q: 'What is a callback function?', a: 'A callback is a function passed as an argument to another function, meant to be invoked later — either synchronously (like Array.map) or asynchronously (like setTimeout, fetch). Callbacks are the foundation of async JS.' },
        { q: 'How does JS achieve async behavior despite being single-threaded?', a: 'The JS engine itself runs on one thread, but browsers/Node provide Web APIs (timers, DOM, fetch) that run outside the engine. When they complete, their callbacks are queued and picked up by the event loop when the call stack is empty.' },
        { q: 'What is addEventListener and why pass a named function?', a: 'addEventListener registers a callback for an event on a DOM element. Passing a named function allows later removal via removeEventListener. Anonymous inline functions cannot be removed because you lack a reference.' },
        { q: 'Why should event listeners be removed when no longer needed?', a: 'Listeners capture closures over their enclosing scope and hold references to DOM elements. If left attached, they prevent garbage collection and cause memory leaks, especially in single-page apps where components mount/unmount repeatedly.' },
        { q: 'Explain closures and event listeners together.', a: 'Each event listener closes over its defining scope. For example, attaching a click listener inside a component captures that component\'s variables. This closure persists as long as the listener is attached, keeping variables and DOM elements alive.' }
      ],
      mcqs: [
        { question: 'A callback function is ___.', options: ['A function called at the end of the program', 'A function passed to another function to be invoked later', 'A global function', 'Only asynchronous'], answer: 1, explanation: 'Callbacks are functions passed as arguments to be invoked later.' },
        { question: 'Web APIs run ___.', options: ['On the JS main thread', 'Outside the JS engine, provided by browser/runtime', 'In the call stack', 'Via Promises only'], answer: 1, explanation: 'Web APIs are provided by the host environment, separate from the JS engine.' },
        { question: 'To remove a listener you need ___.', options: ['The event name only', 'A reference to the same function passed on add', 'document.reload()', 'Nothing, they auto-cleanup'], answer: 1, explanation: 'removeEventListener needs the exact function reference used in addEventListener.' },
        { question: 'Why can anonymous inline listeners cause leaks?', options: ['They are slow', 'They cannot be removed, so they persist', 'They throw errors', 'They auto-remove'], answer: 1, explanation: 'Without a reference, you cannot call removeEventListener, so they stay attached.' },
        { question: 'Event listeners hold ___ over their enclosing scope.', options: ['Weak references', 'Closures', 'Promises', 'Nothing'], answer: 1, explanation: 'Listeners are closures; they retain the surrounding scope\'s variables.' }
      ]
    },
    {
      id: 'ep-15',
      number: 15,
      season: 1,
      title: 'Asynchronous JavaScript & EVENT LOOP',
      videoUrl: 'https://www.youtube.com/watch?v=8zKuNo4ay8E',
      topics: ['event loop', 'call stack', 'Web APIs', 'callback queue', 'microtask queue'],
      interviewQuestions: [
        { q: 'What is the event loop?', a: 'The event loop is a mechanism that continuously monitors the call stack and the task queues. When the stack is empty, it takes the next callback from the microtask queue (first) or the task queue and pushes it onto the stack for execution.' },
        { q: 'What is the difference between microtask and macrotask queue?', a: 'Microtask queue holds promise callbacks (.then/.catch/.finally) and queueMicrotask. Macrotask queue holds setTimeout/setInterval/DOM events/I/O. After each macrotask, all microtasks are drained before the next macrotask — microtasks have higher priority.' },
        { q: 'Walk through setTimeout(fn, 0).', a: 'setTimeout is a Web API. With 0ms delay, fn is registered and immediately queued in the task queue. The engine keeps executing sync code. Once the stack is empty and all microtasks complete, the event loop pushes fn onto the stack.' },
        { q: 'What is starvation of macrotasks?', a: 'If microtasks continuously schedule more microtasks, they can indefinitely delay macrotasks (like setTimeout callbacks), causing "starvation". This happens because microtasks drain fully before any macrotask runs.' },
        { q: 'Where do fetch callbacks end up?', a: 'fetch returns a Promise; its .then callbacks are microtasks. The network request itself is handled by the browser\'s network API. When response arrives, the promise resolves and .then handlers are queued as microtasks.' }
      ],
      mcqs: [
        { question: 'Which queue has higher priority?', options: ['Task queue', 'Microtask queue', 'They are equal', 'Depends on browser'], answer: 1, explanation: 'Microtasks (promises) are drained fully before the next macrotask runs.' },
        { question: 'setTimeout callbacks land in the ___.', options: ['Microtask queue', 'Task/callback queue', 'Call stack directly', 'Heap'], answer: 1, explanation: 'setTimeout is a macrotask, placed in the task (callback) queue.' },
        { question: 'The event loop moves callbacks to the stack only when ___.', options: ['A callback is queued', 'The call stack is empty', 'The engine starts', 'Every 16ms'], answer: 1, explanation: 'Event loop requires an empty call stack before dequeuing a task.' },
        { question: 'Promise.then callbacks are queued in the ___.', options: ['Task queue', 'Microtask queue', 'Animation frame queue', 'Idle queue'], answer: 1, explanation: 'Promise continuations go to the microtask queue.' },
        { question: 'setTimeout(fn,0) executes ___.', options: ['Immediately', 'After the call stack is clear and microtasks drain', 'Synchronously', 'Only in Node'], answer: 1, explanation: '0ms is a minimum delay; it still goes through the event loop after sync code.' }
      ]
    },
    {
      id: 'ep-16',
      number: 16,
      season: 1,
      title: 'JS Engine EXPOSED – V8 Architecture',
      videoUrl: 'https://www.youtube.com/watch?v=2WJL19wDH68',
      topics: ['JIT compilation', 'ignition', 'turbofan', 'garbage collection', 'parsing', 'AST'],
      interviewQuestions: [
        { q: 'What is a JavaScript engine?', a: 'A JS engine is a program that executes JavaScript code. It parses source, builds an AST, compiles/interprets, and executes. Examples: V8 (Chrome, Node.js), SpiderMonkey (Firefox), JavaScriptCore (Safari).' },
        { q: 'What are the stages of JS execution in V8?', a: '1) Parsing: source code is tokenized and parsed into an Abstract Syntax Tree (AST). 2) Interpretation: Ignition interprets bytecode. 3) Compilation: TurboFan compiles hot code into optimized machine code. 4) Execution: The machine code runs, with deoptimization if assumptions break.' },
        { q: 'What is JIT compilation?', a: 'Just-In-Time compilation combines interpretation and compilation. Code is interpreted initially for fast startup, then frequently executed ("hot") parts are compiled to optimized machine code at runtime for performance.' },
        { q: 'How does garbage collection work in V8?', a: 'V8 uses a generational GC. The heap is split into young and old generations. New objects are allocated in young generation; surviving multiple collections get promoted. Algorithms like Mark-and-Sweep and Scavenge reclaim memory automatically.' },
        { q: 'What is Ignition and TurboFan?', a: 'Ignition is V8\'s interpreter that runs bytecode immediately for fast startup. TurboFan is V8\'s optimizing compiler that compiles hot functions into highly optimized machine code, using profiling feedback from Ignition.' }
      ],
      mcqs: [
        { question: 'Which JS engine powers Chrome and Node.js?', options: ['SpiderMonkey', 'V8', 'JavaScriptCore', 'Chakra'], answer: 1, explanation: 'V8 is Google\'s engine used in Chrome and Node.js.' },
        { question: 'What does AST stand for?', options: ['Advanced Syntax Tree', 'Abstract Syntax Tree', 'Async Stack Trace', 'Array Stream Token'], answer: 1, explanation: 'AST = Abstract Syntax Tree, the parsed structured representation of source code.' },
        { question: 'Ignition is V8\'s ___.', options: ['Compiler', 'Interpreter', 'Garbage collector', 'Parser'], answer: 1, explanation: 'Ignition is V8\'s bytecode interpreter.' },
        { question: 'TurboFan is V8\'s ___.', options: ['Compiler for hot code', 'Interpreter', 'Network module', 'Thread pool'], answer: 0, explanation: 'TurboFan is the optimizing compiler for hot (frequently-run) code.' },
        { question: 'V8 garbage collection is ___.', options: ['Manual', 'Generational (young/old)', 'Reference counting only', 'Disabled by default'], answer: 1, explanation: 'V8 uses a generational GC with young and old generations.' }
      ]
    },
    {
      id: 'ep-17',
      number: 17,
      season: 1,
      title: 'TRUST ISSUES with setTimeout()',
      videoUrl: 'https://www.youtube.com/watch?v=nqoudjTtE3I',
      topics: ['setTimeout 0ms', 'timer delay', 'event loop priority'],
      interviewQuestions: [
        { q: 'Does setTimeout guarantee exact delay?', a: 'No. setTimeout guarantees the callback will run no sooner than the specified delay. Actual execution depends on call stack being empty and the event loop reaching the task queue. A blocked main thread can delay it significantly.' },
        { q: 'Why does setTimeout(fn, 5000) sometimes take longer?', a: 'If synchronous code (e.g., a heavy loop) is running when the 5s mark is reached, fn must wait. The event loop only dequeues callbacks after the call stack clears. So the delay is a minimum, not exact.' },
        { q: 'What does setTimeout(fn, 0) actually do?', a: 'It queues fn in the task queue immediately but still waits for the stack to be empty and microtasks to drain before fn can run. It is a common trick to defer execution "until later" without an actual delay.' },
        { q: 'Is the minimum setTimeout delay really 0?', a: 'Browsers clamp nested setTimeouts to a minimum of 4ms (HTML spec) after 5 levels of nesting. So setTimeout(fn, 0) effectively runs slightly later, and deeply nested ones are clamped upward.' },
        { q: 'How does a blocked main thread affect setTimeout?', a: 'setTimeout callbacks never preempt the running code. A long-running synchronous operation blocks the main thread, delaying all timer callbacks until it completes. Always avoid long sync tasks to keep the UI responsive.' }
      ],
      mcqs: [
        { question: 'setTimeout guarantees ___.', options: ['Exact delay', 'Minimum delay before execution', 'Maximum delay', 'Synchronous execution'], answer: 1, explanation: 'setTimeout delay is a lower bound — actual execution may be delayed by the event loop.' },
        { question: 'A blocking loop in main thread ___ setTimeout callbacks.', options: ['Cancels', 'Delays', 'Speeds up', 'Does not affect'], answer: 1, explanation: 'Blocked main thread prevents the event loop from dequeuing timer callbacks.' },
        { question: 'setTimeout(fn, 0) runs ___.', options: ['Immediately (sync)', 'After current stack + microtasks', 'Never', 'Before sync code'], answer: 1, explanation: 'Even 0ms still goes through the task queue; sync code and microtasks run first.' },
        { question: 'HTML spec clamps deeply nested setTimeouts to a minimum of ___ ms.', options: ['0', '1', '4', '10'], answer: 2, explanation: 'After 5 levels of nesting, browsers enforce a 4ms minimum per HTML spec.' },
        { question: 'The "trust issue" in setTimeout refers to ___.', options: ['It runs twice', 'Its timing is not precise', 'It blocks the main thread', 'It cannot be canceled'], answer: 1, explanation: 'You cannot trust setTimeout to fire exactly after the specified delay.' }
      ]
    },
    {
      id: 'ep-18',
      number: 18,
      season: 1,
      title: 'Higher-Order Functions & Functional Programming',
      videoUrl: 'https://www.youtube.com/watch?v=HkWxvB1RFF8',
      topics: ['HOF', 'functions as arguments/return values', 'pure functions'],
      interviewQuestions: [
        { q: 'What is a higher-order function (HOF)?', a: 'A higher-order function either takes one or more functions as arguments, returns a function, or both. Examples: Array.map, Array.filter, Array.reduce, addEventListener, setTimeout, and function factories.' },
        { q: 'What is functional programming?', a: 'Functional programming is a paradigm emphasizing pure functions, immutability, first-class functions, and declarative data transformations. It avoids shared state and mutable data, making code more predictable and easier to test.' },
        { q: 'What is a pure function?', a: 'A pure function always returns the same output for the same input and has no side effects (no mutation of external state, no I/O, no randomness). Pure functions are predictable, testable, and enable memoization.' },
        { q: 'How can you DRY up repetitive code with HOFs?', a: 'Extract common behavior into a HOF that accepts a function parameter for the varying part. For example, instead of separate calculateAreaCircle/calculateAreaSquare, make a generic calculateArea(radii, formulaFn).' },
        { q: 'What are some common HOFs in JavaScript?', a: 'Array methods: map, filter, reduce, forEach, find, some, every, sort. Functional utilities like .bind, .call, .apply. Also setTimeout, addEventListener, Promise constructors. Higher-order function composition enables powerful pipelines.' }
      ],
      mcqs: [
        { question: 'A higher-order function ___.', options: ['Has more than 3 parameters', 'Takes/returns a function', 'Runs on higher priority', 'Is always async'], answer: 1, explanation: 'HOFs operate on functions — accepting or returning them.' },
        { question: 'Which is NOT a higher-order function?', options: ['Array.map', 'Array.filter', 'Array.length', 'addEventListener'], answer: 2, explanation: 'Array.length is a property, not a function. The others all take function arguments.' },
        { question: 'A pure function must ___.', options: ['Use async/await', 'Have no side effects and be deterministic', 'Mutate input', 'Return undefined'], answer: 1, explanation: 'Purity = deterministic output for same input + no side effects.' },
        { question: 'Functional programming emphasizes ___.', options: ['Mutable state', 'Inheritance', 'Immutability and pure functions', 'Global variables'], answer: 2, explanation: 'FP core ideas: pure functions and immutable data.' },
        { question: 'Functions as first-class citizens is prerequisite for ___.', options: ['Threading', 'HOFs', 'Prototypes', 'Garbage collection'], answer: 1, explanation: 'You need functions-as-values to pass them as arguments — the basis of HOFs.' }
      ]
    },
    {
      id: 'ep-19',
      number: 19,
      season: 1,
      title: 'map, filter & reduce',
      videoUrl: 'https://www.youtube.com/watch?v=zdp0zrpKzIE',
      topics: ['Array.map', 'Array.filter', 'Array.reduce', 'chaining', 'practical examples'],
      interviewQuestions: [
        { q: 'What does Array.map do?', a: 'map creates a new array by applying a provided function to each element of the original. It is immutable — the original array is unchanged. It always returns an array of the same length.' },
        { q: 'What does Array.filter do?', a: 'filter creates a new array containing only elements for which the predicate function returns truthy. The resulting array may be shorter than the original. It does not mutate the source.' },
        { q: 'What does Array.reduce do?', a: 'reduce runs a reducer function over each element, carrying an accumulator, producing a single output value. Signature: arr.reduce((acc, curr) => ..., initialValue). Used for sums, grouping, flattening, building objects.' },
        { q: 'Why chain map/filter/reduce?', a: 'Chaining creates expressive, declarative data pipelines: users.filter(u=>u.active).map(u=>u.age).reduce((a,b)=>a+b,0). Each step is a new array (except reduce), preserving immutability and readability.' },
        { q: 'When would you use reduce over map/filter?', a: 'When the result shape differs from an array of the same length or subset — e.g., summing values, building an object from an array, grouping items, flattening nested arrays. Reduce is the most general of the three.' }
      ],
      mcqs: [
        { question: 'arr.map(x=>x*2) returns an array of ___ length relative to arr.', options: ['Equal', 'Half', 'Double', 'Variable'], answer: 0, explanation: 'map always returns an array of the same length as the source.' },
        { question: 'Which keeps only elements passing a test?', options: ['map', 'filter', 'reduce', 'forEach'], answer: 1, explanation: 'filter returns a subset based on a predicate.' },
        { question: '[1,2,3].reduce((a,b)=>a+b, 0) returns?', options: ['[1,2,3]', '6', '0', '[6]'], answer: 1, explanation: 'Sums to 6 with initial accumulator 0.' },
        { question: 'Which method mutates the original array?', options: ['map', 'filter', 'reduce', 'None of them'], answer: 3, explanation: 'map/filter/reduce are non-mutating — they return new values.' },
        { question: 'Best choice to transform and shape data into a non-array result?', options: ['map', 'filter', 'reduce', 'forEach'], answer: 2, explanation: 'reduce is flexible enough to output any shape (object, number, etc.).' }
      ]
    },
    {
      id: 'ep-20',
      number: 20,
      season: 2,
      title: 'Callback Hell',
      videoUrl: 'https://www.youtube.com/playlist?list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX',
      topics: ['callback hell', 'pyramid of doom', 'inversion of control', 'trust issues with callbacks'],
      interviewQuestions: [
        { q: 'What is callback hell?', a: 'Callback hell (or pyramid of doom) is deeply nested callback functions, each dependent on the result of the previous. The code grows rightward with indentation, becoming hard to read, debug, and maintain.' },
        { q: 'What is inversion of control with callbacks?', a: 'When you pass a callback to another function/library, you give it control over when/how/if your callback runs. The library might call it multiple times, never, or with wrong arguments — you lose control over your own code\'s execution.' },
        { q: 'How do promises fix callback hell?', a: 'Promises flatten nested callbacks into a chain with .then(). Each step returns a new promise, turning the pyramid into linear code. They also provide standardized error handling via .catch() and solve inversion of control by guaranteeing at most one call.' },
        { q: 'Give an example of callback hell.', a: 'api.getUser(id, (u)=>{ api.getOrders(u.id, (o)=>{ api.getItems(o.id,(i)=>{ api.getSeller(i.id,(s)=>{/* 4 levels deep */}); }); }); }); — each step requires the previous result.' },
        { q: 'Besides readability, what other problem does callback hell cause?', a: 'Error handling is tedious — each callback must handle its own errors, and errors cannot bubble up automatically. Debugging stack traces is hard because async boundaries break the sync call chain.' }
      ],
      mcqs: [
        { question: 'Callback hell is also called ___.', options: ['Spaghetti code', 'Pyramid of doom', 'Ravioli code', 'Lambda hell'], answer: 1, explanation: 'The nested indented shape resembles a pyramid.' },
        { question: 'Inversion of control means ___.', options: ['You call the library', 'The library calls your callback, with all its quirks', 'Async becomes sync', 'Errors stop execution'], answer: 1, explanation: 'You hand control of your code\'s execution to the callee.' },
        { question: 'Promises primarily address ___.', options: ['Faster execution', 'Pyramid of doom and inversion of control', 'Memory leaks', 'Threading'], answer: 1, explanation: 'Promises flatten async code and give guarantees on invocation.' },
        { question: 'Callback hell affects ___.', options: ['Only performance', 'Only memory', 'Readability, maintenance, and error handling', 'Only syntax'], answer: 2, explanation: 'Nesting hurts readability, error handling, and debugging.' },
        { question: 'A good fix for deeply nested callbacks is ___.', options: ['More indentation', 'Convert to promises / async-await', 'Use global variables', 'Remove error handling'], answer: 1, explanation: 'Promises and async/await flatten and clarify async flow.' }
      ]
    },
    {
      id: 'ep-21',
      number: 21,
      season: 2,
      title: 'Promises',
      videoUrl: 'https://www.youtube.com/playlist?list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX',
      topics: ['Promise states', 'pending/fulfilled/rejected', '.then()', 'promise chaining', 'immutability'],
      interviewQuestions: [
        { q: 'What is a Promise?', a: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation. It has three states: pending, fulfilled (resolved with a value), or rejected (failed with a reason). Once settled, a promise is immutable.' },
        { q: 'What are the states of a Promise?', a: '1) Pending: initial state, neither fulfilled nor rejected. 2) Fulfilled: operation completed successfully with a value. 3) Rejected: operation failed with a reason. Once moved from pending, the state is permanent.' },
        { q: 'How does .then() work?', a: '.then(onFulfilled, onRejected?) attaches callbacks. When the promise fulfills, onFulfilled is called with the value. Returns a new promise, so .then() can be chained. If the callback returns a value, the new promise resolves to that; if it returns a promise, it adopts its state.' },
        { q: 'Are promises guaranteed to be called once?', a: 'Yes. A promise can transition from pending only once, to either fulfilled or rejected, and stays in that state. This solves the inversion of control problem where callbacks could be invoked multiple times.' },
        { q: 'What does it mean that promises are immutable?', a: 'Once a promise settles (fulfilled or rejected), its state and value cannot change. Attaching more .then handlers still receives the same settled value. This immutability is key to predictability in promise chains.' }
      ],
      mcqs: [
        { question: 'Promise states are ___.', options: ['Start, Middle, End', 'Pending, Fulfilled, Rejected', 'Open, Close, Error', 'Sync, Async, Done'], answer: 1, explanation: 'Three states: pending, fulfilled, rejected.' },
        { question: 'Once a promise is fulfilled or rejected, it ___.', options: ['Can change again', 'Stays in that state permanently', 'Becomes pending again', 'Resets after 1s'], answer: 1, explanation: 'Promises settle once and become immutable.' },
        { question: '.then() returns ___.', options: ['Undefined', 'The same promise', 'A new promise', 'A callback'], answer: 2, explanation: '.then() always returns a new promise, enabling chaining.' },
        { question: 'How many times does onFulfilled run for a single resolved promise?', options: ['Zero', 'Exactly once per .then handler', 'Many times', 'Depends on promise library'], answer: 1, explanation: 'Each attached .then runs at most once.' },
        { question: 'Promises solve ___ of callback-based async code.', options: ['Performance', 'Inversion of control + pyramid of doom', 'Memory leaks', 'Type safety'], answer: 1, explanation: 'Promises flatten nesting and guarantee one call, addressing callback hell\'s core issues.' }
      ]
    },
    {
      id: 'ep-22',
      number: 22,
      season: 2,
      title: 'Creating a Promise, Chaining & Error Handling',
      videoUrl: 'https://www.youtube.com/playlist?list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX',
      topics: ['new Promise()', 'resolve/reject', '.catch()', '.finally()', 'promise chain order'],
      interviewQuestions: [
        { q: 'How do you create a Promise manually?', a: 'const p = new Promise((resolve, reject) => { if (success) resolve(value); else reject(error); }); The executor runs synchronously. Call resolve(value) on success or reject(error) on failure.' },
        { q: 'What does .catch() do?', a: '.catch(handler) attaches a handler for rejected promises. Equivalent to .then(undefined, handler). It catches any rejection from earlier in the chain, so placing a single .catch at the end handles errors from all previous .then steps.' },
        { q: 'What is .finally() for?', a: '.finally(callback) runs the callback regardless of fulfillment or rejection. Useful for cleanup (hiding loaders, closing resources). It does not receive a value and does not change the resolved value of the chain.' },
        { q: 'What happens if you throw an error inside .then?', a: 'The next promise in the chain rejects with that error. This allows catching thrown errors in a subsequent .catch, similar to try/catch in sync code.' },
        { q: 'What is returned from a .then handler determines ___?', a: 'If it returns a value, the next promise fulfills with that value. If it returns a promise, the chain waits and adopts that promise\'s state. If it throws, the next promise rejects.' }
      ],
      mcqs: [
        { question: 'new Promise takes an executor with parameters ___.', options: ['next, done', 'resolve, reject', 'onSuccess, onError', 'then, catch'], answer: 1, explanation: 'The executor receives resolve and reject functions.' },
        { question: '.catch is equivalent to ___.', options: ['.then(undefined, handler)', '.then(handler)', '.finally(handler)', '.all()'], answer: 0, explanation: '.catch(fn) === .then(undefined, fn).' },
        { question: '.finally runs ___.', options: ['Only on fulfillment', 'Only on rejection', 'Regardless of outcome', 'Never'], answer: 2, explanation: 'finally runs for both fulfillment and rejection.' },
        { question: 'Throwing inside .then causes the next promise to ___.', options: ['Stay pending', 'Resolve with undefined', 'Reject with the thrown error', 'Throw synchronously'], answer: 2, explanation: 'A thrown error in .then becomes a rejection in the next link.' },
        { question: 'If .then returns a promise, the chain ___.', options: ['Ignores it', 'Adopts its state, waits for it to settle', 'Throws error', 'Stops execution'], answer: 1, explanation: 'Returned promises are "assimilated" — the chain waits and follows them.' }
      ]
    },
    {
      id: 'ep-23',
      number: 23,
      season: 2,
      title: 'async await',
      videoUrl: 'https://www.youtube.com/playlist?list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX',
      topics: ['async keyword', 'await', 'async/await vs promises', 'error handling with try/catch'],
      interviewQuestions: [
        { q: 'What is async/await?', a: 'async/await is syntactic sugar over promises that lets you write asynchronous code that looks synchronous. `async` marks a function as returning a promise; `await` pauses execution until a promise settles, yielding its resolved value.' },
        { q: 'Difference between async/await and .then chains?', a: 'Functionally equivalent, but async/await reads linearly like sync code, uses standard try/catch for errors, and handles control flow (loops, conditionals) more naturally. .then chains can be more composable in functional pipelines.' },
        { q: 'How is error handling done with async/await?', a: 'Use try/catch around await calls. If the awaited promise rejects, the await throws, caught by catch. Errors can also be caught by attaching .catch to the returned promise from the async function.' },
        { q: 'Does await block the entire program?', a: 'No. await only pauses the current async function. The JS engine continues running other code (other async functions, UI events). Internally, the remainder of the async function is scheduled as a microtask when the awaited promise settles.' },
        { q: 'What does an async function always return?', a: 'A Promise. Returning a value from async fn() returns Promise.resolve(value). Throwing inside it returns Promise.reject(error). Returning another promise results in the async function\'s promise adopting it.' }
      ],
      mcqs: [
        { question: 'async function always returns ___.', options: ['A value', 'A Promise', 'undefined', 'A generator'], answer: 1, explanation: 'Async functions always wrap their return in a Promise.' },
        { question: 'await can be used ___.', options: ['Anywhere', 'Only inside async functions (and top-level modules)', 'In any function', 'Only in browsers'], answer: 1, explanation: 'await requires an async context; modules allow top-level await.' },
        { question: 'Errors in await are handled via ___.', options: ['.error', 'try/catch', 'throw globally', 'They cannot be caught'], answer: 1, explanation: 'Standard try/catch catches awaited rejections.' },
        { question: 'While awaiting, the JS engine ___.', options: ['Freezes', 'Continues running other code', 'Sleeps', 'Crashes'], answer: 1, explanation: 'Only the current async function pauses; engine continues other work.' },
        { question: 'async/await is syntactic sugar over ___.', options: ['Callbacks', 'Promises', 'Generators', 'Streams'], answer: 1, explanation: 'async/await is built on top of promises.' }
      ]
    },
    {
      id: 'ep-24',
      number: 24,
      season: 2,
      title: 'Promise APIs + Interview Questions',
      videoUrl: 'https://www.youtube.com/playlist?list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX',
      topics: ['Promise.all()', 'Promise.allSettled()', 'Promise.race()', 'Promise.any()', 'use cases'],
      interviewQuestions: [
        { q: 'What does Promise.all do?', a: 'Promise.all([p1,p2,p3]) returns a promise that fulfills with an array of all values when all input promises fulfill. If any one rejects, the whole Promise.all rejects immediately with that reason (fail-fast).' },
        { q: 'Difference between Promise.all and Promise.allSettled?', a: 'allSettled waits for every promise to settle (fulfill or reject) and returns an array of {status, value} or {status, reason}. It never rejects. Use when you need the result of every promise regardless of outcome.' },
        { q: 'What does Promise.race do?', a: 'Promise.race([p1,p2,...]) settles with the first promise that settles (either fulfilled or rejected). Useful for timeouts: race the real request against a timeout promise.' },
        { q: 'What does Promise.any do?', a: 'Promise.any returns the first promise that fulfills. If all reject, it rejects with an AggregateError. Opposite of race in that it ignores rejections as long as one fulfills.' },
        { q: 'When would you use each?', a: 'all: need all results, fail fast on any error. allSettled: need status of all, including failures. race: whichever finishes first wins (timeouts). any: first success wins (fallback servers). Pick based on error semantics and completion requirements.' }
      ],
      mcqs: [
        { question: 'Promise.all rejects when ___.', options: ['Any input rejects', 'All inputs reject', 'Timeout expires', 'Never'], answer: 0, explanation: 'Fail-fast: first rejection causes Promise.all to reject.' },
        { question: 'Promise.allSettled ___.', options: ['Rejects on first error', 'Waits for all to settle, never rejects', 'Runs them in parallel only', 'Same as race'], answer: 1, explanation: 'allSettled never rejects; it returns results for all promises.' },
        { question: 'Promise.race fulfills with the ___.', options: ['Fastest fulfillment only', 'First promise that settles (fulfill or reject)', 'Last promise', 'All promises'], answer: 1, explanation: 'race cares about which settles first, regardless of outcome.' },
        { question: 'Promise.any rejects with ___.', options: ['The first rejection', 'AggregateError if all reject', 'A timeout error', 'Nothing, it always fulfills'], answer: 1, explanation: 'If every input rejects, any rejects with an AggregateError.' },
        { question: 'Best API for "fastest server wins, ignore failures"?', options: ['Promise.all', 'Promise.any', 'Promise.allSettled', 'Promise.race'], answer: 1, explanation: 'any waits for first fulfillment and ignores rejections.' }
      ]
    },
    {
      id: 'ep-25',
      number: 25,
      season: 2,
      title: 'this keyword in JavaScript',
      videoUrl: 'https://www.youtube.com/playlist?list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX',
      topics: ['this in global/function/method/arrow context', 'call/apply/bind'],
      interviewQuestions: [
        { q: 'What does `this` refer to in different contexts?', a: 'Global scope: the global object (window/global/globalThis) in non-strict, undefined in strict. Method: the object the method was called on. Function: global object (non-strict) or undefined (strict). Arrow: lexically inherited from enclosing scope. Class: the instance. Constructor: the new instance.' },
        { q: 'Difference between call, apply, and bind?', a: 'All set `this` explicitly. call(ctx, a, b) invokes with args passed individually. apply(ctx, [a,b]) takes args as an array. bind(ctx, a) returns a new function with `this` permanently bound (does not invoke immediately).' },
        { q: 'Why do arrow functions not have their own this?', a: 'Arrow functions inherit `this` from the enclosing lexical scope. They cannot be rebound via call/apply/bind. This makes them ideal for callbacks where you want to retain the outer context (e.g., inside class methods, event handlers).' },
        { q: 'What is `this` in a strict-mode standalone function?', a: 'undefined. In non-strict, it defaults to the global object. Strict mode "cleans up" implicit global binding, reducing bugs.' },
        { q: 'In event handler attached via addEventListener, what is this?', a: 'In a regular function handler, `this` is the DOM element the listener is attached to. In an arrow function handler, `this` is inherited from the outer scope (often the enclosing component or window).' }
      ],
      mcqs: [
        { question: 'In a method call obj.foo(), `this` inside foo is ___.', options: ['window', 'obj', 'undefined', 'null'], answer: 1, explanation: '`this` in a method call refers to the object on which the method was invoked.' },
        { question: 'Arrow functions ___ their own `this`.', options: ['Have', 'Do not have', 'Have a new', 'Have global'], answer: 1, explanation: 'Arrow functions lexically inherit `this`; they don\'t have their own.' },
        { question: 'fn.call(ctx, 1, 2) and fn.apply(ctx, [1,2]) ___.', options: ['Differ in return value', 'Differ only in how args are passed', 'apply is faster', 'call is async'], answer: 1, explanation: 'Same behavior; difference is call takes individual args, apply takes an array.' },
        { question: 'fn.bind(ctx) ___.', options: ['Invokes fn immediately', 'Returns a new bound function without invoking', 'Mutates fn', 'Returns a Promise'], answer: 1, explanation: 'bind returns a new function permanently bound to ctx; does not invoke.' },
        { question: 'In strict mode, `this` in a standalone function is ___.', options: ['window', 'undefined', 'the function itself', 'null'], answer: 1, explanation: 'Strict mode sets standalone function `this` to undefined rather than global object.' }
      ]
    }
  ]
};
