import { Inter } from "next/font/google";
import { useEffect } from "react";
import * as THREE from "three";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let canvas: HTMLElement;

  useEffect(() => {
    if (canvas) return;
    // canvasを取得
    canvas = document.getElementById("canvas")!;

    // シーン
    const scene = new THREE.Scene();

    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };

    // カメラ
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(0, 0, 100);
    // camera.lookAt(0, 0, 0);

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // // ボックスジオメトリー
    // const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const boxMaterial = new THREE.MeshLambertMaterial({
    //   color: "#008080",
    // });
    // const box = new THREE.Mesh(boxGeometry, boxMaterial);
    // box.position.z = -5;
    // box.rotation.set(10, 10, 10);
    // scene.add(box);

    // ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.2);
    pointLight.position.set(1, 2, 3);
    scene.add(pointLight);

    // // アニメーション
    // const clock = new THREE.Clock();
    // const tick = () => {
    //   const elapsedTime = clock.getElapsedTime();
    //   box.rotation.x = elapsedTime;
    //   box.rotation.y = elapsedTime;
    //   window.requestAnimationFrame(tick);
    //   renderer.render(scene, camera);
    // };
    // tick();

    // 青いマテリアルの生成
    const material = new THREE.LineBasicMaterial({ color: "#000" });
    // 3頂点を持つジオメトリの生成
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    renderer.render(scene, camera);

    // ブラウザのリサイズ処理
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
}
