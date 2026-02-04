import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X, Copy, Download, Share2, Globe, ChevronDown, Zap, Brain, Rocket, RotateCcw } from "lucide-react";
import SupersideLogo from '@/components/SupersideLogo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

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
    const [panelWidth, setPanelWidth] = useState(450);
    const [isResizing, setIsResizing] = useState(false);
    const [isGuest, setIsGuest] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const [currentMode, setCurrentMode] = useState<'fast' | 'think'>('fast');
    const [showModes, setShowModes] = useState(false);
    const startPos = useRef<{ x: number, y: number } | null>(null);
    const resizerRef = useRef<HTMLDivElement>(null);

    // Communicate with Background/Popup
    useEffect(() => {
        // Listen for Chrome messages
        const handleMessage = (message: any) => {
            if (message.type === 'SHOW_OVERLAY') {
                setVisible(true);
                setSelection(null);
                setAnalysisState('idle');
                setAnalysisResult('');
            }
        };

        // Also listen for custom window events (backup mechanism)
        const handleCustomEvent = () => {
            setVisible(true);
            setSelection(null);
            setAnalysisState('idle');
            setAnalysisResult('');
        };

        chrome.storage?.sync.get(['language', 'mode'], (settings) => {
            if (settings.language) setCurrentLanguage(settings.language);
            if (settings.mode) setCurrentMode(settings.mode as 'fast' | 'think');
        });

        chrome.runtime.onMessage.addListener(handleMessage);
        window.addEventListener('snaplearn:show-overlay', handleCustomEvent);

        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage);
            window.removeEventListener('snaplearn:show-overlay', handleCustomEvent);
        };
    }, []);

    // Resizing logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            const newWidth = window.innerWidth - e.clientX;
            if (newWidth > 300 && newWidth < 800) {
                setPanelWidth(newWidth);
            }
        };

        const handleMouseUp = () => setIsResizing(false);

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!visible || selection || analysisState !== 'idle') return;
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
                        let sW = selection.width * dpr;
                        let sH = selection.height * dpr;

                        // OPTIMIZATION: Limits max dimension to 1500px to speed up upload/AI
                        const MAX_DIM = 1500;
                        if (sW > MAX_DIM || sH > MAX_DIM) {
                            const ratio = Math.min(MAX_DIM / sW, MAX_DIM / sH);
                            sW = sW * ratio;
                            sH = sH * ratio;
                        }

                        canvas.width = sW;
                        canvas.height = sH;

                        // Use actual image source dimensions for drawing
                        const sourceX = selection.x * dpr;
                        const sourceY = selection.y * dpr;
                        const sourceW = selection.width * dpr;
                        const sourceH = selection.height * dpr;

                        ctx.drawImage(image, sourceX, sourceY, sourceW, sourceH, 0, 0, sW, sH);

                        // OPTIMIZATION: Use JPEG instead of PNG for 80% smaller size
                        const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.8);

                        // Show Analyzing State
                        setAnalysisState('loading');
                        setCapturedImage(croppedDataUrl);
                        setVisible(true);

                        // Send to backend
                        chrome.storage?.sync.get(['language', 'mode', 'access_token'], async (settings) => {
                            try {
                                const headers: any = { 'Content-Type': 'application/json' };
                                if (settings.access_token) {
                                    headers['Authorization'] = `Bearer ${settings.access_token}`;
                                }

                                const res = await fetch('http://127.0.0.1:8000/api/v1/analyze/', {
                                    method: 'POST',
                                    headers,
                                    body: JSON.stringify({
                                        image: croppedDataUrl,
                                        language: currentLanguage,
                                        mode: currentMode
                                    })
                                });

                                if (!res.ok) {
                                    if (res.status === 401) throw new Error('Session expired. Please log in again.');
                                    throw new Error('Analysis failed. Please try again.');
                                }

                                const data = await res.json();
                                const dateStr = new Date().toLocaleDateString('en-US', {
                                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                });
                                setAnalysisResult(`_Analysis Date: ${dateStr}_\n\n${data.answer}`);
                                setIsGuest(!!data.is_guest);
                                setAnalysisState('complete');
                                setShowModes(false); // Hide modes after completion
                            } catch (error: any) {
                                console.error("[Superside] Analysis Error:", error);
                                setAnalysisResult(error.message || 'Analysis failed');
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
                zIndex: 2147483647, cursor: isSelecting ? 'crosshair' : 'default', userSelect: 'none',
                pointerEvents: 'auto', fontFamily: 'Inter, system-ui, sans-serif'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* Selection Text */}
            {!selection && analysisState === 'idle' && (
                <div style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', padding: '12px 24px', borderRadius: '500px', color: 'white', fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', pointerEvents: 'none' }}>
                    Drag to select screen area
                </div>
            )}

            {/* Side Panel (Analysis) */}
            {analysisState !== 'idle' && (
                <div
                    style={{
                        position: 'fixed', top: 0, right: 0, height: '100%',
                        width: panelWidth, background: 'white', boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
                        zIndex: 2147483647, display: 'flex', flexDirection: 'column',
                        transition: isResizing ? 'none' : 'width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        animation: 'snap-pull-in 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                    }}
                    onMouseDown={e => e.stopPropagation()}
                >
                    {/* Resizer Handle */}
                    <div
                        onMouseDown={() => setIsResizing(true)}
                        style={{
                            position: 'absolute', left: -4, top: 0, width: 8, height: '100%',
                            cursor: 'ew-resize', zIndex: 10, background: isResizing ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                            transition: 'background 0.2s'
                        }}
                    />

                    {/* Blue Header */}
                    <div style={{ padding: '16px 24px', background: '#0E50F6', color: 'white' }}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <SupersideLogo className="w-8 h-8 filter brightness-200" />
                                <div>
                                    <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, letterSpacing: '-0.01em', fontFamily: 'Outfit, sans-serif' }}>Superside</h2>
                                    <p style={{ fontSize: '11px', opacity: 0.8, fontFamily: 'Inter, sans-serif' }}>SnapLearn Intelligence</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Reload / Mode Trigger */}
                                {!showModes ? (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowModes(true)}
                                        className="text-white hover:bg-white/20 border border-white/20 rounded-lg gap-2 h-9 px-3"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Reload</span>
                                    </Button>
                                ) : (
                                    <div className="flex bg-white/10 rounded-lg p-1 animate-in fade-in zoom-in duration-200">
                                        <button
                                            onClick={() => {
                                                setCurrentMode('fast');
                                                handleCapture();
                                                setShowModes(false);
                                            }}
                                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${currentMode === 'fast' ? 'bg-white text-[#0E50F6]' : 'text-white hover:bg-white/10'}`}
                                        >
                                            <Zap className="w-3 h-3" /> Fast
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCurrentMode('think');
                                                handleCapture();
                                                setShowModes(false);
                                            }}
                                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${currentMode === 'think' ? 'bg-white text-[#0E50F6]' : 'text-white hover:bg-white/10'}`}
                                        >
                                            <Brain className="w-3 h-3" /> Think
                                        </button>
                                    </div>
                                )}

                                {/* Language Switcher */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 border border-white/20 gap-2 h-9">
                                            <Globe className="w-4 h-4" />
                                            <span className="text-xs uppercase">{currentLanguage.substring(0, 3)}</span>
                                            <ChevronDown className="w-3 h-3 opacity-60" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-32">
                                        {['English', 'Spanish', 'French', 'German', 'Chinese', 'Swahili'].map(lang => (
                                            <DropdownMenuItem key={lang} onClick={() => setCurrentLanguage(lang)} className="text-xs font-medium cursor-pointer">
                                                {lang}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setVisible(false);
                                        setSelection(null);
                                        setAnalysisState('idle');
                                        setCapturedImage(null);
                                    }}
                                    className="text-white hover:bg-white/20 rounded-full h-9 w-9 p-0"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div style={{ flex: 1, overflowY: 'auto', background: '#fcfcfc' }}>
                        {/* Image Preview at the very top */}
                        {capturedImage && (
                            <div style={{ width: '100%', borderBottom: '1px solid #eee' }}>
                                <img
                                    src={capturedImage}
                                    alt="Captured area"
                                    style={{ width: '100%', display: 'block', maxHeight: '300px', objectFit: 'contain', background: '#f0f4ff' }}
                                />
                            </div>
                        )}

                        <div style={{ padding: '24px' }}>
                            {analysisState === 'loading' && (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <div className="w-14 h-14 border-4 border-[#0E50F6] border-t-transparent rounded-full animate-spin mb-8"></div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">
                                        {currentMode === 'think' ? 'Deeply Reasoning...' : 'Analyzing Screenshot'}
                                    </h3>
                                    <p className="text-gray-500 font-medium">Sit tight, our AI is crafting your summary.</p>
                                </div>
                            )}

                            {analysisState === 'complete' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Action Bar */}
                                    <div className="flex gap-2 mb-8 border-b pb-6">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-10 px-4 rounded-xl border-slate-200 hover:bg-slate-50 gap-2 text-xs font-bold"
                                            onClick={() => {
                                                navigator.clipboard.writeText(analysisResult);
                                                // Could add a toast here
                                            }}
                                        >
                                            <Copy className="w-3.5 h-3.5 text-[#0E50F6]" /> Copy
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-10 px-4 rounded-xl border-slate-200 hover:bg-slate-50 gap-2 text-xs font-bold"
                                            onClick={() => {
                                                // PDF Download using print window
                                                const printWindow = window.open('', '_blank');
                                                if (printWindow) {
                                                    const formattedContent = analysisResult
                                                        .replace(/## (.*)/g, '<h2>$1</h2>')
                                                        .replace(/### (.*)/g, '<h3>$1</h3>')
                                                        .replace(/!!(.*?)!!/g, '<span style="color: #ef4444; font-weight: bold;">$1</span>')
                                                        .replace(/\+\+(.*?)\+\+/g, '<span style="color: #16a34a; font-weight: bold;">$1</span>')
                                                        .replace(/\(\((.*?)\)\)/g, '<span style="color: #2563eb; font-weight: bold;">$1</span>')
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                        .replace(/- (.*)/g, '<li>$1</li>')
                                                        .replace(/\n\n/g, '<p></p>')
                                                        .replace(/\n/g, '<br/>');

                                                    printWindow.document.write(`
                                                        <html>
                                                            <head>
                                                                <title>Superside Analysis - ${new Date().toLocaleDateString()}</title>
                                                                <style>
                                                                    body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #334155; line-height: 1.6; max-width: 800px; margin: 0 auto; }
                                                                    h2 { color: #0E50F6; font-size: 24px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-top: 32px; }
                                                                    h3 { color: #1e293b; font-size: 18px; margin-top: 24px; margin-bottom: 12px; }
                                                                    p { margin-bottom: 16px; }
                                                                    li { margin-bottom: 8px; }
                                                                    .brand { color: #0E50F6; font-weight: 900; font-size: 28px; margin-bottom: 8px; }
                                                                    .date { color: #94a3b8; font-size: 12px; margin-bottom: 40px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
                                                                </style>
                                                            </head>
                                                            <body>
                                                                <div class="brand">Superside</div>
                                                                <div class="date">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                                                ${formattedContent}
                                                            </body>
                                                        </html>
                                                    `);
                                                    printWindow.document.close();
                                                    // Small delay to ensure styles are loaded before print
                                                    setTimeout(() => {
                                                        printWindow.print();
                                                        printWindow.close();
                                                    }, 500);
                                                }
                                            }}
                                        >
                                            <Download className="w-3.5 h-3.5 text-[#0E50F6]" /> Export PDF
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-10 px-4 rounded-xl border-slate-200 hover:bg-slate-50 gap-2 text-xs font-bold"
                                            onClick={async () => {
                                                const plainText = analysisResult.replace(/!!|\+\+|\(\(|## |### | \*\*| \*/g, '');
                                                const shareData = {
                                                    title: 'Superside AI Analysis',
                                                    text: plainText,
                                                    url: window.location.href
                                                };

                                                try {
                                                    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                                                        await navigator.share(shareData);
                                                    } else {
                                                        await navigator.clipboard.writeText(`Superside Analysis Results:\n\n${plainText}`);
                                                        alert('Analysis results copied to clipboard for sharing!');
                                                    }
                                                } catch (err) {
                                                    console.error("Share failed:", err);
                                                    navigator.clipboard.writeText(plainText);
                                                    alert('Copied to clipboard.');
                                                }
                                            }}
                                        >
                                            <Share2 className="w-3.5 h-3.5 text-[#0E50F6]" /> Share
                                        </Button>
                                    </div>

                                    <div className="prose prose-slate prose-sm max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-strong:text-black">
                                        <div
                                            className="markdown-content"
                                            dangerouslySetInnerHTML={{
                                                __html: analysisResult
                                                    .replace(/## (.*)/g, '<h2 class="text-xl mt-8 mb-4 text-[#0E50F6] font-[800] border-b-2 border-slate-100 pb-2 tracking-tighter">$1</h2>')
                                                    .replace(/### (.*)/g, '<h3 class="text-lg mt-6 mb-3 font-[750] text-slate-800">$1</h3>')
                                                    .replace(/_Analysis Date: (.*)_/g, '<p class="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-8 border-b border-dashed pb-3">Superside Intelligence • $1</p>')
                                                    .replace(/!!(.*?)!!/g, '<span class="text-red-600 font-bold px-1.5 py-0.5 bg-red-50 rounded border border-red-100">$1</span>')
                                                    .replace(/\+\+(.*?)\+\+/g, '<span class="text-green-600 font-bold px-1.5 py-0.5 bg-green-50 rounded border border-green-100">$1</span>')
                                                    .replace(/\(\((.*?)\)\)/g, '<span class="text-blue-600 font-bold px-1.5 py-0.5 bg-blue-50 rounded border border-blue-100">$1</span>')
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-[750] text-slate-900">$1</strong>')
                                                    .replace(/\*(.*?)\*/g, '<em class="text-slate-500 italic">$1</em>')
                                                    .replace(/^- (.*)/gm, '<div class="flex gap-3 mb-3 items-start"><span class="text-[#0E50F6] mt-1.5">•</span><span class="text-slate-700 leading-relaxed">$1</span></div>')
                                                    .replace(/\n\n/g, '<div class="h-6"></div>')
                                                    .replace(/\n/g, '<br/>')
                                            }} />
                                    </div>

                                    {/* Login CTA Card for Guests */}
                                    <div style={{ marginTop: '32px' }}>
                                        {isGuest && (
                                            <div style={{
                                                padding: '28px',
                                                borderRadius: '24px',
                                                background: '#f8fafc',
                                                border: '1px solid #e2e8f0',
                                                textAlign: 'center',
                                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                                            }}>
                                                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
                                                    Want to continue chatting?
                                                </h4>
                                                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
                                                    Log in to chat with AI about this screenshot and save your sessions to history.
                                                </p>
                                                <Button
                                                    onClick={() => window.open(chrome.runtime.getURL('index.html#/login'), '_blank')}
                                                    style={{
                                                        width: '100%',
                                                        height: '56px',
                                                        background: '#0E50F6',
                                                        color: 'white',
                                                        borderRadius: '14px',
                                                        fontSize: '16px',
                                                        fontWeight: 700,
                                                        boxShadow: '0 10px 15px -3px rgba(14, 80, 246, 0.3)'
                                                    }}
                                                    className="hover:scale-[1.02] transition-transform"
                                                >
                                                    Login to Continue
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {analysisState === 'error' && (
                                <div className="text-center py-10">
                                    <p className="text-red-500 font-bold text-lg mb-4">{analysisResult}</p>
                                    <Button
                                        style={{ background: '#0E50F6', borderRadius: '12px' }}
                                        className="px-8 h-12 font-bold text-white hover:opacity-90"
                                        onClick={handleCapture}
                                    >
                                        Retry Capture
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Clipping View */}
            {analysisState === 'idle' && (
                <>
                    <div style={{
                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
                        clipPath: selection ? `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, 
                        ${selection.x}px ${selection.y}px, 
                        ${selection.x + selection.width}px ${selection.y}px, 
                        ${selection.x + selection.width}px ${selection.y + selection.height}px, 
                        ${selection.x}px ${selection.y + selection.height}px, 
                        ${selection.x}px ${selection.y}px)` : 'none'
                    }} />

                    {selection && (
                        <div style={{
                            position: 'absolute',
                            left: selection.x,
                            top: selection.y,
                            width: selection.width,
                            height: selection.height,
                            border: '3px solid #0E50F6',
                            boxShadow: '0 0 0 1px rgba(255,255,255,0.4), 0 0 20px rgba(14, 80, 246, 0.2)'
                        }}>
                            {/* Handles for premium look */}
                            <div style={{ position: 'absolute', top: -5, left: -5, width: 10, height: 10, background: 'white', border: '2px solid #0E50F6' }} />
                            <div style={{ position: 'absolute', top: -5, right: -5, width: 10, height: 10, background: 'white', border: '2px solid #0E50F6' }} />
                            <div style={{ position: 'absolute', bottom: -5, left: -5, width: 10, height: 10, background: 'white', border: '2px solid #0E50F6' }} />
                            <div style={{ position: 'absolute', bottom: -5, right: -5, width: 10, height: 10, background: 'white', border: '2px solid #0E50F6' }} />
                            {/* Control Buttons (Larger) */}
                            <div
                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 flex gap-6"
                                onMouseDown={e => e.stopPropagation()}
                            >
                                <Button
                                    onClick={handleCapture}
                                    style={{
                                        height: '64px',
                                        padding: '0 48px',
                                        fontSize: '18px',
                                        fontWeight: 800,
                                        borderRadius: '16px',
                                        background: '#0E50F6',
                                        boxShadow: '0 12px 24px rgba(14, 80, 246, 0.4)',
                                        color: 'white'
                                    }}
                                    className="hover:scale-105 transition-all"
                                >
                                    <Check className="w-6 h-6 mr-3" /> Capture
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleCancel}
                                    style={{
                                        height: '64px',
                                        padding: '0 48px',
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        borderRadius: '16px',
                                        background: '#1e293b',
                                        color: 'white',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
                                    }}
                                    className="hover:bg-slate-800 hover:scale-105 transition-all"
                                >
                                    <X className="w-6 h-6 mr-3" /> Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}

            <style>{`
                @keyframes snap-pull-in {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default Overlay;
