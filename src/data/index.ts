import type { Project, ExperienceEntry, SkillGroup, EngineeringNote } from '../types';

export const projects: Project[] = [
  {
    id: 'hrms',
    name: 'HRMS — HR Management System',
    type: 'personal',
    visibility: 'public',
    category: ['Django', 'APIs', 'Database'],
    role: 'Backend Developer',
    duration: '3 months',
    status: 'completed',
    shortDescription:
      'Full-featured HR management backend with employee lifecycle management, payroll processing, attendance tracking, and role-based access control.',
    overview:
      'Built a comprehensive HRMS backend API for small-to-medium businesses. The system handles employee onboarding, leave management, attendance tracking, payroll generation, and administrative reporting — all exposed through a clean, versioned REST API.',
    problem:
      'Companies managing HR data in spreadsheets face inconsistencies, manual payroll errors, lack of audit trails, and no centralized access control. A structured backend with proper data modeling, business logic separation, and fine-grained permissions was needed.',
    contributions: [
      'Designed the full relational database schema: employees, departments, roles, attendance records, leave requests, payroll runs',
      'Developed REST APIs for employee CRUD, leave approval workflows, and payroll generation',
      'Implemented role-based access control (RBAC) with custom DRF permission classes',
      'Built a payroll calculation engine using the strategy pattern to handle deductions, taxes, and bonuses',
      'Designed attendance tracking with overtime calculation and daily summaries',
      'Integrated Celery for async email notifications on leave approvals and payroll slips',
      'Implemented audit logging for all sensitive operations using Django signals',
      'Wrote comprehensive tests with Pytest and factory_boy fixtures',
    ],
    technologies: [
      { name: 'Python', category: 'Language', usage: 'Primary language' },
      { name: 'Django', category: 'Framework', usage: 'Web framework, ORM, admin interface' },
      { name: 'Django REST Framework', category: 'Framework', usage: 'Serializers, viewsets, permissions' },
      { name: 'PostgreSQL', category: 'Database', usage: 'Primary relational data store' },
      { name: 'Redis', category: 'Caching', usage: 'Celery message broker and session cache' },
      { name: 'Celery', category: 'Background Processing', usage: 'Async email and report generation' },
      { name: 'JWT', category: 'Authentication', usage: 'Stateless access and refresh tokens' },
      { name: 'Pytest', category: 'Testing', usage: 'Unit and integration test suite' },
      { name: 'Docker', category: 'Infrastructure', usage: 'Containerized dev and deployment' },
    ],
    architecture: [
      'Client / Frontend',
      'REST API (Django REST Framework)',
      'Service Layer (business logic)',
      'PostgreSQL (primary data store)',
      'Redis + Celery (async tasks)',
      'Email Service (SMTP)',
    ],
    research: [
      {
        problem: 'Payroll calculation with varying deduction rules, tax brackets, and bonus logic',
        research: 'Evaluated hardcoded calculation logic vs. strategy pattern vs. rules engine (Drools-style)',
        options: [
          'Hardcode all rules in the Payroll model',
          'Strategy pattern: pluggable calculator classes per payroll component',
          'External rules engine',
        ],
        tradeoffs:
          'The strategy pattern adds a layer of abstraction but decouples deduction logic from the model — each component (tax, allowance, deduction) is independently testable and swappable without touching core model code.',
        decision:
          'Implemented strategy pattern. Each payroll component is a separate calculator class. New rules are added without modifying existing code.',
        result:
          'New deduction rules can be added without changing existing calculators, with each strategy tested independently.',
      },
    ],
    tags: ['Django', 'DRF', 'PostgreSQL', 'Celery', 'Redis', 'JWT', 'RBAC'],
  },
  {
    id: 'event-ticketing',
    name: 'Event Ticketing System API',
    type: 'personal',
    visibility: 'public',
    category: ['FastAPI', 'APIs', 'Database', 'Payments'],
    role: 'Backend Developer',
    duration: '2 months',
    status: 'completed',
    shortDescription:
      'High-performance async ticketing API with seat reservation, concurrent booking prevention, Stripe payments, and QR-code ticket delivery.',
    overview:
      'Designed and built a FastAPI-based event ticketing backend managing event creation, seat booking, payment flows, and QR ticket delivery. Designed to handle concurrent booking requests reliably without double-bookings.',
    problem:
      'Concurrent seat booking is a classic race condition problem — two users booking the same seat simultaneously leads to double-bookings, chargebacks, and customer disputes. The system needed to handle this at the database level, not in application code.',
    contributions: [
      'Designed relational schema for events, venues, seats, tickets, orders, and payment records',
      'Implemented optimistic locking with version columns to prevent seat double-booking under concurrency',
      'Used Redis TTL keys as pre-checks to reject duplicate requests before hitting the database',
      'Built Stripe integration with webhook handling, idempotency keys, and payment state machine',
      'Developed QR code generation for digital tickets with a separate validation endpoint',
      'Implemented a 10-minute seat hold with Redis expiry before confirmed payment',
      'Added async background tasks for email ticket delivery using FastAPI BackgroundTasks',
      'Built admin APIs for event management and daily sales reporting',
    ],
    technologies: [
      { name: 'Python', category: 'Language', usage: 'Primary language' },
      { name: 'FastAPI', category: 'Framework', usage: 'Async REST API framework with Pydantic validation' },
      { name: 'SQLAlchemy', category: 'ORM', usage: 'Async ORM with connection pooling' },
      { name: 'PostgreSQL', category: 'Database', usage: 'Primary data store with row-level locking' },
      { name: 'Redis', category: 'Caching', usage: 'Seat hold TTL keys and idempotency checks' },
      { name: 'Stripe', category: 'Payments', usage: 'Payment processing, webhooks, refunds' },
      { name: 'JWT', category: 'Authentication', usage: 'Bearer token auth for users and admins' },
      { name: 'Pytest', category: 'Testing', usage: 'Async test suite with test client' },
    ],
    architecture: [
      'Client',
      'FastAPI + Uvicorn (async API layer)',
      'Service Layer',
      'PostgreSQL (seats + orders)',
      'Redis (seat holds, idempotency)',
      'Stripe API (payments)',
    ],
    research: [
      {
        problem: 'Preventing double-booking under concurrent requests without serializing all requests',
        research: 'Evaluated pessimistic locking (SELECT FOR UPDATE), optimistic locking, and Redis distributed locks (Redlock)',
        options: [
          'Pessimistic locking: SELECT FOR UPDATE on seat rows',
          'Optimistic locking: version column + retry on conflict',
          'Redis distributed lock (Redlock algorithm)',
        ],
        tradeoffs:
          'Pessimistic locking serializes all concurrent requests to the same seat — safe but degrades under load. Optimistic locking fails fast and retries — better throughput when contention is low (typical for most seats). Redis lock adds a network hop but works across multiple workers.',
        decision:
          'Optimistic locking as primary concurrency control + Redis TTL key as a fast pre-check to reject clear duplicates before touching the DB.',
        result:
          'Concurrency tests confirmed that competing requests are resolved without creating duplicate seat reservations.',
      },
    ],
    tags: ['FastAPI', 'PostgreSQL', 'Redis', 'Stripe', 'Async', 'Payments'],
  },
  {
    id: 'auth-system',
    name: 'Authentication & Authorization System',
    type: 'personal',
    visibility: 'public',
    category: ['Django', 'APIs', 'Authentication'],
    role: 'Backend Developer',
    duration: '5 weeks',
    status: 'maintained',
    shortDescription:
      'Production-grade auth backend with JWT access/refresh tokens, refresh token rotation, OAuth2 social login, RBAC, and multi-device session management.',
    overview:
      'Built a reusable authentication backend covering the full auth surface: JWT token lifecycle, refresh token rotation with family tracking, OAuth2 social login (Google, GitHub), fine-grained RBAC, multi-device session tracking, and brute-force protection.',
    problem:
      'Authentication is the most security-sensitive component of any system. Rolling custom auth without a clear security model leads to vulnerable token management, silent session hijacking, and hard-to-audit access patterns.',
    contributions: [
      'Designed JWT access/refresh token architecture with short-lived access tokens (15min)',
      'Implemented refresh token rotation with token family tracking — reuse of a rotated token invalidates the entire family',
      'Added OAuth2 integration for Google and GitHub social login',
      'Built fine-grained RBAC with permission scopes per resource and action',
      'Implemented multi-device session tracking with force-logout by device',
      'Added sliding-window rate limiting on auth endpoints using Redis counters',
      'Designed time-limited password reset flow with secure token hashing',
      'Wrote security-focused test suite covering token edge cases and attack scenarios',
    ],
    technologies: [
      { name: 'Python', category: 'Language', usage: 'Primary language' },
      { name: 'Django', category: 'Framework', usage: 'Core backend framework' },
      { name: 'Django REST Framework', category: 'Framework', usage: 'API endpoints and custom auth backends' },
      { name: 'JWT', category: 'Authentication', usage: 'Access and refresh token lifecycle' },
      { name: 'OAuth2', category: 'Authentication', usage: 'Social login via Google and GitHub' },
      { name: 'Redis', category: 'Caching', usage: 'Token blacklist, rate limit counters, session storage' },
      { name: 'PostgreSQL', category: 'Database', usage: 'User, session, and permission storage' },
    ],
    architecture: [
      'Client',
      'Auth API (DRF)',
      'Token Service (JWT + rotation)',
      'PostgreSQL (users, sessions, permissions)',
      'Redis (blacklist, rate limits)',
      'OAuth Providers (Google, GitHub)',
    ],
    research: [
      {
        problem: 'How to detect and respond to stolen refresh token reuse without disrupting legitimate users',
        research: 'Studied IETF OAuth 2.0 Security Best Current Practice (RFC 9700), analyzed token family detection patterns',
        options: [
          'No rotation — long-lived refresh tokens (simple but insecure)',
          'Rotation without family tracking — each RT replaced, old invalidated',
          'Rotation with token families — reuse detected, entire family invalidated',
        ],
        tradeoffs:
          'Token family tracking detects theft at the cost of implementation complexity. If a stolen RT is used, the legitimate user gets logged out — but the attacker is also blocked. Better security, minor UX friction in rare theft cases.',
        decision:
          'Implemented token families. Stolen RT reuse triggers family invalidation and forces logout across all sessions belonging to that family.',
        result: 'Compliant with OAuth 2.0 security best practices. No silent token reuse possible.',
      },
    ],
    tags: ['Django', 'JWT', 'OAuth2', 'RBAC', 'Security', 'Redis'],
  },
  {
    id: 'ecom-api',
    name: 'E-Commerce Platform Backend',
    type: 'professional',
    visibility: 'professional-confidential',
    category: ['Django', 'APIs', 'Database', 'Performance Optimization'],
    role: 'Backend Developer',
    duration: '6 months',
    status: 'completed',
    shortDescription:
      'High-traffic e-commerce backend — resolved critical N+1 query problems, redesigned order state machine, and integrated payment gateway with webhook idempotency.',
    overview:
      'Contributed to the backend of a commercial e-commerce platform. Primary focus was identifying and resolving performance bottlenecks, redesigning the order processing pipeline, and improving reliability of payment integrations.',
    problem:
      'The existing API had N+1 query problems that slowed product listing requests. Additionally, the order processing pipeline lacked explicit state management, causing order status inconsistencies.',
    contributions: [
      'Profiled and identified N+1 query patterns in product listing and order APIs using Django Debug Toolbar',
      'Resolved N+1 issues with strategic select_related and prefetch_related usage',
      'Added database indexes on high-traffic query columns (category, status, user, created_at)',
      'Redesigned order pipeline as an explicit state machine with guards for valid transitions',
      'Implemented cart API with stock reservation and Redis-based cart expiry',
      'Added Redis caching for product catalog with cache invalidation on product updates',
      'Integrated payment gateway webhooks with idempotency key handling to prevent duplicate processing',
      'Implemented Celery tasks for inventory low-stock notifications and daily order reports',
    ],
    technologies: [
      { name: 'Python', category: 'Language', usage: 'Primary language' },
      { name: 'Django', category: 'Framework', usage: 'Web framework and ORM' },
      { name: 'Django REST Framework', category: 'Framework', usage: 'API development' },
      { name: 'PostgreSQL', category: 'Database', usage: 'Primary data store with custom indexes' },
      { name: 'Redis', category: 'Caching', usage: 'Product catalog cache and cart storage' },
      { name: 'Celery', category: 'Background Processing', usage: 'Notifications and reports' },
    ],
    architecture: [
      'Client',
      'REST API (DRF)',
      'Order State Machine',
      'PostgreSQL (products, orders, inventory)',
      'Redis (catalog cache, cart, stock)',
      'Payment Gateway (webhooks)',
      'Celery Workers',
    ],
    research: [
      {
        problem: 'Improving slow read-heavy endpoints without masking inefficient database access',
        research:
          'Compared eager loading, targeted indexing, and response caching while profiling ORM query behavior.',
        options: [
          'Cache complete responses without changing query behavior',
          'Add broad indexes to frequently queried tables',
          'Fix relationship loading first, then add targeted indexes and caching',
        ],
        tradeoffs:
          'Caching can reduce repeated work but introduces invalidation complexity. Indexes improve specific lookups but increase write and storage cost. Correcting ORM access patterns addresses the underlying query amplification.',
        decision:
          'Correct relationship loading first, then apply targeted indexes and caching only where profiling justified them.',
        result:
          'Product-listing requests became more predictable while preserving clear cache invalidation boundaries.',
      },
    ],
    industry: 'E-Commerce / Retail',
    tags: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'Performance'],
  },
  {
    id: 'inventory',
    name: 'Inventory Management System API',
    type: 'personal',
    visibility: 'public',
    category: ['Django', 'APIs', 'Database'],
    role: 'Backend Developer',
    duration: '6 weeks',
    status: 'completed',
    shortDescription:
      'Multi-warehouse inventory backend with stock tracking, reorder alerts, supplier management, and transaction audit log.',
    overview:
      'Built a backend inventory management system for businesses tracking stock across multiple warehouses. Features include real-time stock levels, automatic reorder triggers, supplier management, and a full transaction audit log.',
    problem:
      'Businesses tracking inventory in spreadsheets lose visibility into stock levels across locations, miss reorder points, and have no audit trail for stock movements. A system that tracks every stock transaction and triggers alerts was needed.',
    contributions: [
      'Designed normalized database schema for products, variants, warehouses, and stock transactions',
      'Implemented stock movement tracking with debit/credit transaction ledger pattern',
      'Built reorder alert system using Celery Beat for scheduled stock checks',
      'Developed supplier management APIs with purchase order generation',
      'Added warehouse transfer workflow with stock reservation during transit',
      'Implemented full audit log for all inventory operations using Django signals',
      'Built reporting APIs for stock valuation (FIFO), turnover, and movement history',
    ],
    technologies: [
      { name: 'Python', category: 'Language', usage: 'Primary language' },
      { name: 'Django', category: 'Framework', usage: 'Web framework and ORM' },
      { name: 'Django REST Framework', category: 'Framework', usage: 'REST APIs' },
      { name: 'PostgreSQL', category: 'Database', usage: 'Primary data store with JSONB for product attributes' },
      { name: 'Celery + Beat', category: 'Background Processing', usage: 'Scheduled reorder checks' },
      { name: 'Redis', category: 'Caching', usage: 'Stock level caching and Celery broker' },
    ],
    architecture: [
      'Client',
      'REST API (DRF)',
      'Inventory Service Layer',
      'Transaction Ledger (PostgreSQL)',
      'Redis + Celery Beat',
      'Email / Notification Service',
    ],
    research: [
      {
        problem: 'Maintaining an auditable stock balance across warehouses and in-transit transfers',
        research:
          'Compared mutable quantity fields, append-only stock transactions, and a full event-sourcing model.',
        options: [
          'Store only the latest quantity on each warehouse item',
          'Use an append-only debit and credit transaction ledger',
          'Adopt full event sourcing for all inventory state',
        ],
        tradeoffs:
          'A mutable balance is simple but weak for audits. Full event sourcing provides strong history but adds operational complexity. A transaction ledger preserves traceability while keeping the read model straightforward.',
        decision:
          'Use a stock transaction ledger as the source of movement history, with derived balances optimized for reads.',
        result:
          'Every adjustment and transfer remains traceable without introducing a full event-sourcing platform.',
      },
    ],
    tags: ['Django', 'DRF', 'PostgreSQL', 'Celery', 'Redis', 'Audit Log'],
  },
  {
    id: 'mobile-backend',
    name: 'Mobile App Backend API',
    type: 'professional',
    visibility: 'professional-confidential',
    category: ['FastAPI', 'APIs', 'Authentication'],
    role: 'Backend Developer',
    duration: '4 months',
    status: 'completed',
    shortDescription:
      'FastAPI backend powering a mobile application with push notifications, real-time features, JWT auth, and a versioned REST API.',
    overview:
      'Worked on the backend API for a mobile application as part of a professional engagement. My contribution covered user management, content APIs, push notification delivery, and API versioning for mobile client compatibility.',
    problem:
      'Mobile apps require APIs optimized for low-latency responses, efficient data payloads, and robust handling of intermittent connectivity. The system also needed to support API versioning to allow gradual mobile client updates without breaking older app versions.',
    contributions: [
      'Designed versioned REST API (v1/v2) allowing parallel support for old and new mobile clients',
      'Implemented push notification delivery via FCM with retry logic for failed deliveries',
      'Built efficient list endpoints with cursor-based pagination for mobile feed performance',
      'Implemented offline-tolerant sync endpoints using last-sync timestamps',
      'Added request/response compression for bandwidth-sensitive mobile clients',
      'Designed notification preference center for per-user notification settings',
      'Implemented file upload APIs for profile images with S3 storage and CDN',
    ],
    technologies: [
      { name: 'Python', category: 'Language', usage: 'Primary language' },
      { name: 'FastAPI', category: 'Framework', usage: 'Async API framework' },
      { name: 'PostgreSQL', category: 'Database', usage: 'Primary data store' },
      { name: 'Redis', category: 'Caching', usage: 'User session data and notification dedup' },
      { name: 'AWS S3', category: 'Storage', usage: 'File and image storage with presigned URLs' },
      { name: 'FCM', category: 'Push Notifications', usage: 'Firebase push notification delivery' },
      { name: 'JWT', category: 'Authentication', usage: 'Mobile auth with refresh token rotation' },
    ],
    architecture: [
      'Mobile Client (iOS / Android)',
      'FastAPI (versioned REST API)',
      'Service Layer',
      'PostgreSQL',
      'Redis (sessions, dedup)',
      'AWS S3 (storage)',
      'FCM (push notifications)',
    ],
    research: [
      {
        problem: 'Evolving mobile APIs without forcing all installed clients to upgrade at once',
        research:
          'Reviewed URL, header, and media-type versioning alongside deprecation and compatibility strategies.',
        options: [
          'Release breaking changes on a single unversioned API',
          'Version through custom request headers',
          'Expose explicit URL versions with a documented support window',
        ],
        tradeoffs:
          'Header versioning keeps URLs clean but is less visible to clients and tooling. URL versioning duplicates some routing, but makes compatibility behavior explicit and easier to support across mobile release cycles.',
        decision:
          'Use explicit URL versioning and preserve older contracts during a defined migration period.',
        result:
          'Mobile clients can adopt backend changes gradually without exposing private release plans or product details.',
      },
    ],
    industry: 'Mobile / Consumer App',
    tags: ['FastAPI', 'PostgreSQL', 'Redis', 'AWS', 'FCM', 'Async'],
  },
];

