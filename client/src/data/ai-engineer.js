export default {
  id: 'ai-engineer',
  title: 'AI Engineer',
  icon: '🤖',
  color: '#8B5CF6',
  modules: [
    {
      id: 'mod-01',
      number: 1,
      title: 'Python for AI',
      topics: ['Python basics', 'NumPy', 'Pandas', 'matplotlib', 'Jupyter notebooks', 'virtual environments'],
      interviewQuestions: [
        { q: 'Why is Python the dominant language for AI/ML?', a: 'Python has a huge ecosystem of mature libraries (NumPy, Pandas, scikit-learn, PyTorch, TensorFlow), a simple readable syntax that lets researchers iterate fast, first-class interop with native C/CUDA code (so heavy math runs at native speed), excellent notebook tooling, and a massive community producing tutorials and pretrained models.' },
        { q: 'What is NumPy and why is it fast?', a: 'NumPy is the numerical computing foundation of Python, providing the ndarray — a typed, contiguous multi-dimensional array. It is fast because operations are vectorized and executed in optimized C/Fortran (BLAS/LAPACK) code rather than Python loops, and it allows broadcasting to avoid explicit loops over arrays.' },
        { q: 'What is Pandas used for?', a: 'Pandas provides DataFrame and Series for tabular and time-series data. It handles reading/writing CSV, Excel, Parquet, JSON, SQL; cleaning (fillna, drop_duplicates); transforming (apply, map); aggregating (groupby); joining (merge); and indexing. It is the standard tool for data wrangling in Python.' },
        { q: 'Why use virtual environments?', a: 'Virtual environments isolate project dependencies so different projects can use different versions of packages and Python without conflicts. Tools: venv (built-in), virtualenv, conda, poetry, uv. They make projects reproducible and prevent polluting the system Python.' },
        { q: 'What is a Jupyter notebook?', a: 'An interactive, browser-based document that mixes runnable code cells, rich output (tables, plots, images), and Markdown. Backed by kernels (IPython for Python). Widely used in data science and research for exploratory analysis, teaching, and sharing reproducible experiments.' }
      ],
      mcqs: [
        { question: 'Which library provides the ndarray?', options: ['Pandas', 'NumPy', 'Matplotlib', 'SciPy'], answer: 1, explanation: 'NumPy\'s ndarray is the foundational n-dimensional array in Python.' },
        { question: 'DataFrame is a core structure of ___.', options: ['NumPy', 'Pandas', 'Seaborn', 'SymPy'], answer: 1, explanation: 'Pandas provides DataFrame (2D) and Series (1D) for tabular data.' },
        { question: 'Which is NOT a way to create a virtual env?', options: ['venv', 'conda', 'virtualenv', 'httpenv'], answer: 3, explanation: 'httpenv is not a Python env tool; venv/virtualenv/conda are standard.' },
        { question: 'Broadcasting in NumPy ___.', options: ['Streams data over network', 'Lets arrays of different shapes operate together', 'Is a logging feature', 'Enables threading'], answer: 1, explanation: 'Broadcasting aligns smaller arrays to larger ones to vectorize operations.' },
        { question: 'Jupyter notebooks run code via ___.', options: ['kernels', 'daemons', 'services', 'processes called notebooks'], answer: 0, explanation: 'A kernel (e.g., IPython) executes the cells for that language.' }
      ]
    },
    {
      id: 'mod-02',
      number: 2,
      title: 'ML Fundamentals',
      topics: ['supervised vs unsupervised', 'train/validation/test split', 'overfitting and regularization', 'scikit-learn', 'evaluation metrics'],
      interviewQuestions: [
        { q: 'What is the difference between supervised and unsupervised learning?', a: 'Supervised learning uses labeled data: each example has an input and a known target output; the model learns to map inputs to outputs (classification, regression). Unsupervised learning works on unlabeled data and finds structure on its own (clustering, dimensionality reduction, density estimation).' },
        { q: 'Why split data into train, validation, and test sets?', a: 'The training set fits the model; the validation set tunes hyperparameters and selects models; the test set is held out for a final unbiased performance estimate. If you tune on the test set you leak information and overestimate generalization.' },
        { q: 'What is overfitting and how do you detect/prevent it?', a: 'Overfitting is when a model memorizes training data, performing well there but poorly on unseen data. Detect: train accuracy high, val/test accuracy much lower. Prevent: more data, augmentation, simpler models, regularization (L1/L2, dropout), early stopping, cross-validation.' },
        { q: 'What is scikit-learn?', a: 'scikit-learn is the most popular classical ML library in Python. It offers a consistent API (fit/predict/transform), a wide range of algorithms (linear models, trees, SVMs, ensembles, clustering, dim reduction), preprocessing, model selection (cross-validation, grid search), and pipelines.' },
        { q: 'Which metrics suit classification vs regression?', a: 'Classification: accuracy, precision, recall, F1 (and per-class/weighted), ROC-AUC, PR-AUC, confusion matrix, log-loss. Regression: MAE, MSE/RMSE, R², MAPE. Choose based on class balance, cost of errors, and whether you care about probabilities.' }
      ],
      mcqs: [
        { question: 'Which task is supervised?', options: ['K-means clustering', 'Spam classification', 'PCA', 'Autoencoder reconstruction'], answer: 1, explanation: 'Spam classification uses labeled data (spam/ham).' },
        { question: 'Which helps combat overfitting?', options: ['More training epochs indefinitely', 'Regularization / early stopping', 'Bigger test set leakage', 'Ignoring validation'], answer: 1, explanation: 'Regularization and early stopping penalize/stop excessive fitting.' },
        { question: 'F1-score is the ___.', options: ['Sum of precision and recall', 'Harmonic mean of precision and recall', 'Accuracy', 'ROC area'], answer: 1, explanation: 'F1 = 2·P·R/(P+R) — harmonic mean.' },
        { question: 'scikit-learn\'s common API is ___.', options: ['fit / predict / transform', 'train / run / output', 'learn / guess / show', 'build / test / ship'], answer: 0, explanation: 'Estimators implement fit, plus predict (supervised) or transform (pre/processing).' },
        { question: 'You should tune hyperparameters on the ___ set.', options: ['Test', 'Validation', 'Random', 'Train'], answer: 1, explanation: 'Hold out validation for tuning; test only for a final unbiased estimate.' }
      ]
    },
    {
      id: 'mod-03',
      number: 3,
      title: 'Deep Learning',
      topics: ['neural networks', 'activation functions', 'backpropagation', 'CNNs', 'RNNs / LSTMs', 'PyTorch'],
      interviewQuestions: [
        { q: 'What is a neural network?', a: 'A function approximator composed of layers of connected units (neurons). Each neuron computes a weighted sum of inputs plus a bias, then applies a non-linear activation. Stacking such layers and training end-to-end with gradient descent on labeled data lets networks learn complex mappings.' },
        { q: 'Why do we need activation functions, and which are common?', a: 'Without non-linear activations, stacked layers collapse into a single linear function — no more expressive than one layer. Common activations: ReLU (and variants like LeakyReLU, GELU), sigmoid (binary output), tanh (bounded), softmax (multi-class output).' },
        { q: 'What is backpropagation?', a: 'Backpropagation is the efficient algorithm to compute gradients of the loss with respect to every weight using the chain rule, layer by layer from output to input. Combined with an optimizer (SGD, Adam) it updates weights to minimize loss.' },
        { q: 'What is a CNN and where is it used?', a: 'A Convolutional Neural Network uses shared-weight convolutional filters to extract local spatial features, with pooling to reduce resolution and build translation invariance. Ideal for images, video, and any grid-like data.' },
        { q: 'Why are RNNs / LSTMs used for sequences, and what replaced them for many tasks?', a: 'RNNs (and LSTMs/GRUs that mitigate vanishing gradients) process sequences step by step, maintaining a hidden state. They were the default for text and speech, but Transformers have largely replaced them on most NLP and many sequence tasks due to better parallelism and long-range modeling via attention.' }
      ],
      mcqs: [
        { question: 'Without non-linear activations a deep net is equivalent to ___.', options: ['A deeper non-linear model', 'A single linear model', 'A decision tree', 'A kernel method'], answer: 1, explanation: 'Composition of linear layers is still linear.' },
        { question: 'Backprop uses the ___ to compute gradients.', options: ['Product rule only', 'Chain rule', 'Bayes rule', 'Triangle inequality'], answer: 1, explanation: 'The chain rule is repeatedly applied through the layers.' },
        { question: 'CNNs are most associated with ___.', options: ['Tabular data', 'Images / spatial data', 'Graphs only', 'Text only'], answer: 1, explanation: 'Convolutional filters exploit spatial locality and translation.' },
        { question: 'Softmax is typically used at ___.', options: ['Hidden layers', 'Multi-class output layer', 'Regression outputs', 'Input layer'], answer: 1, explanation: 'Softmax converts logits into a probability distribution over classes.' },
        { question: 'PyTorch\'s core data structure is ___.', options: ['ndarray', 'Tensor', 'DataFrame', 'Series'], answer: 1, explanation: 'torch.Tensor is PyTorch\'s differentiable array on CPU/GPU.' }
      ]
    },
    {
      id: 'mod-04',
      number: 4,
      title: 'LLMs & Transformers',
      topics: ['transformer architecture', 'self-attention', 'BERT and GPT families', 'tokenization', 'fine-tuning'],
      interviewQuestions: [
        { q: 'What is the core idea of the Transformer architecture?', a: 'The Transformer replaces recurrence with self-attention: every token attends to every other token in the sequence in parallel, weighted by learned query-key similarities. Paired with positional encodings, residual connections, layer norm, and feed-forward blocks, it models long-range dependencies efficiently and scales well.' },
        { q: 'What is self-attention?', a: 'For each token, compute Query, Key, Value vectors. Attention weights are softmax(Q·Kᵀ/√dₖ); the output is a weighted sum of V. Multi-head attention runs several attention mechanisms in parallel with different projections, letting the model attend to different kinds of relationships.' },
        { q: 'Difference between BERT and GPT families?', a: 'BERT is an encoder-only model trained with masked language modeling; it produces bidirectional representations good for understanding tasks (classification, NER, QA). GPT is decoder-only, trained causally (predict next token) to be a generative language model. Modern LLMs are mostly decoder-only.' },
        { q: 'What is tokenization and why does it matter?', a: 'Tokenization breaks text into integer IDs the model understands. Sub-word methods like BPE, WordPiece, SentencePiece balance vocabulary size with handling rare words. Tokenization affects cost, context length, multilingual performance, and how models see numbers, code, and whitespace.' },
        { q: 'Full fine-tuning vs parameter-efficient fine-tuning (PEFT/LoRA)?', a: 'Full fine-tuning updates all weights — expensive and risks forgetting. PEFT methods freeze the base and train small adapter modules. LoRA injects low-rank trainable matrices into attention layers, drastically cutting memory and compute while often matching full fine-tune quality; adapters can be swapped per task.' }
      ],
      mcqs: [
        { question: 'Transformers rely on ___.', options: ['Recurrence', 'Self-attention', 'Convolutions only', 'Tree search'], answer: 1, explanation: 'Self-attention lets every token interact with every other token in parallel.' },
        { question: 'BERT is ___ while GPT is ___.', options: ['Decoder / Encoder', 'Encoder / Decoder', 'Encoder / Encoder', 'Decoder / Decoder'], answer: 1, explanation: 'BERT is encoder-only (MLM); GPT is decoder-only (causal LM).' },
        { question: 'BPE / WordPiece are types of ___.', options: ['Optimizers', 'Tokenizers', 'Losses', 'Datasets'], answer: 1, explanation: 'They are sub-word tokenization algorithms.' },
        { question: 'LoRA is a ___.', options: ['Full fine-tune method', 'Parameter-efficient fine-tune method', 'Tokenizer', 'Scheduler'], answer: 1, explanation: 'LoRA trains low-rank adapter matrices while keeping base weights frozen.' },
        { question: 'Attention scores are scaled by ___.', options: ['√dₖ', 'dₖ²', 'log(dₖ)', 'dₖ!'], answer: 0, explanation: 'Scaled dot-product divides by √dₖ to keep gradients stable.' }
      ]
    },
    {
      id: 'mod-05',
      number: 5,
      title: 'Prompt Engineering',
      topics: ['zero-shot and few-shot', 'chain-of-thought', 'system prompts', 'temperature and sampling', 'structured output'],
      interviewQuestions: [
        { q: 'Zero-shot vs few-shot prompting?', a: 'Zero-shot: just ask the model without examples — it leverages general pretraining knowledge. Few-shot: include a handful of input/output examples in the prompt to show the desired format and behavior (in-context learning). Few-shot often improves consistency on specialized tasks but costs more tokens.' },
        { q: 'What is chain-of-thought prompting?', a: 'CoT asks the model to reason step by step before giving a final answer, either via instructions ("think step by step") or by showing worked examples. It improves performance on multi-step reasoning (math, logic) by letting the model allocate more compute per token to intermediate steps.' },
        { q: 'What is a system prompt?', a: 'A system prompt sets persistent instructions, role, tone, constraints, and safety guidelines that apply to the whole conversation. User messages are interpreted in that context. Good system prompts are concise, specific, and give clear behavior for edge cases.' },
        { q: 'How does temperature affect generation?', a: 'Temperature scales the logits before softmax. Low temperature (near 0) makes output deterministic and focused — picks the highest-probability token. High temperature (≥1) flattens the distribution, making output more diverse and creative but also more error-prone. top_p/top_k further restrict the sampling pool.' },
        { q: 'How do you get reliable structured output from an LLM?', a: 'Use JSON mode or tool-calling APIs that constrain the decoder to valid JSON/schemas. Provide a clear schema/spec in the prompt, show a minimal example, and validate parsed output with a schema (Pydantic, Zod) — retry with an error message on failure.' }
      ],
      mcqs: [
        { question: 'Few-shot prompting means ___.', options: ['No examples', 'Including examples in the prompt', 'Full fine-tuning', 'Distillation'], answer: 1, explanation: 'Demonstration examples are embedded in the prompt.' },
        { question: 'Lower temperature produces ___ output.', options: ['More random', 'More deterministic', 'Longer', 'Shorter automatically'], answer: 1, explanation: 'Lower temperature makes the model prefer the highest-probability token.' },
        { question: 'Chain-of-thought is primarily used for ___.', options: ['Shorter answers', 'Step-by-step reasoning', 'Translation', 'Image generation'], answer: 1, explanation: 'CoT improves multi-step reasoning by eliciting intermediate steps.' },
        { question: 'System prompts set ___.', options: ['User content', 'Persistent role / rules / tone', 'Random seeds only', 'Image data'], answer: 1, explanation: 'They define the model\'s role and behavior for the whole chat.' },
        { question: 'For valid structured JSON output use ___.', options: ['Hope and plain text', 'Schema + JSON mode / function-calling + validation', 'Longer temperature', 'Unicode tricks'], answer: 1, explanation: 'Constrained decoding plus schema validation is the reliable way.' }
      ]
    },
    {
      id: 'mod-06',
      number: 6,
      title: 'AI Agents & Frameworks',
      topics: ['agent loop', 'tool use / function calling', 'LangChain', 'CrewAI and AutoGen', 'ReAct pattern'],
      interviewQuestions: [
        { q: 'What is an AI agent?', a: 'An agent is an LLM-powered system that plans, takes actions via tools, and iterates toward a goal. Typical loop: observe → think → act (call tool) → observe result → repeat until done. Agents need memory, tools, planning, and often guardrails.' },
        { q: 'What is the ReAct pattern?', a: 'ReAct (Reason + Act) interleaves reasoning traces with actions. The model outputs a thought, then an action with arguments, then observes the tool result, then reasons again — all in the same chain. It improves reliability and interpretability over pure chain-of-thought alone.' },
        { q: 'What is function / tool calling?', a: 'The model is given schemas (name, description, params) for tools it can invoke. Rather than free text, it outputs a structured tool call; the runtime executes the tool and feeds the result back. Enables reliable integration with external systems: search, code, DBs, APIs.' },
        { q: 'What is LangChain and when would you use it?', a: 'LangChain is a framework for building LLM-powered applications, providing abstractions for prompts, chains, agents, tools, memory, and integrations with vector DBs, models, and data sources. Useful for rapid prototyping and stitching pipelines; production teams sometimes prefer thinner custom code for control.' },
        { q: 'Differences among LangChain, CrewAI, and AutoGen?', a: 'LangChain is a general-purpose LLM orchestration toolkit. CrewAI focuses on role-based multi-agent teams with task delegation. AutoGen (Microsoft) emphasizes conversable multi-agent patterns (e.g., user proxy + assistant agents) with flexible flow. They overlap but have different idioms and strengths.' }
      ],
      mcqs: [
        { question: 'ReAct stands for ___.', options: ['React framework', 'Reason + Act', 'Recursive Action', 'Retrieval Action'], answer: 1, explanation: 'It interleaves reasoning traces with actions.' },
        { question: 'Tool calling lets the model output ___.', options: ['Only text', 'Structured calls (name + args)', 'Images', 'Audio'], answer: 1, explanation: 'The model emits structured JSON calls executed by the runtime.' },
        { question: 'Which framework emphasizes role-based agent crews?', options: ['LangChain', 'CrewAI', 'PyTorch', 'FAISS'], answer: 1, explanation: 'CrewAI organizes agents into role-based crews with delegated tasks.' },
        { question: 'An agent loop typically ends when ___.', options: ['Max iterations / task done / error', 'The server restarts', 'Temperature hits 0', 'User types quit only'], answer: 0, explanation: 'Termination is by success, failure, or a step/time budget.' },
        { question: 'Memory in an agent is used to ___.', options: ['Compile code', 'Carry state across steps / sessions', 'Handle TLS', 'Do GC'], answer: 1, explanation: 'Memory stores prior messages / facts the agent should recall.' }
      ]
    },
    {
      id: 'mod-07',
      number: 7,
      title: 'RAG & Vector Databases',
      topics: ['RAG pipeline', 'embeddings', 'FAISS', 'Pinecone and friends', 'similarity search and reranking'],
      interviewQuestions: [
        { q: 'What is Retrieval-Augmented Generation?', a: 'RAG augments an LLM\'s answer with external, up-to-date or private knowledge. At query time, relevant documents are retrieved (usually via vector similarity) and inserted into the prompt so the LLM grounds its response in them, reducing hallucination and allowing domain-specific knowledge without fine-tuning.' },
        { q: 'What is an embedding?', a: 'An embedding is a dense numerical vector representing the semantic content of text (or images, audio). Semantically similar items have vectors close in some metric (cosine, dot product, L2). Embeddings are produced by embedding models and stored in a vector DB for similarity search.' },
        { q: 'What is a vector database?', a: 'A database optimized for storing and querying high-dimensional vectors with approximate nearest neighbor (ANN) indexes like HNSW, IVF, or PQ. Examples: FAISS (library), Pinecone, Weaviate, Milvus, Qdrant, pgvector. Supports metadata filters alongside vector search.' },
        { q: 'Why do RAG systems often add a reranker?', a: 'ANN retrieval is fast but approximate. A second-stage reranker (often a cross-encoder LLM) rescoring the top-k candidates dramatically improves precision at top ranks, at the cost of extra latency and compute. Common pattern: retrieve 50 → rerank → keep top 5.' },
        { q: 'What are common failure modes of RAG and how to mitigate them?', a: 'Chunks too big/small (tune size + overlap), poor embedding model (try domain-specific models), missing metadata filters, stale index (update on writes), low-quality documents (clean and deduplicate), and prompt not emphasizing to use only retrieved context (add instructions + citations).' }
      ],
      mcqs: [
        { question: 'RAG\'s primary purpose is to ___.', options: ['Train a model faster', 'Ground LLM answers in external documents', 'Compress models', 'Parse HTML'], answer: 1, explanation: 'It retrieves and injects context so the LLM answers from facts.' },
        { question: 'Embeddings are ___.', options: ['One-hot vectors only', 'Dense vectors capturing semantics', 'Hashes', 'Random noise'], answer: 1, explanation: 'Dense vectors where similar meanings lie close.' },
        { question: 'FAISS is a ___.', options: ['Hosted DB', 'Vector similarity library by Meta', 'A tokenizer', 'A prompt template engine'], answer: 1, explanation: 'FAISS is a C++/Python library for ANN search.' },
        { question: 'HNSW is a type of ___.', options: ['Encoder', 'ANN index structure', 'Loss function', 'Optimizer'], answer: 1, explanation: 'Hierarchical Navigable Small World — a graph-based ANN index.' },
        { question: 'A reranker typically uses a ___.', options: ['Random score', 'Cross-encoder for higher precision', 'Smaller embedding model', 'No model'], answer: 1, explanation: 'Cross-encoders score query+doc together for better precision.' }
      ]
    },
    {
      id: 'mod-08',
      number: 8,
      title: 'Cloud AI Services',
      topics: ['AWS Bedrock', 'GCP Vertex AI', 'Azure OpenAI', 'managed inference', 'model selection and cost'],
      interviewQuestions: [
        { q: 'What is AWS Bedrock?', a: 'Amazon Bedrock is a fully managed service offering access to multiple foundation models (Anthropic Claude, Meta Llama, Amazon Titan, Mistral, Cohere, etc.) via a unified API. Features include model evaluation, guardrails, knowledge bases (RAG), agents, and fine-tuning, without managing infrastructure.' },
        { q: 'What does GCP Vertex AI offer?', a: 'Vertex AI is Google Cloud\'s unified ML platform. For generative AI it hosts Google models (Gemini) plus third-party and open models via Model Garden, and provides training, pipelines, feature store, model registry, endpoints, monitoring, and tooling across the ML lifecycle.' },
        { q: 'What is Azure OpenAI Service?', a: 'Azure OpenAI provides OpenAI models (GPT-4, GPT-5 families, o-series, embeddings, DALL-E, Whisper) inside Azure with enterprise features: private networking, RBAC, data residency, SLAs, and integration with other Azure services. Contract and compliance differ from the public OpenAI API.' },
        { q: 'Why would a team choose managed inference over self-hosting?', a: 'Managed services remove ops burden (scaling, GPU management, upgrades, patching), provide strong SLAs, built-in security/compliance, and instant access to multiple model families. Self-hosting wins on cost at high volume, extreme latency, or strict privacy/air-gapped needs and for custom models.' },
        { q: 'How do you choose among model providers?', a: 'Evaluate on: task benchmarks and your own evals, latency and throughput, context length, multimodal needs, pricing (per 1M tokens in/out), privacy/data-use terms, regional availability, rate limits, and ecosystem fit (existing cloud commitments, auth integrations).' }
      ],
      mcqs: [
        { question: 'AWS managed foundation model service is ___.', options: ['Bedrock', 'SageMaker Studio', 'Redshift', 'EKS'], answer: 0, explanation: 'Bedrock offers multiple foundation models behind one API.' },
        { question: 'Google\'s unified AI platform is ___.', options: ['BigQuery ML', 'Vertex AI', 'Cloud Run', 'Compute Engine'], answer: 1, explanation: 'Vertex AI covers training, tuning, deployment, and gen AI.' },
        { question: 'Azure OpenAI hosts ___.', options: ['Meta Llama only', 'Anthropic models only', 'OpenAI models with Azure enterprise features', 'Google Gemini'], answer: 2, explanation: 'It provides OpenAI\'s models under Azure\'s enterprise contract and tooling.' },
        { question: 'A good reason to self-host is ___.', options: ['Strict air-gapped privacy / extreme volume', 'To avoid ML entirely', 'Faster prototyping always', 'Smaller teams'], answer: 0, explanation: 'Self-hosting fits strict privacy and large-scale workloads.' },
        { question: 'Cost is typically billed per ___.', options: ['Instance hour only', 'Tokens in + out (and sometimes cache)', 'Number of requests only', 'Bytes of network'], answer: 1, explanation: 'Most LLM APIs price per input and output tokens.' }
      ]
    },
    {
      id: 'mod-09',
      number: 9,
      title: 'MLOps & Deployment',
      topics: ['MLflow', 'CI/CD for ML', 'Docker and containers', 'model monitoring', 'A/B testing and canaries'],
      interviewQuestions: [
        { q: 'What is MLOps?', a: 'MLOps applies DevOps practices to the machine learning lifecycle: versioning data and models, automating training and deployment pipelines, monitoring in production, and enabling reproducibility and collaboration. It bridges data scientists and ops teams so models ship reliably and stay healthy.' },
        { q: 'What does MLflow provide?', a: 'MLflow is an open-source MLOps platform with four components: Tracking (experiments, params, metrics, artifacts), Projects (reproducible runs), Models (packaging/format), and Model Registry (versioning, stage transitions). It integrates with many frameworks and training/deployment backends.' },
        { q: 'Why containerize models with Docker?', a: 'Docker packages the model, its framework, Python deps, system libs, and serving code into an immutable image. This guarantees the same environment in dev, CI, and prod; simplifies GPU drivers and CUDA versions; and plugs into k8s, ECS, Cloud Run, etc., for scalable deployment.' },
        { q: 'What should you monitor in production ML?', a: 'Service metrics (latency, throughput, errors), data drift (input distribution shifts), prediction drift, model quality (when labels eventually arrive), feature/data quality, and business KPIs. Alert on breaches and maintain a feedback loop to trigger retraining or rollback.' },
        { q: 'Why canary and A/B test model releases?', a: 'Offline metrics do not always match online behavior. Canary releases send a small fraction of traffic to a new model and compare health metrics before full rollout. A/B tests measure business impact against the incumbent. Both limit blast radius and produce evidence for go/no-go decisions.' }
      ],
      mcqs: [
        { question: 'MLflow Tracking records ___.', options: ['Only logs', 'Params, metrics, artifacts, models', 'Only models', 'Only environment'], answer: 1, explanation: 'It captures the full experiment context per run.' },
        { question: 'Data drift refers to ___.', options: ['Server clocks drifting', 'Input feature distribution shifting over time', 'Disk corruption', 'A race condition'], answer: 1, explanation: 'Changes in production data vs training data degrade model quality.' },
        { question: 'Which is a canary deployment?', options: ['100% new model', 'Small % to new model first, then ramp', 'Only offline tests', 'Run only on staging'], answer: 1, explanation: 'Canary sends a slice of traffic to the candidate and monitors health.' },
        { question: 'Docker images are ___.', options: ['Mutable live envs', 'Immutable packaged environments', 'Network interfaces', 'Config files'], answer: 1, explanation: 'Containers run from immutable images for reproducibility.' },
        { question: 'Which is NOT typically part of MLOps?', options: ['Model registry', 'CI/CD for ML', 'Production monitoring', 'Writing the annual report'], answer: 3, explanation: 'Annual reports are not an MLOps concern; the others are core.' }
      ]
    }
  ]
}
