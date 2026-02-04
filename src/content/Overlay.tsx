import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X } from "lucide-react";

interface Selection {
    x: number;
    y: number;
    width: number;
    height: number;
}

const Overlay = () => {
    const [visible, setVisible] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selection, setSelection] = useState<Selection | null>(null);
    const [analysisState, setAnalysisState] = useState<'idle' | 'loading' | 'complete' | 'error'>('idle');
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const startPos = useRef<{ x: number, y: number } | null>(null);

    // Communicate with Background/Popup
    useEffect(() => {
        // Listen for Chrome messages
        const handleMessage = (message: any, sender: any, sendResponse: any) => {
            if (message.type === 'SHOW_OVERLAY') {
                console.log('Overlay: Received SHOW_OVERLAY message');
                setVisible(true);
                setSelection(null);
                setAnalysisState('idle');
                setAnalysisResult('');
            }
        };

        // Also listen for custom window events (backup mechanism)
        const handleCustomEvent = () => {
            console.log('Overlay: Received custom show event');
            setVisible(true);
            setSelection(null);
            setAnalysisState('idle');
            setAnalysisResult('');
        };

        chrome.runtime.onMessage.addListener(handleMessage);
        window.addEventListener('snaplearn:show-overlay', handleCustomEvent);

        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage);
            window.removeEventListener('snaplearn:show-overlay', handleCustomEvent);
        };
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!visible || selection) return;
        setIsSelecting(true);
        startPos.current = { x: e.clientX, y: e.clientY };
        setSelection({ x: e.clientX, y: e.clientY, width: 0, height: 0 });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isSelecting || !startPos.current) return;

        const currentX = e.clientX;
        const currentY = e.clientY;

        const startX = startPos.current.x;
        const startY = startPos.current.y;

        const x = Math.min(startX, currentX);
        const y = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);

        setSelection({ x, y, width, height });
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        startPos.current = null;
    };

    const handleCancel = () => {
        setVisible(false);
        setSelection(null);
        setAnalysisState('idle');
    };

    const handleCapture = async () => {
        if (!selection) return;

        // Hide overlay momentarily to capture clean screenshot
        setVisible(false);

        // Request background script to capture visible tab
        try {
            // We need to wait a tiny bit for the overlay to disappear from DOM painting
            await new Promise(resolve => setTimeout(resolve, 50));

            chrome.runtime.sendMessage({
                type: 'CAPTURE_AREA',
                area: selection,
                devicePixelRatio: window.devicePixelRatio
            }, async (response) => {
                if (response?.dataUrl) {
                    // Crop the image here in content script
                    const image = new Image();
                    image.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        if (!ctx) return;

                        // Calculate actual pixel dimensions based on DPR
                        const dpr = window.devicePixelRatio;
                        const sX = selection.x * dpr;
                        const sY = selection.y * dpr;
                        const sW = selection.width * dpr;
                        const sH = selection.height * dpr;

                        canvas.width = sW;
                        canvas.height = sH;

                        ctx.drawImage(image, sX, sY, sW, sH, 0, 0, sW, sH);

                        const croppedDataUrl = canvas.toDataURL('image/png');

                        // Show Analyzing State
                        setAnalysisState('loading');
                        setVisible(true); // Keep overlay visible but show distinct UI

                        // Send to backend
                        chrome.storage?.sync.get(['language', 'mode', 'access_token'], async (settings) => {
                            try {
                                const response = await fetch('http://127.0.0.1:8000/api/v1/analyze/', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        // 'Authorization': `Bearer ${settings.access_token}` 
                                    },
                                    body: JSON.stringify({
                                        image: croppedDataUrl,
                                        language: settings.language || 'English',
                                        mode: settings.mode || 'fast'
                                    })
                                });

                                if (!response.ok) throw new Error('Analysis failed');

                                const data = await response.json();
                                setAnalysisResult(data.answer);
                                setAnalysisState('complete');
                            } catch (error) {
                                console.error("Analysis Error", error);
                                setAnalysisState('error');
                            }
                        });
                    };
                    image.src = response.dataUrl;
                }
            });
        } catch (err) {
            console.error("Capture failed:", err);
            setVisible(true);
        }
    };

    if (!visible) return null;

    return (
        <div
            style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                zIndex: 9999999, cursor: isSelecting ? 'crosshair' : 'default', userSelect: 'none',
                pointerEvents: 'auto', fontFamily: 'sans-serif'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Initial Selection Mode UI */}
            {!selection && analysisState === 'idle' && (
                <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.8)', padding: '10px 20px', borderRadius: 8, color: 'white', fontFamily: 'sans-serif' }}>
                    Drag to select an area
                </div>
            )}

            {/* Analysis Loading/Result UI */}
            {analysisState !== 'idle' && (
                <div
                    style={{
                        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        background: 'white', padding: 20, borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        width: 400, maxWidth: '90vw', color: 'black', zIndex: 10000000
                    }}
                    onMouseDown={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">AI Analysis</h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setVisible(false);
                                setSelection(null);
                                setAnalysisState('idle');
                            }}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {analysisState === 'loading' && (
                        <div className="flex flex-col items-center py-8">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-muted-foreground">Analyzing Screenshot...</p>
                        </div>
                    )}

                    {analysisState === 'complete' && (
                        <div className="max-h-[60vh] overflow-y-auto">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{analysisResult}</p>
                        </div>
                    )}

                    {analysisState === 'error' && (
                        <div className="text-red-500 text-center">
                            Failed to analyze image. Please try again.
                        </div>
                    )}
                </div>
            )}


            {/* Dimmed Background with Hole (Only in idle/selection mode) */}
            {analysisState === 'idle' && (
                <>
                    <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                        clipPath: selection ? `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, 
                        ${selection.x}px ${selection.y}px, 
                        ${selection.x + selection.width}px ${selection.y}px, 
                        ${selection.x + selection.width}px ${selection.y + selection.height}px, 
                        ${selection.x}px ${selection.y + selection.height}px, 
                        ${selection.x}px ${selection.y}px)` : 'none'
                    }} />

                    {/* Selection Border */}
                    {selection && (
                        <div style={{
                            position: 'absolute',
                            left: selection.x,
                            top: selection.y,
                            width: selection.width,
                            height: selection.height,
                            border: '2px dashed #00ff00',
                            boxShadow: '0 0 0 1px rgba(255,255,255,0.5)'
                        }}>
                            {/* Action Bar */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 flex gap-2" onMouseDown={e => e.stopPropagation()}>
                                <Button size="sm" onClick={handleCapture} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                                    <Check className="w-4 h-4 mr-1" /> Capture
                                </Button>
                                <Button size="sm" variant="secondary" onClick={handleCancel} className="shadow-lg">
                                    <X className="w-4 h-4 mr-1" /> Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Overlay;
