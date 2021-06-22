/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Kanvas',
  tagline: 'Open Source Smart Code Solution',
  url: 'https://kanvas.dev/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'kyanvasu',
  projectName: 'kanvas-documentation',
  plugins: ['docusaurus-plugin-sass'],
  themeConfig: {
    colorMode: {
      disableSwitch: true
    },
    navbar: {
      logo: {
        alt: 'Kanvas',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'right',
          label: 'Documentation',
        },
        {
          label: 'GitHub',
          position: 'right',
					href: 'https://github.com/kyanvasu',
        }
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Kanvas, made with 💙 by MCTEKK S.R.L`,
      links: [
        {
          items: [
            {
              //Renders the html pass-through instead of a simple link
              html: `
                  <a href="https://vercel.com/?utm_source=kanvas&utm_campaign=oss" target="_blank" rel="noreferrer noopener" class="vercel-banner" aria-label="Powered by Vercel">
                    <img src="https://mc-canvas.s3.amazonaws.com/powered-by-vercel.svg" alt="Powered by Vercel" />
                  </a>
                `,
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/kyanvasu/kanvas-site/tree/main/',
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      },
    ],
  ],
};
