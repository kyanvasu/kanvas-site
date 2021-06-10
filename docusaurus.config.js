/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Kanvas | Open Source Smart Code Solution',
  tagline: 'Dinosaurs are cool',
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
          position: 'right'
        }
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()}Kanvas, made with <3 by MCTEKK S.R.L`,
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
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
      },
    ],
  ],
};
