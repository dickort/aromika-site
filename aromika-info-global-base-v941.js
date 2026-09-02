(function(){
'use strict';
if(window.__AROMIKA_INFO_GLOBAL_V3__) return;
window.__AROMIKA_INFO_GLOBAL_V3__=true;

window.AROMIKA_ASSISTANT_ASSET_BASE='https://raw.githubusercontent.com/dickort/aromika-site/main/romi/';
window.ROMI_V8_CONFIG={
  site:'info',
  apiBase:'https://aromika.shop/index.php?dispatch=romi.',
  shopOrigin:'https://aromika.shop',
  infoOrigin:'https://aromika.info'
};

var oldStyle=document.getElementById('aromika-romi-v94-style');
if(oldStyle) oldStyle.remove();
var style=document.createElement('style');
style.id='aromika-romi-v94-style';
style.textContent="#aromika-assistant{\n  --aa-pink:#ea2f78;--aa-pink-soft:rgba(234,47,120,.09);--aa-ink:#171717;--aa-muted:#706b6d;--aa-paper:#fff;--aa-soft:#f7f4f5;--aa-line:rgba(23,23,23,.10);--aa-shadow:0 26px 74px rgba(24,18,21,.18);\n  position:fixed;right:24px;bottom:24px;z-index:999999;font-family:Inter,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Arial,sans-serif;color:var(--aa-ink);pointer-events:none\n}\n#aromika-assistant *{box-sizing:border-box}\n#aromika-assistant button,#aromika-assistant a,#aromika-assistant input,#aromika-assistant textarea,#aromika-assistant select{font:inherit}\n#aromika-assistant button,#aromika-assistant a{-webkit-tap-highlight-color:transparent;touch-action:manipulation}\n#aromika-assistant img{-webkit-user-drag:none;user-select:none}\n\n/* Romi assets */\n#aromika-assistant .aa-romi{display:grid;place-items:end center;overflow:hidden;flex:0 0 auto;isolation:isolate}\n#aromika-assistant .aa-romi img{display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom}\n#aromika-assistant .aa-romi--launcher{width:58px;height:58px;border-radius:50%;background:radial-gradient(circle at 50% 28%,#fff 0 38%,#f9e9ef 72%,#f6d7e3 100%)}\n#aromika-assistant .aa-romi--teaser{width:68px;height:76px;margin:-11px 0 -13px -5px;overflow:visible}\n#aromika-assistant .aa-romi--head{width:43px;height:43px;border-radius:14px;background:linear-gradient(145deg,#fff,#f8e9ef);border:1px solid rgba(234,47,120,.13)}\n#aromika-assistant .aa-romi--hero{width:138px;height:174px;align-self:end;overflow:visible;filter:drop-shadow(0 14px 18px rgba(97,28,58,.10))}\n#aromika-assistant .aa-romi--stage{width:130px;height:166px;overflow:visible;filter:drop-shadow(0 12px 16px rgba(97,28,58,.08))}\n#aromika-assistant .aa-romi--success{width:160px;height:196px;overflow:visible;filter:drop-shadow(0 14px 18px rgba(97,28,58,.10))}\n\n#aromika-assistant .aa-launcher{pointer-events:auto;width:68px;height:68px;padding:3px;border:1px solid rgba(234,47,120,.22);border-radius:50%;background:var(--aa-paper);color:var(--aa-ink);display:grid;place-items:center;cursor:pointer;box-shadow:0 16px 38px rgba(42,19,30,.20),0 0 0 5px rgba(234,47,120,.06);transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}\n#aromika-assistant .aa-launcher:hover{transform:translateY(-3px) scale(1.02);border-color:rgba(234,47,120,.48);box-shadow:0 20px 44px rgba(42,19,30,.22),0 0 0 7px rgba(234,47,120,.07)}\n#aromika-assistant .aa-launcher>.aa-close-icon{display:none;width:25px;height:25px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}\n#aromika-assistant.is-open .aa-launcher .aa-launcher-mascot{display:none}\n#aromika-assistant.is-open .aa-launcher>.aa-close-icon{display:block}\n#aromika-assistant.is-open .aa-launcher{background:var(--aa-ink);color:#fff;border-color:var(--aa-ink)}\n\n#aromika-assistant .aa-teaser{pointer-events:auto;position:absolute;right:0;bottom:82px;width:326px;min-height:82px;padding:13px 42px 13px 82px;border:1px solid var(--aa-line);border-radius:21px;background:var(--aa-paper);box-shadow:var(--aa-shadow);opacity:0;transform:translateY(10px) scale(.98);visibility:hidden;transition:.25s ease;cursor:pointer;overflow:hidden}\n#aromika-assistant .aa-teaser.is-visible{opacity:1;transform:none;visibility:visible}\n#aromika-assistant .aa-teaser-mascot{position:absolute;left:7px;bottom:0;width:72px;height:82px;display:grid;align-items:end;justify-items:center}\n#aromika-assistant .aa-teaser-copy{min-width:0}\n#aromika-assistant .aa-teaser strong{display:block;margin-bottom:4px;font-size:15px;line-height:1.25;font-weight:760;letter-spacing:-.25px}\n#aromika-assistant .aa-teaser p{margin:0;color:var(--aa-muted);font-size:12px;line-height:1.43}\n#aromika-assistant .aa-teaser-close{position:absolute;right:9px;top:9px;width:30px;height:30px;border:0;background:transparent;color:var(--aa-muted);cursor:pointer;border-radius:50%;font-size:19px;line-height:1}\n#aromika-assistant .aa-teaser-close:hover{background:var(--aa-soft)}\n\n#aromika-assistant .aa-panel{pointer-events:auto;position:absolute;right:0;bottom:82px;width:min(424px,calc(100vw - 32px));max-height:min(720px,calc(100vh - 120px));max-height:min(720px,calc(100dvh - 120px));overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;border:1px solid var(--aa-line);border-radius:28px;background:var(--aa-paper);box-shadow:var(--aa-shadow);opacity:0;visibility:hidden;transform:translateY(12px) scale(.985);transform-origin:bottom right;transition:.24s cubic-bezier(.22,1,.36,1);scrollbar-width:thin;scrollbar-color:rgba(120,120,120,.25) transparent}\n#aromika-assistant.is-open .aa-panel{opacity:1;visibility:visible;transform:none}\n#aromika-assistant .aa-panel::-webkit-scrollbar{width:7px}\n#aromika-assistant .aa-panel::-webkit-scrollbar-thumb{background:rgba(120,120,120,.20);border-radius:10px}\n\n#aromika-assistant .aa-topbar{position:sticky;top:0;z-index:10;height:46px;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(var(--aa-paper) 72%,rgba(255,255,255,0));pointer-events:none}\n#aromika-assistant .aa-back,#aromika-assistant .aa-panel-close{pointer-events:auto;border:0;background:var(--aa-paper);color:var(--aa-muted);cursor:pointer;min-height:32px;border-radius:10px}\n#aromika-assistant .aa-back{padding:6px 10px;font-size:11.5px;font-weight:720;opacity:0;visibility:hidden;transform:translateX(4px);transition:.18s ease}\n#aromika-assistant .aa-back.is-visible{opacity:1;visibility:visible;transform:none}\n#aromika-assistant .aa-panel-close{width:34px;font-size:21px;line-height:1}\n#aromika-assistant .aa-back:hover,#aromika-assistant .aa-panel-close:hover{background:var(--aa-soft);color:var(--aa-ink)}\n\n#aromika-assistant .aa-head{padding:4px 24px 20px;border-bottom:1px solid var(--aa-line)}\n#aromika-assistant .aa-persona{display:flex;align-items:center;gap:10px;margin:-1px 0 13px;padding:7px 9px;border-radius:15px;background:linear-gradient(135deg,rgba(234,47,120,.075),rgba(234,47,120,.02));border:1px solid rgba(234,47,120,.11)}\n#aromika-assistant .aa-persona b{display:block;font-size:12.5px;font-weight:780;letter-spacing:-.1px}\n#aromika-assistant .aa-persona small{display:block;margin-top:2px;color:var(--aa-muted);font-size:10.5px}\n#aromika-assistant .aa-kicker{display:flex;align-items:center;gap:9px;margin-bottom:11px;color:var(--aa-pink);font-size:10px;font-weight:820;letter-spacing:1.05px;text-transform:uppercase}\n#aromika-assistant .aa-kicker:before{content:\"\";width:22px;height:1px;background:currentColor}\n#aromika-assistant .aa-title{margin:0;font-size:30px;line-height:1.02;font-weight:690;letter-spacing:-1.1px}\n#aromika-assistant .aa-subtitle{margin:10px 0 0;color:var(--aa-muted);font-size:13px;line-height:1.55}\n\n#aromika-assistant .aa-hero--home{position:relative;min-height:184px;padding:0 146px 0 0;border-bottom:1px solid var(--aa-line);background:radial-gradient(circle at 92% 18%,rgba(234,47,120,.12),transparent 44%)}\n#aromika-assistant .aa-hero--home>.aa-romi--hero{position:absolute;right:8px;bottom:0}\n#aromika-assistant .aa-hero--home .aa-head{border-bottom:0;padding-right:4px}\n#aromika-assistant .aa-hero--home .aa-persona{display:none}\n#aromika-assistant .aa-hero--home .aa-title{font-size:29px}\n\n#aromika-assistant .aa-stage-visual,#aromika-assistant .aa-success-visual{position:relative;height:122px;display:flex;justify-content:flex-end;align-items:flex-end;padding:0 20px;border-bottom:0;background:radial-gradient(circle at 76% 20%,rgba(234,47,120,.12),transparent 44%);overflow:hidden}\n#aromika-assistant .aa-stage-visual .aa-romi--stage{transform:translateY(27px)}\n#aromika-assistant .aa-stage-visual--compact{height:92px}\n#aromika-assistant .aa-stage-visual--compact .aa-romi--stage{width:112px;height:142px;transform:translateY(39px)}\n#aromika-assistant .aa-success-visual{height:152px;justify-content:center}\n#aromika-assistant .aa-success-visual .aa-romi--success{transform:translateY(42px)}\n\n#aromika-assistant .aa-body{padding:14px}\n#aromika-assistant .aa-actions{display:grid;gap:8px}\n#aromika-assistant .aa-action{width:100%;min-height:58px;padding:13px 14px;border:1px solid var(--aa-line);border-radius:16px;background:var(--aa-paper);color:var(--aa-ink);display:grid;grid-template-columns:39px 1fr auto;gap:11px;align-items:center;text-align:left;text-decoration:none;cursor:pointer;transition:background .18s ease,border-color .18s ease,transform .18s ease}\n#aromika-assistant .aa-action:hover{background:var(--aa-soft);border-color:rgba(234,47,120,.24);transform:translateY(-1px)}\n#aromika-assistant .aa-action-icon{width:39px;height:39px;border-radius:12px;background:var(--aa-soft);display:grid;place-items:center;color:var(--aa-ink)}\n#aromika-assistant .aa-action-icon svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}\n#aromika-assistant .aa-action-copy b{display:block;font-size:13.5px;font-weight:690;line-height:1.22;letter-spacing:-.15px}\n#aromika-assistant .aa-action-copy small{display:block;margin-top:3px;color:var(--aa-muted);font-size:11.5px;line-height:1.3}\n#aromika-assistant .aa-arrow{color:#999;font-size:18px}\n#aromika-assistant .aa-action--primary{background:var(--aa-ink);color:#fff;border-color:var(--aa-ink)}\n#aromika-assistant .aa-action--primary:hover{background:var(--aa-pink);border-color:var(--aa-pink)}\n#aromika-assistant .aa-action--primary .aa-action-icon{background:rgba(255,255,255,.12);color:#fff}\n#aromika-assistant .aa-action--primary .aa-action-copy small{color:rgba(255,255,255,.68)}\n#aromika-assistant .aa-action--primary .aa-arrow{color:rgba(255,255,255,.72)}\n#aromika-assistant .aa-action--compact{margin-top:10px;min-height:54px}\n\n#aromika-assistant .aa-choice-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n#aromika-assistant .aa-choice{position:relative;min-height:108px;padding:15px;border:1px solid var(--aa-line);border-radius:17px;background:var(--aa-paper);color:var(--aa-ink);text-align:left;cursor:pointer;transition:.18s ease}\n#aromika-assistant .aa-choice:hover{background:var(--aa-soft);border-color:rgba(234,47,120,.24);transform:translateY(-1px)}\n#aromika-assistant .aa-choice b{display:block;padding-right:20px;font-size:14px;font-weight:690;letter-spacing:-.2px}\n#aromika-assistant .aa-choice span{display:block;margin-top:6px;color:var(--aa-muted);font-size:11.5px;line-height:1.4}\n#aromika-assistant .aa-choice i{position:absolute;right:13px;top:13px;font-style:normal;color:#aaa}\n#aromika-assistant .aa-need-grid,#aromika-assistant .aa-volume-grid{grid-template-columns:1fr 1fr}\n#aromika-assistant .aa-choice--need{min-height:84px}\n#aromika-assistant .aa-choice--need b{font-size:13.5px}\n#aromika-assistant .aa-choice--volume{min-height:76px;display:flex;align-items:center}\n#aromika-assistant .aa-choice--volume b{font-size:15px}\n\n#aromika-assistant .aa-simple-link{display:flex;justify-content:space-between;gap:12px;margin-top:10px;padding:11px 5px;color:var(--aa-muted);font-size:11.5px;font-weight:700;text-decoration:none}\n#aromika-assistant .aa-simple-link:hover{color:var(--aa-pink)}\n#aromika-assistant .aa-simple-button{min-height:44px;padding:10px 14px;border:1px solid var(--aa-line);border-radius:13px;background:var(--aa-paper);color:var(--aa-muted);cursor:pointer;font-size:12px;font-weight:720}\n#aromika-assistant .aa-simple-button:hover{background:var(--aa-soft);color:var(--aa-ink)}\n#aromika-assistant .aa-simple-button--wide{width:100%}\n#aromika-assistant .aa-result-actions{display:grid;gap:8px;margin-top:10px}\n#aromika-assistant .aa-note{margin:0 0 10px;padding:11px 12px;border-radius:13px;background:var(--aa-pink-soft);color:var(--aa-muted);font-size:11.5px;line-height:1.45}\n\n#aromika-assistant .aa-brand-list{display:grid;gap:7px}\n#aromika-assistant .aa-brand-link{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;padding:13px 14px;border-radius:14px;background:var(--aa-soft);color:var(--aa-ink);text-decoration:none;font-size:13px}\n#aromika-assistant .aa-brand-link b{font-weight:690}\n#aromika-assistant .aa-brand-link:hover{background:rgba(234,47,120,.09);color:var(--aa-pink)}\n\n#aromika-assistant .aa-field{display:block;margin-bottom:13px}\n#aromika-assistant .aa-field-label{display:block;margin:0 0 7px;color:var(--aa-muted);font-size:10.5px;font-weight:820;letter-spacing:.65px;text-transform:uppercase}\n#aromika-assistant .aa-select-wrap{position:relative;display:block}\n#aromika-assistant .aa-select,#aromika-assistant .aa-feedback input,#aromika-assistant .aa-feedback textarea{width:100%;border:1px solid var(--aa-line);border-radius:13px;background:var(--aa-paper);color:var(--aa-ink);outline:none;transition:border-color .18s ease,box-shadow .18s ease}\n#aromika-assistant .aa-select{height:48px;padding:0 12px;appearance:auto}\n#aromika-assistant .aa-feedback input{height:46px;padding:0 12px}\n#aromika-assistant .aa-feedback textarea{padding:11px 12px;resize:vertical;min-height:92px}\n#aromika-assistant .aa-select:focus,#aromika-assistant .aa-feedback input:focus,#aromika-assistant .aa-feedback textarea:focus{border-color:rgba(234,47,120,.55);box-shadow:0 0 0 3px rgba(234,47,120,.09)}\n#aromika-assistant .aa-contact-results{display:grid;gap:8px;margin-top:12px}\n#aromika-assistant .aa-contact{padding:14px;border:1px solid var(--aa-line);border-radius:16px;background:var(--aa-soft)}\n#aromika-assistant .aa-contact small{display:block;color:var(--aa-pink);font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.6px}\n#aromika-assistant .aa-contact>b{display:block;margin-top:5px;font-size:14px}\n#aromika-assistant .aa-contact>span{display:block;margin-top:3px;color:var(--aa-muted);font-size:11.5px}\n#aromika-assistant .aa-phone{display:inline-block;margin-top:9px;color:var(--aa-ink);font-size:13px;font-weight:760;text-decoration:none}\n#aromika-assistant .aa-contact-actions{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}\n#aromika-assistant .aa-contact-actions a{min-height:38px;padding:9px 11px;border-radius:10px;background:var(--aa-paper);border:1px solid var(--aa-line);color:var(--aa-ink);font-size:11px;font-weight:720;text-decoration:none}\n#aromika-assistant .aa-contact-actions a:hover{border-color:rgba(234,47,120,.28);color:var(--aa-pink)}\n\n#aromika-assistant .aa-stars{display:flex;gap:4px}\n#aromika-assistant .aa-star{width:40px;height:40px;border:1px solid var(--aa-line);border-radius:11px;background:var(--aa-paper);color:#c9c4c6;cursor:pointer;font-size:21px;line-height:1}\n#aromika-assistant .aa-star.is-active{color:var(--aa-pink);border-color:rgba(234,47,120,.28);background:rgba(234,47,120,.06)}\n#aromika-assistant .aa-submit{width:100%;height:47px;border:0;border-radius:13px;background:var(--aa-ink);color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 14px;cursor:pointer;font-size:12.5px;font-weight:760}\n#aromika-assistant .aa-submit:hover{background:var(--aa-pink)}\n#aromika-assistant .aa-form-hint{margin:7px 0 0;color:var(--aa-muted);font-size:10.5px;line-height:1.4}\n#aromika-assistant .aa-form-error{min-height:0;margin:0 0 8px;color:#c52d50;font-size:11px;font-weight:680}\n#aromika-assistant .aa-foot{padding:5px 18px 17px;color:#9a9597;font-size:10.5px;text-align:center}\n\n/* Dark mode follows the site */\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant{--aa-ink:#f5f5f6;--aa-muted:#aaa6a8;--aa-paper:#141518;--aa-soft:#1d1f23;--aa-line:rgba(255,255,255,.10);--aa-shadow:0 28px 74px rgba(0,0,0,.46);--aa-pink-soft:rgba(234,47,120,.13)}\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant .aa-topbar{background:linear-gradient(var(--aa-paper) 72%,rgba(20,21,24,0))}\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant .aa-launcher{background:#17181b;color:#f5f5f6;border-color:rgba(234,47,120,.32);box-shadow:0 16px 38px rgba(0,0,0,.42),0 0 0 5px rgba(234,47,120,.08)}\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant.is-open .aa-launcher{background:#f5f5f6;color:#171717;border-color:#f5f5f6}\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant .aa-romi--launcher,html[data-aromika-theme=\"dark\"] #aromika-assistant .aa-romi--head{background:linear-gradient(145deg,#24262a,#1b1c20)}\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant .aa-persona{background:linear-gradient(135deg,rgba(234,47,120,.15),rgba(234,47,120,.035));border-color:rgba(234,47,120,.19)}\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant .aa-action--primary,html[data-aromika-theme=\"dark\"] #aromika-assistant .aa-submit{background:#f5f5f6;color:#171717;border-color:#f5f5f6}\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant .aa-action--primary:hover,html[data-aromika-theme=\"dark\"] #aromika-assistant .aa-submit:hover{background:var(--aa-pink);color:#fff;border-color:var(--aa-pink)}\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant .aa-action--primary .aa-action-icon{background:rgba(0,0,0,.08);color:inherit}\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant .aa-action--primary .aa-action-copy small,html[data-aromika-theme=\"dark\"] #aromika-assistant .aa-action--primary .aa-arrow{color:rgba(0,0,0,.56)}\n\n/* Tablet / mobile */\n@media(max-width:720px){\n  html.aa-lock-mobile{overscroll-behavior:none}\n  #aromika-assistant{right:12px;bottom:max(12px,env(safe-area-inset-bottom));left:auto}\n  #aromika-assistant .aa-launcher{width:62px;height:62px}\n  #aromika-assistant .aa-romi--launcher{width:53px;height:53px}\n  #aromika-assistant .aa-teaser{right:0;bottom:74px;width:min(304px,calc(100vw - 24px));min-height:78px;padding-left:76px;border-radius:19px}\n  #aromika-assistant .aa-teaser-mascot{width:67px;height:78px}\n  #aromika-assistant .aa-panel{position:fixed;left:12px;right:12px;bottom:calc(82px + env(safe-area-inset-bottom));width:auto;max-height:calc(100dvh - 104px - env(safe-area-inset-bottom));border-radius:24px;transform-origin:bottom center}\n  #aromika-assistant .aa-topbar{height:45px;padding:7px 8px}\n  #aromika-assistant .aa-back,#aromika-assistant .aa-panel-close{min-height:34px}\n  #aromika-assistant .aa-head{padding:2px 18px 18px}\n  #aromika-assistant .aa-title{font-size:27px;letter-spacing:-.8px}\n  #aromika-assistant .aa-subtitle{font-size:12.5px;line-height:1.48}\n  #aromika-assistant .aa-body{padding:11px}\n  #aromika-assistant .aa-action{min-height:58px;padding:12px}\n  #aromika-assistant .aa-choice{min-height:98px;padding:13px}\n  #aromika-assistant .aa-hero--home{min-height:170px;padding-right:125px}\n  #aromika-assistant .aa-romi--hero{width:122px;height:158px}\n  #aromika-assistant .aa-hero--home .aa-title{font-size:27px}\n  #aromika-assistant .aa-stage-visual{height:100px;padding-right:12px}\n  #aromika-assistant .aa-stage-visual .aa-romi--stage{width:116px;height:148px;transform:translateY(35px)}\n  #aromika-assistant .aa-stage-visual--compact{height:76px}\n  #aromika-assistant .aa-stage-visual--compact .aa-romi--stage{width:96px;height:124px;transform:translateY(43px)}\n  #aromika-assistant .aa-success-visual{height:130px}\n  #aromika-assistant .aa-success-visual .aa-romi--success{width:142px;height:175px;transform:translateY(43px)}\n  #aromika-assistant .aa-contact-actions a{min-height:42px;padding:11px 12px}\n  #aromika-assistant .aa-select,#aromika-assistant .aa-feedback input{height:48px}\n  #aromika-assistant .aa-submit{height:48px}\n}\n\n@media(max-width:480px){\n  #aromika-assistant{right:10px;bottom:max(10px,env(safe-area-inset-bottom))}\n  #aromika-assistant .aa-panel{left:8px;right:8px;bottom:calc(76px + env(safe-area-inset-bottom));max-height:calc(100dvh - 92px - env(safe-area-inset-bottom));border-radius:22px}\n  #aromika-assistant .aa-launcher{width:58px;height:58px}\n  #aromika-assistant .aa-romi--launcher{width:50px;height:50px}\n  #aromika-assistant .aa-teaser{bottom:68px;width:min(294px,calc(100vw - 20px))}\n  #aromika-assistant .aa-choice-grid{grid-template-columns:1fr 1fr;gap:7px}\n  #aromika-assistant .aa-choice{min-height:92px}\n  #aromika-assistant .aa-choice b{font-size:13.5px}\n  #aromika-assistant .aa-choice span{font-size:11px}\n  #aromika-assistant .aa-hero--home{min-height:158px;padding-right:112px}\n  #aromika-assistant .aa-romi--hero{width:108px;height:145px}\n}\n\n@media(max-width:390px){\n  #aromika-assistant .aa-panel{left:6px;right:6px;border-radius:20px}\n  #aromika-assistant .aa-choice-grid{grid-template-columns:1fr}\n  #aromika-assistant .aa-need-grid,#aromika-assistant .aa-volume-grid{grid-template-columns:1fr 1fr}\n  #aromika-assistant .aa-choice{min-height:74px}\n  #aromika-assistant .aa-choice--need,#aromika-assistant .aa-choice--volume{min-height:70px}\n  #aromika-assistant .aa-hero--home{padding-right:0;min-height:210px}\n  #aromika-assistant .aa-hero--home>.aa-romi--hero{right:2px;width:104px;height:138px;opacity:.96}\n  #aromika-assistant .aa-hero--home .aa-head{padding-right:96px}\n  #aromika-assistant .aa-hero--home .aa-title{font-size:25px}\n}\n\n@media(max-height:650px) and (max-width:720px){\n  #aromika-assistant .aa-panel{max-height:calc(100dvh - 86px - env(safe-area-inset-bottom));bottom:calc(70px + env(safe-area-inset-bottom))}\n  #aromika-assistant .aa-stage-visual,#aromika-assistant .aa-success-visual{display:none}\n  #aromika-assistant .aa-hero--home{min-height:auto;padding-right:0}\n  #aromika-assistant .aa-hero--home>.aa-romi--hero{display:none}\n  #aromika-assistant .aa-hero--home .aa-head{padding-right:18px}\n}\n\n@media(prefers-reduced-motion:reduce){\n  #aromika-assistant *,#aromika-assistant *:before,#aromika-assistant *:after{transition:none!important;scroll-behavior:auto!important;animation:none!important}\n}\n\n\n/* ===== V8 commerce core ===== */\n/* Romi V8.1 UI — fixed panel geometry, compact product assistant */\n#aromika-assistant.is-rv8 .aa-panel{\n  width:min(500px,calc(100vw - 32px));\n  height:min(690px,calc(100dvh - 120px));\n  max-height:none;\n  overflow:hidden;\n  display:flex;\n  flex-direction:column;\n}\n#aromika-assistant.is-rv8 .aa-topbar,\n#aromika-assistant.is-rv8 .aa-screen,\n#aromika-assistant.is-rv8 .aa-foot{display:none!important}\n\n#aromika-assistant .rv81-layer{\n  display:none;\n  flex:1 1 auto;\n  min-height:0;\n  width:100%;\n  background:var(--aa-paper,#fff);\n  color:var(--aa-ink,#171717);\n  flex-direction:column;\n}\n#aromika-assistant .rv81-layer.is-active{display:flex}\n#aromika-assistant .rv81-head{\n  flex:0 0 64px;\n  display:flex;\n  align-items:center;\n  justify-content:space-between;\n  gap:12px;\n  padding:9px 12px 9px 14px;\n  border-bottom:1px solid var(--aa-line,rgba(0,0,0,.08));\n  background:var(--aa-paper,#fff);\n}\n#aromika-assistant .rv81-person{display:flex;align-items:center;gap:10px;min-width:0}\n#aromika-assistant .rv81-avatar{\n  width:43px;height:43px;border-radius:14px;overflow:hidden;display:grid;place-items:end center;\n  background:linear-gradient(145deg,#fff,#f8e9ef);border:1px solid rgba(234,47,120,.16);flex:0 0 auto\n}\n#aromika-assistant .rv81-avatar img{width:100%;height:100%;object-fit:contain;object-position:center bottom}\n#aromika-assistant .rv81-person b{display:block;font-size:14px;line-height:1.15}\n#aromika-assistant .rv81-person small{display:flex;align-items:center;gap:5px;margin-top:3px;color:var(--aa-muted,#706b6d);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n#aromika-assistant .rv81-person small:before{content:\"\";width:6px;height:6px;border-radius:50%;background:#35a853;flex:0 0 auto}\n#aromika-assistant .rv81-head-actions{display:flex;gap:5px}\n#aromika-assistant .rv81-head-actions button{\n  width:36px;height:36px;border:1px solid var(--aa-line,rgba(0,0,0,.08));border-radius:11px;background:var(--aa-soft,#f7f4f5);\n  color:var(--aa-ink,#171717);font-size:18px;line-height:1;cursor:pointer\n}\n#aromika-assistant .rv81-head-actions button:hover{border-color:rgba(234,47,120,.28);color:var(--aa-pink,#ea2f78)}\n\n#aromika-assistant .rv81-chat{\n  flex:1 1 auto;min-height:0;overflow:auto;padding:15px 14px 10px;overscroll-behavior:contain;scrollbar-width:thin\n}\n#aromika-assistant .rv81-msg{display:flex;margin:0 0 10px}\n#aromika-assistant .rv81-msg--user{justify-content:flex-end}\n#aromika-assistant .rv81-bubble{\n  max-width:88%;padding:10px 12px;border-radius:15px 15px 15px 5px;\n  background:var(--aa-soft,#f7f4f5);border:1px solid var(--aa-line,rgba(0,0,0,.08));\n  font-size:12px;line-height:1.48\n}\n#aromika-assistant .rv81-msg--user .rv81-bubble{\n  background:var(--aa-ink,#171717);border-color:var(--aa-ink,#171717);color:#fff;border-radius:15px 15px 5px 15px\n}\n#aromika-assistant .rv81-loading{display:flex;align-items:center;gap:4px}\n#aromika-assistant .rv81-loading span{width:5px;height:5px;border-radius:50%;background:var(--aa-pink,#ea2f78);animation:rv81dot .75s infinite alternate}\n#aromika-assistant .rv81-loading span:nth-child(2){animation-delay:.12s}\n#aromika-assistant .rv81-loading span:nth-child(3){animation-delay:.24s}\n#aromika-assistant .rv81-loading b{margin-left:5px;font-size:10px;font-weight:650;color:var(--aa-muted,#706b6d)}\n@keyframes rv81dot{to{transform:translateY(-3px);opacity:.45}}\n\n#aromika-assistant .rv81-quick{\n  flex:0 0 auto;display:flex;gap:6px;overflow-x:auto;padding:8px 12px 4px;background:var(--aa-paper,#fff);scrollbar-width:none\n}\n#aromika-assistant .rv81-quick::-webkit-scrollbar{display:none}\n#aromika-assistant .rv81-quick button{\n  flex:0 0 auto;height:32px;padding:0 11px;border:1px solid var(--aa-line,rgba(0,0,0,.08));border-radius:999px;\n  background:var(--aa-paper,#fff);color:var(--aa-ink,#171717);font-size:10.5px;font-weight:680;cursor:pointer\n}\n#aromika-assistant .rv81-quick button:hover{border-color:rgba(234,47,120,.35);color:var(--aa-pink,#ea2f78)}\n\n#aromika-assistant .rv81-form{\n  flex:0 0 auto;display:grid;grid-template-columns:minmax(0,1fr) 46px;gap:7px;padding:9px 12px 12px;\n  border-top:1px solid var(--aa-line,rgba(0,0,0,.08));background:var(--aa-paper,#fff)\n}\n#aromika-assistant .rv81-form textarea{\n  width:100%;height:46px;min-height:46px;max-height:92px;resize:none;padding:12px 13px;border:1px solid var(--aa-line,rgba(0,0,0,.10));\n  border-radius:14px;background:var(--aa-soft,#f7f4f5);color:var(--aa-ink,#171717);font-size:12px;line-height:1.35;outline:none\n}\n#aromika-assistant .rv81-form textarea:focus{border-color:rgba(234,47,120,.5);box-shadow:0 0 0 3px rgba(234,47,120,.08)}\n#aromika-assistant .rv81-form>button{\n  width:46px;height:46px;border:0;border-radius:14px;background:var(--aa-pink,#ea2f78);color:#fff;font-size:20px;cursor:pointer\n}\n\n#aromika-assistant .rv81-result-head{width:100%;display:flex;justify-content:space-between;align-items:center;margin:4px 0 8px}\n#aromika-assistant .rv81-result-head b{font-size:12.5px}\n#aromika-assistant .rv81-result-head span{font-size:10px;color:var(--aa-muted,#706b6d)}\n#aromika-assistant .rv81-products{width:100%;display:grid;gap:8px}\n#aromika-assistant .rv81-product{\n  display:grid;grid-template-columns:92px minmax(0,1fr);gap:11px;padding:10px;\n  border:1px solid var(--aa-line,rgba(0,0,0,.08));border-radius:16px;background:var(--aa-paper,#fff)\n}\n#aromika-assistant .rv81-product-img{\n  width:92px;height:108px;border-radius:12px;background:var(--aa-soft,#f7f4f5);display:grid;place-items:center;overflow:hidden;text-decoration:none;color:#999;font-size:9px;font-weight:800\n}\n#aromika-assistant .rv81-product-img img{width:100%;height:100%;object-fit:contain}\n#aromika-assistant .rv81-product-main{min-width:0}\n#aromika-assistant .rv81-sku{color:var(--aa-pink,#ea2f78);font-size:9px;font-weight:800;letter-spacing:.15px}\n#aromika-assistant .rv81-name{display:block;margin-top:2px;color:var(--aa-ink,#171717);font-size:12px;font-weight:740;line-height:1.3;text-decoration:none}\n#aromika-assistant .rv81-name:hover{color:var(--aa-pink,#ea2f78)}\n#aromika-assistant .rv81-meta{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}\n#aromika-assistant .rv81-meta span{padding:3px 6px;border-radius:999px;background:var(--aa-soft,#f7f4f5);color:var(--aa-muted,#706b6d);font-size:8.8px}\n#aromika-assistant .rv81-price{display:flex;align-items:center;gap:6px;margin-top:7px}\n#aromika-assistant .rv81-price strong{font-size:14px}\n#aromika-assistant .rv81-price del{color:#999;font-size:10px}\n#aromika-assistant .rv81-price em{font-style:normal;color:var(--aa-pink,#ea2f78);font-size:9px;font-weight:800}\n#aromika-assistant .rv81-card-actions{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}\n#aromika-assistant .rv81-card-actions a,\n#aromika-assistant .rv81-card-actions button{\n  min-height:31px;padding:7px 9px;border:1px solid var(--aa-line,rgba(0,0,0,.10));border-radius:9px;background:var(--aa-paper,#fff);\n  color:var(--aa-ink,#171717);font:inherit;font-size:9.5px;font-weight:720;text-decoration:none;cursor:pointer\n}\n#aromika-assistant .rv81-card-actions .rv81-primary{background:var(--aa-ink,#171717);color:#fff;border-color:var(--aa-ink,#171717)}\n#aromika-assistant .rv81-card-actions button.is-selected{border-color:rgba(234,47,120,.38);background:rgba(234,47,120,.08);color:var(--aa-pink,#ea2f78)}\n#aromika-assistant .rv81-card-actions .is-added{background:var(--aa-pink,#ea2f78);border-color:var(--aa-pink,#ea2f78);color:#fff}\n\n#aromika-assistant .rv81-compare{width:100%;display:grid;gap:7px}\n#aromika-assistant .rv81-compare>div{padding:10px;border:1px solid var(--aa-line,rgba(0,0,0,.08));border-radius:12px;display:grid;grid-template-columns:1fr auto;gap:4px 8px}\n#aromika-assistant .rv81-compare b{font-size:10.5px;line-height:1.3}\n#aromika-assistant .rv81-compare span{font-size:11px;font-weight:800}\n#aromika-assistant .rv81-compare small{font-size:9px;color:var(--aa-muted,#706b6d)}\n#aromika-assistant .rv81-compare a{font-size:9px;color:var(--aa-pink,#ea2f78);text-decoration:none;font-weight:700;text-align:right}\n\n#aromika-assistant .rv81-cartmsg{width:100%;padding:11px;border-radius:13px;background:rgba(234,47,120,.07);border:1px solid rgba(234,47,120,.14);display:grid;grid-template-columns:1fr auto;gap:3px 9px}\n#aromika-assistant .rv81-cartmsg b{font-size:11px}\n#aromika-assistant .rv81-cartmsg span{font-size:9px;color:var(--aa-muted,#706b6d)}\n#aromika-assistant .rv81-cartmsg a{grid-row:1/3;grid-column:2;color:var(--aa-pink,#ea2f78);font-size:9.5px;font-weight:750;text-decoration:none;align-self:center}\n\n#aromika-assistant .rv81-feedback{width:100%;display:grid;gap:7px}\n#aromika-assistant .rv81-feedback>b{font-size:12px}\n#aromika-assistant .rv81-fields{display:grid;grid-template-columns:1fr 1fr;gap:6px}\n#aromika-assistant .rv81-feedback input,\n#aromika-assistant .rv81-feedback textarea{\n  width:100%;border:1px solid var(--aa-line,rgba(0,0,0,.10));border-radius:10px;background:var(--aa-soft,#f7f4f5);\n  color:var(--aa-ink,#171717);font:inherit;font-size:10.5px;padding:9px;outline:none\n}\n#aromika-assistant .rv81-feedback>button{height:38px;border:0;border-radius:10px;background:var(--aa-ink,#171717);color:#fff;font:inherit;font-size:10.5px;font-weight:750;cursor:pointer}\n#aromika-assistant .rv81-file{display:grid;gap:4px;color:var(--aa-muted,#706b6d);font-size:9px}\n#aromika-assistant .rv81-form-error{color:#b3264f;font-size:9px}\n#aromika-assistant .rv81-hp{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;opacity:0!important}\n\nhtml[data-aromika-theme=\"dark\"] #aromika-assistant .rv81-person small:before{background:#62c77b}\n\n@media(max-width:720px){\n  #aromika-assistant.is-rv8 .aa-panel{\n    position:fixed;left:8px;right:8px;bottom:calc(76px + env(safe-area-inset-bottom));\n    width:auto;height:calc(100dvh - 94px - env(safe-area-inset-bottom));max-height:none;border-radius:22px\n  }\n}\n@media(max-width:480px){\n  #aromika-assistant .rv81-head{flex-basis:58px;padding:7px 9px}\n  #aromika-assistant .rv81-avatar{width:39px;height:39px;border-radius:12px}\n  #aromika-assistant .rv81-chat{padding:11px 9px 7px}\n  #aromika-assistant .rv81-quick{padding-left:9px;padding-right:9px}\n  #aromika-assistant .rv81-form{padding:8px 9px 9px}\n  #aromika-assistant .rv81-product{grid-template-columns:78px minmax(0,1fr);gap:9px;padding:8px}\n  #aromika-assistant .rv81-product-img{width:78px;height:94px}\n  #aromika-assistant .rv81-name{font-size:11px}\n  #aromika-assistant .rv81-fields{grid-template-columns:1fr}\n}\n\n\n/* V8.2 card layout override: compact, full-width, adapted to Romi panel */\n#aromika-assistant .rv81-products{\n  grid-template-columns:minmax(0,1fr);\n  width:100%;\n}\n#aromika-assistant .rv81-product{\n  width:100%;\n  min-width:0;\n  display:grid;\n  grid-template-columns:82px minmax(0,1fr);\n  grid-template-rows:auto auto;\n  gap:9px 11px;\n  padding:10px;\n  overflow:hidden;\n}\n#aromika-assistant .rv81-product-img{\n  width:82px;\n  height:94px;\n  align-self:start;\n}\n#aromika-assistant .rv81-product-main{\n  min-width:0;\n  overflow:hidden;\n}\n#aromika-assistant .rv81-name{\n  display:-webkit-box;\n  -webkit-line-clamp:3;\n  -webkit-box-orient:vertical;\n  overflow:hidden;\n  font-size:11.5px;\n  line-height:1.28;\n}\n#aromika-assistant .rv81-meta{\n  margin-top:5px;\n}\n#aromika-assistant .rv81-price{\n  margin-top:6px;\n}\n#aromika-assistant .rv81-price strong{\n  font-size:14px;\n}\n#aromika-assistant .rv81-card-actions{\n  grid-column:1 / -1;\n  width:100%;\n  display:grid;\n  grid-template-columns:1.15fr 1fr 1fr;\n  gap:6px;\n  margin-top:0;\n}\n#aromika-assistant .rv81-card-actions a,\n#aromika-assistant .rv81-card-actions button{\n  width:100%;\n  min-width:0;\n  min-height:34px;\n  padding:7px 6px;\n  display:flex;\n  align-items:center;\n  justify-content:center;\n  text-align:center;\n  white-space:nowrap;\n  overflow:hidden;\n  text-overflow:ellipsis;\n  font-size:9.5px;\n}\n#aromika-assistant .rv81-result-head{\n  position:sticky;\n  top:-15px;\n  z-index:2;\n  padding:7px 0 5px;\n  background:var(--aa-paper,#fff);\n}\n@media(max-width:480px){\n  #aromika-assistant .rv81-product{\n    grid-template-columns:74px minmax(0,1fr);\n    gap:8px 9px;\n    padding:9px;\n  }\n  #aromika-assistant .rv81-product-img{\n    width:74px;\n    height:86px;\n  }\n  #aromika-assistant .rv81-name{\n    font-size:10.8px;\n    -webkit-line-clamp:3;\n  }\n  #aromika-assistant .rv81-meta span{\n    font-size:8px;\n    padding:3px 5px;\n  }\n  #aromika-assistant .rv81-card-actions{\n    gap:5px;\n  }\n  #aromika-assistant .rv81-card-actions a,\n  #aromika-assistant .rv81-card-actions button{\n    min-height:33px;\n    font-size:9px;\n    padding:6px 4px;\n  }\n}\n\n\n/* V8.7 — full product visibility in cards */\n#aromika-assistant .rv81-product{\n  grid-template-columns:104px minmax(0,1fr) !important;\n  align-items:start !important;\n}\n#aromika-assistant .rv81-product-img{\n  width:104px !important;\n  height:126px !important;\n  padding:7px !important;\n  box-sizing:border-box !important;\n  background:#fff !important;\n  overflow:hidden !important;\n  display:flex !important;\n  align-items:center !important;\n  justify-content:center !important;\n}\n#aromika-assistant .rv81-product-img img{\n  width:100% !important;\n  height:100% !important;\n  max-width:100% !important;\n  max-height:100% !important;\n  object-fit:contain !important;\n  object-position:center center !important;\n  transform:none !important;\n  clip-path:none !important;\n}\n#aromika-assistant .rv81-card-actions{\n  grid-template-columns:1.15fr 1fr 1fr !important;\n}\n@media(max-width:480px){\n  #aromika-assistant .rv81-product{\n    grid-template-columns:92px minmax(0,1fr) !important;\n  }\n  #aromika-assistant .rv81-product-img{\n    width:92px !important;\n    height:114px !important;\n    padding:6px !important;\n  }\n  #aromika-assistant .rv81-card-actions{\n    grid-template-columns:1fr 1fr !important;\n  }\n  #aromika-assistant .rv81-card-actions .rv81-primary{\n    grid-column:1 / -1 !important;\n  }\n}\n\n\n\n\n/* =========================================================\n   ROMI V8.9 — UNIFIED ASSISTANT\n   V5 is the only main menu on BOTH sites.\n   V8 is only the \"Подобрать товар\" subview.\n   Comparison is intentionally removed.\n   ========================================================= */\n\n#aromika-assistant.is-rv8 .aa-panel{\n  width:min(500px,calc(100vw - 32px)) !important;\n  height:min(690px,calc(100dvh - 40px)) !important;\n  max-height:none !important;\n  overflow:hidden !important;\n  display:flex !important;\n  flex-direction:column !important;\n}\n\n#aromika-assistant.is-rv8 .rv81-layer{\n  flex:1 1 auto !important;\n  min-height:0 !important;\n  width:100% !important;\n  height:100% !important;\n  overflow:hidden !important;\n  display:flex !important;\n  flex-direction:column !important;\n}\n\n#aromika-assistant.is-rv8 .rv81-chat{\n  flex:1 1 0 !important;\n  min-height:0 !important;\n  overflow-y:auto !important;\n  overflow-x:hidden !important;\n}\n\n/* Cards: one image + text row, two full-width actions below. */\n#aromika-assistant .rv81-product{\n  width:100% !important;\n  min-width:0 !important;\n  display:grid !important;\n  grid-template-columns:104px minmax(0,1fr) !important;\n  grid-template-rows:auto auto !important;\n  gap:9px 11px !important;\n  padding:10px !important;\n  box-sizing:border-box !important;\n  overflow:hidden !important;\n}\n\n#aromika-assistant .rv81-product-img{\n  width:104px !important;\n  height:126px !important;\n  padding:7px !important;\n  box-sizing:border-box !important;\n  background:#fff !important;\n  display:flex !important;\n  align-items:center !important;\n  justify-content:center !important;\n  overflow:hidden !important;\n}\n\n#aromika-assistant .rv81-product-img img{\n  width:100% !important;\n  height:100% !important;\n  max-width:100% !important;\n  max-height:100% !important;\n  object-fit:contain !important;\n  object-position:center !important;\n  transform:none !important;\n  clip-path:none !important;\n}\n\n#aromika-assistant .rv81-card-actions{\n  grid-column:1 / -1 !important;\n  display:grid !important;\n  grid-template-columns:1fr 1fr !important;\n  gap:6px !important;\n  width:100% !important;\n}\n\n#aromika-assistant .rv81-card-actions a,\n#aromika-assistant .rv81-card-actions button{\n  width:100% !important;\n  min-width:0 !important;\n  min-height:36px !important;\n  display:flex !important;\n  align-items:center !important;\n  justify-content:center !important;\n  text-align:center !important;\n  white-space:nowrap !important;\n}\n\n@media(max-width:720px){\n  #aromika-assistant.is-rv8 .aa-panel{\n    position:fixed !important;\n    left:8px !important;\n    right:8px !important;\n    top:8px !important;\n    bottom:8px !important;\n    width:auto !important;\n    height:auto !important;\n    min-height:0 !important;\n    max-height:none !important;\n    border-radius:20px !important;\n  }\n}\n\n@media(max-width:480px){\n  #aromika-assistant .rv81-product{\n    grid-template-columns:92px minmax(0,1fr) !important;\n  }\n  #aromika-assistant .rv81-product-img{\n    width:92px !important;\n    height:114px !important;\n    padding:6px !important;\n  }\n}\n\n\n/* V9.0 — persistent unified product-entry button */\n#aromika-assistant .aa-actions > .rv81-entry{\n  width:100% !important;\n}\n\n\n/* V9.1 — contextual menu + product-only quick categories */\n#aromika-assistant .rv81-quick{\n  gap:6px !important;\n}\n\n#aromika-assistant .rv91-brand-picker{\n  width:100%;\n  display:grid;\n  gap:10px;\n}\n#aromika-assistant .rv91-brand-picker-head{\n  display:grid;\n  gap:3px;\n}\n#aromika-assistant .rv91-brand-picker-head b{\n  font-size:13px;\n}\n#aromika-assistant .rv91-brand-picker-head span{\n  font-size:10px;\n  color:var(--aa-muted,#706b6d);\n}\n#aromika-assistant .rv91-brand-grid{\n  display:grid;\n  gap:7px;\n}\n#aromika-assistant .rv91-brand-grid button{\n  width:100%;\n  min-height:50px;\n  display:flex;\n  align-items:center;\n  justify-content:space-between;\n  gap:10px;\n  padding:10px 12px;\n  border:1px solid var(--aa-line,rgba(0,0,0,.08));\n  border-radius:12px;\n  background:var(--aa-soft,#f8f6f7);\n  color:var(--aa-ink,#171717);\n  font:inherit;\n  text-align:left;\n  cursor:pointer;\n}\n#aromika-assistant .rv91-brand-grid button b{\n  font-size:11px;\n}\n#aromika-assistant .rv91-brand-grid button span{\n  font-size:9px;\n  color:var(--aa-muted,#706b6d);\n}\n#aromika-assistant .rv91-brand-grid button:hover{\n  border-color:rgba(234,47,120,.32);\n}\n\n\n\n\n/* =========================================================\n   ROMI V9.3.1 — welcome + authoritative mobile layout\n   ========================================================= */\n#aromika-assistant .aa-welcome{\n  min-height:540px;\n  display:grid;\n  align-content:center;\n  gap:10px;\n  padding:10px 24px 28px;\n  text-align:center;\n}\n#aromika-assistant .aa-welcome-visual{\n  height:220px;\n  display:flex;\n  align-items:flex-end;\n  justify-content:center;\n  overflow:hidden;\n}\n#aromika-assistant .aa-romi--welcome{\n  width:210px;\n  height:215px;\n  display:grid;\n  place-items:end center;\n  overflow:visible;\n  animation:aa-v931-float 3.2s ease-in-out infinite;\n}\n#aromika-assistant .aa-romi--welcome img{\n  width:100%;\n  height:100%;\n  object-fit:contain;\n  object-position:center bottom;\n}\n#aromika-assistant .aa-welcome-copy{\n  display:grid;\n  justify-items:center;\n}\n#aromika-assistant .aa-welcome .aa-title{\n  margin:0;\n  font-size:28px;\n  line-height:1.08;\n  letter-spacing:-.9px;\n}\n#aromika-assistant .aa-welcome .aa-title span{\n  display:block;\n  margin-top:5px;\n  color:var(--aa-muted);\n  font-size:.78em;\n  font-weight:610;\n}\n#aromika-assistant .aa-welcome .aa-subtitle{\n  max-width:350px;\n  margin:10px auto 0;\n  color:var(--aa-muted);\n  font-size:13px;\n  line-height:1.5;\n}\n#aromika-assistant .aa-language-grid{\n  width:min(350px,100%);\n  display:grid;\n  grid-template-columns:1fr 1fr;\n  gap:8px;\n  margin-top:18px;\n}\n#aromika-assistant .aa-language-button{\n  min-height:54px;\n  border:1px solid var(--aa-line);\n  border-radius:15px;\n  background:var(--aa-soft);\n  color:var(--aa-ink);\n  padding:10px 12px;\n  display:flex;\n  align-items:center;\n  justify-content:space-between;\n  gap:10px;\n  cursor:pointer;\n  transition:.16s ease;\n}\n#aromika-assistant .aa-language-button b{font-size:12px}\n#aromika-assistant .aa-language-button span{\n  width:30px;\n  height:30px;\n  border-radius:999px;\n  display:grid;\n  place-items:center;\n  background:var(--aa-paper);\n  font-size:8px;\n  font-weight:850;\n}\n#aromika-assistant .aa-language-button:hover{\n  border-color:rgba(234,47,120,.38);\n  background:var(--aa-paper);\n  transform:translateY(-1px);\n}\n@keyframes aa-v931-float{\n  0%,100%{transform:translateY(0)}\n  50%{transform:translateY(-4px)}\n}\n\n/* Mobile is a real viewport dialog, not a desktop card squeezed into the screen. */\n@media(max-width:720px){\n  html.aa-lock-mobile,\n  html.aa-lock-mobile body{\n    overflow:hidden!important;\n    overscroll-behavior:none!important;\n  }\n\n  #aromika-assistant{\n    position:fixed!important;\n    right:8px!important;\n    bottom:max(8px,env(safe-area-inset-bottom))!important;\n    left:auto!important;\n    z-index:2147483000!important;\n  }\n\n  #aromika-assistant.is-open .aa-launcher{\n    display:none!important;\n  }\n\n  #aromika-assistant .aa-panel,\n  #aromika-assistant.is-rv8 .aa-panel{\n    position:fixed!important;\n    top:max(8px,env(safe-area-inset-top))!important;\n    left:8px!important;\n    right:8px!important;\n    bottom:max(8px,env(safe-area-inset-bottom))!important;\n    width:auto!important;\n    height:auto!important;\n    min-height:0!important;\n    max-height:none!important;\n    border-radius:22px!important;\n    overflow:hidden!important;\n    display:flex!important;\n    flex-direction:column!important;\n    transform-origin:center!important;\n  }\n\n  #aromika-assistant .aa-topbar{\n    position:relative!important;\n    top:auto!important;\n    flex:0 0 46px!important;\n    background:var(--aa-paper)!important;\n  }\n\n  #aromika-assistant .aa-screen{\n    flex:1 1 auto!important;\n    min-height:0!important;\n    overflow-y:auto!important;\n    overflow-x:hidden!important;\n    -webkit-overflow-scrolling:touch!important;\n  }\n\n  #aromika-assistant .aa-foot{\n    flex:0 0 auto!important;\n    padding:7px 14px 11px!important;\n    background:var(--aa-paper)!important;\n  }\n\n  #aromika-assistant .aa-welcome{\n    min-height:100%!important;\n    align-content:center!important;\n    padding:6px 18px 18px!important;\n  }\n\n  #aromika-assistant .aa-welcome-visual{\n    height:min(30dvh,210px)!important;\n    min-height:135px!important;\n  }\n\n  #aromika-assistant .aa-romi--welcome{\n    width:min(190px,55vw)!important;\n    height:100%!important;\n  }\n\n  #aromika-assistant .aa-welcome .aa-title{\n    font-size:clamp(22px,6.6vw,28px)!important;\n  }\n\n  #aromika-assistant .aa-welcome .aa-subtitle{\n    margin-top:8px!important;\n    font-size:12px!important;\n  }\n\n  #aromika-assistant .aa-language-grid{\n    margin-top:14px!important;\n  }\n\n  #aromika-assistant .rv81-layer{\n    flex:1 1 auto!important;\n    min-height:0!important;\n    height:auto!important;\n  }\n\n  #aromika-assistant .rv81-chat{\n    flex:1 1 auto!important;\n    min-height:0!important;\n    overflow-y:auto!important;\n  }\n}\n\n@media(max-width:480px){\n  #aromika-assistant .aa-panel,\n  #aromika-assistant.is-rv8 .aa-panel{\n    top:max(5px,env(safe-area-inset-top))!important;\n    left:5px!important;\n    right:5px!important;\n    bottom:max(5px,env(safe-area-inset-bottom))!important;\n    border-radius:18px!important;\n  }\n\n  #aromika-assistant .aa-language-grid{\n    width:100%!important;\n    grid-template-columns:1fr!important;\n    gap:7px!important;\n  }\n\n  #aromika-assistant .aa-language-button{\n    min-height:48px!important;\n  }\n\n  #aromika-assistant .aa-welcome-visual{\n    height:min(27dvh,180px)!important;\n  }\n}\n\n@media(max-height:650px) and (max-width:720px){\n  #aromika-assistant .aa-welcome-visual{\n    height:120px!important;\n    min-height:100px!important;\n  }\n  #aromika-assistant .aa-welcome .aa-subtitle{margin-top:5px!important}\n  #aromika-assistant .aa-language-grid{margin-top:8px!important}\n}\n\n@media(prefers-reduced-motion:reduce){\n  #aromika-assistant .aa-romi--welcome{animation:none!important}\n}\n\n\n/* =========================================================\n   ROMI V9.4 — authoritative mobile layer for aromika.info\n   ========================================================= */\n@media (max-width: 720px){\n  html.aa-lock-mobile,\n  html.aa-lock-mobile body{\n    overflow:hidden!important;\n    width:100%!important;\n    height:100%!important;\n  }\n\n  #aromika-assistant{\n    position:fixed!important;\n    inset:auto 0 0 auto!important;\n    width:auto!important;\n    height:auto!important;\n    z-index:2147483000!important;\n  }\n\n  #aromika-assistant.is-open .aa-launcher{\n    display:none!important;\n  }\n\n  #aromika-assistant .aa-panel,\n  #aromika-assistant.is-rv8 .aa-panel{\n    position:fixed!important;\n    top:max(6px,env(safe-area-inset-top))!important;\n    left:6px!important;\n    right:6px!important;\n    bottom:max(6px,env(safe-area-inset-bottom))!important;\n    width:auto!important;\n    height:auto!important;\n    min-width:0!important;\n    max-width:none!important;\n    min-height:0!important;\n    max-height:none!important;\n    margin:0!important;\n    border-radius:20px!important;\n    overflow:hidden!important;\n    display:flex!important;\n    flex-direction:column!important;\n  }\n\n  #aromika-assistant .aa-topbar{\n    flex:0 0 46px!important;\n  }\n\n  #aromika-assistant .aa-screen{\n    flex:1 1 auto!important;\n    min-height:0!important;\n    overflow-y:auto!important;\n    overflow-x:hidden!important;\n    overscroll-behavior:contain!important;\n    -webkit-overflow-scrolling:touch!important;\n  }\n\n  #aromika-assistant .aa-foot{\n    flex:0 0 auto!important;\n  }\n\n  #aromika-assistant .aa-welcome{\n    min-height:100%!important;\n    align-content:center!important;\n    padding:6px 16px 18px!important;\n  }\n\n  #aromika-assistant .aa-welcome-visual{\n    height:min(27dvh,180px)!important;\n    min-height:120px!important;\n  }\n\n  #aromika-assistant .aa-romi--welcome{\n    width:min(180px,52vw)!important;\n    height:100%!important;\n  }\n\n  #aromika-assistant .aa-welcome .aa-title{\n    font-size:clamp(22px,6.4vw,28px)!important;\n    line-height:1.08!important;\n  }\n\n  #aromika-assistant .aa-welcome .aa-subtitle{\n    font-size:12px!important;\n    line-height:1.45!important;\n  }\n\n  #aromika-assistant .aa-language-grid{\n    width:100%!important;\n    grid-template-columns:1fr 1fr!important;\n    gap:8px!important;\n  }\n\n  #aromika-assistant.is-rv8 .rv81-layer{\n    flex:1 1 auto!important;\n    min-height:0!important;\n    width:100%!important;\n    height:auto!important;\n  }\n\n  #aromika-assistant.is-rv8 .rv81-chat{\n    flex:1 1 auto!important;\n    min-height:0!important;\n    overflow-y:auto!important;\n    overflow-x:hidden!important;\n  }\n\n  #aromika-assistant .rv81-product{\n    width:100%!important;\n    grid-template-columns:88px minmax(0,1fr)!important;\n  }\n\n  #aromika-assistant .rv81-product-img{\n    width:88px!important;\n    height:110px!important;\n  }\n}\n@media (max-width: 430px){\n  #aromika-assistant .aa-panel,\n  #aromika-assistant.is-rv8 .aa-panel{\n    top:max(4px,env(safe-area-inset-top))!important;\n    left:4px!important;\n    right:4px!important;\n    bottom:max(4px,env(safe-area-inset-bottom))!important;\n    border-radius:16px!important;\n  }\n  #aromika-assistant .aa-language-grid{\n    grid-template-columns:1fr!important;\n  }\n  #aromika-assistant .aa-language-button{\n    min-height:47px!important;\n  }\n  #aromika-assistant .aa-welcome-visual{\n    height:min(24dvh,155px)!important;\n  }\n}\n";
(document.head||document.documentElement).appendChild(style);
})();


