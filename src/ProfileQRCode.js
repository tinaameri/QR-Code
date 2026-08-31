import React, { useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./ProfileQRCode.css";

const Icon = ({ type }) => type === "download" ? (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14" /></svg>
) : (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 13.5a4.1 4.1 0 0 0 5.8 0l2.2-2.2a4.1 4.1 0 0 0-5.8-5.8l-1.2 1.2M13.5 10.5a4.1 4.1 0 0 0-5.8 0l-2.2 2.2a4.1 4.1 0 0 0 5.8 5.8l1.2-1.2" /></svg>
);

const translations = {
  fa: {
    title: "کد QR پروفایل شما", description: "لینک خود را وارد کنید و یک کد اختصاصی، باکیفیت و آماده اشتراک بسازید.",
    customize: "شخصی‌سازی", liveChanges: "تغییرات به‌صورت زنده نمایش داده می‌شوند", profileLink: "لینک پروفایل",
    outputSize: "اندازه خروجی", codeColor: "رنگ کد", contrast: "رنگی با کنتراست بالا انتخاب کنید", colorAria: "انتخاب رنگ کد QR",
    fileName: "نام فایل", preview: "پیش‌نمایش", live: "زنده", scan: "برای مشاهده پروفایل اسکن کنید",
    download: "دانلود با کیفیت SVG", hint: "مناسب چاپ، کارت ویزیت و شبکه‌های اجتماعی", language: "تغییر زبان به انگلیسی"
  },
  en: {
    title: "Your Profile QR Code", description: "Enter your link and create a custom, high-quality QR code ready to share.",
    customize: "Customize", liveChanges: "Changes appear in the preview instantly", profileLink: "Profile link",
    outputSize: "Output size", codeColor: "Code color", contrast: "Choose a color with high contrast", colorAria: "Choose QR code color",
    fileName: "File name", preview: "Preview", live: "Live", scan: "Scan to view profile",
    download: "Download high-quality SVG", hint: "Perfect for print, business cards, and social media", language: "Switch language to Persian"
  }
};

const ProfileQRCode = () => {
  const svgWrapperRef = useRef(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [size, setSize] = useState(300);
  const [fileName, setFileName] = useState("profile-qr-code.svg");
  const [foreground, setForeground] = useState("#172554");
  const [language, setLanguage] = useState("fa");
  const t = translations[language];
  const qrValue = profileUrl.trim() || "https://example.com/profile";
  const normalizedFileName = useMemo(() => {
    const name = fileName.trim() || "profile-qr-code";
    return name.toLowerCase().endsWith(".svg") ? name : `${name}.svg`;
  }, [fileName]);

  const downloadSVG = () => {
    const svg = svgWrapperRef.current?.querySelector("svg");
    if (!svg) return;
    let source = new XMLSerializer().serializeToString(svg);
    if (!source.includes('xmlns="http://www.w3.org/2000/svg"')) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    const url = URL.createObjectURL(new Blob([source], { type: "image/svg+xml;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = normalizedFileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className={`qr-page qr-page--${language}`} dir={language === "fa" ? "rtl" : "ltr"} lang={language}>
      <div className="qr-orb qr-orb--one" /><div className="qr-orb qr-orb--two" />
      <section className="qr-shell">
        <header className="qr-header">
          <div className="qr-brand-mark" aria-hidden="true"><span /><span /><span /><span /></div>
          <div className="qr-header-copy">
            <span className="qr-eyebrow">QR STUDIO</span>
            <h1>{t.title}</h1>
            <p>{t.description}</p>
          </div>
          <button className="qr-language" type="button" onClick={() => setLanguage(language === "fa" ? "en" : "fa")} aria-label={t.language}>
            <span className={language === "fa" ? "active" : ""}>فا</span><i /><span className={language === "en" ? "active" : ""}>EN</span>
          </button>
        </header>

        <div className="qr-content">
          <div className="qr-form-panel">
            <div className="qr-section-heading"><span>{t.customize}</span><small>{t.liveChanges}</small></div>
            <label className="qr-field">
              <span className="qr-label">{t.profileLink}</span>
              <div className="qr-input-wrap"><Icon type="link" /><input dir="ltr" type="url" value={profileUrl} onChange={(e) => setProfileUrl(e.target.value)} placeholder="https://example.com/your-profile" /></div>
            </label>
            <div className="qr-field">
              <div className="qr-label-row"><span>{t.outputSize}</span><output>{size} px</output></div>
              <input className="qr-range" type="range" min="160" max="600" step="20" value={size} onChange={(e) => setSize(Number(e.target.value))} style={{ "--range-progress": `${((size - 160) / 440) * 100}%` }} />
              <div className="qr-range-labels"><span>160</span><span>600</span></div>
            </div>
            <div className="qr-field qr-color-field">
              <div><span className="qr-label">{t.codeColor}</span><small>{t.contrast}</small></div>
              <label className="qr-color-picker"><span style={{ backgroundColor: foreground }} /><code>{foreground.toUpperCase()}</code><input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} aria-label={t.colorAria} /></label>
            </div>
            <label className="qr-field">
              <span className="qr-label">{t.fileName}</span>
              <div className="qr-file-input"><input dir="ltr" type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="profile-qr-code.svg" /><span>SVG</span></div>
            </label>
          </div>

          <aside className="qr-preview-panel">
            <div className="qr-preview-topline"><span>{t.preview}</span><span className="qr-live"><i /> {t.live}</span></div>
            <div className="qr-card">
              <div className="qr-code-frame" ref={svgWrapperRef}>
                <QRCodeSVG value={qrValue} size={size} bgColor="#ffffff" fgColor={foreground} level="H" includeMargin />
                <span className="qr-corner qr-corner--tl" /><span className="qr-corner qr-corner--tr" /><span className="qr-corner qr-corner--bl" /><span className="qr-corner qr-corner--br" />
              </div>
              <strong>{t.scan}</strong><p dir="ltr">{profileUrl.trim() || "example.com/your-profile"}</p>
            </div>
            <button className="qr-download" type="button" onClick={downloadSVG}><Icon type="download" />{t.download}</button>
            <p className="qr-hint">{t.hint}</p>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ProfileQRCode;
