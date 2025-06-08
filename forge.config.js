const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { default: VitePlugin } = require('@electron-forge/plugin-vite');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: './src/images/nature',
    win32metadata: {
      CompanyName: 'Han',
      FileDescription: 'A logAnalyer2 tool built with Electron and Vite.',
      ProductName: 'LogAnalyzer2',
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'LogAnalyzer2',
        authors: 'Han',
        description: 'A logAnalyer2 tool built with Electron and Vite.',
        exe: 'LogAnalyzer2.exe',
        setupExe: 'LogAnalyzer2Setup.exe',
        setupIcon: './src/images/nature.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux', 'win32'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'src/main/main.ts',
          config: 'vite.config.mts',
        },
        {
          entry: 'src/main/preload.ts',
          config: 'vite.config.mts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.mts'
        }
      ]
    }),
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
