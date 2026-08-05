'use client';

import { useState, useRef } from 'react';
import { storage } from '@/lib/firebase/client';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { UploadCloud, X, Check, Copy, Trash2, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  currentImageUrl?: string;
  folder?: string;
}

export default function ImageUploader({ onUploadSuccess, currentImageUrl, folder = 'general' }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState(currentImageUrl || '');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Only JPG, PNG, and WEBP are allowed.');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Maximum size is 5MB.');
      return;
    }

    uploadFile(file);
  };

  const uploadFile = (file: File) => {
    setIsUploading(true);
    setError('');
    
    // Create a unique filename
    const filename = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `uploads/${folder}/${filename}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (err) => {
        console.error('Upload failed:', err);
        setError('Upload failed. Please try again.');
        setIsUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          onUploadSuccess(downloadURL);
          setIsUploading(false);
          setProgress(0);
        } catch (err) {
          setError('Failed to get download URL.');
          setIsUploading(false);
        }
      }
    );
  };

  const copyToClipboard = async () => {
    if (!imageUrl) return;
    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDelete = () => {
    // In a real app, you might want to delete from Firebase Storage here too.
    // We'll just clear it from the UI for simplicity in this component.
    setImageUrl('');
    onUploadSuccess('');
  };

  return (
    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50 relative">
      {imageUrl ? (
        <div className="flex flex-col items-center">
          <div className="relative w-full h-48 mb-4 bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
            {/* Using standard img tag here because this is user-uploaded content and might not be configured in Next.js config yet */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Uploaded" className="max-h-full max-w-full object-contain" />
          </div>
          
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 bg-white border border-slate-200 rounded text-xs px-2 py-2 truncate text-slate-500">
              {imageUrl}
            </div>
            <button 
              onClick={copyToClipboard}
              className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition"
              title="Copy URL"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded transition"
              title="Remove Image"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="flex flex-col items-center justify-center text-center py-6 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="w-12 h-12 text-slate-400 mb-3" />
          <p className="font-medium text-slate-700 mb-1">Click to upload an image</p>
          <p className="text-xs text-slate-500">JPG, PNG or WEBP (Max 5MB)</p>
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-xl p-6 backdrop-blur-sm">
          <p className="text-sm font-medium text-slate-700 mb-2">Uploading... {Math.round(progress)}%</p>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          {error}
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/jpeg,image/png,image/webp"
      />
    </div>
  );
}
