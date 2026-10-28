import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js';
import {GLTFExporter} from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/exporters/GLTFExporter.js';
const $=id=>document.getElementById(id),stage=$('stage'),status=$('status');
const scene=new THREE.Scene();scene.background=new THREE.Color('#20182b');
const camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(5.6,4.3,7.2);
const renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;stage.appendChild(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.target.set(0,1,0);controls.maxPolarAngle=Math.PI*.49;
scene.add(new THREE.HemisphereLight(0xf4eaff,0x45334e,2.1));const light=new THREE.DirectionalLight(0xfff3e6,3);light.position.set(4,8,5);scene.add(light);const fill=new THREE.DirectionalLight(0xb68aff,2);fill.position.set(-5,4,-3);scene.add(fill);
const floor=new THREE.Mesh(new THREE.CircleGeometry(8,64),new THREE.MeshStandardMaterial({color:0x2a2035,roughness:.85}));floor.rotation.x=-Math.PI/2;floor.position.y=-.04;scene.add(floor);
const root=new THREE.Group();root.name='Coloured_Birthday_Cake';scene.add(root);const cake=new THREE.Group();root.add(cake);let photoPlane=null,selected=null,decorations=[],n=0;
const color=id=>$(id).value;const mat=(c,r=.45)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
function add(geo,m,name,parent=cake){const o=new THREE.Mesh(geo,m);o.name=name;o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function cyl(rt,rb,h,m,name,y){const o=add(new THREE.CylinderGeometry(rt,rb,h,72),m,name);o.position.y=y;return o}
function starGeo(s){const sh=new THREE.Shape();for(let i=0;i<10;i++){let a=i*Math.PI/5-Math.PI/2,r=i%2?s*.45:s;if(!i)sh.moveTo(Math.cos(a)*r,Math.sin(a)*r);else sh.lineTo(Math.cos(a)*r,Math.sin(a)*r)}sh.closePath();return new THREE.ExtrudeGeometry(sh,{depth:s*.22,bevelEnabled:true,bevelSegments:2,bevelSize:s*.05,bevelThickness:s*.04})}
function makeDecor(type){const g=new THREE.Group(),green=mat(color('decor')),dark=mat(color('accent')),pink=mat('#ffe8f4');g.name='Decoration_'+type+'_'+(++n);
if(type==='star')add(starGeo(.23),green,'Star',g);
if(type==='heart'){const s=new THREE.Shape();s.moveTo(0,-.22);s.bezierCurveTo(-.5,.08,-.38,.43,-.12,.35);s.bezierCurveTo(0,.31,.06,.22,.1,.2);s.bezierCurveTo(.4,.52,.68,.16,0,-.22);add(new THREE.ExtrudeGeometry(s,{depth:.09,bevelEnabled:true,bevelSegments:3,bevelSize:.02,bevelThickness:.02}),green,'Heart',g)}
if(type==='orb')add(new THREE.SphereGeometry(.18,24,16),green,'Mini_Ball',g);
if(type==='bow'){for(const x of [-.13,.13]){let b=add(new THREE.TorusGeometry(.13,.055,12,22),green,'Bow_Loop',g);b.position.x=x;b.scale.y=.8}add(new THREE.SphereGeometry(.06,16,12),green,'Bow_Knot',g)}
if(type==='kuromi'){let h=add(new THREE.SphereGeometry(.21,24,16),dark,'Character_Head',g);h.scale.set(1,.85,.7);for(const x of [-.14,.14]){let e=add(new THREE.ConeGeometry(.075,.24,14),dark,'Character_Ear',g);e.position.set(x,.22,0)}let f=add(new THREE.SphereGeometry(.12,18,12),pink,'Character_Face',g);f.scale.set(1,.65,.35);f.position.set(0,-.02,.13);for(const x of [-.045,.045]){let e=add(new THREE.SphereGeometry(.015,8,8),dark,'Character_Eye',g);e.position.set(x,0,.17)}}
if(type==='music'){let m=add(new THREE.CylinderGeometry(.05,.05,.3,14),dark,'Microphone',g);m.rotation.z=-.2;let h=add(new THREE.SphereGeometry(.07,14,10),green,'Microphone_Head',g);h.position.y=.16;let s=add(starGeo(.1),green,'Music_Star',g);s.position.x=.16;s.position.y=.12}
g.userData={type,scale:1};root.add(g);decorations.push(g);selected=g;layoutDecor();selectUI()}
function clearCake(){while(cake.children.length){let o=cake.children[0];cake.remove(o);o.traverse(x=>{x.geometry?.dispose()})}}
function buildCake(){clearCake();const w=+$('width').value,h=+$('height').value,f=+$('frost').value,r=w/2,bh=h*.42,th=h*.58,ur=r*.77;
cyl(r*.91,r,bh,mat(color('bottom')),'Lower_Tier',bh/2);cyl(ur,ur,th,mat(color('body')),'Upper_Tier',bh+th/2+.02);
cyl(ur*1.035,ur*1.035,f,mat(color('top'),.3),'Top_Frosting',bh+th-f/2+.035);
cyl(ur*1.025,ur*1.025,f*.65,mat(color('top')),'Upper_Frosting_Band',bh+th-f*.6);
cyl(r*.925,r*.925,f*.62,mat(color('drip')),'Green_Frosting_Band',bh-f*.45);
for(let i=0;i<32;i++){let a=i*Math.PI/16,b=add(new THREE.SphereGeometry(f*.27,12,10),mat(color('drip')),'Piping_Bead');b.position.set(Math.cos(a)*ur*1.025,bh+th+.035-f*.22,Math.sin(a)*ur*1.025)}
for(let i=0;i<18;i++){let a=i*Math.PI/9,b=add(new THREE.SphereGeometry(.055,10,8),mat(color('drip')),'Tier_Dot');b.position.set(Math.cos(a)*r*.985,bh*.53,Math.sin(a)*r*.985)}
const topper=add(starGeo(.17),mat(color('drip')),'Cake_Topper_Star');topper.position.set(0,bh+th+.2,0);
layoutDecor()}
function layoutDecor(){const y=+$('height').value+.04;decorations.forEach((g,i)=>{g.position.y=y+(g.userData.y||i*.025);if(!g.userData.x&&!g.userData.z){const a=i*2.4;g.position.x=Math.cos(a)*.45;g.position.z=Math.sin(a)*.45}else{g.position.x=g.userData.x;g.position.z=g.userData.z}g.scale.setScalar(g.userData.scale||1)})}
function selectUI(){$('selected').textContent=selected?selected.name.replace('Decoration_',''):'No decoration selected';$('delete').disabled=!selected;$('size').value=selected?.userData.scale||1;$('sizeOut').textContent=(selected?.userData.scale||1).toFixed(1)+'×'}
function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}addEventListener('resize',resize);resize();
const ray=new THREE.Raycaster(),ptr=new THREE.Vector2();function hit(e){const r=renderer.domElement.getBoundingClientRect();ptr.set((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1));ray.setFromCamera(ptr,camera);return ray.intersectObjects(decorations,true)}
renderer.domElement.addEventListener('click',e=>{const hs=hit(e);if(!hs.length)return;let o=hs[0].object;while(o.parent&&!decorations.includes(o))o=o.parent;if(decorations.includes(o)){selected=o;selectUI()}});
document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>makeDecor(b.dataset.add));
$('delete').onclick=()=>{if(!selected)return;root.remove(selected);decorations=decorations.filter(x=>x!==selected);selected=null;selectUI()};
$('size').oninput=e=>{if(selected){selected.userData.scale=+e.target.value;selected.scale.setScalar(+e.target.value);$('sizeOut').textContent=(+e.target.value).toFixed(1)+'×'}};
[['width','wOut',v=>v.toFixed(1)],['height','hOut',v=>v.toFixed(1)],['frost','fOut',v=>v.toFixed(2)]].forEach(([id,out,fmt])=>$(id).oninput=e=>{$(out).textContent=fmt(+e.target.value);buildCake()});
['top','body','bottom','drip','decor','accent'].forEach(id=>$(id).oninput=()=>{buildCake();decorations.forEach(g=>g.traverse(o=>{if(o.isMesh&&o.material?.color){if(/Star|Heart|Ball|Bow|Microphone_Head|Music_Star/.test(o.name))o.material.color.set(color('decor'));if(/Character_Head|Character_Ear|Microphone$/.test(o.name))o.material.color.set(color('accent'))}}))});
$('photo').onchange=e=>{const file=e.target.files?.[0];if(!file)return;if(photoPlane){scene.remove(photoPlane);photoPlane.material.map?.dispose()}const url=URL.createObjectURL(file);new THREE.TextureLoader().load(url,t=>{t.colorSpace=THREE.SRGBColorSpace;const h=2,w=h*t.image.width/t.image.height;photoPlane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));photoPlane.position.set(-3,1.5,0);photoPlane.rotation.y=.3;photoPlane.name='Photo_Reference_Not_Exported';scene.add(photoPlane);status.textContent='Photo loaded as reference beside the 3D cake.';URL.revokeObjectURL(url)},undefined,()=>{status.textContent='Could not load image; try JPG or PNG.';URL.revokeObjectURL(url)})};
$('resetView').onclick=()=>{camera.position.set(5.6,4.3,7.2);controls.target.set(0,1,0);controls.update()};
$('resetCake').onclick=()=>{decorations.forEach(g=>root.remove(g));decorations=[];selected=null;n=0;$('width').value=3;$('height').value=1.2;$('frost').value=.18;$('top').value='#a76cff';$('body').value='#b8a0e8';$('bottom').value='#6d3e9e';$('drip').value='#8fe34b';$('decor').value='#8fe34b';$('accent').value='#25202d';$('wOut').textContent='3.0';$('hOut').textContent='1.2';$('fOut').textContent='.18';buildCake();selectUI()};
async function exportGLB(){status.textContent='Preparing GLB…';try{const clone=root.clone(true);clone.traverse(o=>{if(o.isMesh){o.material=Array.isArray(o.material)?o.material.map(m=>m.clone()):o.material.clone()}});const data=await new GLTFExporter().parseAsync(clone,{binary:true});const url=URL.createObjectURL(new Blob([data],{type:'model/gltf-binary'}));const a=document.createElement('a');a.href=url;a.download='coloured-birthday-cake.glb';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);status.textContent='GLB exported. Check your Downloads folder.'}catch(e){console.error(e);status.textContent='Export failed. Reload the page and try again.'}}
$('export').onclick=exportGLB;$('export2').onclick=exportGLB;buildCake();$('loading')?.remove();selectUI();
(function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera)})();