let scene, camera, renderer, grid;
        let objects = [];
        let gui;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('canvas-container').appendChild(renderer.domElement);

            // Add grid
            grid = new THREE.GridHelper(10, 10);
            scene.add(grid);

            // Add light
            const light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(0, 10, 0);
            scene.add(light);

            camera.position.z = 5;
            camera.position.y = 5;
            camera.lookAt(0, 0, 0);

            setupGUI();
            setupEventListeners();

            animate();
        }

        function setupGUI() {
            gui = new dat.GUI();
            gui.domElement.id = 'gui';
        }

        function setupEventListeners() {
            document.getElementById('addCubeBtn').addEventListener('click', addCube);
            document.getElementById('addSphereBtn').addEventListener('click', addSphere);
            document.getElementById('exportButton').addEventListener('click', exportARCode);
            document.getElementById('copyCodeBtn').addEventListener('click', copyCode);
            document.getElementById('closeCodeBtn').addEventListener('click', closeCodeOutput);
            window.addEventListener('resize', onWindowResize);
        }

        function addCube() {
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            objects.push(cube);
            addObjectControls(cube);
        }

        function addSphere() {
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            const sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);
            objects.push(sphere);
            addObjectControls(sphere);
        }

        function addObjectControls(object) {
            const objectFolder = gui.addFolder(`Object ${objects.length}`);
            objectFolder.add(object.position, 'x', -5, 5);
            objectFolder.add(object.position, 'y', 0, 5);
            objectFolder.add(object.position, 'z', -5, 5);
            objectFolder.add(object.rotation, 'x', 0, Math.PI * 2);
            objectFolder.add(object.rotation, 'y', 0, Math.PI * 2);
            objectFolder.add(object.rotation, 'z', 0, Math.PI * 2);
            objectFolder.add(object.scale, 'x', 0.1, 2);
            objectFolder.add(object.scale, 'y', 0.1, 2);
            objectFolder.add(object.scale, 'z', 0.1, 2);

            // Add color control
            const colorControl = objectFolder.addColor(object.material, 'color');
            colorControl.onChange((value) => {
                if (typeof value === 'string') {
                    object.material.color.setStyle(value);
                } else if (typeof value === 'number') {
                    object.material.color.setHex(value);
                }
            });
        }

        // gives constant feed on the 3D space 
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        function exportARCode() {
            let code = '<a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;" vr-mode-ui="enabled: false">\n';
            code += '  <a-marker preset="hiro">\n';

            objects.forEach((obj, index) => {
                const type = obj.geometry.type.includes('Box') ? 'box' : 'sphere';
                code += `    <a-${type} position="${obj.position.x.toFixed(2)} ${obj.position.y.toFixed(2)} ${obj.position.z.toFixed(2)}"
                      rotation="${(obj.rotation.x * 180 / Math.PI).toFixed(2)} ${(obj.rotation.y * 180 / Math.PI).toFixed(2)} ${(obj.rotation.z * 180 / Math.PI).toFixed(2)}"
                      scale="${obj.scale.x.toFixed(2)} ${obj.scale.y.toFixed(2)} ${obj.scale.z.toFixed(2)}"
                      color="#${obj.material.color.getHexString()}"></a-${type}>\n`;
            });

            code += '  </a-marker>\n';
            code += '  <a-entity camera></a-entity>\n';
            code += '</a-scene>';

            document.getElementById('codeText').textContent = code;
            document.getElementById('codeOutput').classList.remove('hidden');
        }

        function copyCode() {
            const codeText = document.getElementById('codeText').textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                alert('Code copied to clipboard!');
            });
        }

        function closeCodeOutput() {
            document.getElementById('codeOutput').classList.add('hidden');
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        init();