/* ===== COMMON NAV V2 ===== */
(function(){
'use strict';
if(window.__AROMIKA_COMMON_NAV_FINAL_V3__) return;
window.__AROMIKA_COMMON_NAV_FINAL_V3__=true;

var SHOP='https://aromika.shop/';
var CATALOG='https://aromika.shop/vse-tovary/';
var KASPI='https://kaspi.kz/shop/info/merchant/1359004/address-tab/';
var LOCATOR='https://aromika.shop/index.php?dispatch=store_locator.search';

var TEXT={
  ru:{
    products:'Продукция',brands:'Бренды',promos:'Акции',about:'О компании',
    partners:'Партнёрам',careers:'Работа в компании',contacts:'Контакты',
    buy:'Купить онлайн',shop:'Интернет-магазин',
    company:'Компания',production:'Производство',allBrands:'Все бренды',
    distributors:'Дистрибьюторам',retail:'Торговым сетям',corporate:'Корпоративным клиентам',
    buyers:'Покупателям',catalog:'Каталог',where:'Где купить',
    brandText:'Казахстанский производитель бытовой химии и косметической продукции.',
    office:'Головной офис',city:'Костанай, Казахстан',phone:'Телефон',
    feedback:'Обратная связь',top:'Наверх'
  },
  kk:{
    products:'Өнімдер',brands:'Брендтер',promos:'Акциялар',about:'Компания туралы',
    partners:'Серіктестерге',careers:'Компаниядағы жұмыс',contacts:'Байланыстар',
    buy:'Онлайн сатып алу',shop:'Интернет-дүкен',
    company:'Компания',production:'Өндіріс',allBrands:'Барлық брендтер',
    distributors:'Дистрибьюторларға',retail:'Сауда желілеріне',corporate:'Корпоративтік клиенттерге',
    buyers:'Сатып алушыларға',catalog:'Каталог',where:'Қайдан сатып алуға болады',
    brandText:'Қазақстандық тұрмыстық химия және косметикалық өнімдер өндірушісі.',
    office:'Бас кеңсе',city:'Қостанай, Қазақстан',phone:'Телефон',
    feedback:'Кері байланыс',top:'Жоғары'
  }
};

function path(){
  var p=(location.pathname||'/').replace(/\/+$/,'');
  return p||'/';
}
function lang(){
  var s='';
  try{s=localStorage.getItem('aromika-language')||''}catch(e){}
  if(s==='kk') return 'kk';
  var active=document.querySelector('.ar-lang [data-lang].is-active,.ar-menu-lang [data-lang].is-active,.arf-lang [data-lang].is-active');
  if(active && active.getAttribute('data-lang')==='kk') return 'kk';
  return 'ru';
}
function t(){return TEXT[lang()]||TEXT.ru}

function activeKey(){
  var p=path(), h=location.hash||'';
  if(p==='/brands'||['/perfect','/washexpert','/maxipower','/prachka','/antibak'].indexOf(p)>=0) return 'brands';
  if(p==='/akcii') return 'promos';
  if(p==='/okompanii'&&h==='#cooperation') return 'partners';
  if(p==='/okompanii') return 'about';
  if(p==='/careers') return 'careers';
  if(p==='/kontakty') return 'contacts';
  return '';
}

function link(href,key,label,extra){
  var cls=activeKey()===key?' class="is-active"':'';
  return '<a href="'+href+'" data-ar-common="'+key+'"'+cls+(extra||'')+'>'+label+'</a>';
}

function headerHTML(){
  var x=t();
  return [
    link('/#products','products',x.products),
    link('/brands','brands',x.brands),
    link('/akcii','promos',x.promos),
    link('/okompanii','about',x.about),
    link('/okompanii#cooperation','partners',x.partners),
    link('/careers','careers',x.careers),
    link('/kontakty','contacts',x.contacts)
  ].join('');
}

function patchHeader(){
  document.querySelectorAll('#aromika-hero .ar-nav').forEach(function(n){
    n.innerHTML=headerHTML();
  });
  document.querySelectorAll('#aromika-hero .ar-menu nav').forEach(function(n){
    n.innerHTML=headerHTML();
  });
  document.querySelectorAll('#aromika-hero .ar-shop').forEach(function(a){
    a.href=SHOP;a.target='_blank';a.rel='noopener noreferrer';
    var s=a.querySelector('span'); if(s)s.textContent=t().buy;
  });
  document.querySelectorAll('#aromika-hero .ar-menu-shop').forEach(function(a){
    a.href=SHOP;a.target='_blank';a.rel='noopener noreferrer';
    var s=a.querySelector('span'); if(s)s.textContent=t().shop;
  });
}

function footerCol(title,links){
  return '<nav class="arf-col"><div class="arf-col-title">'+title+'</div>'+
    links.map(function(v){
      var target=v[2]?' target="_blank" rel="noopener noreferrer"':'';
      return '<a href="'+v[0]+'"'+target+'>'+v[1]+'</a>';
    }).join('')+'</nav>';
}

function patchFooter(){
  var f=document.querySelector('#aromika-footer');
  if(!f) return;
  var x=t(), top=f.querySelector('.arf-top');
  if(top){
    var brand=top.querySelector('.arf-brand');
    if(brand){
      var p=brand.querySelector('p'); if(p)p.textContent=x.brandText;
      var b=brand.querySelector('.arf-shop-btn');
      if(b){b.href=SHOP;b.target='_blank';b.rel='noopener noreferrer';var s=b.querySelector('span');if(s)s.textContent=x.shop;}
    }
    top.querySelectorAll(':scope > nav.arf-col').forEach(function(n){n.remove()});
    top.insertAdjacentHTML('beforeend',
      footerCol(x.company,[
        ['/okompanii',x.about],
        ['/okompanii#production-quality',x.production],
        ['/careers',x.careers],
        ['/kontakty',x.contacts]
      ])+
      footerCol(x.brands,[
        ['/brands',x.allBrands],
        ['/perfect','Perfect'],
        ['/washexpert','Wash Expert'],
        ['/maxipower','Maxi Power'],
        ['/prachka','Prachka'],
        ['/antibak','Antibak']
      ])+
      footerCol(x.partners,[
        ['/okompanii?type=distributor#cooperation',x.distributors],
        ['/okompanii?type=retail#cooperation',x.retail],
        ['/okompanii?type=horeca#cooperation','HoReCa'],
        ['/okompanii?type=horeca#cooperation',x.corporate]
      ])+
      footerCol(x.buyers,[
        ['/akcii',x.promos],
        [CATALOG,x.catalog,true],
        [SHOP,x.shop,true],
        [KASPI,'Kaspi Магазин',true],
        [LOCATOR,x.where,true]
      ])
    );
  }

  var strip=f.querySelector('.arf-contact-strip');
  if(strip){
    var items=strip.querySelectorAll('.arf-contact');
    if(items[0]){
      var sm=items[0].querySelector('small'), b=items[0].querySelector('b');
      if(sm)sm.textContent=x.office;if(b)b.textContent=x.city;
    }
    if(items[1]){
      var sm2=items[1].querySelector('small');if(sm2)sm2.textContent=x.phone;
    }
  }

  var legal=f.querySelector('.arf-legal');
  if(legal){
    legal.innerHTML='<a href="/okompanii">'+x.about+'</a><a href="/kontakty">'+x.feedback+'</a>';
  }
  var topLink=f.querySelector('.arf-to-top span'); if(topLink)topLink.textContent=x.top;
}

function canonicalHref(raw){
  if(raw==null)return raw;
  var v=String(raw).trim();
  if(!v)return v;
  if(/^(mailto:|tel:|sms:|javascript:|data:)/i.test(v))return v;

  if(v==='#products')return path()==='/'?'#products':'/#products';
  if(v==='#brands'||v==='/#brands')return'/brands';

  var rel={
    'brands':'/brands','brends':'/brands','okompanii':'/okompanii',
    'partneram':'/okompanii#cooperation','vacancies':'/careers','careers':'/careers',
    'kontakty':'/kontakty','proizvodstvo':'/okompanii#production-quality','production':'/okompanii#production-quality',
    'perfect':'/perfect','washexpert':'/washexpert','maxipower':'/maxipower','prachka':'/prachka','antibak':'/antibak'
  };
  if(rel[v])return rel[v];

  var u;try{u=new URL(v,location.href)}catch(e){return v}
  if(u.origin!==location.origin)return v;
  var p=(u.pathname||'/').replace(/\/+$/,'')||'/';
  if(p==='/vacancies')return'/careers';
  if(p==='/brends')return'/brands';
  if(p==='/proizvodstvo'||p==='/production')return'/okompanii#production-quality';
  if(p==='/partneram'){
    var type=(u.searchParams.get('type')||'').toLowerCase();
    if(type==='corporate'||type==='pro')type='horeca';
    if(type==='distribution')type='distributor';
    if(type!=='retail'&&type!=='horeca'&&type!=='distributor')type='';
    return'/okompanii'+(type?'?type='+type:'')+'#cooperation';
  }
  var old={
    '/brands/perfect':'/perfect','/brands/washexpert':'/washexpert','/brands/wash-expert':'/washexpert',
    '/brands/maxipower':'/maxipower','/brands/maxi-power':'/maxipower','/brands/prachka':'/prachka','/brands/antibak':'/antibak'
  };
  if(old[p])return old[p];
  return v;
}

function patchRoutes(){
  document.querySelectorAll('a[href]').forEach(function(a){
    var old=a.getAttribute('href')||'', next=canonicalHref(old);
    if(next&&next!==old)a.setAttribute('href',next);
    if(a.target==='_blank'){
      var href=a.getAttribute('href')||'';
      try{
        if(new URL(href,location.href).origin!==location.origin)a.rel='noopener noreferrer';
      }catch(e){}
    }
  });
}

function ensureCompany(){
  if(path()!=='/okompanii')return;
  if(!document.getElementById('production-quality')){
    var first=document.querySelector('#company-coop-page .cc-system article:first-child');
    if(first)first.id='production-quality';
  }
  if(location.hash==='#cooperation'){
    var q=new URLSearchParams(location.search), type=(q.get('type')||'').toLowerCase();
    if(type==='corporate')type='horeca';
    var route=type==='retail'?'supply':type==='horeca'?'pro':type==='distributor'?'distribution':'';
    if(route){
      [0,100,300,700].forEach(function(ms){
        setTimeout(function(){
          var b=document.querySelector('#company-coop-page .cc-route[data-route="'+route+'"]');
          if(b&&!b.classList.contains('is-active'))b.click();
        },ms);
      });
    }
  }
  if(location.hash==='#production-quality'){
    setTimeout(function(){
      var el=document.getElementById('production-quality');
      if(el)el.scrollIntoView({block:'start'});
    },150);
  }
}

function apply(){
  patchRoutes();
  patchHeader();
  patchFooter();
  ensureCompany();
}

function bindLang(){
  document.addEventListener('click',function(e){
    var b=e.target&&e.target.closest?e.target.closest('[data-lang]'):null;
    if(!b)return;
    var l=b.getAttribute('data-lang');
    if(l==='ru'||l==='kk'){
      try{localStorage.setItem('aromika-language',l)}catch(err){}
      setTimeout(apply,30);
      setTimeout(apply,180);
    }
  },true);
  window.addEventListener('storage',function(e){
    if(e.key==='aromika-language')setTimeout(apply,0);
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){apply();bindLang()},{once:true});
else{apply();bindLang()}

if('MutationObserver'in window){
  var pending=false;
  new MutationObserver(function(){
    if(pending)return;
    pending=true;
    requestAnimationFrame(function(){pending=false;patchRoutes()});
  }).observe(document.documentElement,{childList:true,subtree:true});
}
})();

/* ===== ROMI ASSISTANT V9.4 ===== */
(function(){
'use strict';
if(window.__AROMIKA_ASSISTANT_V941__) return;
window.__AROMIKA_ASSISTANT_V941__=true;
window.__AROMIKA_ASSISTANT_V5__=true;

var LANG_KEY='aromika-language';
var ROMI_LANG_KEY='aromika-romi-language';
var TEASER_KEY='aromika-assistant-v5-teaser-dismissed';
var FEEDBACK_EMAIL='info@aromika.info';

function scriptBase(){
  var src='';
  try{src=document.currentScript&&document.currentScript.src||''}catch(e){}
  if(!src){var list=document.getElementsByTagName('script');for(var i=list.length-1;i>=0;i--){if((list[i].src||'').indexOf('assistant-v5.js')>=0){src=list[i].src;break}}}
  if(window.AROMIKA_ASSISTANT_ASSET_BASE) return String(window.AROMIKA_ASSISTANT_ASSET_BASE).replace(/\/?$/,'/');
  return src ? src.replace(/[^\/?#]+(?:[?#].*)?$/,'romi/') : '/romi/';
}
var ASSET_BASE='https://raw.githubusercontent.com/dickort/aromika-site/main/romi/';
var ASSET_FALLBACK='https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/romi/';
var ROMI={
 launcher:ASSET_BASE+'romi-launcher.webp',
 greeting:ASSET_BASE+'romi-greeting.webp',
 finder:ASSET_BASE+'romi-finder.webp',
 success:ASSET_BASE+'romi-success.webp'
};

var SALES=[
 {city:'Алматы',name:'Лаптева Лора',role:'Супервайзер',phone:'+7 707 978 74 29',tel:'+77079787429',wa:'77079787429'},
 {city:'Алматы',name:'Хмурович Андрей',role:'Супервайзер',phone:'+7 707 236 33 69',tel:'+77072363369',wa:'77072363369'},
 {city:'Алматы',name:'Хусаинов Самат',role:'Супервайзер',phone:'+7 708 861 57 67',tel:'+77088615767',wa:'77088615767'},
 {city:'Алматы',name:'Якупова Гульнара',role:'Супервайзер',phone:'+7 707 387 09 31',tel:'+77073870931',wa:'77073870931'},
 {city:'Балхаш',name:'Гарипова Юзефа',role:'Супервайзер',phone:'+7 771 436 55 08',tel:'+77714365508',wa:'77714365508'},
 {city:'Жезказган',name:'Кичатая Ирина',role:'Директор филиала',phone:'+7 747 916 93 80',tel:'+77479169380',wa:'77479169380'},
 {city:'Караганда',name:'Несипбаев Мурат',role:'Супервайзер',phone:'+7 700 336 27 41',tel:'+77003362741',wa:'77003362741'},
 {city:'Караганда',name:'Сагиндык Шалкар',role:'Супервайзер',phone:'+7 708 835 65 05',tel:'+77088356505',wa:'77088356505'},
 {city:'Кокшетау',name:'Низова Олеся',role:'Супервайзер',phone:'+7 707 609 56 34',tel:'+77076095634',wa:'77076095634'},
 {city:'Петропавловск',name:'Сомова Евгения',role:'Директор филиала',phone:'+7 707 123 00 55',tel:'+77071230055',wa:'77071230055'},
 {city:'Рудный',name:'Силеверстова Марина',role:'Супервайзер',phone:'+7 778 559 13 23',tel:'+77785591323',wa:'77785591323'},
 {city:'Уральск',name:'Тужилкина Надежда',role:'Супервайзер',phone:'+7 707 341 40 41',tel:'+77073414041',wa:'77073414041'},
 {city:'Атырау',name:'Лошманова Лидия',role:'Супервайзер',phone:'+7 775 726 84 79',tel:'+77757268479',wa:'77757268479'},
 {city:'Актобе',name:'Зайцева Нина',role:'Супервайзер',phone:'+7 701 269 38 71',tel:'+77012693871',wa:'77012693871'},
 {city:'Актау',name:'Семейных Евгения',role:'Супервайзер',phone:'+7 777 751 75 22',tel:'+77777517522',wa:'77777517522'},
 {city:'Павлодар',name:'Салова Алена',role:'Директор филиала',phone:'+7 777 939 93 39',tel:'+77779399339',wa:'77779399339'},
 {city:'Усть-Каменогорск',name:'Медведева Ольга',role:'Супервайзер',phone:'+7 776 451 50 50',tel:'+77764515050',wa:'77764515050'},
 {city:'Семей',name:'Нестерова Марина',role:'Супервайзер',phone:'+7 700 447 85 64',tel:'+77004478564',wa:'77004478564'},
 {city:'Семей',name:'Тюклин Николай',role:'Супервайзер',phone:'+7 707 801 53 26',tel:'+77078015326',wa:'77078015326'},
 {city:'Астана',name:'Абылгазина Алина',role:'Супервайзер',phone:'+7 701 960 48 93',tel:'+77019604893',wa:'77019604893'},
 {city:'Астана',name:'Мырзахметова Ботагоз',role:'Супервайзер',phone:'+7 775 093 91 45',tel:'+77750939145',wa:'77750939145'},
 {city:'Шымкент',name:'Искандаров Рустам',role:'Супервайзер',phone:'+7 707 211 78 81',tel:'+77072117881',wa:'77072117881'},
 {city:'Шымкент',name:'Интыкбекова Румия',role:'Начальник отдела продаж',phone:'+7 700 576 00 70',tel:'+77005760070',wa:'77005760070'},
 {city:'Талдыкорган',name:'Кан Елена',role:'Директор филиала',phone:'+7 777 155 70 15',tel:'+77771557015',wa:'77771557015'},
 {city:'Тараз',name:'Бакенова Анна',role:'Супервайзер',phone:'+7 747 469 80 85',tel:'+77474698085',wa:'77474698085'},
 {city:'Аркалык',name:'Силеверстова Марина',role:'Супервайзер',phone:'+7 778 559 13 23',tel:'+77785591323',wa:'77785591323'},
 {city:'Житикара',name:'Силеверстова Марина',role:'Супервайзер',phone:'+7 778 559 13 23',tel:'+77785591323',wa:'77785591323'},
 {city:'Лисаковск',name:'Силеверстова Марина',role:'Супервайзер',phone:'+7 778 559 13 23',tel:'+77785591323',wa:'77785591323'}
];
var BRANCH_FALLBACK={city:'Костанай',name:'Филиал Aromika',role:'Отдел продаж',phone:'+7 (7142) 75-14-21',tel:'+77142751421',email:'oper_kost@aromika.info'};
var CITY_KK={'Алматы':'Алматы','Балхаш':'Балқаш','Жезказган':'Жезқазған','Караганда':'Қарағанды','Кокшетау':'Көкшетау','Петропавловск':'Петропавл','Рудный':'Рудный','Уральск':'Орал','Атырау':'Атырау','Актобе':'Ақтөбе','Актау':'Ақтау','Павлодар':'Павлодар','Усть-Каменогорск':'Өскемен','Семей':'Семей','Астана':'Астана','Шымкент':'Шымкент','Талдыкорган':'Талдықорған','Тараз':'Тараз','Аркалык':'Арқалық','Житикара':'Жітіқара','Лисаковск':'Лисаковск','Костанай':'Қостанай'};

var ICONS={
 shop:'<svg viewBox="0 0 24 24"><path d="M4 8h16l-1.3 11H5.3L4 8Z"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
 sale:'<svg viewBox="0 0 24 24"><path d="m4 13 9-9h6v6l-9 9-6-6Z"/><circle cx="16" cy="7" r="1"/></svg>',
 brands:'<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="4"/><circle cx="16" cy="8" r="4"/><circle cx="12" cy="16" r="4"/></svg>',
 finder:'<svg viewBox="0 0 24 24"><path d="M5 7h14M7 12h10M9 17h6"/><circle cx="5" cy="7" r="1"/><circle cx="17" cy="12" r="1"/><circle cx="9" cy="17" r="1"/></svg>',
 rep:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6"/></svg>',
 partner:'<svg viewBox="0 0 24 24"><path d="M8 12 5.5 9.5a3 3 0 0 1 4.2-4.2L12 7.6l2.3-2.3a3 3 0 0 1 4.2 4.2L16 12"/><path d="m8 12 4 4 4-4"/></svg>',
 review:'<svg viewBox="0 0 24 24"><path d="M4 5h16v12H9l-5 3V5Z"/><path d="M8 9h8M8 13h5"/></svg>',
 contact:'<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="m6 7 6 5 6-5"/></svg>',
 work:'<svg viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5h6v2M4 12h16"/></svg>',
 production:'<svg viewBox="0 0 24 24"><path d="M4 20V9l5 3V8l5 3V5h6v15H4Z"/></svg>'
};

var TEXT={
 ru:{
  teaserTitle:'Romi подскажет',teaserText:'Помогу выбрать продукцию, найти акцию или связаться с представителем.',
  kicker:'Помощник Aromika',homeTitle:'Чем вам помочь?',homeSub:'Выберите задачу — Romi проведёт к нужному разделу.',
  back:'Назад',close:'Закрыть',online:'на связи',
  finder:'Подобрать продукцию',finderSub:'Категория → задача → объём → варианты',
  shop:'Купить продукцию',shopSub:'Интернет-магазин Aromika',sale:'Актуальные акции',saleSub:'Скидки Aromika.shop и Kaspi',brands:'Наши бренды',brandsSub:'Познакомиться с брендами Aromika',
  rep:'Связаться с представителем',repSub:'Выберите город и получите контакт',partner:'Стать партнёром',partnerSub:'Розница, HoReCa, корпоративные клиенты',review:'Оставить отзыв',reviewSub:'Оценка и комментарий прямо здесь',
  contacts:'Все контакты',contactsSub:'Филиалы и общие контакты',work:'Вакансии',workSub:'Работа в компании Aromika',production:'Производство',productionSub:'Как устроено производство Aromika',
  finderTitle:'Что вы ищете?',finderLead:'Сначала выберите категорию, затем задачу и нужный объём.',
  laundry:'Стирка',dishes:'Мытьё посуды',cleaning:'Уборка дома',care:'Уход за собой',
  laundryLead:'Линейки для стирки',dishesLead:'Средства для ежедневного мытья посуды',cleaningLead:'Средства для разных задач уборки',careLead:'Шампуни, гели, мыло и уход',
  openProducts:'Открыть раздел продукции',openShop:'Смотреть в интернет-магазине',openBrands:'Посмотреть бренды',
  needTitle:'Что именно нужно?',needLead:'Выберите задачу — так Romi точнее подберёт варианты.',needAny:'Не важно',
  volumeTitle:'Какой объём нужен?',volumeLead:'Выберите формат — покажем подходящие варианты.',anyVolume:'Любой объём',availableBrands:'Подходящие варианты',noExact:'Точного совпадения по всем параметрам нет — показываю ближайшие варианты.',
  laundryWhite:'Для белого',laundryColor:'Для цветного',laundryBlack:'Для чёрного',laundryUniversal:'Универсальное',laundryDelicate:'Деликатные ткани',
  dishesDaily:'На каждый день',dishesAntibac:'Антибактериальное',dishesEco:'Эко',dishesSensitive:'Для чувствительной кожи',
  cleaningFloor:'Полы',cleaningKitchen:'Кухня',cleaningBathroom:'Ванная и сантехника',cleaningGlass:'Стекло и зеркала',cleaningUniversal:'Универсальная уборка',
  careShampoo:'Шампунь',careShower:'Гель для душа',careSoap:'Мыло',careIntimate:'Интимная гигиена',
  resultTitle:'Нашла подходящие варианты',resultLead:'Проверьте подходящие линейки и откройте нужную страницу.',again:'Подобрать заново',home:'В главное меню',
  repTitle:'Найти представителя',repLead:'Выберите город. Покажем контакты торговой команды.',city:'Город',chooseCity:'Выберите город',noRep:'Для этого города нет отдельного представителя. Откройте все контакты Aromika.',call:'Позвонить',whatsapp:'WhatsApp',email:'Написать',allContacts:'Все контакты',
  roleSupervisor:'Супервайзер',roleDirector:'Директор филиала',roleSalesHead:'Начальник отдела продаж',roleSales:'Отдел продаж',
  feedbackTitle:'Оставить отзыв',feedbackLead:'Оцените опыт и добавьте комментарий. После нажатия подготовим письмо в Aromika.',rating:'Ваша оценка',name:'Имя (необязательно)',phone:'Телефон (необязательно)',comment:'Комментарий',commentPlaceholder:'Что понравилось или что можно улучшить?',sendFeedback:'Подготовить письмо',feedbackHint:'Отправка откроется через ваше почтовое приложение.',ratingRequired:'Выберите оценку от 1 до 5.',commentRequired:'Добавьте короткий комментарий.',feedbackSuccess:'Спасибо за отзыв',feedbackSuccessLead:'Письмо подготовлено. Осталось отправить его из почтового приложения.',
  partnerTitle:'Какое сотрудничество вас интересует?',retail:'Закупка продукции Aromika',horeca:'HoReCa / корпоративные клиенты',distribution:'Дистрибуция вашего бренда',
  brandContext:'Вы смотрите бренд',promoContext:'Вы смотрите акции',companyContext:'Вы на странице сотрудничества',contactsContext:'Нужен контакт?',vacancyContext:'Интересует работа?',productionContext:'Хотите узнать больше о производстве?',
  foot:'Aromika · Казахстанский производитель'
 },
 kk:{
  teaserTitle:'Romi көмектеседі',teaserText:'Өнім таңдауға, акция табуға немесе өкілмен байланысуға көмектесемін.',
  kicker:'Aromika көмекшісі',homeTitle:'Сізге қалай көмектесеміз?',homeSub:'Міндетті таңдаңыз — Romi қажетті бөлімге бағыттайды.',
  back:'Артқа',close:'Жабу',online:'байланыста',
  finder:'Өнім таңдау',finderSub:'Санат → міндет → көлем → нұсқалар',
  shop:'Өнім сатып алу',shopSub:'Aromika интернет-дүкені',sale:'Өзекті акциялар',saleSub:'Aromika.shop және Kaspi жеңілдіктері',brands:'Біздің брендтер',brandsSub:'Aromika брендтерімен танысу',
  rep:'Өкілмен байланысу',repSub:'Қаланы таңдап, байланыс алыңыз',partner:'Серіктес болу',partnerSub:'Бөлшек сауда, HoReCa, корпоративтік клиенттер',review:'Пікір қалдыру',reviewSub:'Баға және пікір осы жерде',
  contacts:'Барлық байланыстар',contactsSub:'Филиалдар және жалпы байланыстар',work:'Бос жұмыс орындары',workSub:'Aromika компаниясындағы жұмыс',production:'Өндіріс',productionSub:'Aromika өндірісі қалай ұйымдастырылған',
  finderTitle:'Не іздеп жүрсіз?',finderLead:'Алдымен санатты, содан кейін міндет пен қажетті көлемді таңдаңыз.',
  laundry:'Кір жуу',dishes:'Ыдыс жуу',cleaning:'Үй жинау',care:'Өзін-өзі күту',
  laundryLead:'Кір жууға арналған желілер',dishesLead:'Күнделікті ыдыс жуу құралдары',cleaningLead:'Әртүрлі тазалау міндеттеріне арналған құралдар',careLead:'Сусабындар, гельдер, сабын және күтім',
  openProducts:'Өнімдер бөлімін ашу',openShop:'Интернет-дүкенде көру',openBrands:'Брендтерді көру',
  needTitle:'Нақты не керек?',needLead:'Міндетті таңдаңыз — Romi нұсқаларды дәлірек ұсынады.',needAny:'Маңызды емес',
  volumeTitle:'Қандай көлем керек?',volumeLead:'Форматты таңдаңыз — сәйкес нұсқаларды көрсетеміз.',anyVolume:'Кез келген көлем',availableBrands:'Сәйкес нұсқалар',noExact:'Барлық параметр бойынша дәл сәйкестік жоқ — ең жақын нұсқаларды көрсетемін.',
  laundryWhite:'Ақ матаға',laundryColor:'Түсті матаға',laundryBlack:'Қара матаға',laundryUniversal:'Әмбебап',laundryDelicate:'Нәзік маталар',
  dishesDaily:'Күнделікті',dishesAntibac:'Антибактериалды',dishesEco:'Эко',dishesSensitive:'Сезімтал теріге',
  cleaningFloor:'Еден',cleaningKitchen:'Ас үй',cleaningBathroom:'Жуынатын бөлме және сантехника',cleaningGlass:'Шыны және айна',cleaningUniversal:'Әмбебап тазалау',
  careShampoo:'Сусабын',careShower:'Душ гелі',careSoap:'Сабын',careIntimate:'Интимдік гигиена',
  resultTitle:'Сәйкес нұсқаларды таптым',resultLead:'Ұсынылған желілерді қарап, қажетті бетке өтіңіз.',again:'Қайта таңдау',home:'Басты мәзір',
  repTitle:'Өкілді табу',repLead:'Қаланы таңдаңыз. Сауда командасының байланысын көрсетеміз.',city:'Қала',chooseCity:'Қаланы таңдаңыз',noRep:'Бұл қала үшін жеке өкіл көрсетілмеген. Aromika барлық байланыстарын ашыңыз.',call:'Қоңырау',whatsapp:'WhatsApp',email:'Жазу',allContacts:'Барлық байланыстар',
  roleSupervisor:'Супервайзер',roleDirector:'Филиал директоры',roleSalesHead:'Сату бөлімінің басшысы',roleSales:'Сату бөлімі',
  feedbackTitle:'Пікір қалдыру',feedbackLead:'Тәжірибеңізді бағалап, пікір қосыңыз. Батырманы басқанда Aromika-ға хат дайындалады.',rating:'Сіздің бағаңыз',name:'Аты-жөніңіз (міндетті емес)',phone:'Телефон (міндетті емес)',comment:'Пікір',commentPlaceholder:'Не ұнады немесе нені жақсартуға болады?',sendFeedback:'Хатты дайындау',feedbackHint:'Жіберу пошта қолданбасы арқылы ашылады.',ratingRequired:'1-ден 5-ке дейін баға таңдаңыз.',commentRequired:'Қысқаша пікір қосыңыз.',feedbackSuccess:'Пікіріңізге рақмет',feedbackSuccessLead:'Хат дайын. Енді оны пошта қолданбасынан жіберу қалды.',
  partnerTitle:'Қандай ынтымақтастық қызықтырады?',retail:'Aromika өнімдерін сатып алу',horeca:'HoReCa / корпоративтік клиенттер',distribution:'Брендіңізді дистрибуциялау',
  brandContext:'Сіз бренд бетін қарап отырсыз',promoContext:'Сіз акцияларды қарап отырсыз',companyContext:'Сіз ынтымақтастық бетіндесіз',contactsContext:'Байланыс керек пе?',vacancyContext:'Жұмыс қызықтыра ма?',productionContext:'Өндіріс туралы көбірек білгіңіз келе ме?',
  foot:'Aromika · Қазақстандық өндіруші'
 }
};

var FINDER={
 laundry:{
  needs:['white','color','black','universal','delicate'],
  needLabels:{white:'laundryWhite',color:'laundryColor',black:'laundryBlack',universal:'laundryUniversal',delicate:'laundryDelicate'},
  volumes:['1100 мл','1500 мл','2000 мл','3300 мл','4300 мл','5000 мл'],
  all:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Antibak','/antibak']],
  byNeed:{white:[['Perfect','/perfect'],['Wash Expert','/washexpert']],color:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka']],black:[['Perfect','/perfect'],['Wash Expert','/washexpert']],universal:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Antibak','/antibak']],delicate:[['Perfect','/perfect'],['Lavado','/brands']]},
  byVolume:{'1100 мл':[['Prachka','/prachka']],'1500 мл':[['Perfect','/perfect']],'2000 мл':[['Wash Expert','/washexpert']],'3300 мл':[['Perfect','/perfect'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Lavado','/brands']],'4300 мл':[['Wash Expert','/washexpert'],['Perfect','/perfect'],['Antibak','/antibak']],'5000 мл':[['Prachka','/prachka'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower']]}
 },
 dishes:{
  needs:['daily','antibac','eco','sensitive'],needLabels:{daily:'dishesDaily',antibac:'dishesAntibac',eco:'dishesEco',sensitive:'dishesSensitive'},volumes:['500 мл','1100 мл','3300 мл','5000 мл'],
  all:[['Perfect','/perfect'],['Antibak','/antibak'],['Wash Expert','/washexpert'],['Blik','/brands']],
  byNeed:{daily:[['Perfect','/perfect'],['Antibak','/antibak'],['Wash Expert','/washexpert'],['Blik','/brands']],antibac:[['Antibak','/antibak']],eco:[['Aromika Эко','/brands']],sensitive:[['Aromika','/brands'],['Perfect','/perfect']]},
  byVolume:{'500 мл':[['Perfect','/perfect'],['Antibak','/antibak'],['Wash Expert','/washexpert']],'1100 мл':[['Perfect','/perfect'],['Antibak','/antibak'],['Wash Expert','/washexpert'],['Blik','/brands']],'3300 мл':[['Antibak','/antibak'],['Wash Expert','/washexpert']],'5000 мл':[['Профессиональная линейка','/brands']]}
 },
 cleaning:{
  needs:['floor','kitchen','bathroom','glass','universal'],needLabels:{floor:'cleaningFloor',kitchen:'cleaningKitchen',bathroom:'cleaningBathroom',glass:'cleaningGlass',universal:'cleaningUniversal'},volumes:['500 мл','1100 мл','1500 мл','3300 мл','4300 мл','5000 мл'],
  all:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Blik','/brands']],
  byNeed:{floor:[['Perfect','/perfect'],['Wash Expert','/washexpert']],kitchen:[['Blik','/brands'],['Perfect','/perfect'],['Wash Expert','/washexpert']],bathroom:[['Blik','/brands'],['Wash Expert','/washexpert']],glass:[['Perfect','/perfect'],['Wash Expert','/washexpert']],universal:[['Perfect','/perfect'],['Wash Expert','/washexpert'],['Maxi Power','/maxipower'],['Prachka','/prachka'],['Blik','/brands']]},
  byVolume:{'500 мл':[['Blik','/brands']],'1100 мл':[['Aromika','/brands'],['Blik','/brands']],'1500 мл':[['Perfect','/perfect']],'3300 мл':[['Maxi Power','/maxipower'],['Prachka','/prachka']],'4300 мл':[['Wash Expert','/washexpert']],'5000 мл':[['Wash Expert','/washexpert'],['Профессиональная линейка','/brands']]}
 },
 care:{
  needs:['shampoo','shower','soap','intimate'],needLabels:{shampoo:'careShampoo',shower:'careShower',soap:'careSoap',intimate:'careIntimate'},volumes:['300 мл','400 мл','530 мл','800 мл','1100 мл'],
  all:[['Aromika','/brands'],['Perfect','/perfect'],['Beauty ESSENCE','/brands'],['Delicate','/brands'],['Топ малыш','/brands']],
  byNeed:{shampoo:[['Beauty ESSENCE','/brands'],['Perfect','/perfect'],['Топ малыш','/brands']],shower:[['Perfect','/perfect'],['Aromika','/brands']],soap:[['Aromika','/brands'],['Perfect','/perfect']],intimate:[['Delicate','/brands']]},
  byVolume:{'300 мл':[['Perfect','/perfect'],['Топ малыш','/brands']],'400 мл':[['Delicate','/brands']],'530 мл':[['Aromika','/brands']],'800 мл':[['Aromika','/brands'],['Perfect','/perfect'],['Beauty ESSENCE','/brands'],['Delicate','/brands'],['Топ малыш','/brands']],'1100 мл':[['Aromika','/brands']]}
 }
};

function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function path(){var p=(location.pathname||'/').replace(/\/+$/,'');return p||'/'}
function lang(){var l='ru';try{l=localStorage.getItem(ROMI_LANG_KEY)||localStorage.getItem(LANG_KEY)||document.documentElement.lang||'ru'}catch(e){}l=String(l).toLowerCase();return (l==='kk'||l==='kz'||l.indexOf('kk')===0)?'kk':'ru'}
function emit(action,detail){try{window.dispatchEvent(new CustomEvent('aromika-assistant-action',{detail:Object.assign({action:action,path:path()},detail||{})}))}catch(e){}try{if(typeof window.gtag==='function')window.gtag('event','assistant_'+action,{page_path:path()})}catch(e){}}
function context(){var p=path();if(['/perfect','/washexpert','/maxipower','/prachka','/antibak','/brands'].indexOf(p)>=0)return'brand';if(p==='/akcii')return'promo';if(p==='/okompanii')return'company';if(p==='/kontakty')return'contacts';if(p==='/vacancies')return'vacancy';if(p==='/proizvodstvo')return'production';return'home'}
function homeOrder(){var c=context();if(c==='brand')return['finder','shop','sale','rep','partner','review'];if(c==='promo')return['shop','finder','brands','rep','review'];if(c==='company')return['rep','partner','finder','shop','review'];if(c==='contacts')return['rep','shop','partner','review'];if(c==='vacancy')return['work','contacts','brands','shop','review'];if(c==='production')return['production','brands','partner','contacts','review'];return['finder','shop','sale','brands','rep','partner','review']}
function contextIntro(t){var c=context();if(c==='brand')return{eyebrow:t.brandContext,title:t.homeTitle,sub:t.homeSub};if(c==='promo')return{eyebrow:t.promoContext,title:t.homeTitle,sub:t.homeSub};if(c==='company')return{eyebrow:t.companyContext,title:t.homeTitle,sub:t.homeSub};if(c==='contacts')return{eyebrow:t.contactsContext,title:t.repTitle,sub:t.repLead};if(c==='vacancy')return{eyebrow:t.vacancyContext,title:t.homeTitle,sub:t.homeSub};if(c==='production')return{eyebrow:t.productionContext,title:t.homeTitle,sub:t.homeSub};return{eyebrow:t.kicker,title:t.homeTitle,sub:t.homeSub}}
function actionMeta(k,t){var map={finder:[t.finder,t.finderSub,'finder'],shop:[t.shop,t.shopSub,'shop'],sale:[t.sale,t.saleSub,'sale'],brands:[t.brands,t.brandsSub,'brands'],rep:[t.rep,t.repSub,'rep'],partner:[t.partner,t.partnerSub,'partner'],review:[t.review,t.reviewSub,'review'],contacts:[t.contacts,t.contactsSub,'contact'],work:[t.work,t.workSub,'work'],production:[t.production,t.productionSub,'production']};return map[k]}
function hrefFor(k){if(k==='shop')return'https://aromika.shop/';if(k==='sale')return'/akcii';if(k==='brands')return'/brands';if(k==='contacts')return'/kontakty';if(k==='work')return'/vacancies';if(k==='production')return'/proizvodstvo';return''}
function romiHTML(kind,cls){
 var k=ROMI[kind]?kind:'greeting',src=ROMI[k];
 return '<span class="aa-romi '+(cls||'')+'"><img src="'+esc(src)+'" data-romi-img="'+esc(k)+'" alt="" decoding="async" draggable="false"></span>'
}
function bindRomiImageFallback(){
 document.addEventListener('error',function(e){
  var img=e.target;
  if(!img||!img.matches||!img.matches('img[data-romi-img]'))return;
  if(img.getAttribute('data-romi-fallback')==='1'){img.style.visibility='hidden';return}
  img.setAttribute('data-romi-fallback','1');
  var k=img.getAttribute('data-romi-img')||'greeting';
  var file=k==='launcher'?'romi-launcher.webp':k==='finder'?'romi-finder.webp':k==='success'?'romi-success.webp':'romi-greeting.webp';
  img.src=ASSET_FALLBACK+file+'?v=941';
 },true);
}
function screenHead(eyebrow,title,sub,t,kind){return '<div class="aa-head"><div class="aa-persona">'+romiHTML(kind||'launcher','aa-romi--head')+'<div><b>Romi</b><small>'+esc(t.online)+'</small></div></div><div class="aa-kicker">'+esc(eyebrow)+'</div><h2 class="aa-title">'+esc(title)+'</h2><p class="aa-subtitle">'+esc(sub)+'</p></div>'}
function actionHTML(k,t){var m=actionMeta(k,t),isNav=['finder','rep','partner','review'].indexOf(k)>=0,href=hrefFor(k),primary=(k==='finder'&&context()==='home')||(k==='shop'&&context()==='promo'),tag=isNav?'button':'a',attrs=isNav?' type="button"':' href="'+esc(href)+'"'+(k==='shop'?' target="_blank" rel="noopener"':'');return '<'+tag+' class="aa-action'+(primary?' aa-action--primary':'')+'" data-aa-action="'+k+'"'+attrs+'><span class="aa-action-icon">'+ICONS[m[2]]+'</span><span class="aa-action-copy"><b>'+esc(m[0])+'</b><small>'+esc(m[1])+'</small></span><span class="aa-arrow">→</span></'+tag+'>'}
function renderWelcome(root,t){
 return '<div class="aa-welcome">'+
   '<div class="aa-welcome-visual">'+romiHTML('greeting','aa-romi--welcome')+'</div>'+
   '<div class="aa-welcome-copy">'+
     '<div class="aa-kicker">Romi · Aromika</div>'+
     '<h2 class="aa-title">Здравствуйте! Я Romi 👋<span>Сәлем! Мен Romi 👋</span></h2>'+
     '<p class="aa-subtitle">Выберите удобный язык общения.<br>Қарым-қатынасқа ыңғайлы тілді таңдаңыз.</p>'+
     '<div class="aa-language-grid">'+
       '<button type="button" class="aa-language-button" data-aa-language="ru"><b>Русский</b><span>RU</span></button>'+
       '<button type="button" class="aa-language-button" data-aa-language="kk"><b>Қазақша</b><span>KZ</span></button>'+
     '</div>'+
   '</div>'+
 '</div>';
}
function renderHome(root,t){var intro=contextIntro(t);return '<div class="aa-hero aa-hero--home">'+romiHTML('greeting','aa-romi--hero')+'<div class="aa-hero-copy">'+screenHead(intro.eyebrow,intro.title,intro.sub,t,'launcher')+'</div></div><div class="aa-body"><div class="aa-actions">'+homeOrder().map(function(k){return actionHTML(k,t)}).join('')+'</div></div>'}
function needLabel(cfg,n,t){if(n==='any')return t.needAny;var key=cfg.needLabels[n];return key&&t[key]?t[key]:n}
function renderFinder(root,t){return '<div class="aa-stage-visual">'+romiHTML('finder','aa-romi--stage')+'</div>'+screenHead(t.kicker,t.finderTitle,t.finderLead,t,'launcher')+'<div class="aa-body"><div class="aa-choice-grid">'+['laundry','dishes','cleaning','care'].map(function(k){return '<button class="aa-choice" type="button" data-aa-category="'+k+'"><b>'+esc(t[k])+'</b><span>'+esc(t[k+'Lead'])+'</span><i>→</i></button>'}).join('')+'</div><a class="aa-simple-link" href="/#products">'+esc(t.openProducts)+' <span>→</span></a></div>'}
function renderFinderNeeds(root,t){var k=state.finderCategory||'laundry',cfg=FINDER[k]||FINDER.laundry;return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('finder','aa-romi--stage')+'</div>'+screenHead(t[k],t.needTitle,t.needLead,t,'launcher')+'<div class="aa-body"><div class="aa-choice-grid aa-need-grid"><button class="aa-choice aa-choice--need" type="button" data-aa-need="any"><b>'+esc(t.needAny)+'</b><span>'+esc(t[k+'Lead'])+'</span><i>→</i></button>'+cfg.needs.map(function(n){return '<button class="aa-choice aa-choice--need" type="button" data-aa-need="'+esc(n)+'"><b>'+esc(needLabel(cfg,n,t))+'</b><span>'+esc(t[k])+'</span><i>→</i></button>'}).join('')+'</div></div>'}
function renderFinderVolumes(root,t){var k=state.finderCategory||'laundry',cfg=FINDER[k]||FINDER.laundry,need=state.finderNeed||'any';return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('finder','aa-romi--stage')+'</div>'+screenHead(needLabel(cfg,need,t),t.volumeTitle,t.volumeLead,t,'launcher')+'<div class="aa-body"><div class="aa-choice-grid aa-volume-grid"><button class="aa-choice aa-choice--volume" type="button" data-aa-volume="any"><b>'+esc(t.anyVolume)+'</b><i>→</i></button>'+cfg.volumes.map(function(v){return '<button class="aa-choice aa-choice--volume" type="button" data-aa-volume="'+esc(v)+'"><b>'+esc(v)+'</b><i>→</i></button>'}).join('')+'</div></div>'}
function pairKey(p){return p[0]+'|'+p[1]}
function finderResults(){var k=state.finderCategory||'laundry',cfg=FINDER[k]||FINDER.laundry,need=state.finderNeed||'any',vol=state.finderVolume||'any',a=need==='any'?cfg.all:(cfg.byNeed[need]||cfg.all),b=vol==='any'?cfg.all:(cfg.byVolume[vol]||cfg.all),set={};b.forEach(function(p){set[pairKey(p)]=1});var exact=a.filter(function(p){return set[pairKey(p)]});if(exact.length)return{items:exact,exact:true};var fallback=vol!=='any'?b:a;return{items:fallback&&fallback.length?fallback:cfg.all,exact:false}}
function renderFinderResult(root,t){var res=finderResults();return '<div class="aa-success-visual">'+romiHTML('success','aa-romi--success')+'</div>'+screenHead(t.availableBrands,t.resultTitle,t.resultLead,t,'launcher')+'<div class="aa-body">'+(!res.exact?'<p class="aa-note">'+esc(t.noExact)+'</p>':'')+'<div class="aa-brand-list">'+res.items.map(function(p){return '<a class="aa-brand-link" href="'+esc(p[1])+'"><b>'+esc(p[0])+'</b><span>→</span></a>'}).join('')+'</div><div class="aa-result-actions"><a class="aa-action aa-action--compact aa-action--primary" href="https://aromika.shop/" target="_blank" rel="noopener"><span class="aa-action-icon">'+ICONS.shop+'</span><span class="aa-action-copy"><b>'+esc(t.openShop)+'</b></span><span class="aa-arrow">→</span></a><button class="aa-simple-button" type="button" data-aa-restart>'+esc(t.again)+'</button></div></div>'}
function roleLabel(role,t){if(role==='Супервайзер')return t.roleSupervisor;if(role==='Директор филиала')return t.roleDirector;if(role==='Начальник отдела продаж')return t.roleSalesHead;if(role==='Отдел продаж')return t.roleSales;return role}
function cityLabel(city,l){return l==='kk'?(CITY_KK[city]||city):city}
function cities(){var x={Костанай:1};SALES.forEach(function(s){x[s.city]=1});return Object.keys(x).sort(function(a,b){return a.localeCompare(b,'ru')})}
function contactCard(s,t,l){var buttons='<div class="aa-contact-actions"><a href="tel:'+esc(s.tel)+'">'+esc(t.call)+'</a>';if(s.wa)buttons+='<a href="https://wa.me/'+esc(s.wa)+'" target="_blank" rel="noopener">'+esc(t.whatsapp)+'</a>';if(s.email)buttons+='<a href="mailto:'+esc(s.email)+'">'+esc(t.email)+'</a>';buttons+='</div>';return '<article class="aa-contact"><small>'+esc(cityLabel(s.city,l))+'</small><b>'+esc(s.name)+'</b><span>'+esc(roleLabel(s.role,t))+'</span><a class="aa-phone" href="tel:'+esc(s.tel)+'">'+esc(s.phone)+'</a>'+buttons+'</article>'}
function renderContacts(root,city,t,l){var holder=root.querySelector('.aa-contact-results');if(!holder)return;if(!city){holder.innerHTML='';return}var list=city==='Костанай'?[BRANCH_FALLBACK]:SALES.filter(function(s){return s.city===city});holder.innerHTML=list.length?list.map(function(s){return contactCard(s,t,l)}).join(''):'<p class="aa-note">'+esc(t.noRep)+'</p><a class="aa-simple-link" href="/kontakty">'+esc(t.allContacts)+' <span>→</span></a>'}
function renderRep(root,t,l){var opts=cities().map(function(c){return '<option value="'+esc(c)+'">'+esc(cityLabel(c,l))+'</option>'}).join('');return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('greeting','aa-romi--stage')+'</div>'+screenHead(t.kicker,t.repTitle,t.repLead,t,'launcher')+'<div class="aa-body"><label class="aa-field"><span class="aa-field-label">'+esc(t.city)+'</span><span class="aa-select-wrap"><select id="aa-city" class="aa-select"><option value="">'+esc(t.chooseCity)+'</option>'+opts+'</select></span></label><div class="aa-contact-results"></div><a class="aa-simple-link" href="/kontakty">'+esc(t.allContacts)+' <span>→</span></a></div>'}
function renderPartner(root,t){return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('greeting','aa-romi--stage')+'</div>'+screenHead(t.kicker,t.partnerTitle,t.partnerSub||t.homeSub,t,'launcher')+'<div class="aa-body"><div class="aa-brand-list"><a class="aa-brand-link" href="/okompanii?type=retail#cooperation"><b>'+esc(t.retail)+'</b><span>→</span></a><a class="aa-brand-link" href="/okompanii?type=horeca#cooperation"><b>'+esc(t.horeca)+'</b><span>→</span></a><a class="aa-brand-link" href="/okompanii?type=distributor#cooperation"><b>'+esc(t.distribution)+'</b><span>→</span></a></div></div>'}
function renderFeedback(root,t){var stars=[1,2,3,4,5].map(function(n){return '<button type="button" class="aa-star'+(state.rating>=n?' is-active':'')+'" data-aa-rating="'+n+'" aria-label="'+n+'">★</button>'}).join('');return '<div class="aa-stage-visual aa-stage-visual--compact">'+romiHTML('greeting','aa-romi--stage')+'</div>'+screenHead(t.kicker,t.feedbackTitle,t.feedbackLead,t,'launcher')+'<div class="aa-body"><form class="aa-feedback"><div class="aa-field"><span class="aa-field-label">'+esc(t.rating)+'</span><div class="aa-stars">'+stars+'</div></div><label class="aa-field"><span class="aa-field-label">'+esc(t.name)+'</span><input name="name" autocomplete="name"></label><label class="aa-field"><span class="aa-field-label">'+esc(t.phone)+'</span><input name="phone" inputmode="tel" autocomplete="tel"></label><label class="aa-field"><span class="aa-field-label">'+esc(t.comment)+'</span><textarea name="comment" rows="4" placeholder="'+esc(t.commentPlaceholder)+'"></textarea></label><div class="aa-form-error" role="alert"></div><button class="aa-submit" type="submit">'+esc(t.sendFeedback)+' <span>→</span></button><p class="aa-form-hint">'+esc(t.feedbackHint)+'</p></form></div>'}
function renderFeedbackSuccess(root,t){return '<div class="aa-success-visual">'+romiHTML('success','aa-romi--success')+'</div>'+screenHead(t.kicker,t.feedbackSuccess,t.feedbackSuccessLead,t,'launcher')+'<div class="aa-body"><button class="aa-simple-button aa-simple-button--wide" type="button" data-aa-home>'+esc(t.home)+'</button></div>'}

var state={screen:'welcome',history:[],finderCategory:'',finderNeed:'',finderVolume:'',rating:0};
function gotoScreen(root,screen,data,push){if(push!==false)state.history.push(state.screen);state.screen=screen;if(data)Object.assign(state,data);render(root);scrollPanelTop(root)}
function back(root){var prev=state.history.pop()||'home';state.screen=prev;render(root);scrollPanelTop(root)}
function home(root){state.screen='home';state.history=[];render(root);scrollPanelTop(root)}
function scrollPanelTop(root){var p=root.querySelector('.aa-panel');if(p)try{p.scrollTo({top:0,behavior:'smooth'})}catch(e){p.scrollTop=0}}
function render(root){var l=lang(),t=TEXT[l],screen=root.querySelector('.aa-screen');root.querySelector('.aa-teaser strong').textContent=t.teaserTitle;root.querySelector('.aa-teaser p').textContent=t.teaserText;root.querySelector('.aa-foot').textContent=t.foot;root.querySelector('.aa-back span').textContent=t.back;root.querySelector('.aa-back').classList.toggle('is-visible',state.screen!=='home'&&state.screen!=='welcome');root.querySelector('.aa-panel-close').setAttribute('aria-label',t.close);if(state.screen==='welcome')screen.innerHTML=renderWelcome(root,t);else if(state.screen==='home')screen.innerHTML=renderHome(root,t);else if(state.screen==='finder')screen.innerHTML=renderFinder(root,t);else if(state.screen==='finderNeeds')screen.innerHTML=renderFinderNeeds(root,t);else if(state.screen==='finderVolumes')screen.innerHTML=renderFinderVolumes(root,t);else if(state.screen==='finderResult')screen.innerHTML=renderFinderResult(root,t);else if(state.screen==='rep')screen.innerHTML=renderRep(root,t,l);else if(state.screen==='partner')screen.innerHTML=renderPartner(root,t);else if(state.screen==='feedback')screen.innerHTML=renderFeedback(root,t);else if(state.screen==='feedbackSuccess')screen.innerHTML=renderFeedbackSuccess(root,t);bindScreen(root,t,l)}
function bindScreen(root,t,l){
 root.querySelectorAll('[data-aa-language]').forEach(function(btn){
  btn.addEventListener('click',function(){
   var selected=btn.getAttribute('data-aa-language')==='kk'?'kk':'ru';
   try{localStorage.setItem(ROMI_LANG_KEY,selected)}catch(e){}
   try{window.dispatchEvent(new CustomEvent('romi:language',{detail:{language:selected}}))}catch(e){}
   emit('language_select',{language:selected});
   state.screen='home';
   state.history=[];
   render(root);
   scrollPanelTop(root);
  });
 });
 root.querySelectorAll('[data-aa-action]').forEach(function(el){el.addEventListener('click',function(e){var k=el.getAttribute('data-aa-action');emit(k);if(k==='finder'){e.preventDefault();gotoScreen(root,'finder')}else if(k==='rep'){e.preventDefault();gotoScreen(root,'rep')}else if(k==='partner'){e.preventDefault();gotoScreen(root,'partner')}else if(k==='review'){e.preventDefault();gotoScreen(root,'feedback')}})});
 root.querySelectorAll('[data-aa-category]').forEach(function(el){el.addEventListener('click',function(){var c=el.getAttribute('data-aa-category');emit('finder_category',{category:c});gotoScreen(root,'finderNeeds',{finderCategory:c,finderNeed:'',finderVolume:''})})});
 root.querySelectorAll('[data-aa-need]').forEach(function(el){el.addEventListener('click',function(){var n=el.getAttribute('data-aa-need')||'any';emit('finder_need',{category:state.finderCategory,need:n});gotoScreen(root,'finderVolumes',{finderNeed:n,finderVolume:''})})});
 root.querySelectorAll('[data-aa-volume]').forEach(function(el){el.addEventListener('click',function(){var v=el.getAttribute('data-aa-volume')||'any';emit('finder_volume',{category:state.finderCategory,need:state.finderNeed,volume:v});gotoScreen(root,'finderResult',{finderVolume:v})})});
 var restart=root.querySelector('[data-aa-restart]');if(restart)restart.addEventListener('click',function(){state.history=[];gotoScreen(root,'finder',{finderCategory:'',finderNeed:'',finderVolume:''},false)});
 var homeBtn=root.querySelector('[data-aa-home]');if(homeBtn)homeBtn.addEventListener('click',function(){home(root)});
 var select=root.querySelector('#aa-city');if(select)select.addEventListener('change',function(){renderContacts(root,this.value,t,l);emit('representative_city',{city:this.value})});
 root.querySelectorAll('[data-aa-rating]').forEach(function(b){b.addEventListener('click',function(){state.rating=parseInt(b.getAttribute('data-aa-rating'),10)||0;root.querySelectorAll('.aa-star').forEach(function(s){s.classList.toggle('is-active',parseInt(s.getAttribute('data-aa-rating'),10)<=state.rating)});emit('feedback_rating',{rating:state.rating})})});
 var form=root.querySelector('.aa-feedback');if(form)form.addEventListener('submit',function(e){e.preventDefault();var err=form.querySelector('.aa-form-error'),fd=new FormData(form),comment=String(fd.get('comment')||'').trim();if(!state.rating){err.textContent=t.ratingRequired;return}if(comment.length<3){err.textContent=t.commentRequired;return}err.textContent='';var subj=(l==='kk'?'Aromika сайты арқылы пікір':'Отзыв с сайта Aromika')+' · '+state.rating+'/5';var body=(l==='kk'?'Баға: ':'Оценка: ')+state.rating+'/5\n'+(l==='kk'?'Аты: ':'Имя: ')+(fd.get('name')||'—')+'\n'+(l==='kk'?'Телефон: ':'Телефон: ')+(fd.get('phone')||'—')+'\n'+(l==='kk'?'Пікір: ':'Комментарий: ')+comment+'\nURL: '+location.href;emit('feedback_submit',{rating:state.rating});gotoScreen(root,'feedbackSuccess',null,false);setTimeout(function(){location.href='mailto:'+FEEDBACK_EMAIL+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body)},100)});
 root.querySelectorAll('a[href]').forEach(function(a){a.addEventListener('click',function(){var href=a.getAttribute('href')||'';if(href&&href.charAt(0)!=='#')emit('link',{href:href})})});
}
function shell(){var root=document.createElement('div');root.id='aromika-assistant';root.innerHTML='<div class="aa-teaser" role="status"><div class="aa-teaser-mascot">'+romiHTML('greeting','aa-romi--teaser')+'</div><div class="aa-teaser-copy"><button class="aa-teaser-close" type="button" aria-label="×">×</button><strong></strong><p></p></div></div><section class="aa-panel" role="dialog" aria-modal="false" aria-label="Aromika assistant"><div class="aa-topbar"><button class="aa-back" type="button" aria-label="Back">← <span></span></button><button class="aa-panel-close" type="button" aria-label="Close">×</button></div><div class="aa-screen"></div><div class="aa-foot"></div></section><button class="aa-launcher" type="button" aria-label="Romi — Aromika assistant" aria-expanded="false"><span class="aa-launcher-mascot">'+romiHTML('launcher','aa-romi--launcher')+'</span><svg class="aa-close-icon" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></button>';document.body.appendChild(root);return root}
function bindRoot(root){var launcher=root.querySelector('.aa-launcher'),teaser=root.querySelector('.aa-teaser'),panel=root.querySelector('.aa-panel');function close(){root.classList.remove('is-open');launcher.setAttribute('aria-expanded','false');document.documentElement.classList.remove('aa-lock-mobile');launcher.focus({preventScroll:true})}function open(){root.classList.add('is-open');launcher.setAttribute('aria-expanded','true');teaser.classList.remove('is-visible');if(window.innerWidth<=720)document.documentElement.classList.add('aa-lock-mobile');setTimeout(function(){var b=root.querySelector('.aa-panel-close');if(b)b.focus({preventScroll:true})},60)}launcher.addEventListener('click',function(){if(root.classList.contains('is-open'))close();else open();try{sessionStorage.setItem(TEASER_KEY,'1')}catch(e){}});root.querySelector('.aa-panel-close').addEventListener('click',close);root.querySelector('.aa-back').addEventListener('click',function(){back(root)});root.querySelector('.aa-teaser-close').addEventListener('click',function(e){e.stopPropagation();teaser.classList.remove('is-visible');try{sessionStorage.setItem(TEASER_KEY,'1')}catch(err){}});teaser.addEventListener('click',function(e){if(e.target.closest('.aa-teaser-close'))return;open();emit('teaser_open');try{sessionStorage.setItem(TEASER_KEY,'1')}catch(err){}});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&root.classList.contains('is-open'))close()});document.addEventListener('click',function(e){if(e.target.closest('[data-lang]'))setTimeout(function(){render(root)},60)});window.addEventListener('storage',function(e){if(e.key===LANG_KEY||e.key===ROMI_LANG_KEY)render(root)});window.addEventListener('resize',function(){if(window.innerWidth>720)document.documentElement.classList.remove('aa-lock-mobile')},{passive:true});panel.addEventListener('click',function(e){e.stopPropagation()})}
function scheduleTeaser(root){var dismissed=false;try{dismissed=sessionStorage.getItem(TEASER_KEY)==='1'}catch(e){}if(dismissed)return;var shown=false,teaser=root.querySelector('.aa-teaser');function show(){if(shown||root.classList.contains('is-open'))return;shown=true;teaser.classList.add('is-visible');emit('teaser_show')}var delay=window.innerWidth<=720?40000:30000;setTimeout(show,delay);function onScroll(){var doc=document.documentElement,max=Math.max(1,doc.scrollHeight-window.innerHeight);if(window.scrollY/max>=.45){window.removeEventListener('scroll',onScroll);show()}}window.addEventListener('scroll',onScroll,{passive:true})}
function preload(){['launcher','greeting','finder','success'].forEach(function(k){var i=new Image();i.src=ROMI[k]})}
function init(){var old=document.getElementById('aromika-assistant');if(old&&old.parentNode)old.parentNode.removeChild(old);bindRomiImageFallback();preload();var root=shell();render(root);bindRoot(root);scheduleTeaser(root)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


/* ===== ROMI COMMERCE CORE V9.4 ===== */
(function(){
'use strict';
if (window.__ROMI_V941__) return;
window.__ROMI_V941__ = true;
window.__ROMI_V81__ = true;

var C = Object.assign({
  site: location.hostname.indexOf('aromika.shop') >= 0 ? 'shop' : 'info',
  apiBase: 'https://aromika.shop/index.php?dispatch=romi.',
  shopOrigin: 'https://aromika.shop',
  infoOrigin: 'https://aromika.info'
}, window.ROMI_V8_CONFIG || {});

var SID_KEY = 'romi-v8-session-id';
var ROOT, PANEL, LAYER, CHAT, FORM, INPUT;
var STATE = {
  session_id: '',
  messages: [],
  last_products: [],
  last_query: '',
  customer_type: '',
  city: '',
  selected_product_id: 0,
  compare_ids: [],
  lang: 'ru'
};


var UI_TEXT={
  ru:{
    entry:'Подобрать товар',entrySub:'Поиск · подбор · покупка',
    hello:'Что подобрать? Напишите обычными словами — например «Antibak для посуды 1100 мл».',
    placeholder:'Напишите, что вам нужно…',searching:'Ищу подходящие товары…',
    found:'Подходящие варианты',none:'Точного совпадения не нашла. Попробуйте уточнить назначение, бренд или объём.',
    error:'Не удалось выполнить поиск. Повторите ещё раз.',add:'В корзину',adding:'Добавляю…',
    added:'В корзине ✓',addedTitle:'Товар добавлен',buy:'Купить',details:'Подробнее',
    stock:'В наличии',cart:'Открыть корзину',close:'Закрыть',back:'Назад',
    status:'Каталог aromika.shop подключён',send:'Отправить',
    sent:'Передано в Aromika. Номер:',needContact:'Укажите телефон или e-mail.',
    failed:'Не удалось отправить. Можно написать на info@aromika.info.',
    brands:'Наши бренды',brandsSub:'Выберите бренд — покажу товары магазина',
    showProducts:'Показать товары',showing:'Показываю товары',showingAll:'Показываю продукцию Aromika.',
    count:'шт.',cartItems:'товар(а)',cartError:'Не удалось добавить товар в корзину. Попробуйте ещё раз.',
    quickLaundry:'Стирка',quickDish:'Посуда',quickCleaning:'Уборка',quickSoap:'Мыло',quickBody:'Душ и тело',
    findAria:'Найти'
  },
  kk:{
    entry:'Тауар таңдау',entrySub:'Іздеу · таңдау · сатып алу',
    hello:'Не таңдап берейін? Қарапайым сөзбен жазыңыз — мысалы «Antibak ыдыс жууға 1100 мл».',
    placeholder:'Не қажет екенін жазыңыз…',searching:'Сәйкес тауарларды іздеп жатырмын…',
    found:'Сәйкес нұсқалар',none:'Дәл сәйкестік табылмады. Мақсатын, брендін немесе көлемін нақтылап көріңіз.',
    error:'Іздеуді орындау мүмкін болмады. Қайта көріңіз.',add:'Себетке',adding:'Қосып жатырмын…',
    added:'Себетте ✓',addedTitle:'Тауар себетке қосылды',buy:'Сатып алу',details:'Толығырақ',
    stock:'Қоймада бар',cart:'Себетті ашу',close:'Жабу',back:'Артқа',
    status:'aromika.shop каталогы қосылған',send:'Жіберу',
    sent:'Aromika-ға жіберілді. Нөмірі:',needContact:'Телефон немесе e-mail көрсетіңіз.',
    failed:'Жіберу мүмкін болмады. info@aromika.info поштасына жаза аласыз.',
    brands:'Біздің брендтер',brandsSub:'Брендті таңдаңыз — дүкендегі тауарларды көрсетемін',
    showProducts:'Тауарларды көрсету',showing:'Тауарларды көрсетіп жатырмын',showingAll:'Aromika өнімдерін көрсетіп жатырмын.',
    count:'дана',cartItems:'тауар',cartError:'Тауарды себетке қосу мүмкін болмады. Қайта көріңіз.',
    quickLaundry:'Кір жуу',quickDish:'Ыдыс жуу',quickCleaning:'Тазалау',quickSoap:'Сабын',quickBody:'Душ және дене',
    findAria:'Іздеу'
  }
};
function uiLang(){
  var l='ru';
  try{l=localStorage.getItem('aromika-romi-language')||localStorage.getItem('aromika-language')||document.documentElement.lang||'ru'}catch(e){}
  l=String(l).toLowerCase();
  return (l==='kk'||l==='kz'||l.indexOf('kk')===0)?'kk':'ru';
}
function tr(k){var l=uiLang();return (UI_TEXT[l]&&UI_TEXT[l][k])||UI_TEXT.ru[k]||k}
function normalizeLanguageQuery(q){
  var s=String(q||'');
  return s
    .replace(/кір\s*жууға?\s*арналған\s*гель|кір\s*жуу\s*гелі|кір\s*жуу/gi,'гель для стирки')
    .replace(/ыдыс\s*жууға?\s*арналған\s*гель|ыдыс\s*жуу|ыдыс/gi,'гель для мытья посуды')
    .replace(/сұйық\s*сабын|сабын/gi,'жидкое мыло')
    .replace(/душқа?\s*арналған\s*гель|душ\s*гелі/gi,'гель для душа')
    .replace(/сусабын/gi,'шампунь')
    .replace(/тазалағыш\s*құрал|тазалау/gi,'чистящее средство')
    .replace(/ақ\s*(киім|мата)?/gi,'белый')
    .replace(/қара\s*(киім|мата)?/gi,'черный')
    .replace(/түрлі[-\s]*түсті/gi,'цветной');
}


function esc(v){return String(v == null ? '' : v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function money(v){var n=Number(v);return isFinite(n)&&n>0?Math.round(n).toLocaleString('ru-RU')+' ₸':''}
function uniq(a){return a.filter(function(v,i){return v && a.indexOf(v)===i})}
function lower(s){return String(s||'').toLowerCase().replace(/ё/g,'е')}
function asset(name){
  var base = window.AROMIKA_ASSISTANT_ASSET_BASE || 'https://cdn.jsdelivr.net/gh/dickort/aromika-site@main/romi/';
  return base.replace(/\/?$/,'/') + name;
}
function api(mode, opts){
  opts=opts||{};
  var url=C.apiBase + encodeURIComponent(mode);
  if(opts.query){
    var sp=new URLSearchParams();
    Object.keys(opts.query).forEach(function(k){
      if(opts.query[k]!==undefined && opts.query[k]!==null && opts.query[k]!=='') sp.set(k,opts.query[k]);
    });
    var qs=sp.toString(); if(qs) url += '&'+qs;
  }
  return fetch(url,{
    method:opts.method||'GET',
    credentials:'include',
    headers:Object.assign({'Accept':'application/json'},opts.body?{'Content-Type':'application/json'}:{}),
    body:opts.body?JSON.stringify(opts.body):undefined
  }).then(function(r){
    return r.text().then(function(txt){
      var j; try{j=JSON.parse(txt)}catch(e){throw new Error('invalid_json')}
      if(!r.ok || j.ok===false) throw new Error(j.error||('http_'+r.status));
      return j;
    });
  });
}
function initialSid(){
  var incoming='';
  try{incoming=(new URL(location.href)).searchParams.get('romi_session')||''}catch(e){}
  if(/^[a-zA-Z0-9_-]{24,80}$/.test(incoming)){
    try{localStorage.setItem(SID_KEY,incoming)}catch(e){}
    return incoming;
  }
  var s=''; try{s=localStorage.getItem(SID_KEY)||''}catch(e){}
  if(/^[a-zA-Z0-9_-]{24,80}$/.test(s)) return s;
  try{
    s='rs_'+Array.from(crypto.getRandomValues(new Uint8Array(24))).map(function(x){return x.toString(16).padStart(2,'0')}).join('');
  }catch(e){s='rs_'+Date.now()+Math.random().toString(36).slice(2)}
  try{localStorage.setItem(SID_KEY,s)}catch(e){}
  return s;
}
function saveSession(){
  var payload={
    messages:STATE.messages.slice(-18),
    last_query:STATE.last_query,
    last_products:STATE.last_products.slice(0,8),
    customer_type:STATE.customer_type,
    city:STATE.city,
    selected_product_id:STATE.selected_product_id,
    lang:'ru'
  };
  return api('session_save',{method:'POST',body:{session_id:STATE.session_id,session:payload}}).catch(function(){});
}
function loadSession(){
  STATE.session_id=initialSid();
  return api('session_get',{query:{session_id:STATE.session_id}}).then(function(j){
    STATE.session_id=j.session_id||STATE.session_id;
    var s=j.session||{};
    ['messages','last_query','last_products','customer_type','city','selected_product_id'].forEach(function(k){
      if(s[k]!==undefined) STATE[k]=s[k];
    });
    try{localStorage.setItem(SID_KEY,STATE.session_id)}catch(e){}
  }).catch(function(){});
}
function record(role,text){
  STATE.messages.push({role:role,text:String(text||'').slice(0,900)});
  STATE.messages=STATE.messages.slice(-18);
  saveSession();
}
function addMessage(role, html, plain){
  var d=document.createElement('div');
  d.className='rv81-msg rv81-msg--'+role;
  d.innerHTML=html;
  CHAT.appendChild(d);
  CHAT.scrollTop=CHAT.scrollHeight;
  if(plain) record(role,plain);
  return d;
}
function say(text){return addMessage('assistant','<div class="rv81-bubble">'+esc(text)+'</div>',text)}
function user(text){return addMessage('user','<div class="rv81-bubble">'+esc(text)+'</div>',text)}
function loading(){
  return addMessage('assistant','<div class="rv81-bubble rv81-loading"><span></span><span></span><span></span><b>'+esc(tr('searching'))+'</b></div>');
}
function remove(el){if(el&&el.parentNode) el.parentNode.removeChild(el)}

function build(){
  ROOT=document.getElementById('aromika-assistant');
  if(!ROOT) return false;
  PANEL=ROOT.querySelector('.aa-panel');
  if(!PANEL) return false;

  var old=PANEL.querySelector('.rv8-layer,.rv81-layer');
  if(old) old.remove();

  LAYER=document.createElement('section');
  LAYER.className='rv81-layer';
  LAYER.innerHTML=
    '<header class="rv81-head">'+
      '<div class="rv81-person"><span class="rv81-avatar"><img src="'+esc(asset('romi-finder.webp'))+'" alt=""></span><div><b>Romi</b><small data-rv-text="status">'+esc(tr('status'))+'</small></div></div>'+
      '<div class="rv81-head-actions"><button type="button" class="rv81-back" data-rv-title="back" title="'+esc(tr('back'))+'">←</button><button type="button" class="rv81-x" data-rv-title="close" title="'+esc(tr('close'))+'">×</button></div>'+
    '</header>'+
    '<div class="rv81-chat"></div>'+
    '<div class="rv81-quick">'+
      '<button type="button" data-rv-text="quickLaundry" data-q="гель для стирки">'+esc(tr('quickLaundry'))+'</button>'+
      '<button type="button" data-rv-text="quickDish" data-q="гель для мытья посуды">'+esc(tr('quickDish'))+'</button>'+
      '<button type="button" data-rv-text="quickCleaning" data-q="чистящее средство">'+esc(tr('quickCleaning'))+'</button>'+
      '<button type="button" data-rv-text="quickSoap" data-q="жидкое мыло">'+esc(tr('quickSoap'))+'</button>'+
      '<button type="button" data-rv-text="quickBody" data-q="гель для душа">'+esc(tr('quickBody'))+'</button>'+
    '</div>'+
    '<form class="rv81-form"><textarea rows="1" maxlength="500" data-rv-placeholder="placeholder" placeholder="'+esc(tr('placeholder'))+'"></textarea><button type="submit" data-rv-aria="findAria" aria-label="'+esc(tr('findAria'))+'">→</button></form>';

  PANEL.appendChild(LAYER);
  CHAT=LAYER.querySelector('.rv81-chat');
  FORM=LAYER.querySelector('.rv81-form');
  INPUT=FORM.querySelector('textarea');

  function ensureProductEntry(){
    if(!ROOT) return;
    var actions=ROOT.querySelector('.aa-screen .aa-actions');
    if(!actions) return;

    var existing=actions.querySelector('.rv81-entry');

    if(C.site==='shop'){
      var redundantShopAction=actions.querySelector('[data-aa-action="shop"]');
      if(redundantShopAction) redundantShopAction.remove();
    }

    if(existing) return;

    var b=document.createElement('button');
    b.type='button';
    b.className='aa-action aa-action--primary rv81-entry';
    b.innerHTML='<span class="aa-action-icon">✦</span><span class="aa-action-copy"><b>'+tr('entry')+'</b><small>'+tr('entrySub')+'</small></span><span class="aa-arrow">→</span>';
    b.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      open();
    });
    actions.insertBefore(b,actions.firstChild);

  }

  // V5 completely rewrites .aa-screen when navigating/back/language changes.
  // Therefore the commerce entry must be reinserted after every V5 render,
  // not only once during V8 boot.
  ensureProductEntry();

  var aaScreen=ROOT.querySelector('.aa-screen');
  if(aaScreen && !aaScreen.__ROMI_V8_MENU_OBSERVER__){
    aaScreen.__ROMI_V8_MENU_OBSERVER__=true;
    var menuObserver=new MutationObserver(function(){
      ensureProductEntry();
    });
    menuObserver.observe(aaScreen,{childList:true,subtree:true});
  }

  window.addEventListener('storage',function(){setTimeout(ensureProductEntry,80)});
  document.addEventListener('click',function(e){
    if(e.target && e.target.closest && (e.target.closest('[data-lang]') || e.target.closest('.aa-back') || e.target.closest('[data-aa-home]'))){
      setTimeout(ensureProductEntry,100);
    }
  },true);

  FORM.addEventListener('submit',function(e){
    e.preventDefault();
    var q=INPUT.value.trim();
    if(!q) return;
    INPUT.value='';
    handle(q);
  });
  INPUT.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();FORM.requestSubmit()}
  });
  LAYER.addEventListener('click',clicks);
  LAYER.querySelector('.rv81-back').addEventListener('click',closeToHome);
  LAYER.querySelector('.rv81-x').addEventListener('click',closeAll);

  loadSession().then(function(){
    if(Array.isArray(STATE.messages)&&STATE.messages.length){
      STATE.messages.forEach(function(m){
        addMessage(m.role==='user'?'user':'assistant','<div class="rv81-bubble">'+esc(m.text)+'</div>');
      });
    } else {
      intro();
    }
    try{
      var q=(new URL(location.href)).searchParams.get('romi');
      if(q){open();setTimeout(function(){handle(q)},120)}
    }catch(e){}
  });
  return true;
}
function intro(){
  say(tr('hello'));
}
function applyUiLanguage(){
  if(!LAYER) return;
  LAYER.querySelectorAll('[data-rv-text]').forEach(function(el){el.textContent=tr(el.getAttribute('data-rv-text'))});
  LAYER.querySelectorAll('[data-rv-title]').forEach(function(el){el.setAttribute('title',tr(el.getAttribute('data-rv-title')))});
  LAYER.querySelectorAll('[data-rv-placeholder]').forEach(function(el){el.setAttribute('placeholder',tr(el.getAttribute('data-rv-placeholder')))});
  LAYER.querySelectorAll('[data-rv-aria]').forEach(function(el){el.setAttribute('aria-label',tr(el.getAttribute('data-rv-aria')))});
}
function open(){
  applyUiLanguage();
  ROOT.classList.add('is-rv8');
  LAYER.classList.add('is-active');
  setTimeout(function(){INPUT&&INPUT.focus({preventScroll:true})},80);
}
function handleBack(){
  closeToHome();
}
function closeToHome(){

  ROOT.classList.remove('is-rv8');
  LAYER.classList.remove('is-active');
}
function closeAll(){
  closeToHome();
  var x=ROOT.querySelector('.aa-close, .aa-panel-close');
  if(x){ x.click(); return; }
  ROOT.classList.remove('is-open');
  document.documentElement.classList.remove('aa-lock-mobile');
}

