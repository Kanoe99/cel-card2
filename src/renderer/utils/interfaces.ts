import type { Stage } from 'konva/lib/Stage';

interface DownloadProps {
  uri: string | undefined;
  fileName: string | undefined;
  stageRef: React.RefObject<Stage> | undefined;
}

interface PickedProps {
  isPickedItem: string | null;
  item: string;
}

interface CanvasProps {
  cardText: string | undefined;
  imageSrc: string | null | undefined;
  stageRef: React.RefObject<Stage> | undefined;
}

interface ImageProps {
  width: number;
  height: number;
}

export { DownloadProps, PickedProps, CanvasProps, ImageProps };
