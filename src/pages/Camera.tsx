
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, Settings, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CameraPage = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [quality, setQuality] = useState([75]);
  const [motionDetection, setMotionDetection] = useState(false);
  const [activeTab, setActiveTab] = useState("live");
  const { toast } = useToast();
  
  // This would normally connect to your actual Raspberry Pi camera API
  const toggleStream = () => {
    setIsStreaming(!isStreaming);
    toast({
      title: isStreaming ? "Camera stopped" : "Camera started",
      description: isStreaming ? "Live stream has ended" : "Live stream is now active",
    });
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value);
  };

  const captureSnapshot = () => {
    toast({
      title: "Snapshot captured",
      description: "Image saved to your library",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Camera className="h-8 w-8" />
          Raspberry Pi Camera
        </h1>
        <Badge variant={isStreaming ? "default" : "outline"} className="ml-2">
          {isStreaming ? "Live" : "Offline"}
        </Badge>
      </div>

      <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live">Live View</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-video bg-gray-900 rounded-md mb-4 overflow-hidden relative">
                {isStreaming ? (
                  <div className="flex items-center justify-center h-full">
                    {/* This would be your actual camera stream */}
                    <img 
                      src="/placeholder.svg" 
                      alt="Camera stream" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="destructive" className="animate-pulse">
                        REC
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Camera className="h-16 w-16 mb-2" />
                    <p>Camera is currently offline</p>
                    <Button 
                      variant="outline" 
                      onClick={toggleStream} 
                      className="mt-4"
                    >
                      Start Stream
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <Button 
                  variant={isStreaming ? "destructive" : "default"}
                  onClick={toggleStream}
                >
                  {isStreaming ? "Stop Camera" : "Start Camera"}
                </Button>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={captureSnapshot}
                    disabled={!isStreaming}
                  >
                    <Camera className="mr-2 h-4 w-4" /> Capture
                  </Button>
                  <Button variant="outline" disabled={!isStreaming}>
                    <Download className="mr-2 h-4 w-4" /> Record
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recordings">
          <Card>
            <CardHeader>
              <CardTitle>Saved Recordings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                <p>No recordings available</p>
                <Button variant="outline" className="mt-4">
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Camera Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Stream Quality</label>
                  <span className="text-sm">{quality}%</span>
                </div>
                <Slider
                  value={quality}
                  onValueChange={handleQualityChange}
                  max={100}
                  step={1}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Motion Detection</p>
                    <p className="text-sm text-gray-500">
                      Automatically record when motion is detected
                    </p>
                  </div>
                  <Switch 
                    checked={motionDetection} 
                    onCheckedChange={setMotionDetection}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Night Vision</p>
                    <p className="text-sm text-gray-500">
                      Enable infrared for low light conditions
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Timestamp</p>
                    <p className="text-sm text-gray-500">
                      Add date and time to recordings
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CameraPage;