function clicks(e){
  var q=e.target.closest('[data-q]');
  if(q){
    open();
    handle(q.getAttribute('data-q'));
    return;
  }

  var brand=e.target.closest('[data-brand-query]');
  if(brand){
    var brandName=brand.getAttribute('data-brand-query')||'';
    if(!brandName) return;
    CHAT.innerHTML='';
    say(tr('showing')+' '+brandName+'.');
    smartSearch(brandName);
    return;
  }

  var add=e.target.closest('[data-add]');
  if(add){
    addCart(add);
    return;
  }
}

function renderBrandPicker(){
  open();
  CHAT.innerHTML='';
  addMessage('assistant',
    '<div class="rv91-brand-picker">'+
      '<div class="rv91-brand-picker-head"><b>'+esc(tr('brands'))+'</b><span>'+esc(tr('brandsSub'))+'</span></div>'+
      '<div class="rv91-brand-grid">'+
        ['Perfect','Wash Expert','Maxi Power','Prachka','Antibak'].map(function(name){
          return '<button type="button" data-brand-query="'+esc(name)+'"><b>'+esc(name)+'</b><span>'+esc(tr('showProducts'))+' →</span></button>';
        }).join('')+
      '</div>'+
    '</div>'
  );
}

function intent(q){
  var s=lower(q);
  if(/жалоб|претенз|протек|сломал|брак|поврежд|не работает|проблем/.test(s)) return 'complaint';
  if(/оставить отзыв|отзыв|оценк/.test(s)) return 'review';
  if(/гостиниц|отел|ресторан|кафе|опт|дистриб|торговая сеть|для бизнеса|horeca|корпоратив/.test(s)) return 'b2b';
  return 'search';
}
function handle(q){
  user(q);
  var searchQ=normalizeLanguageQuery(q);
  var i=intent(searchQ);
  if(i==='complaint'){say('Помогу оформить обращение. Укажите товар, что произошло, город, где покупали, и контакт для связи.');renderFeedback('complaint');return}
  if(i==='review'){say('Оставьте товар, оценку и текст отзыва.');renderFeedback('review');return}
  if(i==='b2b'){STATE.customer_type='b2b';say('Для B2B-запроса укажите город, компанию и телефон или e-mail.');renderFeedback('b2b');return}
  smartSearch(searchQ);
}

