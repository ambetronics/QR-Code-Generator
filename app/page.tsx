"use client";
import { useState, useRef } from "react";
import styles from "./page.module.css";
import QRCode from "react-qr-code";

export default function Home() {
  const [link, setLink] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const qrContainer = qrRef.current?.querySelector("div[style*='border']");
    if (qrContainer) {
      const svg = qrContainer.querySelector("svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
          if (ctx) {
            canvas.width = 1000;
            canvas.height = 1000;
            // Fill white background
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Draw QR code with padding
            ctx.drawImage(img, 50, 50, 900, 900);
            const pngUrl = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            const rawFilename = link.split('/').pop();
            const filename = rawFilename ? rawFilename.split('.')[0] : 'qr_code';
            downloadLink.download = `${filename}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
          }
        };
        img.src = url;
      }
    }
  };

  return (
    <div className={styles.container} ref={qrRef}>
      <h1 style={{fontSize: '3rem'}}> QR CODE GENERATOR </h1>
      <div style={{display: 'flex', gap: '10px'}}>
      <input
        className={styles.inputStyle}
        type="text"
        value={link}
        placeholder="Enter your link or text"
        onChange={(e) => {
          setLink(e.target.value);
        }}
      />
      <button 
      className={styles.buttonStyle}
      style={{width: '100px'}}
      onClick={()=>{
        setLink('');
      }}
      >
        Clear
      </button>
      </div>
        <div style={{ border: "20px solid white", display: "inline-block" }}>
          <QRCode
            size={1000}
            value={link}
            bgColor="transparent"
            style={{ width: "300px", height: "auto" }}
          />
        </div>
      <button className={styles.buttonStyle} onClick={downloadQRCode}>
        Download QR Code
      </button>
    </div>
  );
}
