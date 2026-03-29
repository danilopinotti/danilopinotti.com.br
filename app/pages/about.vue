<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 pt-1 pb-12 mx-auto">
      <SharedBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'About Me', icon: 'heroicons:user-circle' }]" />

      <div class="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.9fr)] gap-8 items-start">
        <div>
          <div class="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
            <Icon name="heroicons:cpu-chip" size="16" />
            Senior Backend Developer and Software Architect
          </div>

          <h1 class="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            I design backend systems built for scale, resilience, and critical operations.
          </h1>

          <p class="mt-5 text-lg leading-8 text-gray-600 max-w-3xl">
            I am Danilo Pinotti, a Senior Backend Developer and Software Architect with more than 10 years of experience building web applications, distributed systems, and critical software for finance, retail, education, and IoT.
          </p>

          <p class="mt-4 text-base leading-7 text-gray-600 max-w-3xl">
            My work is centered on backend engineering, architecture evolution, automated testing, observability, payment integrations, and long-term maintainability. I have spent most of my career modernizing production systems, improving reliability, and helping teams ship with more confidence.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <a href="https://github.com/danilopinotti" target="_blank" class="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <Icon name="fa6-brands:github" size="18" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/danilopinotti/" target="_blank" class="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <Icon name="fa6-brands:linkedin" size="18" />
              LinkedIn
            </a>
            <NuxtLink to="/presentations" class="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 transition-colors">
              <Icon name="heroicons:presentation-chart-line" size="18" />
              View Presentations
            </NuxtLink>
          </div>
        </div>

        <aside class="rounded-3xl border border-gray-100 bg-white shadow-sm p-6">
          <img
            src="/images/authors/danilo-pinotti.png"
            alt="Danilo Pinotti"
            class="w-24 h-24 rounded-2xl object-cover object-center border border-gray-100"
          />

          <h2 class="mt-4 text-xl font-bold text-gray-900">At a glance</h2>

          <ul class="mt-4 space-y-3 text-sm text-gray-600">
            <li class="flex gap-3">
              <Icon name="heroicons:briefcase" size="18" class="text-sky-600 shrink-0 mt-0.5" />
              <span>10+ years building scalable and high-reliability web systems.</span>
            </li>
            <li class="flex gap-3">
              <Icon name="heroicons:building-library" size="18" class="text-sky-600 shrink-0 mt-0.5" />
              <span>Strong experience in financial systems, payment flows, and transactional safety.</span>
            </li>
            <li class="flex gap-3">
              <Icon name="heroicons:circle-stack" size="18" class="text-sky-600 shrink-0 mt-0.5" />
              <span>Hands-on with PHP, HyperF, Laravel, PostgreSQL, Redis, and Docker.</span>
            </li>
            <li class="flex gap-3">
              <Icon name="heroicons:chart-bar-square" size="18" class="text-sky-600 shrink-0 mt-0.5" />
              <span>Observability practices using OpenTelemetry, Prometheus, Grafana, and Loki.</span>
            </li>
            <li class="flex gap-3">
              <Icon name="heroicons:users" size="18" class="text-sky-600 shrink-0 mt-0.5" />
              <span>Background in technical leadership, mentoring, architecture standards, cross-team collaboration, and community building.</span>
            </li>
          </ul>
        </aside>
      </div>

      <div class="mt-12 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <article class="xl:col-span-2 rounded-3xl border border-gray-100 bg-white shadow-sm p-6 md:p-8">
          <h2 class="text-2xl font-bold text-gray-900">What I focus on</h2>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="rounded-2xl bg-slate-50 p-5">
              <h3 class="font-semibold text-gray-900">Architecture and modernization</h3>
              <p class="mt-2 text-sm leading-6 text-gray-600">
                I work on evolving existing systems without losing control of production risk, especially in legacy or high-impact environments.
              </p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <h3 class="font-semibold text-gray-900">Critical backend systems</h3>
              <p class="mt-2 text-sm leading-6 text-gray-600">
                I design and implement services for high transaction volume, secure integrations, idempotent operations, and operational resilience.
              </p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <h3 class="font-semibold text-gray-900">Quality and reliability</h3>
              <p class="mt-2 text-sm leading-6 text-gray-600">
                Automated tests, observability, and production feedback loops are central to how I improve confidence and maintainability.
              </p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-5">
              <h3 class="font-semibold text-gray-900">Technical leadership</h3>
              <p class="mt-2 text-sm leading-6 text-gray-600">
                I have led teams, supported junior developers, defined standards, and helped connect engineering decisions to business constraints.
              </p>
            </div>
          </div>
        </article>

        <article class="rounded-3xl border border-gray-100 bg-white shadow-sm p-6 md:p-8">
          <h2 class="text-2xl font-bold text-gray-900">Core stack</h2>
          <div class="mt-5 flex flex-wrap gap-2">
            <span v-for="item in stack" :key="item" class="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700">
              {{ item }}
            </span>
          </div>
        </article>
      </div>

      <div class="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <article class="rounded-3xl border border-gray-100 bg-white shadow-sm p-6 md:p-8">
          <h2 class="text-2xl font-bold text-gray-900">Experience highlights</h2>
          <div class="mt-5 space-y-5">
            <div v-for="item in highlights" :key="item.title" class="border-l-2 border-sky-100 pl-4">
              <h3 class="font-semibold text-gray-900">{{ item.title }}</h3>
              <p class="text-sm text-sky-700 font-medium mt-1">{{ item.period }}</p>
              <p class="mt-2 text-sm leading-6 text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </article>

        <article class="rounded-3xl border border-gray-100 bg-white shadow-sm p-6 md:p-8">
          <h2 class="text-2xl font-bold text-gray-900">Community and knowledge sharing</h2>
          <p class="mt-4 text-base leading-7 text-gray-600">
            Beyond delivery work, I actively share what I learn through technical presentations, open source projects, and community involvement. I am part of the DevPR community and coordinate Ingá.php in Maringa, a DevPR Meetup group focused on technology and PHP. I value practical knowledge exchange that helps other developers build better software.
          </p>

          <p class="mt-4 text-base leading-7 text-gray-600">
            You can follow the group's meetups and events at
            <a href="https://meetup.com/developerparana" target="_blank" class="font-semibold text-sky-700 hover:text-sky-800 hover:underline transition-colors">
              meetup.com/developerparana
            </a>.
          </p>

          <div class="mt-6 rounded-2xl bg-sky-50 border border-sky-100 p-5">
            <h3 class="font-semibold text-gray-900">Explore more</h3>
            <div class="mt-4 flex flex-wrap gap-3">
              <NuxtLink to="/" class="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2 font-semibold text-sky-700 hover:bg-sky-100 transition-colors">
                <Icon name="heroicons:newspaper" size="18" />
                Read the blog
              </NuxtLink>
              <NuxtLink to="/presentations" class="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2 font-semibold text-sky-700 hover:bg-sky-100 transition-colors">
                <Icon name="heroicons:presentation-chart-bar" size="18" />
                Browse talks
              </NuxtLink>
              <NuxtLink to="/tools" class="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2 font-semibold text-sky-700 hover:bg-sky-100 transition-colors">
                <Icon name="heroicons:wrench-screwdriver" size="18" />
                Try the tools
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const { url: siteUrl } = useSiteConfig()
const pageUrl = `${siteUrl}/about`
const title = 'About Me'
const description = 'About Danilo Pinotti, Senior Backend Developer and Software Architect with experience in PHP, HyperF, microservices, distributed systems, payments, and high-reliability web applications.'