function normalizeQuery(q){
  return lower(q)
    .replace(/[!?.,;:()]/g,' ')
    .replace(/\b(мне|нужно|нужен|нужна|хочу|покажи|подбери|найди|пожалуйста|есть ли|что есть)\b/g,' ')
    .replace(/\s+/g,' ').trim();
}
function volumeTarget(q){
  var s=lower(q),m=s.match(/(\d+(?:[.,]\d+)?)\s*(мл|ml|л|литр(?:а|ов)?|l)\b/);
  if(!m) return 0;
  var n=parseFloat(m[1].replace(',','.'));
  return /мл|ml/.test(m[2])?Math.round(n):Math.round(n*1000);
}
function productVolume(p){
  var features=p.features||[], i, v;
  for(i=0;i<features.length;i++){
    if(/объ[её]м|volume/i.test(features[i].name||'')){
      v=parseFloat(String(features[i].value||'').replace(',','.'));
      if(isFinite(v)) return v>20?Math.round(v):Math.round(v*1000);
    }
  }
  var s=lower(p.name),m=s.match(/(\d{3,5})\s*мл\b/);
  if(m) return parseInt(m[1],10);
  m=s.match(/(\d+(?:[.,]\d+)?)\s*л\b/);
  return m?Math.round(parseFloat(m[1].replace(',','.'))*1000):0;
}
function detect(q){
  var s=lower(q);
  var d={
    brand:'',
    category:'',
    subcategory:'',
    purpose:'',
    volume:volumeTarget(q),
    explicitCategory:false
  };

  [
    ['wash expert','Wash Expert'],
    ['washexpert','Wash Expert'],
    ['maxi power','Maxi Power'],
    ['antibak','Antibak'],
    ['perfect','Perfect'],
    ['prachka','Prachka']
  ].some(function(pair){
    if(s.indexOf(pair[0])>=0){d.brand=pair[1];return true}
  });

  // Hard product intent. Order matters.
  if(/гель\s+для\s+стир|для\s+стирк|стиральн|бель[яе]|laundry/.test(s)){
    d.category='laundry'; d.explicitCategory=true;
  } else if(/гель\s+для\s+мытья\s+посуд|для\s+посуд|посуд/.test(s)){
    d.category='dish'; d.explicitCategory=true;
  } else if(/гель\s+для\s+душ|душ/.test(s)){
    d.category='shower'; d.explicitCategory=true;
  } else if(/жидк\w*\s+мыл|крем[-\s]?мыл/.test(s)){
    d.category='liquid_soap'; d.explicitCategory=true;
  } else if(/кусков\w*\s+мыл|банн\w*\s+мыл|тверд\w*\s+мыл/.test(s)){
    d.category='bar_soap'; d.explicitCategory=true;
  } else if(/\bмыл[оа]?\b/.test(s)){
    // Generic "мыло" should first show liquid soap, not bath/bar soap.
    d.category='soap_generic'; d.explicitCategory=true;
  } else if(/шампун/.test(s)){
    d.category='shampoo'; d.explicitCategory=true;
  } else if(/кондиционер.*бель|для\s+белья/.test(s)){
    d.category='laundry_conditioner'; d.explicitCategory=true;
  } else if(/чистящ|уборк|антижир|стекл|сануз/.test(s)){
    d.category='cleaning'; d.explicitCategory=true;
  }

  if(/черн|темн|black|dark/.test(s)) d.purpose='black';
  else if(/бел|white/.test(s)) d.purpose='white';
  else if(/цветн|color|colour/.test(s)) d.purpose='color';
  else if(/гипо|hypo|эко|eco/.test(s)) d.purpose='hypo';

  return d;
}

