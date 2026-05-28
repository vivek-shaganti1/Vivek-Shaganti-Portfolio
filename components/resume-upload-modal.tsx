"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, File, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (base64: string, timestamp: string) => void;
  themeMode: "volt" | "amber" | "chrome";
}

export default function ResumeUploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
  themeMode
}: ResumeUploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF documents are accepted.");
        return;
      }
      setSelectedFile(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF documents are accepted.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploadProgress(10);
    const reader = new FileReader();

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 80);

    reader.onload = (e) => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      const base64String = e.target?.result as string;
      if (base64String) {
        const timestamp = new Date().toLocaleString();
        localStorage.setItem("portfolio_resume_base64", base64String);
        localStorage.setItem("portfolio_resume_updated_at", timestamp);
        onUploadSuccess(base64String, timestamp);
        
        setTimeout(() => {
          setUploadProgress(null);
          setSelectedFile(null);
          onClose();
        }, 800);
      } else {
        setError("Failed to read file.");
        setUploadProgress(null);
      }
    };

    reader.onerror = () => {
      clearInterval(progressInterval);
      setUploadProgress(null);
      setError("File upload error.");
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 font-mono text-xs"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="w-full max-w-md bg-[#09090b]/95 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl p-6 relative space-y-6"
          >
            {/* Decorative edge line */}
            <div className={cn(
              "absolute top-0 left-0 w-1 h-full",
              themeMode === "volt" && "bg-[#CCFF00]",
              themeMode === "amber" && "bg-[#FFDE21]",
              themeMode === "chrome" && "bg-sky-400"
            )} />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 pl-2">
              <div className="flex items-center gap-2">
                <UploadCloud className={cn(
                  "h-4 w-4",
                  themeMode === "volt" && "text-[#CCFF00]",
                  themeMode === "amber" && "text-[#FFDE21]",
                  themeMode === "chrome" && "text-sky-450"
                )} />
                <span className="font-bold text-white uppercase tracking-wider">
                  Resume Terminal Uploader
                </span>
              </div>
              <button
                onClick={onClose}
                disabled={uploadProgress !== null}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-4 pl-2">
              {uploadProgress === null ? (
                <>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                      "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 transition-colors text-center cursor-pointer relative",
                      dragActive 
                        ? "border-[#CCFF00] bg-[#CCFF00]/5" 
                        : "border-zinc-800 hover:border-zinc-700 bg-zinc-950/30"
                    )}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="h-10 w-10 text-zinc-650" />
                    <div className="space-y-1">
                      <p className="text-white font-bold">Drag and drop your resume PDF here</p>
                      <p className="text-[10px] text-zinc-500">or click to browse local storage</p>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-950/30 border border-red-500/30 rounded p-3 text-red-400 flex items-center gap-2 text-[10px]">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                      <span>{error}</span>
                    </div>
                  )}

                  {selectedFile && (
                    <div className="bg-zinc-900/60 border border-zinc-800 rounded p-3 flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <File className="h-4 w-4 shrink-0 text-zinc-400" />
                        <div className="overflow-hidden">
                          <p className="text-white font-bold truncate">{selectedFile.name}</p>
                          <p className="text-zinc-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-zinc-500 hover:text-white"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 border border-zinc-800 text-[10px] font-bold text-zinc-400 hover:text-white rounded transition-colors"
                    >
                      ABORT
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={!selectedFile}
                      className={cn(
                        "px-4 py-2 text-[10px] font-bold text-black rounded transition-colors uppercase tracking-widest",
                        selectedFile
                          ? themeMode === "volt" 
                            ? "bg-[#CCFF00] hover:bg-[#8dfa00]"
                            : themeMode === "amber"
                              ? "bg-[#FFDE21] hover:bg-yellow-400"
                              : "bg-sky-400 hover:bg-sky-500"
                          : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      )}
                    >
                      UPLOAD
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center gap-4">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                    {uploadProgress === 100 ? "VERIFYING SIGNATURE..." : "STREAMING RESUME DATA..."}
                  </span>
                  <div className="w-full max-w-xs bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        themeMode === "volt" && "bg-[#CCFF00]",
                        themeMode === "amber" && "bg-[#FFDE21]",
                        themeMode === "chrome" && "bg-sky-400"
                      )}
                      initial={{ width: "0%" }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>
                  {uploadProgress === 100 && (
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                      <CheckCircle className="h-4 w-4 animate-bounce" />
                      <span>UPLOAD COMPLETE</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
