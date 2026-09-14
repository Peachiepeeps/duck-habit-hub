// Duckie Days v24.179 — isolated external Hatching Area recovery.
// This file is loaded AFTER the main Duck Quest script so it still runs even if
// a late legacy hatchery patch inside the large game file throws or conflicts.
(function(){
  'use strict';
  const BUILD='24.179';
  const HATCH_BG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAFACAYAAAAVuVaJAAAAAXNSR0IArs4c6QAAAKJlWElmTU0AKgAAAAgABgEGAAMAAAABAAIAAAENAAIAAAARAAAAVgEaAAUAAAABAAAAaAEbAAUAAAABAAAAcAEoAAMAAAABAAIAAIdpAAQAAAABAAAAeAAAAABVbnRpdGxlZCBBcnR3b3JrAAAAAAu4AAAAAQAAC7gAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAALSgAwAEAAAAAQAAAUAAAAAA3pzFJQAAAAlwSFlzAAHNXgABzV4BuHKTWgAAA/FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6SXB0YzR4bXBFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iPgogICAgICAgICA8dGlmZjpEb2N1bWVudE5hbWU+VW50aXRsZWQgQXJ0d29yazwvdGlmZjpEb2N1bWVudE5hbWU+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjMwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb24+MjwvdGlmZjpQaG90b21ldHJpY0ludGVycHJldGF0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8ZGM6dGl0bGU+CiAgICAgICAgICAgIDxyZGY6QWx0PgogICAgICAgICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPlVudGl0bGVkIEFydHdvcms8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QWx0PgogICAgICAgICA8L2RjOnRpdGxlPgogICAgICAgICA8SXB0YzR4bXBFeHQ6QXJ0d29ya1RpdGxlPlVudGl0bGVkIEFydHdvcms8L0lwdGM0eG1wRXh0OkFydHdvcmtUaXRsZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cj008gQAABWkSURBVHgB7Z2/jhzHEcZn7/ZInmlZpAIZCgQlCggwceDYMAzrFZQIcOqL/CAK5eSUGlAi6A1oG4YTJw6cECBsJYICwYIgygbkE3nHW2/tsXi1fT0z3TPd01Xd3xLk9L+prv7qN7U9s3vH1UeP/rvp8IIClShwUMk6sAwosFMAQAOEqhQA0FWFE4sB0GCgKgUAdFXhxGIANBioSgEAXVU4sZh1bRKc/Dp+Sad/vKhNhmbXEx99ZVJNAdhdgmsDgLsK2ambBdqFMKXkbBtgp1R1GVvmgGbYlpCH5wLYS6idZg5TN4UMWJqlh1uheUvNHe4lRpICZoDWAJQGH4DtsALqgdaWHQH1MFCle1UDrRUerX6VhknD/Gutm46TX+m+XyWoT/+M59caIJY+qM7Q0lGNZe0XnUbNcvukEmiAkjvs9dpXB7Q1mK35Wy/KVysb3aiGBizFfjJ0rtqDgvVNV8AL9BSw+JwUYE9fTpkzae0trruM2sOzrj760/5PfTOYw6eN98YGONW8457lGxG75lBPYrXJ5UeovyXHvcrQsaKNOU32QoVNPfeYbxb652gizw2NgQVNQnzcPYc++eUrrkPOCR6zg/ovDT2rnXmLnSMODPdpI3FYPd/8L/svmhkSM0cQg6+4DAOH1uqbbun1x/rn81lz28ycEra0pYMW5lX5USV0KTHnkkovAnTfgmoXd2jdJddecu4+TVK1LwZ0zSLKYAytk/qG+qWd3GUtfqRe52JAp3bckj1NIEvdaoR6kZtCKSLflNQoprtOK2vkmEj/rZaRoTNFzgrMmZZfzOziGbrYSjHxoAKnf63j8wJk6MEwt9N58os8H64trSCAXlpxzJdVAQCdVV4YX1oBAL204pgvqwIAOqu8tozXsI8G0LaYg7cjCgDoEYHQbUuBOp7V2NJct7dHut0b8w4Zekwh9JtSAECbCldeZ0//Zv/TQgCdlxFYX1gBAL2w4JgurwIAOq++ZqzXsN0gsQG0GeTgaIgCADpEpcrH1JKdKUx4Dl05rGPLO/379smG8WfPco0AWqqBshkFTn7uR9ffamZZcHSOArvsPMfAguf2Aey6AKBdRRqpW4A5FGIZMgAt1WigXCvIHDoAzUo0cNQO85SM7IYNQLuKVFrXDHMKkDlsAJqVqPSoGWSSPCXMZA9AkwqVvk7/sX3GrDjCJz9L71x6i5XCYWlZO5CVO5wDZloygFYe+Bj3LIBM68kFM9kG0KSC8ZcVkJeQGUAvoXKmOSyCnDM7k8wAOhNsucxahDiXFj67ANqnirK2WiDOnZ0pbABaGbzsTi0Q83qWOgLopZQemef0sfMT1xV9R3lk6Um7AXRSOcON3QA4/FSMHFAAQA+Ik6oL8KZSctzOekzsk4dgfkzGMQ3Hzkd/OgVGac0RLK0XSY61pgsVLIUoMAp0iJHYMQAnVjGMD1UAv8YgVCmMm63AEokMQM8OEwxoUmDdHWpyB77UrsDpk4vu5EG+nS4ydO0EKVwfQZ3rBaBzKQu7gwrkghpAD8qOzpwKENSpwQbQOSMG20EKpIQ63+48aCkYBAWuFJBQz7lpBNAgSp0CEm5yLgZwAK0unHDIVSAG8PXqYOOejzoUUK3Ax/887/UPN4W90qDDogIA2mLU4HOvAgC6Vxp0WFQAQFuMGnzuVQBA90qDDosKAGiLUYPPvQoA6F5p0GFRgTX+L1mLYYPPfQogQ/cpg3aTCgBok2GD030KAOg+ZdBuUgF8OSkgbL/590feUX/46e+87WgspwCAdrTvg9cZlqQ6NBculmkSA+itbkNgDck69bwhmzF9ffO3fDGsfv+v/zT5/dE+GGKA0jy2VairzNC1w6r5QirtWxDQb93/eOfnV09/m9zflLYBcvLwLGIwJQOvHtux0bEV0LjQsSG25Jg5tgGzVHK/zPGS+sry/ujptVQ2pZ2+cp+XuwxNJ8kX1d1s7NbleLfs2qN+Op/bZdk9l+o8TvbFzC/Pa73s01Jqwv1D+soxfWVpc6xMNsYYCLHBY6StNTvInXx02/vq0hidOyQM2/YdXfshY3juqXP65qiljd+xHt2/fWNJPq25jTXlk6Zo69ry2eAxPA8d3TZZ7yu7560+++ZDs085WHw+vvfkmdQHZUeBRw9uwu0MuVFlbd0O2S7L7ril66aBZrEAMisxfpwC9bhVPSOCnnLocXffE4C8r0dIjTWrFWyzQHNgQoI4Nubsi8djQxbpP37n4SLz0CSkX41QmwQ6BcxaIJYEh/iUEvoaoTYFdK0gS6jHyqmhZ01rydavPlgZExL9dSvAYFtfpSmgU2SRlG/Z1oPv+l8D1KaApgAAahfDm/WQbcnNs65aJNRff//VjWHU5mu/MbBQgzmgpeCFNKt+WqmxZnh9gTAFtBTat5iQNspeczJYyBylx6TaVr15963dUixBbeYpRwqYS4O21Px8waYCW/rNkMs2TWWVQHNGIPGo/MGXbyTTjIPMQU9m2LihvnsT7QC7sqsE2nUyR53BJts1wS3XFaMbvQP2QR1jp/RYE3voT97+NqtOBIH8m3WyjManwswu1bCtU5mheavBQl+97ZX9auhcWHgtMUffO0duP6xnapVAU9B578bHT98927Hw/ufHMUxMGpsbmlCnpB8+uEPtxI57evFdd399L/Y0FeNNbDmkUgy2bGuhTHBLwHOumZIGQW3xZQ5oiyJb9Nkq1OaAXmLLYRFA+HylgDmgEbhlFbC29QDQy/JhZjar9yrmgLYqtBWSSV9XY0tZWu1juyEAWHDsp4dUCu9jPcPP0DvSDND0XNTNFDGBAPw3IYzR7+bZOltMbTmsPuzXGfquq/EiNwU0gQGotV4eOvwys+WQcvm2H7LfV5ZvrzVmJt+aU7VZSiImgaZATYGaAyzh5jZ5nAp8n92p9qRPseU+X2LtWBtvFmgSmjOHe7O4VBBCoaFxY1C7tsbG0xrdc5Zat+Z5qvhljSRwaqglUKXBkb4wTEv5xEmD59V+rAZoFjo12Gy3xeOqW3X31q+bWrrpLYdPac4oANunzljbqlt3h936YN2tV+vuaPvX2suex4EKA+wwoQ66gy24Rzt4CWTKypZf1QLNQQHYrMT18XCbhY8OjrpbW5APV4fXHRWUqgeaY8RgU72F7YhcL2vQwrEZoGUwZbD1w73abgq2f1a0GVh1Pz68K5eCsqNAk0BLDSTc1J4TcALyCs6DHZw7RLeg8uv44A4XcZyoQPNAu7q5gLv9fcC7oN49/JF7KuoLKACgI0UeAz7SHIYnVsDEt+3o99vx77vj9fvauA/HdhUwAXS74cHKYxUwATT/9iQ3S8cuFuPrV8DMHpqhliHxtcl+lPMowIlFo/4mMrQvLBrF9PlZexvDrWWdZoHWIiD80KUAgNYVj+LebLrNqA+a3x3N7KFHVcaAyQpcbC66i82L7d+L4I/WGWo+Tp488YkAOrGgFsxddpfd+eVFd74530FMWfnqA6PbFtwf9BFAD8pTT+eLbQZ+vgX4/PK8e7H9I181ffrZJNB8Z85vl1Tnsgx0TWX63vMx/a38C1BNAq0dVNoCXG52/25Lm91PlGj3WYt/TQJN2ZiyMmfqnMG4gpN2rZfdZgvp9l8x3aa748mY9LXSw93XSvEQSogVVGwSaFKGtxhzoCY4L7d7UzoSrLcPbt0Q/QpO+qGn7Y86XX/1+cY4NKRRoFmgWT4Gm+sxR/qa/gH/ZDRgjZEu21i8p2WTFoZLKACgS6iOObMpAKCzSQvDJRQA0CVUx5zZFADQ2aTNa3ipx455V5HeOoBOr2l2i/yocc4TmuxOFpoAQBcSfmhaN/sywHSOLA/ZaLUPQBuJvAsysrM/cADar0vRVobVhZicoj7uL+qk0smb/6RQaVz2oAXA4VFChg7XCiMNKACgDQQJLoYrAKDDtcJIAwqYAdq9QaK622ZAb7iYWQEzQJMOADgzDRPNu3Fx6xPNTjrNFNB9KyQBS4rY51dL7Vr0NwM0P7pyhXPrLUGkba0aYmEG6LHgMfBj49CfXgGpfWmoTX2wIoWT5fQhgsVYBbTEo5oMHRsAjK9TAQBdZ1ybXRWAbjb0dS4cQNcZ12ZXBaCbDX2dCzf1lKPOEFyv6r0nz64rovTogf1fcyuWk7UIoCPl7YOOzOQCzzdnrrki5VA3vEmgfYCkALLPbo6oy7kA97XCq8+++VD+OszrnkpLEoQal9g63E1m6BpB5jWFXLA1Q4+nHExCQ0eCPgR8i5IAaItRS+RzjVAD6ERwwIwOBZrZQ9eYjXQgpMuLqoEGxMOw1XhzWO2WAzAPw0y9pFFtOlWXoWsL0DiW80ewZjVk7KqA5sDMD3GYhbMvHocNzDzq+J2HSWYg/axDXQ3QqWHWAmsIqdLXuXBbh9o80FNAlgCEAGNpDK9tDtisqcVsbfqmkIW3BBx8zauAWaABcz8Yc7IzW7WYncl3k0DPgZnfkjlwtR1bhtkk0HNgrg3eXOuxrLHJDD0nkCky2Jz5c59L70Ap3oWsQt0U0KmCnRtKLfYtQm3usd2n757txfv9z4/36q1XUr8DEdSWbhBNAf304rs9XmNhlsFO8ba850zBilxXQTdUTG0KaKlYLMzyXCoTBFahXhJgS9mZ4moS6Lkw08LpNQSGD/ah8VcW0//r8yP9LPVYNAn0kvKXgFiur9T8r+5VLs66++t70iXVZTNA8/45VXYei0opkMb8WqL/FcwvJyPtrUBt6rHdUjAvAQ3myKOAGaCtZIg8YVrWquXEYQboZUOK2VwFeMvntmurmwLa3dtpExP+lFfAFNAkF0ENsPOCY1lfM085KIS0j+a3Pim65T1fXjTjrEtN487UM9oU0CSbhJpl5EAAbFbk+sjaXLfUXTK35egLB2DuU6atdpNA4xFeW5DGrNbcloMX59t6cF/rx9a2GTLeZoGmRXCmphvF0CCW2Jr0+TbVlz57MrCtlk0DzUGTYHNb33EIhhDA3PPHznHHS7/cvjFb8tyly6zx0vPGzlft/7HCj/diBfFB5YIXa3PueOlTCV8Ou8PuJ+vX5i5jkfOrBdpVbyrgrp226qvttu51U0uuYssRorj7lqkFcNevkLWkGDO0/lW36u5FgPz191/tXHrz7lspXJtloxmgXZV8IA0F2T0/pO6bI+S8JcZM9U0TvD6dmgXaJ8bUIPtstdKmDXCTH6y0AgvWGa8AgI7XrOkz3H0y1d22kgIB6JLqG51bE8CuhADaVQR10woAaNPhg/OuAgDaVQR10woAaNPhg/OuAgDaVQT1RRWg59j8LJsmduuxzjQP9KbbxGqG8QsqEAt480DT9xbwKqcAPwKUWZq98bVxX98RH333KYP2Igow4HJyX5vsl2UALdVAuYgCfcD2tQ852fyWY0gc9NlTwCzQsTcL9kIDj6coYBZod7Eu4G7dHY96nQqYBZr3V3wnzPU6w4RVhSpgFuihBQLyIXXq7jP9lMPNym697tBhdT4FTAPtWxC1Aew+Zepvr3LLUX/YsMI+BQB0nzJoN6kAgDYZNjjdpwCA7lMG7SYVANAmwwan+xQA0H3KGG1v/RNSAG0QXP7gyHW9r90dV3MdQBuNrpuJJcwtP4cH0AaBHgJ2qC92qe5Fw+f3tXN/yWOVnxSWFHSpuV1w3XouP+Q7Ac/BbUv5wPP6jsjQPlXQNqoAw8swj56w0AC1GZqEckXj+kLaND+NT2/ZJmGW7SWFUws0iSKhliJpFFL610pZC8RSb9NbDo2CSnFRXl4BtRl6DNax/uWlxIwaFDCZoQGzBnR0+qA2Q0u5ALBUA+UhBUxm6KEFoa9tBQB02/GvbvUAurqQtr0gAN12/KtbvYmbQg2qv/fkmdeNRw9ue9vRWEYBAO3RvQ9ez9DZTUNz4WKJlxdAv9RsCKwhWaeeN2Qzpq9v/lYvhtVn33zY7P/J0AdDDFCax7YIdbUZunZYNV9IJX2rDmiAXBKn8nNX9dgOMJcHqrQHVQFdWkzMX14BAF0+Btk8oHes1t61qnvK0VoAY6+G2p98VJOhW8xGsTDT+NovePNPOWoP0BRox85hzWrM1qaB5sCMBTCk/+yLxyHDso85fudh9jl4AtKvNqjNAp0CZi0QM2B0DPEpJfS1QW0O6FpBllCPlVNDz5rWkK2ruSkcgwD94wow2OMj9Y4wB3SKLJLyLVtvaKd5Zh1qE0DTb0ri35ZEx0/e/nZatMRZtUMdsi0RcuwVLUNtAmj31xh88OUbewFAJb0CVqE2c1PIUKeAeU72So9OHou1vwP1qWYiQ7PzVrMG+7/kkS7aFi5cV1MzGTolzJy9Wgy4C4Csp7jhlvZKlM0AnUMcBpts1wS3XFeMbpQ0rENt6tt2KbP0WKCtAj4VZqmHZaibztAyiCHlFLCEzCPH+C6s3H5YztSmgKbM8fTiu+79z49lzLOUc0MT6rT0wwd3qJ1Wxpl6ykEw0+vTd89aic/eOgluCfheZ+LK2PbustP52y/MAM0wJ44bzA0oMAT188vnA2eW6zIDtJRoiS2HnA/lmwoA6JuaoMWoAs83592L7R+NL5MZWqOQNfrU9/juhxc/qF2uSaBbvSlciiLSt09j2mpQdr6/vreUO1HzmHpsJ1fGgmM/LVWZXmY9pQW6EZfgbrZPNs4u9WZn8t0s0Cy8LxDc5x4Bv6tI3CPQHy6fdZfbPxLymxbLtqjdcrzY6LzpKBuu9LOPXeT8uJRuBI8P7qiGmdRRC/Th6nAvepqzwp6jlVUOXiJya3VkYmXmtxwxKsvtyVhmirFb89gjIyBzDEwBTVma3wJ5AVOPEm6fjanA99mdas/nW2hbny+h59O42we3YoYXH2sKaFIrJdQp1A+FhsaNQe3aGhtP/rvnpFgT26Ds7G79uE/r0dT3oV0RU2Vr1y7XJVA5weH5ho7SFx6X26efHL42CjT/ND7/zCf7VupoLkNLoUKy9fmzq2/mHd2++sop1bksbfnKuYHxzdnXtrQvt1a3vDBrA9jVyzTQtBj59CN3xnbFq7W+6la7R3QW16f2sd0UMQluCbi0QZmZs7Vs11D2+SZ9leUl/L2zfd58sPKjwVsLytQas7X5DO0L8B7UW8hZeN9YtO0rcLTdatw5CPvvnhnufQtla1UC7UrKwjPYe8C7g1/Wl9y+0J6es7S7v18uO6+2726v96ix38x67rfqqDUBNEsdE4gQ6Nlu7DHkYnHBjp0jbHw4xGH2yo9qCujycl954L1Y+r6O2dMeclHQbN65tAiRwQ8AnUHUJUy2Bmqopv5b2dCzMQ4KKFMAQCsLCNyZpwCAnqcfzlamAIBWFhC4M08BAD1PP5ytTAEArSwgpd2RH2mX9mXK/AB6imqec/hTSE+XuqZYaC2trRqgY4MUQ5kb0JxzxfiVeqy7TrLva0s9b0p7/wc3asud5ikDEAAAAABJRU5ErkJggg==";
  const api=window.DuckieHatchApiV178 || null;

  // Remove every earlier hatchery surface. The v24.179 screen uses a brand-new
  // id and is never passed through the legacy showScreen('hatchery') chain.
  document.getElementById('hatcheryScreen')?.remove();
  document.getElementById('hatcheryScreenV178')?.remove();
  document.getElementById('hatcheryScreenV179')?.remove();
  document.getElementById('duckieHatchV179Style')?.remove();

  const style=document.createElement('style');
  style.id='duckieHatchV179Style';
  style.textContent=`
    body.hatchery-v179-active{overflow:hidden!important;}
    #hatcheryScreenV179{
      position:fixed!important;z-index:2147483000!important;
      top:var(--hatch-v179-top,72px)!important;left:0!important;right:0!important;bottom:0!important;
      width:100vw!important;height:auto!important;min-height:0!important;max-height:none!important;
      margin:0!important;padding:0!important;display:block!important;overflow:hidden!important;
      background-color:#9ee78f!important;background-image:url("${HATCH_BG}");
      background-position:center center!important;background-repeat:no-repeat!important;background-size:cover!important;
      image-rendering:pixelated!important;transform:none!important;
    }
    #hatcheryScreenV179.hidden{display:none!important;}
    #hatcheryScreenV179 .hatchery-v179-topbar{
      position:absolute!important;z-index:50!important;top:10px!important;left:10px!important;right:10px!important;
      display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:start!important;gap:8px!important;
      pointer-events:none!important;
    }
    #hatcheryScreenV179 .hatchery-v179-topbar>*{pointer-events:auto!important;}
    #hatcheryScreenV179 .hatchery-v179-title{
      justify-self:start!important;padding:6px 10px!important;border:2px solid rgba(255,255,255,.95)!important;
      border-radius:999px!important;background:rgba(255,250,246,.92)!important;color:#7c4f52!important;
      box-shadow:0 3px 0 rgba(102,67,61,.15)!important;font-size:.72rem!important;font-weight:900!important;
      letter-spacing:.05em!important;
    }
    #hatcheryScreenV179 .hatch-inventory-button{
      min-height:34px!important;padding:5px 9px!important;border:2px solid #8c625d!important;border-radius:10px!important;
      background:#fff6df!important;color:#6f4a45!important;box-shadow:0 3px 0 rgba(102,67,61,.18)!important;font-weight:900!important;
    }
    #hatcheryScreenV179 #hatchWorldReady{
      position:absolute!important;z-index:45!important;top:13%!important;left:50%!important;transform:translateX(-50%)!important;
    }
    #hatcheryScreenV179 .hatch-nest-slots-v179{
      position:absolute!important;inset:0!important;z-index:20!important;display:block!important;width:100%!important;height:100%!important;
      pointer-events:none!important;
    }
    #hatcheryScreenV179 .hatch-nest-slot{
      position:absolute!important;left:50%!important;width:min(50vw,190px)!important;height:18%!important;min-height:74px!important;
      transform:translate(-50%,-50%)!important;display:grid!important;place-items:center!important;
      border:0!important;border-radius:999px!important;background:transparent!important;box-shadow:none!important;
      padding:0!important;margin:0!important;pointer-events:auto!important;cursor:pointer!important;
    }
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(1){top:35%!important;}
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(2){top:64%!important;}
    #hatcheryScreenV179 .hatch-nest-slot:nth-child(3){top:89%!important;}
    #hatcheryScreenV179 .hatch-main-egg{
      position:absolute!important;left:50%!important;top:48%!important;transform:translate(-50%,-50%)!important;
      width:72px!important;height:72px!important;object-fit:contain!important;image-rendering:pixelated!important;
    }
    #hatcheryScreenV179 .hatch-empty-plus{
      width:38px!important;height:38px!important;display:grid!important;place-items:center!important;border-radius:50%!important;
      background:rgba(255,250,240,.90)!important;border:2px solid rgba(140,98,93,.82)!important;color:#9b6575!important;
      font-size:1.2rem!important;font-weight:900!important;
    }
    #hatcheryScreenV179 .hatch-slot-status{
      position:absolute!important;left:50%!important;top:82%!important;transform:translateX(-50%)!important;white-space:nowrap!important;
      padding:3px 7px!important;border-radius:999px!important;background:rgba(255,250,240,.92)!important;color:#76545d!important;
      font-size:.58rem!important;font-weight:900!important;
    }
    #hatcheryScreenV179 .hatch-modal{z-index:2147483100!important;}
    @media(min-width:521px){
      #hatcheryScreenV179{left:50%!important;right:auto!important;width:min(520px,100vw)!important;transform:translateX(-50%)!important;}
    }
  `;
  document.head.appendChild(style);

  const screen=document.createElement('section');
  screen.id='hatcheryScreenV179';
  screen.className='hidden';
  screen.dataset.build=BUILD;
  screen.setAttribute('aria-label','Hatching Area');
  screen.innerHTML=`
    <div class="hatchery-v179-topbar">
      <div class="hatchery-v179-title">Hatching Area</div>
      <button id="hatchInventoryButton" class="hatch-inventory-button" type="button">Inventory <span id="hatchInventoryCount" class="count">0</span></button>
    </div>
    <div id="hatchWorldReady" class="hatch-world-ready hidden">An egg is ready! ✨</div>
    <div id="hatchNestSlots" class="hatch-nest-slots hatch-nest-slots-v179" aria-label="Incubating eggs"></div>
    <div id="hatchDetailModal" class="hatch-modal hidden" aria-hidden="true">
      <button id="hatchDetailBackdrop" class="hatch-modal-backdrop" type="button" aria-label="Close egg window"></button>
      <section class="hatch-modal-card" role="dialog" aria-modal="true" aria-labelledby="hatchDetailTitle">
        <button id="closeHatchDetail" class="hatch-modal-close" type="button" aria-label="Close">×</button>
        <div class="hatch-modal-heading"><span id="hatchDetailKicker" class="mini-label">INCUBATOR</span><h2 id="hatchDetailTitle">Buddy Egg</h2><small id="hatchDetailSubtitle">Warm and cozy.</small></div>
        <div class="hatch-window">
          <div id="hatchGlow" class="hatch-window-glow" aria-hidden="true"></div>
          <img class="hatch-window-nest" src="assets/eggs/Hatch-nest.png?v=24-179" alt="">
          <img id="hatchDetailEgg" class="hatch-window-egg" src="assets/eggs/Common-egg.png?v=24-179" alt="Buddy egg">
          <div id="hatchResult" class="hatch-result hidden" aria-live="polite"></div>
        </div>
        <div id="hatchDetailStatus" class="hatch-detail-status">Incubating...</div>
        <div id="hatchDetailActions" class="hatch-detail-actions"></div>
      </section>
    </div>
    <div id="eggInventoryModal" class="hatch-modal hidden" aria-hidden="true">
      <button id="eggInventoryBackdrop" class="hatch-modal-backdrop" type="button" aria-label="Close egg inventory"></button>
      <section class="hatch-modal-card" role="dialog" aria-modal="true" aria-labelledby="eggInventoryTitle">
        <button id="closeEggInventory" class="hatch-modal-close" type="button" aria-label="Close">×</button>
        <div class="hatch-modal-heading"><span class="mini-label">EGG INVENTORY</span><h2 id="eggInventoryTitle">Choose an Egg</h2><small>You can keep as many eggs as you find.</small></div>
        <div id="eggInventoryGrid" class="egg-inventory-summary"></div>
        <p id="eggInventoryNote" class="egg-inventory-note">Only three eggs can incubate at once.</p>
      </section>
    </div>`;
  document.body.appendChild(screen);

  function setTop(){
    const header=document.querySelector('.quest-header');
    const top=Math.max(0,Math.round(header?.getBoundingClientRect().bottom||72));
    screen.style.setProperty('--hatch-v179-top',`${top}px`);
  }
  function hideQuestScreens(){
    ['homeScreen','dashScreen','charmScreen','buddyScreen','battleScreen','resultScreen'].forEach(id=>document.getElementById(id)?.classList.add('hidden'));
    document.querySelectorAll('.quest-modal').forEach(el=>{el.classList.add('hidden');el.setAttribute('aria-hidden','true');});
  }
  function render(){
    try{api?.renderHatchery?.();}catch(error){console.warn('v24.179 hatchery render',error);}
  }
  function open(){
    hideQuestScreens();
    document.body.classList.remove('hatchery-active','hatchery-v178-active');
    document.body.classList.add('hatchery-v179-active');
    setTop();
    screen.classList.remove('hidden');
    window.scrollTo?.(0,0);
    render();
    requestAnimationFrame(()=>{setTop();render();});
  }
  function close(){
    screen.classList.add('hidden');
    document.body.classList.remove('hatchery-v179-active','hatchery-active','hatchery-v178-active');
    document.getElementById('homeScreen')?.classList.remove('hidden');
    window.scrollTo?.(0,0);
    try{renderMeta?.();}catch(error){}
  }

  // Clone the home button to physically remove every legacy hatchery click
  // listener. This guarantees the old showScreen('hatchery') chain never runs.
  const legacyButton=document.getElementById('openHatchery');
  if(legacyButton){
    const cleanButton=legacyButton.cloneNode(true);
    legacyButton.replaceWith(cleanButton);
    cleanButton.addEventListener('click',event=>{event.preventDefault();open();});
  }

  document.getElementById('hatchInventoryButton')?.addEventListener('click',()=>api?.openEggInventory?.(null,false));
  document.getElementById('closeHatchDetail')?.addEventListener('click',()=>api?.closeHatchDetail?.());
  document.getElementById('hatchDetailBackdrop')?.addEventListener('click',()=>api?.closeHatchDetail?.());
  document.getElementById('closeEggInventory')?.addEventListener('click',()=>api?.closeEggInventory?.());
  document.getElementById('eggInventoryBackdrop')?.addEventListener('click',()=>api?.closeEggInventory?.());

  // Capture the global back button while v24.179 is open. Other screens keep
  // their normal back behavior.
  document.getElementById('backGames')?.addEventListener('click',event=>{
    if(screen.classList.contains('hidden')) return;
    event.preventDefault();event.stopImmediatePropagation();close();
  },true);

  window.addEventListener('resize',()=>{if(!screen.classList.contains('hidden'))setTop();},{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(()=>{if(!screen.classList.contains('hidden'))setTop();},100),{passive:true});
  window.visualViewport?.addEventListener('resize',()=>{if(!screen.classList.contains('hidden'))setTop();},{passive:true});
  setInterval(()=>{if(!screen.classList.contains('hidden'))render();},1000);

  window.DUCKIE_HATCH_SURFACE='24.179-external';
})();
