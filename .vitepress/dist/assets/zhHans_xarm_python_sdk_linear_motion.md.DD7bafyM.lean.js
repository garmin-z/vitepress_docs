import{_ as s,c as e,ai as n,o as t}from"./chunks/framework.CTvXDpzq.js";const m=JSON.parse('{"title":"直线运动","description":"","frontmatter":{"title":"直线运动"},"headers":[],"relativePath":"zhHans/xarm_python_sdk/linear_motion.md","filePath":"zhHans/xarm_python_sdk/linear_motion.md","lastUpdated":1732269888000}'),p={name:"zhHans/xarm_python_sdk/linear_motion.md"};function i(l,a,o,r,d,c){return t(),e("div",null,a[0]||(a[0]=[n(`<h2 id="_1-直线运动" tabindex="-1">1.直线运动 <a class="header-anchor" href="#_1-直线运动" aria-label="Permalink to &quot;1.直线运动&quot;">​</a></h2><h3 id="初始化" tabindex="-1">初始化 <a class="header-anchor" href="#初始化" aria-label="Permalink to &quot;初始化&quot;">​</a></h3><p>假设机械臂控制器的IP地址为 192.168.1.47，初始化机械臂</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from xarm.wrapper import XArmAPI  </span></span>
<span class="line"><span>arm=XArmAPI(&#39;192.168.1.47&#39;)</span></span></code></pre></div><h3 id="使能" tabindex="-1">使能 <a class="header-anchor" href="#使能" aria-label="Permalink to &quot;使能&quot;">​</a></h3><p>如果机械臂未使能，需要使能机械臂。使能后，无需重复使能。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.motion_enable(enable=True)</span></span></code></pre></div><h3 id="设置模式和状态" tabindex="-1">设置模式和状态 <a class="header-anchor" href="#设置模式和状态" aria-label="Permalink to &quot;设置模式和状态&quot;">​</a></h3><p>使能完成后，需要设置模式和状态，机械臂才能运动。 机械臂有多种模式，常用的直线运动、关节运动等都是位置指令，即模式0。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.set_mode(0)</span></span></code></pre></div><p>机械臂可以设置多种模式，模式0用于运动，模式3用于暂停运动，模式4用于停止运动。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.set_state(0)</span></span></code></pre></div><h3 id="发送位置指令" tabindex="-1">发送位置指令 <a class="header-anchor" href="#发送位置指令" aria-label="Permalink to &quot;发送位置指令&quot;">​</a></h3><p>xArm-Python-SDK中，笛卡尔位置为笛卡尔空间中的 x, y, z, roll, pitch, yaw 距离单位为毫米(mm), 默认的角度表示方式为度(°)</p><p>以笛卡尔空间内的直线运动为例，让机械臂先运动到A点 [300,0,150,180,0,0] ，然后运动到B点[400,0,150,180,0,0]</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.set_position(300,0,150,180,0,0)  </span></span>
<span class="line"><span>arm.set_position(400,0,150,180,0,0)</span></span></code></pre></div><h3 id="速度" tabindex="-1">速度 <a class="header-anchor" href="#速度" aria-label="Permalink to &quot;速度&quot;">​</a></h3><p>直线运动set_postion()接口中，速度以speed 参数传入，单位为mm/s. 例如，让机械臂以200mm/s 运动到A点 [300,100,150,180,0,0]</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>arm.set_position(300,100,150,180,0,0,speed=200)</span></span></code></pre></div><h3 id="完整的例子" tabindex="-1">完整的例子 <a class="header-anchor" href="#完整的例子" aria-label="Permalink to &quot;完整的例子&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from xarm.wrapper import XArmAPI  </span></span>
<span class="line"><span>arm=XArmAPI(&#39;192.168.1.47&#39;)  </span></span>
<span class="line"><span>arm.motion_enable(enable=True)  </span></span>
<span class="line"><span>arm.set_mode(0)  </span></span>
<span class="line"><span>arm.set_state(0)  </span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>arm.set_position(300,0,150,180,0,0,speed=200)  </span></span>
<span class="line"><span>arm.set_position(400,0,150,180,0,0,speed=200)</span></span></code></pre></div>`,21)]))}const u=s(p,[["render",i]]);export{m as __pageData,u as default};