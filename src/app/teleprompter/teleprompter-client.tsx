'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { type FFmpeg } from '@ffmpeg/ffmpeg';
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

export default function TeleprompterClient() {
  // Script and settings state
  const [text, setText] = useState(
    'Paste your script here. The teleprompter will scroll this text. You can adjust the speed and font size from the settings panel. To start or stop scrolling, press the Play/Pause button or use the Spacebar. To reset to the top, press the Reset button or use the Escape key. You can also enable your camera to record yourself while reading the script. The recording will be converted to MP4 format for you to download.'
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
  const [isConverting, setIsConverting] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Refs for DOM elements and other instances
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const ffmpegRef = useRef<{ ffmpeg: FFmpeg } | null>(null);

  // --- FFmpeg Functions ---
  const loadFFmpeg = useCallback(async () => {
    if (ffmpegRef.current) return ffmpegRef.current.ffmpeg;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { createFFmpeg } = await import('@ffmpeg/ffmpeg');
    const ffmpeg = createFFmpeg({ log: false });
    await ffmpeg.load();
    ffmpegRef.current = { ffmpeg };
    return ffmpeg;
  }, []);

  const convertWebMtoMP4 = useCallback(
    async (webmBlob: Blob) => {
      setIsConverting(true);
      try {
        const ffmpeg = await loadFFmpeg();
        const inputName = 'input.webm';
        const outputName = 'output.mp4';
        ffmpeg.FS(
          'writeFile',
          inputName,
          new Uint8Array(await webmBlob.arrayBuffer())
        );
        await ffmpeg.run(
          '-i',
          inputName,
          '-c:v',
          'copy',
          '-c:a',
          'aac',
          outputName
        );
        const data = ffmpeg.FS('readFile', outputName);
        const mp4Blob = new Blob([data.buffer], { type: 'video/mp4' });
        setRecordedVideoUrl(URL.createObjectURL(mp4Blob));
        ffmpeg.FS('unlink', inputName);
        ffmpeg.FS('unlink', outputName);
      } catch (e) {
        console.error('Error converting video:', e);
        alert(
          'Failed to convert video to MP4. You can still download the WebM.'
        );
        setRecordedVideoUrl(URL.createObjectURL(webmBlob)); // Fallback to WebM
      } finally {
        setIsConverting(false);
      }
    },
    [loadFFmpeg]
  );

  // --- Recording Logic ---
  const startRecording = useCallback(async () => {
    if (!videoRef.current?.srcObject) {
      setCameraError('Camera is not active. Cannot start recording.');
      return;
    }
    try {
      recordedChunksRef.current = [];
      const stream = videoRef.current.srcObject as MediaStream;
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: 'video/webm',
        });
        if (blob.size > 0) {
          convertWebMtoMP4(blob);
        }
        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);
      setCameraError(null);
    } catch (err) {
      setCameraError(`Recording failed: ${(err as Error).message}`);
    }
  }, [convertWebMtoMP4]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
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
        containerRef.current.scrollTop += (speed * deltaTime) / 14;

        if (
          containerRef.current.scrollTop >=
          containerRef.current.scrollHeight - containerRef.current.clientHeight
        ) {
          setIsPlaying(false);
        } else {
          animationRef.current = requestAnimationFrame(animateScroll);
        }
      }
    },
    [speed, setIsPlaying]
  );

  const toggleScrolling = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    if (isRecording) {
      stopRecording();
    }
  }, [isRecording, stopRecording]);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animateScroll);
      if (showCamera && !isRecording) {
        startRecording();
      }
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (isRecording) {
        stopRecording();
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    isPlaying,
    animateScroll,
    showCamera,
    isRecording,
    startRecording,
    stopRecording,
  ]);

  // --- Event Handlers & Effects ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        toggleScrolling();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleScrolling, reset]);

  const toggleCamera = useCallback(async () => {
    if (showCamera) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setShowCamera(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setShowCamera(true);
        setCameraError(null);
      } catch (err) {
        setCameraError(
          `Failed to access camera: ${(err as Error).message}. Please grant camera permissions.`
        );
      }
    }
  }, [showCamera]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-4">
        <header className="relative text-center mb-6">
          <Link
            href="/"
            className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center space-x-2 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-4xl font-bold">Teleprompter</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your personal script assistant for flawless delivery.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {cameraError && (
              <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 border border-red-200">
                {cameraError}
              </div>
            )}
            <div
              className={`relative h-[60vh] rounded-lg overflow-hidden shadow-lg ${mirror ? 'mirror' : ''}`}
              style={{
                backgroundColor: !showCamera
                  ? 'rgba(31, 41, 55, 0.8)'
                  : 'transparent',
                backdropFilter: !showCamera ? 'blur(10px)' : 'none',
              }}
            >
              {showCamera && (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="absolute top-0 left-0 w-full h-full object-cover"
                ></video>
              )}
              <div
                ref={containerRef}
                className="absolute top-0 left-0 w-full h-full overflow-y-scroll p-10 text-white pt-[35%]"
                style={{
                  fontSize: `${fontSize}rem`,
                  lineHeight: '1.5',
                  backgroundColor: showCamera
                    ? 'rgba(0, 0, 0, 0.5)'
                    : 'transparent',
                }}
              >
                {text}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={toggleScrolling}
                className="flex items-center space-x-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={reset}
                className="flex items-center space-x-2 rounded-lg bg-gray-500 px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                <RotateCcw className="h-6 w-6" />
                <span>Reset</span>
              </button>

              <button
                onClick={toggleCamera}
                className={`flex items-center space-x-2 rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95 ${showCamera ? 'bg-red-500' : 'bg-green-500'}`}
              >
                <Camera className="h-6 w-6" />
                <span>{showCamera ? 'Cam Off' : 'Cam On'}</span>
              </button>

              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2 rounded-lg bg-purple-500 px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </button>
            </div>

            {isConverting && (
              <div className="mt-4 text-center text-lg font-semibold text-blue-500">
                Converting video to MP4, please wait...
              </div>
            )}

            {recordedVideoUrl && (
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold mb-2">Your Recording:</h3>
                <video
                  src={recordedVideoUrl}
                  controls
                  className="w-full rounded-lg shadow-lg"
                ></video>
                <a
                  href={recordedVideoUrl}
                  download="teleprompter-recording.mp4"
                  className="mt-4 inline-block rounded-lg bg-green-500 px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105"
                >
                  Download MP4
                </a>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-4">Script</h2>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              className="h-96 w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Paste your script here..."
            ></textarea>

            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-4">
                    Settings
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
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
          </div>
        </div>
      </div>

      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              Welcome to Teleprompter
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
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
              className="w-full mt-4 py-2 px-4 font-semibold text-white rounded-md bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-400 transition-colors text-lg"
            >
              Get Started
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        .mirror {
          transform: scaleX(-1);
        }
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
  );
}