function productText(p){
  return lower(
    (p.name||'')+' '+(p.sku||'')+' '+
    (p.short_description||'')+' '+
    (p.features||[]).map(function(f){return (f.name||'')+' '+(f.value||'')}).join(' ')
  );
}

function categoryMatch(p,d){
  var s=productText(p);

  if(!d.category) return true;

  if(d.category==='laundry'){
    // Positive match + hard negatives prevent shower gels and soap.
    return (/стир|бель|laundry/.test(s) || /wash expert|maxi power|prachka/.test(s))
      && !/для\s+душ|шампун|жидк\w*\s+мыл|крем[-\s]?мыл|посуд/.test(s);
  }
  if(d.category==='dish'){
    return /посуд|dish/.test(s) && !/стир|душ|шампун/.test(s);
  }
  if(d.category==='shower'){
    return /для\s+душ|гель\s+душ|shower/.test(s);
  }
  if(d.category==='liquid_soap'){
    return /жидк\w*\s+мыл|крем[-\s]?мыл/.test(s) && !/кусков|банн\w*\s+мыл/.test(s);
  }
  if(d.category==='bar_soap'){
    return /кусков\w*\s+мыл|банн\w*\s+мыл|тверд\w*\s+мыл/.test(s);
  }
  if(d.category==='soap_generic'){
    return /мыл/.test(s);
  }
  if(d.category==='shampoo'){
    return /шампун|shampoo/.test(s);
  }
  if(d.category==='laundry_conditioner'){
    return /кондиционер/.test(s) && /бель|стир/.test(s);
  }
  if(d.category==='cleaning'){
    return /чистящ|уборк|антижир|стекл|сануз|clean/.test(s);
  }
  return true;
}

