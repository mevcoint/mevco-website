# MEVCO Website — employee-editable CMS edition

## Recommended platform

**Pages CMS** (https://app.pagescms.org) + a **company-controlled GitHub repository** + **Netlify Git-connected hosting**.

Pages CMS is a separate editor website: employees do **not** edit the live site by visiting `/admin`. They sign into Pages CMS and edit your repository. Your company can invite editor accounts according to Pages CMS's current collaboration offerings and permissions.

## One-time setup (company owner / administrator)

1. Create or use a **company-controlled GitHub** account or organization. Create a repository `mevco-website` (private if supported by your selected Pages CMS plan). Upload the **contents of this folder** to its root, including the hidden `.pages.yml` file. Upload only public-approved materials; everything deployed becomes publicly accessible.
2. Open https://app.pagescms.org/ and sign in. Authorize the Pages CMS GitHub App for the company repository and select `mevco-website`. The included `.pages.yml` should show **Company settings**, **Website pages** (seven editable pages), and **Authorized brands**.
3. In Netlify, create a **new Git-connected site** from that same repository (or connect the existing site to Git). Publish directory: repository root; build command: blank. Don't rely on repeated manual drag-and-drop deploys; those won't automatically publish edits made through Pages CMS.
4. In Netlify, verify Forms: `manufacturer-inquiry`, notifications and a real test submission. Make sure no custom domain is connected until review is complete. Connect `mevcoint.com` only after company approval and domain ownership are confirmed.
5. Invite employees with least-privilege permissions. Some Pages CMS collaboration and role-management features may require a paid plan or GitHub repository access; confirm current plan details. Do not share a single admin password.

## Employees: editing without code

1. Log in at https://app.pagescms.org/ (not the public MEVCO site).
2. Choose `mevco-website` and open **Website pages → Home** to edit headings and copy; use **Company settings** for the logo, tagline and contact details.
3. To add images, use the image field. It uploads to `media/` and stores a public `/media/...` URL. Home has an optional hero photo. Leaving it blank keeps the blue-green abstract design.
4. To add a brand: open **Authorized brands**, add a row with name, a unique lowercase `slug` (for example `example-brand`), summary, description, category and permitted visuals. Keep `published` OFF until the manufacturer authorizes publication. Turn on `published` only for confirmed partners.
5. Click Save in Pages CMS. It commits to GitHub, which triggers Netlify deployment when connected. Changes will be visible after deployment completes. Check desktop and mobile.

## Previewing the downloaded package

Run `python3 -m http.server 8000` inside the folder, then visit http://localhost:8000. A local server is necessary for the CMS JSON fetches. Opening HTML directly (`file://`) shows the built-in default text, but dynamic portfolio/content loading can fail.

## Editorial and technical safety

- `content/brands.json` starts EMPTY on purpose. Never imply unconfirmed manufacturer partnerships.
- `content/site.json` leaves contact email and phone blank. Add only official active addresses and numbers. Your corporate contact data becomes publicly visible.
- JSON fields are displayed using textContent (not raw HTML) to prevent editors accidentally inserting executable HTML.
- Product photos and logos require proper permission; comply with relevant healthcare marketing, legal and privacy requirements.
- The company profile and privacy notice should be reviewed by counsel before launch.
- Contact form handling still requires testing and notification setup at Netlify; Pages CMS does not manage form messages.
- Advanced design/layout changes still require code edits. The CMS edits content, pictures and brand listings.
- The public content data in `content/*.json` is visible to anyone browsing the deployed site. Keep private business plans, unannounced product terms, and sensitive information OUT of CMS files.
- Creating and deleting top-level pages is not supported through this fixed-layout version. Contact a developer for structural changes.

## Testing changes

Edit `content/pages/index.json` → `h1_01`, refresh the homepage on a local server. Edit `content/brands.json` by adding a brand with `published: true`, visit `/brands.html` and then click that brand to see `/brand.html?slug=...`. Restore unapproved demos to unpublished before publishing.
