'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

export default function GlowGrid() {
    const containerRef = useRef<HTMLDivElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const mousePosition = useRef({ x: 0, y: 0 })
    const targetPosition = useRef({ x: 0, y: 0 })

    useEffect(() => {
        if (!containerRef.current) return

        const scene = new THREE.Scene()
        scene.background = null // Make scene background transparent
        const width = window.innerWidth
        const height = window.innerHeight
        const aspect = width / height

        // Adjust camera to better fit screen
        const viewHeight = 2 // This is the height in the orthographic view
        const viewWidth = viewHeight * aspect
        const camera = new THREE.OrthographicCamera(
            -viewWidth / 2, viewWidth / 2,
            viewHeight / 2, -viewHeight / 2,
            0.1, 1000
        )
        camera.position.z = 2
        camera.lookAt(0, 0, 0)

        // Enhanced renderer setup with transparency
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true, // Enable alpha
            stencil: true,
            depth: true,
            premultipliedAlpha: false // Important for correct transparency
        })
        renderer.setSize(width, height)
        renderer.setClearColor(0x000000, 0) // Set clear color with 0 opacity
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.5
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        containerRef.current.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // Post-processing with transparency support
        const composer = new EffectComposer(renderer)
        composer.renderTarget1.texture.format = THREE.RGBAFormat // Enable alpha in composer
        composer.renderTarget2.texture.format = THREE.RGBAFormat // Enable alpha in composer

        const renderPass = new RenderPass(scene, camera)
        renderPass.clearAlpha = 0 // Ensure alpha is cleared properly

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height),
            0.5,
            0.33,
            0.85
        )
        composer.addPass(renderPass)
        // composer.addPass(bloomPass)

        // Load HDR environment map
        const rgbeLoader = new RGBELoader()
        const hdrEquirect = rgbeLoader.load('/empty_warehouse_01_2k.hdr', () => {
            hdrEquirect.mapping = THREE.EquirectangularReflectionMapping
        })

        // Load normal map texture
        const textureLoader = new THREE.TextureLoader()
        const normalMapTexture = textureLoader.load('/normal.jpg')
        normalMapTexture.wrapS = THREE.RepeatWrapping
        normalMapTexture.wrapT = THREE.RepeatWrapping
        normalMapTexture.repeat.set(1, 1)

        // Create sphere with enhanced glow
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0xff7700,
            transparent: true,
            opacity: 0.8,
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.z = -0.5
        scene.add(sphere)

        // Enhanced glass material with physical properties
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            transmission: 1,
            thickness: 1.2,
            roughness: 0.05,
            envMap: hdrEquirect,
            envMapIntensity: 1.5,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
            normalScale: new THREE.Vector2(1),
            normalMap: normalMapTexture,
            clearcoatNormalMap: normalMapTexture,
            clearcoatNormalScale: new THREE.Vector2(0.3),
            transparent: true,
        })

        // Function to create rounded rectangle shape
        const createRoundedRectShape = (width: number, height: number, radius: number) => {
            const shape = new THREE.Shape()

            shape.moveTo(-width / 2 + radius, -height / 2)
            shape.lineTo(width / 2 - radius, -height / 2)
            shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
            shape.lineTo(width / 2, height / 2 - radius)
            shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
            shape.lineTo(-width / 2 + radius, height / 2)
            shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
            shape.lineTo(-width / 2, -height / 2 + radius)
            shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)

            return shape
        }

        // Calculate grid dimensions to better fill the screen
        const gridAspect = width / height
        const cols = Math.floor(8 * gridAspect)
        const rows = 8 // Increased rows for better vertical coverage

        // Calculate sizes to ensure full screen coverage
        const targetWidth = viewWidth * 1.0  // Fill exactly the view width
        const targetHeight = viewHeight * 1.0 // Fill exactly the view height

        // Calculate square size based on the more constraining dimension
        const squareSizeFromWidth = targetWidth / cols
        const squareSizeFromHeight = targetHeight / rows
        const squareSize = Math.min(squareSizeFromWidth, squareSizeFromHeight)
        const spacing = squareSize * 0.08

        // Calculate total grid dimensions
        const totalGridWidth = cols * (squareSize + spacing) - spacing
        const totalGridHeight = rows * (squareSize + spacing) - spacing

        // Center the grid
        const offsetX = -totalGridWidth / 2 + squareSize / 2
        const offsetY = totalGridHeight / 2 - squareSize / 2

        // Store original positions for grid movement
        const originalPositions: { x: number; y: number; z: number }[] = []

        // Create glass grid
        const squares: THREE.Mesh[] = []
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                // Create rounded rectangle with custom shape
                const radius = squareSize * 0.15
                const shape = createRoundedRectShape(squareSize, squareSize, radius)

                const extrudeSettings = {
                    steps: 1,
                    depth: squareSize * 0.08,  // Increased depth for better blur effect
                    bevelEnabled: true,
                    bevelThickness: squareSize * 0.02,
                    bevelSize: squareSize * 0.01,
                    bevelSegments: 3
                }

                const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
                geometry.computeVertexNormals()

                const square = new THREE.Mesh(geometry, glassMaterial)
                const posX = offsetX + i * (squareSize + spacing)
                const posY = offsetY - j * (squareSize + spacing)
                square.position.x = posX
                square.position.y = posY
                square.position.z = 0
                square.castShadow = true
                square.receiveShadow = true
                scene.add(square)
                squares.push(square)
                originalPositions.push({
                    x: posX,
                    y: posY,
                    z: 0
                })
            }
        }

        // Mouse handling with normalized coordinates
        const handleMouseMove = (event: MouseEvent) => {
            mousePosition.current = {
                x: (event.clientX / width) * 2 - 1,
                y: -(event.clientY / height) * 2 + 1,
            }
        }
        window.addEventListener('mousemove', handleMouseMove)

        // Resize handling
        const handleResize = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            const aspect = width / height
            const viewWidth = viewHeight * aspect

            // Update camera to maintain proper view
            camera.left = -viewWidth / 2
            camera.right = viewWidth / 2
            camera.top = viewHeight / 2
            camera.bottom = -viewHeight / 2
            camera.updateProjectionMatrix()

            // Update renderer and composer
            renderer.setSize(width, height)
            composer.setSize(width, height)

            // Recalculate grid positions
            const squareSizeFromWidth = viewWidth / cols
            const squareSizeFromHeight = viewHeight / rows
            const newSquareSize = Math.min(squareSizeFromWidth, squareSizeFromHeight)
            const newSpacing = newSquareSize * 0.08

            const totalGridWidth = cols * (newSquareSize + newSpacing) - newSpacing
            const totalGridHeight = rows * (newSquareSize + newSpacing) - newSpacing

            const newOffsetX = -totalGridWidth / 2 + newSquareSize / 2
            const newOffsetY = totalGridHeight / 2 - newSquareSize / 2

            squares.forEach((square, index) => {
                const i = Math.floor(index / rows)
                const j = index % rows
                const posX = newOffsetX + i * (newSquareSize + newSpacing)
                const posY = newOffsetY - j * (newSquareSize + newSpacing)
                originalPositions[index] = {
                    x: posX,
                    y: posY,
                    z: 0
                }
                square.position.x = posX
                square.position.y = posY

                // Update square size
                square.scale.set(
                    newSquareSize / squareSize,
                    newSquareSize / squareSize,
                    newSquareSize / squareSize
                )
            })
        }
        window.addEventListener('resize', handleResize)

        let time = 0
        const animate = () => {
            requestAnimationFrame(animate)
            time += 0.01

            targetPosition.current.x += (mousePosition.current.x * viewWidth / 2 - targetPosition.current.x) * 0.1
            targetPosition.current.y += (mousePosition.current.y * viewHeight / 2 - targetPosition.current.y) * 0.1
            sphere.position.x = targetPosition.current.x
            sphere.position.y = targetPosition.current.y

            // Update grid squares - keep them in their original positions
            squares.forEach((square, index) => {
                const originalPos = originalPositions[index]

                // Reset positions to original
                square.position.x = originalPos.x
                square.position.y = originalPos.y
                square.position.z = originalPos.z

                // Reset rotations
                square.rotation.x = 0
                square.rotation.y = 0

                // Keep material properties constant
                const material = square.material as THREE.MeshPhysicalMaterial
                material.roughness = 0.1
                material.transmission = 1
                material.thickness = 0.4
                material.metalness = 0.0
            })

            // Clear with transparency before rendering
            renderer.setClearColor(0x000000, 0)
            renderer.clearColor()

            // Render the scene through the composer
            composer.render()
        }
        animate()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            containerRef.current?.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 bg-transparent"
        />
    )
}