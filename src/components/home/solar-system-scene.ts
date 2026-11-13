import * as THREE from "three";

const bodyDefinitions = [
  {
    name: "CAD",
    radius: 4,
    speed: 0.19,
    phase: 0.18,
    size: 0.68,
    colors: ["#aeb9c6", "#596877", "#d6dde3"],
    atmosphere: 0xc8d7e5,
    pattern: "cratered",
  },
  {
    name: "VIDEO",
    radius: 5.5,
    speed: -0.15,
    phase: 2.78,
    size: 0.62,
    colors: ["#d89a3a", "#754922", "#f1c866"],
    atmosphere: 0xffbf66,
    pattern: "volcanic",
  },
  {
    name: "CODE",
    radius: 7,
    speed: 0.12,
    phase: 5.28,
    size: 0.82,
    colors: ["#2d9e9a", "#103f54", "#88d2c8"],
    atmosphere: 0x64d8d0,
    pattern: "ocean",
  },
  {
    name: "BUILD",
    radius: 8.5,
    speed: -0.095,
    phase: 2.14,
    size: 0.58,
    colors: ["#c8a66f", "#70583e", "#ead4a4"],
    atmosphere: 0xe6c48d,
    pattern: "banded",
    ring: true,
  },
  {
    name: "DESIGN",
    radius: 10,
    speed: 0.077,
    phase: 4.16,
    size: 0.88,
    colors: ["#5c9064", "#244d3e", "#a8b975"],
    atmosphere: 0x88b58d,
    pattern: "forest",
  },
  {
    name: "DATA",
    radius: 11.5,
    speed: -0.06,
    phase: 0.72,
    size: 0.62,
    colors: ["#8ac7dd", "#40788e", "#d5edf2"],
    atmosphere: 0xaeeafa,
    pattern: "ice",
  },
] as const;

const cometDefinitions = [
  {
    cycleDuration: 5.4,
    depth: -7.2,
    endX: 15,
    endY: 1.4,
    offset: 0.4,
    scale: 0.86,
    startX: -15,
    startY: 4.8,
    travelDuration: 0.62,
  },
  {
    cycleDuration: 7.1,
    depth: -5.8,
    endX: -14,
    endY: 2.1,
    offset: 2.8,
    scale: 0.68,
    startX: 14,
    startY: 5.5,
    travelDuration: 0.78,
  },
  {
    cycleDuration: 6.2,
    depth: -8.6,
    endX: 9,
    endY: 0.5,
    offset: 4.7,
    scale: 0.98,
    startX: -8,
    startY: 6.4,
    travelDuration: 0.54,
  },
] as const;

const planetLabelFontSize = 56;
const planetLabelFontFamily = "Geist Variable";
const planetLabelWidth = 2;
const planetLabelHeight = 0.55;
const planetLabelMobileScale = 1.55;

type BodyName = (typeof bodyDefinitions)[number]["name"];

interface MountSolarSystemOptions {
  canvas: HTMLCanvasElement;
  container: HTMLDivElement;
  reducedMotion: boolean;
}

export interface SolarSystemHandle {
  bodyCount: number;
  cameraPresentation: "low-angle";
  cameraFraming: "adaptive-horizontal-safe";
  cometCount: number;
  cometDirectionCount: number;
  cometMotion: "multi-direction-shooting-stars";
  cometQuietGapMinMs: number;
  cometTravelDurationMaxMs: number;
  centerpieceCenterDepth: number;
  centerpieceGlowOpacity: number;
  centerpieceLighting: "soft-white-gradient-halo";
  centerpieceMode: "logo-bas-relief";
  centerpieceOrientation: "camera-facing-fixed";
  centerpieceSurface: "displaced-logo-artwork";
  depthOcclusion: "enabled";
  dispose: () => void;
  minimumOrbitGap: number;
  minimumOrbitRadius: number;
  minimumPlanetRadius: number;
  orbitCount: number;
  orbitLineColor: "#a8b2bd";
  orbitLineOpacity: 0.26;
  orbitDepthRange: number;
  orbitModel: "horizontal-depth-plane";
  orbitPlaneAxis: "xz";
  orbitPlaneCount: number;
  planetLabelFontFamily: string;
  planetLabelFontSize: number;
  planetLabelMobileScale: number;
  planetLabelWidth: number;
  planetMaterialCount: number;
}

