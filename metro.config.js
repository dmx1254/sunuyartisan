const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const config = getDefaultConfig(__dirname);

// Combinez les deux configurations en une seule exportation
module.exports = wrapWithReanimatedMetroConfig(
  withNativeWind(config, { input: "./app/global.css" })
);
