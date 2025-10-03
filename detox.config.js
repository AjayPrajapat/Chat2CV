/**
 * Basic Detox configuration scaffold. Expand when wiring E2E tests.
 */
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  apps: {
    'ios.debug': {
      type: 'ios.app',
      build: 'xcodebuild -workspace ios/Chat2CV.xcworkspace -scheme Chat2CV -configuration Debug -sdk iphonesimulator',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/Chat2CV.app'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: { type: 'iPhone 15' }
    }
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    }
  }
};