function brandMatch(p,d){
  if(!d.brand) return true;
  return productText(p).indexOf(lower(d.brand))>=0;
}

function searchTerms(q){
  var n=normalizeQuery(q),d=detect(q),a=[];

  // Most specific phrase first.
  if(d.brand && d.category==='laundry') a.push(d.brand+' гель для стирки');
  else if(d.brand && d.category==='dish') a.push(d.brand+' гель для мытья посуды');
  else if(d.brand && d.category==='shower') a.push(d.brand+' гель для душа');
  else if(d.brand && d.category==='liquid_soap') a.push(d.brand+' жидкое мыло');
  else if(n) a.push(n);

  // Strong category query second.
  if(d.category==='laundry') a.push('гель для стирки');
  else if(d.category==='dish') a.push('гель для мытья посуды');
  else if(d.category==='shower') a.push('гель для душа');
  else if(d.category==='liquid_soap') a.push('жидкое мыло');
  else if(d.category==='soap_generic') a.push('мыло');
  else if(d.category==='bar_soap') a.push('банное мыло');
  else if(d.category==='shampoo') a.push('шампунь');
  else if(d.category==='laundry_conditioner') a.push('кондиционер для белья');
  else if(d.category==='cleaning') a.push('чистящее средство');

  // Brand-only query is only a fallback pool; hard filtering still applies later.
  if(d.brand) a.push(d.brand);

  return uniq(a).slice(0,3);
}
function score(p,q){
  var s=productText(p),d=detect(q),sc=0;

  if(d.brand){
    if(s.indexOf(lower(d.brand))>=0) sc+=40;
    else sc-=80;
  }

  if(categoryMatch(p,d)) sc+=35;
  else if(d.explicitCategory) sc-=120;

  if(d.purpose==='black' && /black|dark|черн|темн/.test(s)) sc+=22;
  if(d.purpose==='white' && /white|бел/.test(s)) sc+=22;
  if(d.purpose==='color' && /color|colour|цвет/.test(s)) sc+=20;
  if(d.purpose==='hypo' && /гипо|hypo|eco|эко/.test(s)) sc+=20;

  if(d.category==='soap_generic'){
    // Prefer liquid soap for a generic "мыло" request.
    if(/жидк\w*\s+мыл|крем[-\s]?мыл/.test(s)) sc+=24;
    if(/кусков|банн\w*\s+мыл|тверд\w*\s+мыл/.test(s)) sc-=10;
  }

  if(d.volume){
    var pv=productVolume(p), diff=Math.abs(pv-d.volume);
    if(pv){
      if(diff<=100) sc+=25;
      else if(diff<=350) sc+=18;
      else if(diff<=800) sc+=10;
      else if(diff<=1400) sc+=3;
      else sc-=8;
    }
  }

  normalizeQuery(q).split(' ').filter(function(x){
    return x.length>=4 && !/^(гель|мыло|товар|продукт)$/.test(x);
  }).forEach(function(tok){
    if(s.indexOf(tok)>=0) sc+=3;
  });

  if(p.in_stock===true) sc+=3;
  return sc;
}

