import { useEffect } from "react";
import * as THREE from "three";

export default function Home() {
  useEffect(() => {
    // 表示するHTMLタグの取得
    const canvas = document.getElementById("canvas")!;

    // カメラ、光源、物体とか諸々を保持して監視してくれるオブジェクト
    var scene = new THREE.Scene();

    // シーンを描画するときに何が見えるのかを決定するオブジェクト
    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // カメラの角度に基づいてブラウザ内でシーンオブジェクトがどう見えるかを計算するオブジェクト
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // 座標軸の可視化
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // 平面の表示
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    // 平面の定義を使用してメッシュの平面を作成
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // 平面のポジションを指定
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    // シーンに平面データを追加
    scene.add(plane);

    // 四角形を追加
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000,
    });
    // 四角形の定義を使用してメッシュの四角形を作成
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    scene.add(cube);

    // 丸を追加
    var sphereGeometry = new THREE.SphereGeometry(5, 20, 10); // (半径, 水平のセグメント数, 水平方向のセグメント数)
    var sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x7777ff,
    });
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;

    // 丸のポジション指定
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 1;

    scene.add(sphere);

    // カメラのポジションを指定
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 30, -5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    renderer.render(scene, camera);
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
}
