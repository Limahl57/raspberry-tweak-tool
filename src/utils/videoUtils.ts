
import { formatDistance, isBefore, subMonths } from "date-fns";

export interface VideoRecording {
  id: string;
  name: string;
  date: Date;
  duration: string;
  fileSize: string;
  thumbnail: string;
  videoUrl: string;
}

// Get formatted time since recording
export const getTimeAgo = (date: Date): string => {
  return formatDistance(date, new Date(), { addSuffix: true });
};

// Check if a video is older than two months and should be deleted
export const isVideoExpired = (date: Date): boolean => {
  const twoMonthsAgo = subMonths(new Date(), 2);
  return isBefore(date, twoMonthsAgo);
};

// Filter recordings and remove expired ones
export const cleanupExpiredVideos = (recordings: VideoRecording[]): VideoRecording[] => {
  return recordings.filter(recording => !isVideoExpired(recording.date));
};

// Simulate deleting a recording from storage
export const deleteRecording = async (id: string): Promise<boolean> => {
  console.log(`Deleting recording with ID: ${id}`);
  // In a real implementation, this would call an API to delete the file
  return true;
};
