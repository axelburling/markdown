if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date;
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${now.getUTCMonth() + 1}.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'com.electron.markdown',
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: [
    'packages/**/dist/**',
  ],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
  },
  mac: {
    target: this.dmg,
    icon:  'buildResources/icon.icns',
  },
  dmg: {
    window: {
      width: 600,
      height: 150,
    }
  },
  win: {
    target: this.nsis,
    icon: 'buildResources/icon.icns'
  },
  nsis: {
    installerIcon: 'buildResources/icon.icns',
    uninstallerIcon: 'buildResources/icon.icns',
    oneClick: false,
    license: 'MIT',
    runAfterFinish: true,
  },
  linux: {
    target: this.pacman,
    icon: 'buildResources/icon.icns',
  },
  pacman: {
    compression: 'gz',
    icon: 'buildResources/icon.icns',
    desktop: true,
    packageName: 'markdown',
    maintainer: 'Axel Burling',
    description: 'This is a simple markdown editor for testing'
  },
  pkg: {
    welcome: 'Welcome to a simple Markdown editor',
    installLocation: '/Downloads',
    allowAnywhere: true,
    allowCurrentUserHome: true,
    allowRootDirectory: true,
    license: 'MIT',
    isRelocatable: true,
    isVersionChecked: true,
    overwriteAction: 'update',
  }
};

module.exports = config;
