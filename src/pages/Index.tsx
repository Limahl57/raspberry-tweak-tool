
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Raspberry Pi Tools</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Camera Monitor
              </CardTitle>
              <CardDescription>
                Control and view your Raspberry Pi camera stream
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Live stream from your camera, take snapshots, and configure motion detection settings.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/camera" className="w-full">
                <Button className="w-full">
                  Open Camera
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>
                Configure your Raspberry Pi system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Manage system resources, update software, and monitor performance.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
