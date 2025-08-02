'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
// WebM format is used for all video recording
import {
  ArrowLeft,
  Camera,
  Pause,
  Play,
  RotateCcw,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Teleprompter() {
  // Script and settings state
  const [text, setText] = useState(
    'Paste your script here. The teleprompter will scroll this text. You can adjust the speed and font size from the settings panel. To start or stop scrolling, press the Play/Pause button or use the Spacebar. To reset to the top, press the Reset button or use the Escape key. You can also enable your camera to record yourself while reading the script. The recording will be saved in WebM format.'
  );
  const [speed, setSpeed] = useState(0.5);
  const [fontSize, setFontSize] = useState(2.5);
  const [mirror, setMirror] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);

  // Camera and recording state
  const [showCamera, setShowCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Refs for DOM elements and other instances
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  // --- Recording Functions ---
  const handleRecordedData = useCallback((blob: Blob) => {
    const videoUrl = URL.createObjectURL(blob);
    setRecordedVideoUrl(videoUrl);
    setIsPlaying(true);
  }, []);

  // Clean up function for the effect
  useEffect(() => {
    return () => {
      if (recordedVideoUrl) {
        URL.revokeObjectURL(recordedVideoUrl);
      }
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach(track => track.stop());
      }
    };
  }, [recordedVideoUrl]);

  // Clean up recorded chunks when recording starts
  const clearRecordedChunks = useCallback(() => {
    recordedChunksRef.current = [];
  }, []);

  // Handle recording data available
  const handleDataAvailable = useCallback((event: BlobEvent) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
    }
  }, []);

  // Handle recording stop
  const handleStop = useCallback(() => {
    if (recordedChunksRef.current.length > 0) {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      handleRecordedData(blob);
    }
    setIsRecording(false);
  }, [handleRecordedData]);

  // These aliases will be defined after the functions they reference to avoid circular dependencies

  // --- Recording Logic ---
  const startRecording = useCallback(
    async (stream: MediaStream) => {
      if (!stream || stream.getVideoTracks().length === 0) {
        setCameraError('No active video stream available for recording.');
        return;
      }

      try {
        clearRecordedChunks();

        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm';

        const recorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = handleDataAvailable;
        recorder.onstop = handleStop;
        recorder.start(100); // Request data every 100ms

        setIsRecording(true);
        setCameraError(null);
      } catch (err) {
        const error = err as Error;
        setCameraError(`Failed to start recording: ${error.message}`);
        console.error('Recording error:', error);
      }
    },
    [clearRecordedChunks, handleDataAvailable, handleStop]
  );

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop();
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach(track => track.stop());
      }
    }
    setIsRecording(false);
  }, []);

  // --- Scrolling Logic ---
  const animateScroll = useCallback(
    (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (containerRef.current) {
        containerRef.current.scrollTop += (speed * deltaTime) / 10;
      }
      animationRef.current = requestAnimationFrame(animateScroll);
    },
    [speed]
  );

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const handleToggleCamera =
    useCallback(async (): Promise<MediaStream | null> => {
      try {
        if (showCamera) {
          // If camera is on, turn it off
          if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
          }
          setShowCamera(false);
          setIsRecording(false);
          return null;
        } else {
          // If camera is off, turn it on
          const constraints = {
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              facingMode: 'user',
            },
            audio: false,
          };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);

          if (!stream.active) {
            throw new Error('Camera stream is not active after initialization');
          }

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Wait for the video to be ready
            await new Promise(resolve => {
              if (videoRef.current) {
                videoRef.current.onloadedmetadata = () => resolve(true);
              }
            });
          }

          setShowCamera(true);
          setCameraError(null);
          return stream;
        }
      } catch (err) {
        const error = err as Error;
        const errorMsg =
          error.name === 'NotAllowedError'
            ? 'Camera access was denied. Please allow camera access to use this feature.'
            : error.message;

        setCameraError(`Failed to access camera: ${errorMsg}`);
        setShowCamera(false);
        return null;
      }
    }, [showCamera]);

  // Define aliases after all functions are defined to avoid circular dependencies
  const reset = handleReset;
  const toggleCamera = handleToggleCamera;

  const handleStartStop = useCallback(async () => {
    if (isPlaying) {
      // Stop recording if active
      if (isRecording) {
        try {
          await stopRecording();
        } catch (err) {
          console.error('Error stopping recording:', err);
          setCameraError('Error stopping recording. Please try again.');
        }
      }
      setIsPlaying(false);
    } else {
      try {
        setIsPlaying(true);

        // Get or initialize camera stream
        let stream: MediaStream | null = videoRef.current
          ?.srcObject as MediaStream;
        if (!stream || !stream.active) {
          stream = await handleToggleCamera();
          if (!stream) throw new Error('Could not access camera');
        }

        // Verify stream is active before starting recording
        if (stream && stream.active) {
          await startRecording(stream);
          setCameraError(null);
        } else {
          throw new Error('Camera stream is not active');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error occurred';
        setCameraError(
          `Failed to start: ${errorMessage}. Please check camera permissions.`
        );
        setIsPlaying(false);
      }
    }
  }, [isPlaying, isRecording, stopRecording, startRecording, toggleCamera]);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animateScroll);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animateScroll]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        void handleStartStop();
      } else if (e.key === 'Escape') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleStartStop, handleReset]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-center flex-1">
            Teleprompter
          </h1>
          <div className="w-32"></div> {/* Spacer */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Script Editor */}
          <div className="lg:col-span-1">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              className="w-full h-96 p-4 border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste your script here..."
            />
          </div>

          {/* Teleprompter Display */}
          <div className="lg:col-span-2 relative">
            <div className="relative w-full h-[70vh] overflow-hidden rounded-lg border-2 border-gray-300 dark:border-gray-700">
              {/* Video Background */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                {showCamera && !isPlaying && videoRef.current?.srcObject && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                )}
                {recordedVideoUrl && isPlaying && (
                  <video
                    src={recordedVideoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onEnded={() => setIsPlaying(false)}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Text Container */}
              <div
                ref={containerRef}
                className={`relative h-full p-6 text-center transition-all duration-300 ${mirror ? 'mirror' : ''}`}
                style={{
                  fontSize: `${fontSize}rem`,
                  lineHeight: 1.5,
                  backgroundColor:
                    showCamera || isPlaying
                      ? 'rgba(0, 0, 0, 0.7)'
                      : 'rgba(0, 0, 0, 0.85)',
                  color: 'white',
                  textShadow: '0 0 10px rgba(0,0,0,0.8)',
                  position: 'relative',
                  zIndex: 1,
                  overflowY: 'auto',
                  height: '100%',
                }}
              >
                <div className="whitespace-pre-wrap">{text}</div>
              </div>

              {cameraError && (
                <div className="absolute bottom-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md z-20">
                  <p>{cameraError}</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="mt-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-md">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center space-x-6">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => void handleStartStop()}
                      className="p-4 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                    </button>
                    <span className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {isPlaying ? 'Pause' : 'Play'} (Space)
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleReset}
                      className="p-4 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
                      title="Reset to Top"
                    >
                      <RotateCcw size={28} />
                    </button>
                    <span className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      Reset (Esc)
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleToggleCamera}
                      className={`p-4 rounded-full ${
                        showCamera
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        showCamera
                          ? 'focus:ring-red-500'
                          : 'focus:ring-gray-400'
                      } transition-colors`}
                      title={showCamera ? 'Off Camera' : 'On Camera'}
                    >
                      <Camera size={28} />
                    </button>
                    <span className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {showCamera ? 'Off Camera' : 'On Camera'}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="p-4 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
                      title="Settings"
                    >
                      <Settings size={28} />
                    </button>
                    <span className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recorded Video Modal */}
        <Dialog
          open={recordedVideoUrl !== null}
          onOpenChange={open => !open && setRecordedVideoUrl(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Recording Ready for Download</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {recordedVideoUrl && (
                <div className="space-y-4">
                  <video
                    src={recordedVideoUrl ?? undefined}
                    controls
                    className="w-full rounded-md"
                  />
                  <a
                    href={recordedVideoUrl ?? undefined}
                    download={`recording-${new Date().toISOString().split('.')[0]}.webm`}
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Download WebM Video
                  </a>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Settings Modal */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Speed: {speed.toFixed(1)}x
                </label>
                <Slider
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={[speed]}
                  onValueChange={([value]) => setSpeed(value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Font Size: {fontSize}rem
                </label>
                <Slider
                  min={1}
                  max={5}
                  step={0.1}
                  value={[fontSize]}
                  onValueChange={([value]) => setFontSize(value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="mirror"
                  checked={mirror}
                  onChange={e => setMirror(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="mirror"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mirror Text (for camera teleprompters)
                </label>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Welcome Modal */}
        <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Welcome to Teleprompter</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Use this teleprompter to read your scripts smoothly during
                recordings or presentations.
              </p>
              <div className="space-y-2">
                <p className="font-medium text-gray-900 dark:text-white">
                  Keyboard Shortcuts:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                      Space
                    </kbd>{' '}
                    Play/Pause
                  </li>
                  <li>
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                      Esc
                    </kbd>{' '}
                    Reset to top
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="w-full mt-4 py-2 px-4 font-semibold text-white rounded-md bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-400 text-lg"
              >
                Get Started
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <style jsx global>{`
          .mirror * {
            transform: scaleX(-1);
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }

          /* For Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
          }
        `}</style>
      </div>
    </div>
  );
}
