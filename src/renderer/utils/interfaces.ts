interface DownloadProps {
  uri: string | undefined;
  fileName: string | undefined;
}

interface PickedProps {
  isPickedItem: string | null;
  item: string;
}

export { DownloadProps, PickedProps };
