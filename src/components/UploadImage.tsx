"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createImage } from "@/actions/image";

interface ImageUploadFormProps {
  caseId: number;
}

export default function ImageUploadForm({ caseId }: ImageUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setIsUploading(true);

    try {
      const result = await createImage({ name: file.name, caseId: caseId });
      if (!result) {
        toast.error("Something went wrong");
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", result.id.toString());

      await axios.post(`http://4.213.138.110:5000/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Upload Image</Label>
        <Input type="file" accept="*" onChange={handleFileChange} />
      </div>

      <Button type="submit" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Image"}
      </Button>
    </form>
  );
}
