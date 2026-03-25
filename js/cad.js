(function () {
  const presets = {
    residential: { floors: 2, rooms: 10, length: 7.2, width: 6.8, height: 3.4, basement: 0 },
    apartments: { floors: 8, rooms: 40, length: 7.4, width: 6.1, height: 3.2, basement: 1 },
    commercial: { floors: 6, rooms: 24, length: 9.5, width: 8.2, height: 3.8, basement: 1 },
    mixed_use: { floors: 12, rooms: 54, length: 8.8, width: 7.5, height: 3.7, basement: 2 },
    industrial: { floors: 1, rooms: 6, length: 18, width: 14, height: 8, basement: 0 },
    hospitality: { floors: 9, rooms: 80, length: 6.8, width: 5.8, height: 3.4, basement: 1 },
    healthcare: { floors: 5, rooms: 36, length: 8.4, width: 7.2, height: 3.8, basement: 1 }
  };
  function getPreset(projectType) { return presets[projectType] || presets.residential; }
  function simulateExtraction(fileName, projectType) {
    const preset = getPreset(projectType);
    return { fileName: fileName, fields: preset, message: "Simulated extraction completed from " + fileName + " using " + BOQUtils.slugToTitle(projectType) + " geometry assumptions." };
  }
  window.BOQCad = { getPreset, simulateExtraction };
})();