function smartSearch(q){
  var wait=loading(),terms=searchTerms(q),d=detect(q);

  function fetchTerms(list){
    return Promise.all(list.map(function(term){
      return api('search',{query:{q:term}})
        .then(function(j){return j.products||[]})
        .catch(function(){return []});
    }));
  }

  function prepare(groups){
    var byId={};
    groups.forEach(function(g){
      g.forEach(function(p){byId[p.product_id]=p});
    });

    var list=Object.keys(byId).map(function(k){return byId[k]});

    if(d.explicitCategory){
      list=list.filter(function(p){return categoryMatch(p,d)});
    }
    if(d.brand){
      list=list.filter(function(p){return brandMatch(p,d)});
    }

    list.sort(function(a,b){return score(b,q)-score(a,q)});
    return list;
  }

  fetchTerms(terms).then(function(groups){
    var list=prepare(groups);

    // If a strict phrase still yielded no candidate, retry one broad category
    // query. Server returns up to 40 candidates, then categoryMatch gates them.
    if(!list.length && d.category){
      var fallback='';
      if(d.category==='laundry') fallback='стирки';
      else if(d.category==='dish') fallback='посуды';
      else if(d.category==='shower') fallback='душа';
      else if(d.category==='liquid_soap'||d.category==='soap_generic'||d.category==='bar_soap') fallback='мыло';
      else if(d.category==='shampoo') fallback='шампунь';
      else if(d.category==='laundry_conditioner') fallback='кондиционер';
      else if(d.category==='cleaning') fallback='чистящее';

      if(fallback){
        return fetchTerms([fallback]).then(function(extra){
          return prepare(groups.concat(extra));
        });
      }
    }
    return list;
  }).then(function(list){
    remove(wait);

    STATE.last_query=q;
    STATE.last_products=list.slice(0,8).map(function(p){return p.product_id});
    saveSession();

    if(!list.length){
      say(tr('none'));
      return;
    }
    renderProducts(list.slice(0,6));
  }).catch(function(err){
    remove(wait);
    console.error('[Romi search]',err);
    say(tr('error'));
  });
}
function meta(p){
  var v=productVolume(p),bits=[];
  if(v) bits.push(v>=1000?(Math.round(v/100)/10)+' л':v+' мл');
  if(p.in_stock===true) bits.push(tr('stock'));
  return bits;
}