interface BodyState {
  angle: number;
  definition: (typeof bodyDefinitions)[number];
  focus: number;
  label: THREE.Sprite;
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhysicalMaterial>;
  root: THREE.Group;
}

interface CometState {
  cycleDuration: number;
  depth: number;
  endX: number;
  endY: number;
  group: THREE.Group;
  materials: Array<{ baseOpacity: number; material: THREE.Material }>;
  offset: number;
  startX: number;
  startY: number;
  travelDuration: number;
}

const minimumOrbitGap = Number(
  bodyDefinitions
    .slice(1)
    .reduce(
      (minimum, definition, index) =>
        Math.min(minimum, definition.radius - bodyDefinitions[index].radius),
      Number.POSITIVE_INFINITY,
    )
    .toFixed(1),
);
const minimumOrbitRadius = Math.min(
  ...bodyDefinitions.map((definition) => definition.radius),
);
const minimumPlanetRadius = Math.min(
  ...bodyDefinitions.map((definition) => definition.size),
);
const orbitDepthRange = Math.max(
  ...bodyDefinitions.map((definition) => definition.radius * 2),
);
const cometDirectionCount = new Set(
  cometDefinitions.map((definition) =>
    Math.atan2(
      definition.endY - definition.startY,
      definition.endX - definition.startX,
    ).toFixed(2),
  ),
).size;
const cometQuietGapMinMs = Math.round(
  Math.min(
    ...cometDefinitions.map(
      (definition) => definition.cycleDuration - definition.travelDuration,
    ),
  ) * 1000,
);
const cometTravelDurationMaxMs = Math.round(
  Math.max(...cometDefinitions.map((definition) => definition.travelDuration)) *
    1000,
);
const centerpieceGlowOpacity = 0.78;

function orbitPosition(
  definition: (typeof bodyDefinitions)[number],
  angle: number,
  target = new THREE.Vector3(),
) {
  target.set(
    Math.cos(angle) * definition.radius,
    0,
    Math.sin(angle) * definition.radius,
  );
  return target;
}

function createOrbit(definition: (typeof bodyDefinitions)[number]) {
  const points: THREE.Vector3[] = [];
  for (let step = 0; step < 192; step += 1) {
    points.push(orbitPosition(definition, (step / 192) * Math.PI * 2));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xa8b2bd,
    depthTest: true,
    depthWrite: true,
    opacity: 0.26,
    transparent: true,
  });
  return new THREE.LineLoop(geometry, material);
}

function createLabel(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create planet label texture");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `700 ${planetLabelFontSize}px "${planetLabelFontFamily}", Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineJoin = "round";
  context.lineWidth = 5;
  context.strokeStyle = "rgba(4, 7, 8, .92)";
  context.fillStyle = "rgba(250, 248, 241, .94)";
  context.strokeText(text, canvas.width / 2, canvas.height / 2);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    depthTest: true,
    depthWrite: false,
    map: texture,
    transparent: true,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(planetLabelWidth, planetLabelHeight, 1);
  return sprite;
}

