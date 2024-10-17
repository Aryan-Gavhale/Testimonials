'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Video, PenLine, Star, X } from "lucide-react";
import { TestimonialSpace } from '@prisma/client';
import VideoRecorder from "@/components/VideoRecorder/record"; // Import the VideoRecorder component

export default function Component({ id }: { id: string }) {
  const [space, setSpace] = useState<TestimonialSpace | null>(null);
  const [noOfStars, setNoOfStars] = useState(0);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [isRecordingOpen, setIsRecordingOpen] = useState(false); // Track dialog open state

  const TestimonialSpaceId = id;

  async function fetchSpace() {
    const response = await fetch(`/api/space/${TestimonialSpaceId}`);
    const data = await response.json();
    setSpace(data);
  }

  async function handleSubmit() {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        noOfStars: noOfStars,
        content: content,
        name: name,
        email: email,
        TestimonialSpaceId: TestimonialSpaceId,
        videoURL: videoURL // Add the video URL to the submission
      })
    });

    if (response.ok) {
      console.log("Feedback submitted successfully");
      // Reset states after submission
      setNoOfStars(0);
      setContent("");
      setName("");
      setEmail("");
      setVideoURL(null);
    } else {
      console.log("Something went wrong");
    }
  }

  const handleVideoRecorded = (url: string | null) => {
    setVideoURL(url); // Update video URL
    setIsRecordingOpen(false); // Close the recording dialog
  };

  useEffect(() => {
    fetchSpace();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      {isRecordingOpen ? (
        // Only show the VideoRecorder when recording is open
        <VideoRecorder
          onVideoRecorded={handleVideoRecorded}
          onClose={() => setIsRecordingOpen(false)}
        />
      ) : (
        <Card className="w-full max-w-md space-y-8 p-8 bg-gray-800 text-white">
          <div className="flex justify-center">
            <Image
              src=""
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{space?.spaceName}</h1>
            <p className="text-gray-400">{space?.customMessage}</p>
          </div>
          <div className="space-y-4">
            <div className="border-b border-gray-700 pb-2">
              <h2 className="text-lg font-semibold text-blue-400">QUESTION</h2>
              <p className="text-gray-400">{space?.questions}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsRecordingOpen(true)} // Open the recording component
            >
              <Video className="mr-2 h-4 w-4" />
              Record a video
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1 bg-transparent text-white border-white hover:bg-gray-700">
                  <PenLine className="mr-2 h-4 w-4" />
                  Send in text
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
                <DialogHeader className="flex justify-between items-start">
                  <div>
                    <DialogTitle>Write text testimonial to</DialogTitle>
                    <Image
                      src="/placeholder.svg"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="rounded-full mt-2"
                    />
                  </div>
                  <Button variant="ghost" className="p-1 text-white hover:bg-gray-700">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <h3 className="font-semibold mb-2">Question</h3>
                    <div className="h-1 w-12 bg-blue-600"></div>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer ${star <= noOfStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                        onClick={() => setNoOfStars(star)}
                      />
                    ))}
                  </div>
                  <Textarea
                    placeholder="Your thoughts"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="resize-none"
                  />
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="checkbox" />
                    <Label htmlFor="checkbox" className="text-sm">
                      Agree to terms
                    </Label>
                  </div>
                </div>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      )}
    </div>
  );
}