function productCard(p){
  var old=money(p.old_price),price=money(p.price);
  var primary=C.site==='shop'
    ? '<button type="button" class="rv81-primary" data-add="'+esc(p.product_id)+'">'+tr('add')+'</button>'
    : '<a class="rv81-primary" href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+tr('buy')+' ↗</a>';

  return '<article class="rv81-product" data-pid="'+esc(p.product_id)+'">'+
    '<a class="rv81-product-img" href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+
      (p.image?'<img src="'+esc(p.image)+'" alt="" loading="lazy">':'<span>AROMIKA</span>')+
    '</a>'+
    '<div class="rv81-product-main">'+
      '<div class="rv81-sku">SKU '+esc(p.sku||'—')+'</div>'+
      '<a class="rv81-name" href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+esc(p.name)+'</a>'+
      '<div class="rv81-meta">'+meta(p).map(function(x){return '<span>'+esc(x)+'</span>'}).join('')+'</div>'+
      '<div class="rv81-price">'+
        (price?'<strong>'+esc(price)+'</strong>':'')+
        (old?'<del>'+esc(old)+'</del>':'')+
        (p.discount_percent?'<em>−'+esc(p.discount_percent)+'%</em>':'')+
      '</div>'+
    '</div>'+
    '<div class="rv81-card-actions">'+
      primary+
      '<a href="'+esc(withSession(p.url))+'" target="_blank" rel="noopener">'+tr('details')+'</a>'+
    '</div>'+
  '</article>';
}

function renderProducts(products){
  addMessage('assistant',
    '<div class="rv81-result-head"><b>'+esc(tr('found'))+'</b><span>'+products.length+' '+esc(tr('count'))+'</span></div>'+
    '<div class="rv81-products">'+products.map(productCard).join('')+'</div>'
  );
}
function addCart(btn){
  var id=Number(btn.getAttribute('data-add'));
  btn.disabled=true;btn.textContent=tr('adding');
  api('cart_add',{method:'POST',body:{product_id:id,amount:1}}).then(function(j){
    btn.textContent=tr('added');
    btn.classList.add('is-added');
    var c=j.cart||{};
    addMessage('assistant','<div class="rv81-cartmsg"><b>'+esc(tr('addedTitle'))+'</b><span>'+esc((c.amount||0)+' '+tr('cartItems')+' · '+(money(c.total)||''))+'</span><a href="'+esc(c.cart_url||C.shopOrigin+'/cart/')+'">'+esc(tr('cart'))+' →</a></div>');
  }).catch(function(err){
    console.error('[Romi cart]',err);
    btn.disabled=false;btn.textContent=tr('add');
    say(tr('cartError'));
  });
}
function renderFeedback(type){
  var title=type==='b2b'?'B2B-запрос':type==='review'?'Отзыв':'Обращение';
  var html='<form class="rv81-feedback" data-type="'+esc(type)+'">'+
    '<b>'+esc(title)+'</b>'+
    '<input name="company_url" class="rv81-hp" tabindex="-1" autocomplete="off">'+
    '<div class="rv81-fields"><input name="name" placeholder="Имя"><input name="city" placeholder="Город"></div>'+
    '<div class="rv81-fields"><input name="phone" placeholder="Телефон"><input name="email" placeholder="E-mail"></div>'+
    '<input name="product_name" placeholder="'+(type==='b2b'?'Компания / что требуется':'Товар')+'">'+
    (type==='review'?'<input name="rating" inputmode="numeric" placeholder="Оценка 1–5">':'')+
    '<textarea name="message" rows="4" placeholder="Комментарий"></textarea>'+
    (type==='complaint'?'<label class="rv81-file">Фото, если нужно<input name="photo" type="file" accept="image/jpeg,image/png,image/webp"></label>':'')+
    '<button type="submit">'+tr('send')+' →</button><small class="rv81-form-error"></small></form>';
  var box=addMessage('assistant',html),form=box.querySelector('form');
  form.addEventListener('submit',function(e){e.preventDefault();submitFeedback(form,type)});
}
function fileData(file){
  return new Promise(function(resolve,reject){
    if(!file){resolve('');return}
    if(file.size>5*1024*1024){reject(new Error('too_large'));return}
    var r=new FileReader();r.onload=function(){resolve(String(r.result||''))};r.onerror=function(){reject(new Error('read'))};r.readAsDataURL(file);
  });
}
function submitFeedback(form,type){
  var fd=new FormData(form),body={type:type,session_id:STATE.session_id,source:C.site};
  fd.forEach(function(v,k){if(k!=='photo') body[k]=String(v||'').trim()});
  if(type==='b2b'&&!body.phone&&!body.email){form.querySelector('.rv81-form-error').textContent=tr('needContact');return}
  var submit=form.querySelector('button[type=submit]'),file=form.querySelector('input[name=photo]');
  submit.disabled=true;
  fileData(file&&file.files&&file.files[0]).then(function(data){
    if(data) body.photo_data=data;
    return api(type==='b2b'?'b2b':'feedback',{method:'POST',body:body});
  }).then(function(j){
    form.remove();say(tr('sent')+' '+(j.reference||''));
  }).catch(function(){
    submit.disabled=false;form.querySelector('.rv81-form-error').textContent=tr('failed');
  });
}
function withSession(url){
  try{
    var u=new URL(url,location.href);
    u.searchParams.set('romi_session',STATE.session_id);
    return u.toString();
  }catch(e){return url}
}

function fixLegacyInfoLinks(){
  if(C.site!=='shop') return;

  var commerceBrandRoutes={
    '/perfect':'Perfect',
    '/washexpert':'Wash Expert',
    '/maxipower':'Maxi Power',
    '/prachka':'Prachka',
    '/antibak':'Antibak'
  };

  var infoRoutes=[
    '/', '/okompanii', '/careers', '/kontakty'
  ];

  document.addEventListener('click',function(e){
    var a=e.target && e.target.closest ? e.target.closest('#aromika-assistant a[href]') : null;
    if(!a) return;

    var raw=a.getAttribute('href')||'';
    if(!raw || raw.charAt(0)!=='/' || raw.indexOf('//')===0) return;

    var pathOnly=raw.split('?')[0].split('#')[0]||'/';

    // Promotions: shopper stays in the online store.
    if(pathOnly==='/akcii'){
      e.preventDefault();
      e.stopPropagation();
      window.location.href=C.shopOrigin.replace(/\/$/,'')+'/bestsellery/';
      return;
    }

    // "Наши бренды" on shop becomes an in-assistant brand picker.
    if(pathOnly==='/brands'){
      e.preventDefault();
      e.stopPropagation();
      renderBrandPicker();
      return;
    }

    // Brand result from the old step-by-step finder:
    // stay in shop and show live CS-Cart products.
    if(commerceBrandRoutes[pathOnly]){
      e.preventDefault();
      e.stopPropagation();
      open();
      CHAT.innerHTML='';
      var brandQuery=commerceBrandRoutes[pathOnly];
      say(tr('showing')+' '+brandQuery+'.');
      smartSearch(brandQuery);
      return;
    }

    // Generic product link stays in commerce.
    if(raw.indexOf('/#products')===0){
      e.preventDefault();
      e.stopPropagation();
      open();
      CHAT.innerHTML='';
      say(tr('showingAll'));
      smartSearch('Aromika');
      return;
    }

    // Only genuinely corporate/informational routes leave the store.
    if(infoRoutes.indexOf(pathOnly)!==-1){
      e.preventDefault();
      var dest=C.infoOrigin.replace(/\/$/,'')+raw;
      if(a.target==='_blank') window.open(dest,'_blank','noopener');
      else window.location.href=dest;
    }
  },true);
}

function boot(){
  window.addEventListener('romi:language',function(){applyUiLanguage()});
  fixLegacyInfoLinks();
  var tries=0;(function wait(){
    if(build()) return;
    if(++tries<100) setTimeout(wait,120);
  })();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();
