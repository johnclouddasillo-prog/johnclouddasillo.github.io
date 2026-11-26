# Jerald Dasillo Portfolio

A Next.js portfolio: Jerald Dasillo (yardy), built with the App Router, JavaScript, React and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Add or change content

### Add a project

Open `data/projects.js` and add one object to the `projects` array:

```js
{
  title: "Project name",
  tag: "Project tag",
  desc: "Short project description.",
  image: "/images/project.jpg",
  video: "",
  links: [{ label: "View", href: "https://example.com" }],
}
```

An empty `image` value shows the built-in placeholder. Real links open in a new tab.

### Add a creative role

Open `data/roles.js` and add a role object with a unique `id`, a short `label`, a headline `verb`, a description, and project IDs. Add that role ID to the matching projects' `roles` lists in `data/projects.js`. The homepage selector and filtered work section use this data.

### Add a skill

Open `data/skills.js` and add the skill name to the array.

### Add a social link

Open `data/site.js` and add an object to `site.socials`:

```js
{ label: "Platform", href: "https://example.com/profile" }
```

### Add a whole section

1. Create a section component in `components/sections`.
2. Import it and add one object to `data/sections.js`:

```js
{ id: "new-section", label: "New", number: "05", component: NewSection }
```

The component should render a `<section id="new-section">`. The header and active-section highlighting update automatically.

The contact form is its own page at `/contact`; its handler remains at `/api/contact`.

### Change the colors

The main palette is in `tailwind.config.js` and `app/globals.css`. Update the matching hex values in both places.

## Contact form

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` to enable email delivery through Resend.

```text
RESEND_API_KEY=re_your_key_here
```

Without a key, submitting the form opens the visitor's email application using a `mailto:` link.
