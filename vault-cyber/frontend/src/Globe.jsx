import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function Sphere(){
  return (
    <mesh rotation={[0.3,0.4,0]}>
      <sphereGeometry args={[2,64,64]} />
      <meshStandardMaterial color="#00ff9c" wireframe />
    </mesh>
  )
}

export default function Globe(){
  return(
    <Canvas style={{height:"300px"}}>
      <ambientLight />
      <pointLight position={[10,10,10]} />
      <Sphere />
      <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false}/>
    </Canvas>
  )
}