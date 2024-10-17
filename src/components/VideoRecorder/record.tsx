"use client";
import React, { useState, useRef } from "react";

const VideoRecorder: React.FC<{
  onClose: () => void; 
}> = ({ onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const chunks: Blob[] = [];
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const recorder = new MediaRecorder(mediaStream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the camera and microphone: ", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const resetRecording = () => {
    setVideoURL(null);
    setIsRecording(false);
    setStream(null);
    setMediaRecorder(null);
  };

  const postVideo = () => {
    const confirmPost = window.confirm("Are you sure you want to post this video?");
    if (confirmPost) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onClose(); 
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-gray-200">
      <div className="relative w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {isRecording && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full animate-pulse glow-effect m-2" />
        )}
        <video
          ref={videoRef}
          className="w-full h-64 rounded-lg border border-gray-700"
          autoPlay
          playsInline
          muted
          style={{ display: isRecording ? "block" : "none" }}
        />
        {!isRecording && !videoURL && (
          <div className="flex items-center justify-center w-[350px] h-64 bg-gray-700 rounded-lg">
            <p className="text-gray-300">Click "Start Recording" to begin</p>
          </div>
        )}
      </div>

      <div className="flex space-x-4 mt-4 ">
        {!isRecording && !videoURL && (
          <button
            onClick={startRecording}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Start Recording
          </button>
        )}
        {isRecording && (
          <button
            onClick={stopRecording}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Stop Recording
          </button>
        )}
      </div>

      {videoURL && (
        <div className="mt-4 w-[350px] h-64">
          <video
            src={videoURL}
            controls
            className="w-full mt-2 rounded-lg border border-gray-700 shadow-lg"
          />
        </div>
      )}

      {videoURL && (
        <div className="flex space-x-4 mt-6">
        <button
  onClick={resetRecording}
  className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 mt-6"
>
  Reset
</button>
<button
  onClick={postVideo}
  className={`bg-blue-600 hover:bg-blue-500 text-white font-semibold mt-6 py-2 px-6 rounded-lg shadow-lg transition duration-300 ${
    isProcessing ? "opacity-50 cursor-not-allowed" : ""
  }`}
  disabled={isProcessing}
>
  {isProcessing ? "Posting..." : "Post"}
</button>


        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