export const experiences: ExperienceEntry[] = [
  {
    id: 'exp1',
    role: 'Python Backend Developer',
    company: 'Tech Company (Confidential)',
    duration: '2023 — Present',
    type: 'fulltime',
    technologies: ['Python', 'Django', 'DRF', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'AWS'],
    responsibilities: [
      'Designed and developed REST APIs for multiple business-critical applications',
      'Led backend architecture decisions for new service features',
      'Optimized database queries and improved API performance across existing services',
      'Implemented authentication, authorization, and security features',
      'Integrated third-party APIs and payment gateways',
      'Maintained CI/CD pipelines and deployment workflows with GitHub Actions',
      'Wrote technical documentation, API specs, and engineering RFCs',
      'Debugged production issues and performed root-cause analysis',
    ],
    highlights: [
      'Improved API response times through query profiling and optimization',
      'Improved background processing reliability with event-driven workflows',
      'Introduced structured API error handling that cut client-reported integration bugs',
      'Designed a reusable authentication module adopted across multiple internal services',
    ],
  },
  {
    id: 'exp2',
    role: 'Backend Developer (Freelance)',
    company: 'Independent / Upwork',
    duration: '2022 — 2023',
    type: 'freelance',
    technologies: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Docker', 'AWS'],
    responsibilities: [
      'Delivered backend systems for startup and SMB clients on fixed-scope contracts',
      'Built RESTful APIs for mobile and web client applications',
      'Designed database schemas for various business domains',
      'Integrated third-party APIs including payment gateways, SMS providers, and email services',
      'Deployed applications to cloud infrastructure (AWS EC2, RDS)',
      'Provided technical consultation on backend architecture decisions',
    ],
    highlights: [
      'Delivered 8+ backend projects across e-commerce, HR, and services domains',
      'Maintained strong client satisfaction with clear, consistent technical communication',
      'Built reusable project scaffolding templates for faster onboarding',
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming Language',
    skills: [
      { name: 'Python', detail: '3+ years — primary language across all projects' },
    ],
  },
  {
    category: 'Backend Frameworks',
    skills: [
      { name: 'Django', detail: 'ORM, admin, signals, middleware, management commands' },
      { name: 'Django REST Framework', detail: 'Serializers, viewsets, routers, custom permissions, throttling' },
      { name: 'FastAPI', detail: 'Async APIs, dependency injection, Pydantic v2 validation' },
      { name: 'Flask', detail: 'Lightweight APIs and microservices' },
    ],
  },
  {
    category: 'API Development',
    skills: [
      { name: 'REST API Design', detail: 'Resource modeling, versioning, pagination, filtering, HATEOAS' },
      { name: 'JWT Authentication', detail: 'Access/refresh lifecycle, rotation, blacklisting, token families' },
      { name: 'OAuth2', detail: 'Authorization code flow, social login, scopes' },
      { name: 'Webhooks', detail: 'Inbound/outbound handling, idempotency keys, signature verification' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'PostgreSQL', detail: 'Schema design, indexing strategy, query optimization, migrations' },
      { name: 'SQL', detail: 'Complex queries, window functions, CTEs, aggregations' },
      { name: 'Redis', detail: 'Caching, pub/sub, distributed locks, TTL-based patterns' },
    ],
  },
  {
    category: 'Background Processing',
    skills: [
      { name: 'Celery', detail: 'Task queues, Beat scheduling, retry strategies, Flower monitoring' },
      { name: 'Async Python', detail: 'asyncio, async/await, FastAPI BackgroundTasks, aiohttp' },
    ],
  },
  {
    category: 'Infrastructure & DevOps',
    skills: [
      { name: 'Docker', detail: 'Containerization, docker-compose, multi-stage builds' },
      { name: 'AWS', detail: 'EC2, S3 + presigned URLs, RDS, ElastiCache, IAM' },
      { name: 'Linux', detail: 'Server management, shell scripting, systemd, cron' },
      { name: 'CI/CD', detail: 'GitHub Actions — automated test and deploy pipelines' },
    ],
  },
  {
    category: 'Testing & Tools',
    skills: [
      { name: 'Pytest', detail: 'Unit and integration tests, fixtures, parametrize, mocking, coverage' },
      { name: 'Postman', detail: 'API testing, collection automation, environment variables' },
      { name: 'Git / GitHub', detail: 'Branching workflows, PR reviews, code collaboration' },
    ],
  },
];

export const engineeringNotes: EngineeringNote[] = [
  {
    id: 'note1',
    title: 'Django ORM: select_related vs prefetch_related and the N+1 Problem',
    category: 'Database',
    summary:
      'A practical breakdown of when and why N+1 queries appear in Django, how to detect them, and exactly when to reach for select_related vs prefetch_related — with query count comparisons.',
    technologies: ['Django', 'PostgreSQL', 'ORM'],
    date: '2024-10',
    readTime: '8 min',
  },
  {
    id: 'note2',
    title: 'Designing Idempotent REST APIs',
    category: 'API Design',
    summary:
      'How to design endpoints that are safe to retry — covering idempotency keys, at-least-once delivery, payment webhook deduplication, and the difference between idempotent and safe HTTP methods.',
    technologies: ['REST API', 'Python', 'Django'],
    date: '2024-09',
    readTime: '6 min',
  },
  {
    id: 'note3',
    title: 'JWT Security: Refresh Token Rotation and Family Tracking',
    category: 'Authentication',
    summary:
      'Why long-lived refresh tokens are a security risk, how token rotation works, and how token family tracking detects silent token theft — based on IETF OAuth 2.0 Security BCP.',
    technologies: ['JWT', 'OAuth2', 'Security'],
    date: '2024-08',
    readTime: '10 min',
  },
  {
    id: 'note4',
    title: 'Redis Beyond Caching: Distributed Locks and Rate Limiting',
    category: 'Backend',
    summary:
      'Practical Redis patterns: implementing distributed locks with Lua scripts for atomicity, sliding window rate limiting without external libraries, and pub/sub for lightweight event notifications.',
    technologies: ['Redis', 'Python', 'Distributed Systems'],
    date: '2024-07',
    readTime: '7 min',
  },
  {
    id: 'note5',
    title: 'Celery in Production: Reliability Patterns and Failure Recovery',
    category: 'Backend',
    summary:
      'Running Celery reliably — task acknowledgment timing, exponential backoff retry strategies, handling database connection drops in workers, and monitoring with Flower.',
    technologies: ['Celery', 'Redis', 'Django'],
    date: '2024-06',
    readTime: '9 min',
  },
  {
    id: 'note6',
    title: 'FastAPI Async: When It Actually Helps (and When It Doesn\'t)',
    category: 'Performance',
    summary:
      'Honest benchmarks on when async FastAPI improves throughput vs. adds complexity with no benefit — and the specific patterns (I/O-bound vs CPU-bound) that determine which approach to use.',
    technologies: ['FastAPI', 'Async Python', 'Performance'],
    date: '2024-05',
    readTime: '8 min',
  },
];
