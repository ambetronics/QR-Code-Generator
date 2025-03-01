"use client";
import { useState, useRef } from "react";
import styles from "./page.module.css";
import QRCode from "react-qr-code";

export default function Home() {
  const [link, setLink] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector("svg");
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
          ctx.drawImage(img, 0, 0);
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
        <QRCode
          size={1000}
          value={link}
          bgColor="transparent"
          style={{ width: "300px", height: "auto" }}
        />
      <button className={styles.buttonStyle} onClick={downloadQRCode}>
        Download QR Code
      </button>
    </div>
  );
}