function createComet(definition: (typeof cometDefinitions)[number]) {
  const group = new THREE.Group();
  const trailLength = 5.6;
  const segmentCount = 22;
  const positions = new Float32Array(segmentCount * 3);
  const colors = new Float32Array(segmentCount * 3);

  for (let index = 0; index < segmentCount; index += 1) {
    const progress = index / (segmentCount - 1);
    positions[index * 3] = -progress * trailLength;
    positions[index * 3 + 1] = 0;
    positions[index * 3 + 2] = 0;
    const intensity = (1 - progress) ** 2;
    colors[index * 3] = 0.72 * intensity;
    colors[index * 3 + 1] = 0.9 * intensity;
    colors[index * 3 + 2] = intensity;
  }

  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );
  trailGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const trailMaterial = new THREE.LineBasicMaterial({
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false,
    opacity: 0.54,
    transparent: true,
    vertexColors: true,
  });
  group.add(new THREE.Line(trailGeometry, trailMaterial));

  const headMaterial = new THREE.MeshBasicMaterial({
    blending: THREE.AdditiveBlending,
    color: 0xe8f8ff,
    depthWrite: false,
    opacity: 0.9,
    transparent: true,
  });
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 12, 8),
    headMaterial,
  );
  group.add(head);

  const haloMaterial = new THREE.SpriteMaterial({
    blending: THREE.AdditiveBlending,
    color: 0x9edfff,
    depthWrite: false,
    map: createCrestGlowTexture(),
    opacity: 0.38,
    transparent: true,
  });
  const halo = new THREE.Sprite(haloMaterial);
  halo.scale.set(0.72, 0.72, 1);
  group.add(halo);
  group.scale.setScalar(definition.scale);
  group.rotation.z = Math.atan2(
    definition.endY - definition.startY,
    definition.endX - definition.startX,
  );

  return {
    cycleDuration: definition.cycleDuration,
    depth: definition.depth,
    endX: definition.endX,
    endY: definition.endY,
    group,
    materials: [
      { baseOpacity: 0.54, material: trailMaterial },
      { baseOpacity: 0.9, material: headMaterial },
      { baseOpacity: 0.38, material: haloMaterial },
    ],
    offset: definition.offset,
    startX: definition.startX,
    startY: definition.startY,
    travelDuration: definition.travelDuration,
  } satisfies CometState;
}

function createPlanetTexture(definition: (typeof bodyDefinitions)[number]) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create planet material texture");

  const [base, shadow, light] = definition.colors;
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, shadow);
  gradient.addColorStop(0.22, base);
  gradient.addColorStop(0.55, light);
  gradient.addColorStop(0.78, base);
  gradient.addColorStop(1, shadow);
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  let seed = [...definition.name].reduce(
    (total, character) => total + character.charCodeAt(0),
    19,
  );
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  if (definition.pattern === "banded" || definition.pattern === "ocean") {
    for (let band = 0; band < 22; band += 1) {
      const y = (band / 22) * canvas.height;
      context.globalAlpha = 0.08 + random() * 0.14;
      context.fillStyle = band % 3 === 0 ? light : shadow;
      context.fillRect(0, y, canvas.width, 3 + random() * 9);
    }
  } else {
    for (let band = 0; band < 14; band += 1) {
      const y = random() * canvas.height;
      context.globalAlpha = 0.04 + random() * 0.1;
      context.fillStyle = random() > 0.5 ? light : shadow;
      context.fillRect(0, y, canvas.width, 2 + random() * 7);
    }
  }

  const spotCount = definition.pattern === "cratered" ? 38 : 18;
  for (let spot = 0; spot < spotCount; spot += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const radiusX =
      3 + random() * (definition.pattern === "volcanic" ? 34 : 20);
    const radiusY = radiusX * (0.25 + random() * 0.55);
    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, random() * Math.PI, 0, Math.PI * 2);
    context.globalAlpha = 0.08 + random() * 0.22;
    context.fillStyle = random() > 0.55 ? light : shadow;
    context.fill();
  }
  context.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

function createCrestGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create crest glow texture");
  const gradient = context.createRadialGradient(256, 256, 8, 256, 256, 250);
  gradient.addColorStop(0, "rgba(255, 255, 255, .62)");
  gradient.addColorStop(0.32, "rgba(255, 255, 255, .3)");
  gradient.addColorStop(0.7, "rgba(255, 255, 255, .08)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

function traceLogoShape(image: CanvasImageSource) {
  const canvas = document.createElement("canvas");
  const size = 192;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Unable to trace TSA logo silhouette");
  context.drawImage(image, 0, 0, size, size);
  const pixels = context.getImageData(0, 0, size, size).data;
  const center = size / 2;
  const maxRadius = Math.hypot(center, center);
  const points: THREE.Vector2[] = [];

  for (let step = 0; step < 168; step += 1) {
    const angle = (step / 168) * Math.PI * 2;
    for (let radius = maxRadius; radius >= 0; radius -= 0.75) {
      const x = Math.round(center + Math.cos(angle) * radius);
      const y = Math.round(center + Math.sin(angle) * radius);
      if (x < 0 || x >= size || y < 0 || y >= size) continue;
      if (pixels[(y * size + x) * 4 + 3] < 42) continue;
      points.push(
        new THREE.Vector2(
          ((x - center) / size) * 1.72,
          ((center - y) / size) * 1.72,
        ),
      );
      break;
    }
  }

  if (points.length < 32) throw new Error("TSA logo silhouette is incomplete");
  return new THREE.Shape(points);
}

function createLogoReliefTextures(
  image: CanvasImageSource,
  anisotropy: number,
) {
  const size = 512;
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const colorContext = colorCanvas.getContext("2d", {
    willReadFrequently: true,
  });
  if (!colorContext) throw new Error("Unable to create crest artwork texture");
  colorContext.clearRect(0, 0, size, size);
  colorContext.drawImage(image, 0, 0, size, size);

  const source = colorContext.getImageData(0, 0, size, size);
  const heightCanvas = document.createElement("canvas");
  heightCanvas.width = size;
  heightCanvas.height = size;
  const heightContext = heightCanvas.getContext("2d");
  if (!heightContext) throw new Error("Unable to create crest height map");
  const heightData = heightContext.createImageData(size, size);

  for (let index = 0; index < source.data.length; index += 4) {
    const red = source.data[index];
    const green = source.data[index + 1];
    const blue = source.data[index + 2];
    const alpha = source.data[index + 3];
    const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
    const isWhite = red > 205 && green > 205 && blue > 205;
    const isYellow = red > 170 && green > 120 && blue < 105;
    const isRed = red > 150 && green < 105 && blue < 115;
    const accentLift = isWhite ? 44 : isYellow ? 34 : isRed ? 22 : 0;
    const height =
      alpha < 18 ? 0 : Math.min(255, 38 + luminance * 0.62 + accentLift);

    heightData.data[index] = height;
    heightData.data[index + 1] = height;
    heightData.data[index + 2] = height;
    heightData.data[index + 3] = alpha;
  }
  heightContext.putImageData(heightData, 0, 0);

  const colorTexture = new THREE.CanvasTexture(colorCanvas);
  colorTexture.anisotropy = anisotropy;
  colorTexture.colorSpace = THREE.SRGBColorSpace;
  colorTexture.minFilter = THREE.LinearMipmapLinearFilter;

  const heightTexture = new THREE.CanvasTexture(heightCanvas);
  heightTexture.minFilter = THREE.LinearFilter;
  heightTexture.magFilter = THREE.LinearFilter;

  return { colorTexture, heightTexture };
}

function createCrest(image: CanvasImageSource, anisotropy: number) {
  const group = new THREE.Group();
  const crestShape = traceLogoShape(image);
  const extrusionGeometry = new THREE.ExtrudeGeometry(crestShape, {
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.045,
    bevelThickness: 0.055,
    curveSegments: 2,
    depth: 0.42,
    steps: 1,
  });
  extrusionGeometry.translate(0, 0, -0.21);

  const faceMaterial = new THREE.MeshPhysicalMaterial({
    clearcoat: 0.28,
    color: 0x07152f,
    emissive: 0x071431,
    emissiveIntensity: 0.2,
    metalness: 0.18,
    roughness: 0.34,
  });
  const sideMaterial = new THREE.MeshPhysicalMaterial({
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    color: 0x9ee3ff,
    emissive: 0x153c9f,
    emissiveIntensity: 0.16,
    metalness: 0.28,
    roughness: 0.16,
  });
  group.add(new THREE.Mesh(extrusionGeometry, [faceMaterial, sideMaterial]));

  const { colorTexture, heightTexture } = createLogoReliefTextures(
    image,
    anisotropy,
  );
  const reliefGeometry = new THREE.PlaneGeometry(1.72, 1.72, 96, 96);
  const reliefMaterial = new THREE.MeshPhysicalMaterial({
    alphaTest: 0.05,
    clearcoat: 0.46,
    clearcoatRoughness: 0.25,
    displacementBias: 0,
    displacementMap: heightTexture,
    displacementScale: 0.18,
    emissive: 0xffffff,
    emissiveIntensity: 0.16,
    emissiveMap: colorTexture,
    map: colorTexture,
    metalness: 0.06,
    roughness: 0.36,
    side: THREE.FrontSide,
  });
  const relief = new THREE.Mesh(reliefGeometry, reliefMaterial);
  relief.position.z = 0.285;
  group.add(relief);

  const glowTexture = createCrestGlowTexture();
  const glowMaterial = new THREE.SpriteMaterial({
    blending: THREE.AdditiveBlending,
    color: 0xffffff,
    depthWrite: false,
    map: glowTexture,
    opacity: centerpieceGlowOpacity,
    transparent: true,
  });
  const glow = new THREE.Sprite(glowMaterial);
  glow.scale.set(4.25, 4.25, 1);
  glow.position.z = -0.34;
  group.add(glow);

  return group;
}

function createStars() {
  const positions = new Float32Array(210 * 3);
  let seed = 937;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let index = 0; index < 210; index += 1) {
    positions[index * 3] = (random() - 0.5) * 20;
    positions[index * 3 + 1] = (random() - 0.5) * 11;
    positions[index * 3 + 2] = -1.5 - random() * 7;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0xe9f2ff,
    depthWrite: false,
    opacity: 0.45,
    size: 0.022,
    transparent: true,
  });
  return new THREE.Points(geometry, material);
}

