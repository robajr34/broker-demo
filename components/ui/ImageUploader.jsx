"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Star, ArrowLeft, ArrowRight, Image as ImageIcon, AlertCircle } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

export default function ImageUploader({
  images = [],
  primaryImage = "",
  onChange,
  maxFiles = 10,
  maxSizeMb = 5,
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
}) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(null);
  const inputRef = useRef(null);

  const handleFiles = (filesList) => {
    setError("");
    const newFiles = Array.from(filesList);

    if (images.length + newFiles.length > maxFiles) {
      setError(`Maximum of ${maxFiles} images allowed per listing.`);
      return;
    }

    const validUrls = [];
    for (const file of newFiles) {
      if (!allowedTypes.includes(file.type)) {
        setError(`Invalid file type "${file.name}". Please upload JPG, PNG, or WEBP.`);
        return;
      }
      if (file.size > maxSizeMb * 1024 * 1024) {
        setError(`"${file.name}" exceeds maximum allowed size of ${maxSizeMb}MB.`);
        return;
      }

      // Create preview object URL
      const objUrl = URL.createObjectURL(file);
      validUrls.push(objUrl);
    }

    // Simulate quick professional upload progress
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setUploadProgress(null), 400);

          const updatedImages = [...images, ...validUrls];
          const newPrimary = primaryImage || updatedImages[0];
          onChange?.({
            images: updatedImages,
            primaryImage: newPrimary,
          });
          return 100;
        }
        return prev + 30;
      });
    }, 120);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (indexToRemove) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    let newPrimary = primaryImage;
    if (primaryImage === images[indexToRemove]) {
      newPrimary = updated[0] || "";
    }
    onChange?.({
      images: updated,
      primaryImage: newPrimary,
    });
  };

  const setCover = (url) => {
    onChange?.({
      images,
      primaryImage: url,
    });
  };

  const moveImage = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const reordered = [...images];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange?.({
      images: reordered,
      primaryImage,
    });
  };

  // Add sample placeholder image directly if needed for quick demo
  const addSampleImage = (url) => {
    if (images.includes(url)) return;
    const updated = [...images, url];
    onChange?.({
      images: updated,
      primaryImage: primaryImage || updated[0],
    });
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Box */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 text-center ${
          dragActive
            ? "border-amber-500 bg-amber-50/50"
            : "border-slate-300 hover:border-amber-400 bg-slate-50/60 hover:bg-white"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />

        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 shadow-inner">
          <UploadCloud className="w-6 h-6" />
        </div>

        <p className="text-sm font-semibold text-slate-800">
          Drag & drop photos here, or{" "}
          <span className="text-amber-600 underline underline-offset-2">browse files</span>
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Supports JPG, PNG, WEBP up to {maxSizeMb}MB each. ({images.length}/{maxFiles} uploaded)
        </p>

        {uploadProgress !== null && (
          <div className="w-full max-w-xs mt-4">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Uploading & optimizing...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Error display */}
      {error && (
        <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Thumbnails Grid & Manager */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Listing Gallery ({images.length} photos)
            </span>
            <span className="text-xs text-slate-500">
              Click star to assign primary cover
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((imgUrl, index) => {
              const isCover = primaryImage === imgUrl || (!primaryImage && index === 0);

              return (
                <div
                  key={imgUrl + index}
                  className={`group relative rounded-xl overflow-hidden border bg-white shadow-sm transition-all duration-200 aspect-[4/3] ${
                    isCover
                      ? "ring-2 ring-amber-500 border-amber-500 shadow-amber-500/10"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Listing photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Badges */}
                  {isCover && (
                    <div className="absolute top-2 left-2 z-10">
                      <Badge variant="featured" size="sm">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-1" />
                        Cover
                      </Badge>
                    </div>
                  )}

                  {/* Action Overlays */}
                  <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCover(imgUrl);
                        }}
                        title="Set as Cover"
                        className={`p-1.5 rounded-lg text-white transition-colors ${
                          isCover ? "bg-amber-500" : "bg-black/50 hover:bg-amber-500"
                        }`}
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        title="Remove photo"
                        className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Reorder buttons */}
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(index, -1);
                        }}
                        title="Move left"
                        className="p-1 rounded-md bg-white/80 hover:bg-white text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        disabled={index === images.length - 1}
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(index, 1);
                        }}
                        title="Move right"
                        className="p-1 rounded-md bg-white/80 hover:bg-white text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