const stack = [
  'PHP',
  'HyperF',
  'Laravel',
  'PostgreSQL',
  'Redis',
  'Docker',
  'AWS',
  'OpenTelemetry',
  'Prometheus',
  'Grafana',
]

const highlights = [
  {
    title: 'Backend Developer at PicPay',
    period: 'Jun 2025 - Present',
    description: 'Working with PHP, HyperF, microservices, and distributed systems in financial products, with focus on scalability, reliability, and critical backend operations.',
  },
  {
    title: 'Senior Backend Developer at Z.ro Bank',
    period: '2023 - Jun 2025',
    description: 'Built scalable financial systems for critical web applications, with focus on modernization, automated testing, integrations, idempotency, and distributed architecture.',
  },
  {
    title: 'Tech Lead at Lets Sistemas',
    period: '2022 - 2025',
    description: 'Led technical decisions, trained team members, and worked across finance, education, and retail projects with strong focus on performance, architecture, and delivery quality.',
  },
  {
    title: 'Senior Full Stack Developer at N1 Digital',
    period: '2022 - 2023',
    description: 'Worked on custom systems, AWS infrastructure, ecommerce integrations, and internal architecture decisions for scalable products and APIs.',
  },
  {
    title: 'Tech Lead at Lets Sistemas | Saly',
    period: '2017 - 2020',
    description: 'Owned application development, code quality, security, deployment, versioning, and team coordination, with hands-on work in AWS, Laravel, PostgreSQL, Redis, and Docker.',
  },
]

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: 'Danilo Pinotti, about Danilo Pinotti, senior backend developer, software architect, PHP, HyperF, microservices, distributed systems, payment integrations, observability, Laravel, PostgreSQL' },
    { property: 'og:title', content: `${title} | Danilo Pinotti` },
    { property: 'og:description', content: description },
    { property: 'og:url', content: pageUrl },
    { name: 'twitter:title', content: `${title} | Danilo Pinotti` },
    { name: 'twitter:description', content: description },
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Me',
        description,
        url: pageUrl,
        mainEntity: {
          '@type': 'Person',
          name: 'Danilo Pinotti',
          url: siteUrl,
          jobTitle: 'Senior Backend Developer and Software Architect',
          description,
          sameAs: [
            'https://github.com/danilopinotti',
            'https://www.linkedin.com/in/danilopinotti/',
            'https://twitter.com/danilopinotti',
          ],
        },
      }),
    },
  ],
})
</script>
