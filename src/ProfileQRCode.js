import React, { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const ProfileQRCode = () => {
  const svgWrapperRef = useRef(null);

  // state برای تنظیمات داینامیک
  const [profileUrl, setprofileUrl] = useState(""
  );
  const [size, setSize] = useState(300);
  const [fileName, setFileName] = useState("profile_qr_code.svg");

  // تابع دانلود SVG
  const downloadSVG = () => {
    if (!svgWrapperRef.current) return;

    const svg = svgWrapperRef.current.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    // افزودن namespace اگر وجود ندارد (برای سازگاری)
    if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      svgString.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }

    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2> QR Code ساخت</h2>

      <div style={{ marginBottom: 20, textAlign: "left" }}>
        <label style={{ display: "block", marginBottom: 6 }}>
          لینک پروفایل :
        </label>
        <input
          type="text"
          value={profileUrl}
          onChange={(e) => setprofileUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            fontSize: 14,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
          placeholder="https://www.example.com/in/your-profile/"
        />
      </div>

      <div style={{ marginBottom: 20, textAlign: "left" }}>
        <label style={{ display: "block", marginBottom: 6 }}>اندازه (پیکسل):</label>
        <input
          type="number"
          min={100}
          max={1000}
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value) || 300)}
          style={{
            width: "100%",
            padding: "8px 10px",
            fontSize: 14,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: 20, textAlign: "left" }}>
        <label style={{ display: "block", marginBottom: 6 }}>نام فایل دانلودی:</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            fontSize: 14,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div ref={svgWrapperRef} style={{ marginBottom: 20 }}>
        <QRCodeSVG
          value={profileUrl}
          size={size}
          bgColor="#fff"
          fgColor="#000"
          level="H"
          includeMargin={true}
        />
      </div>

      <button
        onClick={downloadSVG}
        style={{
          backgroundColor: "#0073b1", // رنگ رسمی لینکدین
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          fontSize: 16,
          borderRadius: 6,
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005582")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0073b1")}
      >
      SVG دانلود فایل 
      </button>
    </div>
  );
};

export default ProfileQRCode;