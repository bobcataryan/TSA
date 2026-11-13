"use client";

import { useEffect, useRef, useState } from "react";
import type { SolarSystemHandle } from "./solar-system-scene";

type SceneMetadata = Pick<
  SolarSystemHandle,
  | "bodyCount"
  | "cameraPresentation"
  | "cameraFraming"
  | "cometCount"
  | "cometDirectionCount"
  | "cometMotion"
  | "cometQuietGapMinMs"
  | "cometTravelDurationMaxMs"
  | "centerpieceCenterDepth"
  | "centerpieceGlowOpacity"
  | "centerpieceLighting"
  | "centerpieceMode"
  | "centerpieceOrientation"
  | "centerpieceSurface"
  | "depthOcclusion"
  | "minimumOrbitGap"
  | "minimumOrbitRadius"
  | "minimumPlanetRadius"
  | "orbitCount"
  | "orbitLineColor"
  | "orbitLineOpacity"
  | "orbitDepthRange"
  | "orbitModel"
  | "orbitPlaneAxis"
  | "orbitPlaneCount"
  | "planetLabelFontFamily"
  | "planetLabelFontSize"
  | "planetLabelMobileScale"
  | "planetLabelWidth"
  | "planetMaterialCount"
>;

export function ProjectField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sceneState, setSceneState] = useState<
    "loading" | "ready" | "fallback"
  >("loading");
  const [sceneMetadata, setSceneMetadata] = useState<SceneMetadata>();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    let disposed = false;
    let sceneHandle: SolarSystemHandle | undefined;
    setSceneState("loading");
    setSceneMetadata(undefined);

    void import("./solar-system-scene")
      .then(({ mountSolarSystem }) =>
        mountSolarSystem({ canvas, container: root, reducedMotion }),
      )
      .then((handle) => {
        if (disposed) {
          handle.dispose();
          return;
        }
        sceneHandle = handle;
        setSceneMetadata({
          bodyCount: handle.bodyCount,
          cameraPresentation: handle.cameraPresentation,
          cameraFraming: handle.cameraFraming,
          cometCount: handle.cometCount,
          cometDirectionCount: handle.cometDirectionCount,
          cometMotion: handle.cometMotion,
          cometQuietGapMinMs: handle.cometQuietGapMinMs,
          cometTravelDurationMaxMs: handle.cometTravelDurationMaxMs,
          centerpieceCenterDepth: handle.centerpieceCenterDepth,
          centerpieceGlowOpacity: handle.centerpieceGlowOpacity,
          centerpieceLighting: handle.centerpieceLighting,
          centerpieceMode: handle.centerpieceMode,
          centerpieceOrientation: handle.centerpieceOrientation,
          centerpieceSurface: handle.centerpieceSurface,
          depthOcclusion: handle.depthOcclusion,
          minimumOrbitGap: handle.minimumOrbitGap,
          minimumOrbitRadius: handle.minimumOrbitRadius,
          minimumPlanetRadius: handle.minimumPlanetRadius,
          orbitCount: handle.orbitCount,
          orbitLineColor: handle.orbitLineColor,
          orbitLineOpacity: handle.orbitLineOpacity,
          orbitDepthRange: handle.orbitDepthRange,
          orbitModel: handle.orbitModel,
          orbitPlaneAxis: handle.orbitPlaneAxis,
          orbitPlaneCount: handle.orbitPlaneCount,
          planetLabelFontFamily: handle.planetLabelFontFamily,
          planetLabelFontSize: handle.planetLabelFontSize,
          planetLabelMobileScale: handle.planetLabelMobileScale,
          planetLabelWidth: handle.planetLabelWidth,
          planetMaterialCount: handle.planetMaterialCount,
        });
        setSceneState("ready");
      })
      .catch(() => {
        if (!disposed) setSceneState("fallback");
      });

    return () => {
      disposed = true;
      sceneHandle?.dispose();
    };
  }, [reducedMotion]);

  return (
    <div
      className="project-field"
      data-animation-loop={reducedMotion ? "paused" : "running"}
      data-body-count={sceneMetadata?.bodyCount}
      data-camera-presentation={sceneMetadata?.cameraPresentation}
      data-camera-framing={sceneMetadata?.cameraFraming}
      data-comet-count={sceneMetadata?.cometCount}
      data-comet-direction-count={sceneMetadata?.cometDirectionCount}
      data-comet-motion={sceneMetadata?.cometMotion}
      data-comet-quiet-gap-min-ms={sceneMetadata?.cometQuietGapMinMs}
      data-comet-travel-duration-max-ms={
        sceneMetadata?.cometTravelDurationMaxMs
      }
      data-centerpiece-center-depth={sceneMetadata?.centerpieceCenterDepth}
      data-centerpiece-glow-opacity={sceneMetadata?.centerpieceGlowOpacity}
      data-centerpiece-lighting={sceneMetadata?.centerpieceLighting}
      data-centerpiece-mode={sceneMetadata?.centerpieceMode}
      data-centerpiece-orientation={sceneMetadata?.centerpieceOrientation}
      data-centerpiece-surface={sceneMetadata?.centerpieceSurface}
      data-depth-occlusion={sceneMetadata?.depthOcclusion}
      data-hover-state="idle"
      data-interaction="planet-hover-freeze-lift-spin"
      data-minimum-orbit-gap={sceneMetadata?.minimumOrbitGap}
      data-motion={reducedMotion ? "reduced" : "full"}
      data-orbit-count={sceneMetadata?.orbitCount}
      data-orbit-line-color={sceneMetadata?.orbitLineColor}
      data-orbit-line-opacity={sceneMetadata?.orbitLineOpacity}
      data-orbit-depth-range={sceneMetadata?.orbitDepthRange}
      data-orbit-model={sceneMetadata?.orbitModel}
      data-orbit-plane-axis={sceneMetadata?.orbitPlaneAxis}
      data-orbit-plane-count={sceneMetadata?.orbitPlaneCount}
      data-planet-label-font-family={sceneMetadata?.planetLabelFontFamily}
      data-planet-label-font-size={sceneMetadata?.planetLabelFontSize}
      data-planet-label-mobile-scale={sceneMetadata?.planetLabelMobileScale}
      data-planet-label-width={sceneMetadata?.planetLabelWidth}
      data-planet-material-count={sceneMetadata?.planetMaterialCount}
      data-minimum-orbit-radius={sceneMetadata?.minimumOrbitRadius}
      data-minimum-planet-radius={sceneMetadata?.minimumPlanetRadius}
      data-renderer="three"
      data-scene-ready={sceneState === "ready" ? "true" : sceneState}
      ref={rootRef}
    >
      <canvas
        className="solar-system-canvas"
        aria-hidden="true"
        ref={canvasRef}
      />
    </div>
  );
}
