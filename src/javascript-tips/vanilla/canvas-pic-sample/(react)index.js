import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, RotateCcw, Trash2 } from 'lucide-react';

const RouteMap = () => {
    const canvasRef = useRef(null);
    const [pins, setPins] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedPinIndex, setDraggedPinIndex] = useState(null);
    const [mapImage, setMapImage] = useState(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [selectedPin, setSelectedPin] = useState(null);

    // マップ画像の読み込み
    useEffect(() => {
        const img = new Image();
        img.src = "/api/placeholder/800/600";
        img.onload = () => setMapImage(img);
    }, []);

    // 2点間の距離を計算（ピクセル単位）
    const calculateDistance = (point1, point2) => {
        return Math.sqrt(
            Math.pow(point2.x - point1.x, 2) +
            Math.pow(point2.y - point1.y, 2)
        );
    };

    // 総距離の計算
    useEffect(() => {
        if (pins.length > 1) {
            let distance = 0;
            for (let i = 1; i < pins.length; i++) {
                distance += calculateDistance(pins[i - 1], pins[i]);
            }
            setTotalDistance(Math.round(distance));
        } else {
            setTotalDistance(0);
        }
    }, [pins]);

    // Canvas の再描画
    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // マップ画像の描画
        if (mapImage) {
            ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
        }

        // ピン同士を線で接続
        if (pins.length > 1) {
            ctx.beginPath();
            ctx.moveTo(pins[0].x, pins[0].y);
            for (let i = 1; i < pins.length; i++) {
                ctx.lineTo(pins[i].x, pins[i].y);

                // 距離を線の中間点に表示
                const midX = (pins[i].x + pins[i - 1].x) / 2;
                const midY = (pins[i].y + pins[i - 1].y) / 2;
                const distance = Math.round(calculateDistance(pins[i - 1], pins[i]));
                ctx.save();
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.font = '12px sans-serif';
                ctx.strokeText(`${distance}px`, midX, midY);
                ctx.fillText(`${distance}px`, midX, midY);
                ctx.restore();
            }
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // ピンの描画
        pins.forEach((pin, index) => {
            ctx.beginPath();
            ctx.arc(pin.x, pin.y, 6, 0, Math.PI * 2);

            // 選択されたピンは強調表示
            if (index === selectedPin) {
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // 開始点は緑、終了点は赤、中間点は青
            if (index === 0) {
                ctx.fillStyle = '#22c55e';
            } else if (index === pins.length - 1) {
                ctx.fillStyle = '#ef4444';
            } else {
                ctx.fillStyle = '#3b82f6';
            }

            ctx.fill();
        });
    };

    useEffect(() => {
        if (canvasRef.current) {
            redrawCanvas();
        }
    }, [pins, mapImage, selectedPin]);

    // クリックでピンを追加または選択
    const handleCanvasClick = (e) => {
        if (!isDragging) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // クリックした位置に近いピンがあるか確認
            const clickedPinIndex = pins.findIndex(pin =>
                Math.sqrt(Math.pow(pin.x - x, 2) + Math.pow(pin.y - y, 2)) < 10
            );

            if (clickedPinIndex !== -1) {
                setSelectedPin(clickedPinIndex);
            } else {
                setPins([...pins, { x, y }]);
                setSelectedPin(null);
            }
        }
    };

    // 選択したピンの削除
    const handleDeletePin = () => {
        if (selectedPin !== null) {
            const newPins = pins.filter((_, index) => index !== selectedPin);
            setPins(newPins);
            setSelectedPin(null);
        }
    };

    // ピンのドラッグ開始
    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const pinIndex = pins.findIndex(pin =>
            Math.sqrt(Math.pow(pin.x - x, 2) + Math.pow(pin.y - y, 2)) < 10
        );

        if (pinIndex !== -1) {
            setIsDragging(true);
            setDraggedPinIndex(pinIndex);
        }
    };

    // ピンのドラッグ中
    const handleMouseMove = (e) => {
        if (isDragging && draggedPinIndex !== null) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const newPins = [...pins];
            newPins[draggedPinIndex] = { x, y };
            setPins(newPins);
        }
    };

    // ピンのドラッグ終了
    const handleMouseUp = () => {
        setIsDragging(false);
        setDraggedPinIndex(null);
    };

    // リセット
    const handleReset = () => {
        setPins([]);
        setSelectedPin(null);
        setTotalDistance(0);
    };

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>ルートマップ</CardTitle>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleReset}
                        className="h-8 w-8"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleDeletePin}
                        className="h-8 w-8"
                        disabled={selectedPin === null}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        className="border rounded-lg cursor-crosshair"
                        onClick={handleCanvasClick}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    />
                    <div className="mt-4 flex gap-4 items-center text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            <span>開始地点</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span>中間地点</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-red-500" />
                            <span>終了地点</span>
                        </div>
                        <div className="ml-auto">
                            総距離: {totalDistance}px
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RouteMap;