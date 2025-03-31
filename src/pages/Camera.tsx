
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, Settings, Download, Trash2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VideoRecording, cleanupExpiredVideos, deleteRecording, getTimeAgo, isVideoExpired } from "@/utils/videoUtils";

const CameraPage = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [quality, setQuality] = useState([75]);
  const [motionDetection, setMotionDetection] = useState(false);
  const [activeTab, setActiveTab] = useState("live");
  const [recordings, setRecordings] = useState<VideoRecording[]>([]);
  const { toast } = useToast();
  
  // Mock data for sample recordings
  useEffect(() => {
    // Sample recordings with various dates
    const sampleRecordings: VideoRecording[] = [
      {
        id: "1",
        name: "Front door motion",
        date: new Date(),
        duration: "1:30",
        fileSize: "15.4 MB",
        thumbnail: "/placeholder.svg",
        videoUrl: "#"
      },
      {
        id: "2",
        name: "Backyard activity",
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        duration: "2:45",
        fileSize: "28.7 MB",
        thumbnail: "/placeholder.svg",
        videoUrl: "#"
      },
      {
        id: "3",
        name: "Night recording",
        date: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000), // 70 days ago (expired)
        duration: "3:10",
        fileSize: "32.1 MB",
        thumbnail: "/placeholder.svg",
        videoUrl: "#"
      }
    ];
    
    setRecordings(sampleRecordings);
  }, []);
  
  // Clean up expired videos (older than 2 months)
  useEffect(() => {
    // Check for expired videos on component mount and when recordings change
    const cleanup = async () => {
      const expiredVideos = recordings.filter(rec => isVideoExpired(rec.date));
      
      if (expiredVideos.length > 0) {
        // Delete expired videos
        for (const video of expiredVideos) {
          await deleteRecording(video.id);
        }
        
        // Update recordings list
        const updatedRecordings = cleanupExpiredVideos(recordings);
        setRecordings(updatedRecordings);
        
        toast({
          title: "Automatic cleanup completed",
          description: `${expiredVideos.length} recordings older than 2 months were deleted`,
        });
      }
    };
    
    cleanup();
  }, [recordings, toast]);
  
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
  
  const startRecording = () => {
    toast({
      title: "Recording started",
      description: "Video is being saved to your library",
    });
  };
  
  const handleDeleteRecording = async (id: string) => {
    await deleteRecording(id);
    setRecordings(recordings.filter(rec => rec.id !== id));
    toast({
      title: "Recording deleted",
      description: "The video has been removed from your library",
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
                  <Button 
                    variant="outline" 
                    onClick={startRecording}
                    disabled={!isStreaming}
                  >
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
              <CardTitle className="flex items-center justify-between">
                <span>Saved Recordings</span>
                <Badge variant="outline" className="ml-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Auto-delete after 2 months
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recordings.length > 0 ? (
                <div className="space-y-4">
                  {recordings.map((recording) => (
                    <div key={recording.id} className="flex items-center border rounded-lg p-3 hover:bg-gray-50">
                      <div className="h-16 w-28 bg-gray-200 rounded overflow-hidden mr-4">
                        <img 
                          src={recording.thumbnail} 
                          alt={recording.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{recording.name}</h3>
                        <div className="flex text-sm text-gray-500 gap-3">
                          <span>{getTimeAgo(recording.date)}</span>
                          <span>{recording.duration}</span>
                          <span>{recording.fileSize}</span>
                        </div>
                      </div>
                      {isVideoExpired(recording.date) && (
                        <Badge variant="outline" className="mr-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                          Expiring soon
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteRecording(recording.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                  <p>No recordings available</p>
                  <Button variant="outline" className="mt-4">
                    Browse Files
                  </Button>
                </div>
              )}
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
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-Delete Old Recordings</p>
                    <p className="text-sm text-gray-500">
                      Automatically delete recordings older than 2 months
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
