"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import R3fForceGraph from "r3f-forcegraph";
import * as THREE from "three";
import { TrackballControls } from "@react-three/drei";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "~/components/ui/tooltip";

const data = {
  nodes: [
    {
      id: "id1",
      name: "hello",
      val: 1,
    },
    {
      id: "id2",
      name: "world",
      val: 10,
    },
  ],
  links: [
    {
      source: "id1",
      target: "id2",
    },
  ],
};

const Graph = () => {
  const fgRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const R3Graph = () => {
    useFrame(({ camera }) => {
      if (fgRef.current) {
        fgRef.current.tickFrame();
        cameraRef.current = camera;
      }
    });

    return (
      <R3fForceGraph
        ref={fgRef}
        graphData={data}
        nodeAutoColorBy="user"
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={0.9}
        onNodeHover={(node) => {
          setHoveredNode(node);
          if (node?.x && node?.y && node?.z && cameraRef.current) {
            const vector = new THREE.Vector3(node.x, node.y, node.z);
            vector.project(cameraRef.current);

            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

            setTooltipPosition({ x, y });
          }
        }}
      />
    );
  };

  return (
    <TooltipProvider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas flat camera={{ position: [0, 0, 1500], far: 8000 }}>
          <TrackballControls />
          <color attach="background" args={["#111111"]} />
          <ambientLight color={0xcccccc} intensity={Math.PI} />
          <directionalLight intensity={0.6 * Math.PI} />
          <R3Graph />
        </Canvas>

        <Tooltip open={!!hoveredNode}>
          <TooltipContent
            className="text-md capitalize font-semibold"
            style={{
              position: "fixed",
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y + 10,
              pointerEvents: "none",
            }}
          >
            {hoveredNode?.name}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default Graph;