function disposeScene(scene: THREE.Scene) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  scene.traverse((object) => {
    if (
      "geometry" in object &&
      object.geometry instanceof THREE.BufferGeometry
    ) {
      geometries.add(object.geometry);
    }
    if ("material" in object) {
      const objectMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      objectMaterials.forEach((material) => {
        if (!(material instanceof THREE.Material)) return;
        materials.add(material);
        Object.values(material).forEach((value) => {
          if (value instanceof THREE.Texture) textures.add(value);
        });
      });
    }
  });
  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
}

export async function mountSolarSystem({
  canvas,
  container,
  reducedMotion,
}: MountSolarSystemOptions) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 60);
  camera.position.set(0, 5.5, 24);
  camera.lookAt(0, 0, 0);

  const solarSystem = new THREE.Group();
  scene.add(solarSystem);
  scene.add(createStars());
  const cometStates = cometDefinitions.map((definition) => {
    const comet = createComet(definition);
    scene.add(comet.group);
    return comet;
  });

  scene.add(new THREE.AmbientLight(0xb7c9e8, 1.2));
  const centerLight = new THREE.PointLight(0xb9e8ff, 3.2, 20, 1.7);
  centerLight.position.set(0, 1.2, 4);
  solarSystem.add(centerLight);
  const rimLight = new THREE.DirectionalLight(0x78a6ff, 1.8);
  rimLight.position.set(-4, 6, 8);
  scene.add(rimLight);

  const sourceImage = await new THREE.ImageLoader().loadAsync(
    "/images/TSA_Logo-transparent.png",
  );
  const crest = createCrest(
    sourceImage,
    Math.min(8, renderer.capabilities.getMaxAnisotropy()),
  );
  crest.position.z = 0;
  crest.scale.setScalar(2.05);
  solarSystem.add(crest);

  const sphereGeometry = new THREE.SphereGeometry(1, 36, 24);
  const bodyStates: BodyState[] = bodyDefinitions.map((definition) => {
    solarSystem.add(createOrbit(definition));
    const planetTexture = createPlanetTexture(definition);
    const material = new THREE.MeshPhysicalMaterial({
      bumpMap: planetTexture,
      bumpScale: 0.035,
      clearcoat: 0.32,
      clearcoatRoughness: 0.38,
      map: planetTexture,
      metalness: 0.06,
      roughness: 0.56,
    });
    const mesh = new THREE.Mesh(sphereGeometry, material);
    mesh.scale.setScalar(definition.size);
    mesh.userData.bodyName = definition.name;

    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      blending: THREE.AdditiveBlending,
      color: definition.atmosphere,
      depthWrite: false,
      opacity: 0.11,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(sphereGeometry, atmosphereMaterial);
    atmosphere.scale.setScalar(definition.size * 1.08);

    const label = createLabel(definition.name);
    label.position.y = definition.size * 1.72 + 0.16;
    const root = new THREE.Group();
    root.add(mesh, atmosphere, label);

    if ("ring" in definition && definition.ring) {
      const ringGeometry = new THREE.RingGeometry(
        definition.size * 1.45,
        definition.size * 2.18,
        72,
      );
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xd8c49a,
        opacity: 0.58,
        roughness: 0.72,
        side: THREE.DoubleSide,
        transparent: true,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = 1.18;
      ring.rotation.z = 0.28;
      root.add(ring);
    }

    root.position.copy(orbitPosition(definition, definition.phase));
    solarSystem.add(root);
    return {
      angle: definition.phase,
      definition,
      focus: 0,
      label,
      mesh,
      root,
    };
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(4, 4);
  let hoveredBody: BodyName | "" = "";
  let destroyed = false;

  const setHoveredBody = (name: BodyName | "") => {
    if (hoveredBody === name) return;
    hoveredBody = name;
    container.dataset.hoveredBody = name;
    container.dataset.hoverState = name ? "active" : "idle";
    canvas.style.cursor = name ? "pointer" : "default";
  };

  const pickPlanet = () => {
    scene.updateMatrixWorld(true);
    raycaster.setFromCamera(pointer, camera);
    const intersections = raycaster.intersectObjects(
      bodyStates.map((body) => body.mesh),
      false,
    );
    const name = intersections[0]?.object.userData.bodyName as
      BodyName | undefined;
    setHoveredBody(name ?? "");
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    pickPlanet();
  };

  const onPointerLeave = () => {
    pointer.set(4, 4);
    setHoveredBody("");
  };

  canvas.addEventListener("pointermove", onPointerMove, { passive: true });
  canvas.addEventListener("pointerleave", onPointerLeave);

  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const baseVerticalFov = 39;
    const minimumHorizontalFov = THREE.MathUtils.degToRad(70);
    const baseHorizontalFov =
      2 *
      Math.atan(
        Math.tan(THREE.MathUtils.degToRad(baseVerticalFov) / 2) *
          camera.aspect,
      );
    camera.fov =
      baseHorizontalFov < minimumHorizontalFov
        ? THREE.MathUtils.radToDeg(
            2 * Math.atan(Math.tan(minimumHorizontalFov / 2) / camera.aspect),
          )
        : baseVerticalFov;
    camera.updateProjectionMatrix();
    const mobile = width <= 600;
    solarSystem.scale.setScalar(
      mobile ? (width <= 340 ? 0.98 : 1.04) : width <= 900 ? 1.08 : 1.35,
    );
    crest.scale.setScalar(mobile ? 2.5 : width <= 900 ? 2.25 : 2.05);
    const labelScale = mobile
      ? planetLabelMobileScale
      : width <= 900
        ? 1.3
        : 1.2;
    bodyStates.forEach(({ label }) => {
      label.scale.set(
        planetLabelWidth * labelScale,
        planetLabelHeight * labelScale,
        1,
      );
    });
    solarSystem.position.set(
      0,
      mobile ? 0.3 : width <= 900 ? 0.75 : 1.35,
      0,
    );
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  const clock = new THREE.Clock();
  const render = () => {
    if (destroyed) return;
    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    cometStates.forEach((comet) => {
      const localTime = (elapsed + comet.offset) % comet.cycleDuration;
      const isVisible = localTime < comet.travelDuration;
      const progress = Math.min(1, localTime / comet.travelDuration);
      const edgeOpacity = Math.min(1, progress / 0.08, (1 - progress) / 0.12);
      comet.group.visible = isVisible;
      comet.group.position.set(
        THREE.MathUtils.lerp(comet.startX, comet.endX, progress),
        THREE.MathUtils.lerp(comet.startY, comet.endY, progress),
        comet.depth,
      );
      comet.materials.forEach(({ baseOpacity, material }) => {
        material.opacity =
          baseOpacity * Math.max(0, isVisible ? edgeOpacity : 0);
      });
    });

    bodyStates.forEach((body) => {
      const focused = hoveredBody === body.definition.name;
      body.focus = THREE.MathUtils.lerp(body.focus, focused ? 1 : 0, 0.11);
      if (!focused) body.angle += body.definition.speed * delta;
      body.root.position.copy(
        orbitPosition(body.definition, body.angle, body.root.position),
      );
      body.root.position.z += body.focus * 0.72;
      const scale = 1 + body.focus * 0.48;
      body.root.scale.setScalar(scale);
      body.mesh.rotation.y += delta * (focused ? 4.2 : 0.42);
      body.mesh.rotation.x += delta * (focused ? 1.5 : 0.12);
      body.label.material.opacity = 0.7 + body.focus * 0.3;
    });

    crest.position.y = Math.sin(elapsed * 1.08) * 0.1;
    crest.quaternion.copy(camera.quaternion);
    renderer.render(scene, camera);
  };

  if (reducedMotion) {
    render();
  } else {
    renderer.setAnimationLoop(render);
  }

  return {
    bodyCount: bodyStates.length,
    cameraPresentation: "low-angle" as const,
    cameraFraming: "adaptive-horizontal-safe" as const,
    cometCount: cometStates.length,
    cometDirectionCount,
    cometMotion: "multi-direction-shooting-stars" as const,
    cometQuietGapMinMs,
    cometTravelDurationMaxMs,
    centerpieceCenterDepth: crest.position.z,
    centerpieceGlowOpacity,
    centerpieceLighting: "soft-white-gradient-halo" as const,
    centerpieceMode: "logo-bas-relief" as const,
    centerpieceOrientation: "camera-facing-fixed" as const,
    centerpieceSurface: "displaced-logo-artwork" as const,
    depthOcclusion: "enabled" as const,
    minimumOrbitGap,
    minimumOrbitRadius,
    minimumPlanetRadius,
    orbitCount: bodyDefinitions.length,
    orbitLineColor: "#a8b2bd" as const,
    orbitLineOpacity: 0.26 as const,
    orbitDepthRange,
    orbitModel: "horizontal-depth-plane" as const,
    orbitPlaneAxis: "xz" as const,
    orbitPlaneCount: 1,
    planetLabelFontFamily,
    planetLabelFontSize,
    planetLabelMobileScale,
    planetLabelWidth,
    planetMaterialCount: new Set(
      bodyDefinitions.map((definition) => definition.colors.join(",")),
    ).size,
    dispose: () => {
      destroyed = true;
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      disposeScene(scene);
      renderer.dispose();
    },
  };
}

export { bodyDefinitions };
